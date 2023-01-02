


let timer = 60;
let runningTimer;
let score = 0;
let username = "";
let qNumber;
let finalScore;
var MAX_HIGH_SCORES = 10;


var startButton = document.getElementById("startButton");
var qContainer = document.getElementById("questionsContainer");
var qElement = document.getElementById("question");
var answerButtons = document.getElementById("answers");
var countdown = document.getElementById("timerArea");
var scoreArea = document.getElementById("scoreArea");
var highScoresButton = document.getElementById("showScoresButton");


let highScores = JSON.parse(localStorage.getItem("highScores")) || [];


startButton.addEventListener("click", startGame);
highScoresButton.addEventListener("click", displayScores);

 

function startGame() {
  startButton.classList.add("hide");
  scoreArea.classList.add("hide");
  answerButtons.classList.remove("hide");
  qNumber = 0;
  qContainer.classList.remove("hide");
  scoreArea.innerHTML = "";
  startClock();
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  showQuestion(questions[qNumber]);
}

 
function showQuestion(question) {
  qElement.innerText = question.question;
  question.answers.forEach(answer => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

 
function startClock() {
  countdown.innerHTML = "Time Remaining: " + timer;
  if (timer <= 0) {
    gameOver();
  } else {
    timer -= 1;
    runningTimer = setTimeout(startClock, 1000);
  }
}

 
function selectAnswer(e) {
  var selectedButton = e.target;
  if (!selectedButton.dataset.correct) {
    timer = timer - 10;
    console.log(timer);
  }
  if (qNumber == questions.length - 1) {
    gameOver();
  } else {
    clearQuestion();
    qNumber++;
    showQuestion(questions[qNumber]);
    console.log(score);
  }
}

 question
function clearQuestion() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}



function gameOver() {
  clearInterval(runningTimer);
  countdown.innerHTML = "Finished";
  clearQuestion();
  showResults();
  startButton.innerText = "Restart";
  startButton.classList.remove("hide");
  timer = 60;
  score = 0;
}

function showResults() {
  finalScore = timer;
  if (finalScore < 0) {
    finalScore = 0;
  }
  qElement.innerText = "";
  scoreArea.classList.remove("hide");
  answerButtons.classList.add("hide");
  scoreArea.innerHTML = `Your score is ${finalScore}!<div id="init">Name: <input type="text" name="initials" id="initials" placeholder="Enter Your Name"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
  username = document.getElementById("initials");
  saveButton = document.getElementById("save-btn");
  username.addEventListener("keyup", function() {
    saveButton.disabled = !username.value;
  });
}


function submitScores(e) {
  var score = {
    score: finalScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayScores();
}


function displayScores() {
  clearInterval(runningTimer);
  countdown.innerHTML = "";
  clearQuestion();
  qElement.innerText = "";
  scoreArea.classList.remove("hide");

  scoreArea.innerHTML = `<h2>Top 10 High Scores</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">Clear Scores</button>`;
  var highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = highScores
    .map(score => {
      return `<li class="scoresList">${score.name} - ${score.score}</li>`;
    })
    .join("");
  startButton.classList.remove("hide");
  highScoresButton.classList.add("hide");
}


function clearScores() {
  highScores = [];
  highScoresList.innerHTML = "<h3>Scores have been Cleared</h3>";
  document.getElementById("clearScores").classList.add("hide");
}


var questions = [
  {
    question: "Inside which HTML element would you put the JavaScript?",
    answers: [
      { text: "javascript", correct: false },
      { text: "script", correct: true },
      { text: "js", correct: false },
      { text: "jQuery", correct: false }
    ]
  },

  {
    question: "Where is the correct place to insert JavaScript?",
    answers: [
      { text: "The head section", correct: false },
      { text: "The body section", correct: false },
      { text: "In an external file", correct: false },
      { text: "All of the above", correct: true }
    ]
  },

  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      { text: 'console.log("Hello World");', correct: false },
      { text: 'prompt("Hello World");', correct: false },
      { text: 'alertBox("Hello World");', correct: false },
      { text: 'alert("Hello World");', correct: true }
    ]
  },


  {
    question: "Variables are declared by which keyword?",
    answers: [
      { text: "const", correct: false },
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "Any of these", correct: true }
    ]
  },

  {
    question: "The syntax 'let variableName = value;' does what?",
    answers: [
      { text: "Declares the variable", correct: false },
      { text: "Initializes the variable", correct: false },
      { text: "Does both", correct: true },
      { text: "Does neither", correct: false }
    ]
  },


  {
    question: 'How do you call a Function named "myFunction"?',
    answers: [
      { text: "call myFunction()", correct: false },
      { text: "read myFunction()", correct: false },
      { text: "myFunction()", correct: true },
      { text: "run.myFunction()", correct: false }
    ]
  },

  {
    question: "How do you write an If statement in JavaScript?",
    answers: [
      { text: "if (i === 5)", correct: true },
      { text: "if i = 5 then", correct: false },
      { text: "if i === 5 then", correct: false },
      { text: "if (i = 5)", correct: false }
    ]
  },

  {
    question: "The != operator means what in JavaScript?",
    answers: [
      { text: "Or", correct: false },
      { text: "Not equal to", correct: true },
      { text: "Plus and equal to", correct: false },
      { text: "And", correct: false }
    ]
  },

  {
    question: "What characters contains an Array?",
    answers: [
      { text: "< >", correct: false },
      { text: "{ }", correct: false },
      { text: "[ ]", correct: true },
      { text: "# #", correct: false }
    ]
  },

    {
        question: "When baristas write names on cups, this is known as JavaScript in coffee shop lingo.",
        answers: [
        { text: "True", correct: false },
        { text: "False", correct: true }
        ]
    },
];

