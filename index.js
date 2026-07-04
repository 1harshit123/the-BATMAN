/* ==========================================================================
   SETUP
   ========================================================================== */
gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
   SMOOTH SCROLL (Lenis) — skipped entirely if reduced motion is requested
   ========================================================================== */
let lenis = null;

function initSmoothScroll() {
    if (prefersReducedMotion) return;

    lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        smoothTouch: false // native touch scroll feels better on mobile
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

/* ==========================================================================
   VIDEO OVERLAY / BLUR SCRUB
   Reads data-overlay and data-blur off each .page section and scrubs
   the fixed .overlay layer's darkness/blur as that section crosses center.
   ========================================================================== */
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

/* ==========================================================================
   NAVBAR STATE ON SCROLL
   Adds a class once the user leaves the hero, in case you want a
   background/backdrop-blur to fade in behind the nav past that point.
   ========================================================================== */
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

/* ==========================================================================
   ACTIVE NAV LINK HIGHLIGHT
   Toggles .active on the nav link matching the section in view.
   ========================================================================== */
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

/* ==========================================================================
   MOBILE NAV TOGGLE
   Toggles a .menu-open class on <body> so a mobile menu overlay
   (add the matching CSS if you want a full-screen mobile nav) can hook into it.
   ========================================================================== */
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        const isOpen = document.body.classList.toggle('menu-open');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // close the menu whenever a link is tapped
    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            document.body.classList.remove('menu-open');
        });
    });
}

/* ==========================================================================
   VIDEO READY → REFRESH SCROLLTRIGGER
   Section heights can shift slightly once the video's real dimensions
   are known, so refresh ScrollTrigger's measurements once it's loaded.
   ========================================================================== */
function initVideoRefresh() {
    const video = document.querySelector('.video-bg');
    if (!video) return;

    video.addEventListener('loadeddata', () => ScrollTrigger.refresh());

    // autoplay can silently fail on some mobile browsers — retry on first touch
    video.play().catch(() => {
        document.addEventListener('touchstart', () => video.play(), { once: true });
    });
}

/* ==========================================================================
   INIT
   ========================================================================== */
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