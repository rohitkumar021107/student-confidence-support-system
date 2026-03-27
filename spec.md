# AskSpark — Firebase Migration & Unification

## Current State

- The `firebase` npm package is NOT installed
- All data (doubts, profiles, notifications, ratings) uses localStorage
- RTDB signaling for calls/live class uses a BroadcastChannel + localStorage simulation (`useFirebaseRTDB.ts`)
- No real cross-device sync or real-time capability
- `useQueries.ts` saves doubts to `askspark_doubts` in localStorage
- `useNotifications.ts` reads/writes `askspark_notifications` in localStorage
- `useRatings.ts` reads/writes `askspark_ratings` in localStorage
- `useLocalProfile.ts` manages profiles purely in localStorage
- TeacherDashboard reads doubts from localStorage, answers not saved anywhere persistent
- StudentDashboard reads doubts from localStorage, no answers shown

## Requested Changes (Diff)

### Add
- `firebase` npm package
- `src/frontend/src/lib/firebase.ts` — Firebase app init + Firestore + RTDB + Storage exports
- `src/frontend/src/lib/useFirestoreDoubts.ts` — real-time Firestore hook for doubts (submit, fetch by userId, fetch all, answer)
- `src/frontend/src/lib/useFirestoreUsers.ts` — save/load user profile to Firestore `users/` collection
- `src/frontend/src/lib/useFirestoreRatings.ts` — ratings stored in Firestore `ratings/` collection
- Real Firebase RTDB implementation replacing the localStorage simulation in `useFirebaseRTDB.ts`
- Real-time notifications via Firebase RTDB in `useNotifications.ts`
- TeacherDashboard answer system with full question detail view, answer input, submit to Firestore
- Filters (All/Pending/Answered) on TeacherDashboard
- Student list fetched from Firestore `users/` on TeacherDashboard for call initiation
- StudentDashboard shows answered doubts with teacher's answer text and rating UI

### Modify
- `useFirebaseRTDB.ts` — replace BroadcastChannel/localStorage simulation with real Firebase RTDB (`ref`, `set`, `get`, `onValue`, `push`, `remove`)
- `useNotifications.ts` — write/read notifications from Firebase RTDB path `notifications/{userId}/`
- `useRatings.ts` — save ratings to Firestore `ratings/` collection, compute average per teacher
- `useQueries.ts` — `useSubmitDoubt` writes to Firestore; `useAllDoubts` / `useCallerDoubts` / `useUnansweredDoubts` read from Firestore real-time; `useAnswerDoubt` updates Firestore
- `useLocalProfile.ts` / `OnboardingPage.tsx` / `ProfilePage.tsx` — on profile save, also write to Firestore `users/{userId}` with name + role fields
- `StudentDashboard.tsx` — fetch doubts from Firestore by userId, show status badges and teacher answers
- `TeacherDashboard.tsx` — fetch all doubts from Firestore, show filters, open detail view to answer
- `CallManager.tsx` / `LiveClassPage.tsx` / `LiveChatPanel.tsx` / `LiveDoubtPanel.tsx` — use real Firebase RTDB instead of the simulated one

### Remove
- localStorage-only doubt storage logic in `useQueries.ts`
- BroadcastChannel/localStorage RTDB simulation internals in `useFirebaseRTDB.ts`
- localStorage-only notification and rating storage (kept as fallback only if Firebase unavailable)

## Implementation Plan

1. Install `firebase` package via pnpm
2. Create `src/frontend/src/lib/firebase.ts` with Firebase config (placeholder config — user fills in their project details) exporting `db` (Firestore), `rtdb` (Realtime DB), `storage`
3. Rewrite `useFirebaseRTDB.ts` using real Firebase RTDB SDK (`database/ref`, `set`, `get`, `onValue`, `push`, `remove` from `firebase/database`)
4. Create `useFirestoreDoubts.ts` hook:
   - `submitDoubt(data)` → `addDoc(collection(db, 'doubts'), {...})`
   - `useMyDoubts(userId)` → `onSnapshot` query filtered by userId
   - `useAllDoubts()` → `onSnapshot` on full collection (teacher use)
   - `answerDoubt(id, answer, teacherName)` → `updateDoc` with answer/status/answeredAt
5. Update `useQueries.ts` to use Firestore hooks instead of localStorage for doubt CRUD
6. Update `useNotifications.ts` to read/write from `rtdb` under `notifications/{userId}/`
7. Update `useRatings.ts` to save/read from Firestore `ratings/` collection
8. Update `OnboardingPage.tsx` and `ProfilePage.tsx`: after saving to localStorage, also `setDoc(doc(db, 'users', userId), {name, role})` 
9. Rewrite `TeacherDashboard.tsx`:
   - Use `useAllDoubts()` from Firestore
   - Filter tabs: All / Pending / Answered
   - Click doubt → detail sheet/modal with full question + answer input
   - Submit answer → `answerDoubt()` mutation
   - Student list → query `users/` where role=student for call targets
10. Rewrite `StudentDashboard.tsx` doubt section:
    - Use `useMyDoubts(userId)` from Firestore
    - Show Pending/Answered status badges
    - If answered: show teacher name, answer text, and star rating UI
11. Wire `CallManager`, `LiveClassPage`, `LiveChatPanel`, `LiveDoubtPanel` to the updated `useFirebaseRTDB` (API is unchanged; only the backing implementation changes)
12. Wire notifications: when a doubt is answered in Firestore, write to RTDB `notifications/{userId}/` so the student gets real-time alert
13. Validate and build
