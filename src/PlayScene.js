
var PlayScene = cc.Scene.extend({
    space:null,
    shapesToRemove:[],
    gameLayer:null,

    // init space of chipmunk
    initPhysics:function() {
        this.space = new cp.Space();
        // Gravity
        this.space.gravity = cp.v(0, 0);
        // set up Walls
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, g_groundHeight),// start point
            cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
            0);// thickness of wall
        var wallTop = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, g_ceilHeight),// start point
            cp.v(4294967295, g_ceilHeight),// MAX INT:4294967295
            0);// thickness of wall
        this.space.addStaticShape(wallBottom);
        this.space.addStaticShape(wallTop);

        // setup chipmunk CollisionHandler
        this.space.addCollisionHandler(SpriteTag.creep, SpriteTag.creep,
            this.collisionCreepBegin.bind(this), null, null, null);
    },

    onEnter:function () {
        this._super();
        this.initPhysics();

        this.gameLayer = new cc.Layer();

        //add three layer in the right order
        this.gameLayer.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
        this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
        this.addChild(this.gameLayer);
        this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

        //add background music
        // cc.audioEngine.playMusic(res.background_mp3, true);
        this.scheduleUpdate();
    },

    collisionCreepBegin:function (arbiter, space) {
        var shapes = arbiter.getShapes();
        // shapes[0] is runner
        this.shapesToRemove.push(shapes[0]);
        this.shapesToRemove.push(shapes[1]);

        var statusLayer = this.getChildByTag(TagOfLayer.Status);
        statusLayer.addCoin(1);
        return true;
    },

    update:function (dt) {
        // chipmunk step
        this.space.step(dt);

        // Simulation cpSpaceAddPostStepCallback
        for(var i = 0; i < this.shapesToRemove.length; i++) {
            var shape = this.shapesToRemove[i];
            this.gameLayer.getChildByTag(TagOfLayer.Animation).removeObjectByShape(shape);
        }
        this.shapesToRemove = []
    }
});