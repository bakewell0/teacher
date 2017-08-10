/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : tiaozao

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-08-10 14:27:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `headImage` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('4', '18821882252', '', 'e10adc3949ba59abbe56e057f20f883e', '2017-08-04 01:46:43', '2017-08-08 06:59:17', '章伟', 'http://192.168.0.109:8020/node/img/upload/4headImage.jpg', '男', '湖南省岳阳县麻塘镇');
INSERT INTO `users` VALUES ('5', '18673529524', '', 'e10adc3949ba59abbe56e057f20f883e', '2017-08-07 02:00:32', '2017-08-08 02:36:32', null, 'http://192.168.0.109:8020/node/img/upload/5headImage.jpg', null, null);
INSERT INTO `users` VALUES ('6', '13798331776', '', '96e79218965eb72c92a549dd5a330112', '2017-08-07 13:29:04', '2017-08-08 06:57:27', '我鼎2毫米', 'http://192.168.0.109:8020/node/img/upload/6headImage.jpg', '男', '湖南省长沙县黄兴镇兰田村菜鸟基地');
