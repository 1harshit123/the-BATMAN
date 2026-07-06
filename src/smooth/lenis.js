import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenis;

export function initSmoothScroll() {
    lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
        allowNestedScroll: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}
