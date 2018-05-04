var GuessWho = GuessWho || {};

GuessWho.StoryState = {
    create: function ()
    {
        this.add.sprite(0, 0, 'main');
        this.add.button(500, 450, 'start', function()
        {
            this.game.state.start('Game');
        }, this);
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/