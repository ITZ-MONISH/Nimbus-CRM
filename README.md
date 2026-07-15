# Nimbus CRM

A modern, responsive SaaS CRM dashboard built as a frontend take-home project. It demonstrates clean React + TypeScript architecture, reusable UI components, client-side state management, form validation, interactive charts, and polished UX across authentication, dashboards, customer management, and order management.

![Tech](https://img.shields.io/badge/React-18-4F46E5) ![Tech](https://img.shields.io/badge/TypeScript-5-3730B8) ![Tech](https://img.shields.io/badge/Tailwind-3-14B8A6)

---

## 📋 Round 3 Take-Home Assessment Requirements

To make review easier for the hiring team, here is the status and location of all requested features from the project brief:

### Major Project Requirements
1. **Interactive Landing Page (`[NEW]`)** — Accessible to guests at `/`. Designed with a ChatGPT-style dark theme, animated backgrounds, high-quality illustrations, social proof badges, features, and custom call-to-actions.
2. **Branded Cloud Logo (`[NEW]`)** — Designed a custom cloud vector SVG logo (`/public/nimbus-logo.svg`) and linked it as the browser favicon.
3. **Login Page** — Modern split-panel layout, Zod-validated email/password forms, password visibility toggles, "Remember me" options, and mock auth service logic (`src/pages/LoginPage.tsx`).
4. **New Account Creation (`[NEW]`)** — Integrated a signup flow at `/signup` featuring a profile "Full name" text field (`src/pages/SignupPage.tsx`).
5. **Dashboard Home** — Includes 4 KPI Cards (Total Revenue, Active Customers, New Customers, Monthly Orders), sparkline indicator graphs, interactive charts (Revenue Overview & Order Statuses), and a live recent activity feed (`src/pages/DashboardPage.tsx`).
6. **Customers List** — Responsive data table showing customer status, lifetime value, and order counts. Implements multi-column sorting, search queries, status filter dropdowns, and paginated lists (`src/pages/CustomersPage.tsx`).
7. **Orders Manager** — List containing interactive tools to modify order status (via status modals) and delete records, with dynamic feedback using notification toasts (`src/pages/OrdersPage.tsx`).
8. **Settings Page** — Reactive profile updates form, Light/Dark appearance theme switch (saved to `localStorage`), and Reset/Save form actions (`src/pages/SettingsPage.tsx`).

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework & Build** | React 18, Vite, TypeScript 5 |
| **Styling & Assets** | Tailwind CSS, Lucide Icons, Google Fonts (Space Grotesk, Inter, JetBrains Mono) |
| **Routing** | React Router v6 |
| **State Management** | Zustand |
| **Charts** | Recharts (Responsive wraps) |
| **Forms & Validation** | React Hook Form + Zod resolvers |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Local Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** (or the port specified by Vite) in your browser.

> 💡 **Demo Credentials:** You can log in with **any email** and **any password of 6+ characters**.

### 3. Other Utility Commands
```bash
npm run build     # Compile and typecheck the application for production build
npm run preview   # Run local production bundle preview
npm run lint      # Run ESLint validation checks
```

---

## 📁 Project Directory Structure
```
src/
├── components/
│   ├── ui/            # Reusable primitives: Button, Input, Card, Table, Modal, Toast etc.
│   ├── layout/         # Sidebar, Topbar, ProtectedRoute
│   ├── charts/         # RevenueChart, OrdersStatusChart
│   └── dashboard/      # KpiCard, ActivityFeed
├── pages/              # LandingPage, SignupPage, LoginPage, DashboardPage, CustomersPage, OrdersPage, SettingsPage
├── layouts/            # AppLayout (Sidebar + Topbar container)
├── hooks/              # useTableControls (reusable search, sorting, and pagination hook)
├── store/              # Zustand state stores: auth, theme, toast, customers, orders
├── data/                # Mock datasets: customers, orders, activities, analytical metrics
├── types/              # Unified TypeScript definitions
└── utils/              # format.ts (currency/compact formatting), cn.ts (tailwind merge utility)
```

---

## 💡 Notes for Reviewers
* **Simulated Network Latency:** To demonstrate loading skeletons and spinners, Zustand stores simulate an asynchronous network delay (800ms - 1000ms) before returning mock dataset results.
* **Responsive Layouts:** The sidebar adjusts automatically to mobile/tablet devices via drawer triggers, ensuring responsive UX down to mobile viewports.
* **AI Tool Disclosure:** Assistance was utilized for generating the vector SVG logo asset, writing CSS animations, and formatting this README documentation.
