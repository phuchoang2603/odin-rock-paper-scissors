function playGame (round) {
    let userWinMatch = 0;
    let computerWinMatch = 0;
    let currentWinning = "";
    let i = 0;

    while ((userWinMatch < round) && (computerWinMatch < round)){
        i++;
        console.log ("Round", i);

        let result = playOneRound();
        
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
            main();
            break;
        case ("n"):
            return;
        default:
            console.log("Invalid response");
            again();
    }
}

function translate (choice) {
    // Convert choice in number format to Emoji
    function Translate (name, html) {
        this.name = name;
        this.html = html;
    }

    let result = "";

    switch (choice){
        case (1):
            result = new Translate("Rock", userChoices[0].innerHTML);
            break;
        case (2):
            result = new Translate("Paper", userChoices[1].innerHTML);
            break;
        case (3):
            result = new Translate("Scissors", userChoices[2].innerHTML);
            break;
    }

    return result;
}

function displayUserChoice (e) {
    // Display the user's choice in the DOM 
    // and return the user's choice in number
    const current_human = document.querySelector(".current_human");
    const userSelection = e.currentTarget;
    current_human.innerHTML = userSelection.innerHTML;

    switch (userSelection.id){
        case ("rock"):
            return 1;
            break;
        case ("paper"):
            return 2;
            break;
        case ("scissors"):
            return 3;
            break;
    }
}

function displayComputerChoice () {
    // Display the computer's choice in the DOM
    // and return the computer's choice in number
    const computerSelection = 1 + Math.floor(Math.random() * 3);
    const current_computer = document.querySelector(".current_computer");

    current_computer.innerHTML = translate(computerSelection).html;
    return computerSelection;
}

function playOneRound (userSelection, computerSelection){
    // Operate the individual round, return the result as:
    // Lose = 0, Tie = 1, Win = 3
    let heading = "";
    let paragraph = "";
    let result = 0;
    let userSelectionText = translate(userSelection).name;
    let computerSelectionText = translate(computerSelection).name;
    
    if (userSelection == computerSelection) {
        heading = "It's a tie";
        paragraph = "You both chose " + userSelectionText;
        result = 1;
    } else if ((userSelection == 1 && computerSelection == 3) || 
    (userSelection == 2 && computerSelection == 1) || 
    (userSelection == 3 && computerSelection == 2)){
        heading = "You won!";
        paragraph = userSelectionText + " beats " + computerSelectionText;
        result = 3;
    } else {
        heading = "You lost";
        paragraph = userSelectionText + " is beaten by " + computerSelectionText;
        result = 0;
    }

    return {
        heading: heading,
        paragraph: paragraph,
        result: result
    }
}

function displayTextBox (heading, paragraph) {
    // Display the result of the round in the DOM
    const headingElement = document.querySelector(".textBox .heading");
    const paragraphElement = document.querySelector(".textBox .paragraph");

    headingElement.textContent = heading;
    paragraphElement.textContent = paragraph;
}

// Main Program
// Get userChoice element in DOM
const userChoices = document.querySelectorAll(".userChoice .selection_button");

userChoices.forEach(function(button){
    button.addEventListener("click", function(e){
        let userSelection = displayUserChoice(e);
        let computerSelection = displayComputerChoice();

        let resultObject = playOneRound(userSelection, computerSelection);
        displayTextBox(resultObject.heading, resultObject.paragraph);
    });
})