# Word-Guess-Game

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

