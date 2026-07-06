export const quotes = [
    "The city doesn't need a hero it can see. It needs one it can believe in.",
    "Fear is a tool. Used right, it protects the people who can't protect themselves.",
    "Every night I choose the same fight, because someone has to stand between the dark and the people who live in it.",
    "A symbol can outlast any one man wearing it.",
    "I don't need to be remembered. I need the city to still be standing tomorrow.",
    "The line between justice and vengeance is thinner than most people think — I walk it anyway."
];

export function setRandomQuote() {
    const el = document.getElementById('hero-quote');
    if (!el) return;
    const pick = quotes[Math.floor(Math.random() * quotes.length)];
    el.textContent = pick;
}
