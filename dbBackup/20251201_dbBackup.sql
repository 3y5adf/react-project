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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_chatroom`
--

LOCK TABLES `sns_chatroom` WRITE;
/*!40000 ALTER TABLE `sns_chatroom` DISABLE KEYS */;
INSERT INTO `sns_chatroom` VALUES (1,'asasdf','qwer','O','2025-11-28 15:44:09'),(2,'뮵ㅈㄷ','qwer','O','2025-11-28 15:50:38'),(3,'ㅂㅈㄷㄱ','qwer','O','2025-11-28 15:50:59'),(4,'1241','qwer','O','2025-11-28 15:51:49'),(5,'테스트1','qwer','O','2025-11-28 15:58:06'),(6,'114','qwer','O','2025-11-28 16:08:32'),(7,'114','qwer','O','2025-11-28 16:08:33'),(8,'123','qwer','O','2025-11-28 16:12:11'),(9,'251201','qwer','O','2025-12-01 09:35:42'),(10,'테스트1201','qwer','O','2025-12-01 12:57:40'),(11,'Dldaindf','qwer','O','2025-12-01 13:02:50'),(12,'테스트2','qwer','O','2025-12-01 13:06:11'),(13,'ㅁㄴㅇㅇ','qwer','O','2025-12-01 13:06:50'),(14,'테스ㅡㅌ23','qwer','O','2025-12-01 13:07:11');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_chatroom_member`
--

LOCK TABLES `sns_chatroom_member` WRITE;
/*!40000 ALTER TABLE `sns_chatroom_member` DISABLE KEYS */;
INSERT INTO `sns_chatroom_member` VALUES (1,5,'qwer','2025-11-28 15:58:06','OWNER','JOINED',NULL),(2,6,'qwer','2025-11-28 16:08:32','OWNER','JOINED',NULL),(3,7,'qwer','2025-11-28 16:08:33','OWNER','JOINED',NULL),(4,8,'qwer','2025-11-28 16:12:11','OWNER','JOINED',NULL),(5,8,'asdf1234','2025-11-28 17:16:10','MEMBER','JOINED',NULL),(6,6,'asdf1234','2025-11-28 17:16:14','MEMBER','JOINED',NULL),(7,5,'asdf1234','2025-11-28 17:16:17','MEMBER','JOINED',NULL),(9,7,'asdf1234','2025-11-28 17:38:25','MEMBER','JOINED',NULL),(10,9,'qwer','2025-12-01 09:35:42','OWNER','JOINED',NULL),(11,4,'qwer','2025-12-01 09:53:52','MEMBER','JOINED',NULL),(12,3,'qwer','2025-12-01 09:54:58','MEMBER','JOINED',NULL),(13,9,'asdf1234','2025-12-01 10:51:34','MEMBER','JOINED',NULL),(14,8,'abc1234','2025-12-01 11:55:20','MEMBER','JOINED',NULL),(15,5,'abc1234','2025-12-01 12:04:23','MEMBER','JOINED',NULL),(16,9,'abc1234','2025-12-01 12:09:13','MEMBER','JOINED',NULL),(17,4,'abc1234','2025-12-01 12:15:22','MEMBER','JOINED',NULL),(18,10,'qwer','2025-12-01 12:57:40','OWNER','JOINED',NULL),(19,11,'qwer','2025-12-01 13:02:50','OWNER','JOINED',NULL),(20,12,'qwer','2025-12-01 13:06:11','OWNER','JOINED',NULL),(21,13,'qwer','2025-12-01 13:06:50','OWNER','JOINED',NULL),(22,14,'qwer','2025-12-01 13:07:11','OWNER','LEFT',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_chatroom_message`
--

LOCK TABLES `sns_chatroom_message` WRITE;
/*!40000 ALTER TABLE `sns_chatroom_message` DISABLE KEYS */;
INSERT INTO `sns_chatroom_message` VALUES (1,9,'qwer','1234',NULL,'2025-12-01 10:32:41'),(2,9,'qwer','안녕하세요',NULL,'2025-12-01 10:33:34'),(3,9,'qwer','ㅎㅇㅎㅇ',NULL,'2025-12-01 10:36:37'),(4,9,'qwer','1234',NULL,'2025-12-01 10:37:26'),(5,9,'qwer','1111',NULL,'2025-12-01 10:39:14'),(6,9,'asdf1234','ㅎㅇㅎㅇ',NULL,'2025-12-01 10:51:42'),(7,9,'asdf1234','ss',NULL,'2025-12-01 11:53:49'),(8,9,'qwer','2141234',NULL,'2025-12-01 11:53:53'),(9,9,'qwer','ㅎㅇㅎㅇ',NULL,'2025-12-01 11:54:00'),(10,9,'asdf1234','ㄴㄴ',NULL,'2025-12-01 11:54:09'),(11,8,'qwer','끼얏호우',NULL,'2025-12-01 11:54:28'),(12,8,'asdf1234','ㅉㅉ',NULL,'2025-12-01 11:54:36'),(13,8,'abc1234','ㅎㅇㅎㅇ',NULL,'2025-12-01 11:55:32'),(14,9,'qwer','1234234',NULL,'2025-12-01 12:09:39'),(15,9,'qwer','11',NULL,'2025-12-01 12:09:52'),(16,9,'qwer','22',NULL,'2025-12-01 12:09:54'),(17,4,'qwer','ㅁㄴㅇㄹㄴㅇㅁ',NULL,'2025-12-01 12:15:16'),(18,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:25'),(19,4,'qwer','ㄹㅇ',NULL,'2025-12-01 12:34:25'),(20,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:25'),(21,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:26'),(22,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:26'),(23,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:26'),(24,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:26'),(25,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:26'),(26,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:27'),(27,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:27'),(28,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:27'),(29,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:27'),(30,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:27'),(31,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:27'),(32,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:28'),(33,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:28'),(34,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:28'),(35,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:28'),(36,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:28'),(37,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:29'),(38,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:29'),(39,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:29'),(40,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:29'),(41,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:29'),(42,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:29'),(43,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:30'),(44,4,'qwer','ㅇ',NULL,'2025-12-01 12:34:30'),(45,4,'qwer','ㄹㅇ',NULL,'2025-12-01 12:34:30'),(46,4,'qwer','ㄹ',NULL,'2025-12-01 12:34:30'),(47,4,'qwer','ㄴㅇㅁㄹ',NULL,'2025-12-01 12:34:30'),(48,4,'qwer','ㅁㄴㅇㄹ',NULL,'2025-12-01 12:34:31'),(49,4,'qwer','ㄴㅁㅇ',NULL,'2025-12-01 12:34:31'),(50,4,'qwer','ㄻㄴㅇ',NULL,'2025-12-01 12:34:31'),(51,4,'qwer','ㄹㄴㅁ',NULL,'2025-12-01 12:34:31'),(52,4,'qwer','ㄹ',NULL,'2025-12-01 12:34:31'),(53,4,'abc1234','ㅉ',NULL,'2025-12-01 12:45:11'),(54,4,'abc1234','ㅁㄴㅇㄹ',NULL,'2025-12-01 12:45:24');
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_comment`
--

LOCK TABLES `sns_comment` WRITE;
/*!40000 ALTER TABLE `sns_comment` DISABLE KEYS */;
INSERT INTO `sns_comment` VALUES (1,'admin01',5,'나가','2025-11-27 14:50:50','2025-11-27 14:50:50',NULL,'T'),(3,'admin01',4,'어','2025-11-27 14:52:18','2025-11-27 14:52:18',NULL,'F'),(4,'admin01',3,'에휴','2025-11-27 17:11:11','2025-11-27 17:11:11',NULL,'F'),(5,'qwer',4,'으멩넴겜ㄴ에','2025-11-27 18:32:10','2025-11-27 18:32:10',2,'F'),(6,'qwer',4,'2141243','2025-11-27 18:49:06','2025-11-27 18:49:06',3,'F'),(7,'qwer',5,'ㅂㅈㄷㄱ','2025-11-27 18:49:14','2025-11-27 18:49:14',1,'F'),(8,'qwer',5,'ㄴㄴ','2025-11-27 18:49:33','2025-11-27 18:49:33',1,'F'),(9,'qwer',4,'ㄴㄴ','2025-11-27 18:49:41','2025-11-27 18:49:41',2,'F'),(11,'qwer',4,'ㄴㄴ','2025-11-27 18:52:40','2025-11-27 18:52:40',NULL,'F'),(12,'qwer',4,'ㄴㄴ','2025-11-27 18:55:11','2025-11-27 18:55:11',10,'F'),(13,'qwer',4,'ㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁ','2025-11-27 19:06:21','2025-11-27 19:06:21',NULL,'F'),(14,'qwer',5,'qwe','2025-11-28 10:41:04','2025-11-28 10:41:04',1,'T'),(15,'qwer',2,'부모댓글1','2025-11-28 10:49:38','2025-11-28 10:49:38',NULL,'F'),(16,'qwer',2,'대댓글1','2025-11-28 10:49:44','2025-11-28 10:49:44',15,'F'),(17,'qwer',2,'대댓글2\n','2025-11-28 10:49:49','2025-11-28 10:49:49',15,'F'),(18,'qwer',2,'대댓글3','2025-11-28 10:49:57','2025-11-28 10:49:57',15,'F'),(19,'qwer',5,'ㅁㅇㄴㄹ','2025-11-28 11:18:33','2025-11-28 11:18:33',NULL,'F'),(20,'qwer',5,'ㅁㄴㅇㄻㄴㅇㄻㄴ','2025-11-28 11:18:50','2025-11-28 11:18:50',NULL,'F'),(21,'qwer',5,'12432342134','2025-11-28 11:18:53','2025-11-28 11:18:53',19,'F'),(22,'qwer',5,'12421342134','2025-11-28 11:18:57','2025-11-28 11:18:57',20,'F'),(23,'qwer',5,'13423142341123','2025-11-28 11:19:05','2025-11-28 11:19:05',19,'F'),(24,'qwer',5,'412342134','2025-11-28 11:19:10','2025-11-28 11:19:10',20,'F'),(25,'qwer',7,'qwerq','2025-11-28 12:31:59','2025-11-28 12:31:59',NULL,'F'),(26,'qwer',6,'sfddasfsadfawefewafa','2025-11-28 12:32:05','2025-11-28 12:32:05',NULL,'F'),(27,'qwer',3,'ss','2025-11-28 13:05:51','2025-11-28 13:05:51',NULL,'F'),(28,'qwer',10,'1231','2025-12-01 11:43:09','2025-12-01 11:43:09',NULL,'F'),(29,'qwer',10,'11444','2025-12-01 11:43:12','2025-12-01 11:43:12',28,'F');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_feed`
--

LOCK TABLES `sns_feed` WRITE;
/*!40000 ALTER TABLE `sns_feed` DISABLE KEYS */;
INSERT INTO `sns_feed` VALUES (2,'admin01','테스트','테스트1',0,'2025-11-26 18:52:56','2025-11-26 18:52:56','N'),(3,'admin01','엉엉','앙앙',0,'2025-11-26 18:58:19','2025-11-26 18:58:19','F'),(4,'qwer','오','왓',0,'2025-11-26 20:04:36','2025-11-26 20:04:36','F'),(5,'qwer','따흐흑','따흐앙',0,'2025-11-27 11:34:33','2025-11-27 11:34:33','Q'),(6,'abc1234','호엥','엥호',0,'2025-11-28 11:46:22','2025-11-28 11:46:22','F'),(7,'abc1234','에','애',0,'2025-11-28 11:48:17','2025-11-28 11:48:17','F'),(8,'qwer','asfas','2416523',0,'2025-11-28 13:05:42','2025-11-28 13:05:42','F'),(9,'asdf1234','121212','0101010',0,'2025-12-01 09:37:40','2025-12-01 09:37:40','F'),(10,'qwer','12121212','1121212',0,'2025-12-01 11:43:01','2025-12-01 11:43:01','F');
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
INSERT INTO `sns_user` VALUES ('abc1234','$2b$10$Y/N8tjCbh.zkBv0zRKvbg.jBk0DQS/HV6btLOnGjqJ7HJyoHbF6TO','abcabc','abc1234@naver.com','http://localhost:3020/user/uploads/profile-images/profile07.png','U','2025-11-28 11:44:56','2025-11-28 11:44:56',0,'L'),('admin01','$2b$10$tuOLOTObZOVz8RsqQp82SuEkZwjBsgJxXBCN65AIRLy1QMBvnYSha','관리자','admin01@gmail.com','http://localhost:3020/user/uploads/profile-images/profile01.png','A','2025-11-26 18:03:18','2025-11-26 18:03:18',0,'L'),('asdf1234','$2b$10$VlWqIdbgnh7Kiv5qGI9r9.rM/3U3BvaP0LvTPZKc7KEJpqCNiT28u','asdf1234','asdf1234@gmail.com','http://localhost:3020/user/uploads/profile-images/profile10.png','U','2025-11-26 15:43:21','2025-11-26 15:43:21',0,'D'),('qwer','$2b$10$eFkiubb8rS3iPkXfn7Gud.ckbnyDAaPcCa6GjwVOZV73U3BAS8Jni','qwer','qwer@gmail.com','http://localhost:3020/user/uploads/profile-images/profile13.png','U','2025-11-26 20:04:23','2025-11-26 20:04:23',0,'D');
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

-- Dump completed on 2025-12-01 13:30:07
