<script lang="ts">
    import { generateTime } from "$lib/scripts/utility";

    export let countdownToMS: number;
    // Day x2, Hour x2, Minute x2, Second x2
    let digits: string[] = new Array(8).fill("0"); 

    // Calculate digits for the remaining countdown time 
    function recalculateDigits() {
        const currentTimeMS = new Date().getTime();
        const remainingMS = countdownToMS - currentTimeMS; // TODO add elapsed handling?
        if(isNaN(remainingMS) || remainingMS < 0) {
            // If time elapsed, just make negative
            digits = new Array(8).fill("-");
        } else {
            const remainingTime = generateTime(Math.floor(remainingMS / 1000));
            digits = [
                ...`${remainingTime.day}`.padStart(2, '0').split(""),
                ...`${remainingTime.hour}`.padStart(2, '0').split(""),
                ...`${remainingTime.minute}`.padStart(2, '0').split(""),
                ...`${remainingTime.second}`.padStart(2, '0').split(""),
            ].slice(-8); // Throw out extra days?
        }
    }

    // Align 1000ms countdown interval with second granularity
    const waitIntervalMS = new Date().getTime() % 1000;
    recalculateDigits();
    setTimeout(() => {
        recalculateDigits();
        setInterval(() => {
            recalculateDigits();
        }, 1000); // Run every 100ms?
    }, waitIntervalMS);
</script>

<div class="countdown-content countdown-small">
    <div class="countdown-timer">
      <div class="countdown-item">
        <div class="countdown-digits">
          <div class="countdown-digit">{digits[0]}</div>
          <div class="countdown-digit">{digits[1]}</div>
        </div>
        <div class="countdown-label-item">days</div>
      </div>
      <div class="countdown-sep">:</div>
      <div class="countdown-item">
        <div class="countdown-digits">
          <div class="countdown-digit">{digits[2]}</div>
          <div class="countdown-digit">{digits[3]}</div>
        </div>
        <div class="countdown-label-item">hours</div>
      </div>
      <div class="countdown-sep">:</div>
      <div class="countdown-item">
        <div class="countdown-digits">
          <div class="countdown-digit">{digits[4]}</div>
          <div class="countdown-digit">{digits[5]}</div>
        </div>
        <div class="countdown-label-item">mins</div>
      </div>
      <div class="countdown-sep">:</div>
      <div class="countdown-item">
        <div class="countdown-digits">
          <div class="countdown-digit">{digits[6]}</div>
          <div class="countdown-digit">{digits[7]}</div>
        </div>
        <div class="countdown-label-item">secs</div>
      </div>
    </div>
  </div>