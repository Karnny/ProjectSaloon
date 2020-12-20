-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2020 at 11:57 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saloon`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `appointment_details` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `appointment_date` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `appointment_cardnumber` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `booking_totalprice` double DEFAULT NULL,
  `booker_id` smallint(6) NOT NULL,
  `store_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `appointment_details`, `appointment_date`, `appointment_cardnumber`, `booking_totalprice`, `booker_id`, `store_id`) VALUES
(13, 'ght ynzerb', '2020-12-08', '45534534534', 703938, 9, 24),
(14, 'gfdyrntrhtb', '2020-12-08', '554534453453', 777, 9, 23),
(15, 'dggikfdnjgd', '2020-12-09', '5555555555555', 666, 9, 25),
(16, 'this is a booking details ', '2020-12-11', '34252525252', 703938, 9, 24),
(17, 'hsdthhs', '2020-12-10', '23423423', 777, 12, 23),
(18, 'Free cutz plz', '2020-12-07', '55555555555', 250, 12, 30);

-- --------------------------------------------------------

--
-- Table structure for table `appointment_has_services`
--

CREATE TABLE `appointment_has_services` (
  `app_has_service_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `appointment_has_services`
--

INSERT INTO `appointment_has_services` (`app_has_service_id`, `appointment_id`, `service_id`) VALUES
(25, 13, 8),
(26, 13, 9),
(27, 14, 6),
(28, 14, 7),
(29, 15, 10),
(30, 16, 8),
(31, 16, 9),
(32, 17, 6),
(33, 17, 7),
(34, 18, 20),
(35, 18, 21);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `service_time` int(11) NOT NULL,
  `service_price` double DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `service_name`, `service_time`, `service_price`, `store_id`) VALUES
(6, 'sss', 67, 555, 23),
(7, 'KOKOK', 12, 222, 23),
(8, 'bunshin', 30, 6969, 24),
(9, 'katon no jutsu', 69, 696969, 24),
(10, 'one page then sleep', 1, 666, 25),
(11, 'one page miracle', 1, 555, 25),
(12, 'skip page that exist in exam', 1, 444, 25),
(13, 'Service 1', 50, 100, 26),
(14, 'Service 2', 60, 300, 26),
(15, 'KK stylee', 50, 100, 27),
(16, 'KK stylee', 50, 100, 28),
(17, 'KS 2', 20, 233, 28),
(18, 'LP 1', 15, 200, 29),
(19, 'LP 2', 60, 200, 29),
(20, 'Nan hair style 01', 20, 50, 30),
(21, 'Nan hair dye', 60, 200, 30);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `store_id` int(11) NOT NULL,
  `store_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `store_details` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `store_location_lat` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `store_location_long` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `store_banner_image` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `store_owner` smallint(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`store_id`, `store_name`, `store_details`, `store_location_lat`, `store_location_long`, `store_banner_image`, `store_owner`) VALUES
(23, 'CoolAndHandsome', 'Stay handsome even asleep', '13.738009319568686', '100.53370025933837', '1607274963969_9.jpg', 9),
(24, 'Legendary physicist', 'everythings can be happen if this card was showed', '13.736717', '100.523186', '1607281022316_10.jpg', 10),
(25, 'ONE NIGHT MIRACLE', 'Miracle can be happend if you belive in professor.', '13.736717', '100.523186', '1607289322388_11.jpg', 11),
(26, 'Chiang Mai Barber', 'test shop detaill', '18.828316175166652', '98.996086390625', '1607307201124_9.jpg', 9),
(27, 'KK Barber', 'kk baber shop', '16.372850523202516', '102.863273890625', '1607307379841_9.jpg', 9),
(28, 'KK Barber 2', 'kk baber shop 2', '16.372850523202516', '102.863273890625', '1607307455226_9.jpg', 9),
(29, 'Lampang Barber', 'Lampangg storerer', '18.302380526253753', '99.4849779921875', '1607307534574_9.jpg', 9),
(30, 'Nan barber', 'Its a Nan barber!', '18.776315896034337', '100.76488521875', '1607311290458_14.jpg', 14);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` smallint(5) NOT NULL,
  `fullname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone_number` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(15) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `fullname`, `phone_number`, `email`, `username`, `password`, `role`) VALUES
(1, NULL, NULL, '', 'admin', '1234', 'Barber'),
(9, 'ddd', '12345', 'dsf', 'fffd', '$2b$10$5ky07dGZSf/Q0mBeVn5/4uL4fz4x3lpTQ9ofqMfwMWo0dXeWbRddm', 'barber'),
(10, 'xiao', '6699999999', 'songphrajalearn@xiao', 'vongola10', '$2b$10$qnuhvq7W8duu5mLc8Q45X.EcyU.xMVibtaWpzKfWhvP0ILDt.FX3y', 'barber'),
(11, 'Timortheo', '6969696969', 'vongola9@vongala.com', 'vongola9', '$2b$10$59d/sbrWD2ppDz8zldynQ.rA7xOBbT32T/eit8QK9NnT4xi9736T6', 'barber'),
(12, 'Siwakiat', '997898989', 'sivakait@gmail.com', 'siwakiat_customer', '$2b$10$VO5teO8eyGG1A2EwrP0XHOSZo3WHHR1cq9Mq9IWoVCkuoiDIGl6Hq', 'customer'),
(13, 'Siwakiat Barber', '43453453534', 'sivakait@gmail.com', 'siwakiat_barber', '$2b$10$rtL3jFhpPfOFQEoT.oOa7elWq/IbBEylsn.r5.WaAn3Qeyt/2gxL.', 'customer'),
(14, 'Siwakiat Barber 2', '34234324', 'sivakait@gmail.com', 'siwakiat_barber2', '$2b$10$mPdIzJIPdEtuIrgAC2wBJu8Xj6nKf5nHsqyBR3vaDZGepnNMRQukq', 'barber'),
(15, 'chao', '6969696969', 'mao@chuangchuang.com', 'mao', '$2b$10$DP7bM.mEIctp0m/j4xKcFeob3MgTdeDVOqdINYQbh7ugki8tiarW.', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `fk_bookerToUser` (`booker_id`),
  ADD KEY `fk_storeIDToStores` (`store_id`);

--
-- Indexes for table `appointment_has_services`
--
ALTER TABLE `appointment_has_services`
  ADD PRIMARY KEY (`app_has_service_id`),
  ADD KEY `fk_ahsToAM` (`appointment_id`),
  ADD KEY `fk_ahsToServices` (`service_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `fk_service.store_id_ref_stores.store_id` (`store_id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`store_id`),
  ADD KEY `fk_ownerToUser` (`store_owner`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `appointment_has_services`
--
ALTER TABLE `appointment_has_services`
  MODIFY `app_has_service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `store_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `fk_bookerToUser` FOREIGN KEY (`booker_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_storeIDToStores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`);

--
-- Constraints for table `appointment_has_services`
--
ALTER TABLE `appointment_has_services`
  ADD CONSTRAINT `fk_ahsToAM` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`),
  ADD CONSTRAINT `fk_ahsToServices` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`);

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `fk_service.store_id_ref_stores.store_id` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`);

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `fk_ownerToUser` FOREIGN KEY (`store_owner`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
