var GuessWho = GuessWho || {};

//loading the game assets
GuessWho.PreloadState = {
  preload: function() {
    //show loading screen
    /*this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(100, 1);
    this.load.setPreloadSprite(this.preloadBar);*/

    //images
    this.load.image('main', 'assets/images/Main.png');
    this.load.image('board', 'assets/images/board.png');
    this.load.image('guess', 'assets/images/ButtonGuess.png');
    this.load.image('start', 'assets/images/start.png');
          
    this.load.image('car_red', 'assets/images/car_red.png');
    this.load.image('car_black', 'assets/images/car_black.png');
    this.load.image('car_orange', 'assets/images/car_orange.png');
    this.load.image('car_yellow', 'assets/images/car_yellow.png');
    this.load.image('car_green', 'assets/images/car_green.png');
    this.load.image('car_blue', 'assets/images/car_blue.png');
    this.load.image('car_purple', 'assets/images/car_purple.png');
    this.load.image('car_pink', 'assets/images/car_pink.png');
    this.load.image('car_grey', 'assets/images/car_grey.png');
    this.load.image('car_white', 'assets/images/car_white.png');
      
    this.load.image('truck_red', 'assets/images/truck_red.png');
    this.load.image('truck_black', 'assets/images/truck_black.png');
    this.load.image('truck_orange', 'assets/images/truck_orange.png');
    this.load.image('truck_yellow', 'assets/images/truck_yellow.png');
    this.load.image('truck_green', 'assets/images/truck_green.png');
    this.load.image('truck_blue', 'assets/images/truck_blue.png');
    this.load.image('truck_purple', 'assets/images/truck_purple.png');
    this.load.image('truck_pink', 'assets/images/truck_pink.png');
    this.load.image('truck_grey', 'assets/images/truck_grey.png');
    this.load.image('truck_white', 'assets/images/truck_white.png');
      
    this.load.image('utility_red', 'assets/images/utility_red.png');
    this.load.image('utility_black', 'assets/images/utility_black.png');
    this.load.image('utility_orange', 'assets/images/utility_orange.png');
    this.load.image('utility_yellow', 'assets/images/utility_yellow.png');
    this.load.image('utility_green', 'assets/images/utility_green.png');
    this.load.image('utility_blue', 'assets/images/utility_blue.png');
    this.load.image('utility_purple', 'assets/images/utility_purple.png');
    this.load.image('utility_pink', 'assets/images/utility_pink.png');
    this.load.image('utility_grey', 'assets/images/utility_grey.png');
    this.load.image('utility_white', 'assets/images/utility_white.png');
    
    /*
    JSON
    types -> An array containing all the types of things being checked ie colour
    queries -> An Array of questions to ask the player, each object containing:
                ->question -> The question to be displayed to the player
                ->type -> The name of the type of question being asked, it will correspond to the types array
                ->param => the paramerter for the question that must be matched ie type=colour param=red or blue...
                ->colour1 -> The colour the parameter text should be displayed as ie param=red display text as red
                ->colour2 -> The colour the text will return to post param recolour
                ->startColour -> The index of the question where the colour should start switching
                ->endColour -> The index of the question where the colour should stop switching
    cards -> An Array of potential cards to create, each object containing:
                ->texture -> The texture to be used for the card
                ->params -> An array of the parameters of the card, must correspond to the order of the types array ie types["colour", "type"] params["red", "car"]
    */
                
    this.load.text('guessData', 'assets/data/guessData.JSON');

  },
  create: function() {
    this.state.start('Story');
  }
};