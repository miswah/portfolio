import gsap from "gsap";

const bar = document.querySelector(".loading__bar--inner");
const counter_number = document.querySelector(".loading__counter--number")

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

        //Remove background colour
        gsap.to(".loading", {
            delay: 1,
            duration: 2,
            background: "transparent",
            opacity: 0,
            zIndex: 1,
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