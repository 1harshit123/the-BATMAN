gsap.from(".nav-wrapper", {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: "power2.out"
});


gsap.registerPlugin(SplitText);

let split = SplitText.create(".video-text", { type: "words, chars" })

// now animate the characters in a staggered fashion
gsap.from(split.chars, {
    duration: 1,
    y: 100,         // animate from 100px below
    autoAlpha: 0,   // fade in from opacity: 0 and visibility: hidden
    stagger: 0.05,  // 0.05 seconds between each
});