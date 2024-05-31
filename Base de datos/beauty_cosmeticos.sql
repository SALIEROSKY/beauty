-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-05-2024 a las 02:36:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `beauty_cosmeticos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `ID_Perfil` int(11) NOT NULL,
  `Tipo_Perfil` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`ID_Perfil`, `Tipo_Perfil`) VALUES
(1, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ID_Producto` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `Precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID_Usuario` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Clave` varchar(100) NOT NULL,
  `ID_Perfil` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID_Usuario`, `Nombre`, `Email`, `Clave`, `ID_Perfil`) VALUES
(2, 'Carlos', 'Carlos123@gmail.com', '$2b$10$DP8j3XyUAt6XZ13.eCn6YeDLWZijMKPO767VUv0yplc5KSy3kz9Xe', NULL),
(3, 'Angie', 'angietj@gmail.com', '$2b$10$Ua4ZFvl6cMFQ67IwRgvmUuGRNTCGz3X4AipqMC7o0RfG.0MihRO1q', NULL),
(4, 'Laura', 'Laura123@gmail.com', '$2b$10$aMZQLh.pL1RhavgqYJC4uOZRJNGhTcazADL6YRa2KprEihle/GCny', NULL),
(5, 'Camilo Hurtado', 'churtado2010@hotmail.com', '$2b$10$D.tcHb/JBkDSGj07oeri/.mI5F66XYRhP7l6J6eL/t1uTixWHvtvO', 1),
(6, 'patitoadmin', 'patito@mail.com', '$2b$10$L1xEcp2pUC7ffcwJUWNz6uxCHVerqC2cNGaVtsOZc/ai5gbKOqNi2', NULL),
(8, 'alexander', 'alexanderhernandez0622@gmail.com', '$2b$10$xqLqImOjPib7lkVBlbzd5OVdtU.EFC8Z71yjrSrFnzR7v6WZ4vHoy', NULL),
(10, 'EMILY', 'emily@mail.com', '$2b$10$RXV7bx0jMDL8Kir.CmkgFepD.gbqlfbRRlLc9g/XBFZIOsYPYvhz6', NULL),
(11, 'Juan', 'Juan@gmail.com', '$2b$10$DwbwaD1izIGN14Jg3V222uQvqskohQhGAUy.ZfgQhlyFjUAMJ65lS', NULL),
(12, 'Florecita', 'flor@gmail.com', '$2b$10$uezK5e3MRhBk12UjnEMXWe/YIE82u0ZzcFHwN7n6tXBLNbOFSP1ai', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`ID_Perfil`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`ID_Producto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_Usuario`),
  ADD KEY `ID_Perfil` (`ID_Perfil`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `ID_Perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `ID_Producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ID_Perfil`) REFERENCES `perfil` (`ID_Perfil`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
