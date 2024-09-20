# Project Architecture Overview

## 1. **Introduction**

This project follows a **micro-frontend architecture**, where the frontend is divided into smaller, self-contained modules. Each screen or feature is implemented as a micro-frontend, which handles its own logic and UI. The architecture allows for scalability, ease of maintenance, and independent development of different features.

This guide outlines the project structure, conventions, and coding practices that developers need to follow when contributing to the project.

## 2. **Folder Structure**

The project is structured by feature, with each feature or screen typically organized in its own folder. Each folder includes the following components:

- **View**: React components responsible for rendering the UI.
- **Controller**: Hooks that manage the logic for the screen.
- **Shared Components**: Reusable components (e.g., buttons, modals, inputs) shared across multiple screens.
- **Helpers**: Utility functions, HTTP clients, and business logic related to the feature.
- **Global Files**: Common assets, such as images, colors, and types shared across the entire application.

### Example folder structure:

/connection
/Views

- HeaderTexts.tsx
  /sharedViews
- ButtonChangeScreen.tsx
- SocialButtons.tsx
- TextInput.tsx
  /connectionScreen.tsx
- useConnectionController.ts
  /helpers
- httpClient/queries/auth/useConnect.ts
  /global
- images.ts
- colors.ts
- types/screensProps.ts

## 3. **File Naming Conventions**

- Components and views are stored in `PascalCase` (e.g., `HeaderTexts.tsx`, `ConnectionScreen.tsx`).
- Hooks and controllers are stored in `camelCase` (e.g., `useConnectionController.ts`).
- Shared components are placed in a `sharedViews` folder to encourage reusability.

## 4. **React Component Structure**

Each screen is a functional component that:

- Uses **React Native** components for UI rendering.
- Separates concerns by using a controller (hook) to manage business logic and state.
- Imports reusable components from shared views.
- Follows the project's global theme for consistency (e.g., colors, fonts).

### Path to example component:

`connection/connectionScreen.tsx`

## 5. **Controller (Business Logic)**

Each screen has an associated controller hook that manages state, side effects, and business logic. The controller is typically stored in the same directory as the screen and is named following the `use<ScreenName>Controller` pattern.

### Path to example controller:

`connection/useConnectionController.ts`

## 6. **Shared Components**

Shared components such as buttons, inputs, and modals are placed in a `sharedViews` directory and reused across different screens. These components follow a consistent API, typically accepting props to control their behavior.

### Path to example shared component:

`connection/sharedViews/TextInput.tsx`

## 7. **Hooks and Helpers**

Helpers such as HTTP requests and complex business logic are encapsulated in hooks. Queries are handled using **@tanstack/react-query**, which improves **data consistency, error handling, loading states**, and more, ensuring better performance and scalability.

### Path to example helper and query:

`httpClient/queries/auth/useConnect.ts`

## 8. **Styling Guidelines**

The project uses a centralized theme for colors, fonts, and dimensions. These are stored in a `@global` directory and should be consistently used across all components to ensure a uniform look and feel.

### Path to global styles:

`global/colors.ts`

## 9. **Error Handling**

Error handling is done at the controller and hook levels. Controllers and hooks catch errors and pass the error state back to the view, which displays them appropriately using UI components such as `Text` or `Modals`.
