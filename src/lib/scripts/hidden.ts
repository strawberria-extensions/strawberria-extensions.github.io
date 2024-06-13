import type { QuizQuestionData } from "./quiz";
import { generateRandomString } from "./utility";

export let quizQuestionsData: QuizQuestionData[] = [
    { 
        "type": "choice_multiple",
        "prompt": "What forms of activity are allowed within the server?",
        "params": [
            "Looking for chastity belt recommendations and wearing tips",
            "Asking out of nowhere whether anyone is looking for a keyholder",
            "Discussing about why women deserve to stay locked within chastity",
            "Asking for suggestions on keeping your wife honest through chastity",
            "Posting about your experiences wearing a certain chastity belt design"
            // "Sharing and glorifying female chastity gifs captioned \"Anal only\"",
        ],
        "correct": [0, 4]
    },
    { 
        "type": "choice_single",
        "prompt": "What's the maximum recommended time interval between hygiene unlocks?",
        "note": "Please refer to #guide-safety for hygiene information - this differs for everyone.",
        "params": [
            "1 day",
            "3 days",
            "1 week",
            "1 month",
            "1 year",
            "Indefinite",
        ],
        "correct": [2]
    },
    { 
        "type": "choice_multiple",
        "prompt": "What actions and traits of a keyholder are *definitely, always, 100%* red flags?",
        "note": "Please read through #guide-safety and the linked Kynk101 articles beforehand - what separates the good keyholders from the bad?",
        "params": [
            "Encouraging you to provide feedback and suggestions regarding the dynamic as you're comfortable.",
            "Pressuring you to surrender your emergency key to prevent any \"cheating\" during your chastity.",
            "Avoiding any discussions regarding emergencies, hygiene, and safety within the dynamic.",
            "Requesting on-demand or periodic verification pictures only if you're completely comfortable.",
            "Recommending you rules and restrictions beceause \"that's what a true submissive would do\".",
            "Dismissing *any* backtalk or complaints whatsoever as \"bratting\" and immediately assigning punishment.",
            "Assigning degrading tasks including self-humiliation, toy play, and worshipping according to negotiated limits.",
        ],
        "correct": [1, 2, 4, 5]
    },
    { 
        "type": "choice_multiple",
        "prompt": "What are valid reasons to unlock during a chastity dynamic?",
        "note": "Think about this carefully, remember that kink dynamics should always be *mutually beneficial* for both parties.",
        "params": [
            `"I'm currently feeling under the weather, please don't ask - I'm not comfortable sharing."`,
            `"I'm going out with friends tonight... *really* not comfortable potentially revealing the belt."`,
            `"I don't really think this dynamic is working out, I'd like to get unlocked."`,
            `"I'm not really sure whether this belt is wearable while jogging and working out..."`,
            `"Emergency, can't elaborate further - need unlock now." (that's what the emergency key is for!)`,
            `"Going on a date tonight, hopefully goes well~ Not comfortable wearing the belt though!"`,
            `"Finals are coming up, would like a break from the dynamic - need to pay full attention to studying."`,
        ],
        "correct": [0, 1, 2, 3, 4, 5, 6]
    },
]

function hash(text: string) {
    const utf8 = new TextEncoder().encode(text);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
        return hashHex;
    });
}

export async function generateQuizPassword() {
    while(true) {
        const gen = generateRandomString(32);
        const val = await hash(gen);
        if(val.endsWith("0000")) {
            return gen.split("").reverse().join("");
        }
    }
}