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
                        //this.MoveAni[i] = new Laya.Animation();	
                        this.RoleMoveAni = new Laya.Animation();
                        var strAniImgs = [];
                        for (var j = 0; j < 6; j++) {
                            strAniImgs[j] = this._strAtlasFile + "\/" + MoveDir[i] + "_" + (j + 1) + ".png";
                        }
                        //this.MoveAni[i].loadImages(strAniImgs);
                        console.log(MoveDir[i]);
                        this.RoleMoveAni.loadImages(strAniImgs, MoveDir[i]);
                    }
                    this.SetMoveDir(MoveDir.Down);
                    this.SetPos(Laya.stage.width / 2, Laya.stage.height / 2);
                    Laya.stage.addChild(this.RoleMoveAni);
                    break;
                case RoleType.Evil:
                    break;
                default:
                    throw new Error("undefined role type");
            }
        };
        Roles.prototype.SetMoveDir = function (Dir) {
            this.RoleMoveAni.interval = 100;
            this.RoleMoveAni.play(0, true, MoveDir[Dir]);
        };
        Roles.prototype.SetPos = function (posX, posY) {
            this.RoleMoveAni.pos(posX, posY);
        };
        Roles.prototype.Reset = function () {
            this.RoleMoveAni.stop();
            this.RoleMoveAni.index = 0;
        };
        return Roles;
    }());
    Tower.Roles = Roles;
})(Tower || (Tower = {}));
//# sourceMappingURL=Roles.js.map