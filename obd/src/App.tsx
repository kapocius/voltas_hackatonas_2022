import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { BLE } from "@awesome-cordova-plugins/ble/ngx";

/* Theme variables */
import "./theme/variables.css";
import { useEffect, useState } from "react";
import { searchAndConnect, scan, ELM_MAC, ELM_SERVICE, ELM_CHARACTERISTIC } from "./BleService";

setupIonicReact();

function str2ab(str: any) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

const App: React.FC = () => {
  useEffect(() => {
    const ble = new BLE();
    ble.connect(ELM_MAC);
    ble.startNotification(ELM_MAC, ELM_SERVICE, ELM_CHARACTERISTIC);
    ble.writeWithoutResponse(ELM_MAC, ELM_SERVICE, ELM_CHARACTERISTIC, str2ab("ATSP0\n"));
    ble.writeWithoutResponse(ELM_MAC, ELM_SERVICE, ELM_CHARACTERISTIC, str2ab("0902\n"));
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
