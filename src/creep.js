
var Creep = cc.Class.extend({
    space:null,
    spriteSheet: null,
    runningAction: null,
    sprite: null,
    body:null,
    shape:null,
    team:null,
    side:null,

    stat:RunnerStat.release,// init with running status

    /** Constructor
     * @param {cp.Space *}
     * @param {initialY *}
     * @param {team *}
     * @param {side *}
     */
    ctor:function (space, initialY, team, side) {
        this.space = space;
        this.team = team;
        this.side = side;
        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.runner_png);
        
        //init  actions
        this.initAction();

        this.sprite = new cc.PhysicsSprite("#runner0.png");
        var contentSize = this.sprite.getContentSize();
        // init body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p(g_runnerStartX, initialY + contentSize.height / 2);
        this.setInitImpulse();//run speed
        this.space.addBody(this.body);
        //init shape
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
        this.space.addShape(this.shape);

        this.sprite.setBody(this.body);
        this.sprite.runAction(this.runningAction);

        this.spriteSheet.addChild(this.sprite);
    },
    
    initAction:function () {
        // init runningAction
        var animFrames = [];
        // num equal to spriteSheet
        for (var i = 0; i < 8; i++) {
            var str = "runner" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
        this.runningAction.retain();
    },

    setInitImpulse:function () {
        if (this.side == RunnerSide.left) {
            this.body.applyImpulse(cp.v(-speed, 0), cp.v(0, 0));
        } else if (this.side == RunnerSide.right) {
            this.body.applyImpulse(cp.v(speed, 0), cp.v(0, 0));
        }
    },

    getSpriteSheet:function () {
        return this.spriteSheet;
    },

    needTurn:function() {
        if (this.stat == RunnerStat.release) {
            if (this.side == RunnerSide.left) {
                return this.sprite.getPositionX() < g_runnerStartX - 100;
            } else if (this.side == RunnerSide.right) {
                return this.sprite.getPositionX() > g_runnerStartX + 100;
            }
        }
        return false;
    },

    turn:function() {
        if (this.team == Team.sentinel && this.side == RunnerSide.left) {
            this.body.applyImpulse(cp.v(speed, speed), cp.v(0, 0));
            this.stat = RunnerStat.goUp;
        } else if (this.team == Team.sentinel && this.side == RunnerSide.right) {
            this.body.applyImpulse(cp.v(-speed, speed), cp.v(0, 0));
            this.stat = RunnerStat.goUp;
        } else if (this.team == Team.scourge && this.side == RunnerSide.left) {
            this.body.applyImpulse(cp.v(speed, -speed), cp.v(0, 0));
            this.stat = RunnerStat.goDown;
        } else if (this.team == Team.scourge && this.side == RunnerSide.right) {
            this.body.applyImpulse(cp.v(-speed, -speed), cp.v(0, 0));
            this.stat = RunnerStat.goDown;
        }
    }
});