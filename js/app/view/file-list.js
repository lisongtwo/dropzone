;define(function(require, exports, module){
	var _			= require('underscore'),
		Backbone	= require('backbone'),
		event		= require('app/event'),
		fileAll  	= require('app/model/file');

	var FileListView = Backbone.View.extend({
		el:   			'#myTable',
		rowTemplate:  	_.template('<tr><td><%=fileName%></td><td><%=fileType%></td><td><%=uploadedBy%></td><td><%=uploadedOn%></td><td>options</td></tr>'),
		initialize: 	function(){
			var me = this;

			this.collection = new fileAll.collection;
			this.collection.on('add', this.fileUploaded, this);
			this.collection.on('add', this.saveListInCookie, this);

			event.on('fileUploaded', function(fileName){
				var newFile = new fileAll.model;
				newFile.init(fileName);
				me.collection.add(newFile);
			});

			var existingFiles = sessionStorage.getItem('existing-files');
			if(existingFiles){
				this.collection.add(JSON.parse(existingFiles));
			}
		},
		fileUploaded:  	function(file){
			this.$('table').append(this.rowTemplate(file.toJSON()));
		},
		saveListInCookie: function(){
			sessionStorage.setItem('existing-files', JSON.stringify(this.collection.toJSON()));
		}
	});

	return {
		init: function(){
			new FileListView();
		}
	};
});