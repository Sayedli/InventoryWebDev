$(document).ready(function () {
    let currentSort = {
        column: 'year',
        order: 'asc' // Default order is ascending
    };

    function loadCars(searchQuery = '', sortBy = 'year', sortOrder = 'asc') {
        $.ajax({
            url: 'http://localhost:2000/cars',
            type: 'GET',
            success: function (response) {
                const filteredCars = response.filter(car => 
                    car.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    car.model.toLowerCase().includes(searchQuery.toLowerCase())
                );

                filteredCars.sort((a, b) => {
                    if (sortOrder === 'asc') {
                        return a[sortBy] > b[sortBy] ? 1 : -1;
                    } else {
                        return a[sortBy] < b[sortBy] ? 1 : -1;
                    }
                });

                let carTableHtml = '';
                let workshopTableHtml = '';

                filteredCars.forEach(car => {
                    let carRow = `
                        <tr>
                            <td>${car.manufacturer}</td>
                            <td>${car.model}</td>
                            <td>${car.year}</td>
                            <td>${car.color}</td>
                            <td>${car.price}</td>
                            <td>
                                <button class="btn btn-primary btn-sm view-car" data-id="${car.id}">View</button>
                                <button class="btn btn-warning btn-sm update-car" data-id="${car.id}">Update</button>
                                <button class="btn btn-danger btn-sm delete-car" data-id="${car.id}">Delete</button>
                                <button class="btn btn-secondary btn-sm modify-car" data-id="${car.id}">Modify</button>
                            </td>
                        </tr>
                    `;

                    if (car.inWorkshop) {
                        workshopTableHtml += carRow;
                    } else {
                        carTableHtml += carRow;
                    }
                });

                $('#carTable').html(carTableHtml || '<tr><td colspan="6" class="text-center">No cars found.</td></tr>');
                $('#workshopTable').html(workshopTableHtml || '<tr><td colspan="6" class="text-center">No cars found.</td></tr>');
            },
            error: function (error) {
                console.error('Error fetching cars:', error);
                $('#carTable').html('<tr><td colspan="6" class="text-danger">Error fetching cars.</td></tr>');
                $('#workshopTable').html('<tr><td colspan="6" class="text-danger">Error fetching cars.</td></tr>');
            }
        });
    }

    function updateSortButton() {
        $('#sortYear').html(currentSort.column === 'year' && currentSort.order === 'asc' ? '&#9650;' : '&#9660;');
        $('#sortPrice').html(currentSort.column === 'price' && currentSort.order === 'asc' ? '&#9650;' : '&#9660;');
        $('#sortYearWorkshop').html(currentSort.column === 'year' && currentSort.order === 'asc' ? '&#9650;' : '&#9660;');
        $('#sortPriceWorkshop').html(currentSort.column === 'price' && currentSort.order === 'asc' ? '&#9650;' : '&#9660;');
    }

    $('#searchCar').on('input', function() {
        const searchQuery = $(this).val();
        loadCars(searchQuery, currentSort.column, currentSort.order);
    });

    $(document).on('click', '.sortable-header button', function() {
        const column = $(this).parent().data('sort');
        if (currentSort.column === column) {
            currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
        } else {
            currentSort.column = column;
            currentSort.order = 'asc';
        }
        updateSortButton();
        const searchQuery = $('#searchCar').val();
        loadCars(searchQuery, currentSort.column, currentSort.order);
    });

    $(document).on('click', '.view-car', function() {
        const carId = $(this).data('id');
        window.location.href = `view.html?id=${carId}`;
    });

    $(document).on('click', '.update-car', function() {
        const carId = $(this).data('id');
        window.location.href = `update.html?id=${carId}`;
    });

    $(document).on('click', '.delete-car', function() {
        const carId = $(this).data('id');
        $.ajax({
            url: `http://localhost:2000/cars/${carId}`,
            type: 'DELETE',
            success: function() {
                alert('Car deleted successfully!');
                const searchQuery = $('#searchCar').val();
                loadCars(searchQuery, currentSort.column, currentSort.order);
            },
            error: function(error) {
                alert('Error deleting car.');
            }
        });
    });

    $(document).on('click', '.modify-car', function() {
        const carId = $(this).data('id');
        $.ajax({
            url: `http://localhost:2000/cars/${carId}/workshop`,
            type: 'PUT',
            success: function() {
                window.location.href = `workshop.html?carId=${carId}`;
            },
            error: function(error) {
                console.error('Error moving car to workshop:', error);
            }
        });
    });

    updateSortButton();
    loadCars();
});
