/**
* name
*/
var Tower;
(function (Tower) {
    var TiledMap = Laya.TiledMap;
    var Rectangle = Laya.Rectangle;
    var Browser = Laya.Browser;
    var LoadTiledMap = (function () {
        function LoadTiledMap() {
            this.mLastMouseX = 0;
            this.mLastMouseY = 0;
            this.mX = 0;
            this.mY = 0;
        }
        //创建地图
        LoadTiledMap.prototype.createMap = function (mapName, completeHandler) {
            if (this.tiledMap != null)
                this.tiledMap = null;
            //创建地图对象
            this.tiledMap = new TiledMap();
            //创建地图，适当的时候调用destory销毁地图
            //this.tiledMap.createMap("floor001.json", new Rectangle(0, 0, Browser.width, Browser.height), completeHandler);
            this.tiledMap.createMap(mapName, new Rectangle(0, 0, Laya.stage.width, Laya.stage.height), completeHandler);
        };
        // 窗口大小改变，把地图的视口区域重设下
        LoadTiledMap.prototype.resize = function () {
            //改变地图视口大小
            this.tiledMap.changeViewPort(this.mX, this.mY, Browser.width, Browser.height);
        };
        //根据鼠标位置获取对应Wall层的格子坐标
        LoadTiledMap.prototype.GetTilePosOfWallFloorByScreenPos = function (wallLayerIndex, x, y) {
            var result = new laya.maths.Point();
            this.tiledMap.getLayerByIndex(wallLayerIndex).getTilePositionByScreenPos(x, y, result);
            x = Math.floor(result.y);
            y = Math.floor(result.x);
            //alert(`${x},${y}`);
            return new laya.maths.Point(x, y);
        };
        //根据Wall层格子坐标获取对应的屏幕坐标
        LoadTiledMap.prototype.GetScreenPosOfWallFloorByTilePos = function (wallLayerIndex, x, y) {
            var result = new laya.maths.Point();
            this.tiledMap.getLayerByIndex(wallLayerIndex).getScreenPositionByTilePos(x, y, result);
            result.x += 39;
            result.y += 39;
            return result;
        };
        return LoadTiledMap;
    }());
    Tower.LoadTiledMap = LoadTiledMap;
})(Tower || (Tower = {}));
//# sourceMappingURL=LoadTiledMap.js.map