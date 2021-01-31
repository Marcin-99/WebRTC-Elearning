const { gridSize } = require('./constants');


const createGameState = () => {
    return {
        player: {
            pos: {
                x: 3,
                y: 10,
            },
            vel: {
                x: 1,
                y: 0,
            },
            snake: [
                {x: 1, y: 10},
                {x: 2, y: 10},
                {x: 3, y: 10},
            ],
        },
        food: {
            x: 7,
            y: 7,
        },
        gridSize: gridSize,
    }
}


const gameLoop = (state) => {
    if (!state) return;

    const playerOne = state.player;

    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;

    if (playerOne.pos.x < 0 || playerOne.pos.x > gridSize || 
        playerOne.pos.y < 0 || playerOne.pos.y > gridSize)
        return 2;

    if (state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
        playerOne.snake.push(({ ...playerOne.pos }));
        playerOne.pos.x += playerOne.vel.x;
        playerOne.pos.y += playerOne.vel.y;
        randomFood();
    }

    if (playerOne.vel.x || playerOne.vel.y)
        for (let cell of playerOne.snake)
            if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y)
                return 2
        
    playerOne.snake.push(({ ...playerOne.pos }));
    playerOne.snake.shift();

    return false;
}


const randomFood = (state) => {
    newFood = {
        x: Math.floor(Math.random()*gridSize),
        y: Math.floor(Math.random()*gridSize),
    }

    for (let cell of state.player.snake) {
        if (cell.x === food.x && cell.y === food.y) {
            return randomFood(state);
        }
    }

    state.food = newFood;
}


module.exports = {
    createGameState,
    gameLoop,
}