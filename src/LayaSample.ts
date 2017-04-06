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
		private timeLine:Laya.TimeLine = new Laya.TimeLine();
		constructor() {
			// 不支持eWebGL时自动切换至Canvas
			Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Stat.show();
			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			Laya.stage.alignH = Stage.ALIGN_CENTER;
			
			//Laya.stage.scaleMode = "showall";
			//Laya.stage.bgColor = "#FFFFFF";
			
			//Laya.stage.on(Laya.Event.CLICK, this, this.OnClick);
		}
		public Init():void
		{
			//this.m_img = new mySprite();
			this.m_map = new myMap();
			//this.m_Hero = new Roles(RoleType.Hero);
			
		}
		private OnClick():void
		{
			let endX = Laya.stage.mouseX;
			let endY = Laya.stage.mouseY;
			let nTimeX : number = Math.abs(endX - this.m_Hero.RoleMoveAni.x) * 5;
			let nTimeY : number = Math.abs(endY - this.m_Hero.RoleMoveAni.y) * 5;
			if(endX < this.m_Hero.RoleMoveAni.x)
			{
				this.timeLine.addLabel("TurnLeft", 0).to(this.m_Hero.RoleMoveAni,{x:endX},nTimeX, null, 0);
			}
			else
			{
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
			
			/*Tween.to(this.m_Hero.RoleMoveAni,
			{
				x: endX
			}, nTime);
			Tween.to(this.m_Hero.RoleMoveAni,
			{
				y: endY
			}, 1000);*/
			this.timeLine.play(0,false);
			//this.timeLine.on(Laya.Event.LABEL, this, this.onTimeLineLabel);
			this.timeLine.on(Laya.Event.COMPLETE,this,this.onTimeLineComplete);
		}
		private onTimeLineLabel(label:string)
		{
			if(label == "TurnLeft") this.m_Hero.SetMoveDir(MoveDir.Left);
			else if(label == "TurnRight") this.m_Hero.SetMoveDir(MoveDir.Right);
			else if(label == "TurnUp") this.m_Hero.SetMoveDir(MoveDir.Up);
			else if(label == "TurnDown") this.m_Hero.SetMoveDir(MoveDir.Down);
		}
		private onTimeLineComplete():void
		{
			this.timeLine.reset();
		}
	 }
}
var myTower = new Tower.AppLancher();
myTower.Init();
//new Tower.LoadSprite();
