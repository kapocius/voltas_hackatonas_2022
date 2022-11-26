import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { stringify } from "querystring";
import InitialScreen from "../components/InitialScreen";
import "./Home.css";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { searchAndConnect } from "../BleService";
import { webUUIDToString } from "@capacitor-community/bluetooth-le";

const Page = styled(IonPage)`
  display: flex;
  color: #fff;

  .center-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    height: 100%;
  }
`;

const Home: React.FC<any> = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [state, setState] = useState<any>({});

  console.log(webUUIDToString("0000ffe0-0000-1000-8000-00805f9b34fb"));

  useEffect(() => {
    // try {
    //   // scan(setDevices);
    //   searchAndConnect()
    //     .then((services) => {
    //       setState(services);
    //       setIsLoading(false);
    //       setIsConnected(true);
    //     })
    //     .catch(() => {
    //       setIsLoading(false);
    //       setIsConnected(false);
    //     });
    // } catch (e) {
    //   console.log(e);
    //   setIsLoading(false);
    //   setIsConnected(false);
    // }
  }, []);

  return (
    <Page>
      <IonContent fullscreen>
        {/* <IonToolbar>
          <IonTitle style={{ textAlign: "center" }} size="large">
            Blank
          </IonTitle>
        </IonToolbar> */}

        <InitialScreen
          device={state.device}
          isConnected={isConnected}
          isLoading={isLoading}
          services={state.services}
        />
        {/* <Container> 
        {/* </Container> */}
      </IonContent>
    </Page>
  );
};

export default Home;
