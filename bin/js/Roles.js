/**
* name
*/
var Tower;
(function (Tower) {
    var Handler = Laya.Handler;
    var Loader = Laya.Loader;
    var RoleType;
    (function (RoleType) {
        RoleType[RoleType["Hero"] = 0] = "Hero";
        RoleType[RoleType["Evil"] = 1] = "Evil";
        RoleType[RoleType["Other"] = 2] = "Other";
    })(RoleType = Tower.RoleType || (Tower.RoleType = {}));
    var MoveDir;
    (function (MoveDir) {
        MoveDir[MoveDir["Left"] = 0] = "Left";
        MoveDir[MoveDir["Right"] = 1] = "Right";
        MoveDir[MoveDir["Up"] = 2] = "Up";
        MoveDir[MoveDir["Down"] = 3] = "Down";
    })(MoveDir = Tower.MoveDir || (Tower.MoveDir = {}));
    var Roles = (function () {
        function Roles(Type) {
            this._strAtlasFile = "res/Role/move";
            this.MoveAni = []; // move animation
            var str = this._strAtlasFile + ".json";
            console.log(str);
            //Laya.loader.load(str, Handler.create(this, this.CreateRole, [Type]), null, Loader.ATLAS);
            Laya.loader.load(str, Handler.create(this, this.CreateRole, [Type]), null, Loader.ATLAS);
        }
        Roles.prototype.test = function () {
            console.log("test");
        };
        Roles.prototype.CreateRole = function (Type) {
            console.log("CreateRole");
            switch (Type) {
                case RoleType.Hero:
                    //四个方向的行走动画
                    for (var i = 0; i < 4; i++) {
                        this.MoveAni[i] = new Laya.Animation();
                        var strAniImgs = [];
                        for (var j = 0; j < 6; j++) {
                            strAniImgs[j] = this._strAtlasFile + "\/" + MoveDir[i].toString() + "_" + (j + 1) + ".png";
                        }
                        this.MoveAni[i].loadImages(strAniImgs);
                    }
                    this.SetMoveDir(MoveDir.Down);
                    break;
                case RoleType.Evil:
                    break;
                default:
                    throw new Error("undefined role type");
            }
        };
        Roles.prototype.SetMoveDir = function (Dir) {
            var posX = Laya.stage.width / 2;
            var posY = Laya.stage.height / 2;
            if (this.RoleMoveAni != null) {
                posX = this.RoleMoveAni.x;
                posY = this.RoleMoveAni.y;
                Laya.stage.removeChild(this.RoleMoveAni);
                this.RoleMoveAni.stop();
            }
            this.RoleMoveAni = this.MoveAni[Dir];
            this.MoveAni[Dir].interval = 100; // 设置播放间隔（单位：毫秒）
            this.MoveAni[Dir].index = 1; // 当前播放索引
            this.MoveAni[Dir].play(); // 播放图集动画
            // 获取动画的边界信息
            var bounds = this.RoleMoveAni.getGraphicBounds();
            this.RoleMoveAni.pivot(bounds.width / 2, bounds.height / 2);
            this.RoleMoveAni.pos(posX, posY);
            Laya.stage.addChild(this.RoleMoveAni);
        };
        return Roles;
    }());
    Tower.Roles = Roles;
})(Tower || (Tower = {}));
//# sourceMappingURL=Roles.js.map