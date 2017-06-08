/**
* name 
*/
module Tower
{
	import Handler = Laya.Handler;
	import handler = laya.utils.Handler;
	import Loader = Laya.Loader;
	import Rectangle = Laya.Rectangle;
	import Tween   = Laya.Tween;
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
		 m_bMoveCompleted:boolean = true;
		//private MoveAni:Laya.Animation[] = [];// move animation
		public RoleMoveAni : Laya.Animation;
		constructor(Type:RoleType, CompleteHandler?:laya.utils.Handler)
		{
			let str:string = this._strAtlasFile + ".json";
			console.log(str);
			//Laya.loader.load(str, Handler.create(this, this.CreateRole, [Type]), null, Loader.ATLAS);
			Laya.loader.load(str, Handler.create(this, this.CreateRole, [Type, CompleteHandler]), null, Loader.ATLAS);
		}
		get height():number{ return this.RoleMoveAni.height; }
		get width():number{ return this.RoleMoveAni.width; }
		private test():void
		{
			console.log("test");
		}
		private CreateRole(Type:RoleType, CompleteHandler:laya.utils.Handler) : void
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
					CompleteHandler.run();
				break;
				case RoleType.Evil:
				break;
				default:
					throw new Error("undefined role type");

			}
		}
		public SetMoveDir(Dir : MoveDir): void
		{
			this.RoleMoveAni.scaleX = 0.7;
			this.RoleMoveAni.scaleY = 0.7;
			this.RoleMoveAni.interval = 100;
			this.RoleMoveAni.play(0,true, MoveDir[Dir]);
		}
		public SetPos(posX:number, posY:number)
		{	
			let rect = this.RoleMoveAni.getBounds()
			let offsetY = rect.height / 2;
			let offsetX = rect.width / 2;
			this.RoleMoveAni.pos(posX - offsetX, posY - offsetY);
		}
		public Reset()
		{
			this.RoleMoveAni.stop();
			this.RoleMoveAni.index = 0;
		}
		public moveTo(pt:laya.maths.Point)
		{
			/*while(!this.m_bMoveCompleted)
			{
				/*setTimeout(function() {
					//console.log(`sleep ${Date.now}`);
				}, 100);*/
			//}
			this.m_bMoveCompleted = false;
			Tween.to(this.RoleMoveAni, {x:(pt.x), y :(pt.y)}, 3000, null, handler.create(this, this.moveCompleted));
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
			
		}
		private moveCompleted()
		{
			console.log('move Completed');
			this.m_bMoveCompleted = true;
		}
	}
}