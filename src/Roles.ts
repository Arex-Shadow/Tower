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
		private MoveAni:Laya.Animation[] = [];// move animation
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
						this.MoveAni[i] = new Laya.Animation();	
						var strAniImgs:string[] = [];
						for(var j=0; j < 6; j++)
						{
							strAniImgs[j] = this._strAtlasFile + "\/" + MoveDir[i].toString() + "_" + (j+1) + ".png";
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
		}
		public SetMoveDir(Dir : MoveDir): void
		{
			let posX:number = Laya.stage.width / 2;
			let posY:number = Laya.stage.height / 2;
			if(this.RoleMoveAni != null)
			{
				posX = this.RoleMoveAni.x;
				posY = this.RoleMoveAni.y;
				Laya.stage.removeChild(this.RoleMoveAni);
				this.RoleMoveAni.stop();
			}
			this.RoleMoveAni = this.MoveAni[Dir as number];
			this.MoveAni[Dir as number].interval = 100; // 设置播放间隔（单位：毫秒）
			this.MoveAni[Dir as number].index = 1; // 当前播放索引
			this.MoveAni[Dir as number].play(); // 播放图集动画
			// 获取动画的边界信息
			var bounds: Rectangle = this.RoleMoveAni.getGraphicBounds();
			this.RoleMoveAni.pivot(bounds.width / 2, bounds.height / 2);
			this.RoleMoveAni.pos(posX, posY);
			Laya.stage.addChild(this.RoleMoveAni);
			
		}
		
	}
}