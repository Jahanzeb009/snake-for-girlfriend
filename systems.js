import config from './config';

const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};



const GameLoop = (entities, { touches, dispatch, events, time }) => {
    const head = entities.head;
    const food = entities.food;
    const tail = entities.tail;
    
    if (!head.moving) {
        touches
            .filter((t) => t.type === 'move')
            .forEach((t) => {
                if (Math.abs(t.delta.pageX) - Math.abs(t.delta.pageY) > 2.5) {
                    if (t.delta.pageX > 0 && head.xSpeed != -1) {
                        head.xSpeed = 1;
                        head.ySpeed = 0;
                        head.moving = true;
                    } else if (head.xSpeed != 1) {
                        head.xSpeed = -1;
                        head.ySpeed = 0;
                        head.moving = true;
                    }
                } else if (Math.abs(t.delta.pageY) - Math.abs(t.delta.pageX) > 2.5) {
                    if (t.delta.pageY > 0 && head.ySpeed != -1) {
                        head.xSpeed = 0;
                        head.ySpeed = 1;
                        head.moving = true;
                    } else if (head.ySpeed != 1) {
                        head.xSpeed = 0;
                        head.ySpeed = -1;
                        head.moving = true;
                    }
                }
            });
    };

    head.nextMove += time.delta;
    if (head.nextMove >= head.speed) {
        head.nextMove = 0;

        let temp_head = [
            head.position[0] + head.xSpeed,
            head.position[1] + head.ySpeed,
        ];

        // Check for collitions
        if (inTail(temp_head, tail.elements)) {
            dispatch({ type: 'game-over' });
        } else if (head.borders && borderCollition(temp_head)) {
            dispatch({ type: 'game-over' });
        } else {
            if (!head.borders) {
                temp_head = borderless(temp_head);
            }
            // Move the tail
            tail.elements.unshift([head.position[0], head.position[1]]);
            while (tail.elements.length > tail.number) {
                tail.elements.pop();
            }

            // Move the head
            head.position[0] = temp_head[0];
            head.position[1] = temp_head[1];
            head.moving = false;

            // Check for food
            if (foodCollition(head, food)) {
                dispatch({ type: 'eating' });
                let temp_food = [0, 0];

                do {
                    temp_food = [
                        randomBetween(0, config.GAME_WIDTH - 2),
                        randomBetween(1, config.GAME_HEIGHT - 2),
                    ];
                } while (foodInTail(temp_food, tail.elements));

                food.position[0] = temp_food[0];
                food.position[1] = temp_food[1];
                food.rotate = randomBetween(-60, 60);

                tail.number += 1;
            }
        }
    }
    return entities;
};

const borderCollition = (head) => {
    const xPosition = head[0];
    const yPosition = head[1];

    if (xPosition < 0 || yPosition < 0) {
        return true;
    };
    if (xPosition >= config.GAME_WIDTH || yPosition >= config.GAME_HEIGHT) {
        return true;
    };
};

const inTail = (item, tail) => {
    const xPosition = item[0];
    const yPosition = item[1];

    for (let i = 0; i < tail.length; i++) {
        const element = tail[i];
        if (element[0] === xPosition && element[1] === yPosition) {
            return true;
        };
    };
};


const foodInTail = (food, tail) => {
    food = {position: food};

    for (let i = 0; i < tail.length; i++) {
        taili = {position: tail[i]};
        if (foodCollition(taili, food)) {
            return true;
        };
    };
};

const borderless = (head) => {
    const xPosition = head[0];
    const yPosition = head[1];

    if (xPosition < 0) {
        return [config.GAME_WIDTH, yPosition];
    };
    if (yPosition < 0) {
        return [xPosition, config.GAME_HEIGHT];
    };
    if (xPosition >= config.GAME_WIDTH) {
        return [0, yPosition];
    };
    if (yPosition >= config.GAME_HEIGHT) {
        return [xPosition, 0];
    };
    return head;
}

const foodCollition = (head, food) => {
    if  (
            (head.position[0] === food.position[0] && head.position[1] === food.position[1]) ||
            (head.position[0] === food.position[0]+1 && head.position[1] === food.position[1]+1 ) ||
            (head.position[0] === food.position[0] && head.position[1] === food.position[1]+1 ) || 
            (head.position[0] === food.position[0]+1 && head.position[1] === food.position[1] )
        ) 
    {
            return true;
    }

    return false;
}

export { GameLoop, randomBetween };
