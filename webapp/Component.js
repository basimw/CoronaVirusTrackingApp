sap.ui.define(
	["sap/ui/core/UIComponent",
		"sap/ui/model/json/JSONModel"
	],
	function(UIComponent, JSONModel) {
		return UIComponent.extend("basim.Component", {

			metadata: {
				"manifest": "json"
			},

			init: function() {
				sap.ui.core.UIComponent.prototype.init.apply(this);
				var oRouter = this.getRouter();
				oRouter.initialize();
			},
			destroy: function() {

			}
		});
	});