//Sets up board and handles all Player functions
var GuessWho = GuessWho || {};


GuessWho.Card = function(state) {

    this.state = state;
    this.game = state.game;
  
    GuessWho.Card.prototype.init = function(texture, params, x, y)
    {
        //Store the texture and the card's parameters
        this.texture = texture;
        this.params = params;
        this.sprite = this.state.add.sprite(x, y, texture);
        this.sprite.scale.setTo(0.4, 0.4);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(function()
        {
            //If the card is hit do not allow input on them anymore
            for(var i=0, len=this.state.boardCards.length; i<len; i++)
            {
                this.state.boardCards[i].sprite.inputEnabled = false;
            }
            //If the player has not chosen a card this is that card
            if(this.state.playerChosenCard === null)
            {
                this.state.playerChosenCard = this;
                //Once a card is chosen the opening text will be removed and the player queries available
                this.state.startText.kill();
                this.state.playerQueries.alpha +=1;
                
                for(var i=0, len=this.state.boardCards.length; i<len; i++)
                {
                    this.state.boardCards[i].inputEnabled = false;
                }
                this.state.playerQueries.forEach(function(q)
                {
                    q.inputEnabled=true;
                }, this);
            }
            else if(this === this.state.chosenCard)
            {
                //If the player card is already defined and the card chosen is the computer's card
                this.state.playerQueries.forEach(function(q)
                {
                    q.inputEnabled=false;
                }, this);
                this.state.playerQueries.alpha-=1;
                this.state.add.text(510, 40, "              You Found It!\nYour opponent's card was:", {font: '32px Georgia', stroke: '#FFFFFF', strokeThickness: 2, fontWeight: 'bold'});
                this.state.add.sprite(600, 200, this.state.chosenCard.texture);
            }
            else
            {
                //Otherwise the card chosen is an incorrect guess
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