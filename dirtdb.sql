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
  CONSTRAINT `fk_messages_pendings1` FOREIGN KEY (`pending_id`) REFERENCES `pendings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
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
  CONSTRAINT `fk_pendings_jobs1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pendings_truckers1` FOREIGN KEY (`trucker_id`) REFERENCES `truckers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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

-- Dump completed on 2016-12-08 23:19:27
