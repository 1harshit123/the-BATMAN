import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initVideoAnimations() {
    gsap.to(".video-bg", {
        scale: 1.12,
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 2
        }
    });
}
