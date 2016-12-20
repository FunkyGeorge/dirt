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
INSERT INTO `applications` VALUES ('+Σ®\Δ\γζª H\Β|2',1,'2016-12-17 21:30:34','2016-12-17 21:30:34','C\θ€\έ\Δ\άζª H\Β|2','aΐ?\Δ\Οζª H\Β|2'),('H\ΡZ\Ζ0ζª H\Β|2',0,'2016-12-19 13:14:43','2016-12-19 13:14:43','3•:\Ζ0ζª H\Β|2','aΐ?\Δ\Οζª H\Β|2'),('LS\Ζ3ζª H\Β|2',0,'2016-12-19 13:36:17','2016-12-19 13:36:17','3•:\Ζ0ζª H\Β|2','ƒό“\Ζ0ζª H\Β|2'),('®υ\ή6\Ζ4ζª H\Β|2',0,'2016-12-19 13:46:12','2016-12-19 13:46:12','3•:\Ζ0ζª H\Β|2','ªV\άs\Ζ4ζª H\Β|2');
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
INSERT INTO `dropoff` VALUES ('1105 Cantara Court','San Jose','CA',95127,1,'3•:\Ζ0ζª H\Β|2'),('1920 Zanker Road','San Jose','CA',95616,1,'C\θ€\έ\Δ\άζª H\Β|2'),('1105 Cantara Court','San Jose','CA',95127,1,'·\μπ\Δ\Ϊζª H\Β|2');
/*!40000 ALTER TABLE `dropoff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices` (
  `job_id` binary(16) NOT NULL,
  `cost` decimal(12,2) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `notes` varchar(1000) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`job_id`),
  UNIQUE KEY `job_id_UNIQUE` (`job_id`),
  KEY `fk_invoices_jobs1_idx` (`job_id`),
  CONSTRAINT `fk_invoices_jobs1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` binary(16) NOT NULL,
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
INSERT INTO `jobs` VALUES ('\"x\Ο\Ζ0ζª H\Β|2',0,'Recycled Concrete',234.00,'2016-12-24 08:00:00','2016-12-19 13:13:29','2016-12-19 13:13:29','”•j\Δ\Οζª H\Β|2'),('3•:\Ζ0ζª H\Β|2',1,'Topsoil - Average',234664.00,'2016-12-31 08:00:00','2016-12-19 13:14:07','2016-12-19 13:14:07','”•j\Δ\Οζª H\Β|2'),('C\θ€\έ\Δ\άζª H\Β|2',2,'Topsoil - Economy',3421.23,'2016-12-17 08:00:00','2016-12-17 20:41:08','2016-12-17 20:41:08','”•j\Δ\Οζª H\Β|2'),('·\μπ\Δ\Ϊζª H\Β|2',1,'Recycled Asphalt',123.00,'2016-12-31 08:00:00','2016-12-17 20:30:03','2016-12-17 20:30:03','”•j\Δ\Οζª H\Β|2'),('όs\r\Δ\ίζª H\Β|2',0,'Rough Fill',123.00,'2016-12-22 08:00:00','2016-12-17 21:07:47','2016-12-17 21:07:47','ρ\λ[\Δ\ίζª H\Β|2'),('ÿW±-\Δ\ζΉρ H\Β|2',0,'Clean Fill',0.01,'2016-12-31 08:00:00','2016-12-16 20:11:22','2016-12-16 20:11:22','\μ\ΤGo\Δ\ζΉρ H\Β|2');
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
INSERT INTO `messages` VALUES ('2¶\\Ζζª H\Β|2','asdasds','2016-12-19 22:52:58','2016-12-19 22:52:58','®υ\ή6\Ζ4ζª H\Β|2',NULL,'ªV\άs\Ζ4ζª H\Β|2'),('\ΫωvΖζª H\Β|2','asdsa','2016-12-19 22:53:03','2016-12-19 22:53:03','®υ\ή6\Ζ4ζª H\Β|2',NULL,'ªV\άs\Ζ4ζª H\Β|2'),('+\Ϋi0Ζƒζª H\Β|2','check 1111','2016-12-19 23:08:02','2016-12-19 23:08:02','®υ\ή6\Ζ4ζª H\Β|2','”•j\Δ\Οζª H\Β|2',NULL),('/Rw²\Ζ|ζª H\Β|2','1105 Cantara Court','2016-12-19 22:18:02','2016-12-19 22:18:02','H\ΡZ\Ζ0ζª H\Β|2','”•j\Δ\Οζª H\Β|2',NULL),('p!b\Π\Ζόζª H\Β|2','hi','2016-12-20 13:35:42','2016-12-20 13:35:42','®υ\ή6\Ζ4ζª H\Β|2','”•j\Δ\Οζª H\Β|2',NULL),('€\n£\αΖ‚ζª H\Β|2','asdsa','2016-12-19 23:03:14','2016-12-19 23:03:14','®υ\ή6\Ζ4ζª H\Β|2',NULL,'ªV\άs\Ζ4ζª H\Β|2'),('„qU<Ζ‚ζª H\Β|2','asdasdasd','2016-12-19 23:03:21','2016-12-19 23:03:21','®υ\ή6\Ζ4ζª H\Β|2',NULL,'ªV\άs\Ζ4ζª H\Β|2'),('Ϊ§Ζ‚ζª H\Β|2','asfcavasva','2016-12-19 23:03:29','2016-12-19 23:03:29','®υ\ή6\Ζ4ζª H\Β|2',NULL,'ªV\άs\Ζ4ζª H\Β|2'),('R\μ‘Ζ‚ζª H\Β|2','asdas','2016-12-19 23:03:31','2016-12-19 23:03:31','®υ\ή6\Ζ4ζª H\Β|2','”•j\Δ\Οζª H\Β|2',NULL),('’\nΖƒζª H\Β|2','dasdsa','2016-12-19 23:10:54','2016-12-19 23:10:54','®υ\ή6\Ζ4ζª H\Β|2','”•j\Δ\Οζª H\Β|2',NULL),('°S$Ζ‚ζª H\Β|2','asdasd','2016-12-19 23:04:05','2016-12-19 23:04:05','®υ\ή6\Ζ4ζª H\Β|2',NULL,'ªV\άs\Ζ4ζª H\Β|2'),('Ύ—S―\Ζζª H\Β|2','Hey Minh','2016-12-19 22:43:30','2016-12-19 22:43:30','®υ\ή6\Ζ4ζª H\Β|2','”•j\Δ\Οζª H\Β|2',NULL),('ΐ΄ª\Ζ|ζª H\Β|2','1105 Cantara Court San Jose, CA','2016-12-19 22:22:05','2016-12-19 22:22:05','H\ΡZ\Ζ0ζª H\Β|2','”•j\Δ\Οζª H\Β|2',NULL),('\Β\β\λ,\Ζζª H\Β|2','hi','2016-12-19 22:43:38','2016-12-19 22:43:38','®υ\ή6\Ζ4ζª H\Β|2',NULL,'ªV\άs\Ζ4ζª H\Β|2'),('\Ζ[΅)Ε±ζª H\Β|2','sdafsd','2016-12-18 22:09:30','2016-12-18 22:09:30','+Σ®\Δ\γζª H\Β|2','”•j\Δ\Οζª H\Β|2',NULL),('Θ¤B\ίΖ‚ζª H\Β|2','vsdfsad','2016-12-19 23:05:16','2016-12-19 23:05:16','®υ\ή6\Ζ4ζª H\Β|2',NULL,'ªV\άs\Ζ4ζª H\Β|2'),('Οƒ\Φ4Ζζª H\Β|2','asdsa','2016-12-19 22:58:18','2016-12-19 22:58:18','®υ\ή6\Ζ4ζª H\Β|2','”•j\Δ\Οζª H\Β|2',NULL),('\ί\Ωkw\Ζζª H\Β|2','hi Jess','2016-12-19 22:44:26','2016-12-19 22:44:26','®υ\ή6\Ζ4ζª H\Β|2',NULL,'ªV\άs\Ζ4ζª H\Β|2'),('\ηE²¤Ζ‰ζª H\Β|2','DOOOOOOOONNNNNNNE','2016-12-19 23:56:14','2016-12-19 23:56:14','®υ\ή6\Ζ4ζª H\Β|2','”•j\Δ\Οζª H\Β|2',NULL),('\μC!Ζ€ζª H\Β|2','hey','2016-12-19 22:51:57','2016-12-19 22:51:57','®υ\ή6\Ζ4ζª H\Β|2',NULL,'ªV\άs\Ζ4ζª H\Β|2'),('\ξΑ—–\Ζζª H\Β|2','Check 123','2016-12-19 22:44:51','2016-12-19 22:44:51','®υ\ή6\Ζ4ζª H\Β|2','”•j\Δ\Οζª H\Β|2',NULL),('φ\οY\Μ\Ζζª H\Β|2','This is a longer messageThis is a longer messageThis is a longer messageThis is a longer messageThis is a longer message asd','2016-12-19 22:45:05','2016-12-19 22:45:05','®υ\ή6\Ζ4ζª H\Β|2','”•j\Δ\Οζª H\Β|2',NULL);
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
INSERT INTO `pickup` VALUES ('1105 Cantara Court','San Jose','CA',95127,1,'\"x\Ο\Ζ0ζª H\Β|2'),('1105 Cantara Court','San Jose','CA',95127,0,'C\θ€\έ\Δ\άζª H\Β|2'),('1105 Cantara Court','San Jose','CA',95127,1,'όs\r\Δ\ίζª H\Β|2'),('1105 Cantara Court','San Jose','CA',95127,1,'ÿW±-\Δ\ζΉρ H\Β|2');
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
INSERT INTO `truckers` VALUES ('aΐ?\Δ\Οζª H\Β|2','sonny@tosco.com','Sonny','Tosco','$2a$10$b6/F.tutBf434cnXXSfLZ.KHdIM335bYFzylpwWDhhhXGiDavNNJm',0,'Honda','Truck',1990,'asdfg','2016-12-17 19:08:55','2016-12-17 19:08:55'),('ƒό“\Ζ0ζª H\Β|2','alex@wap.com','Alex','Wap','$2a$10$cbqG6wB7gSPDGdpj9jrZbeutbT3wggVhgolPvfPL6b3Jw.0rxSnQa',1,'Nissan','Honda',1980,NULL,'2016-12-19 13:16:22','2016-12-19 13:16:22'),('ªV\άs\Ζ4ζª H\Β|2','minh@pham.com','Minh','Pham','$2a$10$ATZCa87UaO8BexzQ1edUPe6XazvgZtc1IRemgo5I95AXPsu9XzYC.',0,'Something','Something',1980,NULL,'2016-12-19 13:46:04','2016-12-19 13:46:04');
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
INSERT INTO `users` VALUES ('”•j\Δ\Οζª H\Β|2','jessica@ganda.com','Jessica','Ganda','$2a$10$YRDOiOlX/Aok.dWmwT8iNeOafr1sykDLkeS7ep4ExgTLdc/lAMq2m','2016-12-17 19:10:07','2016-12-17 19:10:07'),('\μ\ΤGo\Δ\ζΉρ H\Β|2','philiptranbavo@gmail.com','Philip','Vo','$2a$10$T6uSB/x5Q1IDijJCCKvRhup7wWimHaQblNNqdyWJgVP56L57HBNau','2016-12-16 20:10:51','2016-12-16 20:10:51'),('ρ\λ[\Δ\ίζª H\Β|2','elliot@young.com','Elliot','Young','$2a$10$GtYWM1sI6.bmRj4Q1OPqI.78qO.xHxq2xVCWBVYWONh4kEC0Q6ppS','2016-12-17 21:07:29','2016-12-17 21:07:29');
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

-- Dump completed on 2016-12-20 15:02:00
