/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : tiaozao

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-09-01 12:50:31
*/

SET FOREIGN_KEY_CHECKS=0;

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
  `productNum` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('162', '2017-08-31 08:41:12', '2017-08-31 08:41:12', '4', '包邮', '￥66000', '0', '', '30', '[1,2,3]', '[10,3,2]');
INSERT INTO `orders` VALUES ('164', '2017-08-31 11:42:06', '2017-08-31 11:42:06', '4', '包邮', '￥66000', '0', '', '30', '[1,2,3]', '[10,3,2]');
INSERT INTO `orders` VALUES ('166', '2017-09-01 02:22:00', '2017-09-01 02:22:00', '6', '快递:￥5.00', '17500', '1', '', '1', '[2]', '[5]');
INSERT INTO `orders` VALUES ('167', '2017-09-01 03:04:12', '2017-09-01 03:04:12', '6', '快递:￥5.00', '15400', '0', '', '1', '[1]', '[7]');
