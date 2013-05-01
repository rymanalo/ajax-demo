$(document).ready(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var input_value = $("<span>" + $('textarea').val() + "</span>");
    var lis = $("<li></li>");
    var checkBox = $('<input type="checkbox" id="checkbox">');
    var remove = $('<button class="remove"></button>');

    remove.on('click', function () {
      $(this).parent().remove();
    });

    checkBox.on('click', function() {
      var li = $(this).parent();
      if ($(this).prop('checked')) {
        $('.done').append(li).removeClass('not_done').addClass('done');
      }
      else {
        $('.not_done').append(li).removeClass('done').addClass('not_done');
      }
    });

    $.ajax({
      url: form.attr('action'),
      method: form.attr('method'),
      data: {"todo_item": {"name": input_value}},
      dataType: 'json',
      success: function() {
        $(checkBox).appendTo(lis);
        $(input_value).appendTo(lis);
        $(remove).appendTo(lis);
        $(lis).appendTo('.not_done');
        $("input_value").val('');
      },
      error: function() {
        alert("Couldn't add a todo because the server was broken :(");
      }
    });
  });
});