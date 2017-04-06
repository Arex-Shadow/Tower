/**
* name
*/
var Tower;
(function (Tower) {
    var TiledMap = Laya.TiledMap;
    var Event = Laya.Event;
    var Handler = Laya.Handler;
    var Rectangle = Laya.Rectangle;
    var Browser = Laya.Browser;
    var LoadTiledMap = (function () {
        function LoadTiledMap() {
            this.mLastMouseX = 0;
            this.mLastMouseY = 0;
            this.mX = 0;
            this.mY = 0;
            this.createMap();
            Laya.stage.on(Event.MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Event.MOUSE_UP, this, this.mouseUp);
        }
        //创建地图
        LoadTiledMap.prototype.createMap = function () {
            //创建地图对象
            this.tiledMap = new TiledMap();
            //创建地图，适当的时候调用destory销毁地图
            this.tiledMap.createMap("floor001.json", new Rectangle(0, 0, Browser.width, Browser.height), new Handler(this, this.completeHandler));
        };
        /**
         * 地图加载完成的回调
         */
        LoadTiledMap.prototype.completeHandler = function () {
            console.log("地图创建完成");
            console.log("ClientW:" + Browser.clientWidth + " ClientH:" + Browser.clientHeight);
            console.log("地图信息：" + this.tiledMap.gridHeight + "×" + this.tiledMap.gridWidth);
            Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
            this.m_lyrfloor = this.tiledMap.getLayerByIndex(0);
            console.log("layer floor name:" + this.m_lyrfloor.name);
            this.m_lyrWall = this.tiledMap.getLayerByIndex(1);
            console.log("Layer wall name:" + this.m_lyrWall.name);
            this.m_lyrNpc = this.tiledMap.getLayerByIndex(2);
            console.log("Layer NPC name:" + this.m_lyrNpc.name);
            console.log(this.m_lyrWall.getTileData(0, 0));
            console.log(this.m_lyrWall.getTileData(1, 0));
            console.log(this.m_lyrWall.getTileData(2, 0));
            this.resize();
        };
        //鼠标按下拖动地图
        LoadTiledMap.prototype.mouseDown = function () {
            this.mLastMouseX = Laya.stage.mouseX;
            this.mLastMouseY = Laya.stage.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        };
        LoadTiledMap.prototype.mouseMove = function () {
            //移动地图视口
            this.tiledMap.moveViewPort(this.mX - (Laya.stage.mouseX - this.mLastMouseX), this.mY - (Laya.stage.mouseY - this.mLastMouseY));
        };
        LoadTiledMap.prototype.mouseUp = function () {
            this.mX = this.mX - (Laya.stage.mouseX - this.mLastMouseX);
            this.mY = this.mY - (Laya.stage.mouseY - this.mLastMouseY);
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        };
        // 窗口大小改变，把地图的视口区域重设下
        LoadTiledMap.prototype.resize = function () {
            //改变地图视口大小
            this.tiledMap.changeViewPort(this.mX, this.mY, Browser.width, Browser.height);
        };
        return LoadTiledMap;
    }());
    Tower.LoadTiledMap = LoadTiledMap;
})(Tower || (Tower = {}));
//# sourceMappingURL=LoadTiledMap.js.map