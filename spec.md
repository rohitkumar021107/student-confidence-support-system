# AskSpark

## Current State
AskSpark has: LandingPage, OnboardingPage, StudentDashboard, TeacherDashboard, SubmitDoubt, HelpCenter, ChatRoom (group + personal), WeeklyTest, BlogList, BlogPost, ProfilePage. Routes are managed via TanStack Router in App.tsx. No authentication — userId from localStorage. Chat uses local state with mock data.

## Requested Changes (Diff)

### Add
- `/learning` — LearningHub page (main hub with cards linking to Lectures, Practice, Support)
- `/learning/lectures` — LecturesPage with two tabs: Live Classes (upcoming sessions, demo data) and Recorded Lectures (YouTube embeds, demo data)
- `/learning/practice` — PracticePage (DPP) with subject/class/branch filter, 5 sample questions per subject, submit answers, then show video solution per question
- `/learning/support` — SupportPage with: real-time chat UI (reuse ChatRoom group chat style), FAQ section (reuse existing FAQ content), and "Ask for help" form
- Dashboard shortcuts: add Learning Hub card/shortcut on StudentDashboard
- Navbar: add "Learning" link in the main nav

### Modify
- App.tsx: add 4 new routes: /learning, /learning/lectures, /learning/practice, /learning/support
- StudentDashboard: add a Learning Hub shortcut card
- LandingPage or Navbar: add Learning link in nav

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/LearningHub.tsx` — hub page with 3 feature cards (Lectures, Practice, Support) and intro section
2. Create `src/frontend/src/pages/LecturesPage.tsx` — tabs for Live Classes (hardcoded upcoming sessions) and Recorded Lectures (YouTube iframes with sample videos)
3. Create `src/frontend/src/pages/PracticePage.tsx` — DPP with class/branch selector, 5 questions per subject (hardcoded), MCQ radio inputs, submit, reveal video solution per question
4. Create `src/frontend/src/pages/SupportPage.tsx` — tabs: Chat (reuse group chat component style), FAQ (hardcoded), Ask for Help form (name/subject/message, localStorage save)
5. Update `App.tsx` — add 4 new lazy-loaded routes
6. Update `StudentDashboard.tsx` — add Learning Hub shortcut card
7. Update navbar in `LandingPage.tsx` — add Learning nav link
