window.onload = function () {
  var Cropper = window.Cropper;
  var uploadImg = document.getElementById('inputImage');
  var imgContainer = document.querySelector('.img-container');
  var image = imgContainer.getElementsByTagName('img').item(0);
  var confirmBtn = document.getElementById('confirmBtn');
  var URL = window.URL || window.webkitURL;

  var options = {
    // aspectRatio: 16 /9 ,
  };

  var cropper = new Cropper(image, options);
  var originalImageURL = image.src;
  var uploadedImageType = 'image/jpeg';
  var uploadedImageURL;


  if (URL) {
    uploadImg.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        file = files[0];

        if (/^image\/\w+/.test(file.type)) {
          uploadedImageType = file.type;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          image.src = uploadedImageURL = URL.createObjectURL(file);
          cropper.destroy();
          cropper = new Cropper(image, options);
          inputImage.value = null;
        } else {
          window.alert('Please choose an image file.');
        }
      }
    };
  } else {
    uploadImg.disabled = true;
    uploadImg.parentNode.className += ' disabled';
  }

  confirmBtn.onclick = function () {
    console.log(cropper)
  }


};
