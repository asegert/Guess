//Sets up board and handles all Player functions
var GuessWho = GuessWho || {};


GuessWho.Board = function(state) {

    this.state = state;
    this.game = state.game; 
    this.tileSize = 60;
    this.limitData = state.limitData;
    this.shuffleDataArr;
    //Checks if player card is chosen yet
    this.isChosen = false;
    //Will store player card
    this.myPlayer;
    //Checks if player is guessing opponent card
    this.isGuessing = false;
  
    GuessWho.Board.prototype.init = function()
    {
        //Temporary placeholders
        var i, j, tile;
        this.shuffleDataArr = this.shuffleData();
        var currTile = 0;
        
        //Checks through all rows/col of board and assigns each space a tile
        for(i = 0; i < 10; i++) 
        {
            for(j = 0; j < 7; j++) 
            {
                //If in positions that will not be game board or player console/panel set to main board (table) tile
                if(i == 5 || (j==0 && i<6) || (j==6 && i<6))
                {
                    tile = new Phaser.Sprite(this.game, j * this.tileSize, i * this.tileSize, 'board');
                    
                    //Store tile position
                    tile.data = {row: i, col: j};
                    
                    //Add to background
                    this.state.backgroundTiles.add(tile);

                    //Do not allow input as it is not a card
                    tile.inputEnabled = false;
                }
                else if(i<6)
                {
                    //If position is on game board give it front facing cards
                    tile = new Phaser.Sprite(this.game, j * this.tileSize, i * this.tileSize, 'front');
                    
                    //Initialize the card face or image
                    tile.data = this.limitData[this.initFace(i, j, currTile)];
                    currTile ++;
                    //Populate this tile with it's face
                    this.populateOptions(tile);
                    
                    //Add to background
                    this.state.backgroundTiles.add(tile);

                    //Allow input and when clicked call choose
                    tile.inputEnabled = true;
                    tile.events.onInputDown.add(function(tile)
                    {
                        this.choose(tile);
                    }, this);
                }
                else
                {
                    //If on bottom of screen set to panel/console tile
                    tile = new Phaser.Sprite(this.game, j * this.tileSize, i * this.tileSize, 'panel');
                    
                    //Store tile position
                    tile.data = {row: i, col: j};
                    
                    //Add to backgroud
                    this.state.backgroundTiles.add(tile);

                    //Do not allow input as it is not a card
                    tile.inputEnabled = false;
                }
            }
        }
    };
    
    
    //Initializes Card faces
    GuessWho.Board.prototype.initFace = function(x, y, tile)
    {   
        var tile = tile;
        
        //Chooses a card based on mixed up data values
        var cardData = this.limitData[this.shuffleDataArr[tile]];
        
        //Sets position values for the face
        cardData.board = this;

        cardData.row = x;
        cardData.col = y;

        //return the face
        return this.shuffleDataArr[tile];
    };
    //Displays faces on board
    GuessWho.Board.prototype.populateOptions = function(tile)
    {
        //Create the face
        var face = new Phaser.Sprite(this.game, (tile.data.col * this.tileSize + 12), (tile.data.row * this.tileSize + 5), tile.data.asset);
        
        //Set value that the tile is seen
        tile.data.onBoard = true;
        
        //Add to Board
        this.state.faceElements.add(face);
    };
    //Shuffle the indexes
    GuessWho.Board.prototype.shuffleData = function()
    {
        //Temporary placeholders
        var len = this.limitData.length;
        var ret = [];
        //Note: this is a clone of limitData, without cloning all values of limitData become null
        var tem = Object.assign({}, this.limitData);
        var currIndex = 0;
        
        for(var i=0; i<len; i++)
        {
            //Chooses a random position in the list of cards
            var rand = Math.floor(Math.random() * (len-1));
            
            //When a card is used it is set to null
            //If the card at this random spot has been used and the random is within range increment to check next spot
            while(tem[rand]===null && rand < len)
            {
                rand++;
            }
            //If random value is too high reset to bottom
            if(rand >= len)
            {
                rand =0;
            }
            //Check again from bottom
            while(tem[rand]===null && rand < len)
            {
                rand++;
            }
            
            //Once found place in return array the type as type is the number digit corresponding to the limitData array
            ret[currIndex] = tem[rand].type;
            //Remove the used card
            tem[rand] = null;
            //Increment index so no overriding occurs 
            currIndex++;
        }
        //Return array of shuffled indexes
        return ret;
    };
    
    GuessWho.Board.prototype.choose = function(tile)
    {
        //If the player has yet to choose a card
        if(!this.isChosen)
        {
            //The passed tile becomes the player card and is displayed
            this.myPlayer = new Phaser.Sprite(this.game, (10), (450), tile.data.asset);
            this.myPlayer.scale.setTo(2.8, 2.8);
            
            this.isChosen = true;
            
            this.state.player.add(this.myPlayer);
            this.state.reloadPlayer();
            
            //Set queryData with specifics for this card for later comparison as opponent tries to guess the card
            if(tile.data.param1==='red')
            {
                this.state.queryData[0].answer=true;
            }
            else if(tile.data.param1==='burgundy')
            {
                this.state.queryData[1].answer=true;
            }
            else if(tile.data.param1==='orange')
            {
                this.state.queryData[2].answer=true;
            }
            else if(tile.data.param1==='yellow')
            {
                this.state.queryData[3].answer=true;
            }
            else if(tile.data.param1==='green')
            {
                this.state.queryData[4].answer=true;
            }
            else if(tile.data.param1==='blue')
            {
                this.state.queryData[5].answer=true;
            }
            else if(tile.data.param1==='purple')
            {
                this.state.queryData[6].answer=true;
            }
            else if(tile.data.param1==='pink')
            {
                this.state.queryData[7].answer=true;
            }
            else if(tile.data.param1==='grey')
            {
                this.state.queryData[8].answer=true;
            }
            else if(tile.data.param1==='brown')
            {
                this.state.queryData[9].answer=true;
            }
            else if(tile.data.param1==='white')
            {
                this.state.queryData[10].answer=true;
            }
            if(tile.data.param3)
            {
                this.state.queryData[11].answer=true;
            }
            if(tile.data.param2)
            {
                this.state.queryData[12].answer=true;
            }
            if(!tile.data.param3 && !tile.data.param2)
            {
                this.state.queryData[13].answer=true;
            }
        }
        //If a card is chosen, but the player is guessing the opponent's card
        else if(this.isGuessing)
        {
            if(tile.data.type === this.state.guessie.type)
            {
                //If correct end game with player as winner
                this.state.gameOver(true);
                //No longer guessing
                this.isGuessing = false;
            }
            else
            {
                //If incorrect alert player and continue game
                console.log("try Again");
                this.state.guessButton.alpha = 1;
                //No longer guessing
                this.isGuessing = false;
                //Opponent's turn
                this.opponentTurn("Wrong Guess", 0);
            }
        }
    };
    //Used to flip cards that do not match opponent specs
    GuessWho.Board.prototype.flip = function(limit)
    {
        var msg = '';
            
        //Check that real value is passed as buttons call this with null values initially
        if(limit != null)
        {
           //Check that the opponent card has the attribute
           //If it has that attribute it will be true
           //If not a flip is required as they do not match what is being looked for
           var check = this.check(limit);

           //Not part of the card being searched for
           if(!check)
           {
                //Set a message for player based on what has been 'learned'
                if(limit == "param3")
                {
                    msg="Your Opponent\'s Card does not have corners";
                }
                else if(limit == "param2")
                {
                    msg="Your Opponent\'s Card does not have a circle";
                }
                else
                {
                    msg="Your Opponent\'s Card is not "+limit;
                }
                //Search for the card to remove
                for(var i = 0; i<this.limitData.length; i++)
                {
                    if(this.limitData[i].onBoard)
                    {
                        if(limit=="param3")
                        {
                            if(this.limitData[i].param3 === true)
                            {
                                //remove the face based on matching information from limitData, then remove the card
                                this.killFace(this.limitData[i]);
                                this.killCard(this.limitData[i]);
                            }
                        }
                        else if(limit=="param2")
                        {
                            if(this.limitData[i].param2 === true)
                            {
                                //remove the face based on matching information from limitData, then remove the card
                                this.killFace(this.limitData[i]);
                                this.killCard(this.limitData[i]);
                            }
                        }
                        else if(limit=="blank")
                        {
                            if(this.limitData[i].param3 === false && this.limitData[i].param2 === false)
                            {
                                //remove the face based on matching information from limitData, then remove the card
                                this.killFace(this.limitData[i]);
                                this.killCard(this.limitData[i]);
                            }
                        }
                        else
                        {
                            if(this.limitData[i].param1 === limit)
                            {
                                //remove the face based on matching information from limitData, then remove the card
                                this.killFace(this.limitData[i]);
                                this.killCard(this.limitData[i]);
                            }
                        }
                    }
                }
            }
            //The selection is on the opponent card
            else
            {
                //Message to convey information to player
                if(limit == "param3")
                {
                    msg="Your Opponent\'s Card has corners";
                    
                    //Any card without corners is removed
                    for(var i=0; i<this.limitData.length; i++)
                    {
                        if(this.limitData[i].param2 || (!this.limitData[i].param3 && !this.limitData[i].param2))
                        {
                            this.killFace(this.limitData[i]);
                            this.killCard(this.limitData[i]);
                        }
                    }
                }
                else if(limit == "param2")
                {
                    msg="Your Opponent\'s Card has a circle";
                    
                    //Any card without a circle is removed
                    for(i=0; i<this.limitData.length; i++)
                    {
                        if(this.limitData[i].param3 || (!this.limitData[i].param3 && !this.limitData[i].param2))
                        {
                            this.killFace(this.limitData[i]);
                            this.killCard(this.limitData[i]);
                        }
                    }
                }
                else
                {
                    msg="Your Opponent\'s Card is "+limit;
                    
                    if(limit == "blank")
                    {
                        //Any card that is not blank is removed
                        for(i=0; i<this.limitData.length; i++)
                        {
                            if(this.limitData[i].param2 || this.limitData[i].param3)
                            {
                                this.killFace(this.limitData[i]);
                                this.killCard(this.limitData[i]);
                            }
                        }
                    }
                    //limit is a color
                    else
                    {
                        //Any card without corners is removed
                    for(i=0; i<this.limitData.length; i++)
                    {
                        if(this.limitData[i].param1 != limit)
                        {
                            this.killFace(this.limitData[i]);
                            this.killCard(this.limitData[i]);
                        }
                    }
                    }
                }
            }
            //show message
            this.opponentTurn(msg, 0);
        }
    };
    //Removes the 'card face'
    GuessWho.Board.prototype.killFace = function(data)
    {
        for(var i=0; i<this.state.faceElements.length; i++)
        {
            //Find a match to card passed in and remove from the board
            if(this.state.faceElements.children[i].key==data.asset)
            {
                this.state.faceElements.children[i].kill();
            }
        }
    };
    //Removes the card backing and replaced it with cardback image
    GuessWho.Board.prototype.killCard = function(data)
    {
        for(var i=0; i<this.state.backgroundTiles.length; i++)
        {
            if(this.state.backgroundTiles.children[i].data)
            {
                //If passed card position matches the current card position change the texture
                if(this.state.backgroundTiles.children[i].data.col==data.col && this.state.backgroundTiles.children[i].data.row==data.row)
                {
                    this.state.backgroundTiles.children[i].loadTexture('back');
                }
            }
        }
    };
    //Check that the opponent card has the attribute
    //If it has that attribute it will be true
    //If not a flip is required as they do not match what is being looked for
    GuessWho.Board.prototype.check = function(limit)
    {
        //Stores opponent card
        var checker = this.state.guessie;
        
        //If information being searched for is on opponent card return true
        if(limit==="param3")
        {
            if(checker.param3)
            {
                return true;
            }
        }
        else if(limit==="param2")
        {
            if(checker.param2)
            {
                return true;
            }
        }
        else if(limit==="blank")
        {
            if(!checker.param3 && !checker.param2)
            {
                return true;
            }
        }
        else if(limit===checker.param1)
        {
            return true;
        }
        //If information is not on opponent card return false
        return false;
    };
    //Ends player turn and displays a message conveying results of player question, timer allows it to be read before flipping
    GuessWho.Board.prototype.opponentTurn = function(msg, round)
    {
        this.state.disableButtons();
        
        this.state.consolLabel.kill();
        
        var style2 = {
        font: '16px Arial',
        fill: '#fff',
        align: 'center'
        };
        
        this.state.consolLabel = this.state.add.text(120, 370, msg, style2);
        this.state.time.events.add(Phaser.Timer.SECOND * 2, this.state.opponentTurnRefresh, this.state);
    };
};

GuessWho.Board.prototype = Object.create(Phaser.Sprite.prototype);
GuessWho.Board.prototype.constructor = GuessWho.Unit;