# ObservationList

ObservationList is an Expo and React Native mobile app for digitising the daily housekeeping observation checklist used at The Marlay Nursing Home.

The app turns the paper form fields, such as Area, Month, Date, Room No/Area, Observation, and Signature, into digital records. Managers can quickly review open, urgent, completed, and follow-up items across all housekeeping areas.

The starter workflow also separates manager and housekeeping permissions. A manager can see every area, apply date/area/status filters, and change observation status. A housekeeping user sees only the area assigned for that day and can add or update observations only inside that assigned area.

## Marlay housekeeping areas

The starter data models the eight daily housekeeping areas used across the home:

- Grange 1: ground floor, rooms 1-22
- Grange 2: ground floor, rooms 23-36
- Whitechurch 1: first floor, rooms 101-122
- Whitechurch 2: first floor, rooms 123-146
- Ticknock: first floor, rooms 147-176
- Three Rock 1: second floor, rooms 201-222
- Three Rock 2: second floor, rooms 223-246
- St. Sab's: second floor, rooms 247-276

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
