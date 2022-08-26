const startBtn = document.querySelector(".start_btn button");
const rulesBox = document.querySelector(".rules-box");
const quitBtn = rulesBox.querySelector(".buttons .quit");
const continueBtn = rulesBox.querySelector(".buttons .continue");
const quizBox = document.querySelector(".quiz-box");
const timeCounter = quizBox.querySelector(".timer .time-count");
const timeUp = quizBox.querySelector("header .time-text");


const quizOptions = document.querySelector(".quiz-options");

startBtn.onclick = ()=>{
    rulesBox.classList.add("activeInfo");
}

quitBtn.onclick = ()=>{
    rulesBox.classList.remove("activeInfo");
}

continueBtn.onclick = ()=>{
    rulesBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    startTimer(20);
}

let questionNumber = 0;
let questionsAnswered = 1;
let countdown;
let timeValue = 20;
let userScore = 0;

const nextButton = quizBox.querySelector(".next-btn");
const quizScore = document.querySelector(".quiz-score");
const restartQuiz = quizScore.querySelector(".buttons .restart");
const enterScore = quizScore.querySelector(".buttons .scoring");

restartQuiz.onclick = ()=>{
    quizBox.classList.add("activeQuiz");
    quizScore.classList.remove("activeScore");
    let questionNumber = 0;
    let questionsAnswered = 1;
    let timeValue = 20;
    let userScore = 0;
    showQuestions(questionNumber);
    counter(questionsAnswered);
    clearInterval(countdown);
    startTimer(timeValue);
    timeUp.textContent = "Time Remaining";
}

nextButton.onclick = ()=>{
    if(questionNumber < questions.length - 1){
        questionNumber++;
        questionsAnswered++;
        showQuestions(questionNumber);
        counter(questionsAnswered);
        clearInterval(countdown);
        startTimer(timeValue);
        timeUp.textContent = "Time Remaining";
    }else{
        clearInterval(countdown);
        console.log("Questions completed.");
        showQuizScore();
    }
}

function showQuestions(index){
    const quizQuestion = document.querySelector(".quiz-question");
    let questionTag = '<span>' + questions[index].num + ". " + questions[index].question + '</span>';
    let optionTag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[3] + '<span></span></div>'
    quizQuestion.innerHTML = questionTag;
    quizOptions.innerHTML = optionTag;

    const option = quizOptions.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    clearInterval(countdown);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionNumber].answer;
    let allOptions = quizOptions.children.length;
    if (userAnswer == correctAnswer){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct.");
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is incorrect.");

        for (let i = 0; i < allOptions; i++){
            if(quizOptions.children[i].textContent == correctAnswer){
                quizOptions.children[i].setAttribute("class", "option correct");
            }
        }
    }

    for (let i = 0; i < allOptions; i++){
        quizOptions.children[i].classList.add("disabled");
    }
}

function showQuizScore(){
    rulesBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    quizScore.classList.add("activeScore");
    const scoreText = quizScore.querySelector(".score-text");
    if (userScore > 0){
        let scoreTag =  '<span>You scored <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    countdown = setInterval(timer, 1000);
    function timer(){
        timeCounter.textContent = time;
        time--;
        if(time < 0){
            clearInterval(countdown);
            timeCounter.textContent = "00";
            timeUp.textContent = "Time's Up!";

            let correctAnswer = questions[questionNumber].answer;
            let allOptions = quizOptions.children.length;

            for (let i = 0; i < allOptions; i++){
                if(quizOptions.children[i].textContent == correctAnswer){
                    quizOptions.children[i].setAttribute("class", "option correct");
                }
            }
            for (let i = 0; i < allOptions; i++){
                quizOptions.children[i].classList.add("disabled");
            }  
        }
    }
}

    

function counter(index){ 
    const questionCounter = quizBox.querySelector(".question-counter");
    let totalQuestions = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    questionCounter.innerHTML = totalQuestions;
} 