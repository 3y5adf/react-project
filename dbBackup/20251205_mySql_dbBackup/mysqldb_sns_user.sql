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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-05 16:33:31
