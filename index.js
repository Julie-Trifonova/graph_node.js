// const graph = [[0, 1, 0], [0, 1, 0], [0, 0, 0]]
// const n = 3 //строки
// const m = 3 //столбцы
// const start_j = 0;
// const start_i = 0;
// const end_j = 2;
// const end_i = 0;

// const graph = [[0, 1, 0], [0, 1, 0], [0, 1, 0]]
// const n = 3 //строки
// const m = 3 //столбцы
// const start_j = 0;
// const start_i = 0;
// const end_j = 2;
// const end_i = 0;

// const graph = [[0, 0, 0], [0, 0, 0]]
// const n = 2 //строки
// const m = 3 //столбцы
// const start_j = 0;
// const start_i = 0;
// const end_j = 2;
// const end_i = 1;

const readline = require('readline').createInterface(process.stdin, process.stdout);
var arr = [];
var inside_arr = []
readline.on('line', (line) => {
    if (arr.length < 3) {
        arr.push(line);
    } else {
        inside_arr.push(line)
        if(!arr.find((e) => e === inside_arr)) {
            arr.push(inside_arr)
        }
    }
    if (arr.length > 0 && inside_arr.length === Number(arr[0].split(' ')[0])) {

        const n = Number(arr[0].split(' ')[0])
        const m = Number(arr[0].split(' ')[1])
        const start_j = Number(arr[1].split(' ')[0])
        const start_i = Number(arr[1].split(' ')[1])
        const end_j = Number(arr[2].split(' ')[0])
        const end_i = Number(arr[2].split(' ')[1])
        const blockElements = [];

        const data_graph = arr[3]
        const graph = []

        data_graph.map((a) => graph.push((a.split(' ')).map(b => Number(b))))

        graph.map((a) => a.map((b) => b === 1 ? blockElements.push(b) : ''))

        function findMoveAlongXY (x, next_i, next_j, distances, distance, visitedCells, neighborValues, direction) {
            let moveAlongY = (next_i === end_i) ? 'match' : (next_i < end_i);
            let moveAlongX = (next_j === end_j) ? 'match' : (next_j < end_j);

            if ((visitedCells.length === (n * m - blockElements.length - 1)) || (distances.length === n * m - blockElements.length - 1)) {
                distances.push(distance)
                const filtered_distances = distances.filter((a) => a !== 0)
                if (filtered_distances.length !== 0) {
                    console.log(Math.min(...filtered_distances))
                } else {
                    console.log(0)
                }
            } else if (((moveAlongX === 'match') && (moveAlongY === 'match')) || !direction) {
                if ((moveAlongX === 'match') && (moveAlongY === 'match')) {
                    distances.push(distance)
                } else {
                    distances.push(0)
                }
                findMoveAlongXY(0, start_i, start_j, distances, 0, visitedCells, [],true)
            } else if ((moveAlongX === 'match') && (moveAlongY !== 'match')) {
                moveAlongX = true;
                recursiveDisplacementCalculations(x, moveAlongX, moveAlongY, next_i, next_j, true, distances, distance, visitedCells, neighborValues);
            } else if ((moveAlongX !== 'match') && (moveAlongY === 'match')) {
                moveAlongY = true;
                recursiveDisplacementCalculations(x, moveAlongX, moveAlongY, next_i, next_j, true, distances, distance, visitedCells, neighborValues);
            } else {
                moveAlongY = true;
                recursiveDisplacementCalculations(x, moveAlongX, moveAlongY, next_i, next_j, true, distances, distance, visitedCells, neighborValues);
            }

            function recursiveDisplacementCalculations(x, moveAlongX, moveAlongY, next_i, next_j, direction, distances, distance, visitedCells, neighborValues) {
                if (!direction) {
                    moveAlongX = !moveAlongX;
                    moveAlongY = !moveAlongY;
                }

                const findSiblingValues = (directionX, directionY) => {
                    if (directionX) {
                        if (next_j === (m - 1)) {
                            neighborValues[0] = 1;
                        } else {
                            neighborValues[0] = graph[next_i][next_j + 1];
                        }
                    } else if (!directionX) {
                        if ((next_j - 1) < 0) {
                            neighborValues[0] = 1;
                        } else {
                            neighborValues[0] = graph[next_i][next_j - 1];
                        }
                    }

                    if (directionY) {
                        if (next_i === (n - 1)) {
                            neighborValues[1] = 1;
                        } else {
                            neighborValues[1] = graph[next_i + 1][next_j];
                        }
                    } else if (!directionY) {
                        if ((next_i - 1) < 0) {
                            neighborValues[1] = 1;
                        } else {
                            neighborValues[1] = graph[next_i - 1][next_j];
                        }
                    }
                }
                findSiblingValues(moveAlongX, moveAlongY)
                const changeCells = (ordinate, movement) => {
                    movement ? (ordinate === 'next_i' ? next_j += 1 : next_i += 1)
                        : (ordinate === 'next_i' ? next_j -= 1 : next_i -= 1);
                    distance = distance + 1
                    if (visitedCells.filter((item) => item === [next_i, next_j]).length === 0) {
                        visitedCells.push([next_i, next_j])
                    }
                }

                if (neighborValues[x] === 0) {
                    if (x === 0) {
                        if ((moveAlongX === true) && (((visitedCells.length > 0) && ((next_j + 1) <= (m - 1))) ? (visitedCells.slice(-1)[0][1] !== (next_j + 1)) : true) && (visitedCells.length > 1 ? (visitedCells.slice(-2, -1)[0][1] !== (next_j + 1)) : true)) {
                            changeCells('next_i', moveAlongX)
                            findMoveAlongXY(1, next_i, next_j, distances, distance, visitedCells, [], true)
                        } else if ((moveAlongX === false) && (((visitedCells.length > 0) && ((next_j - 1) > 0)) ? (visitedCells.slice(-1)[0][0] !== next_i && visitedCells.slice(-1)[0][1] !== (next_j - 1)) : true) && (visitedCells.length > 1 ? (visitedCells.slice(-2, -1)[0][1] !== (next_j - 1)) : true)) {
                            changeCells('next_i', moveAlongX)
                            findMoveAlongXY(1, next_i, next_j, distances, distance, visitedCells, [], true)
                        } else {
                            if (!!direction) {
                                recursiveDisplacementCalculations(0, moveAlongX, moveAlongY, next_i, next_j, false, distances, distance, visitedCells, neighborValues);
                            }
                        }
                    } else if (x === 1) {
                        if ((moveAlongY === true) && (((visitedCells.length > 0) && ((next_i + 1) <= (n - 1))) ? (visitedCells.slice(-1)[0][0] !== (next_i + 1)) : true) && (visitedCells.length > 1 ? (visitedCells.slice(-2, -1)[0][0] !== (next_i + 1)) : true)) {
                            changeCells('next_j', moveAlongY)
                            findMoveAlongXY(0, next_i, next_j, distances, distance, visitedCells, [], true)
                        } else if ((moveAlongY === false) && (((visitedCells.length > 0) && ((next_i - 1) > 0)) ? (visitedCells.slice(-1)[0][0] !== (next_i - 1)) : true) && (visitedCells.length > 1 ? (visitedCells.slice(-2, -1)[0][0] !== (next_i - 1)) : true)) {
                            changeCells('next_j', moveAlongY)
                            findMoveAlongXY(0, next_i, next_j, distances, distance, visitedCells, [], true)
                        } else {
                            if (!!direction) {
                                return recursiveDisplacementCalculations(0, moveAlongX, moveAlongY, next_i, next_j, false, distances, distance, visitedCells, neighborValues);
                            }
                        }
                    }
                } else if (neighborValues[Number(!x)] === 0) {
                    x = Number(!x);
                    recursiveDisplacementCalculations(x, moveAlongX, moveAlongY, next_i, next_j, true, distances, distance, visitedCells, neighborValues);
                } else {
                    if (!direction) {
                        findMoveAlongXY(0, next_i, next_j, distances, distance, visitedCells, [], false)
                    } else {
                        recursiveDisplacementCalculations(0, moveAlongX, moveAlongY, next_i, next_j, false, distances, distance, visitedCells, neighborValues);
                    }
                }
            }
        }

        findMoveAlongXY(0, start_i, start_j, [], 0, [], [], true)

        readline.close()
    }
}).on('close', () => {
    process.exit(0)});

