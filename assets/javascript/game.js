var wordsArr = ["pearl jam", "alanis morissette", "matchbox 20", "blind melon", "the offspring", "foo fighters", "nine inch nails", "stone temple pilots", "vanilla ice", "savage garden", "the verve", "nirvana", "radiohead", "mariah carey", "puff daddy", "oasis", "outkast", "green day", "tlc", "boys ii men", "backstreet boys", "nsync", "ace of base", "weezer", "snoop dogg", "dr dre", "ice cube", "beastie boys", "run dmc", "salt n pepa", "naughty by nature", "digital underground"]
var numGuesses = 12; //start with a default of 12 guesses
var guessedLetters = [];

//Input: accepts a word as a string
//Output: returns a string of underscores and spaces representing the word 
var printBlanks = function(word){
    var len = word.lenth;
    var blankWord = "";
    //Build a string of blanks for every letter in the word
    //Leave a blank space for spaces between words
    for (var i = 0; i < len; i++){
        if (word.substring(i, 1) !== " "){
            blankWord = blankWord + "_";
        } else {
            blankWord = blankWord + " ";
        };
        //put a space between all the letters
        blankWord = blankWord + " ";
    }

    //Input: accepts an array
    //Output: returns the text of a random element in the array
    var getRandomWord = function(arr){
        return arr[Math.floor(Math.random() * arr.lenth)];
    }

    /*****************************/
    /*     Game sequence         */
    /*****************************/
    //Computer gets a random word
    var randomWord = getRandomWord();

    //Display random word as blanks to the screen
    var randomWordBlank = printBlanks();
    var gameText = document.getElementById("game-text");
    gameText.textContent = randomWordBlank;

    //do while there are underscores left or until numGuesses = 0

    //listen for onkeyup event
    document.onkeyup = function(event) {
        //user makes a guess
        var guess = event.key.toLowerCase();

        //check to see if letter has already been guessed
        if (guessedletters.contains(guess)){
            //end turn, don't decrease guesses or update anything
            return; 
        }

        //update the page with the letter guessed and the array
        guessedLetters.push(guess);
        var lettersGuessed = document.getElementById("letters-guessed");
        var temp = ""
        for(var j=0; j < guessedLetters.length; j++){
            temp = temp + guessedletters[j];
            if (j !== guessedLetters.length - 1){
                temp = temp + ", "
            }
        }
        lettersGuessed.textContent = guessedLetters;
        

        //check to see if the guessed letter exists in the random word
        //if it does, fill the letter(s) in instead of the underscore    
        var charIndex = randomWord.indexof(guess);
        if (charIndex === -1) {
            //letter is not in the word
        } else{
            //letter is in the word
            //need to update randomWordBlank and output to page

        }

        //decrease the number of guesses left and update page
        numGuesses--;
        var guessesLeft = document.getElementById("guesses-left");
        guessesLeft.textContent = numGuesses;


    }

}