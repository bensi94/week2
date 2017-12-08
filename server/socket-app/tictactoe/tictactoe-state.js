const _ = require('lodash');

module.exports = function (injected) {

    var gameIsFull = false;
    var coordinatesArray = [];
    var player1 = "";
    var player2 = "";
    var playerInTurn = "";

    return function (history) {
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

        processEvents(history);

        return {
            gameFull:gameFull,
            checkCoordinates:checkCoordinates,
            checkPlayerTurn:checkPlayerTurn,
            processEvents: processEvents,
        }
    };
};
