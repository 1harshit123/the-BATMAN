import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initRevealAnimations() {
    gsap.utils.toArray(".reveal").forEach(el => {
        gsap.from(el, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%"
            }
        });
    });

    gsap.from(".page-about", {
        opacity: 0,
        duration: 1.5,
        scrollTrigger: {
            trigger: ".page-about",
            start: "top 75%"
        }
    });

    gsap.from(".page-title", {
        x: -80,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".page-title",
            start: "top 80%"
        }
    });
}
