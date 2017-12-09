let should = require('should');
let _ = require('lodash');

let TictactoeState = require('./tictactoe-state')(inject({}));

let tictactoe = require('./tictactoe-game')(inject({
    TictactoeState
}));

let createEvent = {
    type: "GameCreated",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};

let joinEvent = {
    type: "GameJoined",
    user: {
        userName: "Gummi"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};


describe('create game command', function() {


    let given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game created event', function(){

        given = [];
        when =
            {
                id:"123987",
                type: "CreateGame",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            };
        then = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            }
        ];

    })
});


describe('join game command', function () {


    let given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game joined event...', function () {

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            }
        ];

        when =
            {
                type: "JoinGame",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            };
        then = [
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            }

        ];

    });

    it('should emit FullGameJoinAttempted event when game full..implement this', function () {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            },

            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            }
        ];

        when =
            {
                type: "JoinGame",
                user: {
                    userName: "Bensi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29"
            };

        then = [
            {
                type: "FullGameJoinAttempted",
                user: {
                    userName: "Bensi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29"
            }

        ];
    });
});

 describe('place move command', function () {
     let given, when, then;

     beforeEach(function () {
         given = undefined;
         when = undefined;
         then = undefined;
     });

     afterEach(function () {
         tictactoe(given).executeCommand(when, function (actualEvents) {
             should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
         });
     });

     it('Should emit MovePlaced on first game move...', function () {
         given = [
             {
                 type: "GameCreated",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:29:29"
             },

             {
                 type: "GameJoined",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:29:29",
                 side:'O'
             }
         ];

         when =
             {
                 type: "PlaceMove",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 1, field: 'X'},
                 timeStamp: "2014-12-02T11:30:29"
             };

         then = [
             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 1, field: 'X'},
                 timeStamp: "2014-12-02T11:30:29",
             }

         ];
     });

     it('Should emit IllegalMove when square is already occupied...', function () {
         given = [
             {
                 type: "GameCreated",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:29:29"
             },

             {
                 type: "GameJoined",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:29:29",
                 side:'O'
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 1, field: 'X'},
                 timeStamp: "2014-12-02T11:30:29",
             }

         ];

         when =
             {
                 type: "PlaceMove",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 1, field: 'O'},
                 timeStamp: "2014-12-02T11:31:29"
             };

         then = [
             {
                 type: "IllegalMove",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 1, field: 'O'},
                 timeStamp: "2014-12-02T11:31:29",
             }

         ];
     });

     it('Should emit NotYourMove whenmit NotYourMove if attempting to make move out of turn...', function () {
         given = [
             {
                 type: "GameCreated",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:29:29"
             },

             {
                 type: "GameJoined",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:29:29",
                 side:'O'
             }

         ];

         when =
             {
                 type: "PlaceMove",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 2, field: 'O'},
                 timeStamp: "2014-12-02T11:31:29"
             };

         then = [
             {
                 type: "NotYourMove",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 2, field: 'O'},
                 timeStamp: "2014-12-02T11:31:29",
             }

         ];
     });

     it('Should emit game won on...', function () {
         given = [
             {
                 type: "GameCreated",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:29:29"
             },

             {
                 type: "GameJoined",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:30:29",
                 side:'O'
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 0, field: 'X'},
                 timeStamp: "2014-12-02T11:31:29",
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 1, field: 'O'},
                 timeStamp: "2014-12-02T11:32:29",
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 1, y: 0, field: 'X'},
                 timeStamp: "2014-12-02T11:33:29",
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 2, field: 'O'},
                 timeStamp: "2014-12-02T11:34:29",
             }

         ];

         when =
             {
                 type: "PlaceMove",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 2, y: 0, field: 'X'},
                 timeStamp: "2014-12-02T11:35:29"
             };

         then = [
             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 2, y: 0, field: 'X'},
                 timeStamp: "2014-12-02T11:35:29",
             },
             {
                 type: "GameWon",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:35:29",
             }

         ];
     });

     it('Should not emit game draw if won on last move', function () {
         given = [
             {
                 type: "GameCreated",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:29:29"
             },

             {
                 type: "GameJoined",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:30:29",
                 side:'O'
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 0, field: 'X'},
                 timeStamp: "2014-12-02T11:31:29",
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 1, field: 'O'},
                 timeStamp: "2014-12-02T11:32:29",
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 1, y: 0, field: 'X'},
                 timeStamp: "2014-12-02T11:33:29",
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 2, field: 'O'},
                 timeStamp: "2014-12-02T11:34:29",
             },
             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 2, y: 2, field: 'X'},
                 timeStamp: "2014-12-02T11:35:29",
             },
             {
                 type: "MovePlaced",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 2, y: 0, field: 'O'},
                 timeStamp: "2014-12-02T11:36:29",
             },
             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 2, y: 1, field: 'X'},
                 timeStamp: "2014-12-02T11:37:29",
             },
             {
                 type: "MovePlaced",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 1, y: 2, field: 'O'},
                 timeStamp: "2014-12-02T11:38:29",
             },


         ];

         when =
             {
                 type: "PlaceMove",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 1, y: 1, field: 'X'},
                 timeStamp: "2014-12-02T11:39:29"
             };

         then = [
             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 1, y: 1, field: 'X'},
                 timeStamp: "2014-12-02T11:39:29",
             },
             {
                 type: "GameWon",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:39:29",
             }

         ];
     });

     it('Should emit game draw when neither wins', function () {
         given = [
             {
                 type: "GameCreated",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:29:29"
             },

             {
                 type: "GameJoined",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:30:29",
                 side:'O'
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 0, field: 'X'},
                 timeStamp: "2014-12-02T11:31:29",
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 1, field: 'O'},
                 timeStamp: "2014-12-02T11:32:29",
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 2, y: 0, field: 'X'},
                 timeStamp: "2014-12-02T11:33:29",
             },

             {
                 type: "MovePlaced",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 0, y: 2, field: 'O'},
                 timeStamp: "2014-12-02T11:34:29",
             },
             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 2, y: 1, field: 'X'},
                 timeStamp: "2014-12-02T11:35:29",
             },
             {
                 type: "MovePlaced",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 2, y: 2, field: 'O'},
                 timeStamp: "2014-12-02T11:36:29",
             },
             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 1, y: 2, field: 'X'},
                 timeStamp: "2014-12-02T11:37:29",
             },
             {
                 type: "MovePlaced",
                 user: {
                     userName: "Gummi"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 1, y: 0, field: 'O'},
                 timeStamp: "2014-12-02T11:38:29",
             },


         ];

         when =
             {
                 type: "PlaceMove",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 1, y: 1, field: 'X'},
                 timeStamp: "2014-12-02T11:39:29"
             };

         then = [
             {
                 type: "MovePlaced",
                 user: {
                     userName: "TheGuy"
                 },
                 name: "TheFirstGame",
                 coordinates: {x: 1, y: 1, field: 'X'},
                 timeStamp: "2014-12-02T11:39:29",
             },
             {
                 type: "GameDraw",
                 name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:39:29",
             }

         ];
     });

 });
