# Word-Guess-Game

## Assignment
Create a Word Guess game that will run in the browser, and feature dynamically updated HTML and CSS powered by JavaScript.

## Solution
This solution was built before we learned about many useful array methods that could have made some of this code more efficient.  This was also prior to jQuery so only javaScript was able to be used to manipulate the DOM.  I built my own function to help with that and to cut down on repetitive code.  Most of the logic is contained in a keyUp event. Audio tags are used to play a sound when the player wins or loses the game.

## Technology
HTML, CSS, JavaScript, Bootstrap, Media Queries

## Overview
This game is similar to Hangman although without a physical hangman being drawn.  The user guesses letters until all the letters in the word are guessed or until the user runs out of wrong guesses.

## Getting Started

The game starts when the user presses any key on the keyboard.  The game will choose a random word based on the chosen category of 90s music artists.  Blank spaces will be displayed for each letter of the word to be guessed.

## Game Play

1. The user can guess any letter or number.  The game will ignore any other non-alphanumeric key that is pressed.

2. As the user guesses letters, the guesses will be displayed on the sreen.  As the user guesses, one of the following will happen:
    a.  If a user guesses a letter that has already been guessed, that guess will be ignored.
    b.  If the user guesses correctly, the blank spot where that letter belongs will be updated with the correctly guessed letter.
    c.  If the user guesses incorrectly, the number of guesses remaining will be decreased.

## Winning the game

The user wins when all the blanks are replaced by correctly guessed letters before the number of guesses reaches 0.  The win/loss records will be updated at the end of each game and a new game will begin.

