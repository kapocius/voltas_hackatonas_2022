import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'obd',
  webDir: 'build',
  bundledWebRuntime: false,
  "server": {
    // "url": "http://10.50.8.96:8100",  elwio
    "url": "http://10.50.8.93:8100",  
    "cleartext": true
  },
};

export default config;
