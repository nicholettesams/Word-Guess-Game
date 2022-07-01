/*****************************/
/*     Global Variables      */
/*****************************/

var wordsArr = ["goo goo dolls", "bon jovi", "hootie and the blowfish", 
                "barenaked ladies", "fugees", "meredith brooks", 
                "jewel", "kris kross", "chumbawamba", "soul asylum", 
                "house of pain","britney spears", "christina agulera", 
                "envogue", "janet jackson", "pearl jam", "alanis morissette", 
                "matchbox 20", "blind melon", "third eye blind", 
                "the offspring", "foo fighters", "nine inch nails", 
                "stone temple pilots", "vanilla ice", "savage garden", 
                "the verve", "nirvana", "radiohead", "mariah carey", 
                "puff daddy", "notorious big", "oasis", "outkast", 
                "green day", "tlc", "boys ii men", "backstreet boys", 
                "nsync", "ace of base", "weezer", "snoop dogg", "dr dre", 
                "ice cube", "beastie boys", "run dmc", "salt n pepa", 
                "naughty by nature", "digital underground"]
var numGuesses = 10; //start with a default of 10 guesses
var guessedLetters = [];
var guess = "";
var randomWord = "";
var randomWordBlank = "";
var wins = 0;
var losses = 0;

/*****************************/
/*     Functions             */
/*****************************/

var outputData = function(){
    console.log("Guesses:" + numGuesses);
    console.log("Guess:" + guess);
    console.log("Word:" + randomWord);
    console.log("WordBlank:" + randomWordBlank);
}

//Input: accepts a word as a string
//Output: returns a string of underscores and spaces representing the word 
var printBlanks = function(word){
    var len = word.length;
 
    var blankWord = "";
    //Build a string of blanks for every letter in the word
    //Leave a blank space for spaces between words
    for (var i = 0; i < len; i++){
        if (word.charAt(i) !== " "){
            blankWord = blankWord + "_";
        } else {
            blankWord = blankWord + " ";
        }
    }

    return blankWord;
}

//Input: accepts an array
//Output: returns the text of a random element in the array
var getRandomWord = function(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

//Input: string, index of char you want to replace, char is is being replaced with
//Output: new string with replaced char
var setCharAt = function(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

//Will reset to default values except for win and losses
var resetGame = function(){
    numGuesses = 10; 
    guessedLetters = [];
    guess = "";
    randomWord = "";
    randomWordBlank = "";    
    updateHTML("game-text", "........", false, false);
    updateHTML("guesses-left", numGuesses, false, false);
    updateHTML("letters-guessed", "", false, false);

}

//Inputs: 
//  tag         the HTML tag you want to update
//  value       the value you want to appear as the textContent of the HTML tag
//  append      true if you want your value appended to existing textContent, false if you want to override
//  addSpaces   true if you want to add spaces before displaying (helps the display of the blank word)
var updateHTML = function(tag, value, append, addSpaces){
    var element = document.getElementById(tag);
    var tempValue = "";

    if (addSpaces){
        for(var k=0; k < value.length; k++){
            if (value[k] == " "){
                tempValue = tempValue + "   ";    //add extra spaces in between words
            } else {
                tempValue = tempValue + value[k] + " ";
            }
        }
    } else if (append){
        tempValue = element.textContent + value;
    } else {
        tempValue = value;
    }

    element.textContent = tempValue;
}

outputData();

/*****************************/
/*     Game sequence         */
/*****************************/
//do while there are underscores left or until numGuesses = 0
//listen for onkeyup event
document.onkeyup = function(event) {
    //user makes a guess
    guess = event.key.toLowerCase();

    //setup the game if first move
    if (randomWord === ""){
        //Computer gets a random word
        randomWord = getRandomWord(wordsArr);
   
        //Display random word as blanks to the screen
        randomWordBlank = printBlanks(randomWord);
        console.log("randomWordBlank: " + randomWordBlank)

        updateHTML("game-text", randomWordBlank, false, true);
        outputData();
    } 

    //check to see if letter has already been guessed
    //I have found that "includes" doesn't work in Edge. 
    if (guessedLetters.includes(guess)){
        //end turn, don't decrease guesses or update anything
        console.log("letter has already been guessed");
        return; 
    } 
    //check to see if letter or number
    var myRegEx  = /^[a-zA-Z\d]$/;
    var isValid = (myRegEx.test(guess));
    if (!isValid) {
        console.log("not a valid key");
        return;
    }

    //update the array and page with the letter guessed
    guessedLetters.push(guess);
    updateHTML("letters-guessed", guess, true, false);
    
    //check to see if the guessed letter exists in the random word
    //if it does, fill the letter(s) in instead of the underscore    
    if (randomWord.indexOf(guess) === -1) {
        //decrease the number of guesses left and update page
        numGuesses--;
        updateHTML("guesses-left", numGuesses, false, false);
    } else{
        //need to update randomWordBlank and output to page
        for (var i = 0; i < randomWord.length; i++) {
            if (randomWord.charAt(i) === guess) {
                randomWordBlank = setCharAt(randomWordBlank, i, guess)
            } 
        }
        updateHTML("game-text", randomWordBlank, false, true);
    }

    //Check to see if user has won.
    //Update win score
    //if no more underscores in the blank word
    if (randomWordBlank.indexOf("_") === -1){
        wins++;
        updateHTML("num-wins", wins, false, false);

        //Bonus: play audo when someone wins
        //Today was a good day
        //playSound("https://www.youtube.com/watch?v=xd1RGk5xaQk");
        document.getElementById('winAudio').play();

        alert("You won! \nThe correct word is '" + randomWord + "'.");
        
        //reset the game
        resetGame();
    }

    //Check to see if user has lost
    //Update Loss score
    if (numGuesses === 0){
        losses++;
        updateHTML("num-losses", losses, false, false);

        //Bonus: play audio when someone loses
        //Bye, Bye, By
        //playSound("https://www.youtube.com/watch?v=Cr9upC5e55s");
        document.getElementById('loseAudio').play();

        alert("You lost!  \nThe correct word is '" + randomWord + "'.");

        //reset the game
        resetGame();
    }
    
}