import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { RemindersProvider } from "./utils/useReminders.tsx";
import { persistor, store } from "./redux/configureStore.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RemindersProvider>
          <App />
        </RemindersProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
