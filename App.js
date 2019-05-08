import React from "react";
import { View } from "react-native";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/lib/integration/react";

import { persistor, store } from "state-management/store";
import { NavigationManager } from "navigation";
import { Modal } from "components";

export default class extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PersistGate
          persistor={persistor}
          loading={<View style={{ backgroundColor: "white", flex: 1 }} />}
        >
          <PaperProvider>
            <Modal />
            <NavigationManager />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    );
  }
}
