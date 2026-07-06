import gsap from "gsap";

export function initMagneticButtons() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            gsap.to(btn, {  
                x: (e.clientX - rect.left - rect.width / 2) * 0.25,
                y: (e.clientY - rect.top - rect.height / 2) * 0.25,
                duration: 0.3
            });
        });

        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5
            });
        });
    });
}
