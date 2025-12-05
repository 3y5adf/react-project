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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_comment`
--

LOCK TABLES `sns_comment` WRITE;
/*!40000 ALTER TABLE `sns_comment` DISABLE KEYS */;
INSERT INTO `sns_comment` VALUES (1,'admin01',5,'나가','2025-11-27 14:50:50','2025-11-27 14:50:50',NULL,'T'),(3,'admin01',4,'어','2025-11-27 14:52:18','2025-11-27 14:52:18',NULL,'F'),(4,'admin01',3,'에휴','2025-11-27 17:11:11','2025-11-27 17:11:11',NULL,'F'),(5,'qwer',4,'으멩넴겜ㄴ에','2025-11-27 18:32:10','2025-11-27 18:32:10',2,'F'),(6,'qwer',4,'2141243','2025-11-27 18:49:06','2025-11-27 18:49:06',3,'F'),(7,'qwer',5,'ㅂㅈㄷㄱ','2025-11-27 18:49:14','2025-11-27 18:49:14',1,'F'),(8,'qwer',5,'ㄴㄴ','2025-11-27 18:49:33','2025-11-27 18:49:33',1,'F'),(9,'qwer',4,'ㄴㄴ','2025-11-27 18:49:41','2025-11-27 18:49:41',2,'F'),(11,'qwer',4,'ㄴㄴ','2025-11-27 18:52:40','2025-11-27 18:52:40',NULL,'F'),(12,'qwer',4,'ㄴㄴ','2025-11-27 18:55:11','2025-11-27 18:55:11',10,'F'),(13,'qwer',4,'ㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁㅁㄴㅇㄻㅁㄴㅇㄹㄴㅁ','2025-11-27 19:06:21','2025-11-27 19:06:21',NULL,'F'),(14,'qwer',5,'qwe','2025-11-28 10:41:04','2025-11-28 10:41:04',1,'T'),(15,'qwer',2,'부모댓글1','2025-11-28 10:49:38','2025-11-28 10:49:38',NULL,'F'),(16,'qwer',2,'대댓글1','2025-11-28 10:49:44','2025-11-28 10:49:44',15,'F'),(17,'qwer',2,'대댓글2\n','2025-11-28 10:49:49','2025-11-28 10:49:49',15,'F'),(18,'qwer',2,'대댓글3','2025-11-28 10:49:57','2025-11-28 10:49:57',15,'F'),(19,'qwer',5,'ㅁㅇㄴㄹ','2025-11-28 11:18:33','2025-11-28 11:18:33',NULL,'F'),(20,'qwer',5,'ㅁㄴㅇㄻㄴㅇㄻㄴ','2025-11-28 11:18:50','2025-11-28 11:18:50',NULL,'F'),(21,'qwer',5,'12432342134','2025-11-28 11:18:53','2025-11-28 11:18:53',19,'F'),(22,'qwer',5,'12421342134','2025-11-28 11:18:57','2025-11-28 11:18:57',20,'F'),(23,'qwer',5,'13423142341123','2025-11-28 11:19:05','2025-11-28 11:19:05',19,'F'),(24,'qwer',5,'412342134','2025-11-28 11:19:10','2025-11-28 11:19:10',20,'F'),(25,'qwer',7,'qwerq','2025-11-28 12:31:59','2025-11-28 12:31:59',NULL,'F'),(26,'qwer',6,'sfddasfsadfawefewafa','2025-11-28 12:32:05','2025-11-28 12:32:05',NULL,'F'),(27,'qwer',3,'ss','2025-11-28 13:05:51','2025-11-28 13:05:51',NULL,'F'),(28,'qwer',10,'1231','2025-12-01 11:43:09','2025-12-01 11:43:09',NULL,'F'),(29,'qwer',10,'11444','2025-12-01 11:43:12','2025-12-01 11:43:12',28,'F'),(30,'qwer',11,'asdfsad','2025-12-02 18:19:15','2025-12-02 18:19:15',NULL,'F'),(31,'qwer',11,'asdfadsf','2025-12-02 18:20:46','2025-12-02 18:20:46',30,'F'),(34,'qwer',15,'789','2025-12-03 11:35:22','2025-12-03 11:35:22',NULL,'F'),(35,'qwer',15,'0','2025-12-03 11:35:26','2025-12-03 11:35:26',34,'F');
/*!40000 ALTER TABLE `sns_comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-05 16:33:30
