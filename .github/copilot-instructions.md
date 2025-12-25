# AI Coding Assistant Instructions for G's Guitar Web App

## Project Overview
This is a React-based e-commerce and learning platform for guitars, built with Vite, TypeScript, and Tailwind CSS. The app features user authentication, product browsing, blog posts, courses, and order management. It communicates with a backend API server running on `http://localhost:5000`.

## Architecture
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite (with Rolldown for faster builds)
- **Styling**: Tailwind CSS v4 with custom gradients and dark mode support
- **Routing**: React Router DOM for SPA navigation
- **State Management**: React Context API with multiple providers:
  - `AuthContext`: Manages login/logout state
  - `UsersContext`: Handles user data (name, email, access token)
  - `UserProfileContext`: Stores profile details (address, phone)
  - `ProductContext`: Manages current product information
- **API Layer**: Axios instance (`GsServerAPI`) configured for `http://localhost:5000` with credentials
- **UI Components**: Radix UI primitives with shadcn/ui styling (buttons, inputs, labels, carousels)
- **Animations**: Motion library for smooth transitions
- **Icons**: Lucide React and Tabler Icons

## Key Patterns and Conventions

### Component Structure
- Main components in `src/component/` (e.g., `Home.tsx`, `Store.tsx`)
- Reusable UI components in `src/components/ui/` (shadcn style)
- Contexts in `src/component/Context/`
- API utilities in `src/api/`

### State Management
Use React Context for global state. Wrap components with providers as needed:
```tsx
// Example from Home.tsx
<ProductContextProvider>
  <StoreItemPreview />
</ProductContextProvider>
```

### API Calls
Always use `GsServerAPI` for backend communication. Include `withCredentials: true` for auth:
```tsx
// From Login.tsx
const response = await GsServerAPI.post("/login", logInData);
```

### Styling
- Use Tailwind classes directly in JSX
- Common patterns: `flex justify-center items-center`, gradient buttons with `bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500`
- Dark mode classes: `dark:bg-gray-900`, `dark:text-white`

### Routing
Routes defined in `App.tsx`:
- `/` and `/Home`: Home page
- `/Blog`, `/Store`, `/Course`: Main sections
- `/UserProfilePage`, `/OrdersPage`, `/SettingPage`: User-specific pages

## Development Workflow
- **Start dev server**: `npm run dev` (Vite with HMR)
- **Build**: `npm run build` (includes TypeScript compilation)
- **Lint**: `npm run lint` (ESLint with React rules)
- **Preview**: `npm run preview` (serve built files)

## Common Tasks
- **Adding new routes**: Update `App.tsx` Routes and import the component
- **New UI components**: Use shadcn/ui pattern in `src/components/ui/`
- **API integration**: Add methods to `GsServerAPI.tsx` if needed, but reuse the instance
- **State updates**: Use context setters, handle in useEffect for side effects

## Examples
- **Context usage**: See `Login.tsx` for auth flow with `AuthContext` and `UsersContext`
- **API call**: `GsServerAPI.get("/refresh", { withCredentials: true })` in `App.tsx`
- **Component composition**: `Home.tsx` combines `Header`, sections, and `Footer`
- **Navigation**: `useNavigate` from `react-router-dom` for programmatic routing

## Notes
- Backend expected at `localhost:5000` with cookie-based auth
- React Compiler enabled for performance
- No testing framework currently set up
- Focus on mobile-responsive design with Tailwind</content>
<parameter name="filePath">d:\learn\Guitar web\Guitar\.github\copilot-instructions.md