# html5-simon-game

1. Has heavy dependency on HTML element ID's and classes.
1. Consist of one JS class, that must be instantiated.
1. Once the class is instantiated, it will capture all DOM elements it needs with meaningful names.
1. Game is initiated with user click to "info button".

## Game

Has 3 levels, that should be selected by user before initiating the game.

### Info button

It will indicate the state of the game using short messages and colors.
During the game, orange ring means taht it is _computer's_ turn. Green ring means it is _user's_ turn.

## Game levels

### 1. Easy

- User must repeat computer chosen colors in order.
- Every round add one more color to existing sequence.
- Mistake to repeat _computer's_ presented sequence will make _user_ to lose game.

### 2. Hard

- Additional to **Easy**...
- Game buttons rotate at speed of 1r/9sec.

### 3. Crazy

- Additional to **Hard**...
- The game area is rotated at all 3 axes a git, and perspective is set.

## Road map ideas

1. Add level, where game area turns slowly on some axe.
   - At least during _computer's_ turn all colors should be visible at all times.
   - _User's_ turn on the other hand should not be disrupted too heavily.
   - For example, rotation can be manipulated well.
