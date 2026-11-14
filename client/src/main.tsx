import { lazy } from "react";
import { createRoot } from "react-dom/client";

const App = lazy(() => import("./App.tsx"));

createRoot(document.getElementById("root")!).render(<App />);
