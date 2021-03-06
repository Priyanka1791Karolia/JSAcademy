function app(){
	this.fileUpload= document.getElementById('fileUpload');

	this.previewDiv= document.getElementById('preview');
}

app.prototype= {
	constructor: app,

	previewFile: function(e){
		e.preventDefault();
		this.previewDiv.innerHTML= "";
		var file= (this.fileUpload.files)[0];

		if(file.type.match('image')){
			var reader= new FileReader();
			reader.onload= function(e){
				var content= e.target.result;

				var image= document.createElement("img");
				image.src= content;

				this.previewDiv.appendChild(image);
			}.bind(this);	
			reader.readAsDataURL(file);
		}

		else if(file.type.match(	'text') || file.type.match('javascript')){
			var reader= new FileReader();
			reader.onload= function(e){
				var content= e.target.result;

				this.previewDiv.innerText= content;
			}.bind(this);	
			reader.readAsText(file);
		}
	},

	deleteFile: function(e){
		this.fileUpload.value="";
	},

	handleDragOver: function(e){
		e.preventDefault();
		e.dataTransfer.dropEffect= "copy";
		e.target.classList.add("dragOver");
	},

	handleDragLeave: function(e){
		e.preventDefault();
		e.target.classList.remove("dragOver");
	},

	handleFileDrop: function(e){
		e.preventDefault();

		this.fileUpload.files= e.dataTransfer.files;
		e.target.classList.remove("dragOver");
	}
}

var myApp= new app();