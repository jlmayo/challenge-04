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
    counter(1);
}

let questionNumber = 0;
let questionsAnswered = 1;

const nextButton = quizBox.querySelector(".next-btn");

nextButton.onclick = ()=>{
    if(questionNumber < questions.length - 1){
        questionNumber++;
        questionsAnswered++;
        showQuestions(questionNumber);
        counter(questionsAnswered);
    }
}

function showQuestions(index){
    const quizQuestion = document.querySelector(".quiz-question");
    const quizOptions = document.querySelector(".quiz-options");
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
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionNumber].answer;
    if (userAnswer == correctAnswer){
        answer.classList.add(".correct");
        console.log("Answer is correct.");
    }else{
        answer.classList.add(".incorrect");
        console.log("Answer is incorrect.");
    }
    console.log(correctAnswer);
}
    

function counter(index){ 
    const questionCounter = quizBox.querySelector(".question-counter");
    let totalQuestions = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    questionCounter.innerHTML = totalQuestions;
} 