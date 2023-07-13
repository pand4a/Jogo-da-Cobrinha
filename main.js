const canvas = document.getElementById('snake');
const context = canvas.getContext('2d');
const box = 32;
const snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
let direction = '';
const food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

function createBackGround() {
    context.fillStyle = 'grey';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (let index = 0; index < snake.length; index++) {
        context.fillStyle = "black";
        context.fillRect(snake[index].x, snake[index].y, box, box)
    }
}

function drawFood() {
    context.fillStyle = 'blue';
    context.fillRect(food.x, food.y, box, box);
}

const update = (event) => {
    if (event.keyCode === 37 && direction !== 'right') direction = 'left';
    if (event.keyCode === 38 && direction !== 'down') direction = 'up';
    if (event.keyCode === 39 && direction !== 'left') direction = 'right';
    if (event.keyCode === 40 && direction !== 'up') direction = 'down';
}

document.addEventListener('keydown', update);

function startGame() {
    if (snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction === 'left') snake[0].x = 15 * box;
    if (snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
    if (snake[0].y < 0 && direction === 'up') snake[0].y = 15 * box;

    for (let index = 1; index < snake.length; index++) {
        if (snake[0].x === snake[index].x && snake[0].y === snake[index].y) {
            clearInterval(jogo);
            alert(`Game Over \u{2639}\u{FE0F}`);
            alert('Atualize a página para jogar novamente');
        }
    }

    createBackGround();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'right') snakeX += box;
    if (direction === 'left') snakeX -= box;
    if (direction === 'up') snakeY -= box;
    if (direction === 'down') snakeY += box;

    if (snakeX !== food.x || snakeY !== food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);
}

const jogo = setInterval(startGame, 100);
