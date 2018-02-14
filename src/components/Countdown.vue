<template>
  <div>
    <label id="theme-changer">
     <h1 class="titlev">Vue js Project</h1>
<span style="color:beige">Choose theme   → </span>
        <select name="theme" id="theme">
            <option data-baseColor="#a8caba" data-bgColorFirst="#5d4157" data-bgColorSecond="#a8caba" value="default">default</option>
            <option data-baseColor="#444"   data-bgColorFirst="#4b6cb7" data-bgColorSecond="#182848" value="light">light</option>
            <option data-baseColor="white"  data-bgColorFirst="#232526" data-bgColorSecond="#414345"value="dark">dark</option>
            <option data-baseColor="#a8caba" data-bgColorFirst="#4776e6" data-bgColorSecond="#8e54e9" value="Electric violet">Electric violet</option>
            <option data-baseColor="#444"   data-bgColorFirst="#614385" data-bgColorSecond="#516395" value="Kashmir">Kashmir</option>
            <option data-baseColor="white"  data-bgColorFirst="#16222a" data-bgColorSecond="#3a6073"value="Cool">Cool</option>
        </select>
    </label>

    <h1 style="color:white">JavaScript Calculator</h1>


    <div id="calculator" class="calculator">

      <button id="clear" class="clear">C</button>

      <div id="viewer" class="viewer">0</div>

      <button class="num" data-num="7">7</button>
      <button class="num" data-num="8">8</button>
      <button class="num" data-num="9">9</button>
      <button data-ops="plus" class="ops">+</button>

      <button class="num" data-num="4">4</button>
      <button class="num" data-num="5">5</button>
      <button class="num" data-num="6">6</button>
      <button data-ops="minus" class="ops">-</button>

      <button class="num" data-num="1">1</button>
      <button class="num" data-num="2">2</button>
      <button class="num" data-num="3">3</button>
      <button data-ops="times" class="ops">*</button>

      <button class="num" data-num="0">0</button>
      <button class="num" data-num=".">.</button>
      <button id="equals" class="equals" data-result="">=</button>
      <button data-ops="divided by" class="ops">/</button>
    </div>

    <button id="reset" class="reset">Reset</button>
  </div>

</template>
<script>
  import Vue from 'vue'

  export default {



    mounted() {
      var currentTheme;
      var root = document.querySelector(':root');
      var button = document.querySelectorAll('button');

      // Shortcut to get elements
      var el = function (element) {
        if (element.charAt(0) === "#") { // If passed an ID...
          return document.querySelector(element); // ... returns single element
        }

        return document.querySelectorAll(element); // Otherwise, returns a nodelist
      };

      // Variables
      var themeInput = document.querySelector('#theme'),
        viewer = el("#viewer"), // Calculator screen where result is displayed
        equals = el("#equals"), // Equal button
        nums = el(".num"), // List of numbers
        ops = el(".ops"), // List of operators
        theNum = "", // Current number
        oldNum = "", // First number
        resultNum, // Result
        operator, // Batman
        selectOption,
        currentTheme;
      console.log(themeInput)
      themeInput.addEventListener('change', function (e) {
        // get selected option
        selectOption = this.options[this.selectedIndex];

        // change values to current theme
        currentTheme = {
          baseColor: selectOption.getAttribute('data-baseColor'),
          bgColorFirst: selectOption.getAttribute('data-bgColorFirst'),
          bgColorSecond: selectOption.getAttribute('data-bgColorSecond')
        };
        for (var key in currentTheme) {

          root.style.setProperty("--" + key, currentTheme[key]);


        }
      })
      // When: Number is clicked. Get the current number selected
      var setNum = function () {
        if (resultNum) { // If a result was displayed, reset number
          theNum = this.getAttribute("data-num");
          resultNum = "";
        } else { // Otherwise, add digit to previous number (this is a string!)
          theNum += this.getAttribute("data-num");
        }

        viewer.innerHTML = theNum; // Display current number

      };

      // When: Operator is clicked. Pass number to oldNum and save operator
      var moveNum = function () {
        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-ops");

        //  equals.setAttribute("data-result", ""); // Reset result in attr
      };

      // When: Equals is clicked. Calculate result
      var displayNum = function () {

        // Convert string input to numbers
        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

        // Perform operation
        switch (operator) {
          case "plus":
            resultNum = oldNum + theNum;
            break;

          case "minus":
            resultNum = oldNum - theNum;
            break;

          case "times":
            resultNum = oldNum * theNum;
            break;

          case "divided by":
            resultNum = oldNum / theNum;
            break;

            // If equal is pressed without an operator, keep number and continue
          default:
            resultNum = theNum;
        }

        // If NaN or Infinity returned
        if (!isFinite(resultNum)) {
          if (isNaN(resultNum)) { // If result is not a number; set off by, eg, double-clicking operators
            resultNum = "You broke it!";
          } else { // If result is infinity, set off by dividing by zero
            resultNum = "Infinity..!!!";
            el('#reset').classList.add("show"); // And show reset button
            el('#calculator').classList.add("broken"); // Break calculator
            console.log(el('#reset'))

          }
        }

        // Display result, finally!
        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);

        // Now reset oldNum & keep result
        oldNum = 0;
        theNum = resultNum;

      };

      // When: Clear button is pressed. Clear everything
      var clearAll = function () {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
      };

      /* The click events */

      // Add click event to numbers
      for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
      }

      // Add click event to operators
      for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;

      }

      // Add click event to equal sign
      equals.onclick = displayNum;

      // Add click event to clear button
      el("#clear").onclick = clearAll;

      // Add click event to reset button
      el("#reset").onclick = function () {
        window.location = window.location;
      };

    }
  };

</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);
  :root {
    --baseColor: #111;
    --bgColorFirst: #5c258d;
    --bgColorSecond: #4389a2;
  }

  html {
    background-attachment: fixed;
    background: #5D4157;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, var(--bgColorFirst), var(--bgColorSecond));
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, var(--bgColorFirst), var(--bgColorSecond));
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
  }

  body {
    font: 300 18px/1.6 "Source Sans Pro", sans-serif;
    margin: 0;
    padding: 5em 0 2em;
    text-align: center;
  }

  .titlev {
    color: white;
    font-size: 48px;
    margin-bottom: 22px;
    margin-top: -76px;
  }

  h1 {
    font-weight: 300;
    margin: 0;
  }

  /* Gradient text only on Webkit */

  .warning {
    background: -webkit-linear-gradient(45deg, #c97874 10%, #463042 90%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #8c5059;
    font-weight: 400;
    margin: 0 auto 6em;
    max-width: 9em;
  }

  .calculator {
    font-size: 28px;
    margin: 0 auto;
    width: 10em;
    &::before,
    &::after {
      content: " ";
      display: table;
    }
    &::after {
      clear: both;
    }
  }

  /* Calculator after dividing by zero */

  .broken {
    animation: broken 2s;
    transform: translate3d(0, -2000px, 0);
    opacity: 0;
  }

  .viewer {
    color: #c97874;
    float: left;
    line-height: 3em;
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 7.5em;
    height: 3em;
  }

  button {
    border: 0;
    background-color: var(--bgColorSecond);
    color: white;
    cursor: pointer;
    float: left;
    font: inherit;
    margin: 0.25em;
    width: 2em;
    height: 2em;
    transition: all 0.5s;
    &:hover {
      background: #201e40;
    }
    &:focus {
      outline: 0; // Better check accessibility
      /* The value fade-ins that appear */
      &::after {
        animation: zoom 1s;
        animation-iteration-count: 1;
        animation-fill-mode: both; // Fix Firefox from firing animations only once
        content: attr(data-num);
        cursor: default;
        font-size: 100px;
        position: absolute;
        top: 1.5em;
        left: 50%;
        text-align: center;
        margin-left: -24px;
        opacity: 0;
        width: 48px;
      }
    }
  }

  /* Same as above, modified for operators */

  .ops:focus::after {
    width: 420px;
  }

  /* Same as above, modified for result */

  .equals:focus::after {
    width: 600px;
  }

  /* Reset button */

  .reset {
    background: var(--bgColorSecond);
    color: white;
    font-weight: 400;
    margin-left: -77px;
    padding: 0.5em 1em;
    position: absolute;
    top: -20em;
    left: 50%;
    width: auto;
    height: auto;

    &:hover {
      background: #c97874;
      color: #100a1c;
    }

  }

  /* When button is revealed */

  .show {
    top: 20em;
    animation: fadein 2s;
  }

  /* Animations */

  /* Values that appear onclick */

  @keyframes zoom {
    0% {
      transform: scale(.2);
      opacity: 1;
    }
    70% {
      transform: scale(1);
    }
    100% {
      opacity: 0;
    }
  }

  /* Division by zero animation */

  @keyframes broken {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    5% {
      transform: rotate(5deg);
    }
    15% {
      transform: rotate(-5deg);
    }
    20% {
      transform: rotate(5deg);
    }
    25% {
      transform: rotate(-5deg);
    }
    50% {
      transform: rotate(45deg);
    }
    70% {
      transform: translate3d(0, 2000px, 0);
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      transform: translate3d(0, -2000px, 0);
    }
  }

  /* Reset button fadein */

  @keyframes fadein {
    0% {
      top: 20em;
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (min-width: 420px) {
    .calculator {
      width: 12em;
    }
    .viewer {
      width: 8.5em;
    }
    button {
      margin: 0.5em;
    }
  }

</style>
