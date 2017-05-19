$(document).ready(function(){

  // get all the data on load of the page
  getAllalbums();

  $('#new-album-form').on('submit', function(event) {
    event.preventDefault()
    var newAlbumData = $(this).serialize();
    $(this).trigger("reset");
    $.ajax({
      method: 'POST',
      url: 'https://mutably.herokuapp.com/albums/',
      data: newAlbumData,
      success: handleAlbumAddResponse
    })
  })

  $(document).on('click', '.delete-btn', function() {
    var id = $(this).data('id')
    $.ajax({
      method: 'DELETE',
      url: 'https://mutably.herokuapp.com/albums/'+id,
      success: handleAlbumDeleteResponse
    })
  })

  $(document).on('click', '.edit-btn', function() {
    var id = $(this).data('id')

    // hide the static name, show the input field
    $('.name-'+id).hide()
    $('.input-'+id).show()

    // hide the edit button, show the save button
    $('.edit-'+id).hide()
    $('.save-'+id).show()

  })

  $(document).on('click', '.save-btn', function() {
    var id = $(this).data('id')

    // grab the user's inputted data
    var updatedname = $('.input-'+id+' input').val()
    $.ajax({
      method: 'PUT',
      url: 'https://mutably.herokuapp.com/albums/'+id,
      data: {name: updatedname},
      success: handleAlbumUpdateResponse
    })
  })
});

function getAllalbums() {
  $('.row').html('')
  $.ajax({
    method: 'GET',
    url: 'https://mutably.herokuapp.com/albums'
  }).done( function(data) {
    for (var i = 0; i < data.albums.length; i++) {
      $('.row').append(
        '<div class="col-sm-4 col-md-2-' + data.albums[i]._id + '">'
        + '<div class="thumbnail"><h3><span class="name-' + data.albums[i]._id + '">' + data.albums[i].name + '</span></h3>'
        + '<span class="form-inline edit-form input-' + data.albums[i]._id + '">&nbsp;<input class="form-control" value="' + data.albums[i].name + '"/></span>'
        + '<img src="/images/record.jpg"><div class="caption"><h6>' + data.albums[i].releaseDate + '</p><h4>' + data.albums[i].artistName + '</h4><p class="shadows">' + data.albums[i].genres + '</h6></div>'
        + '<button class="btn btn-primary edit-btn edit-' + data.albums[i]._id + '" data-id="' + data.albums[i]._id + '">Edit</button>'
        + '<button class="btn btn-success save-btn save-' + data.albums[i]._id + '" data-id="' + data.albums[i]._id + '">Save</button>'
        + '<button class="btn btn-danger delete-btn" data-id="' + data.albums[i]._id + '">Delete</button>'
      )
    }
  })
}

function handleAlbumAddResponse(data) {
  // reretrieve and rerender all the albums
  getAllalbums();
}

function handleAlbumDeleteResponse(data) {
  var albumId = data._id;
  var $row = $('.col-md-2-' + albumId);
  // remove that album div
  $row.remove();
}

function handleAlbumUpdateResponse(data) {
  var id = data._id;

  // replace the old name with the new name
  $('.name-'+id).html('&nbsp;'+data.name)

  $('.name-'+id).show()
  $('.input-'+id).hide()
  $('.edit-'+id).show()
  $('.save-'+id).hide()
}
