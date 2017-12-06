const _ = require('lodash');

module.exports = function (injected) {

    var gameIsFull = false;

    return function (history) {
        function processEvent(event) {
            if(event.type==="GameJoined"){
                gameIsFull=true;
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return gameIsFull;
        }

        processEvents(history);

        return {
            gameFull:gameFull,
            processEvents: processEvents,
        }
    };
};
