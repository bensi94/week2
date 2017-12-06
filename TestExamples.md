# Test examples and scenarios

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
