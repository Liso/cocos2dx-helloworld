var g_groundHeight = 57;
var g_ceilHeight = 257;
var g_runnerStartX = 500;

var speed = 10;

if(typeof TagOfLayer == "undefined") {
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.Animation = 1;
    TagOfLayer.GameLayer = 2;
    TagOfLayer.Status = 3;
};

// collision type for chipmunk
if(typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.runner = 0;
    SpriteTag.coin = 1;
    SpriteTag.rock = 2;
};

// define enum for runner status
if(typeof RunnerStat == "undefined") {
    var RunnerStat = {};
    RunnerStat.release = 0;
    RunnerStat.goUp = 1;
    RunnerStat.goDown = 2;
};

// define enum for runner side
if(typeof RunnerSide == "undefined") {
    var RunnerSide = {};
    RunnerSide.left = 0;
    RunnerSide.right = 1;
};

// define enum for runner team
if(typeof Team == "undefined") {
    var Team = {};
    Team.sentinel = 0;
    Team.scourge = 1;
};