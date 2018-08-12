var wordsArr = ["Pearl Jam", "Alanis Morissette", "Matchbox 20", "Blind Melon", "The Offspring", "Foo Fighters", "Nine Inch Nails", "Stone Temple Pilots", "Vanilla Ice", "Savage Garden", "The Verve", "Nirvana", "Radiohead", "Mariah Carey", "Puff Daddy", "Oasis", "OutKast", "Green Day", "TLC", "Boys II Men", "Backstreet Boys", "NSync", "Ace of Base", "Weezer", "Snoop Dogg", "Dr. Dre", "Ice Cube", "Beastie Boys", "Run DMC", "Salt N Pepa", "Naughty By Nature", "Digital Underground"]

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

}