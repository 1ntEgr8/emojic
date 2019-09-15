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

const text = `You would not believe your eyes
If ten million fireflies
Lit up the world as I fell asleep
'Cause they fill the open air
And leave teardrops everywhere
You'd think me rude but I would just stand and stare
I'd like to make myself believe that planet earth turns slowly
It's hard to say that I'd rather stay awake when I'm asleep
'Cause everything is never as it seems
'Cause I'd get a thousand hugs
From ten thousand lightning bugs
As they tried to teach me how to dance
A foxtrot above my head
A sock hop beneath my bed
A disco ball is just hanging by a thread (thread, thread)
I'd like to make myself believe that planet earth turns slowly
It's hard to say that I'd rather stay awake when I'm asleep
'Cause everything is never as it seems (when I fall asleep)
Leave my door open just a crack
Please take me away from here
'Cause I feel like such an insomniac
Please take me away from here
Why do I tire of counting sheep
Please take me away from here
When I'm far too tired to fall asleep
To ten million fireflies
I'm weird cause I hate goodbyes
I got misty eyes as they said farewell (said farewell)
But I'll know where several are
If my dreams get real bizarre
'Cause I saved a few and I keep them in a jar (jar, jar)
I'd like to make myself believe that planet earth turns slowly
It's hard to say that I'd rather stay awake when I'm asleep
'Cause everything is never as it seems (when I fall asleep)
I'd like to make myself believe that planet earth turns slowly
It's hard to say that I'd rather stay awake when I'm asleep
'Cause everything is never as it seems (when I fall asleep)`;


console.log(emojifyText(text));