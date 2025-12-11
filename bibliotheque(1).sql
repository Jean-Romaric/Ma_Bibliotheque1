-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 11 déc. 2025 à 17:50
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bibliotheque`
--

-- --------------------------------------------------------

--
-- Structure de la table `emprunt`
--

CREATE TABLE `emprunt` (
  `Emprunt_ID` int(11) NOT NULL,
  `Utilisateur_ID` int(11) DEFAULT NULL,
  `Livre_ID` int(11) DEFAULT NULL,
  `Debut_Lecture` datetime DEFAULT NULL,
  `En_Cours_Lect` tinyint(1) DEFAULT 0,
  `Fin_lecture` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `livre`
--

CREATE TABLE `livre` (
  `Livre_ID` int(11) NOT NULL,
  `Titre` varchar(225) DEFAULT NULL,
  `Auteur` varchar(225) DEFAULT NULL,
  `Annee_publication` int(11) DEFAULT NULL,
  `Genre` varchar(225) DEFAULT NULL,
  `Quantite` int(11) DEFAULT NULL,
  `Image_livre` longtext DEFAULT NULL,
  `Contenu` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `livre`
--

INSERT INTO `livre` (`Livre_ID`, `Titre`, `Auteur`, `Annee_publication`, `Genre`, `Quantite`, `Image_livre`, `Contenu`) VALUES
(1, 'Rebelle', 'Fatou Keita', 1960, 'Roman', 2, 'Rebelle.jpeg', NULL),
(2, 'Le Vieux Nègre et la Médaille', 'Ferdinand Oyono', 1956, 'Roman', 3, 'Le_vieux.jpg', NULL),
(3, 'Une si longue lettre', 'Mariama Bâ', 1979, 'Roman épistolaire', 4, 'Une_longue_lettre.jpeg', NULL),
(4, 'L’Aventure ambiguë', 'Cheikh Hamidou Kane', 1961, 'Philosophique', 5, 'Aventure_ambi.jpeg', NULL),
(6, 'Les Misérables', 'Victor Hugo', 1759, 'Roman', 2, 'Les_Miserable.jpeg', 'Il y avait dans la ville de D... un homme qui...'),
(7, 'Le Petit Prince', 'Antoine de Saint-Exupéry', 1943, 'Conte philosophique', 5, '/images/Petit_Prince.jpeg', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `session`
--

CREATE TABLE `session` (
  `Session_ID` int(11) NOT NULL,
  `Utilisateur_ID` int(11) DEFAULT NULL,
  `Token_hash` text NOT NULL,
  `Expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `session`
--

INSERT INTO `session` (`Session_ID`, `Utilisateur_ID`, `Token_hash`, `Expires_at`, `Created_at`) VALUES
(1, 7, '60e93308a712bfdbe7ac1349c951e3c815e7606c4f761c03da9646580b49a4d6', '2025-12-10 03:32:57', '2025-12-10 02:32:57'),
(2, 2, '3c351fd9c3819b796e72b7a5c983f039947aac287ffb80900f9ef12caf1d31f5', '2025-12-10 03:34:00', '2025-12-10 02:34:00'),
(3, 2, 'c476cd2380fcf1f63293cf88635ead3f31c7ff695224c77777e19971b3ebe597', '2025-12-10 03:34:21', '2025-12-10 02:34:21'),
(4, 2, 'c610fb4297907ba31dff346170c5491019bd770182435fe534248d368cc904f4', '2025-12-11 03:48:04', '2025-12-11 02:48:04'),
(5, 2, '2f3d121fe84953acee4f20c4b894a6e8f45fc853b461ff0ca9581654ee8e1cdd', '2025-12-11 03:52:57', '2025-12-11 02:52:57'),
(6, 2, '70b8abf82626f49b923fd71737114e6da54517c1f84351aeda251600c794d9ef', '2025-12-11 03:55:42', '2025-12-11 02:55:42'),
(7, 2, 'ba3770704e0237baa1c002a291f8c357f62cc1db80fd9ee62e816fef473d275e', '2025-12-11 03:59:19', '2025-12-11 02:59:19'),
(8, 2, 'bf5daa5cc74f6e3b84e52c868347f7154409cfaa06796a7f3ee5c3c426b8ef59', '2025-12-11 04:00:08', '2025-12-11 03:00:08'),
(9, 2, '07d64a416d39519cf3458c12c302ca0f0c2e7c9f4ae5491ec93b23335fb3f40c', '2025-12-11 04:03:03', '2025-12-11 03:03:03'),
(10, 2, '8c5b5ad0c7867db1ffe6c1d04eb1a92544ff0266d8a23904231e769961e1173d', '2025-12-11 04:15:18', '2025-12-11 03:15:18'),
(11, 2, '6b9c200edf1d7d3101b0b6494b3e61a7e3a6b4e7bdb406a651fce26612608bea', '2025-12-11 04:16:17', '2025-12-11 03:16:17'),
(12, 2, 'c36499762eb284b6dcbb51ebcdb99b1d27b56f19326a7b4553a9ad071806d6f1', '2025-12-11 04:22:56', '2025-12-11 03:22:56'),
(13, 2, '1b7bd3ffd4429ae50db40ade1fdba166cd441c9f7e0254947d7a148b194d6425', '2025-12-11 04:35:11', '2025-12-11 03:35:11'),
(14, 2, '833d07f43c7e930f16de0ac417631d8ea78f2ece2da18144e01e78a25f60cd59', '2025-12-11 04:39:42', '2025-12-11 03:39:42'),
(15, 2, '534b0f021b613da4474519ccc9e4a5dcebb53956f4170a3503405f30b3363895', '2025-12-11 04:40:41', '2025-12-11 03:40:41'),
(16, 2, '323dd763521e3db2326da3d4479c95fa3f3421cb1e1a855f68b5b00adedd9324', '2025-12-11 04:41:04', '2025-12-11 03:41:04'),
(17, 2, '0c56df774622c8f58e50070f3ccf50121f0cfd0d2169d37380ce60cdae7cd5b8', '2025-12-11 04:50:27', '2025-12-11 03:50:27');

-- --------------------------------------------------------

--
-- Structure de la table `test`
--

CREATE TABLE `test` (
  `test_id` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `Utilisateur_ID` int(11) NOT NULL,
  `Nom` varchar(225) DEFAULT NULL,
  `Prenoms` varchar(225) DEFAULT NULL,
  `Email` varchar(225) DEFAULT NULL,
  `Mot_de_passe` varchar(225) DEFAULT NULL,
  `Role` varchar(50) DEFAULT NULL,
  `Classe` varchar(225) DEFAULT NULL,
  `Date_inscription` timestamp NULL DEFAULT NULL,
  `Photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`Utilisateur_ID`, `Nom`, `Prenoms`, `Email`, `Mot_de_passe`, `Role`, `Classe`, `Date_inscription`, `Photo`) VALUES
(2, 'Akpooué', 'Kouakou Jean-Romaric', 'jeanakpoue6@gmail.com', '$2b$10$K0AFjF82oKYGC0kv8xpBZeKCh/vU1dd.UfLxw3vEyLRwK/6aXsRzG', 'admin', NULL, '2025-09-03 12:13:02', 'jean.jpeg'),
(3, 'Kouassi', 'Noura', 'nourakoussi6@gmail.com', '$2b$10$dX7h.Zcmzi248wVcwPKRceUuyb3RiCP7UbHkrTDCyLKbZjluVz5lO', 'eleve', '6eme', '2025-09-03 19:23:56', 'Noura.jpeg'),
(4, 'Fahikat', 'Dorcas', 'fahikatdorcas@gmail.com', '$2b$10$Bg36O9igjf0xTqjFEntsc.Rf8016LQqiH3OfMEM9zRqAWDM9AjS06', 'eleve', '3eme', '2025-09-03 12:31:30', 'Darcas.jpeg'),
(5, 'Yapi', 'Elielle', 'elieleyapi@gmail.com', '$2b$10$fM269c0lybJDRxX6r9wqcOCRCTPjNqXA4epghQYh0UXYdenhyWM8O', 'eleve', '2nd', '2025-09-03 12:33:01', 'yapi.jpeg'),
(7, 'Baken', 'Kouawo', 'beken6@gmail.com', '$2b$10$7eKG6SYQ.yBZXS2E1oWaJOBtAq9oSaCH3CKnT8.aU0uJvyfS4ak8K', 'eleve', 'Licence2', '2025-12-06 23:40:20', 'beken.jpeg');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `emprunt`
--
ALTER TABLE `emprunt`
  ADD PRIMARY KEY (`Emprunt_ID`),
  ADD KEY `Utilisateur_ID` (`Utilisateur_ID`),
  ADD KEY `Livre_ID` (`Livre_ID`);

--
-- Index pour la table `livre`
--
ALTER TABLE `livre`
  ADD PRIMARY KEY (`Livre_ID`);

--
-- Index pour la table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`Session_ID`),
  ADD KEY `Utilisateur_ID` (`Utilisateur_ID`);

--
-- Index pour la table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`test_id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`Utilisateur_ID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `emprunt`
--
ALTER TABLE `emprunt`
  MODIFY `Emprunt_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `livre`
--
ALTER TABLE `livre`
  MODIFY `Livre_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `session`
--
ALTER TABLE `session`
  MODIFY `Session_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `test`
--
ALTER TABLE `test`
  MODIFY `test_id` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `Utilisateur_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `emprunt`
--
ALTER TABLE `emprunt`
  ADD CONSTRAINT `Emprunt_ibfk_1` FOREIGN KEY (`Utilisateur_ID`) REFERENCES `utilisateur` (`Utilisateur_ID`),
  ADD CONSTRAINT `Emprunt_ibfk_2` FOREIGN KEY (`Livre_ID`) REFERENCES `livre` (`Livre_ID`);

--
-- Contraintes pour la table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `Session_ibfk_1` FOREIGN KEY (`Utilisateur_ID`) REFERENCES `utilisateur` (`Utilisateur_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
