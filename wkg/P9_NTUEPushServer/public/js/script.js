// DOM Ready =============================================================
$(document).ready(function() {
  // Push Notification
  $("#pushForm").on('click', '.btn-post', push);
});

// Push Notification
function push(event) {
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#pushForm input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
      var newPush = {
        'token': $('input#token').val(),
        'message': $('input#message').val()
      };
      // Use AJAX to post the object to our push service
      $.ajax({
        type: 'POST',
        data: newPush,
        url: '/tokens',
        dataType: 'JSON'
      });
    }
    else {
      // If errorCount is more than 0, error out
      alert('Please fill in all fields');
      return false;
    }
};
