import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initOverlayAnimations() {
    gsap.to(".overlay", {
        opacity: 0.35,
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });
}

export function initOverlayScrub() {
    const overlay = document.getElementById('overlay');
    const pages = document.querySelectorAll('.page');
    if (!overlay || !pages.length) return;

    pages.forEach((page) => {
        const targetOpacity = parseFloat(page.dataset.overlay || 0);
        const targetBlur = parseFloat(page.dataset.blur || 0);

        gsap.timeline({
            scrollTrigger: {
                trigger: page,
                start: 'top center',
                end: 'bottom center',
                scrub: 0.6
            }
        }).to(overlay, {
            backgroundColor: `rgba(5, 5, 5, ${targetOpacity})`,
            backdropFilter: `blur(${targetBlur}px)`,
            backdropFilter: `blur(${targetBlur}px)`,
            ease: 'none'
        });
    });
}
