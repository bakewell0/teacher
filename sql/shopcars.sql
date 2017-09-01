/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : tiaozao

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-09-01 12:51:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for shopcars
-- ----------------------------
DROP TABLE IF EXISTS `shopcars`;
CREATE TABLE `shopcars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProductNumber` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shopcars
-- ----------------------------
INSERT INTO `shopcars` VALUES ('5', '4', '1', '2017-08-18 01:05:33', '2017-08-24 09:19:19', '10');
INSERT INTO `shopcars` VALUES ('6', '6', '2', '2017-08-18 06:47:52', '2017-08-23 09:43:14', '5');
INSERT INTO `shopcars` VALUES ('7', '4', '2', '2017-08-18 06:59:08', '2017-08-24 09:20:31', '3');
INSERT INTO `shopcars` VALUES ('8', '6', '1', '2017-08-18 07:18:23', '2017-08-31 02:28:37', '7');
INSERT INTO `shopcars` VALUES ('9', '6', '4', '2017-08-18 07:18:30', '2017-08-18 07:18:30', '1');
INSERT INTO `shopcars` VALUES ('10', '6', '3', '2017-08-18 07:18:42', '2017-08-23 09:28:15', '2');
INSERT INTO `shopcars` VALUES ('11', '4', '3', '2017-08-24 09:20:07', '2017-08-24 09:20:35', '2');
