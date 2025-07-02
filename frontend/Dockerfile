# 1 Сборка приложения
# Используем легковесный образ Node.js Alpine
FROM node:alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
# Это позволяет Docker кешировать зависимости
COPY package*.json ./

# Устанавливаем зависимости
# npm ci - быстрее и строже, чем npm install, идеально для CI/CD
RUN npm install

# Копируем остальной исходный код приложения
COPY . .

# Собираем приложение для продакшена
# Команда npm run build запустит сборку определенную в package.json
RUN npm run build

# 2 Запуск приложения
# Используем Nginx - очень легкий и быстрый веб-сервер
FROM nginx:stable-alpine

# Копируем наш кастомный конфигурационный файл для Nginx
# Мы создадим этот файл на следующем этапе
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем скомпилированные файлы из этапа сборки в папку,
# которую Nginx использует для раздачи статического контента
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Сообщаем Docker, что контейнер будет слушать порт 3000
EXPOSE 3000

# Команда для запуска Nginx
CMD ["nginx", "-g", "daemon off;"]