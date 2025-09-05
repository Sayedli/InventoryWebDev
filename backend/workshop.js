$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('carId');
    if (carId) {
      $('#carId').val(carId);
      loadModifications(carId);
    }
  
    function loadModifications(carId) {
      $.ajax({
        url: `http://localhost:2000/modifications/${carId}`,
        type: 'GET',
        success: function (response) {
          let modificationTableHtml = '';
          response.forEach(function (mod) {
            modificationTableHtml += `
              <tr>
                <td>${mod.id}</td>
                <td>${mod.car_id}</td>
                <td>${mod.modification}</td>
                <td>
                  <button class="btn btn-success complete-btn" data-id="${mod.id}">Complete</button>
                  <button class="btn btn-danger delete-btn" data-id="${mod.id}">Delete</button>
                </td>
              </tr>
            `;
          });
          $('#modificationTable').html(modificationTableHtml);
        },
        error: function (error) {
          console.error('Error fetching modifications:', error);
        }
      });
    }
  
    $('#addModificationForm').on('submit', function (event) {
      event.preventDefault();
      const modificationData = {
        car_id: $('#carId').val(),
        modification: $('#modification').val()
      };
  
      $.ajax({
        url: 'http://localhost:2000/modifications',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(modificationData),
        success: function (response) {
          alert('Modification added successfully!');
          loadModifications($('#carId').val());
        },
        error: function (error) {
          console.error('Error adding modification:', error);
        }
      });
    });
  
    $(document).on('click', '.complete-btn', function () {
      const modId = $(this).data('id');
      $.ajax({
        url: `http://localhost:2000/modifications/${modId}/complete`,
        type: 'PUT',
        success: function (response) {
          alert('Modification Completed!');
          loadModifications($('#carId').val());
        },
        error: function (error) {
          console.error('Error completing modification:', error);
        }
      });
    });
  
    $(document).on('click', '.delete-btn', function () {
      const modId = $(this).data('id');
      $.ajax({
        url: `http://localhost:2000/modifications/${modId}`,
        type: 'DELETE',
        success: function (response) {
          loadModifications($('#carId').val());
        },
        error: function (error) {
          console.error('Error deleting modification:', error);
        }
      });
    });
  });
  