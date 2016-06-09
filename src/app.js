
var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
    },
    init:function(){
        //call super class's super function
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label

        //3. calculate the center point
        var centerpos = cc.p(size.width / 2, size.height / 2);

        //4. create a background image and set it's position at the center of the screen
        var spritebg = new cc.Sprite(res.helloBG_png);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);

        //5.
        cc.MenuItemFont.setFontSize(60);

        var startPng = new cc.Sprite(res.start_n_png);

        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay= new cc.MenuItemSprite(
        	new cc.Sprite(res.start_n_png), // normal state image
        	new cc.Sprite(res.start_s_png), //select state image
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);  //7. create the menu
        menu.setPosition(centerpos);
        this.addChild(menu);
    },

    onPlay : function(){
        cc.log("==onplay clicked");
        cc.director.runScene(new PlayScene());
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        layer.init();
        this.addChild(layer);
    }
});

