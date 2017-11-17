window.onload = function () {
  var Cropper = window.Cropper;
  var uploadImg = document.getElementById('inputImage');
  var cutContainer = document.getElementById('cutImg');
  var image = cutContainer.getElementsByTagName('img').item(0);
  var download = document.getElementById('confirmBtn');
  var URL = window.URL || window.webkitURL;

  var serverURL = '';

  var dataX;
  var dataY;
  var dataWidth;
  var dataHeight;


  var options = {
    aspectRatio: 16 /9 ,
    preview: '.img-preview',
    crop: function (e) {
      var data = e.detail;

      console.log(data);
      dataX = Math.round(data.x);
      dataY = Math.round(data.y);
      dataHeight = Math.round(data.height);
      dataWidth = Math.round(data.width);

    },
    zoom: function (e) {
      console.log(e.type, e.detail.ratio);
    },

  };

  var cropper = new Cropper(image, options);
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
          uploadImg.value = null;
        } else {
          window.alert('Please choose an image file.');
        }
      }
    };
  } else {
    uploadImg.disabled = true;
    uploadImg.parentNode.className += ' disabled';
  }



  download.onclick = function (e) {
    var data = {
      method: 'getCroppedCanvas',
      option: {
        width: dataWidth,
        height: dataHeight
      },

    };
    var result = cropper[data.method](data.option);
    var newUrl = result.toDataURL(uploadedImageType);
    console.log(newUrl);

    $.ajax({
      type: 'post',
      async: true,
      url: serverURL,
      dataType: 'json',
      data: {img: newUrl},
      success: function (res) {
        console.log(res)
      },
      error: function (xhr, ts, et) {
        console.log(ts,et)
      }
    })
  }

};
