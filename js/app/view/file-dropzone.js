;define(function(require, exports, module){
	var _			= require('underscore'),
		Backbone	= require('backbone'),
		event 		= require('app/event');
	require('dropzone');

	var DropzoneView = Backbone.View.extend({
		el: '#myDropzone',
		initialize: function(){
			var me = this;
			this.myDropzone = new Dropzone(me.el,{
				url: 			"http://www.torrentplease.com/dropzone.php",
				addRemoveLinks: true,
                //accept:function(file,done){
                //    var isAccept = !!file.mimeType&&(file.size>1);
                //    isAccept || done.call(null,"This file is not valid");
                //    return isAccept;
                //},
				init:  			function(){
                    //this.on("selectedfiles", function (files) {
                    //    $.each(files, function (index, file) {
                    //        file.mimeType = file.type||file.name.replace(/[^\.]+/,"").split(/\./).pop()||"extension";
                    //    });
                    //});
					this.on("complete", function(file){
						me.myDropzone.removeFile(file);
						event.trigger('fileUploaded', file.name);
					});
                    this.on("addedfile", function (file) {
                        var me = this;
                        $(file.previewElement.querySelector(".delete")).click(function () {
                            file.processing = false;
                            me.removeFile(file);
                        });
                        var filePreviewHtml, thumbnailElement,
                        	fileExt = file.name.split('.').pop().toLowerCase();
                        switch(fileExt){
                        	case 'doc':
                        	case 'docx':
                        		filePreviewHtml = ['<img src="https://s3.amazonaws.com/icons.noosh.com/txt-icon.png" class="uploaded-file-preview-image">'].join('');
                        		break;
                        	case 'pdf':
                        		filePreviewHtml = ['<img src="https://s3.amazonaws.com/icons.noosh.com/pdf-icon.png" class="uploaded-file-preview-image">'].join('');
                        		break;
                        	case 'png':
                        	case 'jpg':
                        	case 'jpeg':
                        		break;
                        	default:
                        		filePreviewHtml = ['<img src="https://s3.amazonaws.com/icons.noosh.com/etc-icon.png" class="uploaded-file-preview-image">'].join('');
                        }
                        filePreviewHtml && $(file.previewElement.querySelector("[data-dz-thumbnail]")).replaceWith(filePreviewHtml);

                        event.trigger('fileAdded', file.name);
                    });
				}
			});
		},
        filesBeingUploadedNoew: function(){
            return this.myDropzone.getUploadingFiles().length;
        }
	});

	return {
        uploader:   DropzoneView
		//init: function(){
		//	new DropzoneView();
		//}
	};
});