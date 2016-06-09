var BackgroundLayer = cc.Layer.extend({
    map00:null,
    map01:null,
    mapWidth:0,
    mapIndex:0,
    spriteSheet:null,
    objects:[],

    ctor:function () {
        this._super();

        // clean old array here
        this.objects = [];

        this.init();
    },

    init:function () {
        this._super();

        this.map00 = new cc.TMXTiledMap(res.map00_tmx);
        this.addChild(this.map00);

        this.mapWidth = this.map00.getContentSize().width;

        this.map01 = new cc.TMXTiledMap(res.map01_tmx);
        this.map01.setPosition(cc.p(this.mapWidth, 0));
        this.addChild(this.map01);

        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.background_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.background_png);
        this.addChild(this.spriteSheet);
    },
});
