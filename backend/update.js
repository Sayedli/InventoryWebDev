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
              $('#carSelect').html(carOptions);
          },
          error: function(error) {
              $('#carSelect').html('<option class="text-danger">Error fetching cars.</option>');
          }
      });
  }

  function loadCarData(carId) {
      $.ajax({
          url: `http://localhost:2000/cars/${carId}`,
          type: 'GET',
          success: function(response) {
              if(response.length > 0) {
                  const car = response[0];
                  $('#id').val(car.id);
                  $('#manufacturer').val(car.manufacturer);
                  $('#model').val(car.model);
                  $('#year').val(car.year);
                  $('#color').val(car.color);
                  $('#price').val(car.price);
                  $('#mileage').val(car.mileage);
                  $('#updateCarForm').show();
              } else {
                  $('#updateMessage').html('<div class="alert alert-danger">Car not found.</div>');
              }
          },
          error: function(error) {
              $('#updateMessage').html('<div class="alert alert-danger">Error fetching car data.</div>');
          }
      });
  }

  $('#selectCarForm').on('submit', function(event) {
      event.preventDefault();
      const carId = $('#carSelect').val();
      loadCarData(carId);
  });

  $('#updateCarForm').on('submit', function(event) {
      event.preventDefault();

      const carData = {
          id: $('#id').val(),
          manufacturer: $('#manufacturer').val(),
          model: $('#model').val(),
          year: $('#year').val(),
          color: $('#color').val(),
          price: $('#price').val(),
          mileage: $('#mileage').val()
      };

      $.ajax({
          url: `http://localhost:2000/cars/${carData.id}`,
          type: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(carData),
          success: function(response) {
              $('#updateMessage').html('<div class="alert alert-success">Car updated successfully!</div>');
          },
          error: function(error) {
              $('#updateMessage').html('<div class="alert alert-danger">Error updating car.</div>');
          }
      });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get('id');
  if (carId) {
      loadCarData(carId);
  } else {
      loadCars();
  }
});
