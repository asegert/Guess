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
    this.load.image('back', 'assets/images/cardBack.png');
    this.load.image('front', 'assets/images/cardFront.png');
    this.load.image('board', 'assets/images/Board.png');
    this.load.image('start', 'assets/images/start.png');
    
    //Card fillers
    this.load.image('fill1', 'assets/images/fill1.png');
    this.load.image('fill2', 'assets/images/fill2.png');
    this.load.image('fill3', 'assets/images/fill3.png');
    this.load.image('fill4', 'assets/images/fill4.png');
    this.load.image('fill5', 'assets/images/fill5.png');
    this.load.image('fill6', 'assets/images/fill6.png');
    this.load.image('fill7', 'assets/images/fill7.png');
    this.load.image('fill8', 'assets/images/fill8.png');
    this.load.image('fill9', 'assets/images/fill9.png');
    this.load.image('fill10', 'assets/images/fill10.png');
    this.load.image('fill11', 'assets/images/fill11.png');
    this.load.image('fill12', 'assets/images/fill12.png');
    this.load.image('fill13', 'assets/images/fill13.png');
    this.load.image('fill14', 'assets/images/fill14.png');
    this.load.image('fill15', 'assets/images/fill15.png');
    this.load.image('fill16', 'assets/images/fill16.png');
    this.load.image('fill17', 'assets/images/fill17.png');
    this.load.image('fill18', 'assets/images/fill18.png');
    this.load.image('fill19', 'assets/images/fill19.png');
    this.load.image('fill20', 'assets/images/fill20.png');
    this.load.image('fill21', 'assets/images/fill21.png');
    this.load.image('fill22', 'assets/images/fill22.png');
    this.load.image('fill23', 'assets/images/fill23.png');
    this.load.image('fill24', 'assets/images/fill24.png');
    this.load.image('fill25', 'assets/images/fill25.png');
    this.load.image('fill26', 'assets/images/fill26.png');
    this.load.image('fill27', 'assets/images/fill27.png');
    this.load.image('fill28', 'assets/images/fill28.png');
    this.load.image('fill29', 'assets/images/fill29.png');
    this.load.image('fill30', 'assets/images/fill30.png');
    this.load.image('fill31', 'assets/images/fill31.png');
    this.load.image('fill32', 'assets/images/fill32.png');
    
    //Buttons
    this.load.image('corners', 'assets/images/ButtonCorners.png');
    this.load.image('circle', 'assets/images/ButtonCircle.png');
    this.load.image('blank', 'assets/images/ButtonBlank.png');
    this.load.image('red', 'assets/images/ButtonRed.png');
    this.load.image('burgundy', 'assets/images/ButtonBurgundy.png');
    this.load.image('orange', 'assets/images/ButtonOrange.png');
    this.load.image('yellow', 'assets/images/ButtonYellow.png');
    this.load.image('green', 'assets/images/ButtonGreen.png');
    this.load.image('blue', 'assets/images/ButtonBlue.png');
    this.load.image('purple', 'assets/images/ButtonPurple.png');
    this.load.image('pink', 'assets/images/ButtonPink.png');
    this.load.image('brown', 'assets/images/ButtonBrown.png');
    this.load.image('grey', 'assets/images/ButtonGrey.png');
    this.load.image('white', 'assets/images/ButtonWhite.png');
    this.load.image('guess', 'assets/images/ButtonGuess.png');
    this.load.image('accept', 'assets/images/ButtonAccept.png');
    this.load.image('reject', 'assets/images/ButtonReject.png');
      
      
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
    
    //Data
    //Contains limit objects which correspond to card faces
      //Each contains a color, true or false is circle present, true or false are corners present, name of asset used, type is a relection of index, onBoard is true if the card is played in the current game
    //Contains query objects which store question information to be asked of the player
      //Each contains a question to be asked, an answer true or false, whether it has been asked yet (true/false), type which classifies the question (i.e. color related), and a param which indicates the question as a single word
    this.load.text('guessData', 'assets/data/guessData.JSON');

  },
  create: function() {
    this.state.start('Story');
  }
};