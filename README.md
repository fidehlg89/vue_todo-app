# Vue.js Todo Application (SOLID Refactor)

A polished and professional Todo application built with Vue 3, focusing on clean architecture, SOLID principles, and data persistence.

**Live Demo**: [https://fe-vue3-todo.netlify.app](https://fe-vue3-todo.netlify.app)

## 🚀 Key Features

- **Full CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Data Persistence**: Tasks are automatically saved to `localStorage`.
- **Task Management**:
    - Mark tasks as Complete/Doing/Todo.
    - Duplicate existing tasks.
    - Set due dates for tasks.
    - Automatic highlight for overdue tasks.
- **Filtering**: View all, pending, or completed tasks.
- **Responsive UI**: Built with Bootstrap for a premium, responsive look.
- **Confirmation Flow**: Secure deletion with confirmation dialogs.

## 🛠️ Architecture (SOLID)

This project has been refactored to adhere to **SOLID** principles:

- **S (Single Responsibility)**: Logic is isolated into specific files. Business logic resides in `composables`, while components handle only the UI.
- **O (Open/Closed)**: Task statuses and filters are data-driven via `src/constants/tasks.js`.
- **L (Liskov Substitution)**: Components use standard prop interfaces.
- **I (Interface Segregation)**: Composables provide only the necessary methods for each component.
- **D (Dependency Inversion)**: Components depend on composable abstractions rather than a global store directly.

## 💻 Tech Stack

- **Framework**: Vue 3 (Composition API)
- **State Management**: Vuex
- **Styling**: Bootstrap 5
- **Utilities**: UUID for unique identifiers, LocalStorage for persistence.
- **Linting**: ESLint (Standard)

## 🏗️ Project Setup

### Prerequisites
- Node.js (v16+)
- Yarn or NPM

### Installation
```bash
yarn install
# or
npm install
```

### Compiles and hot-reloads for development
```bash
yarn serve
# or
npm run serve
```

### Lints and fixes files
```bash
yarn lint
# or
npm run lint
```

## 📂 Project Structure

```text
src/
├── components/     # UI Components (TodoItem, TodoList, etc.)
├── composables/    # Business logic (useTasks, useTaskDate)
├── constants/      # App constants and configurations
├── store/          # Vuex store with persistence plugin
└── App.vue         # Main application shell
```

---
*Developed with focus on Clean Code and Maintainability.*