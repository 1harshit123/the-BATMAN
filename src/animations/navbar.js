import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initNavbarState() {
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

export function initActiveNavLink() {
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
