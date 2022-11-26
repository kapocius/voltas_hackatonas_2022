import { IonContent, IonItem, IonLabel, IonSpinner } from "@ionic/react";
import "./InitialScreen.css";
import styled from "styled-components";
import { BsShieldCheck } from "react-icons/bs";
import { IonIcon } from "react-ion-icon";
import { readChar, writeChar } from "../BleService";
import { numbersToDataView, textToDataView } from "@capacitor-community/bluetooth-le";

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

const Service = styled.div`
  color: #fff;
  border: 1px solid red;
  margin-bottom: 14px;

  button {
    padding: 8px;
  }
`;

const InitialScreen: React.FC<any> = (props: any) => {
  const { isLoading, isConnected, device, services } = props;

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
        {services?.map(({ uuid, characteristics }: any) => {
          return (
            <>
              {characteristics
                ?.filter((c: any) => !!c?.properties?.writeWithoutResponse)
                ?.map((c: any) => {
                  return (
                    <div>
                      {/* Service: {uuid}, <br />
                    Characteristic: {c.uuid}
                    <br />
                    Descriptors: {c?.descriptors?.join(",")}
                    <br /> */}
                      <button onClick={() => writeChar(device.deviceId, uuid, c.uuid, textToDataView("AT Z"))}>
                        WRITE ATZ {c.uuid}
                      </button>
                      <button onClick={() => writeChar(device.deviceId, uuid, c.uuid, numbersToDataView([0x01, 0x00]))}>
                        WRITE 0100 {c.uuid}
                      </button>
                      <button onClick={() => writeChar(device.deviceId, uuid, c.uuid, numbersToDataView([0x09, 0x02]))}>
                        WRITE 0902 {c.uuid}
                      </button>
                      {/* {c?.descriptors?.map((d: any) => {
                        return (
                          <button onClick={() => writeChar(device.deviceId, uuid, c.uuid, d.uuid)}>
                            WRITE DESC {c.uuid}
                          </button>
                        );
                      })} */}
                    </div>
                  );
                })}
              <br />
            </>
          );
        })}
        {services?.map(({ uuid, characteristics }: any) => {
          return (
            <>
              {characteristics
                ?.filter((c: any) => !c?.properties?.write)
                ?.map((c: any) => {
                  return (
                    <div>
                      {/* Service: {uuid}, <br />
                    Characteristic: {c.uuid}
                    <br />
                    Descriptors: {c?.descriptors?.join(",")}
                    <br /> */}
                      <button onClick={() => readChar(device.deviceId, uuid, c.uuid)}>READ {c.uuid}</button>
                    </div>
                  );
                })}
              <br />
            </>
          );
        })}

        {/* <IonIcon name="shield-checkmark-outline" color="success" size="68px"></IonIcon> */}
      </PageContainer>
    </IonContent>
  );
};

export default InitialScreen;
