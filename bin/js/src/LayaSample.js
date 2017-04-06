// 程序入口
var Tower;
(function (Tower) {
    var Stage = Laya.Stage;
    var Browser = Laya.Browser;
    var WebGL = Laya.WebGL;
    var TiledMap = Laya.TiledMap;
    var Rectangle = Laya.Rectangle;
    var Handler = Laya.Handler;
    var Stat = Laya.Stat;
    var Animation_Altas = (function () {
        function Animation_Altas() {
            // 不支持eWebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Stat.show();
            this.createMap();
            /*Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#FFFFFF";*/
        }
        //创建地图
        Animation_Altas.prototype.createMap = function () {
            //创建地图对象
            this.tiledMap = new TiledMap();
            //创建地图，适当的时候调用destory销毁地图
            this.tiledMap.createMap("Map/floor001.json", new Rectangle(0, 0, Browser.width, Browser.height), new Handler(this, this.completeHandler));
        };
        /**
         * 地图加载完成的回调
         */
        Animation_Altas.prototype.completeHandler = function () {
            console.log("地图创建完成");
            console.log("ClientW:" + Browser.clientWidth + " ClientH:" + Browser.clientHeight);
            //Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
            //this.resize();
        };
        return Animation_Altas;
    }());
    Tower.Animation_Altas = Animation_Altas;
})(Tower || (Tower = {}));
new Tower.Animation_Altas();
//new Tower.LoadSprite();
//# sourceMappingURL=LayaSample.js.map