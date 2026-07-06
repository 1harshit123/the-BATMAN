import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)


export function initVideoBlur() {
    gsap.to(".video-bg",{
        filter: "blur(8px)",
        scrollTrigger:{
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 2
        }
    })
}