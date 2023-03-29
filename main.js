const prompt=require("prompt-sync")({sigint:true});

function getUserChoice () {
    // Ask user's input, convert to lowercase, and return output as number format
    let choice = prompt("What's your choice? (rock/ paper/ scissors) ")
    choice = choice.toLowerCase();
    
    switch (choice) {
        case ("rock"):
            choice = 1;
            break;
        case ("paper"):
            choice = 2;
            break;
        case ("scissors"):
            choice = 3;
            break;
        case ("quit"):
            choice = 0;
            break;            
        default:
            console.log ("That's an invalid input! Please try again!")
            choice = getUserChoice()
    }

    return choice;
}

function getComputerChoice () {
    // Generate a random number ranging from 1 to 3
    let choice = 1 + Math.floor(Math.random() * 3);

    return choice;
}

function translate (choice) {
    // Convert number to rock/paper/scissors format
    switch (choice){
        case (1):
            return "Rock";
            break;
        case (2):
            return "Paper";
            break;
        case (3):
            return "Scissors";
            break;
    }
}

function playGame (){
    // Operate the individual round, return the result as:
    // 0 -> Lose; 1 -> Tie; 3 -> Win
    let output = "";
    let result = 0;

    let userChoice = getUserChoice();
    // Terminate the program if the user choose "quit"
    if (userChoice == 0){
        return "quit";
    }
    let computerChoice = getComputerChoice();

    console.log("Your choice is " + translate(userChoice));
    console.log("The computer's choice is " + translate(computerChoice));
    
    if (userChoice == computerChoice) {
        output = "Tie. Neither wins nor loses";
        result = 1;
    } else if ((userChoice == 1 && computerChoice == 3) || 
    (userChoice == 2 && computerChoice == 1) || 
    (userChoice == 3 && computerChoice == 2)){
        output = "Congratulations. You win. " + 
        translate(userChoice) + " beats " + translate(computerChoice);
        result = 3;
    } else {
        output = "Defeated. You lose. " + 
        translate(computerChoice) + " beats " + translate(userChoice);
        result = 0;
    }

    console.log (output);
    return result;
}

function getRound (){
    let round = prompt("How many games you think you will win? ");

    if (!isNaN(round)){
        return round;
    } else {
        console.log("Invalid response");
        return getRound();
    }
}

function loop () {
    let round = getRound();
    let userWinMatch = 0;
    let computerWinMatch = 0;
    let currentWinning = "";
    let i = 0;

    while ((userWinMatch < round) && (computerWinMatch < round)){
        i++;
        console.log ("Round", i);

        let result = playGame();
        
        // Terminate the program if the user choose to quit
        if (result == "quit"){
            return;
        }

        if (result == 3) {
            userWinMatch += 1;
        } else if (result == 0) {
            computerWinMatch += 1;
        } else {
            continue;
        }
        
        // Display the current score of the the game
        currentWinning = (userWinMatch == computerWinMatch) ? "." : 
        ((userWinMatch >= computerWinMatch) ? " in favor of you." : " in favor of the computer.");

        console.log (
            "The score currently is " +
            userWinMatch + "-" +
            computerWinMatch +
            currentWinning
        );
    }

    if (userWinMatch == round) {
        console.log ("Yayyy! You slayed it !!!")
    } else {
        console.log ("Noooo! Just a little more ...")
    }
}

function again () {
    let againResponse = prompt("Try again (y/n)? ");
    switch (againResponse){
        case ("y"):
            loop();
            again();
            break;
        case ("n"):
            return;
        default:
            console.log("Invalid response");
            again();
    }
}

// Main Program
loop();
again();