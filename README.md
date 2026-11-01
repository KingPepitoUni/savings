# Savings Tracker

A personal, manual savings tracker that runs on an iPhone like an app. No bank connection,
no account, no server. You enter each account's balance once a month and it takes under 2 minutes.

**Your data never leaves your phone.** This repository only contains the app's code. Balances,
accounts and transfers are stored on the device and exported only when you choose to.

## Features

| Page | What it shows |
|---|---|
| **Home** | Net worth (cash / stocks / company shares), safety cushion (months of spending covered), savings vs monthly target, dreams progress |
| **Savings** | Monthly update screen, stacked chart per account with target and trend lines, per-account detail and history |
| **Flows** | The automatic transfers on the 1st of the month, account by account, with what's left on each account |
| **Dreams** | Goals funded in priority order (1, 2, 3…), plus a "dream house" simulation that grows with your net worth |
| **Owed** | Money advanced to a family member, repayments received, and an "if repayments stop" simulation |

Also included:
- **Reminder banner** when the month isn't updated after the 30th.
- **Backup reminder** when the last backup is more than ~5 weeks old.
- **JSON backup / restore** and **Excel export** (balances, flows, money owed, dreams).
- **Offline:** works without internet once installed.
- **Light and dark mode.**

## Install on iPhone

1. Open the GitHub Pages link of this repository in **Safari**:
   `https://<your-username>.github.io/<repo-name>/`
2. Tap **Share** → **Add to Home Screen** → **Add**.
3. Open the app **from the home-screen icon** from now on.
   Safari and the icon keep separate data.
4. First launch: **Import a backup (.json)** or **Start from scratch**.

### Try the demo

On the welcome screen, tap **Try the demo**. It loads a fictional profile
([`example-backup.json`](example-backup.json)): 6 months of balances, transfers, dreams and money owed.
- No download or import needed.
- A **Demo mode** banner stays on every page.
- Tap **Exit demo** to erase the demo data and go back to the welcome screen.

## Publish with GitHub Pages (free)

1. Upload these files to the root of the repository:
   `index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`,
   `README.md`, `example-backup.json`
2. **Settings** → **Pages** → Source: **Deploy from a branch** → branch `main`, folder `/ (root)` → **Save**.
3. After 1–2 minutes the app is live at `https://<your-username>.github.io/<repo-name>/`.

> ⚠️ Never upload your own backup file (with your real balances) to this repository: it is public.
> Only `example-backup.json`, which is fictional, belongs here.

## Monthly routine

1. Open the app and tap **Update**. The fields are pre-filled with last month: change only what moved.
2. Tap **Save**, then **Export backup**, and save the file to iCloud Drive.

## Updating the app

Upload the new `index.html` (Add file → Upload files → Commit). The phone picks it up the next
time the app is opened with internet. Your data is kept.

## Backups & data safety

- Data is stored in the browser storage of the home-screen app (`localStorage`).
- iOS can, in rare cases, clear a web app's storage. Export a backup after each monthly update.
- Restore at any time: ⚙️ Settings → **Import backup**.

## How some numbers are calculated

**Monthly target (automatic):** income − spending, read from your transfers. It can be set by hand
in Settings, with a shares / savings split (50/50 by default).

**Safety cushion:** cash (not stocks) ÷ monthly spending, against a goal of 6 months.
The estimated date uses your recent pace, or your transfer plan if the recent pace is too slow.

**Dream house:** older property + renovation, with cash paid up front:
- Purchase price = S × market price/m² × (1 − discount for work)
- Renovation = S × renovation cost/m²
- Cash needed = 10% down payment + 1.2% loan guarantee (on the total project)
  \+ 7.5% notary fees (on the purchase price) + €1,000 bank fee

Affordable surface:

```
S = (net worth − 1,000) / [ 0.112 × (price/m² + reno/m²) + 0.075 × price/m² ]
```

Every one of these values is editable in Settings.

## Tech

- **A single `index.html`:** plain HTML, CSS and JavaScript. No framework, no build step.
- **Charts and icons:** hand-drawn inline SVG.
- **Excel export:** [SheetJS](https://sheetjs.com/), loaded from cdnjs and cached for offline use.
- **`sw.js`:** a service worker for offline use (network first, so updates arrive automatically).
