# ObservationList

ObservationList is an Expo and React Native mobile app for digitising the daily housekeeping observation checklist used at The Marlay Nursing Home.

The app turns the paper form fields, such as Area, Month, Date, Room No/Area, Observation, and Signature, into digital records. Managers can quickly review open, urgent, completed, and follow-up items across all housekeeping areas.

## Architecture

The codebase is split into layers so the app can grow according to SOLID principles:

- `domain`: Observation model and repository interface contracts.
- `application`: Use-case classes that manage business workflows.
- `infrastructure`: Concrete data sources such as local data, APIs, or databases.
- `presentation`: Screens, components, and view models.
- `app`: The composition root where dependencies are wired together.

With this structure, future data sources or screens can be added without changing the core application flow.

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

> iOS simulator support requires macOS.
