/**
* name 
*/
module Tower{
	import TiledMap = Laya.TiledMap;
	import Event = Laya.Event;
	import Handler = Laya.Handler;
	import Rectangle = Laya.Rectangle;
	import Browser = Laya.Browser;

	export class LoadTiledMap{
		public tiledMap: TiledMap;
		private mLastMouseX: number = 0;
		private mLastMouseY: number = 0;
		private mX: number = 0;
		private mY: number = 0;
		constructor(){}
		//创建地图
		public createMap(mapName:string, completeHandler: laya.utils.Handler) {
			//创建地图对象
			this.tiledMap = new TiledMap();
			//创建地图，适当的时候调用destory销毁地图
			//this.tiledMap.createMap("floor001.json", new Rectangle(0, 0, Browser.width, Browser.height), completeHandler);
			this.tiledMap.createMap(mapName, new Rectangle(0, 0, Browser.width, Browser.height), completeHandler);
		}
		// 窗口大小改变，把地图的视口区域重设下
		public resize(): void 
		{
			//改变地图视口大小
			this.tiledMap.changeViewPort(this.mX, this.mY, Browser.width, Browser.height);
		}
		//根据鼠标位置获取对应Wall层的格子坐标
		public GetTilePosOfWallFloorByScreenPos(wallLayerIndex:number, x:number, y:number):any
		{
			let result:laya.maths.Point = new laya.maths.Point();
			this.tiledMap.getLayerByIndex(wallLayerIndex).getTilePositionByScreenPos(x, y, result);
			x = Math.floor(result.y);
			y = Math.floor(result.x);
			return new laya.maths.Point(x,y);
		}
		//根据Wall层格子坐标获取对应的屏幕坐标
		public GetScreenPosOfWallFloorByTilePos(wallLayerIndex:number, x:number, y:number) : any
		{	
			let result : laya.maths.Point = new laya.maths.Point();
			this.tiledMap.getLayerByIndex(wallLayerIndex).getScreenPositionByTilePos(x, y, result);
			return result;
		}
	}
}