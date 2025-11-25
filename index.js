gsap.registerPlugin(SplitText);

// Select the audio element
const sound = document.querySelector("#key-sound");

// Helper function to play sound (Cloning allows overlapping sounds for fast typing)
function playClick() {
    if (sound) {
        let click = sound.cloneNode(); // Clone so multiple sounds can play at once
        click.volume = 0.5; // Adjust volume (0.0 to 1.0)
        click.play().catch(e => console.log("User must interact with page first"));
    }
}

let split = SplitText.create(".video-text", { type: "chars" });

// Iterate through each character to attach the specific sound trigger
split.chars.forEach((char, index) => {
    gsap.from(char, {
        duration: 1,
        rotateX: 180,       // Starts Upside Down (Inverted)
        opacity: 0,
        transformOrigin: "center center", // Ensures it flips exactly on its axis
        delay: index * 0.05, // Manual stagger: index * time
        ease: "back.out(1.7)", // A little 'overshoot' makes it feel mechanical/heavy
        onStart: () => {
            playClick(); // Triggers sound exactly when this letter appears
        }
    });
});

// opacity, duration, delay, stagger