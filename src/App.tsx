import { QueryClientProvider } from "@tanstack/react-query";
import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { queryClient } from "./api/queryClient";
import { router } from "./routes";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[App Error]", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <pre style={{ padding: 24, color: "red", whiteSpace: "pre-wrap" }}>
          {(this.state.error as Error).stack}
        </pre>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
