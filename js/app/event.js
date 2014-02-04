;define(function(require, exports, module){
	var _			= require('underscore'),
		Backbone	= require('backbone')

	var eventManager = {};
	_.extend(eventManager, Backbone.Events);

	return eventManager;
});