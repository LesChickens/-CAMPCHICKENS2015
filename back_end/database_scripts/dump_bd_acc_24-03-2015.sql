-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mar 24 Mars 2015 à 17:50
-- Version du serveur: 5.5.33
-- Version de PHP: 5.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données: `acc`
--

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `short_description` varchar(100) NOT NULL,
  `long_description` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `author` varchar(20) NOT NULL,
  `category` varchar(20) NOT NULL,
  `level` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `idTeam` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `foreign key` (`idTeam`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Table contenant tout les utilisateurs de l''application' AUTO_INCREMENT=7 ;

--
-- Contenu de la table `member`
--

INSERT INTO `member` (`id`, `firstname`, `name`, `email`, `idTeam`) VALUES
(1, 'Léo', 'Davesne', 'leo@chickens.ca', 1),
(2, 'César', 'Jeanroy', 'cesar@chickens.ca', 2),
(3, 'Julien', 'Le sudiste', 'jaimemontrermesfesses@chickens.ca', 1),
(4, 'Jean-Marie', 'Chevalier', 'jm@chicken.ca', 3),
(5, 'Joffrey', 'coach', 'joffrey@chicken.ca', 4),
(6, 'Alain', 'Gauthier ', 'alain@chicken.ca', 2);

-- --------------------------------------------------------

--
-- Structure de la table `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `team`
--

INSERT INTO `team` (`id`, `name`) VALUES
(1, 'Team 1'),
(2, 'Team 2'),
(3, 'Team 3'),
(4, 'Team 4');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `member_ibfk_1` FOREIGN KEY (`idTeam`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
