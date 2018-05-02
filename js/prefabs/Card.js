//Sets up board and handles all Player functions
var GuessWho = GuessWho || {};


GuessWho.Card = function(state) {

    this.state = state;
    this.game = state.game;
  
    GuessWho.Card.prototype.init = function(texture, colour, type, x, y)
    {
        this.sprite = this.state.add.sprite(x, y, texture);
        this.colour = colour;
        this.type = type;
        this.chosenPlayer=false;
        this.chosenOpponent=false;
        
        return this;
    };
};