sap.ui.define(
	[],
	function() {
		return {
			dateTimeFormatter: function(str) {
				if (str) {
					var sDateTime = str.split("T", 2);
					var sDate = sDateTime[0];
					var sTime = sDateTime[1].slice(0, -8);
					return (sDate + "," + sTime);
				}

			}
		};
	});