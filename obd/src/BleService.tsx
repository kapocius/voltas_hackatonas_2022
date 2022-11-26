import {
  BleClient,
  dataViewToHexString,
  hexStringToDataView,
  numbersToDataView,
  numberToUUID,
  textToDataView,
  webUUIDToString,
} from "@capacitor-community/bluetooth-le";

const HEART_RATE_SERVICE = "0000180d-0000-1000-8000-00805f9b34fb";
const HEART_RATE_MEASUREMENT_CHARACTERISTIC = "00002a37-0000-1000-8000-00805f9b34fb";
const BODY_SENSOR_LOCATION_CHARACTERISTIC = "00002a38-0000-1000-8000-00805f9b34fb";
const BATTERY_SERVICE = numberToUUID(0x180f);
const BATTERY_CHARACTERISTIC = numberToUUID(0x2a19);
const POLAR_PMD_SERVICE = "fb005c80-02e7-f387-1cad-8acd2d8df0c8";
const POLAR_PMD_CONTROL_POINT = "fb005c81-02e7-f387-1cad-8acd2d8df0c8";

const HEART_RATE_SERVICE_SCAN = numberToUUID(0x180d);

export async function scan(callback: any): Promise<void> {
  try {
    await BleClient.initialize();

    console.log("Starting to Scan");
    const devicesList: any = [];
    await BleClient.requestLEScan(
      {
        // services: [HEART_RATE_SERVICE_SCAN],
      },
      (result) => {
        console.log("received new scan result", result?.device?.deviceId, result);
        devicesList.push(result?.device);
        // alert(result);
      }
    );

    setTimeout(async () => {
      await BleClient.stopLEScan();
      console.log("stopped scanning");
      callback(devicesList);
    }, 60000);
  } catch (error) {
    console.error(error);
  }
}

const ELM_MAC = "1C:BA:8C:1D:F2:D3";
// const ELM_MAC = "1c:ba:8c:1d:f2:d3";
const ELM_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";

export async function readChar(deviceId: any, service: any, characteristic: any) {
  let data = await BleClient.read(
    deviceId,
    service,
    characteristic
    // "00002902-0000-1000-8000-00805f9b34fb",
    // textToDataView("09 02"),
    // {
    //   timeout: 20000,
    // }
    // numbersToDataView(0x0902)
  );

  console.log("DATA READ", dataViewToHexString(data));

  //   await BleClient.startNotifications(deviceId, service, characteristic, (value) => {
  //     console.log("value", value, dataViewToHexString(value));
  //   });
  //   const respa = await BleClient.read(deviceId, service, characteristic);
  //   console.log("RESPONSE READ:", respa, dataViewToHexString(respa));
}

export async function writeChar(deviceId: any, service: any, characteristic: any, value?: any, descriptor?: any) {
  await BleClient.startNotifications(deviceId, service, characteristic, (value) => {
    console.log("value", value, dataViewToHexString(value));
  });

  await BleClient.writeWithoutResponse(
    deviceId,
    service,
    characteristic,
    // "00002902-0000-1000-8000-00805f9b34fb",
    // textToDataView("0100"),
    // descriptor,
    // numbersToDataView([0x01, 0x0c]),
    textToDataView("AT Z"),
    value
    // {
    //   timeout: 20000,
    // }
    // numbersToDataView(0x0902)
  );

  //   const respa = await BleClient.read(deviceId, service, characteristic);
  //   console.log("RESPONSE READ:", respa, dataViewToHexString(respa));
}

export async function searchAndConnect(): Promise<any> {
  //   try {
  await BleClient.initialize();

  const device = await BleClient.requestDevice({
    services: ["0000ffe0-0000-1000-8000-00805f9b34fb", "00001800-0000-1000-8000-00805f9b34fb"],
  });

  // const device = { deviceId: ELM_MAC };
  //   services: [HEART_RATE_SERVICE],
  //   optionalServices: [BATTERY_SERVICE, POLAR_PMD_SERVICE],
  //   //   deviceId: "1C:BA:8C:1D:F2:D3",
  // });

  console.log(device);
  // connect to device, the onDisconnect callback is optional
  await BleClient.disconnect(device.deviceId);
  await BleClient.connect(device.deviceId, (deviceId) => onDisconnect(deviceId));
  //   await BleClient.createBond(device.deviceId);

  // await BleClient.requestLEScan()
  console.log("connected to device", device.deviceId);

  const services = await BleClient.getServices(device.deviceId);
  console.log(services);
  return { device, services };

  //   await BleClient.write(device.deviceId, )

  //   await BleClient.writeWithoutResponse(
  //     device.deviceId,
  //     "0000180a-0000-1000-8000-00805f9b34fb",
  //     "00002a23-0000-1000-8000-00805f9b34fb",
  //     hexStringToDataView("09 02")
  // numbersToDataView([09, 02])
  //   );

  //   const resp = await BleClient.read(
  //     device.deviceId,
  //     "0000ffe0-0000-1000-8000-00805f9b34fb",
  //     "0000ffe1-0000-1000-8000-00805f9b34fb"
  //   );

  //   console.log("resp", resp, dataViewToHexString(resp));

  //   await BleClient.writeDescriptor(
  //     device.deviceId,
  //     "0000ffe0-0000-1000-8000-00805f9b34fb",
  //     "0000ffe1-0000-1000-8000-00805f9b34fb",
  //     "00002902-0000-1000-8000-00805f9b34fb",
  //     hexStringToDataView("09 02")
  //   );

  //   const respa = await BleClient.readDescriptor(
  //     device.deviceId,
  //     "0000ffe0-0000-1000-8000-00805f9b34fb",
  //     "0000ffe1-0000-1000-8000-00805f9b34fb",
  //     "00002902-0000-1000-8000-00805f9b34fb"
  //   );

  //   console.log("respa", respa, dataViewToHexString(respa));

  //   await BleClient.startNotifications(
  //     device.deviceId,
  //     "0000180a-0000-1000-8000-00805f9b34fb",
  //     "00002a23-0000-1000-8000-00805f9b34fb",
  //     (value) => {
  //       console.log("value", value, dataViewToHexString(value));
  //     }
  //   );

  // const result = await BleClient.read(device.deviceId, HEART_RATE_SERVICE, BODY_SENSOR_LOCATION_CHARACTERISTIC);
  // console.log("body sensor location", result.getUint8(0));

  // const battery = await BleClient.read(device.deviceId, BATTERY_SERVICE, BATTERY_CHARACTERISTIC);
  // console.log("battery level", battery.getUint8(0));

  // await BleClient.write(device.deviceId, POLAR_PMD_SERVICE, POLAR_PMD_CONTROL_POINT, numbersToDataView([1, 0]));
  // console.log("written [1, 0] to control point");

  // await BleClient.startNotifications(
  //   device.deviceId,
  //   HEART_RATE_SERVICE,
  //   HEART_RATE_MEASUREMENT_CHARACTERISTIC,
  //   (value) => {
  //     console.log("current heart rate", parseHeartRate(value));
  //   }
  // );

  // disconnect after 10 sec
  //   setTimeout(async () => {
  //     //   await BleClient.stopNotifications(device.deviceId, HEART_RATE_SERVICE, HEART_RATE_MEASUREMENT_CHARACTERISTIC);
  //     await BleClient.disconnect(device.deviceId);
  //     console.log("disconnected from device", device);
  //   }, 10000);
  //   } catch (error) {
  //     console.error(error);
  //   }
}

function onDisconnect(deviceId: string): void {
  console.log(`device ${deviceId} disconnected`);
}

function parseHeartRate(value: DataView): number {
  const flags = value.getUint8(0);
  const rate16Bits = flags & 0x1;
  let heartRate: number;
  if (rate16Bits > 0) {
    heartRate = value.getUint16(1, true);
  } else {
    heartRate = value.getUint8(1);
  }
  return heartRate;
}
