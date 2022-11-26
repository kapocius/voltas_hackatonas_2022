import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { stringify } from "querystring";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

const Home: React.FC<any> = (props: any) => {
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      {props?.devices?.map((dev: any) => (
        <div>
          ID: {dev.deviceId}
          <br />
        </div>
      ))}
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
