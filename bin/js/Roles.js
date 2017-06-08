/**
* name
*/
var Tower;
(function (Tower) {
    var Handler = Laya.Handler;
    var handler = laya.utils.Handler;
    var Loader = Laya.Loader;
    var Tween = Laya.Tween;
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
        function Roles(Type, CompleteHandler) {
            this._strAtlasFile = "res/Role/move";
            this.m_bMoveCompleted = true;
            var str = this._strAtlasFile + ".json";
            console.log(str);
            //Laya.loader.load(str, Handler.create(this, this.CreateRole, [Type]), null, Loader.ATLAS);
            Laya.loader.load(str, Handler.create(this, this.CreateRole, [Type, CompleteHandler]), null, Loader.ATLAS);
        }
        Object.defineProperty(Roles.prototype, "height", {
            get: function () { return this.RoleMoveAni.height; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Roles.prototype, "width", {
            get: function () { return this.RoleMoveAni.width; },
            enumerable: true,
            configurable: true
        });
        Roles.prototype.test = function () {
            console.log("test");
        };
        Roles.prototype.CreateRole = function (Type, CompleteHandler) {
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
                    CompleteHandler.run();
                    break;
                case RoleType.Evil:
                    break;
                default:
                    throw new Error("undefined role type");
            }
        };
        Roles.prototype.SetMoveDir = function (Dir) {
            this.RoleMoveAni.scaleX = 0.7;
            this.RoleMoveAni.scaleY = 0.7;
            this.RoleMoveAni.interval = 100;
            this.RoleMoveAni.play(0, true, MoveDir[Dir]);
        };
        Roles.prototype.SetPos = function (posX, posY) {
            var rect = this.RoleMoveAni.getBounds();
            var offsetY = rect.height / 2;
            var offsetX = rect.width / 2;
            this.RoleMoveAni.pos(posX - offsetX, posY - offsetY);
        };
        Roles.prototype.Reset = function () {
            this.RoleMoveAni.stop();
            this.RoleMoveAni.index = 0;
        };
        Roles.prototype.moveTo = function (pt) {
            /*while(!this.m_bMoveCompleted)
            {
                /*setTimeout(function() {
                    //console.log(`sleep ${Date.now}`);
                }, 100);*/
            //}
            this.m_bMoveCompleted = false;
            Tween.to(this.RoleMoveAni, { x: (pt.x), y: (pt.y) }, 3000, null, handler.create(this, this.moveCompleted));
            /*if(pt.x != this.RoleMoveAni.x)
            {
                if(pt.x < this.RoleMoveAni.x)
                    this.SetMoveDir(MoveDir.Left);
                else if(pt.x > this.RoleMoveAni.x)
                    this.SetMoveDir(MoveDir.Right);
                let nTimeX : number = Math.abs(pt.x - this.RoleMoveAni.x) * 2;
                Tween.to(this.RoleMoveAni, {x : (pt.x)}, nTimeX, null, handler.create(this, this.moveCompleted));
            }
            if(pt.y != this.RoleMoveAni.y)
            {
                if(pt.y < this.RoleMoveAni.y)
                    this.SetMoveDir(MoveDir.Up);
                else if(pt.y > this.RoleMoveAni.y)
                    this.SetMoveDir(MoveDir.Down);
                let nTimeY : number = Math.abs(pt.y - this.RoleMoveAni.y) * 3;
                Tween.to(this.RoleMoveAni, {y : (pt.y)}, nTimeY, null, handler.create(this, this.moveCompleted));
            }*/
        };
        Roles.prototype.moveCompleted = function () {
            console.log('move Completed');
            this.m_bMoveCompleted = true;
        };
        return Roles;
    }());
    Tower.Roles = Roles;
})(Tower || (Tower = {}));
//# sourceMappingURL=Roles.js.map