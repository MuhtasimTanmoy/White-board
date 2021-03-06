function openFile(event) {
  start = 0
  byte_index = 0
  var input = event.target;
  $("#file_size_sent").text(input.files[0].size);
  $("#progress_sent").show();
  console.log(input.files[0]);
  console.log("File input");
  var incrementer = 0;
  var reader = new FileReader();
  blob_data_send({new_file: true, new_size: input.files[0].size, new_type: input.files[0].type, new_name: input.files[0].name});
  reader.onload = function() {
    arrayBuffer = reader.result;
    buffer_array = new Uint8Array(arrayBuffer);
    blob_data_send({new_pieces: buffer_array});
    start = start + chunk_size;
    if (start >= input.files[0].size) {

      blob_data_send({done: true});
      $("#sent_files").prepend('<li><h3 style="color:#3f3f3f">' + input.files[0].name + '</h3></li>');
      $("#sent").text('100.00%');

    } else {

      $("#sent").text(((start / input.files[0].size) * 100).toFixed(2) + '%');
      reader.readAsArrayBuffer(input.files[0].slice(start, start + chunk_size));

    }
    //console.log(arrayBuffer);

  };
  reader.readAsArrayBuffer(input.files[0].slice(0, chunk_size));

}



$(document).ready(function(){
  $('form input').change(function () {
    //console.log(this.files[0]);
    $('form div').html("<p>"+this.files[0].name+"</p> <p> sent to your partner.</p>");

    start = 0
    byte_index = 0
    var input = this;
    $("#file_size_sent").text(input.files[0].size);
    $("#progress_sent").show();
    //console.log(input.files[0]);
    console.log("File input");
    var incrementer = 0;
    var reader = new FileReader();
    blob_data_send({new_file: true, new_size: input.files[0].size, new_type: input.files[0].type, new_name: input.files[0].name});
    reader.onload = function() {
      arrayBuffer = reader.result;
      buffer_array = new Uint8Array(arrayBuffer);
      blob_data_send({new_pieces: buffer_array});
      start = start + chunk_size;
      if (start >= input.files[0].size) {

        blob_data_send({done: true});
        $("#sent_files").prepend('<li>' + input.files[0].name + '</li>');
        $("#sent").text('100.00%');

      } else {

        $("#sent").text(((start / input.files[0].size) * 100).toFixed(2) + '%');
        reader.readAsArrayBuffer(input.files[0].slice(start, start + chunk_size));

      }
      //console.log(arrayBuffer);

    };
    reader.readAsArrayBuffer(input.files[0].slice(0, chunk_size));
  });
});

function blob_data_send(data) {
  console.log(data);
  if (blobConnection != null && blobConnection.open == true) {
    blobConnection.send(data);
  } else {
    console.log("not sending");
  }
}
