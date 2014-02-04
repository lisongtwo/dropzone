;define(function(require, exports, module){
	var _		= require('underscore'),
		Backbone= require('backbone'),
		event	= require('app/event');

	var FileSharingView = Backbone.View.extend({
		el: 			'#mySharing',
		fileLineTmpl:  	_.template('<li class="list-group-item"><%=name%></li>'),
		events:  		{
			'click .update-sharing': 'sharingUpdated'
		},
		initialize:  	function(){
			event.on('fileAdded', this.fileAdded, this);
		},
		fileAdded: function(fileName){
			this.$el.slideDown('slow', function(){

			});
			//this.$el.show();
			this.$('ul').append(this.fileLineTmpl({name: fileName}));
		},
		sharingUpdated: function(){
			var me = this;
			this.$el.slideUp('slow', function(){
				me.$('ul').html('');
			});
			//this.$el.hide();
		}
	});

	return {
		init: function(){
			new FileSharingView();
		}
	};
});