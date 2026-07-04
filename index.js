
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

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
        allowNestedScroll: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}



/* ==========================================================================
   CURSOR ANIMATION
   ========================================================================== */

const cursor = document.querySelector('.cursor')
const cursor_dot = document.querySelector('.cursor-dot')

window.addEventListener('mousemove', (e)=>{
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 3.5,
        ease: 'power4.out'

    })

    gsap.set(cursor_dot, {
        x: e.clientX,
        y: e.clientY
    });
})

/* ==========================================================================
   LAZY SCROLL
   ========================================================================== */

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

/* ==========================================================================
   LAZY SCROLL
   ========================================================================== */





gsap.from(".page-title", {

    x: -80,

    opacity: 0,

    duration: 1,

    scrollTrigger: {
        trigger: ".page-title",
        start: "top 80%"
    }

});

gsap.from(".scroll-cue", {
    opacity: 0,
    y: 40,
    delay: 1.5
});

gsap.from(".project-card", {

    y: 100,
    opacity: 0,

    stagger: .15,

    duration: 1,

    scrollTrigger: {
        trigger: ".project-list",
        start: "top 75%"
    }

});


const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {

    btn.addEventListener("mousemove", (e) => {

        const rect = btn.getBoundingClientRect();

        gsap.to(btn, {
            x: (e.clientX - rect.left - rect.width / 2) * 0.25,
            y: (e.clientY - rect.top - rect.height / 2) * 0.25,
            duration: .3
        });

    });

    btn.addEventListener("mouseleave", () => {

        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: .5
        });

    });

});


gsap.to(".video-bg", {

    scale: 1.12,

    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2
    }

});

gsap.to(".overlay", {

    opacity: .35,

    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    }

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
    //initMobileNav();
    //initVideoRefresh();
});