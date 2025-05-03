const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
    { question: "Who wrote the play 'Romeo and Juliet'?", options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"], answer: "William Shakespeare" },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" },
    { question: "Who discovered gravity?", options: ["Galileo Galilei", "Isaac Newton", "Albert Einstein", "Nikola Tesla"], answer: "Isaac Newton" },
    { question: "How many continents are there in the world?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "Which is the longest river in the world?", options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], answer: "Nile River" },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Pb"], answer: "Au" },
    { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"], answer: "George Washington" },
    { question: "Which country is famous for the Great Wall?", options: ["India", "China", "Japan", "Egypt"], answer: "China" }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");

function loadQuestion() {
    clearOptions();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(button, currentQuestion.answer));
        optionsContainer.appendChild(button);
    });
    
    nextButton.style.display = "none";
}

function checkAnswer(selectedButton, correctAnswer) {
    const buttons = document.querySelectorAll(".option");

    buttons.forEach(button => {
        button.disabled = true;
        if (button.innerText === correctAnswer) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
    });

    if (selectedButton.innerText === correctAnswer) {
        score++;
        showFeedbackButton("Right", "right-btn", "#2ecc71");
    } else {
        showFeedbackButton("Wrong", "wrong-btn", "#e74c3c");
    }
    
    nextButton.style.display = "block";
}

function showFeedbackButton(text, id, color) {
    let feedbackButton = document.createElement("button");
    feedbackButton.innerText = text;
    feedbackButton.id = id;
    feedbackButton.style.backgroundColor = color;
    feedbackButton.style.color = "white";
    feedbackButton.style.marginTop = "15px";
    feedbackButton.style.padding = "8px 15px";
    feedbackButton.style.border = "none";
    feedbackButton.style.borderRadius = "5px";
    feedbackButton.style.cursor = "default";
    feedbackButton.style.fontSize = "14px";
    optionsContainer.appendChild(feedbackButton);
}

function clearOptions() {
    optionsContainer.innerHTML = "";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    questionText.innerText = "Quiz Completed!";
    clearOptions();
    scoreText.innerText = `Your score: ${score} / ${questions.length}`;
    nextButton.style.display = "none";

    // Add a retake button
    const retakeButton = document.createElement("button");
    retakeButton.innerText = "Retake Quiz";
    retakeButton.id = "retake-btn";
    retakeButton.style.backgroundColor = "#f39c12";
    retakeButton.style.color = "white";
    retakeButton.style.marginTop = "15px";
    retakeButton.style.padding = "8px 15px";
    retakeButton.style.border = "none";
    retakeButton.style.borderRadius = "6px";
    retakeButton.style.cursor = "pointer";
    retakeButton.style.fontSize = "14px";

    retakeButton.addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        scoreText.innerText = "";
        retakeButton.remove();
        nextButton.style.display = "block";
        loadQuestion();
    });

    optionsContainer.appendChild(retakeButton);
} 
document.getElementById('score-text').style.display = 'none'; // Hide initially

function updateScore(score) {
    let scoreText = document.getElementById('score-text');
    scoreText.innerText = `Score: ${score}`;
    scoreText.style.display = 'block'; // Show only when there's a score
}
function showFinalScore() {
    questionText.innerText = "Quiz Completed!";
    clearOptions();
    scoreText.innerText = `Your score: ${score} / ${questions.length}`;
    scoreText.style.display = "block"; // <-- This line ensures score becomes visible
    nextButton.style.display = "none";

    // Add a retake button
    const retakeButton = document.createElement("button");
    retakeButton.innerText = "Retake Quiz";
    retakeButton.id = "retake-btn";
    retakeButton.style.backgroundColor = "#f39c12";
    retakeButton.style.color = "white";
    retakeButton.style.marginTop = "15px";
    retakeButton.style.padding = "8px 15px";
    retakeButton.style.border = "none";
    retakeButton.style.borderRadius = "6px";
    retakeButton.style.cursor = "pointer";
    retakeButton.style.fontSize = "14px";

    retakeButton.addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        scoreText.innerText = "";
        scoreText.style.display = "none"; // Hide again when restarting
        retakeButton.remove();
        nextButton.style.display = "block";
        loadQuestion();
    });

    optionsContainer.appendChild(retakeButton);
}


loadQuestion();
