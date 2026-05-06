# Vite Admin Dashboard

A modern, high-performance administrative dashboard template built with **React 19**, **Vite**, and **Ant Design**. This project features a robust tech stack including Redux Toolkit, React Query, and Tailwind CSS, providing a solid foundation for enterprise-level applications.

## 🚀 Key Features

- **React 19 & Vite 6/8**: Leveraging the latest React features and the fastest build tool.
- **UI Framework**: Powered by **Ant Design** for high-quality components and a professional look.
- **State Management**: Dual-store approach using **Redux Toolkit** (for global/layout state) and **Zustand** (for lightweight local state).
- **Data Fetching**: **TanStack React Query** for efficient server state management, caching, and synchronization.
- **Form Management**: **React Hook Form** integrated with **Zod** for type-safe schema validation.
- **Routing**: **React Router 7** with a centralized route configuration and an automated **Route Guard** for authentication.
- **Data Visualization**: Interactive charts and dashboards using **ECharts** (via `echarts-for-react`).
- **Styling**: Modern styling with **Tailwind CSS** and **Sass**.
- **Mock Service**: Integrated **MSW (Mock Service Worker)** and **Mock.js** for seamless development without a backend.
- **Responsive Layout**: Sidebar navigation, dynamic Tag navigation (Tabs), and breadcrumbs.

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **UI Library** | [Ant Design](https://ant.design/) |
| **State** | [Redux Toolkit](https://redux-toolkit.js.org/), [Zustand](https://docs.pmnd.rs/zustand) |
| **Query** | [React Query v5](https://tanstack.com/query/latest) |
| **Routing** | [React Router 7](https://reactrouter.com/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Charts** | [ECharts](https://echarts.apache.org/) |
| **Styles** | [Tailwind CSS](https://tailwindcss.com/), [Sass](https://sass-lang.com/) |
| **Mocking** | [MSW](https://mswjs.io/), [Mock.js](http://mockjs.com/) |

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vite-project
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

### Default Login Credentials

The project uses Mock data for authentication. You can log in using:
- **Username:** `admin`
- **Password:** Any string

## 📂 Project Structure

```text
src/
├── api/            # Axios instance and query client setup
├── assets/         # Static assets like images and styles
├── components/     # Reusable UI components (Echarts, Header, Sidebar, etc.)
├── hooks/          # Custom React hooks
├── layouts/        # Page layout wrappers
├── mock/           # MSW and Mockjs definitions
├── pages/          # Page components (Home, Login, User Management, etc.)
├── routes/         # Centralized routing and Route Guards
├── services/       # API service layers
├── store/          # Redux and Zustand store definitions
├── types/          # Global TypeScript interfaces
└── utils/          # Helper functions
```

## 📜 Available Scripts

- `pnpm dev`: Runs the app in development mode with HMR.
- `pnpm build`: Compiles the application for production.
- `pnpm lint`: Runs ESLint to check for code quality issues.
- `pnpm preview`: Locally previews the production build.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
