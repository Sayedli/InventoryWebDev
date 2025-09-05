$(document).ready(function() {
    $('#createCarForm').on('submit', function(event) {
        event.preventDefault();
  
        const carData = {
            manufacturer: $('#manufacturer').val(),
            model: $('#model').val(),
            year: $('#year').val(),
            color: $('#color').val(),
            price: $('#price').val(),
            mileage: $('#mileage').val()
        };
  
        $.ajax({
            url: `http://localhost:2000/cars`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(carData),
            success: function(response) {
                $('#createMessage').html('<div class="alert alert-success">Car added successfully!</div>');
                $('#createCarForm')[0].reset();
            },
            error: function(error) {
                $('#createMessage').html('<div class="alert alert-danger">Error adding car.</div>');
            }
        });
    });
  });
  