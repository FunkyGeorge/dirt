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
INSERT INTO `truckers` VALUES ('a¿?\ƒ\œÊ™ü†H\¬|2','sonny@tosco.com','Sonny','Tosco','$2a$10$b6/F.tutBf434cnXXSfLZ.KHdIM335bYFzylpwWDhhhXGiDavNNJm',0,'Honda','Truck',1990,'asdfg','2016-12-17 19:08:55','2016-12-17 19:08:55'),('É¸ì\∆0Ê™ü†H\¬|2','alex@wap.com','Alex','Wap','$2a$10$cbqG6wB7gSPDGdpj9jrZbeutbT3wggVhgolPvfPL6b3Jw.0rxSnQa',1,'Nissan','Honda',1980,NULL,'2016-12-19 13:16:22','2016-12-19 13:16:22'),('™V\‹s\∆4Ê™ü†H\¬|2','minh@pham.com','Minh','Pham','$2a$10$ATZCa87UaO8BexzQ1edUPe6XazvgZtc1IRemgo5I95AXPsu9XzYC.',0,'Something','Something',1980,NULL,'2016-12-19 13:46:04','2016-12-19 13:46:04'),('≥∂^\Ï»é\Ê≤†H\¬|2','mkj@non.com','mjk','mk','$2a$10$.4F/fUlfdPBThGG9x1qhR.i9RiLVDACEGJZnYqVZ1R9mF2OsO8itW',0,'vf','bd',2002,NULL,'2016-12-22 13:36:30','2016-12-22 13:36:30'),('¿8¡Z\»\Ê≤†H\¬|2','vr@vsd.co','vd','ge','$2a$10$XKmspl9M/rD47QbF8gqPjuKfjYyNQ96jdmOrvOsuqlzmKYV3SlAgi',0,'vsd','mko',1980,NULL,'2016-12-21 23:39:20','2016-12-21 23:39:20');
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
INSERT INTO `users` VALUES ('\\U\»\Z\Ê≤†H\¬|2','v@sdv.cs','ber','ber','$2a$10$FbUnohbKAY8PHVnYIMZO4uRS8ZpvD9ZZxH1CBdjoFMNHGTMTXT7ze','2016-12-21 23:41:18','2016-12-21 23:41:18'),('\Â\"Ω\»\Ê≤†H\¬|2','ph@vo.com','Ph','Vo','$2a$10$gwhhcopBT0BL9ynCirM6ieWeSUByzTANbzTmY1uaEurItL/YwgyZe','2016-12-21 23:34:48','2016-12-21 23:34:48'),(' \◊\Óâ\»\Ê≤†H\¬|2','ca@la.com','vas','al','$2a$10$zF0X5lTl8MRypo1FYY5HBuh.HHTJ/miuXsy7NlHsv76BcxBlMbZay','2016-12-22 00:10:40','2016-12-22 00:10:40'),('.r¢\»\Ê≤†H\¬|2','jinny@kim.com','Jinny','Kim','$2a$10$K9l5YgreuP0C1J74RCb.Ouj3fvU.1s7g53vjpxzQ3oondRL5YcQdO','2016-12-21 22:38:00','2016-12-21 22:38:00'),('/\·ü?\»\Ê≤†H\¬|2','je@ga.com','Je','Ga','$2a$10$bpnUPUnlTnryT1uUMV0ELedpPd0H/1rpGdkRasrEWTxbRR1QzZWpi','2016-12-21 23:35:18','2016-12-21 23:35:18'),('~i˚e\»\Ê≤†H\¬|2','philip@vo.vom','Philip','Vo','$2a$10$sDthJwf2NW3f1A0wYm5iHeCRc94L.VHnyk5x.BFUIjq4jNDCmg8KK','2016-12-21 23:30:20','2016-12-21 23:30:20'),('U\Ëí\»\Ê≤†H\¬|2','moi@moi.c','mi','moi','$2a$10$N3XMdnQQvAau.NliXl/i/O6oDR/02tbepJ19ZPKt7Pr87o1V63mT2','2016-12-22 00:13:19','2016-12-22 00:13:19'),('åîïj\ƒ\œÊ™ü†H\¬|2','jessica@ganda.com','Jessica','Ganda','$2a$10$YRDOiOlX/Aok.dWmwT8iNeOafr1sykDLkeS7ep4ExgTLdc/lAMq2m','2016-12-17 19:10:07','2016-12-17 19:10:07'),('´óy\\\»\Ê≤†H\¬|2','apsa@as.co','asd','acca','$2a$10$SwLAvr5HmvvxL1nfXiqOreIsiQTH9A7jrEl5A.kIEwam7uXMepy6G','2016-12-21 23:38:45','2016-12-21 23:38:45'),('Ωù+t»é\Ê≤†H\¬|2','be@vsd.vom','vd','ber','$2a$10$Ft4busmCRK5RsJVL4ESrSeLTGCDO3UxwPbkXIfKp1dAmkQn39vTCG','2016-12-22 13:36:47','2016-12-22 13:36:47'),('\…p¸\»\Ê≤†H\¬|2','vsd@vsd.sd','vs','vsd','$2a$10$6W/Gg8xBybW4LDaZBhFBj.z1aIVSkGsz7kftfj2ekJ4wbVGVQ3RtG','2016-12-22 00:08:14','2016-12-22 00:08:14'),('\œ\◊2∂\»\Ê≤†H\¬|2','vsd@vssad.sd','vs','vsd','$2a$10$S8tGCDDrH8vI1eiGS.RrIeLQrkh.WvRGKreEOQqrFCoyWSy/XjIgi','2016-12-22 00:08:24','2016-12-22 00:08:24'),('‘î\…\»\Ê≤†H\¬|2','vsd@o.xio','bds','bsaf','$2a$10$WYdOqN/6ijL5jhZHSLXorOuMJ1WCmMwdPVPjtWJVuhyrbyqDU3/te','2016-12-21 23:39:54','2016-12-21 23:39:54'),('÷Ä¯\»\Ê≤†H\¬|2','al@wa.com','Al','Wa','$2a$10$ZNTx0sUurcw4JYjDrdxb6OEY36y3.YcShN9.dL61z9KuYvvM7iR5y','2016-12-21 23:32:48','2016-12-21 23:32:48'),('\Ï\‘Go\ƒ\ÊπÒ†H\¬|2','philiptranbavo@gmail.com','Philip','Vo','$2a$10$T6uSB/x5Q1IDijJCCKvRhup7wWimHaQblNNqdyWJgVP56L57HBNau','2016-12-16 20:10:51','2016-12-16 20:10:51'),('Ò\Î[è\ƒ\ﬂÊ™ü†H\¬|2','elliot@young.com','Elliot','Young','$2a$10$GtYWM1sI6.bmRj4Q1OPqI.78qO.xHxq2xVCWBVYWONh4kEC0Q6ppS','2016-12-17 21:07:29','2016-12-17 21:07:29');
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

-- Dump completed on 2016-12-22 19:10:55
