sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/MessageBox"
], function(Controller, JSONModel, Filter, MessageBox) {
	"use strict";

	return Controller.extend("basim.controller.Master", {
		
		onInit: function() {
			var sURL = "/v2/locations";
			
			// AJAX call to request data from the server
			$.ajax({
				type: "GET",
				url: sURL,
				contentType: "application/json",
				dataType: "json",
				success: this.successCall.bind(this),
				error: this.errorCall
			});
			
			//Get the Router
			this.oRouter = this.getOwnerComponent().getRouter();
			//Attach Pattern Match Handler to the Router
			this.oRouter.attachRoutePatternMatched(this.routerClass, this);
		},
		routerClass: function(oEvent) {
			var myIndex = oEvent.getParameter("arguments").myId;
			var oList = this.getView().byId("idList");
			var oItem = oList.getItems()[parseInt(myIndex)];
			oList.setSelectedItem(oItem);
		},
		successCall: function(oSuccess) {
			//Store the Data in the local Object
			var myData = oSuccess.locations;
			// Create a JSON Model
			var myModel = new JSONModel();
			//Set the data
			myModel.setData({
				"data": myData
			});
			//Get the list control
			var oList = this.getView().byId("idList");
			//Set the model to the List
			oList.setModel(myModel);
			//Bind the data to list
			oList.bindItems({
				path: "/data",
				template: new sap.m.DisplayListItem({
					label: "{country}",
					value: "{province}"
				})
			});
		},
		errorCall: function() {
			//Error Handling
			MessageBox.show("Error in the API Call");
		},
		onSelect: function(oEvent) {
			var oContext = oEvent.getParameter("listItem").getBindingContextPath();
			oContext = oContext.split("/")[oContext.split("/").length - 1];
			this.oRouter.navTo("Detail", {
				myId: oContext
			});
		},
		onSearch: function(oEvent) {
			var valueEnteredByUser = oEvent.getParameter("newValue");
			var oFilter = new Filter({
				path: "country",
				operator: "Contains",
				value1: valueEnteredByUser
			});
			var oList = this.getView().byId("idList");
			oList.getBinding("items").filter([oFilter]);
		}

	});

});