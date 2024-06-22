const delayStep = 5;
const delayMin = 100;
const delayMax = 1000;

let delay = delayMax;

const tableRows = schedule.rows;
const tableHead = schedule.tHead;
const tableBody = schedule.tBodies[0];

const headRows = schedule.tHead.rows;
const headRow = headRows[0];

const bodyRows = tableBody.rows;
const bodyRowsLength = bodyRows.length;

const renderBall = (x, y, fromColumn = 2, toColumn = 6) => {
    // <th></th>

    for (let [j, cell] of [...headRow.cells].entries()) {
        if (j >= fromColumn && j <= toColumn) {
            if (j === y) {
                cell.classList.add('enabled', 'primary');
            } else {
                cell.classList.remove('enabled', 'primary');
            }
        }
    }

    // <td></td>
    
    for (let [i, row] of [...bodyRows].entries()) {
        for (let [j, cell] of [...row.cells].entries()) {
            if (j >= fromColumn && j <= toColumn) {
                if (i === x && j === y) {
                    cell.classList.remove('secondary', 'free');
                    cell.classList.add('enabled', 'primary', 'busy');
                    cell.innerHTML = electricity;
                } else if (j === y) {
                    cell.classList.remove('primary', 'busy');
                    cell.classList.add('enabled', 'secondary', 'free');
                    cell.innerHTML = '';
                } else {
                    cell.classList.remove('enabled', 'primary', 'secondary', 'busy', 'free');
                    cell.innerHTML = '';
                }
            }
        }
    }

    // [rowFailed, columnFailed]

    let rowFailed = false, columnFailed = false;

    if (x < 0 || x >= bodyRowsLength) rowFailed = true;
    if (y < fromColumn || y > toColumn) columnFailed = true;
    
    return [rowFailed, columnFailed];
};

const renderElementsListener = (...args) => {
    return () => {renderElements(...args);};
};

const renderElements = (fromRow = 0, initialize = true) => {
    if (fromRow + difficulty > bodyRowsLength) {
        fromRow = bodyRowsLength - difficulty;
    }
    
    // <td></td>
    
    for (let [i, row] of [...bodyRows].entries()) {
        let monday = row.cells[1];
        let sunday = row.cells[row.cells.length - 1];

        if (initialize) {
            monday.addEventListener('click', renderElementsListener(i, false));
            sunday.addEventListener('click', renderElementsListener(i, false));
        }
        if (i >= fromRow && i < fromRow + difficulty) {
            monday.classList.remove('free');
            sunday.classList.remove('free');
            monday.classList.add('disabled', 'secondary', 'busy');
            sunday.classList.add('disabled', 'secondary', 'busy');
            monday.innerHTML = electricity;
            sunday.innerHTML = electricity;
        } else {
            monday.classList.remove('disabled', 'secondary', 'busy');
            sunday.classList.remove('disabled', 'secondary', 'busy');
            monday.classList.add('free');
            sunday.classList.add('free');
            if (monday.innerHTML === electricity) monday.innerHTML = '';
            if (sunday.innerHTML === electricity) sunday.innerHTML = '';
        }
    }
};

const random = (items) => {
    return items[Math.floor(Math.random() * items.length)];
};

const randomDirection = () => {
    let items = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
    return random(items);
};

const directionToCoords = (x, y, direction) => {
    switch (direction) {
        case 'topLeft':     return [x - 1, y - 1];
        case 'topRight':    return [x - 1, y + 1];
        case 'bottomLeft':  return [x + 1, y - 1];
        case 'bottomRight': return [x + 1, y + 1];
    }
};

const oppositeDirection = (direction) => {
    switch (direction) {
        case 'topLeft':     return 'bottomRight';
        case 'topRight':    return 'bottomLeft';
        case 'bottomLeft':  return 'topRight';
        case 'bottomRight': return 'topLeft';
    }
};

const rowFailedDirection = (direction) => {
    switch (direction) {
        case 'topLeft':     return 'bottomLeft';
        case 'topRight':    return 'bottomRight';
        case 'bottomLeft':  return 'topLeft';
        case 'bottomRight': return 'topRight';
    }
};

const columnFailedDirection = (direction) => {
    switch (direction) {
        case 'topLeft':     return 'topRight';
        case 'topRight':    return 'topLeft';
        case 'bottomLeft':  return 'bottomRight';
        case 'bottomRight': return 'bottomLeft';
    }
};

const loop = (x, y, direction) => {
    let [newX, newY] = directionToCoords(x, y, direction);
    let [rowFailed, columnFailed] = renderBall(newX, newY);

    if (columnFailed) {
        if (bodyRows[x].cells[y - 1].classList.contains('free') || bodyRows[x].cells[y + 1].classList.contains('free')) {
            showGameOver();
            return;
        }
    }

    if (rowFailed && columnFailed) direction = oppositeDirection(direction);
    if (rowFailed && !columnFailed) direction = rowFailedDirection(direction);
    if (!rowFailed && columnFailed) direction = columnFailedDirection(direction);

    if (rowFailed || columnFailed) {
        [newX, newY] = directionToCoords(x, y, direction);
        renderBall(newX, newY);
    }

    if (delay > delayMin) delay -= delayStep;
    setTimeout(loop, delay, newX, newY, direction);
};

const startGame = () => {
    let [x, y] = [6, 4];
    let direction = randomDirection();

    renderBall(x, y);
    renderElements();
    stopWatch();

    setTimeout(loop, delay, x, y, direction);
};
