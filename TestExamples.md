# Test examples and scenarios

## INFO

This is a little text about the required tests, they have all been implemented now along with the features they test, on the server side using TDD.

### 1. Create game command

**Should emit game created event**

*Given*

We know that when we are creating a game we should not really have anything specific given.

*When*

This is our action that creates a game. A create event should have a type which is "CreateGame", some id, a user with a username that creates the game, a name for the game and a timestamp.

*Then*

After our action has happened we should have one stored event of type "GameCreated", by some user with a username, the name of the game, timestamp and for the TicTacToe game a side for the user 'X' that created the game.


### 2. Join game command

**Should emit game joined event**

*Given*

Now we want a second user to join the game, for that to happened we obviously need to have a game already created so that is what is given. This includes then type: "GameCreated", some user with user name, name of game and timestamp.

*When*

Our event is when another user joins the game, so the users can play with each other. So our event type is "JoinGame", it has some user (second user) that is joining the game, name of game and timestamp.

*Then*

So our then type is "GameJoined", the user that joined the game, name of the game, timestamp and the side for the second user, now the user that created the game was 'X' so the second user should be 'O'.


**Should emit FullGameJoinAttempted when game full**

*Given*

Now our given should be the mentioned events from before of type "GameCreated" and "GameJoined" so we kind of use our output of as a given input for the next one (still hard coded).

*When*

Now our event is the same as before in join game, but it's good idea to test with different user. So this includes, user, name for the game and timestamp.

*Then*

Our result should be different, our type is "FullGameJoinAttempted", from some user, with name for the game and a timestamp. Now since the user is attempting  to join a full game he should not get a side like the previously entered users.

### 3. Place move command

**Should emit MovePlaced on first game move**

*Given*

To place the first game move we need to have the game created and another player has already JoinedTheGame, so our given is "GameCreated" and "GameJoined".

*When*

Our event is that the first player places a move on the board so event type would be "PlaceMove", by some user, the name of the game, timestamp, legal coordinates of where to place the move.

*Then*

We should now have a "MovePlaced", by the first user, timestamp, game name and coordinates of the move and the side 'X' that made the move.


**Should emit IllegalMove when square is already occupied**

*Given*

Our given is "GameCreated", "GameJoined" and "MovePlaced".

*When*

Our when is same as the previous test with the same coordinates but the user is different.

*Then*

Because we are trying to place a move on a occupied square the then type will be "IllegalMove" for the user.

**Should emit NotYourMove if attempting to make move out of turn**

*Given*

Our given is "GameCreated", "GameJoined".

*When*

Our when is the second user, the 'O' user tries to make move to legal coordinates.

*Then*

Since it was the first users ('X') turn the type of response will be "NotYourMove".

**Should emit game won on**

*Given*

Our given will be "GameCreated", "GameJoined", and then enough of "MovePlaced" so that we just need one more in specific place to win the game, for the user that turn is next.

*When*

Our when is then "PlaceMove" in the right coordinates by the user that just needs one move to win the game.

*Then*

Our the is then of type "GameWon" and by the winning user.

**Should not emit game draw if won on last move**

*Given*

Our given is the "GameCreated", "GameJoined" and legal "MovePlaced" to all fields but one and the last one that is not marked will be enough for one of the users to win the game.


*When*

Our when will be "PlaceMove" on the unmarked field.

*Then*

Our then will be "GameWon" by the winning user.


**Should emit game draw when neither wins**

*Given*

Our given is "GameCreated", "GameJoined" and all fields marked but one, and the last field will not make the user that turn it is the winning user.

*When*

Our when will be "PlaceMove" on the unmarked field.

*Then*

Our then type will be "GameDraw", with either both users or neither (will decide in implementation).
