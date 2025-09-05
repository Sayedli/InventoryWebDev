
# Car Inventory Web Application.    Author: Hassan Ali

## Description

The Car Inventory web application is designed to manage a car inventory system, allowing users to create, read, update, and delete car records. This application serves as a comprehensive tool for car dealerships, car enthusiasts, and inventory managers to keep track of their car collection efficiently. The application consists of a frontend for user interaction and a backend API for managing the data, including a database to store car details.

### Key Features
- **Create Car Records**: Add new cars to the inventory with details such as manufacturer, model, year, color, price, and mileage.
- **Read Car Records**: View all cars in the inventory, search for specific cars, and view detailed information for each car.
- **Update Car Records**: Modify existing car details.
- **Delete Car Records**: Remove cars from the inventory.
- **Move Cars to Workshop**: Move cars to a workshop for modifications.
- **Complete Modifications**: Mark car modifications as complete.
- **Responsive Design**: User-friendly interface that works across various devices and screen sizes.
- **Automated Image Retrieval**: Fetch car images from Unsplash based on car details.

### Technologies Used
- **Frontend**: HTML, CSS, JavaScript, jQuery, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **External APIs**: Unsplash for fetching car images

## Instructions

### Running the Backend

1. **Install Dependencies**:
   Ensure you have Node.js and npm installed. Navigate to the backend directory and install the required dependencies:
   ```bash
   npm install
   ```

2. **Start the Server**:
   Run the following command to start the backend server:
   ```bash
   node server.js
   ```
   The backend server will start at `http://localhost:2000`.

### Running the Frontend

1. **Setup**:
   No additional setup is required for the frontend. Ensure the backend server is running.

2. **Access the Frontend**:
   Open the `index.html` file in your web browser. This file is located in the frontend directory.

### Setting Up the Database

1. **Initialize the Database**:
   Ensure SQLite3 is installed on your system. Navigate to the backend directory and run the following command to initialize the database:
   ```bash
   sqlite3 cardata.db < cardata.sql
   ```

2. **Database Schema**:
   The `cardata.sql` file contains the schema for the car inventory database. It creates a table named `cars` with the following columns:
   - id (INTEGER PRIMARY KEY)
   - manufacturer (TEXT)
   - model (TEXT)
   - year (INTEGER)
   - color (TEXT)
   - price (REAL)
   - mileage (REAL)
   - inWorkshop (BOOLEAN DEFAULT false)

   Another table named `modifications` is created with the following columns:
   - id (INTEGER PRIMARY KEY)
   - car_id (INTEGER)
   - modification (TEXT)
   - completed (BOOLEAN DEFAULT false)

## Additional Notes

### Data Sources
The data for the car inventory is compiled manually and can be extended with additional details as required. For image retrieval, the application uses the Unsplash API to fetch relevant car images based on the manufacturer and model details provided. This integration helps in enhancing the visual representation of the car inventory.

Ensure you have a stable internet connection to allow the frontend to fetch car images from Unsplash when viewing car details.

### Web Service 2: Workshop

The workshop functionality allows users to move cars into a workshop for modifications and to mark those modifications as complete.

#### Move Car to Workshop

**Endpoint**: `PUT /cars/{id}/workshop`

**Description**: Moves a car to the workshop by its ID.

**Response**:
```json
{
    "status": "success",
    "message": "Car moved to workshop successfully"
}
```

#### Complete Modification

**Endpoint**: `PUT /modifications/{id}/complete`

**Description**: Marks a car modification as complete by its ID.

**Response**:
```json
{
    "status": "success",
    "message": "Modification completed successfully"
}
```
