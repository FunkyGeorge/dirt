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
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `id` binary(16) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `cost` decimal(12,2) DEFAULT NULL,
  `notes` varchar(1000) DEFAULT NULL,
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
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES ('j \Ğ\Æ\æ‘[ H\Â|2',-1,NULL,NULL,'2017-01-02 00:29:17','2017-01-02 00:29:29','ù¹,\Ğ\Å\æ‘[ H\Â|2','ªV\Üs\Æ4æªŸ H\Â|2'),('u\"\Í\Ğ\Æ\æ‘[ H\Â|2',2,NULL,NULL,'2017-01-02 00:29:17','2017-01-02 00:33:05','ù¹,\Ğ\Å\æ‘[ H\Â|2','ªV\Üs\Æ4æªŸ H\Â|2'),('\\k\í\ÑO\æ‘[ H\Â|2',4,69.90,NULL,'2017-01-02 16:50:02','2017-01-02 20:31:26','ı\Õ¨\ÑN\æ‘[ H\Â|2','ªV\Üs\Æ4æªŸ H\Â|2'),('(\Ü$÷Ğ»\æ‘[ H\Â|2',4,300.00,NULL,'2017-01-01 23:11:37','2017-01-02 00:02:47','#¹zĞ»\æ‘[ H\Â|2','ªV\Üs\Æ4æªŸ H\Â|2'),('*\Òg\Ø\Ğ\Ã\æ‘[ H\Â|2',4,256.00,NULL,'2017-01-02 00:08:56','2017-01-02 00:16:25','%3\Ğ\Ã\æ‘[ H\Â|2','ªV\Üs\Æ4æªŸ H\Â|2'),('^\éğø\Ğ\Ä\æ‘[ H\Â|2',4,77668.87,NULL,'2017-01-02 00:17:33','2017-01-02 00:24:40','Z?£\Ğ\Ä\æ‘[ H\Â|2','ªV\Üs\Æ4æªŸ H\Â|2'),('o>\ìó\Ğ\Ç\æ‘[ H\Â|2',-2,NULL,NULL,'2017-01-02 00:39:29','2017-01-02 00:39:46','jX±:\Ğ\Ç\æ‘[ H\Â|2','ªV\Üs\Æ4æªŸ H\Â|2'),('–&¡f\Ğ\È\æ‘[ H\Â|2',4,42.50,NULL,'2017-01-02 00:47:44','2017-01-02 00:50:02','‘²–\é\Ğ\È\æ‘[ H\Â|2','ªV\Üs\Æ4æªŸ H\Â|2'),('¦ÿYñ\Ğ\Ç\æ‘[ H\Â|2',4,898.43,NULL,'2017-01-02 00:41:03','2017-01-02 00:46:39','ŸÔ‹ñ\Ğ\Ç\æ‘[ H\Â|2','ªV\Üs\Æ4æªŸ H\Â|2'),('¾Õ¶\Ğ\Å\æ‘[ H\Â|2',1,NULL,NULL,'2017-01-02 00:27:24','2017-01-02 00:27:34','¹×¿,\Ğ\Å\æ‘[ H\Â|2','ªV\Üs\Æ4æªŸ H\Â|2'),('Á\í,´\Ğ\Æ\æ‘[ H\Â|2',4,8686.70,NULL,'2017-01-02 00:34:38','2017-01-02 00:53:47','½G\í‘\Ğ\Æ\æ‘[ H\Â|2','ªV\Üs\Æ4æªŸ H\Â|2');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dropoff`
--

DROP TABLE IF EXISTS `dropoff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dropoff` (
  `d_address` varchar(45) NOT NULL,
  `d_city` varchar(45) NOT NULL,
  `d_state` varchar(2) NOT NULL,
  `d_zip` int(11) NOT NULL,
  `d_loader` tinyint(1) NOT NULL,
  `job_id` binary(16) NOT NULL,
  PRIMARY KEY (`job_id`),
  UNIQUE KEY `job_id_UNIQUE` (`job_id`),
  KEY `fk_dropoff_location_jobs1_idx` (`job_id`),
  CONSTRAINT `fk_dropoff_location_jobs1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dropoff`
--

LOCK TABLES `dropoff` WRITE;
/*!40000 ALTER TABLE `dropoff` DISABLE KEYS */;
/*!40000 ALTER TABLE `dropoff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` binary(16) NOT NULL,
  `job_status` tinyint(1) NOT NULL,
  `job_type` tinyint(1) NOT NULL,
  `dirt_type` varchar(45) NOT NULL,
  `volume` decimal(10,2) NOT NULL,
  `completion_date` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_jobs_users_idx` (`user_id`),
  CONSTRAINT `fk_jobs_contractors` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES ('#¹zĞ»\æ‘[ H\Â|2',4,0,'Clean Fill',24.00,'2017-01-14 08:00:00','2017-01-01 23:11:28','2017-01-02 00:02:48','Œ”•j\Ä\ÏæªŸ H\Â|2'),('%3\Ğ\Ã\æ‘[ H\Â|2',4,0,'Recycled Base Material',23423.00,'2017-01-14 08:00:00','2017-01-02 00:08:47','2017-01-02 00:16:25','Œ”•j\Ä\ÏæªŸ H\Â|2'),('Z?£\Ğ\Ä\æ‘[ H\Â|2',4,0,'Topsoil - Average',955.45,'2017-01-14 08:00:00','2017-01-02 00:17:25','2017-01-02 00:24:40','Œ”•j\Ä\ÏæªŸ H\Â|2'),('jX±:\Ğ\Ç\æ‘[ H\Â|2',0,0,'Recycled Base Material',43.00,'2017-01-21 08:00:00','2017-01-02 00:39:21','2017-01-02 00:39:21','Œ”•j\Ä\ÏæªŸ H\Â|2'),('‘²–\é\Ğ\È\æ‘[ H\Â|2',4,0,'Topsoil - Average',848.40,'2017-01-13 08:00:00','2017-01-02 00:47:36','2017-01-02 00:50:02','Œ”•j\Ä\ÏæªŸ H\Â|2'),('ŸÔ‹ñ\Ğ\Ç\æ‘[ H\Â|2',4,0,'Topsoil - Average',47.00,'2017-01-21 08:00:00','2017-01-02 00:40:51','2017-01-02 00:46:39','Œ”•j\Ä\ÏæªŸ H\Â|2'),('¹×¿,\Ğ\Å\æ‘[ H\Â|2',1,0,'Topsoil - Economy',858559.30,'2017-01-28 08:00:00','2017-01-02 00:27:15','2017-01-02 00:27:34','Œ”•j\Ä\ÏæªŸ H\Â|2'),('½G\í‘\Ğ\Æ\æ‘[ H\Â|2',4,0,'Topsoil - Economy',7890.00,'2017-01-26 08:00:00','2017-01-02 00:34:31','2017-01-02 00:53:47','Œ”•j\Ä\ÏæªŸ H\Â|2'),('ù¹,\Ğ\Å\æ‘[ H\Â|2',2,0,'Rip-Rap',2321.00,'2017-01-17 08:00:00','2017-01-02 00:29:02','2017-01-02 00:33:05','Œ”•j\Ä\ÏæªŸ H\Â|2'),('ı\Õ¨\ÑN\æ‘[ H\Â|2',4,0,'Recycled Base Material',42.00,'2017-01-21 08:00:00','2017-01-02 16:49:34','2017-01-02 20:31:26','ñ\ë[\Ä\ßæªŸ H\Â|2');
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
  `message` varchar(1000) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `application_id` binary(16) NOT NULL,
  `user_id` binary(16) DEFAULT NULL,
  `trucker_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_messages_pendings1_idx` (`application_id`),
  KEY `fk_messages_contractors1_idx` (`user_id`),
  KEY `fk_messages_truckers1_idx` (`trucker_id`),
  CONSTRAINT `fk_messages_contractors1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_pendings1` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_truckers1` FOREIGN KEY (`trucker_id`) REFERENCES `truckers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES ('!g8\ÑO\æ‘[ H\Â|2','Hey man','2017-01-02 16:50:33','2017-01-02 16:50:33','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('#y˜‰\ÑO\æ‘[ H\Â|2','Hey','2017-01-02 16:50:37','2017-01-02 16:50:37','\\k\í\ÑO\æ‘[ H\Â|2',NULL,'ªV\Üs\Æ4æªŸ H\Â|2'),('*ğq\ÑO\æ‘[ H\Â|2','When can you get the job done?','2017-01-02 16:50:48','2017-01-02 16:50:48','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('1Ï:\ÑO\æ‘[ H\Â|2','??','2017-01-02 16:51:01','2017-01-02 16:51:01','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('{lJ\Ñm\æ‘[ H\Â|2','lol','2017-01-02 20:27:50','2017-01-02 20:27:50','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('\ÊmC\ÑP\æ‘[ H\Â|2','hey','2017-01-02 17:01:14','2017-01-02 17:01:14','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('¢³\Ş\Ã\ÑP\æ‘[ H\Â|2','asd','2017-01-02 17:01:20','2017-01-02 17:01:20','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('§ûõ\ÑP\æ‘[ H\Â|2','mlml','2017-01-02 17:01:29','2017-01-02 17:01:29','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('¬s-Á\ÑP\æ‘[ H\Â|2','check','2017-01-02 17:01:37','2017-01-02 17:01:37','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('­\É\â\Ñl\æ‘[ H\Â|2','check','2017-01-02 20:22:05','2017-01-02 20:22:05','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('´™—F\ÑP\æ‘[ H\Â|2','momom','2017-01-02 17:01:50','2017-01-02 17:01:50','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('·ji\Ñ\Ñm\æ‘[ H\Â|2','one more','2017-01-02 20:29:30','2017-01-02 20:29:30','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('¸C?\ÑP\æ‘[ H\Â|2','jkl','2017-01-02 17:01:56','2017-01-02 17:01:56','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('¼W[\ß\Ñm\æ‘[ H\Â|2','check','2017-01-02 20:29:39','2017-01-02 20:29:39','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('Àß†r\Ñm\æ‘[ H\Â|2','mol','2017-01-02 20:29:46','2017-01-02 20:29:46','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('\Å4c\î\Ñm\æ‘[ H\Â|2','check again','2017-01-02 20:29:53','2017-01-02 20:29:53','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('\Éğ\Ûo\Ñm\æ‘[ H\Â|2','lola','2017-01-02 20:30:01','2017-01-02 20:30:01','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('\Ì\Ø\ë\"\Ñm\æ‘[ H\Â|2','mla\'','2017-01-02 20:30:06','2017-01-02 20:30:06','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('\Ï%]\Ñm\æ‘[ H\Â|2','mopq','2017-01-02 20:30:10','2017-01-02 20:30:10','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('Ò¡ ¦\Ñm\æ‘[ H\Â|2','Hey you','2017-01-02 20:30:16','2017-01-02 20:30:16','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL),('\Ö8†O\Ñm\æ‘[ H\Â|2','sup','2017-01-02 20:30:22','2017-01-02 20:30:22','\\k\í\ÑO\æ‘[ H\Â|2',NULL,'ªV\Üs\Æ4æªŸ H\Â|2'),('\ÚûµT\Ñm\æ‘[ H\Â|2','nothing much','2017-01-02 20:30:30','2017-01-02 20:30:30','\\k\í\ÑO\æ‘[ H\Â|2',NULL,'ªV\Üs\Æ4æªŸ H\Â|2'),('\èµ!†\ÑO\æ‘[ H\Â|2','hey','2017-01-02 16:56:08','2017-01-02 16:56:08','\\k\í\ÑO\æ‘[ H\Â|2','ñ\ë[\Ä\ßæªŸ H\Â|2',NULL);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pickup`
--

DROP TABLE IF EXISTS `pickup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pickup` (
  `p_address` varchar(45) NOT NULL,
  `p_city` varchar(45) NOT NULL,
  `p_state` varchar(2) NOT NULL,
  `p_zip` int(11) NOT NULL,
  `p_loader` tinyint(1) NOT NULL,
  `job_id` binary(16) NOT NULL,
  PRIMARY KEY (`job_id`),
  UNIQUE KEY `job_id_UNIQUE` (`job_id`),
  KEY `fk_pickup_location_jobs1_idx` (`job_id`),
  CONSTRAINT `fk_pickup_location_jobs1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickup`
--

LOCK TABLES `pickup` WRITE;
/*!40000 ALTER TABLE `pickup` DISABLE KEYS */;
INSERT INTO `pickup` VALUES ('1105 Cantara Court','San Jose','CA',95127,0,'#¹zĞ»\æ‘[ H\Â|2'),('1105 Cantara Court','San Jose','CA',95127,0,'%3\Ğ\Ã\æ‘[ H\Â|2'),('1105 Cantara Court','San Jose','CA',95127,0,'Z?£\Ğ\Ä\æ‘[ H\Â|2'),('1105 Cantara Court','San Jose','CA',95127,0,'jX±:\Ğ\Ç\æ‘[ H\Â|2'),('1105 Cantara Court','San Jose','CA',95127,0,'‘²–\é\Ğ\È\æ‘[ H\Â|2'),('1105 Cantara Court','San Jose','CA',95127,0,'ŸÔ‹ñ\Ğ\Ç\æ‘[ H\Â|2'),('1105 Cantara Court','San Jose','CA',95127,0,'¹×¿,\Ğ\Å\æ‘[ H\Â|2'),('1105 Cantara Court','San Jose','CA',95127,0,'½G\í‘\Ğ\Æ\æ‘[ H\Â|2'),('1105 Cantara Court','San Jose','CA',95127,0,'ù¹,\Ğ\Å\æ‘[ H\Â|2'),('1105 Cantara Court','San Jose','CA',95127,0,'ı\Õ¨\ÑN\æ‘[ H\Â|2');
/*!40000 ALTER TABLE `pickup` ENABLE KEYS */;
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
  `make` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `year` smallint(4) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
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
INSERT INTO `truckers` VALUES ('aÀ?\Ä\ÏæªŸ H\Â|2','sonny@tosco.com','Sonny','Tosco','$2a$10$b6/F.tutBf434cnXXSfLZ.KHdIM335bYFzylpwWDhhhXGiDavNNJm',0,'Honda','Truck',1990,'asdfg','2016-12-17 19:08:55','2016-12-17 19:08:55'),('ƒü“\Æ0æªŸ H\Â|2','alex@wap.com','Alex','Wap','$2a$10$cbqG6wB7gSPDGdpj9jrZbeutbT3wggVhgolPvfPL6b3Jw.0rxSnQa',1,'Nissan','Honda',1980,NULL,'2016-12-19 13:16:22','2016-12-19 13:16:22'),('ªV\Üs\Æ4æªŸ H\Â|2','minh@pham.com','Minh','Pham','$2a$10$ATZCa87UaO8BexzQ1edUPe6XazvgZtc1IRemgo5I95AXPsu9XzYC.',0,'Something','Something',1980,NULL,'2016-12-19 13:46:04','2016-12-19 13:46:04'),('³¶^\ìÈ\æ² H\Â|2','mkj@non.com','mjk','mk','$2a$10$.4F/fUlfdPBThGG9x1qhR.i9RiLVDACEGJZnYqVZ1R9mF2OsO8itW',0,'vf','bd',2002,NULL,'2016-12-22 13:36:30','2016-12-22 13:36:30'),('À8ÁZ\È\æ² H\Â|2','vr@vsd.co','vd','ge','$2a$10$XKmspl9M/rD47QbF8gqPjuKfjYyNQ96jdmOrvOsuqlzmKYV3SlAgi',0,'vsd','mko',1980,NULL,'2016-12-21 23:39:20','2016-12-21 23:39:20');
/*!40000 ALTER TABLE `truckers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
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
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('\\U\È\Z\æ² H\Â|2','v@sdv.cs','ber','ber','$2a$10$FbUnohbKAY8PHVnYIMZO4uRS8ZpvD9ZZxH1CBdjoFMNHGTMTXT7ze','2016-12-21 23:41:18','2016-12-21 23:41:18'),('\å\"½\È\æ² H\Â|2','ph@vo.com','Ph','Vo','$2a$10$gwhhcopBT0BL9ynCirM6ieWeSUByzTANbzTmY1uaEurItL/YwgyZe','2016-12-21 23:34:48','2016-12-21 23:34:48'),(' \×\î‰\È\æ² H\Â|2','ca@la.com','vas','al','$2a$10$zF0X5lTl8MRypo1FYY5HBuh.HHTJ/miuXsy7NlHsv76BcxBlMbZay','2016-12-22 00:10:40','2016-12-22 00:10:40'),('.r¢\È\æ² H\Â|2','jinny@kim.com','Jinny','Kim','$2a$10$K9l5YgreuP0C1J74RCb.Ouj3fvU.1s7g53vjpxzQ3oondRL5YcQdO','2016-12-21 22:38:00','2016-12-21 22:38:00'),('/\áŸ?\È\æ² H\Â|2','je@ga.com','Je','Ga','$2a$10$bpnUPUnlTnryT1uUMV0ELedpPd0H/1rpGdkRasrEWTxbRR1QzZWpi','2016-12-21 23:35:18','2016-12-21 23:35:18'),('~iûe\È\æ² H\Â|2','philip@vo.vom','Philip','Vo','$2a$10$sDthJwf2NW3f1A0wYm5iHeCRc94L.VHnyk5x.BFUIjq4jNDCmg8KK','2016-12-21 23:30:20','2016-12-21 23:30:20'),('U\è’\È\æ² H\Â|2','moi@moi.c','mi','moi','$2a$10$N3XMdnQQvAau.NliXl/i/O6oDR/02tbepJ19ZPKt7Pr87o1V63mT2','2016-12-22 00:13:19','2016-12-22 00:13:19'),('Œ”•j\Ä\ÏæªŸ H\Â|2','jessica@ganda.com','Jessica','Ganda','$2a$10$YRDOiOlX/Aok.dWmwT8iNeOafr1sykDLkeS7ep4ExgTLdc/lAMq2m','2016-12-17 19:10:07','2016-12-17 19:10:07'),('«—y\\\È\æ² H\Â|2','apsa@as.co','asd','acca','$2a$10$SwLAvr5HmvvxL1nfXiqOreIsiQTH9A7jrEl5A.kIEwam7uXMepy6G','2016-12-21 23:38:45','2016-12-21 23:38:45'),('½+tÈ\æ² H\Â|2','be@vsd.vom','vd','ber','$2a$10$Ft4busmCRK5RsJVL4ESrSeLTGCDO3UxwPbkXIfKp1dAmkQn39vTCG','2016-12-22 13:36:47','2016-12-22 13:36:47'),('\Épü\È\æ² H\Â|2','vsd@vsd.sd','vs','vsd','$2a$10$6W/Gg8xBybW4LDaZBhFBj.z1aIVSkGsz7kftfj2ekJ4wbVGVQ3RtG','2016-12-22 00:08:14','2016-12-22 00:08:14'),('\Ï\×2¶\È\æ² H\Â|2','vsd@vssad.sd','vs','vsd','$2a$10$S8tGCDDrH8vI1eiGS.RrIeLQrkh.WvRGKreEOQqrFCoyWSy/XjIgi','2016-12-22 00:08:24','2016-12-22 00:08:24'),('Ô”\É\È\æ² H\Â|2','vsd@o.xio','bds','bsaf','$2a$10$WYdOqN/6ijL5jhZHSLXorOuMJ1WCmMwdPVPjtWJVuhyrbyqDU3/te','2016-12-21 23:39:54','2016-12-21 23:39:54'),('Ö€ø\È\æ² H\Â|2','al@wa.com','Al','Wa','$2a$10$ZNTx0sUurcw4JYjDrdxb6OEY36y3.YcShN9.dL61z9KuYvvM7iR5y','2016-12-21 23:32:48','2016-12-21 23:32:48'),('\ì\ÔGo\Ä\æ¹ñ H\Â|2','philiptranbavo@gmail.com','Philip','Vo','$2a$10$T6uSB/x5Q1IDijJCCKvRhup7wWimHaQblNNqdyWJgVP56L57HBNau','2016-12-16 20:10:51','2016-12-16 20:10:51'),('ñ\ë[\Ä\ßæªŸ H\Â|2','elliot@young.com','Elliot','Young','$2a$10$GtYWM1sI6.bmRj4Q1OPqI.78qO.xHxq2xVCWBVYWONh4kEC0Q6ppS','2016-12-17 21:07:29','2016-12-17 21:07:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-02 20:39:00
