import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar";

const bar = document.querySelector(".loading__bar--inner");
const counter_number = document.querySelector(".loading__counter--number")


//Disable X scroll


class DisableScrollPlugin extends ScrollbarPlugin {
  static pluginName = 'disableScroll';

  static defaultOptions = {
    direction: '',
  };

  transformDelta(delta) {
    if (this.options.direction) {
      delta[this.options.direction] = 0;
    }

    return { ...delta };
  }
}

// load the plugin
Scrollbar.use(DisableScrollPlugin);




//Enable hash navigation
class AnchorPlugin extends ScrollbarPlugin {
  static pluginName = 'anchor';

  onHashChange = () => {
    this.jumpToHash(window.location.hash);
  };

  onClick = (event) => {
    const { target } = event;

    if (target.tagName !== 'A') {
      return;
    }

    const hash = target.getAttribute('href');

    if (!hash || hash.charAt(0) !== '#') {
      return;
    }

    this.jumpToHash(hash);
  };

  jumpToHash = (hash) => {
    const { scrollbar } = this;

    if (!hash) {
      return;
    }    

    // reset scrollTop
    scrollbar.containerEl.scrollTop = 0;

    scrollbar.scrollIntoView(document.querySelector(hash));
  };

  onInit() {
    this.jumpToHash(window.location.hash);

    window.addEventListener('hashchange', this.onHashChange);

    this.scrollbar.contentEl.addEventListener('click', this.onClick);
  }

  onDestory() {
    window.removeEventListener('hashchange', this.onHashChange);

    this.scrollbar.contentEl.removeEventListener('click', this.onClick);
  }
}

// usage
Scrollbar.use(AnchorPlugin);


let c = 0;
let barInterval = setInterval(() => {
    bar.style.width = c + '%';
    counter_number.innerText = c + "%"
    c++;
    if(c > 100){
        clearInterval(barInterval)

        //Remove the loading bar
        gsap.to(".loading__bar", {
            duration: 5,
            rotate: "90deg",
            left: "1000%"
        })
        //hide the text
        gsap.to(".loading__text, .loading__counter", {
            duration: 0.5,
            opacity: 0,
        })
        //make the box a circle
        gsap.to(".loading__box", {
            duration: 1,
            height: "500px",
            borderRadius: "50%"
        })

        //Show the svg
        gsap.to(".loading__svg", {
            duration: 10,
            opacity: 1,
            rotate: "360deg"
        })

        //remove the circle
        gsap.to(".loading__box", {
            delay: 1,
            border: "none",
        })
        imagesLoaded(document.querySelectorAll('img'), () => {
             //Remove background colour
        gsap.to(".loading", {
            delay: 1,
            duration: 2,
            background: "transparent",
            opacity: 0,
            zIndex: 0,
            display: "none"
        })

        //Slow down the rotating speed
        gsap.to(".loading__svg", {
            duration: 100,
            delay: 1,
            rotate: "360deg"
        })

        //Header animation
        gsap.to("header", {
            duration: 1,
            delay: 1,
            top: "0",
        })
          //socials animation
        gsap.to(".socials", {
            duration: 1,
            delay: 1.5,
            bottom: "10rem",
        })
           //scroll down animation
        gsap.to(".scrollDown", {
            duration: 1,
            delay: 1.5,
            bottom: "3rem",
        })

         //Info animation
        gsap.to(".intro", {
            duration: 1,
            delay: 1.5,
            left: "10vw",
        })
        let smoothScroll = Scrollbar.init(document.body,{
            alwaysShowTracks:true,
            damping: 0.1,
            plugins: {
                disableScroll: {
                  direction: 'x',
                },
              },
        });
        })  
    }
}, 20)


const questions = [...document.querySelectorAll(".question")];

questions.map((question) => {
    let q_text = question.querySelector("h3");
    q_text.addEventListener('click', () => {
        console.log('hey')
        questions.filter((q) => q !== question).map((q) => q.classList.remove('open'))
        question.classList.toggle("open")
    })
})