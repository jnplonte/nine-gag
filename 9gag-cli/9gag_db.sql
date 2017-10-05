-- phpMiniAdmin dump 1.9.170312
-- Datetime: 2017-10-02 17:10:57
-- Host: 
-- Database: 9gag_db

/*!40030 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iId` varchar(100) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  `link` varchar(500) DEFAULT NULL,
  `image` text,
  `video` text,
  `carousel` text,
  `type` varchar(100) DEFAULT 'image',
  `caption` varchar(500) DEFAULT NULL,
  `likeCount` int(11) DEFAULT '0',
  `commentCount` int(11) DEFAULT '0',
  `createdTime` int(20) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `post` DISABLE KEYS */;
/*!40000 ALTER TABLE `post` ENABLE KEYS */;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;


-- phpMiniAdmin dump end
