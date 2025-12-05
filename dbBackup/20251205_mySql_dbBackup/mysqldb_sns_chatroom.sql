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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sns_chatroom`
--

LOCK TABLES `sns_chatroom` WRITE;
/*!40000 ALTER TABLE `sns_chatroom` DISABLE KEYS */;
INSERT INTO `sns_chatroom` VALUES (1,'asasdf','qwer','O','2025-11-28 15:44:09'),(2,'뮵ㅈㄷ','qwer','O','2025-11-28 15:50:38'),(4,'1241','qwer','O','2025-11-28 15:51:49'),(5,'테스트1','qwer','O','2025-11-28 15:58:06'),(6,'114','qwer','O','2025-11-28 16:08:32'),(7,'114','qwer','O','2025-11-28 16:08:33'),(8,'123','qwer','O','2025-11-28 16:12:11'),(9,'251201','qwer','O','2025-12-01 09:35:42'),(16,'테스트','qwer','O','2025-12-02 11:49:42'),(17,'테스트2','qwer','O','2025-12-02 14:58:18');
/*!40000 ALTER TABLE `sns_chatroom` ENABLE KEYS */;
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
