# Laufen 🚗

"Laufen" is German for "to run". It's my typing race game: a paragraph shows up, you type it, and your car races an AI car to the finish line.

I built it for Hack Club's Stardance program. Basically my own little TypeRacer.

**Play it here:** https://vihaan6119.github.io/Laufen/

## how to play

1. open the link. a paragraph appears.
2. just start typing — there is no box to click into. the paragraph IS the input.
3. correct letters turn green, wrong ones turn red. your car only moves on correct letters.
4. the AI car drives at its own pace. beat it to the checkered line.
5. you have 2 minutes. when the race ends (you finish, the AI finishes, or time runs out) you get your real WPM and accuracy.
6. "Race Again" gives you a new paragraph.

## features

- type directly on the paragraph (the caret follows you, arrow keys + backspace work)
- live green/red feedback on every letter
- your car speed = your typing; the AI has a fixed speed, so it's you vs the bot
- 2 minute countdown timer
- end screen with your actual WPM and accuracy
- 4 paragraphs, picked randomly each race
- smooth car movement
- no frameworks. plain HTML, CSS and vanilla JS

## tech stack

- HTML
- CSS
- vanilla JavaScript
- GitHub Pages for hosting

## run it locally

1. clone or download the repo
2. open `index.html` in your browser

that's it. no install, no server.

## the honest story

this started as a tiny thing where a car moves when you type one sentence. then I played TypeRacer for "research", got way too excited, and it slowly grew into this: full paragraphs instead of one line, a timer, WPM, accuracy and an AI opponent.

I broke it a lot on the way. my best bugs were typos — I once named a variable `startTimer` AND a function `startTimer`, which killed the whole game, and invisible spaces at the end of my paragraphs made the race impossible to finish. I learned that half of coding is reading the error message and fixing one letter at a time.

## what's next

- difficulty levels (I built them once, removed them, might bring them back)
- more paragraphs
- a high score list (needs a backend, so maybe later)

made by Vihaan for Stardance 2026.