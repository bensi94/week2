
module.exports = function(injected){
    let TictactoeState = injected('TictactoeState');

    return function(history){

        let gameState = TictactoeState(history);

        return {
            executeCommand: function(cmd, eventHandler){
                function applyEvents(events, moreEvents){
                    gameState.processEvents(events);


                    // Check here for game state that may result in additional events
                    if(gameState.checkGameState()){
                        gameState.processEvents(moreEvents);
                        var winner = gameState.getWinner();

                        var moreEventsCopy = JSON.parse(JSON.stringify(moreEvents[0]))
                        moreEventsCopy["user"]["userName"] = winner;

                        if(gameState.getWinner()==="draw"){
                            delete moreEvents[0]["user"];
                            moreEvents[0].type = "GameDraw";
                        }

                        events.push(moreEvents[0]);
                        eventHandler(events);
                    } else {
                        eventHandler(events);
                    }
                }

                let cmdHandlers = {
                    "CreateGame": function (cmd) {
                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameCreated",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'X'
                        }]);

                    },
                    "JoinGame": function (cmd) {
                        if(gameState.gameFull()){
                            applyEvents( [{
                                gameId: cmd.gameId,
                                type: "FullGameJoinAttempted",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            }]);
                            return;
                        }

                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameJoined",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'O'
                        }]);
                    },
                    "LeaveGame": function (cmd) {
                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameLeft",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }]);
                    },
                    "PlaceMove": function(cmd){
                        //Checking if the coordinates already exist
                        if(gameState.checkCoordinates(cmd.coordinates)){
                            applyEvents([{
                                gameId: cmd.gameId,
                                type: "IllegalMove",
                                user: cmd.user,
                                name: cmd.name,
                                coordinates: cmd.coordinates,
                                timeStamp: cmd.timeStamp
                            }]);
                        } else if (gameState.checkPlayerTurn(cmd.user.userName)) {
                            applyEvents([{
                                gameId: cmd.gameId,
                                type: "NotYourMove",
                                user: cmd.user,
                                name: cmd.name,
                                coordinates: cmd.coordinates,
                                timeStamp: cmd.timeStamp
                            }]);
                        } else {
                            applyEvents([{
                                gameId: cmd.gameId,
                                type: "MovePlaced",
                                user: cmd.user,
                                name: cmd.name,
                                coordinates: cmd.coordinates,
                                timeStamp: cmd.timeStamp
                            }], [{
                                gameId: cmd.gameId,
                                type: "GameWon",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            }]);
                        }
                    },
                    "RequestGameHistory": function(cmd){
                        // Game does not handle this query command, is declared here for making tests more robust.
                    }
                };

                if(!cmdHandlers[cmd.type]){
                    throw new Error("I do not handle command of type " + cmd.type)
                }
                cmdHandlers[cmd.type](cmd);
            }
        }
    }
};
