import gsap from "gsap";

export function initHeroAnimations() {
    gsap.from(".scroll-cue", {
        opacity: 0,
        y: 40,
        delay: 1.5
    });
}
