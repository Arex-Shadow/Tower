// 程序入口
var Tower;
(function (Tower) {
    var Stage = Laya.Stage;
    var Browser = Laya.Browser;
    var WebGL = Laya.WebGL;
    var Stat = Laya.Stat;
    var Ease = Laya.Ease;
    var Tween = Laya.Tween;
    var myMap = Tower.LoadTiledMap;
    var AppLancher = (function () {
        function AppLancher() {
            this.timeLine = new Laya.TimeLine();
            // 不支持eWebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Stat.show();
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            //Laya.stage.scaleMode = "showall";
            //Laya.stage.bgColor = "#FFFFFF";
            Laya.stage.on(Laya.Event.CLICK, this, this.OnClick);
        }
        AppLancher.prototype.Init = function () {
            //this.m_img = new mySprite();
            this.m_map = new myMap();
            setTimeout(function () {
            }, 1000 / 60);
            this.m_Hero = new Tower.Roles(Tower.RoleType.Hero);
            var point = this.m_map.GetScreenPosOfWallFloorByTilePos(1, 1);
            this.m_Hero.SetPos(point.x, point.y);
        };
        AppLancher.prototype.OnClick = function () {
            var endX = Laya.stage.mouseX;
            var endY = Laya.stage.mouseY;
            console.log("Start:X " + this.m_Hero.RoleMoveAni.x + " Y " + this.m_Hero.RoleMoveAni.y);
            console.log("End:X " + endX + "  Y " + endY);
            //根据距离设定时间保持运动的匀速
            var nTimeX = Math.abs(endX - this.m_Hero.RoleMoveAni.x) * 5;
            var nTimeY = Math.abs(endY - this.m_Hero.RoleMoveAni.y) * 5;
            if (endX < this.m_Hero.RoleMoveAni.x) {
                this.m_Hero.SetMoveDir(Tower.MoveDir.Left);
                this.timeLine.addLabel("TurnLeft", 0).to(this.m_Hero.RoleMoveAni, { x: endX }, nTimeX, null, 0);
            }
            else {
                this.m_Hero.SetMoveDir(Tower.MoveDir.Right);
                this.timeLine.addLabel("TurnRight", 0).to(this.m_Hero.RoleMoveAni, { x: endX }, nTimeX, null, 0);
            }
            if (endY < this.m_Hero.RoleMoveAni.y) {
                this.timeLine.addLabel("TurnUp", 0).to(this.m_Hero.RoleMoveAni, { y: endY }, nTimeY, null, 0);
            }
            else {
                this.timeLine.addLabel("TurnDown", 0).to(this.m_Hero.RoleMoveAni, { y: endY }, nTimeY, null, 0);
            }
            this.timeLine.play(0, false);
            this.timeLine.on(Laya.Event.LABEL, this, this.onTimeLineLabel);
            this.timeLine.on(Laya.Event.COMPLETE, this, this.onTimeLineComplete);
        };
        AppLancher.prototype.onTimeLineLabel = function (label) {
            if (label == "TurnLeft")
                this.m_Hero.SetMoveDir(Tower.MoveDir.Left);
            else if (label == "TurnRight")
                this.m_Hero.SetMoveDir(Tower.MoveDir.Right);
            else if (label == "TurnUp")
                this.m_Hero.SetMoveDir(Tower.MoveDir.Up);
            else if (label == "TurnDown")
                this.m_Hero.SetMoveDir(Tower.MoveDir.Down);
        };
        AppLancher.prototype.onTimeLineComplete = function () {
            this.timeLine.reset();
            //this.m_Hero.Reset();
        };
        return AppLancher;
    }());
    Tower.AppLancher = AppLancher;
})(Tower || (Tower = {}));
var myTower = new Tower.AppLancher();
myTower.Init();
//new Tower.LoadSprite();
//# sourceMappingURL=LayaSample.js.map