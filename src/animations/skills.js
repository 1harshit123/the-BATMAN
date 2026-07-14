import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initSkillsAnimations() {
    const bubbles = document.querySelectorAll('.skill-bubble');
    const ring = document.querySelector('.orbit-ring');
    const batmanLogo = document.querySelector('.batman-center');

    if (!ring || bubbles.length === 0) return;

    const totalBubbles = bubbles.length;

    // 1. Dynamic positioning function
    function positionBubbles() {
        // Calculate radius on the fly based on current CSS width
        const radius = ring.offsetWidth / 2;

        bubbles.forEach((bubble, i) => {
            const angle = (i / totalBubbles) * (Math.PI * 2);
            const xPos = Math.cos(angle) * radius;
            const yPos = Math.sin(angle) * radius;

            gsap.set(bubble, {
                x: xPos,
                y: yPos,
                xPercent: -50,
                yPercent: -50
            });
        });
    }

    // Call immediately to set initial positions
    positionBubbles();

    // Recalculate if the user resizes their browser
    window.addEventListener('resize', positionBubbles);

    // 2. The Ferris Wheel Animation
    const ringSpin = gsap.to(ring, {
        rotation: 360,
        duration: 40, // Slow, dramatic spin
        ease: "none",
        repeat: -1,
        paused: true
    });

    const bubbleSpin = gsap.to(bubbles, {
        rotation: -360, // Exact inverse to keep logos upright
        duration: 40,
        ease: "none",
        repeat: -1,
        paused: true
    });

    // 3. Reveal Animation on Scroll
    ScrollTrigger.create({
        trigger: '.orbit-wrapper',
        start: 'top 75%',
        onEnter: () => {
            // Pop the bubbles in
            gsap.from(bubbles, {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.5)"
            });

            // Fade in the glowing Bat-Signal
            if (batmanLogo) {
                gsap.fromTo(batmanLogo,
                    { opacity: 0, scale: 0.5, filter: "drop-shadow(0 0 0px rgba(255,255,255,0))" },
                    { opacity: 1, scale: 1, filter: "drop-shadow(0 0 30px rgba(255,255,255,0.6))", duration: 1.5, ease: "power2.out", delay: 0.5 }
                );
            }

            ringSpin.play();
            bubbleSpin.play();
        }
    });

    // Pause on hover so users can easily read/inspect the skills
    ring.addEventListener("mouseenter", () => {
        ringSpin.pause();
        bubbleSpin.pause();
    });

    ring.addEventListener("mouseleave", () => {
        ringSpin.play();
        bubbleSpin.play();
    });
}