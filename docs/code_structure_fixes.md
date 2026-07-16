# 🛠️ Code Structure & Bug Fixes

This document details the code fixes implemented during the optimization cycle to resolve structural bugs, accessibility lockouts, and backend routing conflicts.

---

## 1. Mobile Usability Fix (Search, Cart & Profile Access)
* **Problem**: The Search, Cart, and Account buttons were locked inside the `.trapezoidContainer` which gets hidden on mobile layouts (`max-width: 768px`) in [Navbar.module.css](file:///home/code8/Desktop/Flight-13-Academy/src/components/Navbar.module.css). Mobile users could not access their shopping cart or proceed to checkout.
* **Fix**: Edited [Navbar.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/components/Navbar.tsx#L106-L154) to explicitly append Search, Cart (with an active badge item counter), and Account links inside the mobile hamburger navigation drawer:
  ```tsx
  <Link to="/search" ...> <Search /> SEARCH </Link>
  <Link to="/cart" ...> <ShoppingCart /> CART {count} </Link>
  <Link to="/account" ...> <User /> ACCOUNT </Link>
  ```

---

## 2. Dynamic API URL Configuration in Shop
* **Problem**: The frontend shop page [Shop.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/pages/shop/Shop.tsx) was fetching products from a hardcoded localhost path:
  `fetch('http://localhost:5000/api/products')`
  This bypassed the environment configurations and broke the product list loads in production.
* **Fix**: Imported `API_URL` configuration inside [Shop.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/pages/shop/Shop.tsx#L40):
  `fetch('${API_URL}/api/products')`
  This dynamically connects to the local API server during development and shifts to the proper backend domain in production.

---

## 3. Remapping Backend User Management Routing
* **Problem**: The backend router [userRoutes.js](file:///home/code8/Desktop/Flight-13-Academy/backend/routes/userRoutes.js) was importing and calling functions from `coachController.js` instead of `userController.js`. It returned coach detail payloads under the `/api/users` routes, blocking user lookups and dashboard updates.
* **Fix**: Updated [userRoutes.js](file:///home/code8/Desktop/Flight-13-Academy/backend/routes/userRoutes.js) to import from `userController.js` and registered the user profile routing endpoints:
  ```javascript
  const { getAllUsers, getUserById, updateUser, deleteUser, getUserStats } = require('../controllers/userController');
  
  router.get('/', authenticate, isAdmin, getAllUsers);
  router.get('/stats', authenticate, isAdmin, getUserStats);
  router.get('/:id', authenticate, getUserById);
  router.put('/:id', authenticate, updateUser);
  router.delete('/:id', authenticate, isAdmin, deleteUser);
  ```

---

## 4. Connecting Athlete Registration to Backend
* **Problem**: Athlete registration in [Registration.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/pages/Registration.tsx) was mocked using local timeouts, dropping inputs upon submission.
* **Fix**: Replaced the mock timeout with a POST request to `/api/registrations` incorporating the authenticated headers and dynamic data values input by parents.

---

## 5. Integrating Checkout Cart and Transactions
* **Problem**: The [Checkout.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/pages/Checkout.tsx) form had hardcoded cart totals and items, and only simulated payments locally.
* **Fix**: Linked the checkout summary dynamically to `useCart()` context to render order lines, delivery fee rules, and calculated totals. Programmed the form to perform two consecutive backend operations:
  1. Create the purchase Order record by posting active items to `POST /api/orders`.
  2. Create the mobile money Payment record by posting transaction details to `POST /api/payments` referencing the returned Order ID.
  3. Clear the active shopping cart upon successful operation.

---

## 6. IndexedDB Central Synchronization Engine (Dexie.js)
* **Problem**: Editing profile settings in [Account.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/pages/Account.tsx) was cached strictly in local storage and never pushed to the database. Additionally, mounting the page relied on stale local storage cache, leading to data drift.
* **Fix**: Built a central data engine [src/db/index.ts](file:///home/code8/Desktop/Flight-13-Academy/src/db/index.ts) utilizing **Dexie.js** to manage IndexedDB tables (`users`, `syncQueue`).
  * On mount: Loads user details optimistically from the IndexedDB cache (zero-latency UI) and concurrently triggers a fetch request to `/api/auth/me` to refresh the local cache and UI with postgres database states.
  * On submit: Updates local IndexedDB immediately and dispatches a background `PUT /api/auth/profile` sync call.
  * Offline fallback: If the sync request fails due to an offline state or connection drop, the action payload is added to the IndexedDB `syncQueue` table, and a window online listener is registered to retry and process the queue automatically when connection is restored.

---

## 7. Dynamic Dashboard History Loading & Database Seeding
* **Problem**: User dashboard registrations and orders inside [Account.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/pages/Account.tsx) were mocked using static local lists. Additionally, the backend lacked database table definitions and seed records for local PostgreSQL setups.
* **Fix**:
  * **Dynamic Page Fetch**: Refactored [Account.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/pages/Account.tsx) to query `/api/registrations/my` and `/api/orders/my` on mount, displaying authentic purchase and training registration histories.
  * **Database Seeding**: Created a SQL-based seeding script [seed.js](file:///home/code8/Desktop/Flight-13-Academy/backend/scripts/seed.js) that creates the complete database schema (`profiles`, `programs`, `products`, `registrations`, `orders`, `payments`) inside the local PostgreSQL instance, and seeds default programs, shop items, and coaches.
  * **Critical Bug Fix**: Fixed a backend typo in [Product.js](file:///home/code8/Desktop/Flight-13-Academy/backend/models/Product.js) where product models were referencing the `programs` database table and lacked the `findByCategory` method (which crashed API requests when navigating product categories).

---

## 8. Backend Contact Message Router & Database Integration
* **Problem**: The [Contact.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/pages/Contact.tsx) page was mocked on submission and had no registered backend Express router, table schemas, or storage handlers to process and record contact requests.
* **Fix**:
  * **Database Integration**: Added the `contacts` table definition to the PostgreSQL database schema seeding script.
  * **Backend Router**: Created [contactRoutes.js](file:///home/code8/Desktop/Flight-13-Academy/backend/routes/contactRoutes.js) declaring public message recording routing path `POST /api/contacts` and restricted admin query paths (`GET /api/contacts`, `PUT /api/contacts/:id`). Registered the router inside [backend/server.js](file:///home/code8/Desktop/Flight-13-Academy/backend/server.js).
  * **Frontend Connection**: Updated [Contact.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/pages/Contact.tsx) to dispatch form submissions to the backend, rendering success alerts or inline error feedback directly based on server results.

---

## 9. Global State Management (Zustand)
* **Problem**: Cart states and auth credentials were saved independently in local storage, causing delayed Navbar updates and state sync mismatches.
* **Fix**: Added global stores `useCartStore.ts` and `useAuthStore.ts` utilizing Zustand:
  * Persistent Cart: Zustand stores cart lines and calculated totals with native localStorage persistence.
  * Context Backward Compatibility: Refactored `CartContext.tsx` to act as a pass-through layer mapping to `useCartStore`, migrating state handling seamlessly without breaking legacy components.

---

## 10. Hardware-Accelerated Page Transitions & Mobile Drawers
* **Problem**: Switching views was abrupt, and the mobile menu drawer snapped open instantly without fluid easing.
* **Fix**:
  * Page Transitions: Wrapped router switches in `App.tsx` with `<AnimatePresence mode="wait">` and defined a `<PageTransition>` component that fades and slides views smoothly during path changes.
  * Mobile Spring Drawer: Refactored mobile nav drawer in [Navbar.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/components/Navbar.tsx) to slide along the X-axis (`x: '100%'` to `x: 0`) and fade the backdrop overlay using Framer Motion spring physics.

---

## 11. Dynamic SEO Metadata Injection
* **Problem**: The site title was hardcoded as a static string, causing search indexing limits and lack of route keywords.
* **Fix**: Integrated `react-helmet-async` to dynamically inject browser page metadata:
  * Wrapped entry point in `main.tsx` with `<HelmetProvider>`.
  * Created a reusable [SEO.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/components/SEO.tsx) component that dynamically updates document title, keywords, descriptions, and OpenGraph/Twitter social cards.
  * Wrapped key page wrappers (Home, About, Contact, Programs, Shop) with dynamic SEO details.

---

## 12. Smooth Scroll & Scroll-To-Top Page Resets
* **Problem**: Navigating to a new route did not reset the scroll offset, causing the user to remain at the bottom/middle of the viewport if they had scrolled down on the previous view. Additionally, browser scrolling snapped instantly.
* **Fix**:
  * Scroll Reset Hook: Created [ScrollToTop.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/components/ScrollToTop.tsx) which listens to route path changes and programmatically executes `window.scrollTo(0, 0)` upon navigation.
  * Smooth Scroll CSS: Enabled site-wide `scroll-behavior: smooth` in `src/index.css` to deliver premium sliding scroll transitions.

---

## 13. Unique Testing IDs on Navigation Elements
* **Problem**: Interactive items inside [Navbar.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/components/Navbar.tsx) lacked structural IDs, making automated browser end-to-end testing fragile.
* **Fix**: Added descriptive unique `id` parameters to all primary navbar elements, including search triggers, shopping cart indicators, profile dashboard links, and responsive drawer toggles.
