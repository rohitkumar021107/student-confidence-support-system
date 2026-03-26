# AskSpark – Performance Optimization

## Current State

AskSpark is a React + Firebase app with 10 page components. The largest files are StudentDashboard (1114 lines), ChatRoom (990 lines), TeacherDashboard (907 lines), and WeeklyTest (683 lines). All routes are imported eagerly in App.tsx, meaning the full JS bundle loads on every page visit. There are no skeleton loaders, no lazy loading on images, no service worker, and no code splitting. The initial screen can show a blank white flash before Firebase initializes.

## Requested Changes (Diff)

### Add
- React.lazy + Suspense code splitting for all 10 page routes in App.tsx
- Skeleton loaders for StudentDashboard, TeacherDashboard, BlogList, BlogPost, ChatRoom
- Branded AskSpark loading splash screen shown while Firebase / auth initializes (prevents blank white flash)
- First-login onboarding welcome modal: steps shown once (Submit doubt → Get answer → Earn points → Climb leaderboard), stored in localStorage to only show once
- loading="lazy" attribute on all img tags across all components
- vite-plugin-pwa for service worker (asset caching, offline fallback)

### Modify
- App.tsx: convert all static imports of page components to React.lazy, wrap router in Suspense with skeleton fallback
- main.tsx: add branded splash wrapper that shows loading screen until app mounts
- StudentDashboard: mock Firestore calls capped at 20 items, add skeleton loading state, add loading="lazy" to images
- TeacherDashboard: add skeleton loading state, add loading="lazy" to images
- BlogList, BlogPost: add loading="lazy" to header images
- LandingPage: add loading="lazy" to hero image
- ChatRoom: show skeleton while initial messages load
- vite.config.ts (or create): add vite-plugin-pwa config and manualChunks for vendor splitting

### Remove
- Eager imports of page components from App.tsx (replaced by lazy)

## Implementation Plan

1. Install vite-plugin-pwa as devDependency
2. Update vite.config.ts with PWA plugin config and rollupOptions.manualChunks for react, firebase, radix-ui vendor chunks
3. Convert App.tsx page imports to React.lazy, wrap all routes in a Suspense with a PageSkeleton fallback
4. Create src/components/PageSkeleton.tsx – a fast branded skeleton (AskSpark logo + pulse bars)
5. Create src/components/SplashScreen.tsx – branded loading screen with spark icon + spinner for initial app load
6. Update main.tsx to show SplashScreen until React mounts
7. Add skeleton loading states inside StudentDashboard and TeacherDashboard (show while mock data "loads")
8. Add loading="lazy" to all img tags across LandingPage, BlogList, BlogPost, StudentDashboard, TeacherDashboard, ChatRoom
9. Add onboarding welcome modal to StudentDashboard (shows once on first login, stored in localStorage key `askspark_onboarded`)
