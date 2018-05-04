//Sets up game and handles all Opponent functions
var GuessWho = GuessWho || {};

GuessWho.GameState = {

  create: function() 
  {   
      //Stores all data from JSON file
      this.allData = JSON.parse(this.game.cache.getText('guessData'));
      this.background = this.add.sprite(0, 0, 'board');
      this.boardCards = new Array();
      this.queries = new Array();
      this.playerQueries = this.add.group(); 
      this.playerCardDetails = {};
      
      var cards = this.shuffle(this.allData.cards);
      
      for(var i=0, len=cards.length; i<len; i++)
      {
          var card = new GuessWho.Card(this);
          var y = Math.floor(i/5);
          var x = i - (5*y);
          this.boardCards[this.boardCards.length] = card.init(cards[i].texture, cards[i].params, x * 100, y * 100);
      }
      this.cardsMasterList = this.boardCards.slice(0);
      this.playerChosenCard = null;
      this.chosenCard = this.boardCards[Math.floor(Math.random()*this.boardCards.length)];
      
      this.playerQueries.add(this.add.text(510, 0, "Ask a question to determine\nwhat car your opponent has.", {font: '28px Georgia', stroke: '#FFFFFF', strokeThickness: 2, fontWeight: 'bold'}));
      for(var i=0, len=this.allData.queries.length; i<len; i++)
      {
          this.queries[this.queries.length] = this.allData.queries[i];
          var x = 500 + (245 * (Math.floor((i/7)+1)-1));
          var y = 100 + ((i%7) * 40);
          var query = this.add.text(x, y, this.allData.queries[i].question, {font: '18px Georgia', stroke: '#FFFFFF', strokeThickness: 2});
          query.fontWeight = 'bold';
          query.data = this.allData.queries[i];
          query.inputEnabled=true;
          query.addColor(this.allData.queries[i].colour1, this.allData.queries[i].startColour);
          query.addColor(this.allData.queries[i].colour2, this.allData.queries[i].endColour);
          query.addStrokeColor('#000000', this.allData.queries[i].startColour);
          query.addStrokeColor('#FFFFFF', this.allData.queries[i].endColour);
          query.events.onInputDown.add(function()
          {
              this.alpha = 0.1;
              GuessWho.GameState.removeCards(this.data);
          }, query);
          this.playerQueries.add(query);
      }
      this.playerQueries.alpha -=1;
      
      this.guess = this.add.button(850, 550, 'guess', function()
      {
          for(var i=0, len=this.boardCards.length; i<len; i++)
          {
              this.boardCards[i].sprite.inputEnabled = true;
          }
      }, this);
      this.playerQueries.add(this.guess);
      
      this.startText = this.add.text(500, 40, "Choose a car for the other\nplayer to guess.", {font: '32px Georgia', stroke: '#FFFFFF', strokeThickness: 2, fontWeight: 'bold'});
    },
    removeCards: function(query)
    { 
        for(var j=0, leng = this.allData.types.length; j<leng; j++)
        {
            if(this.allData.types[j] === query.type)
            {
                if(query.param != this.chosenCard.params[j])
                {
                    for(var i=0, len = this.boardCards.length; i<len; i++)
                    {
                        if(query.param === this.boardCards[i].params[j])
                        {
                            this.boardCards[i].sprite.alpha = 0;
                            this.boardCards.splice(i, 1);
                            i--;
                            len--;
                        }
                    }
                }
            }
        }
        if(this.boardCards.length === 1)
        {
            console.log('go');
        }
        
        this.ask();
    },
    shuffle: function(shuffleArray)
    {
        var returnArray = new Array();
        
        for(var i=0, len=shuffleArray.length; i<len; i++)
        {
            var rand = Math.floor(Math.random()*shuffleArray.length);
            returnArray[i]=shuffleArray[rand];
            shuffleArray.splice(rand, 1);
        }
        return returnArray;
    },
    ask: function()
    {
        console.log(this.queries.length);
        this.playerQueries.alpha-=1;
        this.playerQueries.forEach(function(q)
        {
            q.inputEnabled=false;
        }, this);
        if(this.queries.length === 0)
        {
            for(var i=0, len=this.cardsMasterList.length; i<len; i++)
            {
                if(this.cardsMasterList[i].colour === this.playerCardDetails.colour && this.cardsMasterList[i].type === this.playerCardDetails.type)
                {
                    this.add.text(600, 40, "Your Card is:", {font: '32px Georgia', stroke: '#FFFFFF', strokeThickness: 2, fontWeight: 'bold'});
                    this.add.sprite(600, 200, this.playerChosenCard.texture);
                    console.log(this.cardsMasterList[i]);
                    console.log(this.playerCardDetails);
                }
            }
        }
        else
        {
            this.myCard = this.add.sprite(600, 300, this.playerChosenCard.texture);
            var rand = Math.floor(Math.random()*this.queries.length);
            console.log(this.queries[rand].question);
        
            this.currentQuery = this.add.text(600, 40, this.queries[rand].question, {stroke: '#FFFFFF', strokeThickness: 2});
            this.currentQuery.addColor(this.queries[rand].colour1, this.queries[rand].startColour);
            this.currentQuery.addColor(this.queries[rand].colour2, this.queries[rand].endColour);
            this.currentQuery.addStrokeColor('#000000', this.queries[rand].startColour);
            this.currentQuery.addStrokeColor(this.queries[rand].colour2, this.queries[rand].endColour);
        
            this.yesButton = this.add.text(650, 120, "Yes", {fill: '#009900'});
            this.yesButton.inputEnabled = true;
            this.yesButton.events.onInputDown.add(function()
            {
                this.checkResponse(true, rand);
            }, this);
            this.noButton = this.add.text(750, 120, "No", {fill: '#FF0000'});
            this.noButton.inputEnabled = true;
            this.noButton.events.onInputDown.add(function()
            {
                this.checkResponse(false, rand);
            }, this);
        }
    },
    checkResponse: function(response, rand)
    {
        if(this.error!=undefined)
        {
            this.error.kill();
        }
        var query = this.queries[rand];
        
        for(var j=0, leng=this.allData.types.length; j<leng; j++)
        {
            if(query.type === this.allData.types[j])
            {
                if(query.param === this.playerChosenCard.params[j] && response)
                {
                    this.playerCardDetails[j] = query.param;
                    for(var i=0, len = this.queries.length; i<len; i++)
                    {
                        if(this.queries[i].type === this.allData.types[j])
                        {
                            this.queries.splice(i, 1);
                            i--;
                            len--;
                        }
                    }
                    console.log('elimall');
                    this.endRound();
                }
                else if(query.param != this.playerChosenCard.params[j] && !response)
                {
                    this.queries.splice(rand, 1);
                    console.log('elim1');
                    this.endRound();
                }
                else
                {
                    //display error
                    this.error = this.add.text(620, 200, "Are you sure?", {fill: '#FFFF00', font: '32px Georgia', fontWeight: 'bold'});
                }
            }
        }
    },
    endRound: function()
    {
        this.currentQuery.kill();
        this.yesButton.kill();
        this.noButton.kill();
        this.myCard.kill();
        this.playerQueries.alpha+=1;
        this.playerQueries.forEach(function(q)
        {
            q.inputEnabled=true;
        }, this);
    }
};