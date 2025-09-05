$(document).ready(function() {
  function loadCarDetails(carId) {
      $.ajax({
          url: `http://localhost:2000/cars/${carId}`,
          type: 'GET',
          success: function(response) {
              if (response.length > 0) {
                  const car = response[0];
                  let carDetailsHtml = `
                      <tr><th>ID</th><td>${car.id}</td></tr>
                      <tr><th>Manufacturer</th><td>${car.manufacturer}</td></tr>
                      <tr><th>Model</th><td>${car.model}</td></tr>
                      <tr><th>Year</th><td>${car.year}</td></tr>
                      <tr><th>Color</th><td>${car.color}</td></tr>
                      <tr><th>Price</th><td>${car.price}</td></tr>
                      <tr><th>Mileage</th><td>${car.mileage}</td></tr>
                  `;
                  $('#carDetailsTable').html(carDetailsHtml);
              } else {
                  $('#carDetailsTable').html('<tr><td class="text-danger">Car not found.</td></tr>');
              }
          },
          error: function(error) {
              $('#carDetailsTable').html('<tr><td class="text-danger">Error fetching car details.</td></tr>');
          }
      });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get('id');
  if (carId) {
      loadCarDetails(carId);
  } else {
      $('#carDetailsTable').html('<tr><td class="text-danger">No car specified.</td></tr>');
  }
});
