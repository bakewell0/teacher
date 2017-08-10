/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : tiaozao

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-08-07 21:19:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for shopcars
-- ----------------------------
DROP TABLE IF EXISTS `shopcars`;
CREATE TABLE `shopcars` (
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
  `UserId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shopcars
-- ----------------------------
INSERT INTO `shopcars` VALUES ('17', 'http://192.168.0.109:8020/node/img/productList/laptop.jpg', '二手apple/苹果MacBookAirMC965CH/A笔记本电脑', '包邮', '上海', '挂起', '3500', '5288', '0', '二手apple/苹果MacBookAirMC965CH/A笔记本电脑', '3', '2017-08-04 02:46:39', '2017-08-04 02:46:39');
INSERT INTO `shopcars` VALUES ('18', 'http://192.168.0.109:8020/node/img/productList/phone.jpg', '二手apple/苹果iphone5s手机三网无锁移动4G联通电信', '包邮', '上海', '挂起', '2200', '4868', '0', '二手apple/苹果iphone5s手机三网无锁移动4G联通电信', '3', '2017-08-04 02:46:44', '2017-08-04 02:46:44');
INSERT INTO `shopcars` VALUES ('19', 'http://192.168.0.109:8020/node/img/productList/bicycle.jpg', '捷安特24速变一体轮可折叠自行车', '包邮', '上海', '挂起', '350', '1358', '0', '捷安特24速变一体轮可折叠自行车', '3', '2017-08-04 02:46:49', '2017-08-04 02:46:49');
INSERT INTO `shopcars` VALUES ('20', 'http://192.168.0.109:8020/node/img/productList/phone.jpg', '二手apple/苹果iphone5s手机三网无锁移动4G联通电信', '包邮', '上海', '挂起', '2200', '4868', '0', '二手apple/苹果iphone5s手机三网无锁移动4G联通电信', '4', '2017-08-07 01:32:03', '2017-08-07 01:32:03');
INSERT INTO `shopcars` VALUES ('21', 'http://192.168.0.109:8020/node/img/productList/phone.jpg', '二手apple/苹果iphone5s手机三网无锁移动4G联通电信', '包邮', '上海', '挂起', '2200', '4868', '0', '二手apple/苹果iphone5s手机三网无锁移动4G联通电信', '4', '2017-08-07 01:32:19', '2017-08-07 01:32:19');
INSERT INTO `shopcars` VALUES ('22', 'http://192.168.0.109:8020/node/img/productList/phone.jpg', '二手apple/苹果iphone5s手机三网无锁移动4G联通电信', '包邮', '上海', '挂起', '2200', '4868', '0', '二手apple/苹果iphone5s手机三网无锁移动4G联通电信', '4', '2017-08-07 01:32:24', '2017-08-07 01:32:24');
