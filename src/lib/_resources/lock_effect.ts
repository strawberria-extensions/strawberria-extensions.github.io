export const template = `{# Templating for lock effect, including support for recursive handling through macros #}
{# Available: seconds, showSeconds | generateTimeString #}
{# Random utility macros #}
{% macro plusMinus(number) -%}
    {% if number > 0 -%}
        +
    {%- elif number < 0 -%}
        -
    {%- endif %}
{%- endmacro %}
{% macro extensionDisplayName(slug) -%}
    {% if slug == "dice" -%}
        Dice
    {%- elif slug == "guess-timer" -%}
        Guess the Timer
    {%- elif slug == "link" -%}
        Share Link
    {%- elif slug == "pillory" -%}
        Pillory
    {%- elif slug == "random-events" -%}
        Random Events
    {%- elif slug == "tasks" -%}
        Tasks
    {%- elif slug == "temporary-opening" -%}
        Hygiene Opening
    {# Personal extensions #}
    {%- elif slug == "extended-wheel-of-fortune" -%}
        🍓/Extended Wheel of Fortune 
    {%- elif slug == "jigsaw-puzzles" -%}
        🍓/Jigsaw Puzzles
    {%- elif slug == "key-hunt" -%}
        🍓/Key Hunt
    {%- endif %}
{%- endmacro %}

{# Macro for generating display form for lock effects, recursable #}
{% macro generate(lockEffect) -%}
{% if lockEffect.key == "resetCooldown" -%}
    **[{{ extensionDisplayName(lockEffect.params[0]) }}]** Reset the cooldown {% if lockEffect.params[0] == "extended-wheel-of-fortune" -%}
        {%- set wheel = lookup["extended-wheel-of-fortune"][lockEffect.params[1]] -%} of the wheel "{{ wheel.display }}"
    {%- endif %}
{%- elif lockEffect.key == "customText" -%}
    {{ lockEffect.params[0] }}
{%- elif lockEffect.key == "resetLock" -%}
    Reset the lock to its initial state
{%- elif lockEffect.key == "unlock" -%}
    Unlock the lock
{%- elif lockEffect.key == "freeze" -%}
    {% if lockEffect.params[0] == true -%}
        Freeze
    {%- elif lockEffect.params[0] == false -%}
        Unfreeze
    {%- else -%}
        Toggle freeze on
    {%- endif %} the lock
{%- elif lockEffect.key == "updateLockDuration" -%}
    {# Generate value 1 and value 2 before constructing #}
    {% set value1 -%}
        {% if lockEffect.params[0] == "multiply" -%}
            x{{ lockEffect.params[1] }}
        {%- else -%}
            {{ plusMinus(lockEffect.params[1]) }}{{ lockEffect.params[1] | generateTimeString }}
        {%- endif %}
    {%- endset %}
    {%- set value2 = undefined -%} {# Generate if defined #}
    {% if lockEffect.params[2] != undefined %}
        {% set value2 -%}
            {% if lockEffect.params[0] == "multiply" -%}
                x{{ lockEffect.params[2] }}
            {%- else -%}
                {{ plusMinus(lockEffect.params[2]) }}{{ lockEffect.params[2] | generateTimeString }}
            {%- endif %}
        {%- endset %}
    {% endif %}
    {# Construct the string depending on whether value1 is defined too #}
    {% if lockEffect.params[0] == "multiply" -%}
        Multiply
    {%- elif lockEffect.params[0] == "modify" -%}
        Modify
    {%- else -%}
        Set
    {%- endif %} the remaining lock time {% if lockEffect.params[0] == "set" -%}
        to
    {%- else -%} 
        by
    {%- endif %} {% if value2 != undefined -%}
        between [{{ value1 }}] and [{{ value2 }}]
    {%- else -%}
        [{{ value1 }}]
    {%- endif %}
{%- elif lockEffect.key == "updateLockDisplay" -%}
    {% if lockEffect.params[0] == true -%}
        Display
    {%- elif lockEffect.params[0] == false -%}
        Hide
    {%- else -%}
        Toggle displaying
    {%- endif %} the remaining lock time
{%- elif lockEffect.key == "updateLockHide" -%}
    {% if lockEffect.params[0] == true -%}
        Hide
    {%- elif lockEffect.params[0] == false -%}
        Show
    {%- else -%}
        Toggle hiding
    {%- endif %} time logs in history
{%- elif lockEffect.key == "pillory" -%}
    {# Omit the message from the lock effect display #}
    **[Pillory]** Enter the pillory for {{ lockEffect.params[0] | generateTimeString }}
{%- elif lockEffect.key == "pilloryUpdateDuration" -%}
    {# Generate value 1 and value 2 before constructing #}
    {% set value1 -%}
        {% if lockEffect.params[0] == "multiply" -%}
            x{{ lockEffect.params[1] }}
        {%- else -%}
            {{ plusMinus(lockEffect.params[1]) }}{{ lockEffect.params[1] | generateTimeString }}
        {%- endif %}
    {%- endset %}
    {%- set value2 = undefined -%} {# Generate if defined #}
    {% if lockEffect.params[2] != undefined %}
        {% set value2 -%}
            {% if lockEffect.params[0] == "multiply" -%}
                x{{ lockEffect.params[2] }}
            {%- else -%}
                {{ plusMinus(lockEffect.params[2]) }}{{ lockEffect.params[2] | generateTimeString }}
            {%- endif %}
        {%- endset %}
    {% endif %}
    {# Construct the string depending on whether value1 is defined too #}
    **[Pillory]** {% if lockEffect.params[0] == "multiply" -%}
        Multiply
    {%- elif lockEffect.params[0] == "modify" -%}
        Modify
    {%- else -%}
        Set
    {%- endif %} the added time per vote {% if lockEffect.params[0] == "set" -%}
        to
    {%- else -%} 
        by
    {%- endif %} {% if value2 != undefined -%}
        between [{{ value1 }}] and [{{ value2 }}]
    {%- else -%}
        [{{ value1 }}]
    {%- endif %}
{# Should these two be combined eventually? #}
{%- elif lockData.key == "enableExtension" -%}
    Enable the extension "{{ extensionDisplayName(lockData.params[0]) }}"
{%- elif lockData.key == "disableExtension" -%}
    Disable the extension "{{ extensionDisplayName(lockData.params[0]) }}"
{%- elif lockEffect.key == "hygieneUnlock" -%}
    **[Hygiene Opening]** Temporarily open the lock
{%- elif lockEffect.key == "requestVerification" -%}
    **[Verification Picture]** Request a verification picture
{%- elif lockEffect.key == "assignTask" -%}
    {# Is it necessary to specify the number of points worth? #}
    **[Tasks]** Assign the task "{{ lockEffect.params[0] }}"
{%- elif lockEffect.key == "assignTaskRandom" -%}
    {# Skip the voting process if vote duration, aka. params[0] isn't specified #}
    **[Tasks]** {% if lockEffect.params[0] == undefined -%}
        Assign a random task
    {%- else -%}
        Have the community vote on a task
    {%- endif %}
{%- elif lockEffect.key == "modifyTasks" -%}
    {# Don't bother saying anything other than "modify the task list" #}
    **[Tasks]** Modify the task list (too complex to display)
{%- elif lockEffect.key == "resetTaskPoints" -%}
    **[Tasks]** Reset the number of task points earned
{%- elif lockEffect.key == "tasksUpdateRequiredPoints" -%}
    {# Generate value 1 and value 2 before constructing #}
    {% set value1 -%}
        {% if lockEffect.params[0] == "multiply" -%}
            x{{ lockEffect.params[1] }}
        {%- else -%}
            {{ plusMinus(lockEffect.params[1]) }}{{ lockEffect.params[1] }}
        {%- endif %}
    {%- endset %}
    {%- set value2 = undefined -%} {# Generate if defined #}
    {% if lockEffect.params[2] != undefined %}
        {% set value2 -%}
            {% if lockEffect.params[0] == "multiply" -%}
                x{{ lockEffect.params[2] }}
            {%- else -%}
                {{ plusMinus(lockEffect.params[2]) }}{{ lockEffect.params[2] }}
            {%- endif %}
        {%- endset %}
    {% endif %}
    {# Construct the string depending on whether value1 is defined too #}
    {% if lockEffect.params[0] == "multiply" -%}
        Multiply
    {%- elif lockEffect.params[0] == "modify" -%}
        Modify
    {%- else -%}
        Set
    {%- endif %} the number of required points {% if lockEffect.params[0] == "set" -%}
        to
    {%- else -%} 
        by
    {%- endif %} {% if value2 != undefined -%}
        between [{{ value1 }}] and [{{ value2 }}]
    {%- else -%}
        [{{ value1 }}]
    {%- endif %}
{%- elif lockEffect.key == "shareLinkModifyKey" -%}
    {# Updates one of the keys within share link, such as visits required / add time / remoe time #}
    {# Generate value 0 and value 1 before constructing #}
    {% set value0 -%}
        {% if lockEffect.params[0] == "nbVisits" -%}
            the number of required visits
        {%- elif lockEffect.params[0] == "timeToAdd" -%}
            the time to add per vote
        {%- else -%}
            the time to remove per vote
        {%- endif %}
    {%- endset %}
    {% set value2 -%}
        {% if lockEffect.params[1] == "multiply" -%}
            x{{ lockEffect.params[2] }}
        {%- else -%}
            {{ plusMinus(lockEffect.params[2]) }}{% if lockEffect.params[0] != "nbVisits" -%}
                {{ lockEffect.params[2] | generateTimeString }}
            {%- else -%}
                {{ lockEffect.params[2] }}
            {%- endif %}
        {%- endif %}
    {%- endset %}
    {%- set value3 = undefined -%} {# Generate if defined #}
    {% if lockEffect.params[3] != undefined %}
        {% set value3 -%}
            {% if lockEffect.params[1] == "multiply" -%}
                x{{ lockEffect.params[3] }}
            {%- else -%}
                {{ plusMinus(lockEffect.params[3]) }}{% if lockEffect.params[0] != "nbVisits" -%}
                    {{ lockEffect.params[3] | generateTimeString }}
                {%- else -%}
                    {{ lockEffect.params[3] }}
                {%- endif %}
            {%- endif %}
        {%- endset %}
    {% endif %}
    {# Construct the string depending on whether value1 is defined too #}
    **[Share Link]** {% if lockEffect.params[1] == "multiply" -%}
        Multiply
    {%- elif lockEffect.params[1] == "modify" -%}
        Modify
    {%- else -%}
        Set
    {%- endif %} {{ value0 }} {% if lockEffect.params[1] == "set" -%}
        to
    {%- else -%} 
        by
    {%- endif %} {% if value3 != undefined -%}
        between [{{ value2 }}] and [{{ value3 }}]
    {%- else -%}
        [{{ value2 }}]
    {%- endif %}
{%- elif lockEffect.key == "shareLinkSetLoggedIn" -%}
    **[Share Link]** {% if lockEffect.params[0] == true -%}
        Enable
    {%- elif lockEffect.params[0] == false -%}
        Disable
    {%- else -%}
        Toggle
    {%- endif %} the logged-in requirement to vote
{%- elif lockEffect.key == "diceUpdateDuration" -%}
    {# Generate value 1 and value 2 before constructing #}
    {% set value1 -%}
        {% if lockEffect.params[0] == "multiply" -%}
            x{{ lockEffect.params[1] }}
        {%- else -%}
            {{ plusMinus(lockEffect.params[1]) }}{{ lockEffect.params[1] | generateTimeString }}
        {%- endif %}
    {%- endset %}
    {%- set value2 = undefined -%} {# Generate if defined #}
    {% if lockEffect.params[2] != undefined %}
        {% set value2 -%}
            {% if lockEffect.params[0] == "multiply" -%}
                x{{ lockEffect.params[2] }}
            {%- else -%}
                {{ plusMinus(lockEffect.params[2]) }}{{ lockEffect.params[2] | generateTimeString }}
            {%- endif %}
        {%- endset %}
    {% endif %}
    {# Construct the string depending on whether value1 is defined too #}
    **[Dice]** {% if lockEffect.params[0] == "multiply" -%}
        Multiply
    {%- elif lockEffect.params[0] == "modify" -%}
        Modify
    {%- else -%}
        Set
    {%- endif %} the duration multiplier {% if lockEffect.params[0] == "set" -%}
        to
    {%- else -%} 
        by
    {%- endif %} {% if value2 != undefined -%}
        between [{{ value1 }}] and [{{ value2 }}]
    {%- else -%}
        [{{ value1 }}]
    {%- endif %}
{%- elif lockEffect.key == "randomEventsModifyDifficulty" -%}
    **[Random Events]** Set the difficulty to {{ lockEffect.params[0] | capitalize }}
{%- elif lockEffect.key == "guessTimerUpdateKey" -%}
    {# Updates one of the keys within share link, such as visits required / add time / remoe time #}
    {# Generate value 0 and value 1 before constructing #}
    {% set value0 -%}
        {% if lockEffect.params[0] == "minRandomTime" -%}
            the time minimum added time
        {%- else -%}
            the maximum added time
        {%- endif %}
    {%- endset %}
    {% set value2 -%}
        {% if lockEffect.params[1] == "multiply" -%}
            x{{ lockEffect.params[2] }}
        {%- else -%}
            {{ plusMinus(lockEffect.params[2]) }}{{ lockEffect.params[2] | generateTimeString }}
        {%- endif %}
    {%- endset %}
    {%- set value3 = undefined -%} {# Generate if defined #}
    {% if lockEffect.params[3] != undefined %}
        {% set value3 -%}
            {% if lockEffect.params[1] == "multiply" -%}
                x{{ lockEffect.params[3] }}
            {%- else -%}
                {{ plusMinus(lockEffect.params[3]) }}{{ lockEffect.params[3] | generateTimeString }}
            {%- endif %}
        {%- endset %}
    {% endif %}
    {# Construct the string depending on whether value1 is defined too #}
    **[Guess the Timer]** {% if lockEffect.params[1] == "multiply" -%}
        Multiply
    {%- elif lockEffect.params[1] == "modify" -%}
        Modify
    {%- else -%}
        Set
    {%- endif %} {{ value0 }} {% if lockEffect.params[1] == "set" -%}
        to
    {%- else -%} 
        by
    {%- endif %} {% if value3 != undefined -%}
        between [{{ value2 }}] and [{{ value3 }}
    {%- else -%}
        [{{ value2 }}]
    {%- endif %}
{%- elif lockEffect.key == "delayLockEffect" -%}
    Delay by {{ lockEffect.params[1] | generateTimeString }} ➜ {{ generate(lockEffect.params[0]) }}
{# TODO reason preventing unlocking? #}
{%- elif lockEffect.key == "extendedSetDisabled" -%}
    {%- set wheel = lookup["extended-wheel-of-fortune"][lockEffect.params[0]] -%}
    **[🍓/Extended Wheel of Fortune]** {% if lockEffect.params[1] == true -%}
        Enable
    {%- elif lockEffect.params[1] == false -%}
        Disable
    {%- else -%}
        Toggle enabling
    {%- endif %} the wheel "{{ wheel.display }}"
{%- elif lockEffect.key == "extendedAddOutcome" -%}
    {%- set wheel = lookup["extended-wheel-of-fortune"][lockEffect.params[0]] -%}
    **[🍓/Extended Wheel of Fortune]** Add an outcome to the wheel "{{ wheel.display }}" named "{{ lockEffect.params[1].display }}"
{%- elif lockEffect.key == "extendedRemoveOutcome" -%}
    {%- set wheel = lookup["extended-wheel-of-fortune"][lockEffect.params[0]] -%}
    **[🍓/Extended Wheel of Fortune]** Removed an outcome from the wheel "{{ wheel.display }}" named "{{ lockEffect.params[1] }}"
{%- elif lockEffect.key == "extendedUpdateWeight" -%}
    {%- set wheel = lookup["extended-wheel-of-fortune"][lockEffect.params[0]] -%}

    {# Generate value 3 and value 4 before constructing #}
    {% set value3 -%}
        {% if lockEffect.params[2] == "multiply" -%}
            x{{ lockEffect.params[3] }}
        {%- else -%}
            {{ plusMinus(lockEffect.params[3]) }}{{ lockEffect.params[3] | generateTimeString }}
        {%- endif %}
    {%- endset %}
    {%- set value4 = undefined -%} {# Generate if defined #}
    {% if lockEffect.params[4] != undefined %}
        {% set value4 -%}
            {% if lockEffect.params[2] == "multiply" -%}
                x{{ lockEffect.params[4] }}
            {%- else -%}
                {{ plusMinus(lockEffect.params[4]) }}{{ lockEffect.params[4] | generateTimeString }}
            {%- endif %}
        {%- endset %}
    {% endif %}
    {# Construct the string depending on whether value1 is defined too #}
    **[Extended Wheel of Fortune]** Within the wheel "{{ wheel.display }}", {% if lockEffect.params[2] == "multiply" -%}, 
        multiply
    {%- elif lockEffect.params[2] == "modify" -%}
        modify
    {%- else -%}
        set
    {%- endif %} the weight of the outcome named "{{ lockEffect.params[1]}}" {% if lockEffect.params[2] == "set" -%}
        to
    {%- else -%} 
        by
    {%- endif %} {% if value4 != undefined -%}
        between [{{ value3 }}] and [{{ value4 }}]
    {%- else -%}
        [{{ value4 }}]
    {%- endif %}
{%- endif %}
{%- endmacro %}

{# Generate from top level, note naming convention #}
{{- generate(topLockEffect) -}}`;