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
            delay: 1.5,
            duration: 2,
            background: "transparent",
            opacity: 0,
            zIndex: 1,
        })

        //Slow down the rotating speed
        gsap.to(".loading__svg", {
            duration: 100,
            delay: 2,
            rotate: "360deg"
        })
    }
}, 20)


const questions = [...document.querySelectorAll(".question")];

questions.map((question) => {
    let q_text = question.querySelector("h3");
    q_text.addEventListener('click', () => {
        questions.filter((q) => q !== question).map((q) => q.classList.remove('open'))
        question.classList.toggle("open")
    })
})