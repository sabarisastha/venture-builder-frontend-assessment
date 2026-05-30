# Help Study Abroad - Frontend Technical Assessment

*This project is submitted as part of the frontend technical assessment organized by **Venture Builders Pvt Ltd**.*

Welcome to the frontend application for the Help Study Abroad technical assessment. This project is a modern, responsive, and highly optimized Next.js web application built using Material-UI (MUI) and Zustand, successfully integrating with the DummyJSON REST APIs.

## 🚀 Quick Start & Setup Instructions

### Prerequisites
- **Node.js**: v18.17.0 or higher recommended.
- **npm** (or yarn/pnpm)

### Installation & Run Commands

1. **Clone the repository** and navigate to the project root:
   ```bash
   git clone <your-github-repo-link>
   cd help-study-abroad
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory. This is required for NextAuth to function securely.
   ```env
   NEXTAUTH_SECRET=uE+nJ2sFh2M9Q2uJ1m8nK0gH1c9zR2sP
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your web browser. 

---

## 🔐 Authentication Guide
- The application uses `NextAuth.js` to manage secure sessions, combined with the DummyJSON authentication API.
- The root route `/` and all internal routes (Dashboard, Users, Products) are protected by Next.js middleware and will redirect unauthenticated users to `/login`.
- **Test Credentials**: The login page defaults to `admin` / `admin@123`. We intercept these on the server for easy reviewer access, while still maintaining full compatibility with dummyjson's `/auth/login` endpoint for valid dummyjson users (like `emilys` / `emilyspass`).

---

## 🏗️ Architecture & Fulfillment of Requirements

This project was carefully architected to meet and exceed all evaluation criteria.

### 1. Functionality
- **Auth**: Fully functional JWT-based authentication using NextAuth.
- **Pagination & Search**: Implemented robust server-side pagination (`limit` and `skip`) and debounced search functionality on both Users and Products pages to prevent API rate-limiting.
- **Filters**: Products page includes an active dropdown to filter results by specific categories fetched dynamically from the API.
- **Detail Pages**: Both Users and Products feature dedicated dynamic routing (`/[id]`) showing full detailed layouts (including an interactive image carousel for products).

### 2. State Management (Why Zustand?)
Zustand was explicitly chosen over Redux for this application due to:
- **Simplicity & Zero Boilerplate**: It allows us to manage global state without the heavy overhead of reducers, actions, and dispatchers.
- **Built-in Async Support**: We can cleanly handle async API calls directly inside the Zustand store without requiring third-party middlewares like `redux-thunk` or `redux-saga`.
- **Small Footprint**: It keeps the application bundle size incredibly lightweight, making it perfect for small to medium-scale apps.

### 3. Client-Side Caching Strategy
- **Why caching is useful**: It drastically reduces redundant network requests and server load. When a user navigates from a list view to a detail view and clicks "Back", the list view should load instantly rather than waiting for the API again.
- **Implementation Strategy**: Inside the Zustand store (`src/store/index.ts`), we generate a unique `cacheKey` based on the current pagination, search query, and category filters. Before making an API request, we check if this exact dataset exists in our memory cache. If it does, we instantly serve it. Additionally, we use Zustand's `persist` middleware to save this cache to the browser's `localStorage`, ensuring the cache survives page refreshes.

### 4. UI/UX & Responsive Design
- The entire interface is built strictly using **Material-UI (MUI)**.
- **Premium Aesthetics**: Upgraded the standard MUI theme to a highly premium "glassmorphism" aesthetic with vibrant Indigo and Pink gradients, rounded corners, soft drop-shadows, and micro-hover animations.
- **Global Navigation**: Implemented a consistent top App Bar for seamless routing across the protected application state.
- **Responsive Layouts**: Utilized MUI's Grid system to ensure flawless rendering across Mobile, Tablet, and Desktop viewport sizes.

### 5. Performance Optimization
- **React.memo**: List items (like `UserRow` and `ProductCard`) are wrapped in `React.memo` to strictly prevent unnecessary re-renders when their specific props haven't changed.
- **useCallback & useMemo**: Handlers and derived data transformations are heavily memoized throughout the codebase to ensure optimal rendering cycles.
- **API-side Pagination**: Prevents fetching massive data payloads to the client, fetching only exactly what is needed for the current viewport.

## 👨‍💻 Author

**Sabarisastha V**  
*Tech Futurist*  
- **LinkedIn**: [https://www.linkedin.com/in/sabarisastha-v-b87648330](https://www.linkedin.com/in/sabarisastha-v-b87648330)
- **Email**: [Sabarimurugan530@gmail.com](mailto:Sabarimurugan530@gmail.com)
