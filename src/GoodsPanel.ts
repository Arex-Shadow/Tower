/**
* name 
*/
module Tower
{
	export class GoodsPanel
	{
		private _view: fairygui.GComponent;
		private _list: fairygui.GList;

		public constructor() {
			this._view = fairygui.UIPackage.createObject("HeroStatus","Goods").asCom;
			this._view.setSize(fairygui.GRoot.inst.width,fairygui.GRoot.inst.height);
			fairygui.GRoot.inst.addChild(this._view);
			//var lblRedStone: fairygui.GLabel = this._view.getChild("lblRedStone").asLabel;
			//lblRedStone.text = "002";
		}
		public SetText(txt:string, type:number)
		{
			

		}
	}
}