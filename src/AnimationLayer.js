var AnimationLayer = cc.Layer.extend({
    space:null,
    sentinel: [],
    scourge: [],

    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
    },
    init:function () {
        this._super();

        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.setVisible(false);
        // Parallax ratio and offset
        this.addChild(this._debugNode, 10);

        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
        this.initSentinel();
        this.initScourge();

        this.scheduleUpdate();
    },

    initSentinel:function() {
        var creepL = new Creep(this.space, g_groundHeight, Team.sentinel, RunnerSide.left);
        this.sentinel.push(creepL);
        this.addChild(creepL.getSpriteSheet());

        var creepR = new Creep(this.space, g_groundHeight, Team.sentinel, RunnerSide.right);
        this.sentinel.push(creepR);
        this.addChild(creepR.getSpriteSheet());
    },

    initScourge:function() {
        var creepL = new Creep(this.space, g_ceilHeight, Team.scourge, RunnerSide.left);
        this.scourge.push(creepL);
        this.addChild(creepL.getSpriteSheet());

        var creepR = new Creep(this.space, g_ceilHeight, Team.scourge, RunnerSide.right);
        this.scourge.push(creepR);
        this.addChild(creepR.getSpriteSheet());
    },

    onExit:function() {
        this._super();
    },

    update:function (dt) {
        for (var key in this.sentinel) {
            var creep = this.sentinel[key];
            if (creep.needTurn()) {
                creep.turn();
            }
        }

        for (var key in this.scourge) {
            var creep = this.scourge[key];
            if (creep.needTurn()) {
                creep.turn();
            }
        }
    }

});