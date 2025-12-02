CREATE DATABASE  IF NOT EXISTS `mysqldb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mysqldb`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: mysqldb
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sns_chatroom`
--

DROP TABLE IF EXISTS `sns_chatroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_chatroom` (
  `CHATNO` int NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(50) NOT NULL,
  `USERID` varchar(50) NOT NULL,
  `TYPE` char(1) NOT NULL,
  `CDATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`CHATNO`),
  KEY `sns_chatroom_ibfk_1` (`USERID`),
  CONSTRAINT `sns_chatroom_ibfk_1` FOREIGN KEY (`USERID`) REFERENCES `sns_user` (`USERID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_chatroom`
--

LOCK TABLES `sns_chatroom` WRITE;
/*!40000 ALTER TABLE `sns_chatroom` DISABLE KEYS */;
INSERT INTO `sns_chatroom` VALUES (1,'asasdf','qwer','O','2025-11-28 15:44:09'),(2,'뮵ㅈㄷ','qwer','O','2025-11-28 15:50:38'),(4,'1241','qwer','O','2025-11-28 15:51:49'),(5,'테스트1','qwer','O','2025-11-28 15:58:06'),(6,'114','qwer','O','2025-11-28 16:08:32'),(7,'114','qwer','O','2025-11-28 16:08:33'),(8,'123','qwer','O','2025-11-28 16:12:11'),(9,'251201','qwer','O','2025-12-01 09:35:42'),(16,'테스트','qwer','O','2025-12-02 11:49:42'),(17,'테스트2','qwer','O','2025-12-02 14:58:18');
/*!40000 ALTER TABLE `sns_chatroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sns_chatroom_member`
--

DROP TABLE IF EXISTS `sns_chatroom_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_chatroom_member` (
  `PKID` int NOT NULL AUTO_INCREMENT,
  `CHATNO` int NOT NULL,
  `USERID` varchar(50) NOT NULL,
  `JOINTIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ROLE` varchar(20) NOT NULL,
  `STATUS` varchar(20) NOT NULL,
  `LASTREAD` int DEFAULT NULL,
  PRIMARY KEY (`PKID`),
  KEY `sns_chatroom_member_ibfk_1` (`USERID`),
  KEY `sns_chatroom_member_ibfk_2` (`CHATNO`),
  KEY `sns_chatroom_member_ibfk_3` (`LASTREAD`),
  CONSTRAINT `sns_chatroom_member_ibfk_1` FOREIGN KEY (`USERID`) REFERENCES `sns_user` (`USERID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `sns_chatroom_member_ibfk_2` FOREIGN KEY (`CHATNO`) REFERENCES `sns_chatroom` (`CHATNO`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `sns_chatroom_member_ibfk_3` FOREIGN KEY (`LASTREAD`) REFERENCES `sns_chatroom_message` (`MSGNO`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_chatroom_member`
--

LOCK TABLES `sns_chatroom_member` WRITE;
/*!40000 ALTER TABLE `sns_chatroom_member` DISABLE KEYS */;
INSERT INTO `sns_chatroom_member` VALUES (1,5,'qwer','2025-11-28 15:58:06','OWNER','JOINED',NULL),(2,6,'qwer','2025-11-28 16:08:32','OWNER','JOINED',NULL),(3,7,'qwer','2025-11-28 16:08:33','OWNER','JOINED',NULL),(4,8,'qwer','2025-11-28 16:12:11','OWNER','JOINED',13),(5,8,'asdf1234','2025-11-28 17:16:10','MEMBER','JOINED',NULL),(6,6,'asdf1234','2025-11-28 17:16:14','MEMBER','JOINED',NULL),(7,5,'asdf1234','2025-11-28 17:16:17','MEMBER','JOINED',NULL),(9,7,'asdf1234','2025-11-28 17:38:25','MEMBER','JOINED',NULL),(10,9,'qwer','2025-12-01 09:35:42','OWNER','JOINED',115),(11,4,'qwer','2025-12-01 09:53:52','MEMBER','LEFT',NULL),(13,9,'asdf1234','2025-12-01 10:51:34','MEMBER','JOINED',115),(14,8,'abc1234','2025-12-01 11:55:20','MEMBER','JOINED',NULL),(15,5,'abc1234','2025-12-01 12:04:23','MEMBER','JOINED',NULL),(16,9,'abc1234','2025-12-01 12:09:13','MEMBER','JOINED',NULL),(17,4,'abc1234','2025-12-01 12:15:22','MEMBER','JOINED',NULL),(23,4,'asdf1234','2025-12-02 11:39:55','MEMBER','JOINED',NULL),(27,16,'asdf1234','2025-12-02 11:49:50','MEMBER','JOINED',369),(28,17,'qwer','2025-12-02 14:58:18','OWNER','JOINED',353),(29,17,'asdf1234','2025-12-02 14:58:24','MEMBER','JOINED',353);
/*!40000 ALTER TABLE `sns_chatroom_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sns_chatroom_message`
--

DROP TABLE IF EXISTS `sns_chatroom_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_chatroom_message` (
  `MSGNO` int NOT NULL AUTO_INCREMENT,
  `CHATNO` int NOT NULL,
  `USERID` varchar(50) NOT NULL,
  `CONTENTS` varchar(500) NOT NULL,
  `FILEPATH` varchar(500) DEFAULT NULL,
  `CDATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MSGNO`),
  KEY `sns_chatroom_message_ibfk_1` (`USERID`),
  KEY `sns_chatroom_message_ibfk_2` (`CHATNO`),
  CONSTRAINT `sns_chatroom_message_ibfk_1` FOREIGN KEY (`USERID`) REFERENCES `sns_user` (`USERID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `sns_chatroom_message_ibfk_2` FOREIGN KEY (`CHATNO`) REFERENCES `sns_chatroom` (`CHATNO`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=370 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_chatroom_message`
--

LOCK TABLES `sns_chatroom_message` WRITE;
/*!40000 ALTER TABLE `sns_chatroom_message` DISABLE KEYS */;
INSERT INTO `sns_chatroom_message` VALUES (1,9,'qwer','1234',NULL,'2025-12-01 10:32:41'),(2,9,'qwer','안녕하세요',NULL,'2025-12-01 10:33:34'),(3,9,'qwer','ㅎㅇㅎㅇ',NULL,'2025-12-01 10:36:37'),(4,9,'qwer','1234',NULL,'2025-12-01 10:37:26'),(5,9,'qwer','1111',NULL,'2025-12-01 10:39:14'),(6,9,'asdf1234','ㅎㅇㅎㅇ',NULL,'2025-12-01 10:51:42'),(7,9,'asdf1234','ss',NULL,'2025-12-01 11:53:49'),(8,9,'qwer','2141234',NULL,'2025-12-01 11:53:53'),(9,9,'qwer','ㅎㅇㅎㅇ',NULL,'2025-12-01 11:54:00'),(10,9,'asdf1234','ㄴㄴ',NULL,'2025-12-01 11:54:09'),(11,8,'qwer','끼얏호우',NULL,'2025-12-01 11:54:28'),(12,8,'asdf1234','ㅉㅉ',NULL,'2025-12-01 11:54:36'),(13,8,'abc1234','ㅎㅇㅎㅇ',NULL,'2025-12-01 11:55:32'),(14,9,'qwer','1234234',NULL,'2025-12-01 12:09:39'),(15,9,'qwer','11',NULL,'2025-12-01 12:09:52'),(16,9,'qwer','22',NULL,'2025-12-01 12:09:54'),(17,4,'qwer','ㅁㄴㅇㄹㄴㅇㅁ',NULL,'2025-12-01 12:15:16'),(18,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:25'),(19,4,'qwer','ㄹㅇ',NULL,'2025-12-01 12:34:25'),(20,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:25'),(21,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:26'),(22,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:26'),(23,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:26'),(24,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:26'),(25,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:26'),(26,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:27'),(27,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:27'),(28,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:27'),(29,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:27'),(30,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:27'),(31,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:27'),(32,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:28'),(33,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:28'),(34,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:28'),(35,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:28'),(36,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:28'),(37,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:29'),(38,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:29'),(39,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:29'),(40,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:29'),(41,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:29'),(42,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:29'),(43,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:30'),(44,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:30'),(45,4,'qwer','ㄹㅇ',NULL,'2025-12-01 12:34:30'),(46,4,'qwer','ㄹ',NULL,'2025-12-01 12:34:30'),(47,4,'qwer','ㄴㅇㅁㄹ',NULL,'2025-12-01 12:34:30'),(48,4,'qwer','ㅁㄴㅇㄹ',NULL,'2025-12-01 12:34:31'),(49,4,'qwer','ㄴㅁㅇ',NULL,'2025-12-01 12:34:31'),(50,4,'qwer','ㄻㄴㅇ',NULL,'2025-12-01 12:34:31'),(51,4,'qwer','ㄹㄴㅁ',NULL,'2025-12-01 12:34:31'),(52,4,'qwer','ㄹ',NULL,'2025-12-01 12:34:31'),(53,4,'abc1234','ㅉ',NULL,'2025-12-01 12:45:11'),(54,4,'abc1234','ㅁㄴㅇㄹ',NULL,'2025-12-01 12:45:24'),(60,4,'qwer','1234',NULL,'2025-12-02 11:02:53'),(61,4,'asdf1234','gd',NULL,'2025-12-02 11:40:00'),(62,4,'qwer','s',NULL,'2025-12-02 11:40:02'),(65,16,'asdf1234','ㅎㅇ',NULL,'2025-12-02 11:49:57'),(66,16,'qwer','ㄴㄴ',NULL,'2025-12-02 11:49:59'),(67,16,'asdf1234','ㅁ\'',NULL,'2025-12-02 13:19:01'),(68,16,'asdf1234','ㄴㅁㅇ',NULL,'2025-12-02 13:19:01'),(69,16,'asdf1234','ㄹㄴ',NULL,'2025-12-02 13:19:01'),(70,16,'asdf1234','ㅁㅇㄹ',NULL,'2025-12-02 13:19:02'),(71,16,'asdf1234','ㄴㅇ',NULL,'2025-12-02 13:19:02'),(72,16,'asdf1234','ㄴㅁㅇㄹ',NULL,'2025-12-02 13:19:02'),(73,16,'asdf1234','ㄴㅇㄻ',NULL,'2025-12-02 13:19:02'),(74,16,'asdf1234','ㄹㄴㅁㅇ',NULL,'2025-12-02 13:19:02'),(75,16,'asdf1234','ㄹ',NULL,'2025-12-02 13:19:02'),(76,16,'asdf1234','ㅁㄴ',NULL,'2025-12-02 13:19:03'),(77,16,'asdf1234','ㄹㄴㅁ',NULL,'2025-12-02 13:19:03'),(78,16,'asdf1234','ㅇ',NULL,'2025-12-02 13:19:03'),(79,16,'asdf1234','ㅁㄴㄹ',NULL,'2025-12-02 13:19:03'),(80,16,'asdf1234','ㄴㅁㅇ',NULL,'2025-12-02 13:19:03'),(81,16,'asdf1234','ㄻㄴㅇ',NULL,'2025-12-02 13:19:03'),(82,16,'asdf1234','ㄹ',NULL,'2025-12-02 13:19:04'),(83,16,'asdf1234','ㅁㄴ',NULL,'2025-12-02 13:19:04'),(84,16,'asdf1234','ㅁㄴ',NULL,'2025-12-02 13:19:06'),(85,16,'asdf1234','ㅇㄹ',NULL,'2025-12-02 13:19:07'),(86,16,'asdf1234','ㄴㅁㅇ',NULL,'2025-12-02 13:19:07'),(87,16,'asdf1234','ㄻㄴ',NULL,'2025-12-02 13:19:07'),(88,16,'asdf1234','ㅇㄹ',NULL,'2025-12-02 13:19:07'),(89,16,'asdf1234','ㄴㅁㅇ',NULL,'2025-12-02 13:19:07'),(90,16,'asdf1234','ㄻㄴ',NULL,'2025-12-02 13:19:07'),(91,16,'asdf1234','ㅇㄹ',NULL,'2025-12-02 13:19:08'),(92,16,'asdf1234','ㄴㅁㅇ',NULL,'2025-12-02 13:19:08'),(93,16,'asdf1234','ㄹㄴㄹ',NULL,'2025-12-02 13:19:10'),(94,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:16'),(95,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:16'),(96,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:16'),(97,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:16'),(98,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:16'),(99,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:17'),(100,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:17'),(101,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:17'),(102,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:17'),(103,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:17'),(104,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:17'),(105,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:18'),(106,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:18'),(107,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:18'),(108,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:18'),(109,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:18'),(110,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:19'),(111,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:19'),(112,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:19'),(113,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:19'),(114,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:19'),(115,9,'asdf1234','ㄴ',NULL,'2025-12-02 13:19:19'),(116,16,'asdf1234','1',NULL,'2025-12-02 13:19:47'),(117,16,'asdf1234','1',NULL,'2025-12-02 13:19:48'),(118,16,'asdf1234','1',NULL,'2025-12-02 13:19:48'),(119,16,'asdf1234','1',NULL,'2025-12-02 13:19:48'),(120,16,'asdf1234','1',NULL,'2025-12-02 13:19:48'),(121,16,'asdf1234','1',NULL,'2025-12-02 13:19:48'),(122,16,'asdf1234','1',NULL,'2025-12-02 13:19:48'),(123,16,'asdf1234','1',NULL,'2025-12-02 13:19:49'),(124,16,'asdf1234','1',NULL,'2025-12-02 13:19:49'),(125,16,'asdf1234','1',NULL,'2025-12-02 13:19:49'),(126,16,'asdf1234','1',NULL,'2025-12-02 13:19:49'),(127,16,'asdf1234','1',NULL,'2025-12-02 13:19:49'),(128,16,'asdf1234','1',NULL,'2025-12-02 13:19:49'),(129,16,'asdf1234','ㄴ',NULL,'2025-12-02 13:23:39'),(130,16,'asdf1234','ㄹㄴㅇ',NULL,'2025-12-02 13:23:39'),(131,16,'asdf1234','ㄹㄴㅇ',NULL,'2025-12-02 13:23:39'),(132,16,'asdf1234','ㄹㄴㅇ',NULL,'2025-12-02 13:23:40'),(133,16,'asdf1234','ㄹ',NULL,'2025-12-02 13:23:40'),(134,16,'asdf1234','ㄹㅇ',NULL,'2025-12-02 13:23:40'),(135,16,'asdf1234','ㄴㅁ',NULL,'2025-12-02 13:23:40'),(136,16,'asdf1234','ㄹㄴㅇㅁ',NULL,'2025-12-02 13:23:40'),(137,16,'asdf1234','ㄹㄴㅁ',NULL,'2025-12-02 13:23:40'),(138,16,'asdf1234','ㄹㄴㅇㅁ',NULL,'2025-12-02 13:23:41'),(139,16,'asdf1234','ㄹㄴㅇ',NULL,'2025-12-02 13:23:41'),(140,16,'asdf1234','ㄹㄴㅇㅁㄻㄴ',NULL,'2025-12-02 13:23:43'),(141,16,'asdf1234','ㄴㅇ',NULL,'2025-12-02 13:23:43'),(142,16,'asdf1234','ㄹㄴㅁㅇ',NULL,'2025-12-02 13:23:44'),(143,16,'asdf1234','ㄹㄴㅇㅁ',NULL,'2025-12-02 13:23:44'),(144,16,'asdf1234','ㄹㄴㅇㅁ',NULL,'2025-12-02 13:23:44'),(145,16,'asdf1234','ㄴㅇㅁㄹ',NULL,'2025-12-02 13:23:44'),(146,16,'asdf1234','ㄹㄴㅇㅁ',NULL,'2025-12-02 13:23:44'),(147,16,'asdf1234','ㄴㅇㄹ',NULL,'2025-12-02 13:23:45'),(148,16,'asdf1234','1',NULL,'2025-12-02 14:39:54'),(149,16,'asdf1234','2',NULL,'2025-12-02 14:39:55'),(150,16,'asdf1234','34',NULL,'2025-12-02 14:39:55'),(151,16,'asdf1234','23',NULL,'2025-12-02 14:39:55'),(152,16,'asdf1234','41',NULL,'2025-12-02 14:39:55'),(153,16,'asdf1234','24',NULL,'2025-12-02 14:39:55'),(154,16,'asdf1234','213',NULL,'2025-12-02 14:39:56'),(155,16,'asdf1234','42',NULL,'2025-12-02 14:39:56'),(156,16,'asdf1234','42',NULL,'2025-12-02 14:39:56'),(157,16,'asdf1234','34',NULL,'2025-12-02 14:39:56'),(158,16,'asdf1234','234',NULL,'2025-12-02 14:39:56'),(159,16,'asdf1234','23',NULL,'2025-12-02 14:39:57'),(160,16,'asdf1234','4213',NULL,'2025-12-02 14:39:57'),(161,16,'asdf1234','42',NULL,'2025-12-02 14:39:57'),(162,16,'asdf1234','34',NULL,'2025-12-02 14:39:57'),(163,16,'asdf1234','1234',NULL,'2025-12-02 14:39:57'),(164,16,'asdf1234','123',NULL,'2025-12-02 14:39:58'),(165,16,'asdf1234','42',NULL,'2025-12-02 14:39:58'),(166,16,'asdf1234','342',NULL,'2025-12-02 14:39:59'),(167,16,'qwer','1242134231421342341243',NULL,'2025-12-02 14:40:16'),(168,16,'qwer','1234234',NULL,'2025-12-02 14:40:18'),(169,16,'qwer','ㅎㄹ',NULL,'2025-12-02 14:40:21'),(170,16,'qwer','ㅗ',NULL,'2025-12-02 14:40:21'),(171,16,'qwer','ㅎ로',NULL,'2025-12-02 14:40:22'),(172,16,'qwer','ㄹ호',NULL,'2025-12-02 14:40:22'),(173,16,'qwer','ㄹ호',NULL,'2025-12-02 14:40:22'),(174,16,'qwer','ㅇ로',NULL,'2025-12-02 14:40:22'),(175,16,'qwer','ㄹ오',NULL,'2025-12-02 14:40:22'),(176,16,'qwer','ㄹ오',NULL,'2025-12-02 14:40:22'),(177,16,'qwer','ㄷㅈ',NULL,'2025-12-02 14:40:23'),(178,16,'qwer','ㄷㄱㄷ',NULL,'2025-12-02 14:40:23'),(179,16,'qwer','ㄴ',NULL,'2025-12-02 14:40:23'),(180,16,'qwer','ㅎ',NULL,'2025-12-02 14:40:23'),(181,16,'qwer','ㄴㄱㄱ',NULL,'2025-12-02 14:40:24'),(182,16,'qwer','ㅇㄴㄴ',NULL,'2025-12-02 14:40:24'),(183,16,'asdf1234','1',NULL,'2025-12-02 14:41:14'),(184,16,'asdf1234','4',NULL,'2025-12-02 14:41:19'),(185,16,'asdf1234','3',NULL,'2025-12-02 14:41:20'),(186,16,'asdf1234','43',NULL,'2025-12-02 14:41:20'),(187,16,'asdf1234','4',NULL,'2025-12-02 14:41:20'),(188,16,'asdf1234','1',NULL,'2025-12-02 14:41:21'),(189,16,'asdf1234','3',NULL,'2025-12-02 14:41:21'),(190,16,'asdf1234','3',NULL,'2025-12-02 14:41:21'),(191,16,'asdf1234','3',NULL,'2025-12-02 14:41:21'),(192,16,'asdf1234','3',NULL,'2025-12-02 14:41:21'),(193,16,'asdf1234','2',NULL,'2025-12-02 14:41:25'),(194,16,'asdf1234','2',NULL,'2025-12-02 14:41:25'),(195,16,'asdf1234','1',NULL,'2025-12-02 14:41:25'),(196,16,'asdf1234','4',NULL,'2025-12-02 14:41:25'),(197,16,'asdf1234','12',NULL,'2025-12-02 14:41:26'),(198,16,'asdf1234','24',NULL,'2025-12-02 14:41:26'),(199,16,'asdf1234','2',NULL,'2025-12-02 14:41:26'),(200,16,'asdf1234','43',NULL,'2025-12-02 14:41:26'),(201,16,'asdf1234','3',NULL,'2025-12-02 14:41:27'),(202,16,'asdf1234','34',NULL,'2025-12-02 14:41:28'),(203,16,'asdf1234','1',NULL,'2025-12-02 14:41:28'),(204,16,'asdf1234','1',NULL,'2025-12-02 14:41:31'),(205,16,'asdf1234','21',NULL,'2025-12-02 14:41:31'),(206,16,'asdf1234','1',NULL,'2025-12-02 14:41:31'),(207,16,'asdf1234','1',NULL,'2025-12-02 14:41:32'),(208,16,'asdf1234','1',NULL,'2025-12-02 14:41:32'),(209,16,'asdf1234','11',NULL,'2025-12-02 14:41:32'),(210,16,'asdf1234','1',NULL,'2025-12-02 14:41:32'),(211,16,'asdf1234','1',NULL,'2025-12-02 14:41:37'),(212,16,'asdf1234','1',NULL,'2025-12-02 14:41:37'),(213,16,'asdf1234','1',NULL,'2025-12-02 14:41:37'),(214,16,'asdf1234','1',NULL,'2025-12-02 14:41:38'),(215,16,'asdf1234','1',NULL,'2025-12-02 14:41:38'),(216,16,'asdf1234','1',NULL,'2025-12-02 14:41:38'),(217,16,'asdf1234','1',NULL,'2025-12-02 14:41:38'),(218,16,'asdf1234','11',NULL,'2025-12-02 14:41:38'),(219,16,'asdf1234','1',NULL,'2025-12-02 14:41:39'),(220,16,'asdf1234','1',NULL,'2025-12-02 14:41:39'),(221,16,'asdf1234','1',NULL,'2025-12-02 14:41:39'),(222,16,'asdf1234','3',NULL,'2025-12-02 14:41:40'),(223,16,'asdf1234','23',NULL,'2025-12-02 14:41:40'),(224,16,'asdf1234','23',NULL,'2025-12-02 14:41:40'),(225,16,'asdf1234','2',NULL,'2025-12-02 14:41:41'),(226,16,'asdf1234','32',NULL,'2025-12-02 14:41:41'),(227,16,'asdf1234','23',NULL,'2025-12-02 14:41:41'),(228,16,'asdf1234','23',NULL,'2025-12-02 14:41:41'),(229,16,'asdf1234','23',NULL,'2025-12-02 14:41:42'),(230,16,'asdf1234','2',NULL,'2025-12-02 14:41:45'),(231,16,'qwer','ㅎㅇ',NULL,'2025-12-02 14:41:55'),(232,16,'asdf1234','ㅇㅇ',NULL,'2025-12-02 14:42:41'),(233,16,'asdf1234','ㅁㄴㅇㄹ',NULL,'2025-12-02 14:42:49'),(234,16,'asdf1234','ㅁㄴㄹ',NULL,'2025-12-02 14:42:50'),(235,16,'asdf1234','ㅇㄹ',NULL,'2025-12-02 14:42:50'),(236,16,'asdf1234','ㅇㅇ',NULL,'2025-12-02 14:42:51'),(237,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:42:51'),(238,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:42:51'),(239,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:42:51'),(240,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:42:52'),(241,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:42:52'),(242,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:42:52'),(243,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:42:52'),(244,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:42:52'),(245,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:42:53'),(246,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:15'),(247,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:16'),(248,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:16'),(249,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:16'),(250,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:16'),(251,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:16'),(252,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:16'),(253,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:17'),(254,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:17'),(255,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:17'),(256,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:17'),(257,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:17'),(258,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:18'),(259,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:18'),(260,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:18'),(261,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:18'),(262,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:18'),(263,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:19'),(264,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:19'),(265,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:19'),(266,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:19'),(267,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:19'),(268,16,'asdf1234','ㅇ',NULL,'2025-12-02 14:49:19'),(269,16,'qwer','ㅉㅉ',NULL,'2025-12-02 14:49:28'),(270,16,'asdf1234','ㄴㄴ',NULL,'2025-12-02 14:49:33'),(271,16,'asdf1234','ㅇㅇ',NULL,'2025-12-02 14:56:23'),(272,16,'asdf1234','ㅇㅇ',NULL,'2025-12-02 14:56:46'),(273,16,'qwer','ㅇㅇ',NULL,'2025-12-02 14:57:13'),(274,16,'asdf1234','ㄴㄴ',NULL,'2025-12-02 14:57:16'),(275,16,'asdf1234','ㄴㄴ',NULL,'2025-12-02 14:57:39'),(276,17,'asdf1234','ㄴ',NULL,'2025-12-02 14:58:26'),(277,17,'qwer','ㅇㅇ',NULL,'2025-12-02 14:58:47'),(278,17,'qwer','ㄴㄴ',NULL,'2025-12-02 15:05:10'),(279,17,'asdf1234','ㄴㄴ',NULL,'2025-12-02 15:05:15'),(280,17,'asdf1234','ㅇㅇ',NULL,'2025-12-02 15:05:35'),(281,17,'asdf1234','ㄴㄴ',NULL,'2025-12-02 15:19:23'),(282,17,'asdf1234','ㅇㅇ',NULL,'2025-12-02 15:19:24'),(283,17,'asdf1234','ㄴㄴ',NULL,'2025-12-02 15:19:29'),(284,17,'asdf1234','ㄴㄴ',NULL,'2025-12-02 15:19:31'),(285,17,'asdf1234','ㄴㄴ',NULL,'2025-12-02 15:26:35'),(286,17,'qwer','ㅎㅇ',NULL,'2025-12-02 15:26:37'),(287,17,'asdf1234','ㄴㄴ',NULL,'2025-12-02 15:26:42'),(288,17,'qwer','엑',NULL,'2025-12-02 15:59:46'),(293,17,'asdf1234','qw',NULL,'2025-12-02 16:46:11'),(295,17,'asdf1234','d',NULL,'2025-12-02 16:46:50'),(296,17,'asdf1234','d',NULL,'2025-12-02 16:46:50'),(297,17,'asdf1234','fd',NULL,'2025-12-02 16:46:51'),(298,17,'asdf1234','d',NULL,'2025-12-02 16:46:51'),(299,17,'asdf1234','fd',NULL,'2025-12-02 16:46:51'),(300,17,'asdf1234','saf',NULL,'2025-12-02 16:46:51'),(301,17,'asdf1234','as',NULL,'2025-12-02 16:46:51'),(302,17,'asdf1234','fsa',NULL,'2025-12-02 16:46:52'),(303,17,'asdf1234','f',NULL,'2025-12-02 16:46:52'),(304,17,'asdf1234','as',NULL,'2025-12-02 16:46:52'),(305,17,'asdf1234','fasd',NULL,'2025-12-02 16:46:52'),(306,17,'asdf1234','fsa',NULL,'2025-12-02 16:46:52'),(307,17,'asdf1234','da',NULL,'2025-12-02 16:46:53'),(308,17,'asdf1234','f',NULL,'2025-12-02 16:46:53'),(309,17,'asdf1234','dsaf',NULL,'2025-12-02 16:46:53'),(310,17,'asdf1234','asd',NULL,'2025-12-02 16:46:53'),(311,17,'asdf1234','fsa',NULL,'2025-12-02 16:46:53'),(312,17,'asdf1234','sa',NULL,'2025-12-02 16:46:54'),(313,17,'asdf1234','df',NULL,'2025-12-02 16:46:54'),(314,17,'asdf1234','saf',NULL,'2025-12-02 16:46:54'),(315,17,'asdf1234','sad',NULL,'2025-12-02 16:46:54'),(316,17,'asdf1234','fas',NULL,'2025-12-02 16:46:55'),(317,17,'asdf1234','dfas',NULL,'2025-12-02 16:46:55'),(318,17,'asdf1234','d',NULL,'2025-12-02 16:46:55'),(319,17,'asdf1234','fasf',NULL,'2025-12-02 16:46:55'),(320,17,'asdf1234','asd',NULL,'2025-12-02 16:46:55'),(321,17,'asdf1234','f',NULL,'2025-12-02 16:46:56'),(322,17,'asdf1234','a',NULL,'2025-12-02 16:46:57'),(324,17,'qwer','sa',NULL,'2025-12-02 17:01:20'),(325,17,'qwer','as',NULL,'2025-12-02 17:01:21'),(326,17,'qwer','safd',NULL,'2025-12-02 17:01:21'),(327,17,'qwer','df',NULL,'2025-12-02 17:01:21'),(328,17,'qwer','ds',NULL,'2025-12-02 17:01:21'),(329,17,'qwer','fsda',NULL,'2025-12-02 17:01:21'),(330,17,'qwer','f',NULL,'2025-12-02 17:01:22'),(331,17,'qwer','sdf',NULL,'2025-12-02 17:01:22'),(332,17,'qwer','sadf',NULL,'2025-12-02 17:01:22'),(333,17,'qwer','sda',NULL,'2025-12-02 17:01:22'),(334,17,'qwer','fsad',NULL,'2025-12-02 17:01:22'),(335,17,'qwer','fsad',NULL,'2025-12-02 17:01:22'),(336,17,'qwer','fs',NULL,'2025-12-02 17:01:23'),(337,17,'qwer','adf',NULL,'2025-12-02 17:01:23'),(338,17,'qwer','sadf',NULL,'2025-12-02 17:01:23'),(339,17,'qwer','sad',NULL,'2025-12-02 17:01:23'),(340,17,'qwer','fsad',NULL,'2025-12-02 17:01:23'),(341,17,'qwer','fsa',NULL,'2025-12-02 17:01:24'),(342,17,'qwer','df',NULL,'2025-12-02 17:01:24'),(343,17,'qwer','sadf',NULL,'2025-12-02 17:01:24'),(344,17,'qwer','sd',NULL,'2025-12-02 17:01:24'),(345,17,'qwer','fsad',NULL,'2025-12-02 17:01:24'),(346,17,'qwer','f',NULL,'2025-12-02 17:01:24'),(347,17,'qwer','sdaf',NULL,'2025-12-02 17:01:25'),(348,17,'qwer','sadf',NULL,'2025-12-02 17:01:25'),(349,17,'qwer','sd',NULL,'2025-12-02 17:01:25'),(350,17,'qwer','fsa',NULL,'2025-12-02 17:01:25'),(351,17,'qwer','df',NULL,'2025-12-02 17:01:25'),(352,17,'qwer','a',NULL,'2025-12-02 17:01:26'),(353,17,'qwer','f',NULL,'2025-12-02 17:01:26'),(354,16,'asdf1234','s',NULL,'2025-12-02 17:01:50'),(355,16,'asdf1234','s',NULL,'2025-12-02 17:01:51'),(356,16,'asdf1234','s',NULL,'2025-12-02 17:01:51'),(357,16,'asdf1234','s',NULL,'2025-12-02 17:01:51'),(358,16,'asdf1234','s',NULL,'2025-12-02 17:01:51'),(359,16,'asdf1234','s',NULL,'2025-12-02 17:01:51'),(360,16,'asdf1234','s',NULL,'2025-12-02 17:01:51'),(361,16,'asdf1234','s',NULL,'2025-12-02 17:01:52'),(362,16,'asdf1234','d',NULL,'2025-12-02 17:01:52'),(363,16,'asdf1234','fa',NULL,'2025-12-02 17:01:52'),(364,16,'asdf1234','sf',NULL,'2025-12-02 17:01:52'),(365,16,'asdf1234','as',NULL,'2025-12-02 17:01:52'),(366,16,'asdf1234','df',NULL,'2025-12-02 17:01:52'),(367,16,'asdf1234','asd',NULL,'2025-12-02 17:01:52'),(368,16,'asdf1234','fas',NULL,'2025-12-02 17:01:53'),(369,16,'asdf1234','d',NULL,'2025-12-02 17:01:53');
/*!40000 ALTER TABLE `sns_chatroom_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sns_comment`
--

DROP TABLE IF EXISTS `sns_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_comment` (
  `COMMENTNO` int NOT NULL AUTO_INCREMENT,
  `USERID` varchar(50) NOT NULL,
  `FEEDNO` int NOT NULL,
  `CONTENTS` varchar(800) NOT NULL,
  `CDATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UDATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PRCOMMENTNO` int DEFAULT NULL,
  `ISDELETED` char(1) NOT NULL DEFAULT 'F',
  PRIMARY KEY (`COMMENTNO`),
  KEY `PRCOMMENTNO` (`PRCOMMENTNO`),
  KEY `sns_comment_ibfk_1` (`USERID`),
  KEY `sns_comment_ibfk_2` (`FEEDNO`),
  CONSTRAINT `sns_comment_ibfk_1` FOREIGN KEY (`USERID`) REFERENCES `sns_user` (`USERID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `sns_comment_ibfk_2` FOREIGN KEY (`FEEDNO`) REFERENCES `sns_feed` (`FEEDNO`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_comment`
--

LOCK TABLES `sns_comment` WRITE;
/*!40000 ALTER TABLE `sns_comment` DISABLE KEYS */;
INSERT INTO `sns_comment` VALUES (1,'admin01',5,'나가','2025-11-27 14:50:50','2025-11-27 14:50:50',NULL,'T'),(3,'admin01',4,'어','2025-11-27 14:52:18','2025-11-27 14:52:18',NULL,'F'),(4,'admin01',3,'에휴','2025-11-27 17:11:11','2025-11-27 17:11:11',NULL,'F'),(5,'qwer',4,'으멩넴겜ㄴ에','2025-11-27 18:32:10','2025-11-27 18:32:10',2,'F'),(6,'qwer',4,'2141243','2025-11-27 18:49:06','2025-11-27 18:49:06',3,'F'),(7,'qwer',5,'ㅂㅈㄷㄱ','2025-11-27 18:49:14','2025-11-27 18:49:14',1,'F'),(8,'qwer',5,'ㄴㄴ','2025-11-27 18:49:33','2025-11-27 18:49:33',1,'F'),(9,'qwer',4,'ㄴㄴ','2025-11-27 18:49:41','2025-11-27 18:49:41',2,'F'),(11,'qwer',4,'ㄴㄴ','2025-11-27 18:52:40','2025-11-27 18:52:40',NULL,'F'),(12,'qwer',4,'ㄴㄴ','2025-11-27 18:55:11','2025-11-27 18:55:11',10,'F'),(13,'qwer',4,'ㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁ','2025-11-27 19:06:21','2025-11-27 19:06:21',NULL,'F'),(14,'qwer',5,'qwe','2025-11-28 10:41:04','2025-11-28 10:41:04',1,'T'),(15,'qwer',2,'부모댓글1','2025-11-28 10:49:38','2025-11-28 10:49:38',NULL,'F'),(16,'qwer',2,'대댓글1','2025-11-28 10:49:44','2025-11-28 10:49:44',15,'F'),(17,'qwer',2,'대댓글2\n','2025-11-28 10:49:49','2025-11-28 10:49:49',15,'F'),(18,'qwer',2,'대댓글3','2025-11-28 10:49:57','2025-11-28 10:49:57',15,'F'),(19,'qwer',5,'ㅁㅇㄴㄹ','2025-11-28 11:18:33','2025-11-28 11:18:33',NULL,'F'),(20,'qwer',5,'ㅁㄴㅇㄻㄴㅇㄻㄴ','2025-11-28 11:18:50','2025-11-28 11:18:50',NULL,'F'),(21,'qwer',5,'12432342134','2025-11-28 11:18:53','2025-11-28 11:18:53',19,'F'),(22,'qwer',5,'12421342134','2025-11-28 11:18:57','2025-11-28 11:18:57',20,'F'),(23,'qwer',5,'13423142341123','2025-11-28 11:19:05','2025-11-28 11:19:05',19,'F'),(24,'qwer',5,'412342134','2025-11-28 11:19:10','2025-11-28 11:19:10',20,'F'),(25,'qwer',7,'qwerq','2025-11-28 12:31:59','2025-11-28 12:31:59',NULL,'F'),(26,'qwer',6,'sfddasfsadfawefewafa','2025-11-28 12:32:05','2025-11-28 12:32:05',NULL,'F'),(27,'qwer',3,'ss','2025-11-28 13:05:51','2025-11-28 13:05:51',NULL,'F'),(28,'qwer',10,'1231','2025-12-01 11:43:09','2025-12-01 11:43:09',NULL,'F'),(29,'qwer',10,'11444','2025-12-01 11:43:12','2025-12-01 11:43:12',28,'F'),(30,'qwer',11,'asdfsad','2025-12-02 18:19:15','2025-12-02 18:19:15',NULL,'F'),(31,'qwer',11,'asdfadsf','2025-12-02 18:20:46','2025-12-02 18:20:46',30,'F');
/*!40000 ALTER TABLE `sns_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sns_feed`
--

DROP TABLE IF EXISTS `sns_feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_feed` (
  `FEEDNO` int NOT NULL AUTO_INCREMENT,
  `USERID` varchar(50) NOT NULL,
  `TITLE` varchar(100) NOT NULL,
  `CONTENTS` varchar(500) NOT NULL,
  `CNT` int NOT NULL DEFAULT '0',
  `CDATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UDATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TYPE` char(1) NOT NULL DEFAULT 'F',
  PRIMARY KEY (`FEEDNO`),
  KEY `sns_feed_ibfk_1` (`USERID`),
  CONSTRAINT `sns_feed_ibfk_1` FOREIGN KEY (`USERID`) REFERENCES `sns_user` (`USERID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_feed`
--

LOCK TABLES `sns_feed` WRITE;
/*!40000 ALTER TABLE `sns_feed` DISABLE KEYS */;
INSERT INTO `sns_feed` VALUES (2,'admin01','테스트','테스트1',0,'2025-11-26 18:52:56','2025-11-26 18:52:56','N'),(3,'admin01','엉엉','앙앙',0,'2025-11-26 18:58:19','2025-11-26 18:58:19','F'),(4,'qwer','오','왓',0,'2025-11-26 20:04:36','2025-11-26 20:04:36','F'),(5,'qwer','따흐흑','따흐앙',0,'2025-11-27 11:34:33','2025-11-27 11:34:33','Q'),(6,'abc1234','호엥','엥호',0,'2025-11-28 11:46:22','2025-11-28 11:46:22','F'),(7,'abc1234','에','애',0,'2025-11-28 11:48:17','2025-11-28 11:48:17','F'),(8,'qwer','asfas','2416523',0,'2025-11-28 13:05:42','2025-11-28 13:05:42','F'),(9,'asdf1234','121212','0101010',0,'2025-12-01 09:37:40','2025-12-01 09:37:40','F'),(10,'qwer','12121212','1121212',0,'2025-12-01 11:43:01','2025-12-01 11:43:01','F'),(11,'qwer','끼얏호우','뭣',0,'2025-12-02 10:10:02','2025-12-02 10:10:02','F');
/*!40000 ALTER TABLE `sns_feed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sns_feed_img`
--

DROP TABLE IF EXISTS `sns_feed_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_feed_img` (
  `IMGNO` int NOT NULL AUTO_INCREMENT,
  `FEEDNO` int NOT NULL,
  `IMGNAME` varchar(100) NOT NULL,
  `IMGPATH` varchar(500) NOT NULL,
  `IMGORGNAME` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IMGNO`),
  KEY `sns_feed_img_ibfk_1` (`FEEDNO`),
  CONSTRAINT `sns_feed_img_ibfk_1` FOREIGN KEY (`FEEDNO`) REFERENCES `sns_feed` (`FEEDNO`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_feed_img`
--

LOCK TABLES `sns_feed_img` WRITE;
/*!40000 ALTER TABLE `sns_feed_img` DISABLE KEYS */;
/*!40000 ALTER TABLE `sns_feed_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sns_profile_img`
--

DROP TABLE IF EXISTS `sns_profile_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_profile_img` (
  `IMGNO` int NOT NULL AUTO_INCREMENT,
  `IMGNAME` varchar(100) NOT NULL,
  `IMGPATH` varchar(500) NOT NULL,
  `IMGORGNAME` varchar(100) NOT NULL,
  PRIMARY KEY (`IMGNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_profile_img`
--

LOCK TABLES `sns_profile_img` WRITE;
/*!40000 ALTER TABLE `sns_profile_img` DISABLE KEYS */;
/*!40000 ALTER TABLE `sns_profile_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sns_report`
--

DROP TABLE IF EXISTS `sns_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_report` (
  `REPORTNO` int NOT NULL AUTO_INCREMENT,
  `REPORTTYPE` varchar(50) NOT NULL,
  `USERID` varchar(50) NOT NULL,
  `REPORTID` varchar(50) NOT NULL,
  `REPORTBNO` int DEFAULT NULL,
  `REPORTCNO` int DEFAULT NULL,
  `REPORTCONT` varchar(300) NOT NULL,
  `RDATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`REPORTNO`),
  KEY `sns_report_ibfk_1` (`USERID`),
  CONSTRAINT `sns_report_ibfk_1` FOREIGN KEY (`USERID`) REFERENCES `sns_user` (`USERID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_report`
--

LOCK TABLES `sns_report` WRITE;
/*!40000 ALTER TABLE `sns_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `sns_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sns_user`
--

DROP TABLE IF EXISTS `sns_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sns_user` (
  `USERID` varchar(50) NOT NULL,
  `PASSWORD` varchar(300) NOT NULL,
  `NICKNAME` varchar(50) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `IMGPATH` varchar(300) NOT NULL,
  `STATUS` char(1) NOT NULL DEFAULT 'U',
  `CDATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UDATETIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `NICKCHANGE` int NOT NULL DEFAULT '0',
  `LIGHTDARK` char(1) NOT NULL DEFAULT 'L',
  PRIMARY KEY (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_user`
--

LOCK TABLES `sns_user` WRITE;
/*!40000 ALTER TABLE `sns_user` DISABLE KEYS */;
INSERT INTO `sns_user` VALUES ('abc1234','$2b$10$Y/N8tjCbh.zkBv0zRKvbg.jBk0DQS/HV6btLOnGjqJ7HJyoHbF6TO','abcabc','abc1234@naver.com','http://localhost:3020/user/uploads/profile-images/profile07.png','U','2025-11-28 11:44:56','2025-11-28 11:44:56',0,'L'),('admin01','$2b$10$tuOLOTObZOVz8RsqQp82SuEkZwjBsgJxXBCN65AIRLy1QMBvnYSha','관리자','admin01@gmail.com','http://localhost:3020/user/uploads/profile-images/profile01.png','A','2025-11-26 18:03:18','2025-11-26 18:03:18',0,'L'),('asdf1234','$2b$10$VlWqIdbgnh7Kiv5qGI9r9.rM/3U3BvaP0LvTPZKc7KEJpqCNiT28u','asdf1234','asdf1234@gmail.com','http://localhost:3020/user/uploads/profile-images/profile10.png','U','2025-11-26 15:43:21','2025-11-26 15:43:21',0,'L'),('qwer','$2b$10$eFkiubb8rS3iPkXfn7Gud.ckbnyDAaPcCa6GjwVOZV73U3BAS8Jni','qwer','qwer@gmail.com','http://localhost:3020/user/uploads/profile-images/profile13.png','U','2025-11-26 20:04:23','2025-11-26 20:04:23',0,'D');
/*!40000 ALTER TABLE `sns_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mysqldb'
--

--
-- Dumping routines for database 'mysqldb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-02 18:25:49
