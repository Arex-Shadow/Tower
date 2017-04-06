/**
* name 
*/
module Tower
{
	import Loader = Laya.Loader;
	import Handler = Laya.Handler;
	import Sprite = Laya.Sprite;
	import Animation = Laya.Animation;
	import Rectangle = Laya.Rectangle;
	
	export class LoadSprite
	{
		constructor()
		{
				Laya.loader.load("res/area.json", Handler.create(this, this.createAnimation), null, Loader.ATLAS);
		}
		private createAnimation(): void 
		{
			var bg:Sprite = new Sprite();
            bg.loadImage("res/area/bg0.png");
			Laya.stage.addChild(bg);
            var ani:Animation = new Animation();
			ani.loadAtlas("res/area.json"); // 加载图集动画
			ani.interval = 30; // 设置播放间隔（单位：毫秒）
			ani.index = 1; // 当前播放索引
			ani.play(); // 播放图集动画
			// 获取动画的边界信息
			var bounds: Rectangle = ani.getGraphicBounds();
			ani.pivot(bounds.width / 2, bounds.height / 2);
			ani.pos(Laya.stage.width / 2, Laya.stage.height / 2);
			Laya.stage.addChild(ani);
		}
	}
}