colorediffsGlobal.transformations.composite.members["show-whitespaces"] = {
	init: function(registrator, pref) {
		if (pref.showWhiteSpace.get()) {
			registrator.addListener("show-whitespaces", "line", replaceWhitespaces, ["collect-tab-sizes"]);
		}

		var pref = new colorediffsGlobal.Pref(colorediffsGlobal.getPrefs());

		function replaceWhitespaces(line, index, chunk) {
			var tab_sizes = chunk.tab_sizes[index];
			if ( line ) {
				line = line.replace(" ", pref.symbolWhitespace.get(), "g");
				var i = 0;
				line = line.replace(
					"\t",
					function() {
						return pref.symbolTab.get() +
							colorediffsGlobal.pad("", tab_sizes[i++] - 1);
					},
					"g"
				);
			}
			return line;
		}
	}
};
