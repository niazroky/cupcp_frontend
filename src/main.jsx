// Import necessary modules from the React library
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Import the main App component and global styles(tailwind css)
import App from "./App.jsx";
import "./index.css";

// Import the authentication context provider
import { AuthProvider } from "./components/ProtectedRoute/AuthContext.jsx";

// Initialize and render the root application
createRoot(document.getElementById("root")).render(
  <StrictMode> 
    {/* StrictMode helps identify potential issues in the application */}
    <AuthProvider> 
      {/* AuthProvider manages authentication state across the application */}
      <App/>
    </AuthProvider>
  </StrictMode>
);
