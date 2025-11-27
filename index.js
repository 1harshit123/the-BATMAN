gsap.registerPlugin(SplitText);

const animatableTextHeading = document.querySelector(".video-text h1");
const animatableTextPara = document.querySelector(".video-text p");

function implementionAnimation() {
    const changingText = [
        "I am Vengeance",
        "Why do we fall sir?",
        "You think darkness is your ally",
        "I am BATMAN"
    ];

    const DELAY = 5000; // 9 seconds each message

    function cycleText(index) {
        const text = changingText[index];

        scrambleText(animatableTextHeading, text, 2);
        scrambleText(animatableTextPara, text, 2.5);

        // Schedule next text
        setTimeout(() => {
            cycleText((index + 1) % changingText.length);
        }, DELAY);
    }

    cycleText(0); // Start animation
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

implementionAnimation();
