import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Graph from "./Graph.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Graph />
	</StrictMode>,
);
