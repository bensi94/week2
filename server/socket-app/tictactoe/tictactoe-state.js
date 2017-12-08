const _ = require('lodash');

module.exports = function (injected) {

    var gameIsFull = false;
    var coordinatesArray = [];

    return function (history) {
        function processEvent(event) {
            if(event.type==="GameJoined"){
                gameIsFull=true;
            } else if (event.type==="MovePlaced"){
                if(!checkCoordinates(event.coordinates)){
                    coordinatesArray.push(event.coordinates)
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
            for (var coord in coordinatesArray){
                if (coordinates.x===coordinatesArray[coord].x && coordinates.y===coordinatesArray[coord].y){
                    return true;
                }
            }

            return false;
        }

        processEvents(history);

        return {
            gameFull:gameFull,
            checkCoordinates:checkCoordinates,
            processEvents: processEvents,
        }
    };
};
