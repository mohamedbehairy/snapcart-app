# SnapCart

A modern e-commerce application built with Next.js, TypeScript, and Tailwind CSS.

---

## Overview

SnapCart is a full-featured e-commerce frontend that integrates with an external REST API to deliver a complete shopping experience. Built with modern web technologies, it demonstrates best practices in:

- Server & Client Component separation (App Router)
- Server Actions for secure mutations
- NextAuth for authentication
- Modular component architecture
- Feature-based structure
- Pagination (API + UI controlled)
- Middleware route protection
- Order management system

The project is structured for scalability and maintainability while keeping UI performance optimized.

---

## Tech Stack

### Core Framework

| Technology | Version | Purpose                         |
| ---------- | ------- | ------------------------------- |
| Next.js    | 16.1.6  | React framework with App Router |
| React      | 19.2.3  | UI library                      |
| TypeScript | 5.x     | Type-safe JavaScript            |

### Styling & UI

| Technology   | Purpose                         |
| ------------ | ------------------------------- |
| Tailwind CSS | Utility-first CSS framework     |
| shadcn/ui    | Modern React component library  |
| Radix UI     | Unstyled, accessible components |
| Lucide       | Icon library                    |

### Forms & Validation

| Technology          | Purpose                     |
| ------------------- | --------------------------- |
| React Hook Form     | Form management             |
| Zod                 | Schema validation           |
| @hookform/resolvers | Form validation integration |

### Authentication

| Technology | Purpose              |
| ---------- | -------------------- |
| NextAuth   | Credentials provider |
| Middleware | Route protection     |

### Data & API

| Technology        | Purpose                   |
| ----------------- | ------------------------- |
| External REST API | Product, cart, order data |
| Server Actions    | Secure mutations          |
| Route Handlers    | API endpoints             |
| Fetch API         | HTTP client               |

### Utilities & Tooling

| Technology     | Purpose                      |
| -------------- | ---------------------------- |
| ESLint         | Code linting                 |
| PostCSS        | CSS processing               |
| Tailwind Merge | Utility class merging        |
| CVA            | Component variant management |

---

## Architecture

### Folder Structure

```bash
src/
├── app/
│   ├── (pages)/          # Route groups for organization
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── Cart/             # Shopping cart
│   ├── AddToCart/        # Cart functionality
│   ├── Wishlist/         # Wishlist management
│   └── ...              # Other features
├── actions/              # Server Actions
├── interfaces/           # TypeScript types
├── helpers/             # Utility functions
├── lib/                 # Library configs
└── auth.ts              # NextAuth config
```

### Architectural Decisions

| Decision          | Rationale                                     |
| ----------------- | --------------------------------------------- |
| App Router        | Server-first rendering and layout composition |
| Server Components | Optimal data fetching and SEO                 |
| Client Components | Interactive logic and state management        |
| Server Actions    | Secure mutations and form handling            |
| Middleware        | Route protection and authentication           |
| Feature-based     | Maintainability and scalability               |

---

## Features

### Products

- Paginated product listing with metadata
- Dynamic product details page
- Rating display system with reviews
- Stock awareness and availability
- Brand & category filtering
- Advanced sorting options

### Pagination

- API-driven pagination metadata
- Reusable pagination component
- Client-side slicing when needed

### Shopping Cart

- Add/remove/update items
- Server-synced cart state
- Automatic total calculation
- Persistent user cart

### Wishlist

- Add/remove products
- User-specific wishlist
- Quick add-to-cart support

### Authentication

- Registration & Login
- Session handling via NextAuth
- Credentials provider
- Middleware route protection
- Password recovery flow

### Order Management

- Order history
- Order details
- Order status tracking
- Order cancellation (API dependent)

### Performance

- Server-rendered product pages
- Image optimization with Next/Image
- Lazy loading for better UX
- Route-based code splitting

---

## Internal Flow

### Data Fetching

1. Server Components fetch product/category data
2. Client Components use Server Actions
3. Middleware protects sensitive routes
4. Dynamic requests use `cache: "no-store"`

### Rendering Process

1. Server renders initial content
2. Client hydrates interactive components
3. Server Actions trigger revalidation
4. State updates refresh UI

### State Management

| Layer          | Technology     | Purpose               |
| -------------- | -------------- | --------------------- |
| Authentication | NextAuth       | Session provider      |
| Cart/Wishlist  | Server Actions | Server-synced state   |
| UI State       | React          | Local component state |

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
API_URL=https://ecommerce.routemisr.com

# Authentication
AUTH_SECRET=your-secret-key-here

# Application
BASE_URL=http://localhost:3000
```

These variables are required for API communication and authentication security.

---

## Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build         # Build for production
npm run start         # Start production server

# Quality
npm run lint          # Run ESLint
```

---

## Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Quick Start

```bash
# 1. Clone the repository
git clone <repository-url>
cd snapcart

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
