import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1008229438432-0g5i2u7ftfr4g1skk5k88k8ppu2gvc6v.apps.googleusercontent.com">
      <Provider store={store}>
        {/* <IconContext.Provider value={{ size: "1.2em" }}> */}
        <App />
        {/* </IconContext.Provider> */}
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
