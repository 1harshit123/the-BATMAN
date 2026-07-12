import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initSkillsAnimations() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
    // Build the 5-segment gauge for each skill row dynamically
    document.querySelectorAll('.skills-row').forEach(row => {
        const lit = parseInt(row.dataset.lit, 10);
        const gauge = row.querySelector('.skills-gauge');
        if (!gauge) return;
        gauge.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const seg = document.createElement('div');
            seg.className = 'skills-seg';
            const fill = document.createElement('span');
            fill.className = 'skills-fill';
            seg.appendChild(fill);
            gauge.appendChild(seg);
        }
    });
 
    if (reduceMotion) {
        // Skip motion entirely, just show final state
        document.querySelectorAll('.skills-category').forEach(cat => { 
            cat.style.opacity = '1'; 
            cat.style.transform = 'none'; 
        });
        document.querySelectorAll('.skills-row').forEach(row => {
            const lit = parseInt(row.dataset.lit, 10);
            row.querySelectorAll('.skills-fill').forEach((f, idx) => { 
                if (idx < lit) f.style.transform = 'scaleX(1)'; 
            });
        });
    } else {
        // Category columns rise in with a stagger
        document.querySelectorAll('.skills-category').forEach((cat, i) => {
            gsap.to(cat, {
                opacity: 1, 
                y: 0, 
                duration: 0.6, 
                ease: 'power2.out', 
                delay: i * 0.12,
                scrollTrigger: { 
                    trigger: cat, 
                    start: 'top 82%' 
                }
            });
        });
 
        // Each gauge powers on with a stepped flicker, staggered per segment
        document.querySelectorAll('.skills-row').forEach(row => {
            const lit = parseInt(row.dataset.lit, 10);
            const fills = row.querySelectorAll('.skills-fill');
            ScrollTrigger.create({
                trigger: row,
                start: 'top 88%',
                once: true,
                onEnter: () => {
                    fills.forEach((f, idx) => {
                        if (idx < lit) {
                            gsap.to(f, { 
                                scaleX: 1, 
                                duration: 0.22, 
                                ease: 'steps(4)', 
                                delay: 0.25 + idx * 0.07 
                            });
                        }
                    });
                }
            });
        });
 
        // One-time scanline sweep down the grid on reveal
        gsap.fromTo('.skills-scanline',
            { top: '0%', opacity: 0.7 },
            {
                top: '100%', 
                opacity: 0, 
                duration: 1.1, 
                ease: 'power1.in',
                scrollTrigger: { 
                    trigger: '.skills-grid', 
                    start: 'top 75%', 
                    once: true 
                }
            }
        );
    }
}
