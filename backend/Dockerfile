# 1 Сборка приложения
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
# Наш рабочий каталог - /src
WORKDIR /src

# Копируем .csproj файлы и восстанавливаем зависимости отдельно
# Это кеширует слой с зависимостями, и если они не менялись
# docker не будет скачивать их заново при каждой сборке
COPY backend.csproj ./
RUN dotnet restore ./backend.csproj

# Копирование всех файлов в образ и последующая сборка
COPY . .
RUN dotnet publish -c Release -o /app/publish --no-restore

# 2 Запуск приложения
# Используем официальный образ Runtime, он гораздо меньше, чем SDK
FROM mcr.microsoft.com/dotnet/aspnet:9.0 as final
WORKDIR /app

# Копируем скомпилированное приложение из этапа сборки (из /app/publish)
COPY --from=build /app/publish .

# Указываем порт, который приложение будет слушать внутри контейнера
EXPOSE 8080

# Определяет переменную окружения для порта, на котором будет работать Kestrel
ENV ASPNETCORE_URLS=http://+:8080

# Команда для запуска приложения при старте контейнера
ENTRYPOINT [ "dotnet", "backend.dll" ]