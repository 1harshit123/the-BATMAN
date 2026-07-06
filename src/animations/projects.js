import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initProjectsAnimations() {
    gsap.from(".project-card", {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        scrollTrigger: {
            trigger: ".project-list",
            start: "top 75%"
        }
    });
}
