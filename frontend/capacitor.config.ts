import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'TabTab',
  webDir: 'www',
  bundledWebRuntime: false,

  server: {
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: ['http://taba-taba-api.eu-north-1.elasticbeanstalk.com/api/v1']
  }
};

export default config;
