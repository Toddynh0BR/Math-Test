const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const winnerText = document.querySelector('.winner');
const resetButton = document.querySelector('.reset-button');
const passTurnButton = document.querySelector('.pass-turn-button');
const victorySound = document.getElementById('victory-sound');

const questions = [
    { id: 1, question: "O que são as coordenadas de um ponto no plano cartesiano?", answer: "Pares de números (x, y) que indicam a posição de um ponto." },
    { id: 2, question: "Em qual quadrante está o ponto (-3, 5)?", answer: "Segundo quadrante." },
    { id: 3, question: "Qual é a distância entre o ponto (2, 3) e o eixo y?", answer: "2 unidades." },
    { id: 4, question: "Em qual eixo está o ponto (0, -7)?", answer: "Eixo y." },
    { id: 5, question: "Qual é o ponto médio entre os pontos (2, 3) e (6, 7)?", answer: "(4, 5)." },
    { id: 6, question: "Os pontos (4, 2) e (4, -5) estão alinhados vertical ou horizontalmente?", answer: "Verticalmente." },
    { id: 7, question: "Qual é a coordenada do ponto onde o eixo X cruza o eixo Y no plano cartesiano?", answer: "(0, 0) (a origem)." },
    { id: 8, question: "O ponto (3, 4) está em qual quadrante do plano cartesiano?", answer: "Primeiro quadrante." },
    { id: 9, question: "Se um ponto tem coordenadas (0, 5), em qual eixo ele está localizado?", answer: "No eixo Y." },
    { id: 10, question: "Qual é a abscissa do ponto (7, -2)?", answer: "7." },
    { id: 11, question: "O ponto (-4, 0) está em qual eixo?", answer: "No eixo X." },
    { id: 12, question: "Quais são as coordenadas do ponto que está exatamente 3 unidades à direita do ponto de origem (0, 0)?", answer: "(3, 0)." },
    { id: 13, question: "Qual é a coordenada ordenada do ponto (3, 7)?", answer: "7." },
    { id: 14, question: "Qual é a coordenada x do ponto (5, -3) no plano cartesiano?", answer: "5." },
    { id: 15, question: "Em qual quadrante do plano cartesiano está localizado o ponto (-4, 7)?", answer: "Segundo quadrante." },
    { id: 16, question: "Como se chamam as linhas horizontais e verticais que dividem o plano cartesiano?", answer: "As linhas horizontais e verticais que dividem o plano cartesiano são chamadas de eixo x (abcissas) e eixo y (ordenadas)." },
    { id: 17, question: "Qual é o nome dado a linha que divide o plano horizontalmente?", answer: "A linha que divide o plano em duas partes horizontalmente se chama eixo X ou Abcissa." },
    { id: 18, question: "Se um ponto tem coordenada y igual a 0, em qual eixo ele se encontra?", answer: "Se a coordenada y de um ponto é igual a 0, ele se encontra sobre o eixo x." },
    { id: 19, question: "Se um ponto B tem coordenadas (-4,1), em qual quadrante ele está localizado?", answer: "Segundo quadrante." },
    { id: 20, question: "Qual é a coordenada do ponto na origem do sistema cartesiano?", answer: "(0, 0)" },
    { id: 21, question: "Se um ponto tem coordenadas (4, 0), em qual eixo ele está localizado?", answer: "Eixo x." },
    { id: 22, question: "Qual é a coordenada de um ponto que está 3 unidades à esquerda e 2 unidades acima da origem?", answer: "(-3, 2)" },
    { id: 23, question: "Se um ponto tem coordenadas (0, -8), em qual eixo ele está localizado?", answer: "Eixo y." },
    { id: 24, question: "Qual é o nome do quadrante onde um ponto com coordenadas positivas para x e y está localizado?", answer: "Primeiro quadrante." },
    { id: 25, question: "Qual é a coordenada do ponto no eixo X que está a 5 unidades à direita da origem?", answer: "(5, 0)" },
    { id: 26, question: "Qual é a coordenada do ponto no eixo Y que está a 4 unidades abaixo da origem?", answer: "(0, -4)" },
    { id: 27, question: "Qual é o quadrante onde um ponto com coordenadas negativas para x e y está localizado?", answer: "Terceiro quadrante." },
    { id: 28, question: "Se um ponto tem coordenadas (0, 3), em qual eixo ele está localizado?", answer: "No eixo Y." },
    { id: 29, question: "Qual é a distância entre os pontos (-2, 2) e (2, 2)?", answer: "4 unidades." },
    { id: 30, question: "Qual é a coordenada do ponto médio entre (1, -1) e (5, 3)?", answer: "(3, 1)" },
    { id: 31, question: "Em qual eixo está o ponto (6, 0)?", answer: "Eixo X." },
    { id: 32, question: "Qual é o quadrante onde um ponto com coordenadas positivas para x e negativas para y está localizado?", answer: "Quarto quadrante." },
    { id: 33, question: "Qual é a coordenada do ponto que está 7 unidades à esquerda da origem e 3 unidades acima?", answer: "(-7, 3)" },
    { id: 34, question: "Se um ponto está localizado na origem, quais são suas coordenadas?", answer: "(0, 0)" }
];

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

let currentQuestionIndex = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const questionElem = document.querySelector('.QuestionsPart p');
const answerInput = document.querySelector('.input-wrapper input');
const seeButton = document.querySelector('.see');
const nextButton = document.querySelector('.next');

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== '' || isGameOver) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
        winnerText.textContent = `Time ${currentPlayer} venceu!`;
        isGameOver = true;
        statusText.textContent = '';

        victorySound.play();
        return;
    }

    if (board.every(cell => cell !== '')) {
        winnerText.textContent = 'Empate!';
        isGameOver = true;
        statusText.textContent = '';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Vez do Time ${currentPlayer}`;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
    isGameOver = false;
    winnerText.textContent = '';
    statusText.textContent = `Vez do Time ${currentPlayer}`;
    victorySound.pause();
    victorySound.currentTime = 0;
}

function passTurn() {
    if (isGameOver) return;
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Vez do Time ${currentPlayer}`;
}


function renderQuestion() {
    const question = questions[currentQuestionIndex];
    questionElem.textContent = question.question;
    answerInput.value = '';
}


function showAnswer() {
    const answer = questions[currentQuestionIndex].answer;
    answerInput.value = answer;
}


function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    renderQuestion();
}

renderQuestion();


seeButton.addEventListener('click', showAnswer);
nextButton.addEventListener('click', nextQuestion);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
passTurnButton.addEventListener('click', passTurn);
