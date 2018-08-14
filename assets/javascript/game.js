/*****************************/
/*     Global Variables      */
/*****************************/

var wordsArr = ["britney spears", "christina agulera", "envogue", "janet jackson", "pearl jam", "alanis morissette", "matchbox 20", "blind melon", "third eye blind", "the offspring", "foo fighters", "nine inch nails", "stone temple pilots", "vanilla ice", "savage garden", "the verve", "nirvana", "radiohead", "mariah carey", "puff daddy", "oasis", "outkast", "green day", "tlc", "boys ii men", "backstreet boys", "nsync", "ace of base", "weezer", "snoop dogg", "dr dre", "ice cube", "beastie boys", "run dmc", "salt n pepa", "naughty by nature", "digital underground"]
var numGuesses = 12; //start with a default of 12 guesses
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
    console.log("len: " + len);
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
    numGuesses = 12; 
    guessedLetters = [];
    guess = "";
    randomWord = "";
    randomWordBlank = "";    
    updateHTML("game-text", "........", false, false);
    updateHTML("guesses-left", numGuesses, false, false);
    updateHTML("letters-guessed", "", false, false);

}

var updateHTML = function(tag, value, append, addSpaces){
    var element = document.getElementById(tag);
    var tempValue = "";

    if (addSpaces){
        for(var k=0; k < value.length; k++){
            tempValue = tempValue + value[k] + " ";
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
    console.log(guess);

    //setup the game if first move
    if (randomWord === ""){
        //Computer gets a random word
        randomWord = getRandomWord(wordsArr);
   
        //Display random word as blanks to the screen
        randomWordBlank = printBlanks(randomWord);

        updateHTML("game-text", randomWordBlank, false, true);
        outputData();
    } 

    //check to see if letter has already been guessed
    if (guessedLetters.includes(guess)){
        //end turn, don't decrease guesses or update anything
        console.log("letter has already been guessed");
        return; 
    } 
    //check to see if letter or number
    var myRegEx  = /[^a-z\d]/;
    var isValid = !(myRegEx.test(guess));
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
        console.log("letter is not in the word");
        //decrease the number of guesses left and update page
        numGuesses--;
        updateHTML("guesses-left", numGuesses, false, false);
    } else{
        console.log("letter is in the word");
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
        alert("You won! \nThe correct word is '" + randomWord + "'.");
        wins++;

        updateHTML("num-wins", wins, false, false);

        //reset the game
        resetGame();
    }

    //Check to see if user has lost
    //Update Loss score
    if (numGuesses === 0){
        alert("You lost!  \nThe correct word is '" + randomWord + "'.");
        losses++;

        updateHTML("num-losses", losses, false, false);

        //reset the game
        resetGame();
    }

    

}