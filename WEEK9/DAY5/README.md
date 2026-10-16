# Week 9, Day 5: Redux Toolkit Exercises

## Age Tracker

A React app that updates a displayed age asynchronously with Redux Toolkit thunks.

```powershell
cd app
npm install
npm run dev
```

The Age Up and Age Down actions each wait briefly before updating the Redux store. Controls are disabled while an update is in progress, and the age cannot drop below zero.

## Book Inventory Selector

A React app demonstrating memoized genre selectors with Redux Toolkit's `createSelector`.

```powershell
cd book-inventory
npm install
npm run dev
```

Switch between All Books, Horror, Fantasy, and Science Fiction to filter the inventory.
