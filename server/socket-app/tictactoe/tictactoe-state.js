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
            console.log(event);
            //We assign player1 to the user that created the game
            if(event.type==="GameCreated"){
                player1=event.user.userName;

                playerInTurn=player1;
            }

            //Once a player Joins the game we make the game full and assing the player to player2
            if(event.type==="GameJoined"){
                player2=event.user.userName;
                gameIsFull=true;

            } else if (event.type==="MovePlaced"){
                //When a move is placed we store the coordinates of it in object array, unless it's already there
                if(!checkCoordinates(event.coordinates)){
                    //We store and change the playerInTurn so we can check if the right player is playing
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
            //Check for win for both X(player1) and O(player2)
            for (comb in winningPossibilities){

                if(isCoordInArray(winningPossibilities[comb][0], 'X') && isCoordInArray(winningPossibilities[comb][1], 'X') && isCoordInArray(winningPossibilities[comb][2], 'X')){
                       playerWon = player1;
                       return true;
                } else if (isCoordInArray(winningPossibilities[comb][0], 'O') && isCoordInArray(winningPossibilities[comb][1], 'O') && isCoordInArray(winningPossibilities[comb][2], 'O')){
                       playerWon = player2;
                       return true;
                }
            }

            //If we have a array with 9 coordinates all squres should be full and the game finished
            if (coordinatesArray.length === 9){
                playerWon = "draw";
                return true;
            }

            return false;

        }

        //Use this to check if the coordinates are in already to see if the move is legal
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
