import { IonContent, IonItem, IonLabel, IonSpinner } from "@ionic/react";
import "./InitialScreen.css";
import styled from "styled-components";
import { BsShieldCheck } from "react-icons/bs";
import { IonIcon } from "react-ion-icon";

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const CheckIcon = styled.div``;

const InitialScreen: React.FC<any> = (props: any) => {
  const { isLoading, isConnected } = props;

  return (
    <IonContent className="ion-padding">
      <PageContainer>
        {isLoading && (
          <div style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
            <IonSpinner></IonSpinner>
            <br></br>
            <br></br>
            <div>Loading</div>
          </div>
        )}
        {isConnected && (
          <div style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
            <BsShieldCheck color="green" size={"64px"} />
            <br></br>
            <br></br>
            <div>Connected</div>
          </div>
        )}

        {/* <IonIcon name="shield-checkmark-outline" color="success" size="68px"></IonIcon> */}
      </PageContainer>
    </IonContent>
  );
};

export default InitialScreen;
