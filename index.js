gsap.registerPlugin(SplitText, ScrollTrigger);

// ------------------------------
// TEXT SCRAMBLE LOGIC (Your Code)
// ------------------------------

const animatableTextHeading = document.querySelector(".video-text h1");
const animatableTextPara = document.querySelector(".video-text p");

function implementionAnimation() {
    const changingText = [
        "I am Vengeance",
        "Why do we fall sir?",
        "You think darkness is your ally",
        "I am BATMAN"
    ];

    const DELAY = 5000;

    function cycleText(index) {
        const text = changingText[index];

        scrambleText(animatableTextHeading, text, 2);
        scrambleText(animatableTextPara, text, 2.5);

        setTimeout(() => {
            cycleText((index + 1) % changingText.length);
        }, DELAY);
    }

    cycleText(0);
}

function scrambleText(element, newText, duration) {
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    const originalText = element.innerText;
    const length = Math.max(originalText.length, newText.length);
    let obj = { progress: 0 };

    gsap.fromTo(obj, { progress: 0 }, {
        progress: 1,
        duration,
        ease: "power2.out",
        onUpdate: () => {
            let output = "";
            for (let i = 0; i < length; i++) {
                if (i < obj.progress * length) {
                    output += newText[i] || "";
                } else {
                    output += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            element.innerText = output;
        }
    });
}

// ------------------------------
// HORIZONTAL SCROLL IMPLEMENTATION
// ------------------------------

const sections = gsap.utils.toArray(".video-section");

gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal-wrapper",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + document.querySelector(".horizontal-wrapper").offsetWidth
    }
});

implementionAnimation();

