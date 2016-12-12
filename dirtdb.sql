CREATE DATABASE  IF NOT EXISTS `dirtdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dirtdb`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dirtdb
-- ------------------------------------------------------
-- Server version	5.5.49-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contractors`
--

DROP TABLE IF EXISTS `contractors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contractors` (
  `id` binary(16) NOT NULL,
  `email` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contractors`
--

LOCK TABLES `contractors` WRITE;
/*!40000 ALTER TABLE `contractors` DISABLE KEYS */;
INSERT INTO `contractors` VALUES ('K\Æ\Ôb½—\æ ù H\Â|2','philip@vo.com','Philip','Vo','$2a$10$OST9NHY4c886YQOykzDw8.ZubdbpOcUf.TqRg3vgkVLMQCQJUpFk.','2016-12-08 14:38:27','2016-12-08 14:38:27'),('\íKúÓ¼\Ï\æ ù H\Â|2','elliot@young.com','Elliot','Young','$2a$10$rNFSEeWO1tlEqaI3pZ4eDODtu8EoXK.dqZOBr6eUOTtXPfNig6geq','2016-12-07 14:51:18','2016-12-07 14:51:18');
/*!40000 ALTER TABLE `contractors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` binary(16) NOT NULL,
  `uri` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `job_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `uri_UNIQUE` (`uri`),
  KEY `fk_images_jobs1_idx` (`job_id`),
  CONSTRAINT `fk_images_jobs1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` binary(16) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `completion_date` datetime NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `pickup_only` tinyint(1) DEFAULT '0',
  `loader_onsite` tinyint(1) DEFAULT '0',
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `contractor_id` binary(16) NOT NULL,
  `trucker_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_jobs_users_idx` (`contractor_id`),
  KEY `fk_jobs_truckers1_idx` (`trucker_id`),
  CONSTRAINT `fk_jobs_contractors` FOREIGN KEY (`contractor_id`) REFERENCES `contractors` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_jobs_truckers` FOREIGN KEY (`trucker_id`) REFERENCES `truckers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES ('N\Ôz½\0\æ ù H\Â|2',321.12,'2016-12-07 08:00:00','21fg',NULL,NULL,'321','21',12,'2016-12-07 20:35:46','2016-12-07 20:35:46','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('\\‘<¼ÿ\æ ù H\Â|2',54.43,'2016-12-31 08:00:00','Grainy af',1,NULL,NULL,NULL,NULL,'2016-12-07 20:29:09','2016-12-07 20:29:09','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('!mê¥¼\Ò\æ ù H\Â|2',5.00,'2016-12-07 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 15:07:05','2016-12-07 15:07:05','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('#%\ØE¼\×\æ ù H\Â|2',423.00,'2016-12-17 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 15:42:55','2016-12-07 15:42:55','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('*\\‘n½\æ ù H\Â|2',534.12,'2016-12-29 08:00:00',NULL,NULL,NULL,'1105 Cantara Court','San Jose',95127,'2016-12-07 20:43:46','2016-12-07 20:43:46','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('*‘\"/½˜\æ ù H\Â|2',137735.41,'2016-12-16 08:00:00','Testing date',1,1,NULL,NULL,NULL,'2016-12-08 14:44:40','2016-12-08 14:44:40','K\Æ\Ôb½—\æ ù H\Â|2',NULL),('1‘É–¼\Û\æ ù H\Â|2',123.00,'2016-12-07 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 16:11:57','2016-12-07 16:11:57','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('BY6¼\Ñ\æ ù H\Â|2',5657.00,'2016-12-07 08:00:00',NULL,1,0,NULL,NULL,NULL,'2016-12-07 15:00:50','2016-12-07 15:00:50','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('LFôÇ¼\Ü\æ ù H\Â|2',321.00,'2016-12-08 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 16:19:52','2016-12-07 16:19:52','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('`6\ÏZ¼\Ò\æ ù H\Â|2',213.00,'2016-12-07 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 15:08:50','2016-12-07 15:08:50','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('fAª¼\Û\æ ù H\Â|2',321.00,'2016-12-17 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 16:13:26','2016-12-07 16:13:26','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('y×¡¼\Ø\æ ù H\Â|2',23.00,'2016-12-08 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 15:52:29','2016-12-07 15:52:29','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('‡§/¸¼\Ø\æ ù H\Â|2',321.00,'2016-12-16 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 15:52:53','2016-12-07 15:52:53','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('ˆiW¼þ\æ ù H\Â|2',76734.00,'2016-12-17 08:00:00','Very dirty',0,1,'1920 Zanker Road','San Jose',95127,'2016-12-07 20:24:55','2016-12-07 20:24:55','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('›Û¼\Ó\æ ù H\Â|2',312.00,'2016-12-07 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 15:17:20','2016-12-07 15:17:20','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('ŸH\ì¼\Ö\æ ù H\Â|2',432.00,'2016-12-08 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 15:39:13','2016-12-07 15:39:13','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),(' >ß¼\Ü\æ ù H\Â|2',321.00,'2016-12-07 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 16:22:12','2016-12-07 16:22:12','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('¥\ëúŽ½\0\æ ù H\Â|2',70.50,'2016-12-25 08:00:00','grainnnnnnnnnny',NULL,NULL,'1105 Cantara Court','San Jose',95127,'2016-12-07 20:40:04','2016-12-07 20:40:04','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('«¼]Ö½\æ ù H\Â|2',321.56,'2016-12-14 08:00:00','ashyyyyy',0,0,'1105 Cantara Court','San Jose',95127,'2016-12-07 20:47:23','2016-12-07 20:47:23','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('·ž{¼\×\æ ù H\Â|2',123.00,'2016-12-08 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 15:47:04','2016-12-07 15:47:04','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('\Ã9)ù¼\Û\æ ù H\Â|2',423.00,'2016-12-08 08:00:00',NULL,1,NULL,NULL,NULL,NULL,'2016-12-07 16:16:02','2016-12-07 16:16:02','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('\Ý,µ§¼ÿ\æ ù H\Â|2',321.12,'2016-12-07 08:00:00','dqw',1,1,NULL,NULL,NULL,'2016-12-07 20:34:27','2016-12-07 20:34:27','\íKúÓ¼\Ï\æ ù H\Â|2',NULL),('\ëfþ¼\Ö\æ ù H\Â|2',432.00,'2016-12-31 00:00:00','rainy so moist',0,1,'1105 Cantara Court','San Jose',95127,'2016-12-07 15:41:21','2016-12-08 12:36:23','\íKúÓ¼\Ï\æ ù H\Â|2',NULL);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` binary(16) NOT NULL,
  `sender` tinyint(1) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `pending_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_messages_pendings1_idx` (`pending_id`),
  CONSTRAINT `fk_messages_pendings1` FOREIGN KEY (`pending_id`) REFERENCES `pendings` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES ('\\^_À\æ¹ñ H\Â|2',0,'he sonny','2016-12-11 18:23:47','2016-12-11 18:23:47','¹€È½\Þ\æ ù H\Â|2'),('&*;¾]\æ ù H\Â|2',0,'d','2016-12-09 14:13:26','2016-12-09 14:13:26','¹€È½\Þ\æ ù H\Â|2'),('-¾]\æ ù H\Â|2',0,'f','2016-12-09 14:13:28','2016-12-09 14:13:28','¹€È½\Þ\æ ù H\Â|2'),('/{\ÜÀ\æ¹ñ H\Â|2',1,'hey elliot','2016-12-11 18:24:12','2016-12-11 18:24:12','¹€È½\Þ\æ ù H\Â|2'),('ð\Ë&¾]\æ ù H\Â|2',0,'a','2016-12-09 14:13:37','2016-12-09 14:13:37','¹€È½\Þ\æ ù H\Â|2'),('1³…¾]\æ ù H\Â|2',0,'d','2016-12-09 14:13:40','2016-12-09 14:13:40','¹€È½\Þ\æ ù H\Â|2'),(']-À\æ¹ñ H\Â|2',1,'Hey Sonny','2016-12-11 18:53:11','2016-12-11 18:53:11','¹€È½\Þ\æ ù H\Â|2'),('#¾\ØÀ\æ¹ñ H\Â|2',1,'asd','2016-12-11 18:53:20','2016-12-11 18:53:20','¹€È½\Þ\æ ù H\Â|2'),('%ˆŒ.À\æ¹ñ H\Â|2',1,'good to hear','2016-12-11 18:31:54','2016-12-11 18:31:54','¹€È½\Þ\æ ù H\Â|2'),('17pJÀ\æ¹ñ H\Â|2',0,'czx','2016-12-11 18:53:42','2016-12-11 18:53:42','¹€È½\Þ\æ ù H\Â|2'),('5k\çË¾]\æ ù H\Â|2',0,'12','2016-12-09 14:14:32','2016-12-09 14:14:32','¹€È½\Þ\æ ù H\Â|2'),('6ýG3¾]\æ ù H\Â|2',0,'dw','2016-12-09 14:14:35','2016-12-09 14:14:35','¹€È½\Þ\æ ù H\Â|2'),('7ý€À\æ¹ñ H\Â|2',0,'good... good','2016-12-11 18:32:24','2016-12-11 18:32:24','¹€È½\Þ\æ ù H\Â|2'),('@˜k¾¾[\æ ù H\Â|2',0,'d232','2016-12-09 14:00:32','2016-12-09 14:00:32','¹€È½\Þ\æ ù H\Â|2'),('@Ð–2¾]\æ ù H\Â|2',0,'sd','2016-12-09 14:14:51','2016-12-09 14:14:51','¹€È½\Þ\æ ù H\Â|2'),('A\×\Çÿ¾]\æ ù H\Â|2',0,'dasds','2016-12-09 14:14:53','2016-12-09 14:14:53','¹€È½\Þ\æ ù H\Â|2'),('Cº¬¾]\æ ù H\Â|2',0,'asdas','2016-12-09 14:14:55','2016-12-09 14:14:55','¹€È½\Þ\æ ù H\Â|2'),('G­ÇŸÀ\æ¹ñ H\Â|2',0,'how about now?','2016-12-11 18:40:01','2016-12-11 18:40:01','¹€È½\Þ\æ ù H\Â|2'),('I\êñÀ\æ¹ñ H\Â|2',1,'yep','2016-12-11 18:40:05','2016-12-11 18:40:05','¹€È½\Þ\æ ù H\Â|2'),('R3½¾X\æ ù H\Â|2',0,'good how are you','2016-12-09 13:39:33','2016-12-09 13:39:33','¹€È½\Þ\æ ù H\Â|2'),('R„\á0À\æ¹ñ H\Â|2',1,'Alright Sonny','2016-12-11 18:54:38','2016-12-11 18:54:38','¹€È½\Þ\æ ù H\Â|2'),('Tô±À\æ¹ñ H\Â|2',1,'final testing','2016-12-11 18:54:42','2016-12-11 18:54:42','¹€È½\Þ\æ ù H\Â|2'),('VV¥}À\æ¹ñ H\Â|2',0,'cool','2016-12-11 18:54:45','2016-12-11 18:54:45','¹€È½\Þ\æ ù H\Â|2'),('Vú\ë³À\æ¹ñ H\Â|2',1,'wassup','2016-12-11 18:26:08','2016-12-11 18:26:08','¹€È½\Þ\æ ù H\Â|2'),('WÉ¶‹À\æ¹ñ H\Â|2',0,'I think it works','2016-12-11 18:54:47','2016-12-11 18:54:47','¹€È½\Þ\æ ù H\Â|2'),('Zfžc¾X\æ ù H\Â|2',0,'checking 123','2016-12-09 13:39:47','2016-12-09 13:39:47','¹€È½\Þ\æ ù H\Â|2'),('\\³êµ¾S\æ ù H\Â|2',1,'how are you doing','2016-12-09 13:04:03','2016-12-09 13:04:03','¹€È½\Þ\æ ù H\Â|2'),('mv«õÀ\æ¹ñ H\Â|2',1,'awesome','2016-12-11 18:55:23','2016-12-11 18:55:23','¹€È½\Þ\æ ù H\Â|2'),('v\ÆÝ¾S\æ ù H\Â|2',1,'testing','2016-12-09 13:04:46','2016-12-09 13:04:46','¹€È½\Þ\æ ù H\Â|2'),('|5°y¾[\æ ù H\Â|2',0,'2c23c','2016-12-09 14:02:12','2016-12-09 14:02:12','¹€È½\Þ\æ ù H\Â|2'),('~\Æ~¾]\æ ù H\Â|2',0,'123','2016-12-09 14:16:34','2016-12-09 14:16:34','¹€È½\Þ\æ ù H\Â|2'),('¬EÐ¾]\æ ù H\Â|2',0,'f43','2016-12-09 14:16:37','2016-12-09 14:16:37','¹€È½\Þ\æ ù H\Â|2'),('e¨zÀ\æ¹ñ H\Â|2',0,'im good','2016-12-11 18:27:19','2016-12-11 18:27:19','¹€È½\Þ\æ ù H\Â|2'),('‚Ÿ\n\ØÀ\æ¹ñ H\Â|2',1,'qwe','2016-12-11 18:34:30','2016-12-11 18:34:30','¹€È½\Þ\æ ù H\Â|2'),('‡\éY¾\\\æ ù H\Â|2',0,'a','2016-12-09 14:09:41','2016-12-09 14:09:41','¹€È½\Þ\æ ù H\Â|2'),('Ša\ZÀ\æ¹ñ H\Â|2',0,'doesn\'t load on time........','2016-12-11 18:34:43','2016-12-11 18:34:43','¹€È½\Þ\æ ù H\Â|2'),('‹j|€¾[\æ ù H\Â|2',0,'d23','2016-12-09 14:02:37','2016-12-09 14:02:37','¹€È½\Þ\æ ù H\Â|2'),('‘-^9¾\\\æ ù H\Â|2',0,'b','2016-12-09 14:09:56','2016-12-09 14:09:56','¹€È½\Þ\æ ù H\Â|2'),('’O3¾]\æ ù H\Â|2',0,'234f','2016-12-09 14:17:08','2016-12-09 14:17:08','¹€È½\Þ\æ ù H\Â|2'),('™¨°¾P\æ ù H\Â|2',1,'hi elliot','2016-12-09 12:44:17','2016-12-09 12:44:17','¹€È½\Þ\æ ù H\Â|2'),('™\Ñc¨¾|\æ ù H\Â|2',0,'hey sonny','2016-12-09 17:59:15','2016-12-09 17:59:15','±()U½\Þ\æ ù H\Â|2'),('¤¶\æ¾[\æ ù H\Â|2',0,'a','2016-12-09 14:03:19','2016-12-09 14:03:19','¹€È½\Þ\æ ù H\Â|2'),('¿…ºýÀ\æ¹ñ H\Â|2',1,'321','2016-12-11 18:07:35','2016-12-11 18:07:35','¹€È½\Þ\æ ù H\Â|2'),('\Öfþ.À\æ¹ñ H\Â|2',1,'get','2016-12-11 18:08:13','2016-12-11 18:08:13','¹€È½\Þ\æ ù H\Â|2'),('\Ø) \íÀ\æ¹ñ H\Â|2',1,'ads','2016-12-11 18:08:16','2016-12-11 18:08:16','¹€È½\Þ\æ ù H\Â|2'),('\Ûúõ¾[\æ ù H\Â|2',0,'b','2016-12-09 14:04:52','2016-12-09 14:04:52','¹€È½\Þ\æ ù H\Â|2'),('\Ý(\ç¾[\æ ù H\Â|2',0,'c','2016-12-09 14:04:54','2016-12-09 14:04:54','¹€È½\Þ\æ ù H\Â|2'),('\ÞÅ¾[\æ ù H\Â|2',0,'d','2016-12-09 14:04:56','2016-12-09 14:04:56','¹€È½\Þ\æ ù H\Â|2'),('\Þý¦Y¾[\æ ù H\Â|2',0,'e','2016-12-09 14:04:57','2016-12-09 14:04:57','¹€È½\Þ\æ ù H\Â|2'),('\ß\îCY¾[\æ ù H\Â|2',0,'f','2016-12-09 14:04:59','2016-12-09 14:04:59','¹€È½\Þ\æ ù H\Â|2'),('\àÁ\ÌÄ¾[\æ ù H\Â|2',0,'g','2016-12-09 14:05:00','2016-12-09 14:05:00','¹€È½\Þ\æ ù H\Â|2'),('\áÌ†¢¾[\æ ù H\Â|2',0,'h','2016-12-09 14:05:02','2016-12-09 14:05:02','¹€È½\Þ\æ ù H\Â|2'),('\æ\ß^š¾T\æ ù H\Â|2',1,'hello','2016-12-09 13:15:04','2016-12-09 13:15:04','¹€È½\Þ\æ ù H\Â|2'),('\ç@ýÝ¾\\\æ ù H\Â|2',0,'c','2016-12-09 14:12:21','2016-12-09 14:12:21','¹€È½\Þ\æ ù H\Â|2'),('\èS¾\\\æ ù H\Â|2',0,'s','2016-12-09 14:12:23','2016-12-09 14:12:23','¹€È½\Þ\æ ù H\Â|2');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pendings`
--

DROP TABLE IF EXISTS `pendings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pendings` (
  `id` binary(16) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `job_id` binary(16) NOT NULL,
  `trucker_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_pendings_jobs1_idx` (`job_id`),
  KEY `fk_pendings_truckers1_idx` (`trucker_id`),
  CONSTRAINT `fk_pendings_jobs1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_pendings_truckers1` FOREIGN KEY (`trucker_id`) REFERENCES `truckers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pendings`
--

LOCK TABLES `pendings` WRITE;
/*!40000 ALTER TABLE `pendings` DISABLE KEYS */;
INSERT INTO `pendings` VALUES ('K˜†½\Þ\æ ù H\Â|2','2016-12-08 23:06:41','2016-12-08 23:06:41','*‘\"/½˜\æ ù H\Â|2',')\ÎQD½w\æ ù H\Â|2'),('±()U½\Þ\æ ù H\Â|2','2016-12-08 23:09:31','2016-12-08 23:09:31','«¼]Ö½\æ ù H\Â|2',')\ÎQD½w\æ ù H\Â|2'),('¹€È½\Þ\æ ù H\Â|2','2016-12-08 23:09:44','2016-12-08 23:09:44','ˆiW¼þ\æ ù H\Â|2',')\ÎQD½w\æ ù H\Â|2');
/*!40000 ALTER TABLE `pendings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truckers`
--

DROP TABLE IF EXISTS `truckers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `truckers` (
  `id` binary(16) NOT NULL,
  `email` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `truck_type` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truckers`
--

LOCK TABLES `truckers` WRITE;
/*!40000 ALTER TABLE `truckers` DISABLE KEYS */;
INSERT INTO `truckers` VALUES (')\ÎQD½w\æ ù H\Â|2','sonny@tosco.com','sonny','tosco','$2a$10$MTdC5Vo6jlivsY8Kb69G2.nBkEVE6uYV/LV8cfguY6oPTITWsLEI.',2,'2016-12-08 10:48:26','2016-12-08 10:48:26'),('\àÊ¤V½\æ ù H\Â|2','george@miranda.com','George','Miranda','$2a$10$CXj5BYZOmc5AZpyS.vROreQNNEwbMfCa4rX82mqjpf9y3CFPPjS7m',3,'2016-12-07 22:57:43','2016-12-07 22:57:43');
/*!40000 ALTER TABLE `truckers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-11 18:58:03
