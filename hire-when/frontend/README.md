### "Hire When" application

A simple application which helps you manage you in keeping tract of your jobs searching with plenty other helpful features.

# Project Structure

This project follows a modular structure, separating features, shared components, utilities, hooks, and contexts for maintainability and scalability.

## 📂 Folder Structure

src/
│── features/
│ │── ai/
│ │ │── components/
│ │ │ │── AIComponent.jsx
│ │ │ │── ... (AI-related sub-components)
│ │ │── utils/
│ │ │ │── aiUtils.js
│ │
│ │── auth/
│ │ │── components/
│ │ │ │── Login.jsx
│ │ │ │── Signup.jsx
│ │ │── utils/
│ │ │ │── authUtils.js
│ │
│ │── search/
│ │ │── components/
│ │ │ │── Searchbar.jsx
│ │ │ │── ... (Search-related sub-components)
│ │ │── utils/
│ │ │ │── searchUtils.js
│
│── shared/
│ │── components/
│ │ │── Button.jsx
│ │ │── Dropdown.jsx
│ │ │── InputField.jsx
│ │
│ │── layout/
│ │ │── Body.jsx
│ │ │── Sidebar.jsx
│ │ │── AISidebar.jsx
│ │
│ │── contexts/
│ │ │── AppContexts.js
│ │ │── ThemeContext.js
│ │ │── AuthContext.js
│ │
│ │── hooks/
│ │ │── useAuth.js
│ │ │── useTheme.js
│ │ │── useFetch.js
│ │
│ │── utils/
│ │ │── api.js
│ │ │── helpers.js
│ │ │── constants.js
│
│── App.jsx
│── index.jsx
│── main.css # Tailwind styles
│
public/
