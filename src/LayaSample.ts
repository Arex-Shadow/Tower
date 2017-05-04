// 程序入口
module Tower 
{
	import Stage = Laya.Stage;
	import Browser = Laya.Browser;
	import WebGL = Laya.WebGL;
	import Stat = Laya.Stat;
	var Ease    = Laya.Ease;
	var Tween   = Laya.Tween;
	import myMap = Tower.LoadTiledMap;
	import mySprite = Tower.LoadSprite;
	export class AppLancher
     {
		private testSP : Laya.Sprite;
		private m_Hero : Roles;
		private m_img:mySprite;
		private m_map:myMap; 
		private m_findPath:Astar;
		private timeLine:Laya.TimeLine = new Laya.TimeLine();
		private xPre:number = 0;
		private yPre:number = 0;
		private g:Laya.Sprite;
		constructor() {
			// 不支持eWebGL时自动切换至Canvas
			Laya.init(Browser.width, Browser.height, WebGL);
			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			//Stat.show();
			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			Laya.stage.alignH = Stage.ALIGN_CENTER;
			//Laya.stage.scaleMode = "showall";
			//Laya.stage.bgColor = "#FFFFFF";
			Laya.stage.on(Laya.Event.CLICK, this, this.OnClick);
			
		}
		public Init():void
		{
			//this.m_img = new mySprite();
			this.m_map = new myMap();
			this.m_map.createMap("floor001.json", laya.utils.Handler.create(this, this.TiledMapLoadCompleted));
			Browser.width = this.m_map.tiledMap.width;
			Browser.height = this.m_map.tiledMap.height;
		}
		private TiledMapLoadCompleted():void
		{
			this.m_map.resize();
			if(this.m_Hero == undefined)
			{
				this.m_Hero = new Roles(RoleType.Hero, laya.utils.Handler.create(this, this.RoleCreateCompleted));
			}
			else this.RoleCreateCompleted();
		}
		private RoleCreateCompleted()
		{
			console.log("completed");
			if(this.m_findPath != null) this.m_findPath = null; 
			this.m_findPath = new Astar(this.m_map.tiledMap);
			let point:laya.maths.Point = this.m_map.GetScreenPosOfWallFloorByTilePos(1, 1, 1); 
			this.m_Hero.SetPos(point.x, point.y);
			this.xPre = this.m_Hero.RoleMoveAni.x;
			this.yPre = this.m_Hero.RoleMoveAni.y;
		}
		
		private OnClick():void
		{
			if(this.g == undefined)
			{
				this.g = new Laya.Sprite();
				Laya.stage.addChild(this.g);
			}
			this.g.graphics.clear();
			//this.g.graphics.drawLine(this.xPre, this.yPre, Laya.stage.mouseX, Laya.stage.mouseY, "#ff0000", 3);
			//this.xPre = Laya.stage.mouseX;
			//this.yPre = Laya.stage.mouseY;
			//this.m_map.GetTilePosOfWallFloorByScreenPos(1, Laya.stage.mouseX, Laya.stage.mouseY);//debug
			//this.m_map.createMap("floor002.json", laya.utils.Handler.create(this, this.TiledMapLoadCompleted));
			
			let endX = Laya.stage.mouseX;
			let endY = Laya.stage.mouseY;
			console.log(`Start:X ${this.m_Hero.RoleMoveAni.x} Y ${this.m_Hero.RoleMoveAni.y}`);
			console.log(`End:X ${endX}  Y ${endY}`);
			let start = this.m_map.GetTilePosOfWallFloorByScreenPos(1, this.m_Hero.RoleMoveAni.x + this.m_Hero.RoleMoveAni.width / 2,
			 this.m_Hero.RoleMoveAni.y + this.m_Hero.RoleMoveAni.height / 2);
			let end = this.m_map.GetTilePosOfWallFloorByScreenPos(1, Laya.stage.mouseX, Laya.stage.mouseY);
			console.log(`Start:${start} End:${end}`);
			let ret = this.m_findPath.search(start, end);
			console.log(ret.toString());
			let lines = Array()
			ret.forEach((val)=>
			{
				let pt = this.m_map.GetScreenPosOfWallFloorByTilePos(1, val.y, val.x);
				//this.m_Hero.moveTo(pt);
				this.g.graphics.drawLine(this.xPre, this.yPre, pt.x, pt.y, "#ff0000", 3);
				this.xPre = pt.x;
				this.yPre = pt.y;
			});

			this.m_Hero.SetPos(this.xPre, this.yPre);
			//根据距离设定时间保持运动的匀速
			/*let nTimeX : number = Math.abs(endX - this.m_Hero.RoleMoveAni.x) * 5;
			let nTimeY : number = Math.abs(endY - this.m_Hero.RoleMoveAni.y) * 5;
			if(endX < this.m_Hero.RoleMoveAni.x)
			{
				this.m_Hero.SetMoveDir(MoveDir.Left);
				this.timeLine.addLabel("TurnLeft", 0).to(this.m_Hero.RoleMoveAni,{x:endX},nTimeX, null, 0);
			}
			else
			{
				this.m_Hero.SetMoveDir(MoveDir.Right);
				this.timeLine.addLabel("TurnRight", 0).to(this.m_Hero.RoleMoveAni,{x:endX},nTimeX, null, 0);
			}
			if(endY < this.m_Hero.RoleMoveAni.y)
			{
				this.timeLine.addLabel("TurnUp", 0).to(this.m_Hero.RoleMoveAni,{y:endY},nTimeY, null, 0);	
			}
			else
			{
				this.timeLine.addLabel("TurnDown", 0).to(this.m_Hero.RoleMoveAni,{y:endY},nTimeY, null, 0);
			}
			this.timeLine.play(0,false);
			this.timeLine.on(Laya.Event.LABEL, this, this.onTimeLineLabel);
			this.timeLine.on(Laya.Event.COMPLETE,this,this.onTimeLineComplete);*/
		}
		private onTimeLineLabel(label:string)
		{
			if(label == "TurnLeft") 
				this.m_Hero.SetMoveDir(MoveDir.Left);
			else if(label == "TurnRight") 
				this.m_Hero.SetMoveDir(MoveDir.Right);
			else if(label == "TurnUp") 
				this.m_Hero.SetMoveDir(MoveDir.Up);
			else if(label == "TurnDown")
				this.m_Hero.SetMoveDir(MoveDir.Down);
		}
		private onTimeLineComplete():void
		{
			this.timeLine.reset();
			//this.m_Hero.Reset();
		}
	 }
}
var myTower = new Tower.AppLancher();
myTower.Init();
//new Tower.LoadSprite();

