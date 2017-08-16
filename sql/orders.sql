/*
 Navicat MySQL Data Transfer

 Source Server         : tiaozao
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : localhost:3306
 Source Schema         : tiaozao

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : 65001

 Date: 16/08/2017 10:27:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  `totalCost` varchar(50) DEFAULT NULL,
  `isInvoice` varchar(20) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `totalNum` varchar(20) DEFAULT NULL,
  `productId` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
