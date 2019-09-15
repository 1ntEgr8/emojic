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

const text = `They say oh my god I see the way you shine
Take your hand, my dear, and place them both in mine
You know you stopped me dead when I was passing by
And now I beg to see you dance just one more time
Ooh I see you, see you, see you every time
And oh my I, I like your style
You, you make me, make me, make me wanna cry
And now I beg to see you dance just one more time
So I say
Dance for me, dance for me, dance for me oh oh oh
I've never seen anybody do the things you do before
They say move for me, move for me, move for me ay ay ay
And when you're done I'll make you do it all again
I said oh my god I see you walking by
Take my hands, my dear, and look me in my eyes
Just like a monkey I've been dancing my whole life
And you just beg to see me dance just one more time
Ooh I see you, see you, see you every time
And oh my I, I like your style
You, you make me, make me, make me wanna cry
And now I beg to see you dance just one more time
So I say
Dance for me, dance for me, dance for me oh oh oh
I've never seen anybody do the things you do before
They say move for me, move for me, move for me ay ay ay
And when you're done I'll make you do it all again
They say
Dance for me, dance for me, dance for me oh oh oh, oh oh, oh oh
I've never seen anybody do the things you do before
They say move for me, move for me, move for me ay ay ay
And when you're done I'll make you do it all again
Ooh (all again, all again)
Woah-oh, woah-oh, oh
Ooh (all again, all again)
Ah ah, ah ah, ay
They say
Dance for me, dance for me, dance for me oh oh oh
I've never seen anybody do the things you do before
They say move for me, move for me, move for me ay ay ay
And when you're done I'll make you do it all again
They say
Dance for me, dance for me, dance for me oh oh oh, oh oh, oh oh
I've never seen anybody do the things you do before
They say move for me, move for me, move for me ay ay ay
And when you're done I'll make you do it all again
All again`;


console.log(emojifyText(text));