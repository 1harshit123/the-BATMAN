import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { setRandomQuote } from "./utils/quotes.js";
import { setYear } from "./utils/year.js";
import { initSmoothScroll } from "./smooth/lenis.js";
import { initHeroAnimations } from "./animations/hero.js";
import { initNavbarState, initActiveNavLink } from "./animations/navbar.js";
import { initRevealAnimations } from "./animations/reveal.js";
import { initProjectsAnimations } from "./animations/projects.js";
import { initMagneticButtons } from "./animations/magnetic.js";
import { initOverlayAnimations, initOverlayScrub } from "./animations/overlay.js";
import { initVideoAnimations } from "./animations/video.js";
import { initVideoBlur } from "./animations/videoBlur.js";
import { initSmoke } from "./animations/cursor.js";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    setRandomQuote();
    setYear();
    initSmoothScroll();
    initVideoBlur();
    initSmoke();
    initHeroAnimations();
    initNavbarState();
    initActiveNavLink();
    initRevealAnimations();
    initProjectsAnimations();
    initMagneticButtons();
    initOverlayAnimations();
    initOverlayScrub();
    initVideoAnimations();
});
