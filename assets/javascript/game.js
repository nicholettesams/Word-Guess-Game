var wordsArr = ["pearl jam", "alanis morissette", "matchbox 20", "blind melon", "the offspring", "foo fighters", "nine inch nails", "stone temple pilots", "vanilla ice", "savage garden", "the verve", "nirvana", "radiohead", "mariah carey", "puff daddy", "oasis", "outkast", "green day", "tlc", "boys ii men", "backstreet boys", "nsync", "ace of base", "weezer", "snoop dogg", "dr dre", "ice cube", "beastie boys", "run dmc", "salt n pepa", "naughty by nature", "digital underground"]
var numGuesses = 12; //start with a default of 12 guesses
var guessedLetters = [];
var guess = "";
var randomWord = "";
var randomWordBlank = "";
var wins = 0;
var losses = 0;

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
        //May use regular expression
        //blankWord = word.replace(/\s/g, "_");
        if (word.substring(i, 1) !== " "){
            blankWord = blankWord + "_";
        } else {
            blankWord = blankWord + " ";
        }

        //put a space between all the letters
        blankWord = blankWord + " ";
    }

    return blankWord;
}

//Input: accepts an array
//Output: returns the text of a random element in the array
var getRandomWord = function(arr){
    return arr[Math.floor(Math.random() * arr.length)];
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
        var gameText = document.getElementById("game-text");
        gameText.textContent = randomWordBlank;
        outputData();
    } 

    //check to see if letter has already been guessed
    if (guessedLetters.includes(guess)){
        //end turn, don't decrease guesses or update anything
        return; 
    }

    //update the page with the letter guessed and the array
    guessedLetters.push(guess);
    var lettersGuessed = document.getElementById("letters-guessed");
    lettersGuessed.textContent = lettersGuessed.textContent + guess;
    

    //check to see if the guessed letter exists in the random word
    //if it does, fill the letter(s) in instead of the underscore    
    var charIndex = randomWord.indexOf(guess);
    if (charIndex === -1) {
        console.log("letter is not in the word");
        //decrease the number of guesses left and update page
        numGuesses--;
        var guessesLeft = document.getElementById("guesses-left");
        guessesLeft.textContent = numGuesses;
    } else{
        console.log("letter is in the word");
        //need to update randomWordBlank and output to page
        for (var i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === guess) {
            randomWordBlank[i] = guess;
            } 
        }
        console.log("New randomWordBlank:" + randomWordBlank)
        gameText = document.getElementById("game-text");
        gameText.textContent = randomWordBlank;
    }

    //Check to see if user has won.
    //Update win score
    //if no more underscores in the blank word
    if (randomWordBlank.indexOf("_") === -1){
        alert("You won!");
        wins++;

        var numWins = document.getElementById("num-wins");
        numWins.textContent = wins;

        //Refresh the page to reset the game
        location.reload();
    }

    //Check to see if user has lost
    //Update Loss score
    if (numGuesses === 0){
        alert("You lost!");
        losses++;

        var numLosses = document.getElementById("num-losses");
        numLosses.textContent = wins;

        //Refresh the page to reset the game
        location.reload();
    }

    

}