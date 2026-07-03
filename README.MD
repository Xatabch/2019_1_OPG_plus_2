# Colors

Пошаговая браузерная игра — фронтенд-приложение.

## Команда

- Даниил Никольский [@DanikNik](https://github.com/DanikNik)
- Иван Морозов [@Xatabch](https://github.com/Xatabch)
- Владимир Северов [@hackallcode](https://github.com/hackallcode)

## Ментор

- Тарасов Владислав [@SinimaWath](https://github.com/SinimaWath)

## Деплой

https://colors.hackallcode.ru/

## Бэкенд

https://github.com/go-park-mail-ru/2019_1_OPG_plus_2

## Стек

- **React 19** + **TypeScript**
- **Vite 7** — сборка и dev-сервер
- **React Router 7** — маршрутизация SPA
- **CSS Modules** — neumorphic-дизайн из [colors](https://github.com/Xatabch/colors)
- **Express 5** — раздача production-сборки
- **ESLint 9** + **TypeScript** — линтинг и проверка типов

## Требования

- Node.js >= 20

## Быстрый старт

```bash
cp .env.example .env.development
npm install
npm run dev
```

Dev-сервер: http://localhost:5173

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер с HMR |
| `npm run build` | Production-сборка в `dist/` |
| `npm run preview` | Предпросмотр production-сборки |
| `npm start` | Сборка + Express-сервер (порт 8001) |
| `npm run serve` | Только Express-сервер |
| `npm run lint` | ESLint + TypeScript |

## Переменные окружения

Скопируйте `.env.example` в `.env.development` или `.env.production`:

| Переменная | Описание |
|------------|----------|
| `VITE_API_HOST` | URL REST API |
| `VITE_APP_HOST` | URL фронтенда (для ссылок на мультиплеер) |
| `VITE_MULTIPLAYER_HOST` | URL REST мультиплеера |
| `VITE_MULTIPLAYER_WS` | WebSocket URL мультиплеера |

## CI

GitHub Actions (`.github/workflows/ci.yml`) — lint и build на push/PR.
