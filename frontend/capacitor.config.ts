import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mycompany.tabtab',
  appName: 'TabTab',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
