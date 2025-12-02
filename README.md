# Next.js Currency Converter

This project is designed to demonstrate clean architecture, great UI/UX, strong engineering practices, and production-ready code.

Demo app can be tested here: https://next-currency-app.vercel.app/

---

# Features

### ✔ Multi-currency conversion

Live conversion using cached latest exchange rates.

### ✔ Historical Chart

- Time ranges: **7D, 14D, 1M**
- Responsive & mobile-friendly

### ✔ Dark mode & light mode

Automatic using Tailwind’s `dark` class.

### ✔ Base currency selector

With country flags and dropdown animations.

### ✔ Fast & resilient backend

- Cached responses
- Gracefully handles API outages
- Provider abstraction layer enables future provider switching

### ✔ Auto-refreshing data

- React Query with `refetchInterval`
- Pauses when tab is hidden
- Resumes on focus

### ✔ Dockerized

- Multi-stage build
- Node 22 Alpine
- Production-ready

---

# Architecture Overview

### 1. **API Routes**

- `/api/rates`  
  Returns latest FX rates.  
  Cached for 5 minutes.

- `/api/historical`  
  Returns historical FX data.  
  Cached for 1 hour.

### 2. **Provider Abstraction**

Located under:

```
/lib/exchangeProviders/
```

Uses interfaces to support additional providers in the future.

### 3. **Frontend Data Layer**

TanStack React Query:

- Background refresh (60s)
- Cached queries
- Auto-refetch on window focus

---

# Getting Started

## 1. Install dependencies

```bash
npm install
```

## 2. Environment variables

Create `.env` or copy from `.env.example`:

```
OPEN_EXCHANGE_API_KEY=db215616e2834f8f9c598af14fea1b4d
EXCHANGE_RATE_API_KEY=your_exchangerate_api_key_here
EXCHANGE_API_PROVIDER=openexchangerates

NEXT_PUBLIC_DEFAULT_BASE_CURRENCY=USD
NEXT_PUBLIC_AVAILABLE_CURRENCIES=USD,EUR,GBP,JPY,AUD,CAD
NEXT_PUBLIC_DEFAULT_CHART_PERIOD=14D
```

Get your free key at:  
https://openexchangerates.org

## 3. Run development

```bash
npm run dev
```

The app is available at:

```
http://localhost:3000
```

---

# Docker Instructions

## **Build & run in production mode**

```bash
docker-compose up --build

docker-compose -f docker-compose.yml up
```

---

# Improvements / Future Enhancements

- Automatically fallback to other provider when a provider is down
- Real-time streaming using SSE or WebSocket
- Add tests (unit + integration)
- Add CI/CD workflow (GitHub Actions)

---

# Author

dhianpratama
