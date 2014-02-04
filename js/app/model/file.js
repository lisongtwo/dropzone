;define(function(require, exports, module){
	var _		= require('underscore'),
		Backbone= require('backbone')

	var FileModel	= Backbone.Model.extend({
		init: function(fileName){
			this.set({
				fileName: fileName,
				fileType: fileName.split('.').pop().toLowerCase(),
				uploadedBy: 'Song Li',
				uploadedOn: new Date().toISOString()
			});
			/*
			this.fileName = fileName;
			this.fileType = fileName.split('.').pop().toLowerCase();
			this.uploadedBy	= 'Song Li';
			this.uploadedOn	= new Date().toISOString();
			*/
		}
	});

	var FileCollection = Backbone.Collection.extend({
		model:  	FileModel
	});

	return {
		model:  	FileModel,
		collection: FileCollection
	};
});