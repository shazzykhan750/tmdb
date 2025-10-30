tmdb-interview-task — Features & Docs

This document lists the main features implemented in this React app, where the code lives, and quick developer/user instructions for testing them.

## Project overview

A small TMDB-based React app that:

- Fetches movie lists (Now Playing / Popular / Top Rated)
- Lets users sign up / sign in (Firebase Authentication)
- Persists a simple user session in localStorage + Redux
- Shows a video/watch page for a movie trailer (YouTube embed)
- Lets users mark movies as Favorites (stored in Redux + localStorage)
- Global search in the header to filter lists
- Remote Config initialized (for runtime feature flags)

## Important files & locations

- Firebase setup

  - `src/utils/firebase.js` — initializeApp, analytics, Remote Config export

- State management (Redux)

  - `src/utils/appStore.js` — register reducers
  - `src/utils/userSlice.js` — user auth state
  - `src/utils/movieSlice.js` — movies lists & trailer state
  - `src/utils/searchSlice.js` — global search query
  - `src/utils/favoritesSlice.js` — favorites persistence (localStorage)

- Session helpers

  - `src/utils/sessionManager.js` — load/save/clear 'user' session

- UI / Routes
  - `src/Components/Body.js` — app router (routes: `/`, `/browser`, `/watchpage/:resId`, `/favorites`)
  - `src/Components/Header.js` — header with search, GPT toggle, and Favorites button
  - `src/Components/Login.js` — email/password & Google authentication
  - `src/Components/Browser.js` — main browsing page (lists)
  - `src/Components/MovieList.js` — renders a movie row / list
  - `src/Components/MovieCard.js` — movie card; shows details + favorite toggle
  - `src/Components/WatchPage.js` — fetches /movie/:id/videos and renders YouTube iframe
  - `src/Components/Favorites.js` — favorites page (view / remove / clear / watch)

## Features (behavior & how to test)

1. Authentication (Email/Password & Google)

   - Files: `src/Components/Login.js`, `src/utils/firebase.js`
   - Test:
     - Open the app (`/`), use Sign Up or Sign In.
     - After successful auth, the app stores a `user` object in localStorage and Redux.
     - Check browser DevTools → Application → Local Storage key `user`.
   - Troubleshooting: If you see `auth/configuration-not-found`, enable Email/Password sign-in in the Firebase Console for the configured project and ensure `authDomain`/`apiKey` match.
   - password(capital letter,small letter,number,character)

2. Session persistence

   - Files: `src/utils/sessionManager.js`, `src/Components/Body.js`
   - Behavior: After signin the app saves `user` in localStorage (key `user`) with a timestamp. On app load Body will restore the user if the session is < 24h old.

3. Global Search

   - Files: `src/Components/Header.js`, `src/utils/searchSlice.js`, `src/Components/MovieList.js`
   - Behavior: Type into the header search box to filter movie lists by title, original_title, or overview. The search is stored in Redux so lists read a single source-of-truth.

4. Favorites

   - Files: `src/utils/favoritesSlice.js`, `src/Components/MovieCard.js`, `src/Components/Favorites.js`
   - Behavior: Click the heart on a MovieCard to add/remove from favorites. The favorite is persisted in localStorage under key `favorites` and visible on `/favorites`.
   - Test:
     - Click a heart on a movie card — the heart fills and the movie appears on the Favorites page.
     - Navigate to `Header → ★ Favorites` to view favorites.
     - Click Remove or Clear all to modify favorites. Refresh the page — favorites should persist/reflect changes.
   - Notes: The full movie object is stored by default. If you want to store only ids, we can change this.

5. WatchPage / Video playback

   - Files: `src/Components/WatchPage.js`
   - Behavior: The page fetches `GET /3/movie/{id}/videos` and selects a YouTube trailer (type: "Trailer", site: "YouTube") if available, then embeds it with a YouTube iframe. The page includes a close button to return to `/browser`.
   - Test:
     - From a movie card, click its area (not the heart) — it should navigate to `/watchpage/:id` and play the trailer when available.
     - If there is no trailer, the page currently shows "Loading video..." and logs the fetch result in the console.

6. Remote Config (basic initialization)
   - Files: `remoteconfig.template.json`, `src/utils/firebase.js`
   - Behavior: Remote Config is initialized and `fetchAndActivate` is called on startup. This allows runtime flags like `feature_gpt_search` or `app_theme` to be toggled from the Firebase Console.

## How to run locally

1. Install dependencies (PowerShell examples):

```powershell
npm install
npm start
```

2. Open http://localhost:3000 (or whichever port your dev server uses).

## Manual verification checklist

- [ ] Sign up and sign in using email/password and Google.
- [ ] Confirm `user` is saved in localStorage after sign-in.
- [ ] Add several favorites, check `favorites` key in localStorage.
- [ ] Visit `/favorites` and confirm entries show up and Watch/Remove/Back work.
- [ ] Click a movie card (not the heart) and verify WatchPage plays the trailer.
- [ ] Use header search and watch lists filter in real-time.

## Next steps / improvements

- Replace emoji hearts with an accessible SVG icon and add animation on toggle.
- Add a confirmation modal before Clear all favorites.
- Implement multi-tab favorites sync using `window.addEventListener('storage', ...)`.
- Improve WatchPage: show poster fallback and a spinner while fetching; handle non-YouTube trailers.
- Add unit tests for slices and key components (favorites, auth, watch fetch).
