/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : tiaozao

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-08-07 21:17:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Image` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Carriage` varchar(255) DEFAULT NULL,
  `Destination` varchar(255) DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `CurPrice` varchar(255) DEFAULT NULL,
  `OldPrice` varchar(255) DEFAULT NULL,
  `IsBook` varchar(255) DEFAULT NULL,
  `Des` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('1', 'http://192.168.0.109:8020/node/img/productList/phone.jpg', '二手apple/苹果iphone5s手机三网无锁移动4G联通电信', '包邮', '上海', '挂起', '2200', '4868', '0', '二手apple/苹果iphone5s手机三网无锁移动4G联通电信', '2017-08-04 01:37:12', '2017-08-04 01:37:12');
INSERT INTO `products` VALUES ('2', 'http://192.168.0.109:8020/node/img/productList/laptop.jpg', '二手apple/苹果MacBookAirMC965CH/A笔记本电脑', '包邮', '上海', '挂起', '3500', '5288', '0', '二手apple/苹果MacBookAirMC965CH/A笔记本电脑', '2017-08-04 01:37:12', '2017-08-04 01:37:12');
INSERT INTO `products` VALUES ('3', 'http://192.168.0.109:8020/node/img/productList/book.jpg', '高等数学(上册)大学高等数学课程创新新教材丘维声', '包邮', '上海', '挂起', '35', '128', '1', '高等数学(上册)大学高等数学课程创新新教材丘维声', '2017-08-04 01:37:12', '2017-08-04 01:37:12');
INSERT INTO `products` VALUES ('4', 'http://192.168.0.109:8020/node/img/productList/bicycle.jpg', '捷安特24速变一体轮可折叠自行车', '包邮', '上海', '挂起', '350', '1358', '0', '捷安特24速变一体轮可折叠自行车', '2017-08-04 01:37:12', '2017-08-04 01:37:12');
