const emoji = require('emojilib');
const keywords = new Map();
const SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~'; // from emoji-translate @notwaldorf
const emoji_colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "white",
    "black"
];

// populate keywords for easy search
for (let o in emoji.lib) {
    if (emoji.lib[o].category != "flags") {
        for (let keyword of emoji.lib[o].keywords) {
            keywords.set(keyword, emoji.lib[o]);
        }
    }
}

function emojifyText(text) {
    let words = text.replace(/\n/g, " ").split(" ");
    words = words.map(word => word.toLowerCase());
    const emojified = [];

    for (let word of words) {
        const emoji = findEmoji(word);
        if (emoji) {
            emojified.push(emoji);
        }
    }
    
    return emojified;
}

function findEmoji(word) {
    word = word.trim();
    if (SYMBOLS.includes(word[0])) {
        word = word.slice(1, word.length);
    } else if (SYMBOLS.includes(word[word.length - 1])) {
        word = word.slice(0, word.length - 1);
    }
    if (emoji_colors.includes(word)) {
        word += `_circle`;
    }
    if (word == "me" ||
        word == "i" ||
        word == "my" ||
        word == "mine") {
            return emoji.lib["grinning"].char;
        }
    if (emoji.ordered.includes(word)) {
        return emoji.lib[word].char;
    } else if (keywords.has(word)) {
        return keywords.get(word).char;
    } else {
        return null;
    }
}

const text = `Yeah, I'm gonna take my horse to the old town road
I'm gonna ride 'til I can't no more
I'm gonna take my horse to the old town road
I'm gonna ride 'til I can't no more (Kio, Kio)
I got the horses in the back
Horse tack is attached
Hat is matte black
Got the boots that's black to match
Ridin' on a horse, ha
You can whip your Porsche
I been in the valley
You ain't been up off that porch, now
Can't nobody tell me nothin'
You can't tell me nothin'
Can't nobody tell me nothin'
You can't tell me nothin'
Ridin' on a tractor
Lean all in my bladder
Cheated on my baby
You can go and ask her
My life is a movie
Bull ridin' and boobies
Cowboy hat from Gucci
Wrangler on my booty
Can't nobody tell me nothin'
You can't tell me nothin'
Can't nobody tell me nothin'
You can't tell me nothin'
Yeah, I'm gonna take my horse to the old town road
I'm gonna ride 'til I can't no more
I'm gonna take my horse to the old town road
I'm gonna ride 'til I can't no more
I got the`;


console.log(emojifyText(text));