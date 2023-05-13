-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 13 2023 г., 20:10
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `testing_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Comments`
--

CREATE TABLE `Comments` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `user_comment` longtext,
  `comment_date` date NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Comments`
--

INSERT INTO `Comments` (`id`, `user_id`, `user_comment`, `comment_date`, `title`) VALUES
(1, 1, 'фцвфцв', '2023-05-13', 'фцвфцв'),
(2, 1, 'wdawdawd', '2023-05-13', 'tessst');

-- --------------------------------------------------------

--
-- Структура таблицы `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` longtext NOT NULL,
  `mail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Users`
--

INSERT INTO `Users` (`id`, `login`, `password`, `mail`) VALUES
(1, 'N1ceK1d', '-1661652363', 'retr0raven@gmail.com');

-- --------------------------------------------------------

--
-- Структура таблицы `Works`
--

CREATE TABLE `Works` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `path` longtext NOT NULL,
  `title` varchar(255) NOT NULL,
  `extensions` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Works`
--

INSERT INTO `Works` (`id`, `user_id`, `path`, `title`, `extensions`) VALUES
(22, 1, 'upload6f1c80043fb3f964ea12c0f853687600', 'tesst', 'txt'),
(23, 1, 'uploadacc1a9a1bb6bdf8a355b3716e8e06e6d', 'dawdawdawd', 'zip'),
(24, 1, 'uploade494fcc282106fce7e11071aafa3408a', 'awdawdawdawd', 'txt');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Works`
--
ALTER TABLE `Works`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `Works`
--
ALTER TABLE `Works`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Ограничения внешнего ключа таблицы `Works`
--
ALTER TABLE `Works`
  ADD CONSTRAINT `works_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
