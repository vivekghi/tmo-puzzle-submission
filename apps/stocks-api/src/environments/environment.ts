// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { StocksAppConfig } from '@coding-challenge/stocks/data-access-app-config';
export const environment: StocksAppConfig = {
  production: false,
  apiKey: 'Tpk_9f91dd3b21c94daf8ea8d9dd53240251',
   apiURL: 'https://sandbox.iexapis.com'
  //apiURL: 'https://cloud.iexapis.com'
};
