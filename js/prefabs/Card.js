//Sets up board and handles all Player functions
var GuessWho = GuessWho || {};


GuessWho.Card = function(state) {

    this.state = state;
    this.game = state.game;
  
    GuessWho.Card.prototype.init = function(texture, colour, type, x, y)
    {
        this.sprite = this.state.add.sprite(x, y, texture);
        this.sprite.scale.setTo(0.4, 0.4);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(function()
        {
            console.log(this);
            if(this.state.playerChosenCard === null)
            {
                this.state.playerChosenCard = this;
                this.state.startText.kill();
                console.log(this.state.playerQueries);
                this.state.playerQueries.alpha +=1;
                
                for(var i=0, len=this.state.boardCards.length; i<len; i++)
                {
                    this.state.boardCards[i].inputEnabled = false;
                }
            }
            else if(this === this.state.chosenCard)
            {
                console.log('success');
            }
        }, this);
        this.texture = texture;
        this.colour = colour;
        this.type = type;
        this.chosenPlayer=false;
        this.chosenOpponent=false;
        
        return this;
    };
};