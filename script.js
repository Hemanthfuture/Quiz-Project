let questions = [
    {
        question:"Chambal river is a part of ",
        answers:[
            {text:" Sabarmati basin" , correct : false },
            {text:" Ganga basin" , correct : false },
            {text:" Narmada basin" , correct : true },
            {text:" Godavari basin" , correct : false }
        ]
    },
    {
        question:"Volcanic eruption do not occur in the ",
        answers:[
            {text:"  Baltic sea" , correct : true },
            {text:" Black sea" , correct : false },
            {text:" Caribbean sea" , correct : false },
            {text:" Caspian sea" , correct : false }
        ]
    },
    {
        question:"Indus river originates in ",
        answers:[
            {text:" Kinnaur" , correct : false },
            {text:" Ladakh" , correct : false },
            {text:" Nepal" , correct : false },
            {text:" Tibet" , correct : true }
        ]
    },
    {
        question:"The hottest planet in the solar system? ",
        answers:[
            {text:" Mercury" , correct : false },
            {text:" Venus" , correct : true },
            {text:" Mars" , correct : false },
            {text:" Jupiter" , correct : false }
        ]
    }
]


const questionPart = document.getElementById("question")
const answersPart = document.getElementById("answers")
const nextButton = document.getElementById("nxt-btn")

let questionindex = 0;
let score = 0;

function startgame(){
    questionindex = 0;
    score=0;
    showQuestion();
}
function showQuestion(){
    reset();
    let questionArea = questions[questionindex];
    let questionNumber = questionindex+1;
    questionPart.innerHTML=questionNumber + "." + questionArea.question;

    questionArea.answers.forEach(answer=>{
        let button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answersPart.appendChild(button);
        if (answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",chooseAnswer)
        
    })
}
function reset(){
    nextButton.style.display="none";
    while(answersPart.firstChild){
        answersPart.removeChild(answersPart.firstChild);
    }
}
function chooseAnswer(e){
    const chosen = e.target;
    // console.log(chosen);
    const isCorrect = chosen.dataset.correct==="true";
    console.log(isCorrect);
    if(isCorrect){
        chosen.classList.add("correct");
        score++;
        // console.log("done")
    }
    else{
        chosen.classList.add("incorrect");
    }
    Array.from(answersPart.children).forEach(button=>{
        let check=button.dataset.correct
        if(check){
            button.classList.add("correct");
        }
        else{
            button.disabled="true";
        }
    })
    nextButton.style.display="block";
}
nextButton.addEventListener("click",nextWhat);
function nextWhat(){
    if(questionindex<questions.length){
        nextQuestion();
    }
    else{
        startgame();
    }
}
function nextQuestion(){
    questionindex++;
    if(questionindex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
function showScore(){
    reset();
    questionPart.innerHTML=`You scored ${score} out of ${questions.length}!`;
}
startgame();