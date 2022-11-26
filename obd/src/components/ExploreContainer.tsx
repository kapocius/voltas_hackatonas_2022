import { IonContent, IonIcon } from "@ionic/react";
// import { IonIcon } from "react-ion-icon";
import "./ExploreContainer.css";
import styled from "styled-components";

const CheckIcon = styled.div``;

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <IonContent className="ion-padding">
      <div>
        {/* <IonIcon name="shield-checkmark-outline" color="success" size="68px"></IonIcon> */}
      </div>
      <h1>Success content</h1>
      <p>Here's a small text description for the content. Nothing more, nothing less.</p>
      <button onClick={() => window.location.reload()}>Reload</button>
    </IonContent>
  );
};

export default ExploreContainer;
