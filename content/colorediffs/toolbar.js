if (!colorediffsGlobal) {
	var colorediffsGlobal = {}
}

colorediffsGlobal.colorediffsToolbar = new function() {
	var me = colorediffsGlobal;
	var pref = new me.Pref(me.getPrefs());

	var getNode = function (name) {
		return function() {return me.$(name);}
	}

	var getViewModeNode = getNode('colorediffs-view-mode');
	var getShowWhiteSpacesNode = getNode('colorediffs-show-whitespaces');
	var getToolbarNode = getNode('colorediffs-toolbar');

	var reloadWithScrollPreserved = function() {
		var mp = me.getMessagePane();
		var oldScroll = mp.contentWindow.scrollY;
		mp.addEventListener(
			"load",
			function() {
				mp.contentWindow.scrollTo(0, oldScroll);
				mp.removeEventListener("load", arguments.callee, true);
			},
			true);
		MsgReload();
	}

	var updatePrefs = function() {
		pref.showWhiteSpace.set(getShowWhiteSpacesNode().checked);
		pref.mode.set(getViewModeNode().selectedItem);
		pref.showToolbar.set(!getToolbarNode().hidden)
	}

	this.selectMode = function () {
		updatePrefs();
		MsgReload();
	}

	this.toggleWhiteSpaces = function () {
		getShowWhiteSpacesNode().checked = !getShowWhiteSpacesNode().checked;
		updatePrefs();

		reloadWithScrollPreserved();
	}

	this.closeToolbar = function() {
		getToolbarNode().hidden=true
		updatePrefs();
	}

	this.initToolbar = function () {
		if (pref.showToolbar.get()) {
			//check if should be shown
			if (!me.isActive()) {
				getToolbarNode().hidden=true;
			} else {
				getToolbarNode().hidden=false;
				getShowWhiteSpacesNode().checked = pref.showWhiteSpace.get();

				//update combobox
				getViewModeNode().selectedItem = pref.mode.get();
			}
		}
	}
}
