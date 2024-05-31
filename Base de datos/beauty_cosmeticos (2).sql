-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-05-2024 a las 03:12:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

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
(1, 'administrador'),
(2, 'cliente');

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
  `CorreoElectronico` varchar(100) NOT NULL,
  `Clave` varchar(100) NOT NULL,
  `ID_Perfil` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID_Usuario`, `Nombre`, `CorreoElectronico`, `Clave`, `ID_Perfil`) VALUES
(1, 'Lorena Jimenez', 'lore_jimenez@gmail.com', 'contraseña123', 1),
(2, 'Erik Vasquez', 'erik_vasquez@gmail.com', 'contraseña123', 1),
(3, 'Camilo Hurtado', 'camilo_hurtado@gmail.com', 'contraseña123', 1),
(4, 'Juan Felipe', 'juan_felipe@gmail.com', 'contraseña123', 1),
(5, 'Yeison Loaiza Diaz', 'yeisonlds@hotmail.es', '1', 1),
(6, 'marly', 'mar17@hotmail.com', '$2b$10$QgIC6TctCIVikJmy4h9hoOvaSs/YYgCY5cgq5fcnvi8zSRIeEd.OO', NULL),
(7, 'marly', 'mar17@hotmail.com', '$2b$10$6XB3ta6GncoAcmJMJ64YgO/fTfCzsrTGQ2iVSIxLtlkWiAhq3O8hW', NULL),
(8, 'camilo hurtado', 'churtado2010@hotmail.com', '$2b$10$EJe2dMLFQnmlso9O5SboD.F8m6YBzUwjjD0OpH13WQ.HhRyBL7F6a', NULL),
(9, 'camilo hurtado', 'churtado2010@hotmail.com', '$2b$10$kn8EVTsBjuemwQSxMc8e1OW4nvSRfrm16bn9ixijw38LRRsLnUKpW', NULL),
(10, 'patitoerik', 'patito_erik@mail.com', '$2b$10$W.bPnp3CdOYDtuUPenuWguEDVNG/Ttqy6FbwbYmw8Qn9kDydCh.QG', NULL),
(11, 'patitoerik', 'patito_erik@mail.com', '$2b$10$lluG9t8zMVnmCE4h2BEpUuBejkGP.KxvfdQhp5/Kw2hr72D49LYfW', NULL),
(12, 'Carlos', 'Carlos123@gmail.com', '$2b$10$sO0avqgLfBxCfC5I8.8DQeUdRDQYCpYv0oLFlr/JBGHAj3uOINHjW', NULL),
(13, 'Carlos', 'Carlos123@gmail.com', '$2b$10$nsb0n4dPt.qQwmaHPqpoFuP5H5JlWbumcVaYpJgytY1sPatPnJ8XW', NULL),
(14, 'Angie', 'angiet@gmail.com', '$2b$10$JeraHSlJIYyjclUCLfji.uRMeOB0hXhAyAmzFDsB0ofcHYRqtwdzi', NULL),
(15, 'Angie', 'angiet@gmail.com', '$2b$10$2/MIKfGOWphqCM73ws3EYOTYAfUJ./RmmcBGWhwXrxyUgrU67yXWG', NULL);

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
  MODIFY `ID_Perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
