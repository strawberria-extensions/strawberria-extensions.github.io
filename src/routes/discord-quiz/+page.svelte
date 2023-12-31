<script lang="ts">
    import { generateQuizPassword, quizQuestionsData } from "$lib/scripts/hidden";

    let stage: "quiz" | "submit" = "quiz";
    let password = "";
    let quizAnswersData: any[] = quizQuestionsData
        .map((_) => []);
    (async function() {
        password = await generateQuizPassword();
    }())
    
    function optionClick(quizIndex: number, paramIndex: number) {
        const quizQuestionData = quizQuestionsData[quizIndex];
        const quizAnswerData = quizAnswersData[quizIndex];
        if(quizQuestionData.type === "choice_multiple") {
            const foundIndex = quizAnswerData.indexOf(paramIndex);
            if(foundIndex !== -1) {
                // Found, toggle option off
                quizAnswerData.splice(foundIndex, 1);
            } else {
                quizAnswerData.push(paramIndex);
            }
            quizAnswerData.sort();
            quizAnswersData = quizAnswersData;
        } else if(quizQuestionData.type === "choice_single") {
            const foundIndex = quizAnswerData.indexOf(paramIndex);
            quizAnswersData[quizIndex] = foundIndex === -1
                ? [paramIndex] : [];
        }
    }

    function checkAnswers() {
        for(const [quizIndexRaw, quizQuestionData] of Object.entries(quizQuestionsData)) {
            const quizIndex = parseInt(quizIndexRaw);
            if(JSON.stringify(quizQuestionData.correct) !== JSON.stringify(quizAnswersData[quizIndex])) {
                // Send HTTP request to log incorrect answer
                fetch("https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/misc_utilities", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4"
                    },
                    body: JSON.stringify({
                        action: "discord_quiz-log",
                        quizAnswerData: quizAnswersData
                    })
                })

                return false;
            }
        }

        return true;
    }
</script>

<div class="container-bg min-w-0 min-h-0 p-4 space-y-2 grow">
    <div class="quiz-container card-content flex flex-col items-center w-full space-y-2">
        <div class="flex flex-col items-stretch w-full space-y-[0.5em]">
            <h4 class="text-center">FemChaste Server Entrance Quiz</h4>
            <span class="caption">
                Screening quiz for gaining complete server access (with unlimited attempts) - please thoroughly read through
                <a class="span-click" href="https://discord.com/channels/1042651214447386704/1080726771273576468">#server-rules</a>
                and
                <a class="span-click" href="https://discord.com/channels/1042651214447386704/1130710505598746645">#guide-safety</a>
                before attempting. Upon completion, you'll receive a unique "password" for verifying using the command 
                <span class="font-mono" style="background-color: #272533">?verify &#123;password&#125;</span> (without the curly braces). Please note these rules in particular:
            </span>
            <span class="caption">
                ✦ <span class="underline">Absolutely no minors (&lt;18) allowed whatsoever</span> - staff members reserve the right to age-check when necessary.
                <br>✦ <span class="underline">Absolutely zero tolerance</span> for misogyny, objectification, patriarchy, and other abusive behavior.
                <br>✦ Please don't openly solicit yourself as a keyholder (including spamming, random DMs, etc.) without discussion context.
            </span>
            <span class="text-center">
                Please contact 
                <a class="span-click" href="https://discord.com/channels/@me/777516217216401439">@strawberria</a>
                through Discord regarding any bugs, suggestions, and incorrect information.
            </span>
        </div>
        {#if stage === "quiz"}
            {#each quizQuestionsData as quizQuestionData, quizIndex}
                <hr class="hr">
                {@const quizAnswerData = quizAnswersData[quizIndex]}
                <div class="w-full flex flex-col">
                    <div class="w-full mb-2">
                        <h5 class="mb-0">Question {quizIndex+1}: {quizQuestionData.prompt}</h5>
                        {#if quizQuestionData.note !== undefined}
                            <span class="caption">{quizQuestionData.note}</span>
                        {/if}
                    </div>
                    {#if quizQuestionData.type === "choice_multiple" || quizQuestionData.type === "choice_single"}
                        <div class="flex flex-col space-y-0.5">
                            {#each quizQuestionData.params as param, paramIndex}
                                {@const includes = quizAnswerData.includes(paramIndex)}
                                <a class="text-lg quiz-answer-base"
                                    class:quiz-answer-unselected={!includes}
                                    class:quiz-answer-selected={includes}
                                    on:click={() => { optionClick(quizIndex, paramIndex); }}>{param}</a>
                            {/each}
                        </div>
                    {/if}
                </div>
            {/each}
            <button type="button" class="btn btn-primary btn-lg mt-3"
                on:click={() => { stage = "submit" }}>
                Submit Quiz
            </button>
        {:else}
            <hr class="hr">
            {#if checkAnswers()} 
                <div class="w-full flex flex-col space-y-1 items-center">
                    <div class="flex flex-col items-center">
                        <h5 class="m-0">Congratulations, you passsed the server entrance quiz!</h5>
                        <span class="caption">Thank you for taking the time to keep our server a safe space for everyone.</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <span>
                            Your unique verification password is: 
                            <span class="caption">{password === "" ? "[ password generating... ]" : password}</span>
                        </span>
                        {#if password !== ""}
                            <span class="caption">
                                Unlock complete server access by sending
                                <span class="text-mono" style="background-color: #272533">?verify {password}</span>
                                within 
                                <a class="span-click" href="https://discord.com/channels/1042651214447386704/1125624397991006309">#entrance-quiz</a>.
                            </span>
                            <span class="caption">
                                Please don't share this password with anyone as it's one-time use - thank you again!
                            </span>
                        {/if}
                    </div>
                </div>
            {:else}
                <div class="w-full flex flex-col space-y-2 items-center">
                    <h5 class="m-0">Sorry, one or more of your answers are incorrect.</h5>
                    <div class="flex flex-col items-center">
                        <span class="caption">
                            Read through 
                            <a class="span-click" href="https://discord.com/channels/1042651214447386704/1080726771273576468">#server-rules</a>
                            and
                            <a class="span-click" href="https://discord.com/channels/1042651214447386704/1130710505598746645">#guide-safety</a>
                            again, then reattempt the quiz.
                        </span>
                    </div>
                    <button type="button" class="btn btn-primary btn-lg"
                        on:click={() => { stage = "quiz" }}>
                        Go Back
                    </button>
                </div>
            {/if}
        {/if}
    </div>
</div>

<style>
    .container-bg {
        /* background-color: #272533; */
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .quiz-container {
        width: max(min(32em, 100%), 55%);
    }

    .quiz-answer-base {
        cursor: pointer;
        padding: 0.25em 0em 0.25em 1em;
        border-radius: 0.5em;
    }

    .quiz-answer-unselected {
        color: #a4a7b7;
        border: 2px solid #535458;
    }

    .quiz-answer-unselected:hover {
        color: #b9bbc9;
        border: 2px solid #9da0a5;
    }

    .quiz-answer-selected {
        color: inherit;
        border: 2px solid #ffffff;
    }

    .hr {
        border-color: #686b79;
        width: 100%;
    }
</style>