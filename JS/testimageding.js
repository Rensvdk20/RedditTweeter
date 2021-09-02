BlobBuilder             = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;

var url                 = "https://i.redd.it/b2ghjy22pyi41.jpg";
var request             = new XMLHttpRequest();
request.open ("GET", url, false);
request.responseType    = "arraybuffer";
request.send (null);

if (request.status === 200) {
    var bb              = new BlobBuilder ();
    bb.append (request.response); // Note: not request.responseText

    var blob            = bb.getBlob ('image/png');
    var reader          = new FileReader ();
    reader.onload       = function (zFR_Event) {
        $("body").prepend ('<p>New image: <img src="' + zFR_Event.target.result + '"></p>')
    };

    reader.readAsDataURL (blob);
}