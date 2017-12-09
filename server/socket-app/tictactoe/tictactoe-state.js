const _ = require('lodash');

module.exports = function (injected) {



    return function (history) {

        var gameIsFull = false;
        var coordinatesArray = [];
        var player1 = "";
        var player2 = "";
        var playerInTurn = "";
        var playerWon = "";
        const winningPossibilities = [[{x:0, y:0}, {x:0, y:1}, {x:0, y:2}],[{x:1, y:0}, {x:1, y:1}, {x:1, y:2}], [{x:2, y:0}, {x:2, y:1}, {x:2, y:2}], [{x:0, y:0}, {x:1, y:0}, {x:2, y:0}],[{x:1, y:0}, {x:1, y:1}, {x:2, y:1}], [{x:0, y:2}, {x:1, y:2}, {x:2, y:2}],[{x:0, y:0}, {x:1, y:1}, {x:2, y:2}], [{x:2, y:0}, {x:1, y:1}, {x:0, y:2}]];

        function processEvent(event) {
            if(event.type==="GameCreated" && event.user){
                player1=event.user.userName;
                playerInTurn=player1;
            }

            //Once a player Joins the game we make the game full
            if(event.type==="GameJoined"){
                player2=event.user.userName;
                gameIsFull=true;

            } else if (event.type==="MovePlaced"){
                //When a move is placed we store the coordinates of it in object array, unless it's already there
                if(!checkCoordinates(event.coordinates)){
                    if(!checkPlayerTurn(event.user.userName)){
                        coordinatesArray.push(event.coordinates)
                        if(playerInTurn===player1){
                            playerInTurn=player2;
                        } else{
                            playerInTurn=player1;
                        }
                    }
                }

            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return gameIsFull;
        }

        function getWinner(){
            return playerWon;
        }

        function checkCoordinates(coordinates){
            //Check if the coordinates exist in the array
            for (var coord in coordinatesArray){
                if (coordinates.x===coordinatesArray[coord].x && coordinates.y===coordinatesArray[coord].y){
                    return true;
                }
            }

            return false;
        }

        function checkPlayerTurn(user){
            if(playerInTurn!==user){
                return true;
            }
            return false;
        }

        function checkGameState(){
            //Check for win
            for (comb in winningPossibilities){

                if(isCoordInArray(winningPossibilities[comb][0], 'X') && isCoordInArray(winningPossibilities[comb][1], 'X') && isCoordInArray(winningPossibilities[comb][2], 'X')){
                       playerWon = player1;
                       return true;
                } else if (isCoordInArray(winningPossibilities[comb][0], 'O') && isCoordInArray(winningPossibilities[comb][1], 'O') && isCoordInArray(winningPossibilities[comb][2], 'O')){
                       playerWon = player2;
                       return true;
                }
            }

            if (coordinatesArray.length === 9){
                playerWon = "draw";
                return true;
            }

            return false;

        }

        function isCoordInArray(coordinates, field){
            for (coord in coordinatesArray){
                if(coordinatesArray[coord].x===coordinates.x && coordinatesArray[coord].y === coordinates.y && coordinatesArray[coord].field === field){
                    return true;
                }
            }

            return false;
        }

        processEvents(history);

        return {
            gameFull:gameFull,
            checkCoordinates:checkCoordinates,
            checkPlayerTurn:checkPlayerTurn,
            checkGameState:checkGameState,
            getWinner:getWinner,
            processEvents: processEvents,
        }
    };
};
