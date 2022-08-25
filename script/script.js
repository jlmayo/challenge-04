const startBtn = document.querySelector(".start_btn button");
const rulesBox = document.querySelector(".rules-box");
const quitBtn = rulesBox.querySelector(".buttons .quit");
const continueBtn = rulesBox.querySelector(".buttons .continue");
const quizBox = document.querySelector(".quiz-box");

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
}

let questionNumber = 0;

const nextButton = quizBox.querySelector(".next-btn");

nextButton.onclick = ()=>{
    if(questionNumber < questions.length - 1){
        questionNumber++;
        showQuestions(questionNumber);
    }
}

function showQuestions(index){
    const quizQuestion = document.querySelector(".quiz-question");
    const quizOptions = document.querySelector(".quiz-options");
    let questionTag = '<span>' + questions[index].question + '</span>';
    let optionTag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[3] + '<span></span></div>'
    quizQuestion.innerHTML = questionTag;
    quizOptions.innerHTML = optionTag;
}