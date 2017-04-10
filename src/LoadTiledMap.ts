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
		private tiledMap: TiledMap;
		private mLastMouseX: number = 0;
		private mLastMouseY: number = 0;
		private mX: number = 0;
		private mY: number = 0;
		private m_lyrNpc :laya.map.MapLayer;
		private m_lyrWall:laya.map.MapLayer;
		private m_lyrfloor:laya.map.MapLayer;
		constructor()
		{
			this.createMap();
			//Laya.stage.on(Event.MOUSE_DOWN, this, this.mouseDown);
			//Laya.stage.on(Event.MOUSE_UP, this, this.mouseUp);
		}
		//创建地图
		private createMap() {
			//创建地图对象
			this.tiledMap = new TiledMap();
			//创建地图，适当的时候调用destory销毁地图
			this.tiledMap.createMap("floor001.json", new Rectangle(0, 0, Browser.width, Browser.height), new Handler(this, this.completeHandler));
		}

		/**
		 * 地图加载完成的回调
		 */
		private completeHandler(): void {
			console.log("地图创建完成");
			console.log("ClientW:" + Browser.clientWidth + " ClientH:" + Browser.clientHeight);
			console.log("地图信息：" + this.tiledMap.gridHeight + "×" + this.tiledMap.gridWidth);
			Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
			this.m_lyrfloor = this.tiledMap.getLayerByIndex(0);
			console.log("layer floor name:" + this.m_lyrfloor.name);
			this.m_lyrWall = this.tiledMap.getLayerByIndex(1);
			console.log("Layer wall name:" + (this.m_lyrWall.name));
			this.m_lyrNpc = this.tiledMap.getLayerByIndex(2);
			this.resize();
		}
		//鼠标按下拖动地图
		private mouseDown(): void {
			this.mLastMouseX = Laya.stage.mouseX;
			this.mLastMouseY = Laya.stage.mouseY;
			Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
		}

		private mouseMove(): void {
			//移动地图视口
			this.tiledMap.moveViewPort(this.mX - (Laya.stage.mouseX - this.mLastMouseX), this.mY - (Laya.stage.mouseY - this.mLastMouseY));
		}

		private mouseUp(): void {
			this.mX = this.mX - (Laya.stage.mouseX - this.mLastMouseX);
			this.mY = this.mY - (Laya.stage.mouseY - this.mLastMouseY);
			Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
		}
		// 窗口大小改变，把地图的视口区域重设下
		private resize(): void {
			//改变地图视口大小
			this.tiledMap.changeViewPort(this.mX, this.mY, Browser.width, Browser.height);
		}
		//根据鼠标位置获取对应Wall层的格子坐标
		public GetTilePosOfWallFloorByMousePos():any
		{
			let result:laya.maths.Point = new laya.maths.Point();
			this.m_lyrWall.getTilePositionByScreenPos(Laya.stage.mouseX, Laya.stage.mouseY, result);
			result.x = Math.floor(result.x);
			result.y = Math.floor(result.y);
			return result;
		}
		//根据Wall层格子坐标获取对应的屏幕坐标
		public GetScreenPosOfWallFloorByTilePos(x:number, y:number) : any
		{	
			let result : laya.maths.Point = new laya.maths.Point();
			this.m_lyrWall.getScreenPositionByTilePos(x, y, result);
			return result;
		}
	}
}