'use strict';

/*
  Batman Grey Smoke Cursor — GSAP & CSS replacement.
  This completely replaces the WebGL fluid simulation. 
  It dynamically injects the necessary CSS for the smoke and 
  uses GSAP to handle the volumetric expansion and drifting.

  Make sure you have GSAP installed or loaded via CDN in your project.
  Call initSmoke() from your main.js once the DOM is ready.
*/

function initSmoke() {
    console.log("initSmoke called");

    // 1. Inject the necessary CSS for the volumetric smoke effect
    const style = document.createElement('style');
    style.innerHTML = `
        .batman-smoke-particle {
            position: fixed;
            top: 0;          /* <--- ADD THIS */
            left: 0;         /* <--- ADD THIS */
            pointer-events: none;
            border-radius: 50%;
            
            background: radial-gradient(
                circle, 
                rgba(140, 140, 140, 0.8) 0%, 
                rgba(80, 80, 80, 0.5) 50%, 
                rgba(30, 30, 30, 0) 80%
            );
            
            filter: blur(12px); 
            z-index: 999999; /* Boosted just in case Lenis overlays it */
            transform-origin: center;
        }
    `;
    document.head.appendChild(style);

    // 2. Configuration for spawning
    const THROTTLE_DISTANCE = 15; // Lower = denser smoke, Higher = better performance
    let lastX = 0;
    let lastY = 0;

    // 3. Core GSAP spawning logic
    function spawnSmoke(x, y) {
        // Ensure GSAP is loaded before trying to animate
        if (typeof gsap === 'undefined') {
            console.error("GSAP is missing! Please include GSAP in your project.");
            return;
        }

        const smoke = document.createElement("div");
        smoke.classList.add("batman-smoke-particle");
        document.body.appendChild(smoke);

        // Randomize initial particle size
        const baseSize = Math.random() * 40 + 30;
        smoke.style.width = `${baseSize}px`;
        smoke.style.height = `${baseSize}px`;

        // Center it under the cursor
        gsap.set(smoke, {
            x: x - baseSize / 2,
            y: y - baseSize / 2,
            opacity: 0.9,
            scale: 0.5
        });

        // Animate drifting, expanding, and fading
        gsap.to(smoke, {
            duration: Math.random() * 1.5 + 1.5,
            x: x - baseSize / 2 + (Math.random() * 100 - 50),
            y: y - baseSize / 2 - (Math.random() * 150 + 50), // Mostly drifts upward
            scale: Math.random() * 3 + 3,
            rotation: Math.random() * 180 - 90,
            opacity: 0,
            ease: "power2.out",
            onComplete: () => {
                smoke.remove(); // Cleanup to prevent memory leaks
            }
        });
    }

    // 4. Handle both Mouse and Touch movement
    function handleMove(e) {
        // Differentiate between touch events and mouse events
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const dx = clientX - lastX;
        const dy = clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only spawn a particle if the cursor has moved enough distance
        if (distance > THROTTLE_DISTANCE) {
            spawnSmoke(clientX, clientY);
            lastX = clientX;
            lastY = clientY;
        }
    }

    // Attach event listeners
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });
}

export { initSmoke };