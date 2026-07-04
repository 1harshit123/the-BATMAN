
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/* ==========================================================================
   RANDOM HERO QUOTE
   (originally written, not lifted from any film — safe to swap freely)
   ========================================================================== */
const quotes = [
    "The city doesn't need a hero it can see. It needs one it can believe in.",
    "Fear is a tool. Used right, it protects the people who can't protect themselves.",
    "Every night I choose the same fight, because someone has to stand between the dark and the people who live in it.",
    "A symbol can outlast any one man wearing it.",
    "I don't need to be remembered. I need the city to still be standing tomorrow.",
    "The line between justice and vengeance is thinner than most people think — I walk it anyway."
];

function setRandomQuote() {
    const el = document.getElementById('hero-quote');
    if (!el) return;
    const pick = quotes[Math.floor(Math.random() * quotes.length)];
    el.textContent = pick;
}

/* ==========================================================================
   FOOTER YEAR
   ========================================================================== */
function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}

/* ==========================================================================
   SMOOTH SCROLL
   ========================================================================== */

let lenis;

function initSmoothScroll() {
    lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}


// pin shape when it reaches the center of the viewport, for 300px
ScrollTrigger.create({
    trigger: ".shape",
    pin: true,
    start: "center center",
    end: "+=300"
});

document.querySelector("button").addEventListener("click", (e) => {
    // scroll to the spot where the shape is in the center.
    // parameters: element, smooth, position
    smoother.scrollTo(".shape", true, "center center");

    // or you could animate the scrollTop:
    // gsap.to(smoother, {
    //  scrollTop: smoother.offset(".shape", "center center"),
    //  duration: 1
    // });
});

function initOverlayScrub() {
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
            webkitBackdropFilter: `blur(${targetBlur}px)`,
            ease: 'none'
        });
    });
}

function initNavbarState() {
    const navbar = document.querySelector('.navbar');
    const hero = document.getElementById('hero');
    if (!navbar || !hero) return;

    ScrollTrigger.create({
        trigger: hero,
        start: 'bottom top',
        onEnter: () => navbar.classList.add('scrolled'),
        onLeaveBack: () => navbar.classList.remove('scrolled')
    });
}

function initActiveNavLink() {
    const sections = document.querySelectorAll('.page[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!sections.length || !navLinks.length) return;

    sections.forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => {
                if (!self.isActive) return;
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
                });
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    setRandomQuote();
    setYear();
    initSmoothScroll();
    initOverlayScrub();
    initNavbarState();
    initActiveNavLink();
    initMobileNav();
    initVideoRefresh();
});