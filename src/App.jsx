import Dashboard from "./Dashboard";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <>
      <Dashboard />
      <Analytics />
    </>
  );
}
