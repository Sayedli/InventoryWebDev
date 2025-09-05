$(document).ready(function() {
  function loadCars() {
      $.ajax({
          url: `http://localhost:2000/cars`,
          type: 'GET',
          success: function(response) {
              let carOptions = '';
              response.forEach(car => {
                  carOptions += `<option value="${car.id}">${car.manufacturer} ${car.model} (${car.year})</option>`;
              });
              $('#car').html(carOptions);
          },
          error: function(error) {
              $('#car').html('<option class="text-danger">Error fetching cars.</option>');
          }
      });
  }

  $('#deleteCarForm').on('submit', function(event) {
      event.preventDefault();

      const carId = $('#car').val();

      $.ajax({
          url: `http://localhost:2000/cars/${carId}`,
          type: 'DELETE',
          success: function(response) {
              $('#deleteMessage').html('<div class="alert alert-success">Car deleted successfully!</div>');
              loadCars();
          },
          error: function(error) {
              $('#deleteMessage').html('<div class="alert alert-danger">Error deleting car.</div>');
          }
      });
  });

  loadCars();
});
