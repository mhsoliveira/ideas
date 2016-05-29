// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    // Add User button click
    $('#btnAddIdea').on('click', addIdea);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/jsoncall/Point', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.name + '">' + this.name + '</a></td>';
            tableContent += '<td>' + this.type + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisIdeaName = $(this).attr('rel');

      $.getJSON( '/mapjson/'+thisIdeaName, function( data ) {
        //Populate Info Box
        $('#ideaInfoName').text(data.name);
        $('#ideaInfoType').text(data.type);
        $('#ideaInfoDesc').text(data.desc);
        $('#ideaInfoLocation').text(data.coordinates.toString());
  });
};

// Add User
function addIdea(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newIdea = {
            'name': $('#addUser fieldset input#inputIdeaName').val(),
            'type': $('#addUser fieldset input#inputIdeaType').val(),
            'desc': $('#addUser fieldset input#inputIdeaDesc').val(),
            'coordinates': $('#addUser fieldset input#inputIdeaLocation').val(),
            }
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newIdea,
            url: '/newidea',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.message === 'You have got an idea!') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert(err);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
