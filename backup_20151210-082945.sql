-- MySQL dump 10.13  Distrib 5.6.26, for Win64 (x86_64)
--
-- Host: localhost    Database: kompres
-- ------------------------------------------------------
-- Server version	5.6.26-log

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
-- Table structure for table `account_emailaddress`
--

DROP TABLE IF EXISTS `account_emailaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_emailaddress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `account_emailaddress_user_id_40d9a61d_fk_users_user_id` (`user_id`),
  CONSTRAINT `account_emailaddress_user_id_40d9a61d_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailaddress`
--

LOCK TABLES `account_emailaddress` WRITE;
/*!40000 ALTER TABLE `account_emailaddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_emailconfirmation`
--

DROP TABLE IF EXISTS `account_emailconfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_emailconfirmation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `sent` datetime(6) DEFAULT NULL,
  `key` varchar(64) NOT NULL,
  `email_address_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `account_ema_email_address_id_3c32d4d8_fk_account_emailaddress_id` (`email_address_id`),
  CONSTRAINT `account_ema_email_address_id_3c32d4d8_fk_account_emailaddress_id` FOREIGN KEY (`email_address_id`) REFERENCES `account_emailaddress` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailconfirmation`
--

LOCK TABLES `account_emailconfirmation` WRITE;
/*!40000 ALTER TABLE `account_emailconfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailconfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_article`
--

DROP TABLE IF EXISTS `article_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `title` varchar(60) NOT NULL,
  `category` varchar(30) NOT NULL,
  `short_description` longtext NOT NULL,
  `author` longtext NOT NULL,
  `date` date NOT NULL,
  `article` longtext NOT NULL,
  `main_image_id` int(11) NOT NULL,
  `thumbnail_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `article_article_36b62cbe` (`main_image_id`),
  KEY `article_article_f2ee6af1` (`thumbnail_id`),
  CONSTRAINT `articl_main_image_id_532a1045_fk_image_articleimage_image_ptr_id` FOREIGN KEY (`main_image_id`) REFERENCES `image_articleimage` (`image_ptr_id`),
  CONSTRAINT `article_thumbnail_id_3ff91bcf_fk_image_articleimage_image_ptr_id` FOREIGN KEY (`thumbnail_id`) REFERENCES `image_articleimage` (`image_ptr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_article`
--

LOCK TABLES `article_article` WRITE;
/*!40000 ALTER TABLE `article_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `article_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_id` (`group_id`,`permission_id`),
  KEY `auth_group_permissi_permission_id_23962d04_fk_auth_permission_id` (`permission_id`),
  CONSTRAINT `auth_group_permissi_permission_id_23962d04_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_58c48ba9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_type_id` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permissi_content_type_id_51277a81_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add permission',1,'add_permission'),(2,'Can change permission',1,'change_permission'),(3,'Can delete permission',1,'delete_permission'),(4,'Can add group',2,'add_group'),(5,'Can change group',2,'change_group'),(6,'Can delete group',2,'delete_group'),(7,'Can add content type',3,'add_contenttype'),(8,'Can change content type',3,'change_contenttype'),(9,'Can delete content type',3,'delete_contenttype'),(10,'Can add session',4,'add_session'),(11,'Can change session',4,'change_session'),(12,'Can delete session',4,'delete_session'),(13,'Can add site',5,'add_site'),(14,'Can change site',5,'change_site'),(15,'Can delete site',5,'delete_site'),(16,'Can add user dashboard module',6,'add_userdashboardmodule'),(17,'Can change user dashboard module',6,'change_userdashboardmodule'),(18,'Can delete user dashboard module',6,'delete_userdashboardmodule'),(19,'Can add bookmark',7,'add_bookmark'),(20,'Can change bookmark',7,'change_bookmark'),(21,'Can delete bookmark',7,'delete_bookmark'),(22,'Can add pinned application',8,'add_pinnedapplication'),(23,'Can change pinned application',8,'change_pinnedapplication'),(24,'Can delete pinned application',8,'delete_pinnedapplication'),(25,'Can add log entry',9,'add_logentry'),(26,'Can change log entry',9,'change_logentry'),(27,'Can delete log entry',9,'delete_logentry'),(28,'Can add token',10,'add_token'),(29,'Can change token',10,'change_token'),(30,'Can delete token',10,'delete_token'),(31,'Can add email address',11,'add_emailaddress'),(32,'Can change email address',11,'change_emailaddress'),(33,'Can delete email address',11,'delete_emailaddress'),(34,'Can add email confirmation',12,'add_emailconfirmation'),(35,'Can change email confirmation',12,'change_emailconfirmation'),(36,'Can delete email confirmation',12,'delete_emailconfirmation'),(37,'Can add social application',13,'add_socialapp'),(38,'Can change social application',13,'change_socialapp'),(39,'Can delete social application',13,'delete_socialapp'),(40,'Can add social account',14,'add_socialaccount'),(41,'Can change social account',14,'change_socialaccount'),(42,'Can delete social account',14,'delete_socialaccount'),(43,'Can add social application token',15,'add_socialtoken'),(44,'Can change social application token',15,'change_socialtoken'),(45,'Can delete social application token',15,'delete_socialtoken'),(46,'Can add user',16,'add_user'),(47,'Can change user',16,'change_user'),(48,'Can delete user',16,'delete_user'),(49,'Can add user profile',17,'add_userprofile'),(50,'Can change user profile',17,'change_userprofile'),(51,'Can delete user profile',17,'delete_userprofile'),(52,'Can add email',18,'add_email'),(53,'Can change email',18,'change_email'),(54,'Can delete email',18,'delete_email'),(55,'Can add Lokasi Wisata',19,'add_traveldestination'),(56,'Can change Lokasi Wisata',19,'change_traveldestination'),(57,'Can delete Lokasi Wisata',19,'delete_traveldestination'),(58,'Can add Konten Lokasi Wisata',20,'add_traveldestinationcontent'),(59,'Can change Konten Lokasi Wisata',20,'change_traveldestinationcontent'),(60,'Can delete Konten Lokasi Wisata',20,'delete_traveldestinationcontent'),(61,'Can add Kunjungan',21,'add_visit'),(62,'Can change Kunjungan',21,'change_visit'),(63,'Can delete Kunjungan',21,'delete_visit'),(64,'Can add Komplain pengunjung',22,'add_report'),(65,'Can change Komplain pengunjung',22,'change_report'),(66,'Can delete Komplain pengunjung',22,'delete_report'),(67,'Can add location',23,'add_location'),(68,'Can change location',23,'change_location'),(69,'Can delete location',23,'delete_location'),(70,'Can add Wilayah',24,'add_region'),(71,'Can change Wilayah',24,'change_region'),(72,'Can delete Wilayah',24,'delete_region'),(73,'Can add Provinsi',25,'add_province'),(74,'Can change Provinsi',25,'change_province'),(75,'Can delete Provinsi',25,'delete_province'),(76,'Can add Kabupaten',26,'add_district'),(77,'Can change Kabupaten',26,'change_district'),(78,'Can delete Kabupaten',26,'delete_district'),(79,'Can add Foto dan Gambar',27,'add_image'),(80,'Can change Foto dan Gambar',27,'change_image'),(81,'Can delete Foto dan Gambar',27,'delete_image'),(82,'Can add Foto Komplain',28,'add_reportimage'),(83,'Can change Foto Komplain',28,'change_reportimage'),(84,'Can delete Foto Komplain',28,'delete_reportimage'),(85,'Can add Foto Lokasi Wisata',29,'add_traveldestinationimage'),(86,'Can change Foto Lokasi Wisata',29,'change_traveldestinationimage'),(87,'Can delete Foto Lokasi Wisata',29,'delete_traveldestinationimage'),(88,'Can add Foto Artikel',30,'add_articleimage'),(89,'Can change Foto Artikel',30,'change_articleimage'),(90,'Can delete Foto Artikel',30,'delete_articleimage'),(91,'Can add Pengaturan',31,'add_page'),(92,'Can change Pengaturan',31,'change_page'),(93,'Can delete Pengaturan',31,'delete_page'),(94,'Can add featured travel destination',32,'add_featuredtraveldestination'),(95,'Can change featured travel destination',32,'change_featuredtraveldestination'),(96,'Can delete featured travel destination',32,'delete_featuredtraveldestination'),(97,'Can add Tautan Halaman Depan',33,'add_homelink'),(98,'Can change Tautan Halaman Depan',33,'change_homelink'),(99,'Can delete Tautan Halaman Depan',33,'delete_homelink'),(100,'Can add Artikel',34,'add_article'),(101,'Can change Artikel',34,'change_article'),(102,'Can delete Artikel',34,'delete_article'),(103,'Can add Metoda Transportasi',35,'add_transportation'),(104,'Can change Metoda Transportasi',35,'change_transportation'),(105,'Can delete Metoda Transportasi',35,'delete_transportation'),(106,'Can add Email',36,'add_email'),(107,'Can change Email',36,'change_email'),(108,'Can delete Email',36,'delete_email');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_535fb363_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_email_email`
--

DROP TABLE IF EXISTS `custom_email_email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `custom_email_email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `subject` longtext NOT NULL,
  `content_plaintext` longtext NOT NULL,
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_email_email`
--

LOCK TABLES `custom_email_email` WRITE;
/*!40000 ALTER TABLE `custom_email_email` DISABLE KEYS */;
/*!40000 ALTER TABLE `custom_email_email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dashboard_userdashboardmodule`
--

DROP TABLE IF EXISTS `dashboard_userdashboardmodule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dashboard_userdashboardmodule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `app_label` varchar(255) DEFAULT NULL,
  `user` int(10) unsigned NOT NULL,
  `column` int(10) unsigned NOT NULL,
  `order` int(11) NOT NULL,
  `settings` longtext NOT NULL,
  `children` longtext NOT NULL,
  `collapsed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dashboard_userdashboardmodule`
--

LOCK TABLES `dashboard_userdashboardmodule` WRITE;
/*!40000 ALTER TABLE `dashboard_userdashboardmodule` DISABLE KEYS */;
/*!40000 ALTER TABLE `dashboard_userdashboardmodule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin__content_type_id_5151027a_fk_django_content_type_id` (`content_type_id`),
  KEY `django_admin_log_user_id_1c5f563_fk_users_user_id` (`user_id`),
  CONSTRAINT `django_admin__content_type_id_5151027a_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_1c5f563_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2015-12-10 00:46:09.817000','1','test',1,'',30,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_3ec8c61c_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (11,'account','emailaddress'),(12,'account','emailconfirmation'),(9,'admin','logentry'),(34,'article','article'),(2,'auth','group'),(1,'auth','permission'),(10,'authtoken','token'),(3,'contenttypes','contenttype'),(36,'custom_email','email'),(6,'dashboard','userdashboardmodule'),(30,'image','articleimage'),(27,'image','image'),(28,'image','reportimage'),(29,'image','traveldestinationimage'),(7,'jet','bookmark'),(8,'jet','pinnedapplication'),(32,'pages','featuredtraveldestination'),(33,'pages','homelink'),(31,'pages','page'),(26,'region','district'),(23,'region','location'),(25,'region','province'),(24,'region','region'),(4,'sessions','session'),(5,'sites','site'),(14,'socialaccount','socialaccount'),(13,'socialaccount','socialapp'),(15,'socialaccount','socialtoken'),(22,'tourism','report'),(19,'tourism','traveldestination'),(20,'tourism','traveldestinationcontent'),(21,'tourism','visit'),(35,'transportation','transportation'),(18,'users','email'),(16,'users','user'),(17,'users','userprofile');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2015-12-10 00:18:37.483000'),(2,'contenttypes','0002_remove_content_type_name','2015-12-10 00:18:38.285000'),(3,'auth','0001_initial','2015-12-10 00:18:40.876000'),(4,'auth','0002_alter_permission_name_max_length','2015-12-10 00:18:41.483000'),(5,'auth','0003_alter_user_email_max_length','2015-12-10 00:18:41.582000'),(6,'auth','0004_alter_user_username_opts','2015-12-10 00:18:41.634000'),(7,'auth','0005_alter_user_last_login_null','2015-12-10 00:18:41.665000'),(8,'auth','0006_require_contenttypes_0002','2015-12-10 00:18:41.685000'),(9,'users','0001_initial','2015-12-10 00:18:44.999000'),(10,'account','0001_initial','2015-12-10 00:18:46.591000'),(11,'account','0002_email_max_length','2015-12-10 00:18:47.033000'),(12,'admin','0001_initial','2015-12-10 00:18:50.513000'),(13,'image','0001_initial','2015-12-10 00:18:52.792000'),(14,'article','0001_initial','2015-12-10 00:18:53.015000'),(15,'article','0002_auto_20151210_0705','2015-12-10 00:18:55.149000'),(16,'authtoken','0001_initial','2015-12-10 00:18:56.685000'),(17,'custom_email','0001_initial','2015-12-10 00:18:57.107000'),(18,'dashboard','0001_initial','2015-12-10 00:18:57.509000'),(19,'region','0001_initial','2015-12-10 00:19:03.132000'),(20,'tourism','0001_initial','2015-12-10 00:19:10.143000'),(21,'image','0002_auto_20151210_0705','2015-12-10 00:19:17.370000'),(22,'jet','0001_initial','2015-12-10 00:19:18.026000'),(23,'jet','0002_delete_userdashboardmodule','2015-12-10 00:19:18.109000'),(24,'pages','0001_initial','2015-12-10 00:19:22.185000'),(25,'sessions','0001_initial','2015-12-10 00:19:22.887000'),(26,'sites','0001_initial','2015-12-10 00:19:23.176000'),(27,'sites','0002_set_site_domain_and_name','2015-12-10 00:19:23.224000'),(28,'socialaccount','0001_initial','2015-12-10 00:19:28.802000'),(29,'socialaccount','0002_token_max_lengths','2015-12-10 00:19:30.917000'),(30,'transportation','0001_initial','2015-12-10 00:19:33.034000'),(31,'users','0002_email_userprofile','2015-12-10 00:19:35.126000');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_de54fa62` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('6xurhzdqqh5b4idosgqfk45nd8ggyj7i','NjZiZmJkMjA0YTQ5YTRlODE2Zjk5Mzk5NmM0ZGVmMWYwZWExNWY2MDp7Il9hdXRoX3VzZXJfaGFzaCI6ImE5ZWM3OTI2MmFmMjg2N2I5YTNiMzViNmQzYmVhN2ZlZDQ3OWY5MjgiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2015-12-24 00:45:57.629000');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'example.com','kompres2015');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_articleimage`
--

DROP TABLE IF EXISTS `image_articleimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image_articleimage` (
  `image_ptr_id` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `image` varchar(100) NOT NULL,
  `article_id` int(11),
  PRIMARY KEY (`image_ptr_id`),
  KEY `image_articleimage_a00c1b00` (`article_id`),
  CONSTRAINT `image_articleimage_article_id_40f8c70a_fk_article_article_id` FOREIGN KEY (`article_id`) REFERENCES `article_article` (`id`),
  CONSTRAINT `image_articleimage_image_ptr_id_617c4f5e_fk_image_image_id` FOREIGN KEY (`image_ptr_id`) REFERENCES `image_image` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_articleimage`
--

LOCK TABLES `image_articleimage` WRITE;
/*!40000 ALTER TABLE `image_articleimage` DISABLE KEYS */;
INSERT INTO `image_articleimage` VALUES (1,'thumbnail','./1.JPG',NULL);
/*!40000 ALTER TABLE `image_articleimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_image`
--

DROP TABLE IF EXISTS `image_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `name` longtext NOT NULL,
  `tag` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_image`
--

LOCK TABLES `image_image` WRITE;
/*!40000 ALTER TABLE `image_image` DISABLE KEYS */;
INSERT INTO `image_image` VALUES (1,'2015-12-10 00:46:09.803000','2015-12-10','test','');
/*!40000 ALTER TABLE `image_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_reportimage`
--

DROP TABLE IF EXISTS `image_reportimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image_reportimage` (
  `image_ptr_id` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `report_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`image_ptr_id`),
  KEY `image_reportimage_6f78b20c` (`report_id`),
  KEY `image_reportimage_e8701ad4` (`user_id`),
  CONSTRAINT `image_reportimage_image_ptr_id_7cbfc875_fk_image_image_id` FOREIGN KEY (`image_ptr_id`) REFERENCES `image_image` (`id`),
  CONSTRAINT `image_reportimage_report_id_71c59940_fk_tourism_report_id` FOREIGN KEY (`report_id`) REFERENCES `tourism_report` (`id`),
  CONSTRAINT `image_reportimage_user_id_47dd8ea5_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_reportimage`
--

LOCK TABLES `image_reportimage` WRITE;
/*!40000 ALTER TABLE `image_reportimage` DISABLE KEYS */;
/*!40000 ALTER TABLE `image_reportimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_traveldestinationimage`
--

DROP TABLE IF EXISTS `image_traveldestinationimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image_traveldestinationimage` (
  `image_ptr_id` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  `travel_destination_id` int(11),
  `travel_destination_content_id` int(11),
  PRIMARY KEY (`image_ptr_id`),
  KEY `image_traveldestinationimage_b6a35afc` (`travel_destination_id`),
  KEY `image_traveldestinationimage_5e2505be` (`travel_destination_content_id`),
  CONSTRAINT `b113436d8d79afaa7c75cad4fa19d60b` FOREIGN KEY (`travel_destination_content_id`) REFERENCES `tourism_traveldestinationcontent` (`id`),
  CONSTRAINT `i_travel_destination_id_4219a958_fk_tourism_traveldestination_id` FOREIGN KEY (`travel_destination_id`) REFERENCES `tourism_traveldestination` (`id`),
  CONSTRAINT `image_traveldestinationi_image_ptr_id_584622f6_fk_image_image_id` FOREIGN KEY (`image_ptr_id`) REFERENCES `image_image` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_traveldestinationimage`
--

LOCK TABLES `image_traveldestinationimage` WRITE;
/*!40000 ALTER TABLE `image_traveldestinationimage` DISABLE KEYS */;
/*!40000 ALTER TABLE `image_traveldestinationimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jet_bookmark`
--

DROP TABLE IF EXISTS `jet_bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jet_bookmark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(200) NOT NULL,
  `title` varchar(255) NOT NULL,
  `user` int(10) unsigned NOT NULL,
  `date_add` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jet_bookmark`
--

LOCK TABLES `jet_bookmark` WRITE;
/*!40000 ALTER TABLE `jet_bookmark` DISABLE KEYS */;
/*!40000 ALTER TABLE `jet_bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jet_pinnedapplication`
--

DROP TABLE IF EXISTS `jet_pinnedapplication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jet_pinnedapplication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(255) NOT NULL,
  `user` int(10) unsigned NOT NULL,
  `date_add` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jet_pinnedapplication`
--

LOCK TABLES `jet_pinnedapplication` WRITE;
/*!40000 ALTER TABLE `jet_pinnedapplication` DISABLE KEYS */;
/*!40000 ALTER TABLE `jet_pinnedapplication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages_featuredtraveldestination`
--

DROP TABLE IF EXISTS `pages_featuredtraveldestination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages_featuredtraveldestination` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `front_page_id` int(11) NOT NULL,
  `travel_destination_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `travel_destination_id` (`travel_destination_id`),
  KEY `pages_featuredtraveldestination_7d8b0409` (`front_page_id`),
  CONSTRAINT `p_travel_destination_id_630f664f_fk_tourism_traveldestination_id` FOREIGN KEY (`travel_destination_id`) REFERENCES `tourism_traveldestination` (`id`),
  CONSTRAINT `pages_featuredtraveldest_front_page_id_10f4866f_fk_pages_page_id` FOREIGN KEY (`front_page_id`) REFERENCES `pages_page` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages_featuredtraveldestination`
--

LOCK TABLES `pages_featuredtraveldestination` WRITE;
/*!40000 ALTER TABLE `pages_featuredtraveldestination` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages_featuredtraveldestination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages_homelink`
--

DROP TABLE IF EXISTS `pages_homelink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages_homelink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `image` varchar(100) NOT NULL,
  `title` varchar(30) NOT NULL,
  `link` varchar(100) NOT NULL,
  `description` varchar(150) NOT NULL,
  `type` varchar(15) DEFAULT NULL,
  `page_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pages_homelink_1a63c800` (`page_id`),
  CONSTRAINT `pages_homelink_page_id_3a1d13c5_fk_pages_page_id` FOREIGN KEY (`page_id`) REFERENCES `pages_page` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages_homelink`
--

LOCK TABLES `pages_homelink` WRITE;
/*!40000 ALTER TABLE `pages_homelink` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages_homelink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages_page`
--

DROP TABLE IF EXISTS `pages_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages_page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `video` longtext,
  `video_start` int(11) DEFAULT NULL,
  `travel_destination_list_image` varchar(100) DEFAULT NULL,
  `article_list_image` varchar(100) DEFAULT NULL,
  `article_list_tagline` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages_page`
--

LOCK TABLES `pages_page` WRITE;
/*!40000 ALTER TABLE `pages_page` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region_district`
--

DROP TABLE IF EXISTS `region_district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region_district` (
  `location_ptr_id` int(11) NOT NULL,
  `province_id` int(11) NOT NULL,
  PRIMARY KEY (`location_ptr_id`),
  KEY `region_district_4a5754ed` (`province_id`),
  CONSTRAINT `region_d_province_id_2b53faa0_fk_region_province_location_ptr_id` FOREIGN KEY (`province_id`) REFERENCES `region_province` (`location_ptr_id`),
  CONSTRAINT `region_district_location_ptr_id_3aa98d2e_fk_region_location_id` FOREIGN KEY (`location_ptr_id`) REFERENCES `region_location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region_district`
--

LOCK TABLES `region_district` WRITE;
/*!40000 ALTER TABLE `region_district` DISABLE KEYS */;
/*!40000 ALTER TABLE `region_district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region_location`
--

DROP TABLE IF EXISTS `region_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region_location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region_location`
--

LOCK TABLES `region_location` WRITE;
/*!40000 ALTER TABLE `region_location` DISABLE KEYS */;
/*!40000 ALTER TABLE `region_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region_province`
--

DROP TABLE IF EXISTS `region_province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region_province` (
  `location_ptr_id` int(11) NOT NULL,
  `region_id` int(11) NOT NULL,
  PRIMARY KEY (`location_ptr_id`),
  KEY `region_province_0f442f96` (`region_id`),
  CONSTRAINT `region_provi_region_id_447a51d8_fk_region_region_location_ptr_id` FOREIGN KEY (`region_id`) REFERENCES `region_region` (`location_ptr_id`),
  CONSTRAINT `region_province_location_ptr_id_748f2b84_fk_region_location_id` FOREIGN KEY (`location_ptr_id`) REFERENCES `region_location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region_province`
--

LOCK TABLES `region_province` WRITE;
/*!40000 ALTER TABLE `region_province` DISABLE KEYS */;
/*!40000 ALTER TABLE `region_province` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region_region`
--

DROP TABLE IF EXISTS `region_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region_region` (
  `location_ptr_id` int(11) NOT NULL,
  PRIMARY KEY (`location_ptr_id`),
  CONSTRAINT `region_region_location_ptr_id_148ffe9e_fk_region_location_id` FOREIGN KEY (`location_ptr_id`) REFERENCES `region_location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region_region`
--

LOCK TABLES `region_region` WRITE;
/*!40000 ALTER TABLE `region_region` DISABLE KEYS */;
/*!40000 ALTER TABLE `region_region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialaccount`
--

DROP TABLE IF EXISTS `socialaccount_socialaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialaccount_socialaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `uid` varchar(191) NOT NULL,
  `last_login` datetime(6) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `extra_data` longtext NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialaccount_provider_4f431f56_uniq` (`provider`,`uid`),
  KEY `socialaccount_socialaccount_user_id_6896ca7d_fk_users_user_id` (`user_id`),
  CONSTRAINT `socialaccount_socialaccount_user_id_6896ca7d_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialaccount`
--

LOCK TABLES `socialaccount_socialaccount` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp`
--

DROP TABLE IF EXISTS `socialaccount_socialapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialaccount_socialapp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `name` varchar(40) NOT NULL,
  `client_id` varchar(191) NOT NULL,
  `secret` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp`
--

LOCK TABLES `socialaccount_socialapp` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp_sites`
--

DROP TABLE IF EXISTS `socialaccount_socialapp_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialaccount_socialapp_sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `socialapp_id` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialapp_id` (`socialapp_id`,`site_id`),
  KEY `socialaccount_socialapp_sites_site_id_5dd41c02_fk_django_site_id` (`site_id`),
  CONSTRAINT `socialaccoun_socialapp_id_6127b1b8_fk_socialaccount_socialapp_id` FOREIGN KEY (`socialapp_id`) REFERENCES `socialaccount_socialapp` (`id`),
  CONSTRAINT `socialaccount_socialapp_sites_site_id_5dd41c02_fk_django_site_id` FOREIGN KEY (`site_id`) REFERENCES `django_site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp_sites`
--

LOCK TABLES `socialaccount_socialapp_sites` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialtoken`
--

DROP TABLE IF EXISTS `socialaccount_socialtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialaccount_socialtoken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `token_secret` longtext NOT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `account_id` int(11) NOT NULL,
  `app_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialtoken_app_id_73d1e698_uniq` (`app_id`,`account_id`),
  KEY `socialacco_account_id_43dd8c0a_fk_socialaccount_socialaccount_id` (`account_id`),
  CONSTRAINT `socialacco_account_id_43dd8c0a_fk_socialaccount_socialaccount_id` FOREIGN KEY (`account_id`) REFERENCES `socialaccount_socialaccount` (`id`),
  CONSTRAINT `socialaccount_soci_app_id_785bd662_fk_socialaccount_socialapp_id` FOREIGN KEY (`app_id`) REFERENCES `socialaccount_socialapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialtoken`
--

LOCK TABLES `socialaccount_socialtoken` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourism_report`
--

DROP TABLE IF EXISTS `tourism_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tourism_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `category` varchar(30) NOT NULL,
  `report` longtext NOT NULL,
  `approved` tinyint(1) NOT NULL,
  `travel_destination_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tourism_report_b6a35afc` (`travel_destination_id`),
  KEY `tourism_report_e8701ad4` (`user_id`),
  CONSTRAINT `t_travel_destination_id_5f463ea9_fk_tourism_traveldestination_id` FOREIGN KEY (`travel_destination_id`) REFERENCES `tourism_traveldestination` (`id`),
  CONSTRAINT `tourism_report_user_id_6a5a4099_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourism_report`
--

LOCK TABLES `tourism_report` WRITE;
/*!40000 ALTER TABLE `tourism_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `tourism_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourism_traveldestination`
--

DROP TABLE IF EXISTS `tourism_traveldestination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tourism_traveldestination` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `name` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `website` varchar(200) DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `full_description` longtext NOT NULL,
  `short_description` longtext NOT NULL,
  `model_3d` varchar(100) DEFAULT NULL,
  `district_id` int(11) NOT NULL,
  `thumbnail_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `tourism__district_id_2ebc7fd3_fk_region_district_location_ptr_id` (`district_id`),
  KEY `D199c99b25c2dc5909f8060b524f31da` (`thumbnail_id`),
  CONSTRAINT `D199c99b25c2dc5909f8060b524f31da` FOREIGN KEY (`thumbnail_id`) REFERENCES `image_traveldestinationimage` (`image_ptr_id`),
  CONSTRAINT `tourism__district_id_2ebc7fd3_fk_region_district_location_ptr_id` FOREIGN KEY (`district_id`) REFERENCES `region_district` (`location_ptr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourism_traveldestination`
--

LOCK TABLES `tourism_traveldestination` WRITE;
/*!40000 ALTER TABLE `tourism_traveldestination` DISABLE KEYS */;
/*!40000 ALTER TABLE `tourism_traveldestination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourism_traveldestinationcontent`
--

DROP TABLE IF EXISTS `tourism_traveldestinationcontent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tourism_traveldestinationcontent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `name` varchar(20) NOT NULL,
  `content` longtext NOT NULL,
  `travel_destination_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `t_travel_destination_id_35dfcbdc_fk_tourism_traveldestination_id` (`travel_destination_id`),
  CONSTRAINT `t_travel_destination_id_35dfcbdc_fk_tourism_traveldestination_id` FOREIGN KEY (`travel_destination_id`) REFERENCES `tourism_traveldestination` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourism_traveldestinationcontent`
--

LOCK TABLES `tourism_traveldestinationcontent` WRITE;
/*!40000 ALTER TABLE `tourism_traveldestinationcontent` DISABLE KEYS */;
/*!40000 ALTER TABLE `tourism_traveldestinationcontent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourism_visit`
--

DROP TABLE IF EXISTS `tourism_visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tourism_visit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `date` date DEFAULT NULL,
  `travel_destination_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tourism_visit_created_date_3cf22eb2_uniq` (`created_date`,`travel_destination_id`,`user_id`),
  KEY `t_travel_destination_id_64b357c1_fk_tourism_traveldestination_id` (`travel_destination_id`),
  KEY `tourism_visit_user_id_2f610db1_fk_users_user_id` (`user_id`),
  CONSTRAINT `t_travel_destination_id_64b357c1_fk_tourism_traveldestination_id` FOREIGN KEY (`travel_destination_id`) REFERENCES `tourism_traveldestination` (`id`),
  CONSTRAINT `tourism_visit_user_id_2f610db1_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourism_visit`
--

LOCK TABLES `tourism_visit` WRITE;
/*!40000 ALTER TABLE `tourism_visit` DISABLE KEYS */;
/*!40000 ALTER TABLE `tourism_visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transportation_transportation`
--

DROP TABLE IF EXISTS `transportation_transportation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transportation_transportation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `name` varchar(40) NOT NULL,
  `description` longtext NOT NULL,
  `website` varchar(200) NOT NULL,
  `image` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportation_transportation`
--

LOCK TABLES `transportation_transportation` WRITE;
/*!40000 ALTER TABLE `transportation_transportation` DISABLE KEYS */;
/*!40000 ALTER TABLE `transportation_transportation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transportation_transportation_districts`
--

DROP TABLE IF EXISTS `transportation_transportation_districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transportation_transportation_districts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transportation_id` int(11) NOT NULL,
  `district_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `transportation_id` (`transportation_id`,`district_id`),
  KEY `transpor_district_id_12eeb704_fk_region_district_location_ptr_id` (`district_id`),
  CONSTRAINT `t_transportation_id_1f5c66e2_fk_transportation_transportation_id` FOREIGN KEY (`transportation_id`) REFERENCES `transportation_transportation` (`id`),
  CONSTRAINT `transpor_district_id_12eeb704_fk_region_district_location_ptr_id` FOREIGN KEY (`district_id`) REFERENCES `region_district` (`location_ptr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportation_transportation_districts`
--

LOCK TABLES `transportation_transportation_districts` WRITE;
/*!40000 ALTER TABLE `transportation_transportation_districts` DISABLE KEYS */;
/*!40000 ALTER TABLE `transportation_transportation_districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_email`
--

DROP TABLE IF EXISTS `users_email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `modified_date` date NOT NULL,
  `subject` varchar(50) NOT NULL,
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_email`
--

LOCK TABLES `users_email` WRITE;
/*!40000 ALTER TABLE `users_email` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user`
--

DROP TABLE IF EXISTS `users_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `shadow_banned` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user`
--

LOCK TABLES `users_user` WRITE;
/*!40000 ALTER TABLE `users_user` DISABLE KEYS */;
INSERT INTO `users_user` VALUES (1,'pbkdf2_sha256$20000$zEJUxrdPhkdi$57o6V32zMNBlJP7fsqCXCMKneueJ06z+J4qggc37SVE=','2015-12-10 00:45:57.550000',1,'kompres2015','','','abiraf.bot@gmail.com',1,1,'2015-12-10 00:20:32.966000','',0);
/*!40000 ALTER TABLE `users_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_groups`
--

DROP TABLE IF EXISTS `users_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`group_id`),
  KEY `users_user_groups_group_id_4a1739d2_fk_auth_group_id` (`group_id`),
  CONSTRAINT `users_user_groups_group_id_4a1739d2_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `users_user_groups_user_id_6549f6f5_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_groups`
--

LOCK TABLES `users_user_groups` WRITE;
/*!40000 ALTER TABLE `users_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_user_permissions`
--

DROP TABLE IF EXISTS `users_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`permission_id`),
  KEY `users_user_user_per_permission_id_3ff79df3_fk_auth_permission_id` (`permission_id`),
  CONSTRAINT `users_user_user_per_permission_id_3ff79df3_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `users_user_user_permissions_user_id_23f6d8b9_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_user_permissions`
--

LOCK TABLES `users_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `users_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_userprofile`
--

DROP TABLE IF EXISTS `users_userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_userprofile` (
  `user_id` int(11) NOT NULL,
  `district_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `users_us_district_id_23450368_fk_region_district_location_ptr_id` (`district_id`),
  CONSTRAINT `users_us_district_id_23450368_fk_region_district_location_ptr_id` FOREIGN KEY (`district_id`) REFERENCES `region_district` (`location_ptr_id`),
  CONSTRAINT `users_userprofile_user_id_27779b5d_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_userprofile`
--

LOCK TABLES `users_userprofile` WRITE;
/*!40000 ALTER TABLE `users_userprofile` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_userprofile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-10  8:29:45
