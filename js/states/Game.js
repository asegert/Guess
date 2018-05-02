//Sets up game and handles all Opponent functions
var GuessWho = GuessWho || {};

GuessWho.GameState = {

  create: function() 
  {   
      //Stores all data from JSON file
      this.allData = JSON.parse(this.game.cache.getText('guessData'));
      
      this.boardCards = new Array();
      
      var cards = this.shuffle(this.allData.cards);
      
      for(var i=0, len=cards.length; i<len; i++)
      {
          var card = new GuessWho.Card(this);
          var y = Math.floor(i/5);
          var x = i - (5*y);
          this.boardCards[this.boardCards.length] = card.init(cards[i].texture, cards[i].colour, cards[i].type, x * 100, y * 100);
      }
      
      this.chosenCard = this.boardCards[Math.floor(Math.random()*this.boardCards.length)];
      
      for(var i=0, len=this.allData.queries.length; i<len; i++)
      {
          var query = this.add.text(550, i * 40, this.allData.queries[i].question);
          query.data = this.allData.queries[i];
          query.inputEnabled=true;
          query.addColor(this.allData.queries[i].colour1, this.allData.queries[i].startColour);
          query.addColor(this.allData.queries[i].colour2, this.allData.queries[i].endColour);
          query.events.onInputDown.add(function()
          {
              this.alpha = 0.1;
              GuessWho.GameState.removeCards(this.data);
          }, query);
      }
    },
    removeCards: function(query)
    {
        if(query.type === 'colour')
        {
            if(query.param != this.chosenCard.colour)
            {
                for(var i=0, len = this.boardCards.length; i<len; i++)
                {
                    if(query.param === this.boardCards[i].colour)
                    {
                        this.boardCards[i].sprite.alpha = 0;
                        this.boardCards.splice(i, 1);
                        i--;
                        len--;
                    }
                }
            }
        }
        else if(query.type === 'type')
        {
            if(query.param != this.chosenCard.type)
            {
                for(var i=0, len = this.boardCards.length; i<len; i++)
                {
                    if(query.param === this.boardCards[i].type)
                    {
                        this.boardCards[i].sprite.alpha = 0;
                        this.boardCards.splice(i, 1);
                        i--;
                        len--;
                    }
                }
            }
        }
        if(this.boardCards.length === 1)
        {
            console.log('go');
        }
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
    }
     /* //Stores only the query elements which contain questions, answers, if question has been asked, type of data (i.e. color) and specific param (i.e. pink)
      this.queryData = this.allData.queries;
      //Stores only the limit (card) elements and their variables
      this.limitData = this.allData.limits;
      
      //Initialize game board
      this.board = new GuessWho.Board(this);
      
      //Chooses a random card for the player to guess
      this.guessie = this.limitData[Math.floor(Math.random() * 32)];
  },
  create: function()
  {
      //groups to allow elements to be displayed on screen
      this.backgroundTiles = this.add.group();
      this.faceElements = this.add.group();
      this.player = this.add.group();
      this.opponent = this.add.group();
      this.ender = this.add.group();
   
      //Initialize queries to contain all questions
      this.queries = [];
      for(var i=0; i<this.queryData.length; i++)
      {
          this.queries[i] = this.queryData[i].question;
      }
   
      //Object to hold all discoveries made about the player's card, initially set to null
      this.guesstimate = {
        "param1": null,
        "param2": null,
        "param3": null
      };
   
      //Keeps track of the current Query position in queryData
      this.currQuery = -1;
      //Array to hold all card types (i.e. color) that have found a positive value so as to avoid asking redundant questions and appear 'smart'
      this.types = [null];
      //Boolean to check if game is over
      this.isOver = false;
      //Checks if next turn should be a guess
      this.nextGuess = false;
      
      //Initialize Board functionality
      this.board.init();
   
      //Resets card for player to guess if it is not on the game board for them to guess
      while(!this.guessie.onBoard)
      {
          this.guessie = this.limitData[Math.floor(Math.random() * 33)];
      }
      
      //Call to initialize player label
      this.initPlayer();
  },
  //Initializes player label
  initPlayer: function()
  {
      var style = {
      font: '16px Arial',
      fill: '#fff',
      align: 'left'
      };
      
      //Text for player card, added once player selects a card
      this.playerLabel = this.add.text(10, 420, ' ', style);
      //Text where questions will be posed to player
      this.queryLabel = this.add.text(10, 420, ' ', style);
      //Text displayed on player console/panel to inform player of next moves in game play
      this.consolLabel = this.add.text(120, 370, 'Please Choose Your Card', style);
  },
  //Reloads player label after a player card is chosen
  reloadPlayer: function()
  {
      var style2 = {
      font: '16px Arial',
      fill: '#fff',
      align: 'center'
      };
      
      //Destroys the labels so new text can be added
      this.playerLabel.kill();
      this.consolLabel.kill();
      
      var style = {
      font: '16px Arial',
      fill: '#fff',
      align: 'left'
      };
      
      //Player label and console label are recreated with new meaningful values
      this.playerLabel = this.add.text(25, 420, 'Your Card', style);
      this.consolLabel = this.add.text(70, 370, 'Ask a Question about Your Opponent\'s \n Card By Selecting a Button', style2);
      
      //Call to load the buttons for the game
      this.loadButtons();
  },
  //Loads buttons on game board
  loadButtons: function()
  {   
      //Buttons to allow player to 'ask' questions
      this.B0 = this.add.button(this.world.centerX - 90, this.world.centerX + 220, 'red', null, this, 2, 1, 0);
      this.B1 = this.add.button(this.world.centerX - 30, this.world.centerX + 220, 'burgundy', null, this, 2, 1, 0);
      this.B2 = this.add.button(this.world.centerX + 30, this.world.centerX + 220, 'orange', null, this, 2, 1, 0);
      this.B3 = this.add.button(this.world.centerX + 90, this.world.centerX + 220, 'yellow', null, this, 2, 1, 0);
      this.B4 = this.add.button(this.world.centerX + 150, this.world.centerX + 220, 'green', null, this, 2, 1, 0);
      this.B5 = this.add.button(this.world.centerX - 90, this.world.centerX + 280, 'blue', null, this, 2, 1, 0);
      this.B6 = this.add.button(this.world.centerX - 30, this.world.centerX + 280, 'purple', null, this, 2, 1, 0);
      this.B7 = this.add.button(this.world.centerX + 30, this.world.centerX + 280, 'pink', null, this, 2, 1, 0);
      this.B8 = this.add.button(this.world.centerX + 90, this.world.centerX + 280, 'grey', null, this, 2, 1, 0);
      this.B9 = this.add.button(this.world.centerX + 150, this.world.centerX + 280, 'brown', null, this, 2, 1, 0);
      this.B10 = this.add.button(this.world.centerX - 90, this.world.centerX + 340, 'white', null, this, 2, 1, 0);
      
      this.B11 = this.add.button(this.world.centerX - 30, this.world.centerX + 340, 'corners', null, this, 2, 1, 0);
      this.B12 = this.add.button(this.world.centerX + 30, this.world.centerX + 340, 'circle', null, this, 2, 1, 0);
      this.B13 = this.add.button(this.world.centerX + 90, this.world.centerX + 340, 'blank', null, this, 2, 1, 0);
      
      //Guess Button to allow player to make a guess
      this.guessButton = this.add.button(this.world.centerX + 130, this.world.centerX + 100, 'guess', null, this, 2, 1, 0);
      
      //Buttons so player can 'answer' questions about player card
      this.acceptButton = this.add.button(this.world.centerX - 110, this.world.centerX, 'accept', null, this, 2, 1, 0);
      
      this.rejectButton = this.add.button(this.world.centerX + 70, this.world.centerX, 'reject', null, this, 2, 1, 0);
      
      //Not visible as no question has been wagered yet
      this.acceptButton.visible = false;
      this.rejectButton.visible = false;
      
      //Onclick flip the tiles that have 'faces'/cards matching the condition being checked by the button, also ajust alpha property to indicate button has been clicked
      this.B0.events.onInputDown.add(function(){
          this.board.flip("red");
          this.B0.alpha = 0.2;
      }, this);
      this.B1.events.onInputDown.add(function(){
          this.board.flip("burgundy");
          this.B1.alpha = 0.2;
      }, this);
      this.B2.events.onInputDown.add(function(){
          this.board.flip("orange");
          this.B2.alpha = 0.2;
      }, this);
      this.B3.events.onInputDown.add(function(){
          this.board.flip("yellow");
          this.B3.alpha = 0.2;
      }, this);
      this.B4.events.onInputDown.add(function(){
          this.board.flip("green");
          this.B4.alpha = 0.2;
      }, this);
      this.B5.events.onInputDown.add(function(){
          this.board.flip("blue");
          this.B5.alpha = 0.2;
      }, this);
      this.B6.events.onInputDown.add(function(){
          this.board.flip("purple");
          this.B6.alpha = 0.2;
      }, this);
      this.B7.events.onInputDown.add(function(){
          this.board.flip("pink");
          this.B7.alpha = 0.2;
      }, this);
      this.B8.events.onInputDown.add(function(){
          this.board.flip("grey");
          this.B8.alpha = 0.2;
      }, this);
      this.B9.events.onInputDown.add(function(){
          this.board.flip("brown");
          this.B9.alpha = 0.2;
      }, this);
      this.B10.events.onInputDown.add(function(){
          this.board.flip("white");
          this.B10.alpha = 0.2;
      }, this);
      this.B11.events.onInputDown.add(function(){
          this.board.flip("param3");
          this.B11.alpha = 0.2;
      }, this);
      this.B12.events.onInputDown.add(function(){
          this.board.flip("param2");
          this.B12.alpha = 0.2;
      }, this);
      this.B13.events.onInputDown.add(function(){
          this.board.flip("blank");
          this.B13.alpha = 0.2;
      }, this);
      
      //Onclick allow guessing and adjust alpha to indicate button was pushed
      this.guessButton.events.onInputDown.add(function(){
          this.board.isGuessing = true;
          this.guessButton.alpha = 0.2;
      }, this);
      
      //Onclick check if player selected correctly based on player card
      this.acceptButton.events.onInputDown.add(function(){
          this.checkQuery(true);
      }, this);
      this.rejectButton.events.onInputDown.add(function(){
          this.checkQuery(false);
      }, this);
      
  },
  //Begins running opponent functions and screen
  OpponentRun: function()
  {
      //Is a guess is ready end the game, otherwise continue
      if(this.nextGuess)
      {
          this.gameOver(false);
      }
      else 
      {
        //Create and set screen to show opponent query
        this.opp = new Phaser.Sprite(this.game, (0), (0), 'panel');
        this.opp.scale.setTo(this.game.width, 6);
        this.opp.alpha = 0.7;
        this.opponent.add(this.opp);
      
        //Adjust alpha to mute color so focus can be on query
        this.guessButton.alpha = 0.7;
      
        //Make the buttons visible so player can 'answer' query
        this.acceptButton.visible = true;
        this.rejectButton.visible = true;
      
        //Call to complete logic to ask query
        this.opponentLogic();
      }
  },
  //Chooses which query to ask
  opponentLogic: function()
  {
      //Kill current query label
      this.queryLabel.kill();
      
      //Gets a random value within the size of the number of queries to be asked
      var rand = [Math.floor(Math.random() * this.queries.length)];
      
      //Catches incorrect random values so if by a fluke it is too high it is randomly reset until there is a usable value
      while(rand<0 || rand > this.queries.length)
      {
          rand = [Math.floor(Math.random() * this.queries.length)];
      }
      
      //Iterates through queryData to get the index of teh currentQuery
      for(var i=0; i< this.queryData.length; i++)
      {
          if(this.queryData[i].question === this.queries[rand])
          {
              this.currQuery=i;
              break;
          }
      }
      
      var style2 = {
      font: '16px Arial',
      fill: '#fff',
      align: 'center',
      };
      
      //Set the asked value of the current query to true as it is currently being asked
      this.queryData[this.currQuery].asked = true;
      //Set the query label with the new query
      this.queryLabel = this.add.text(150, 150, this.queries[rand], style2);
  },
  //Checks if player answered query correctly, responds accordingly, and makes input adjustments
  checkQuery: function(condition)
  {
      //Checks that a valid query is being checked
      if(this.currQuery == -1)
      {
          console.log("error");
      }
      else
      {
          //condition is either true or false based on which button was selected (accept/reject)
          if(condition === this.queryData[this.currQuery].answer)
          {
              //Condition is only true if new information is learned (i.e. is color blue) 
              if(condition)
              {
                  //Checks condition and makes assumptions based on the truths found
                  this.smartCheck(this.queryData[this.currQuery].type, this.queryData[this.currQuery].param);
              }
              if(!this.isOver)
              {
                  //Reset query and console to allow player turn
                  this.queryLabel.kill();
                  this.consolLabel.kill();
              
                  var style2 = {
                  font: '16px Arial',
                  fill: '#fff',
                  align: 'center',
                  };
      
                  this.queryLabel = this.add.text(150, 150, ' ', style2);
                  this.consolLabel = this.add.text(70, 370, 'Ask a Question about Your Opponent\'s \n Card By Selecting a Button', style2);
              
                  //Remove query/opponent settings
                  this.opp.alpha = 0;
                  this.guessButton.alpha = 1;
                  this.acceptButton.visible = false;
                  this.rejectButton.visible = false;
                  
                  //Allow player to provide input again
                  this.B0.inputEnabled = true;
                  this.B1.inputEnabled = true;
                  this.B2.inputEnabled = true;
                  this.B3.inputEnabled = true;
                  this.B4.inputEnabled = true;
                  this.B5.inputEnabled = true;
                  this.B6.inputEnabled = true;
                  this.B7.inputEnabled = true;
                  this.B8.inputEnabled = true;
                  this.B9.inputEnabled = true;
                  this.B10.inputEnabled = true;
                  this.B11.inputEnabled = true;
                  this.B12.inputEnabled = true;
                  this.B13.inputEnabled = true;
                  this.guessButton.inputEnabled = true;
                  
                  //Temporary placeholders
                  var temp = [];
                  var curr = 0;
              
                  //Gives any queries sharing type an asked value
                  //If I know the color is blue I don't need to ask if the card is red so all queries of type color have already been answered
                  for(var i=0; i<this.queryData.length; i++)
                  {
                     if(this.queryData[i].type===this.queryData[this.currQuery].type && this.queryData[this.currQuery].answer)
                    {
                        this.queryData[i].asked = true;
                    }
                  }
                  
                  //All questions that have not been asked should be added to the list of next potential queries
                  for(var i=0; i<this.queryData.length; i++)
                  {    
                    if(!this.queryData[i].asked)
                    {
                        temp[curr] = this.queryData[i].question;
                        curr++;
                    }
                  }
                  this.queries = temp;
                  
                  //Check if for some reason no queries are added and the game cannot end reset the queries and re-ask
                  if(this.queries.length === 0)
                  {
                      for(var i=0; i<this.queryData.length; i++)
                      {
                          this.queries[i]=this.queryData[i].question;
                      }
                  }    
              }
          }
          else
          {
              //If the condition does not match the answer the player provided false information when answering the question and is notified so that can be remedied
              this.consolLabel.kill();
              
              var style2 = {
              font: '16px Arial',
              fill: '#fff',
              align: 'center',
              };
      
              this.consolLabel = this.add.text(70, 370, 'Are you sure????? Try Again.', style2);
          }
      }
  },
  //Check to see if enough information has been gathered to infer the player card
  //Information is only passed here if it is true
  smartCheck: function(type, param)
  {
      //Check the type of information and adjust corresponding attributes in the guesstimate
      if(type === "colour")
      {
          this.guesstimate.param1 = param;
      }
      else if(param === "square")
      {
          this.guesstimate.param3 = true;
          this.guesstimate.param2 = false;
      }
      else if(param === "param2")
      {
          this.guesstimate.param2 = true;
          this.guesstimate.param3 = false;
      }
      else if(param === "blank")
      {
          this.guesstimate.param3 = false;
          this.guesstimate.param2 = false;
      }
      
      //Checks that all pieces of information are known
      if(this.guesstimate.param1!=null && this.guesstimate.param2!=null && this.guesstimate.param3!=null)
      {
          for(var i=0; i<this.limitData.length; i++)
          {
              //Checks if the guesstimate matches with any of the cards
              if(this.limitData[i].param1 === this.guesstimate.param1 && this.limitData[i].param2 === this.guesstimate.param2 && this.limitData[i].param3 === this.guesstimate.param3)
              {
                  //If a match is found the game ends and gameOver is called
                  this.guesser = this.limitData[i];
                  this.nextGuess = true;
                  return true;
              }
          }
      }
      return false;
  },
  //Ends the game
  //playerCall is true if the player called the function therefore the player should win, otherwise the opponent should win
  gameOver: function(playerCall)
  {   
      if(playerCall)
      {
          //Player wins
          //Player winning logic is done on board in the choose function
          var msg = 'The Card is...';
           var card = this.guessie.asset;
              
           console.log("player winner");
      }
      else
      {
          var playerCard;
      
          //Check that the player card and opponent guess have matching assets then store the data in temporary variable
          for(var i=0; i<this.limitData.length; i++)
          {
              if(this.player.children[0].key === this.limitData[i].asset)
              {
                  playerCard = this.limitData[i];
              }
          }
          
          //Final check that the types match and opponent wins
          if(this.guesser.type === playerCard.type)
          {
              var msg = 'Your Card is...';
              var card = this.guesser.asset;
              
              console.log("game winner");
          }
      }
      
      //Use opponent screen to end game by blacking out the board
      this.opp = new Phaser.Sprite(this.game, (0), (0), 'panel');
      this.opp.scale.setTo(this.game.width, 6);
      this.opp.alpha = 0.7;
      this.opponent.add(this.opp);
      
      //Remove all buttons from visibility
      this.guessButton.kill();
      this.B0.alpha = 0;
      this.B1.alpha = 0;
      this.B2.alpha = 0;
      this.B3.alpha = 0;
      this.B4.alpha = 0;
      this.B5.alpha = 0;
      this.B6.alpha = 0;
      this.B7.alpha = 0;
      this.B8.alpha = 0;
      this.B9.alpha = 0;
      this.B10.alpha = 0;
      this.B11.alpha = 0;
      this.B12.alpha = 0;
      this.B13.alpha = 0;
      this.acceptButton.alpha = 0;
      this.rejectButton.alpha = 0;
    
      //Remove all other text
      this.playerLabel.kill();
      this.consolLabel.kill();
      this.queryLabel.kill();
              
      var style2 = {
      font: '16px Arial',
      fill: '#fff',
      align: 'center',
      };
      
      //Darken player card
      this.player.children[0].alpha = 0.5;
       
      //Display pertinent message (i.e. you win!)
      this.queryLabel = this.add.text(150, 50, msg, style2);
      
      //Display the guessed card
      //player card if opponent won, opponent card if player won
      this.endCard = new Phaser.Sprite(this.game, (100), (100), card);
      this.endCard.scale.setTo(6, 6);
      this.ender.add(this.endCard);
       
      //Boolean for game is over
      this.isOver = true;
  },
   //Disables button input
  disableButtons: function()
  {
      //Do not allow input for any other buttons so player cannot ignore opponent queries and cause collisions between queries resulting in error
        this.B0.inputEnabled = false;
        this.B1.inputEnabled = false;
        this.B2.inputEnabled = false;
        this.B3.inputEnabled = false;
        this.B4.inputEnabled = false;
        this.B5.inputEnabled = false;
        this.B6.inputEnabled = false;
        this.B7.inputEnabled = false;
        this.B8.inputEnabled = false;
        this.B9.inputEnabled = false;
        this.B10.inputEnabled = false;
        this.B11.inputEnabled = false;
        this.B12.inputEnabled = false;
        this.B13.inputEnabled = false;
        this.guessButton.inputEnabled = false;
  },
  //Ends player turn and displays a message conveying who's turn it is, timer allows it to be read before more action is taken
  opponentTurnRefresh: function()
  {
      this.consolLabel.kill();
        
      var style2 = {
      font: '16px Arial',
      fill: '#fff',
      align: 'center'
      };
        
      this.consolLabel = this.add.text(120, 370, "Opponent\'s Turn", style2);
      this.OpponentRun();
  }*/
};