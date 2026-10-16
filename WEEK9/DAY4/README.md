# Week 9, Day 4: Redux Toolkit Exercises

## User Profile

A React app that fetches a user from JSONPlaceholder and displays the profile using Redux Toolkit and React Redux.

```powershell
cd app
npm install
npm run dev
```

The user request is implemented as a Redux Toolkit async thunk. The UI displays loading and error states and provides a retry button if the request fails.

## Age Tracker

The `age-tracker` app asynchronously increments or decrements an age using Redux Toolkit thunks. It displays a loading indicator during updates and prevents the age from going below zero.

```powershell
cd age-tracker
npm install
npm run dev
```
