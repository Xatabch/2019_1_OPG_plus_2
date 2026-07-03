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
- **CSS Modules** — neumorphic-дизайн
- **Express 5** — раздача production-сборки
- **Vitest** — unit-тесты
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
| `npm test` | Vitest unit-тесты |
| `npm run format` | Prettier форматирование |

## Переменные окружения

Скопируйте `.env.example` в `.env.development` (локально) или задайте переменные в CI/CD:

| Переменная | Описание |
|------------|----------|
| `VITE_API_HOST` | URL REST API |
| `VITE_APP_HOST` | URL фронтенда (для ссылок на мультиплеер) |
| `VITE_MULTIPLAYER_HOST` | URL REST мультиплеера |
| `VITE_MULTIPLAYER_WS` | WebSocket URL мультиплеера |

## Документация

- [Архитектура](docs/architecture.md)
- [REST API](docs/api.md)
- [WebSocket протокол мультиплеера](docs/multiplayer.md)
- [Changelog](CHANGELOG.md)

## CI/CD

GitHub Actions:

- **CI** (`.github/workflows/ci.yml`) — lint, test, build на push/PR в `master` и `production`
- **Deploy** (`.github/workflows/deploy.yml`) — деплой на production при push в `production`

Secrets для deploy: `DEPLOY_SSH_KEY`, `PRODUCTION_MACHINE_ADDRESS`, `PRODUCTION_MACHINE_USERNAME`, `VITE_*`.
