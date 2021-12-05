CREATE DATABASE stationgame;
USE stationgame;

CREATE TABLE `products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   `creation_date` DATETIME NOT NULL,
   `modified_date` DATETIME,
   `deletion_date` DATETIME,
   `price` INT NOT NULL,
   `gallery` VARCHAR(255),
   `category_id` INT NOT NULL,
   `brand_id` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `brands` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products_order` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `product_id` INT NOT NULL,
   `order_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `order` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `creation_date` DATETIME NOT NULL,
   `modified_date` DATETIME,
   `state` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `states` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50),
   `email` VARCHAR(50) NOT NULL,
   `password` VARCHAR(50) NOT NULL,
   `creation_date` DATETIME NOT NULL,
   `admin` TINYINT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `users_orders` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `user_id` INT NOT NULL,
   `order_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `products` ADD CONSTRAINT `FK_c8644b52-5367-4a21-9a14-08306a03d3af` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `products` ADD CONSTRAINT `FK_2488dbeb-9c03-4368-a401-3d76bdd021f5` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `products_order` ADD CONSTRAINT `FK_62fe7007-13d5-48e9-9d52-65c332a2159e` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `products_order` ADD CONSTRAINT `FK_dd971fd4-a3df-46ea-a7ce-186a239229bf` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `order` ADD CONSTRAINT `FK_727cc25f-665a-42a2-8e44-d999df931ce1` FOREIGN KEY (`state`) REFERENCES `states`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `users_orders` ADD CONSTRAINT `FK_f94be288-9da1-4af7-acf7-30f2da8971ba` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `users_orders` ADD CONSTRAINT `FK_95582777-d240-4e51-b845-8f80169fb8ec` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`)  ;

