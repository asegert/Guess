//Sets up board and handles all Player functions
var GuessWho = GuessWho || {};


GuessWho.Card = function(state) {

    this.state = state;
    this.game = state.game;
  
    GuessWho.Card.prototype.init = function(texture, colour, type, x, y)
    {
        this.texture = texture;
        this.colour = colour;
        this.type = type;
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
                this.state.playerQueries.alpha-=1;
                this.state.add.text(510, 40, "              You Found It!\nYour opponent's card was:", {font: '32px Georgia', stroke: '#FFFFFF', strokeThickness: 2, fontWeight: 'bold'});
                this.state.add.sprite(600, 200, this.state.chosenCard.texture);
                console.log(this.state.chosenCard);
            }
            else
            {
                this.state.playerQueries.alpha-=1;
                var tempText = this.state.add.text(520, 40, " Not Quite, Keep Trying.", {font: '32px Georgia', stroke: '#FFFFFF', strokeThickness: 2, fontWeight: 'bold'});
                
                this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
                {
                    tempText.kill();
                    this.state.playerQueries.alpha+=1;
                    this.state.ask();
                }, this);
            }
        }, this);
        
        return this;
    };
};