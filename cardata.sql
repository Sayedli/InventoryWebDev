DROP DATABASE IF EXISTS `cardata`;
CREATE DATABASE IF NOT EXISTS `cardata`;
USE `cardata`;

CREATE TABLE `cars` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `manufacturer` VARCHAR(256) NOT NULL,
  `model` VARCHAR(256) NOT NULL,
  `year` INT NOT NULL,
  `price` DOUBLE NOT NULL,
  `mileage` DOUBLE NOT NULL,
  `color` VARCHAR(256) NOT NULL,
  `inWorkshop` BOOLEAN DEFAULT false,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `modifications` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `car_id` INT NOT NULL,
  `modification` TEXT NOT NULL,
  `completed` BOOLEAN DEFAULT false,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `cars` (`manufacturer`, `model`, `year`, `price`, `mileage`, `color`) VALUES
('Toyota', 'Corolla', 2020, 20000, 15000, 'Blue'),
('Ford', 'Mustang', 2021, 30000, 5000, 'Red'),
('BMW', 'X5', 2019, 50000, 30000, 'Black'),
('Honda', 'Civic', 2018, 18000, 40000, 'White'),
('Chevrolet', 'Impala', 2022, 35000, 2000, 'Silver'),
('Tesla', 'Model S', 2021, 80000, 10000, 'Black'),
('Audi', 'A4', 2020, 40000, 20000, 'White'),
('Mercedes-Benz', 'C-Class', 2019, 45000, 25000, 'Silver'),
('Volkswagen', 'Passat', 2018, 22000, 45000, 'Blue'),
('Hyundai', 'Elantra', 2020, 21000, 30000, 'Gray'),
('Nissan', 'Altima', 2019, 23000, 35000, 'Red'),
('Kia', 'Optima', 2021, 25000, 15000, 'Black'),
('Subaru', 'Impreza', 2018, 24000, 30000, 'Blue'),
('Mazda', 'CX-5', 2020, 27000, 10000, 'White'),
('Jeep', 'Wrangler', 2021, 35000, 5000, 'Green'),
('Dodge', 'Charger', 2019, 28000, 40000, 'Black'),
('Acura', 'TLX', 2020, 36000, 20000, 'Silver'),
('Cadillac', 'CT5', 2021, 40000, 5000, 'White'),
('Lexus', 'ES', 2019, 38000, 25000, 'Gray'),
('Infiniti', 'Q50', 2020, 42000, 15000, 'Black'),
('Volvo', 'S60', 2021, 45000, 8000, 'Blue'),
('Jaguar', 'XE', 2019, 47000, 30000, 'Red'),
('Porsche', 'Cayenne', 2021, 80000, 5000, 'Black'),
('Land Rover', 'Discovery', 2020, 65000, 12000, 'White'),
('Alfa Romeo', 'Giulia', 2019, 43000, 35000, 'Red'),
('Maserati', 'Ghibli', 2021, 75000, 5000, 'Blue'),
