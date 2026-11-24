# House Chores

A phone-installable web app (PWA) for Sita, Wes and Zoe: chores grouped into **areas** (Kitchen, Bathroom, …) with their own checklists, assignments, recurring tasks, and a shared shopping list. Data lives in a Google Sheet; the site is hosted free on GitHub Pages.

```
Phone (PWA on GitHub Pages) ──▶ Google Apps Script web app ──▶ Your Google Sheet
```

## Setup (about 15 minutes, once)

### 1. Create the backend

1. Create a new Google Sheet (name it "House Chores").
2. **Extensions → Apps Script.** Delete the placeholder code and paste in everything from `apps-script/Code.gs`. Save.
3. In the function dropdown pick **`setup`** and click **Run**. Approve the permissions (Google will warn the app is unverified. It's your own script, so choose *Advanced → Go to … (unsafe)*).
   This creates the tabs (Areas, Tasks, Shopping, Members, Log, Settings), adds Sita/Wes/Zoe, and generates your **house code**. Find it in the **Settings** tab (change it to anything you like).
4. **Deploy → New deployment →** gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click Deploy and copy the **Web app URL** (ends in `/exec`).

> "Anyone" only means anyone with the long URL *and* the house code can use the API. The sheet itself stays private to you.

### 2. Put the app on GitHub Pages

1. Create a GitHub repo and push this folder to its `main` branch.
2. Open `src/config.js` and paste your Web app URL into `API_URL` (so nobody has to type it on their phone). Commit.
3. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The included workflow builds and deploys on every push. Your site will be at `https://<username>.github.io/<repo>/`.

### 3. Install on phones

Open the site, enter the house code, pick your name.
- **iPhone:** Safari → Share → **Add to Home Screen**
- **Android:** Chrome menu → **Install app**

## How it works

- **Today**: your tasks (or everyone's), grouped Overdue / Today / This week. Tap the circle to finish; there's an Undo for 6 seconds.
- **Areas**: each area has an owner you pick by hand. Every task in it goes to that person unless the task has its own assignee. Tap the **+** inside an area to add a subtask. **Add starter areas** seeds Kitchen, Bathroom, Living Room, Trash & Recycling and Floors. Edit or delete anything.
- **Recurring tasks**: finishing one sets the next due date to *today + interval*. One-off tasks just become Done.
- **Shopping**: add items, tap to mark bought; bought items drop off after a week.
- **History**: who finished what and when.
- The app refreshes when you open it, when you switch back to it, and every 30 seconds. Changes show up instantly and sync to the sheet in the background. The last data is cached, so it opens offline (changes made offline aren't saved).

## Changing things later

- **Edit Code.gs?** In Apps Script: Deploy → Manage deployments → pencil → Version: *New version* → Deploy. The URL stays the same.
- **Add a roommate:** add a row to the **Members** tab (name, a hex color, an emoji).
- **Fix data by hand:** edit the sheet directly. Dates are `YYYY-MM-DD` text. Pull-to-refresh or "Sync now" in Settings picks it up.
- **Add the fun layer:** completing a task goes through `complete()` in `src/App.jsx`. That's the one place to hook confetti, pictures, etc.

## Develop locally

```
npm install
npm run dev        # http://localhost:5173
npm run build
```
