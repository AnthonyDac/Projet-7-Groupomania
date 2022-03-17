-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 17 mars 2022 à 19:01
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_ID` int NOT NULL AUTO_INCREMENT,
  `post_ID` int DEFAULT NULL,
  `commented_by_ID` varchar(255) DEFAULT NULL,
  `commentaire` varchar(560) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date_commentaire` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`comment_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`comment_ID`, `post_ID`, `commented_by_ID`, `commentaire`, `date_commentaire`) VALUES
(28, 93, '2811bbfb-6be1-4b9e-b5f0-fe0930e7d5e8', 'Ranh, non, il est là lui..', '17/3/2022');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `post_ID` int NOT NULL AUTO_INCREMENT,
  `posted_by_ID` varchar(255) DEFAULT NULL,
  `message` varchar(550) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date_creation` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `imageURL` varchar(160) DEFAULT NULL,
  PRIMARY KEY (`post_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`post_ID`, `posted_by_ID`, `message`, `date_creation`, `imageURL`) VALUES
(93, 'c3599fa5-d592-48a4-834b-187d14377322', 'Quel merveilleux réseau social! Félicitations à l\'informaticien qui a fait ça ;)', '17/3/2022', NULL),
(94, '2811bbfb-6be1-4b9e-b5f0-fe0930e7d5e8', 'J\'adore cette nouvelle plateforme tout à fait prometteuse :D', '17/3/2022', NULL),
(95, '05ec0216-3297-43cc-853b-ff3279ed0964', 'Bête de reportage là, \"La Mome\". Mais la Cotillard.. C\'est peut-être le seul truc que je regrette finalement! ', '17/3/2022', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_ID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `firstname` varchar(150) DEFAULT NULL,
  `lastname` varchar(150) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `avatarURL` varchar(160) DEFAULT NULL,
  PRIMARY KEY (`user_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_ID`, `email`, `password`, `firstname`, `lastname`, `isAdmin`, `avatarURL`) VALUES
('05ec0216-3297-43cc-853b-ff3279ed0964', '53@gmail.com', '$2a$10$dw1Bi.9439I9K4UEGdL5Xu0gte6E1qbPOVSdnUSeXoPQfxAL8QfXO', 'Edith', 'Piaf', 0, 'http://127.0.0.1:3000/images/edith_piaf_-_afp.jpg1647537514456.jpg'),
('2811bbfb-6be1-4b9e-b5f0-fe0930e7d5e8', '52@gmail.com', '$2a$10$cAAN4N7kie21p4bYbPdQm.VaLNm3aCzfNHoa3J4ohmmRq7qmz.hMS', 'Nicolas', 'Sarkozy', 0, 'http://127.0.0.1:3000/images/Nicolas_Sarkozy_in_2010.jpg1647537357912.jpg'),
('c3599fa5-d592-48a4-834b-187d14377322', '51@gmail.com', '$2a$10$uBZc4d.0FsKfv/H2Gmi.a.oDFjev.XMjoGyMSioIP2ywlacLnCXre', 'François', 'Hollande', 0, 'http://127.0.0.1:3000/images/François_Hollande_-_2017_(27869823159)_(cropped_2).jpg1647537263867.jpg'),
('f0645734-6881-44ad-b93a-47052e75da36', '50@gmail.com', '$2a$10$iqSSgg/fQtyKEpCOzt89cO//UR9DJEKc0xlGk5bmCNWQ8lJBFLGTO', 'Tom', 'Hardy', 1, 'http://127.0.0.1:3000/images/ima-image-18163.jpg1647537744635.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
