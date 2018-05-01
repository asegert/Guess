var GuessWho = GuessWho || {};

GuessWho.game = new Phaser.Game(420, 640, Phaser.AUTO);

GuessWho.game.state.add('Boot', GuessWho.BootState); 
GuessWho.game.state.add('Preload', GuessWho.PreloadState); 
GuessWho.game.state.add('Game', GuessWho.GameState);

GuessWho.game.state.start('Boot'); 