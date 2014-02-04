;define(function(require, exports, module){
	var fileDropzone 	= require('app/view/file-dropzone'),
		fileList		= require('app/view/file-list'),
		fileSetting		= require('app/view/file-setting');

	return {
		init: function(){
			$(function(){
				var fileUploader = new fileDropzone.uploader();
				fileList.init();
				fileSetting.init();

				$(window).on('beforeunload', function(){
					if(fileUploader.filesBeingUploadedNoew() > 0){
						if(!confirm('There are some files being uploaded now, do you want to terminate them?')){
							return false;
						}
					}
				});				
			});
		}
	};
});