/**
* name 
*/
module Tower
{
	import Handler = Laya.Handler;
	import Loader = Laya.Loader;
	import Rectangle = Laya.Rectangle;

	export enum RoleType
	{
		Hero,
		Evil,
		Other
	}
	export enum MoveDir
	{
		Left = 0,
		Right,
		Up,
		Down
	}
	export class Roles
	{
		readonly _strAtlasFile:string = "res/Role/move";
		//private MoveAni:Laya.Animation[] = [];// move animation
		public RoleMoveAni : Laya.Animation;
		constructor(Type:RoleType)
		{
			let str:string = this._strAtlasFile + ".json";
			console.log(str);
			//Laya.loader.load(str, Handler.create(this, this.CreateRole, [Type]), null, Loader.ATLAS);
			Laya.loader.load(str, Handler.create(this, this.CreateRole, [Type]), null, Loader.ATLAS);
		}
		private test():void
		{
			console.log("test");
		}
		private CreateRole(Type:RoleType) : void
		{
			console.log("CreateRole");
			switch(Type)
			{
				case RoleType.Hero:	
					//四个方向的行走动画
					for(var i=0; i < 4; i++ )
					{
						//this.MoveAni[i] = new Laya.Animation();	
						this.RoleMoveAni = new Laya.Animation();
						var strAniImgs:string[] = [];
						for(var j=0; j < 6; j++)
						{
							strAniImgs[j] = this._strAtlasFile + "\/" + MoveDir[i] + "_" + (j+1) + ".png";
						}
						//this.MoveAni[i].loadImages(strAniImgs);
						console.log(MoveDir[i]);
						this.RoleMoveAni.loadImages(strAniImgs, MoveDir[i])
					}
					this.SetMoveDir(MoveDir.Down);
					this.SetPos(Laya.stage.width/2, Laya.stage.height/2);
					Laya.stage.addChild(this.RoleMoveAni);
				break;
				case RoleType.Evil:
				break;
				default:
					throw new Error("undefined role type");

			}
		}
		public SetMoveDir(Dir : MoveDir): void
		{
			this.RoleMoveAni.interval = 100;
			this.RoleMoveAni.play(0,true, MoveDir[Dir]);
		}
		public SetPos(posX:number, posY:number)
		{
			this.RoleMoveAni.pos(posX,posY);
		}
		public Reset()
		{
			this.RoleMoveAni.stop();
			this.RoleMoveAni.index = 0;
		}
	}
}