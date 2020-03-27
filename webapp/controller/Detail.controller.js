sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"basim/util/formatter"
], function(Controller,Formatter) {
	"use strict";

	return Controller.extend("basim.controller.Detail", {

			formatter:Formatter,
			
			onInit:function(){
				this.oRouter = this.getOwnerComponent().getRouter();
				this.oRouter.attachRoutePatternMatched(this.routerClass,this);
			},
			routerClass:function(oEvent){
				//Get the object of the parent app
				var oParent = this.getView().getParent().getParent();
				//Get the Master View Object
				var oView1 = oParent.getMasterPages()[0];
				//Get the model of the list
				var oModel = oView1.byId("idList").getModel();
				//Set the model to the Detail View
				this.getView().setModel(oModel);
				//Bind the context path to the detail view
				var myId = oEvent.getParameter("arguments").myId;
				this.getView().bindElement({
					path: "/data/" + myId
				});
			},
			onNavPress:function(oEvent){
				var oParent = this.getView().getParent().getParent();
				var oView1 = oParent.getMasterPages()[0];
				oParent.to(oView1);
			}
	});

});