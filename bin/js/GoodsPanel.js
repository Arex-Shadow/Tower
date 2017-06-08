/**
* name
*/
var Tower;
(function (Tower) {
    var GoodsPanel = (function () {
        function GoodsPanel() {
            this._view = fairygui.UIPackage.createObject("HeroStatus", "Goods").asCom;
            this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            fairygui.GRoot.inst.addChild(this._view);
            //var lblRedStone: fairygui.GLabel = this._view.getChild("lblRedStone").asLabel;
            //lblRedStone.text = "002";
        }
        GoodsPanel.prototype.SetText = function (txt, type) {
        };
        return GoodsPanel;
    }());
    Tower.GoodsPanel = GoodsPanel;
})(Tower || (Tower = {}));
//# sourceMappingURL=GoodsPanel.js.map