// initialize necessary variables
let input = [];
let random = [];
let args = process.argv.slice(2); // remove the first two indexes from the input
let years = 0;
let week = 0;

// handle input validation, whether "log" is in the input or not
if (args.includes('log')) {
    // remove the last index of the array, i.e., the word "log", to simplify comparison
    args.pop();
    if (validate() === true) {
        jackpotLog();
    }
} else {
    if (validate() === true) {
        jackpot();
    }
}

// validation if "log" is not in the input
function validate() {
    // check that enough inputs are provided
    if (args.length !== 7) {
        console.log("Error: Give 7 values");
    } else {
        // check that all inputs are numbers
        let allNumbers = true;
        for (let i = 0; i < args.length; i++) {
            if (isNaN(parseInt(args[i]))) {
                console.log("Error: all values must be numbers");
                allNumbers = false;
                break;
            }
            // check that the numbers provided are between 1 and 40
            if (parseInt(args[i]) < 1 || parseInt(args[i]) > 40) {
                console.log("Error: all values must be from range 1-40");
                allNumbers = false;
                break;
            }
        }
        // check that the user provides only unique numbers
        if (allNumbers) {
            let noDuplicates = true;
            // iterate through all array values and check for duplicates
            for (let i = 0; i < args.length; i++) {
                for (let j = i + 1; j < args.length; j++) {
                    if (args[i] == args[j]) {
                        console.log("Error: all values must be unique");
                        noDuplicates = false;
                        break;
                    }
                }
                if (!noDuplicates) break;
            }
            // if everything is okay, call the jackpot function
            if (noDuplicates) {
                return true;
            }
        }
    }
}


// process the user's input
function user() {
    // clear the array to prevent new data from being appended to the existing data
    input = [];
    // process each argument provided by the user and store them in the correct format in the array
    for (let i = 0; i < args.length; i++) {
        let number = parseInt(args[i]);
        // check if the number is less than 10. If so, prepend a 0; otherwise, add it as a string to the array
        let formattedNumber = number < 10 ? '0' + number : number.toString();
        input.push(formattedNumber)
    }
    return input; // return the formatted array
}

// generate the winning lottery numbers
function lottoNumber() {
    // clear the array to prevent new data from being appended to the existing data
    random = [];
    // draw 7 numbers
    while (random.length < 7) {
        let randomNumber = Math.floor(Math.random() * 40) + 1;
        // check if the number is less than 10. If so, prepend a 0; otherwise, add it as a string to the array
        let formattedNumber = randomNumber < 10 ? '0' + randomNumber : randomNumber.toString();
        // ensure the drawn number is not already in the array. If it is, do not add it
        if (!random.includes(formattedNumber)) {
            random.push(formattedNumber);
        }
    }
    return random; // return the generated array
}

// function that checks the lottery row
function jackpot() {
    // initialize necessary variables
    let gotJackpot = 7;
    let highscore = 0;
    let correct = 0;
    // iterate through arrays until jackpot is achieved
    while (highscore !== gotJackpot) {
        // call functions that provide new arrays
        user();
        lottoNumber();
        // ensure that the number of correct numbers is 0 before comparing numbers
        correct = 0;
        // compare arrays to see if they contain the same numbers
        correct = input.filter(num => random.includes(num)).length;
        // if the number of correct numbers is greater than the highscore, update the highscore and print the new number of correct numbers
        if (correct > highscore) {
            highscore = correct;
            console.log(`You got ${highscore} correct`);
        }
        // call the time function after each comparison to track how long it takes to achieve the jackpot
        time();
    }
    // when the jackpot is achieved, print the time taken
    console.log(`It took ${time()} years!`);
}

// function that checks the lottery row when "log" is in the input
function jackpotLog() {
    let gotJackpot = false;
    // repeat the comparison until the jackpot is achieved
    while (!gotJackpot) {
        // call functions that provide new arrays
        user();
        lottoNumber();
        // print the user's and the generated lottery numbers
        console.log(`User:   ${input.join(' ')}`);
        console.log(`Random: ${random.join(' ')}`);
        // convert the array contents to numbers for comparison, and change them from format 01 to 1. Compare the numbers and sort them from smallest to largest
        let sortedUser = input.map(num => parseInt(num, 10)).sort((a, b) => a - b);
        let sortedLottoNumber = random.map(num => parseInt(num, 10)).sort((a, b) => a - b);
        // compare the array values index by index. If any number is different, return false; if all are the same, return true
        gotJackpot = sortedUser.every((num, index) => num === sortedLottoNumber[index]);
        // calculate the time taken to achieve the jackpot
        if (!gotJackpot) {
            time();
        } else {
            // print the time taken
            console.log(`It took ${time()} years!`)
        }
    }
}

// time function that calculates the time taken to achieve the jackpot
function time() {
    // increment the elapsed time by one week each time the function is called
    week++;
    // if 52 weeks have passed, add the time to the years and reset weeks
    if (week === 52) {
        years++;
        week = 0;
    }
    // return the elapsed time rounded up to the nearest year
    return Math.ceil(years + week / 52);
}
