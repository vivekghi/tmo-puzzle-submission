/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import  * as Wreck from '@hapi/wreck';
import { environment }  from './environments/environment';
import * as Catboxmemory from '@hapi/catbox-memory';
import { from } from 'rxjs';
//@Inject(StocksAppConfigToken) private env: StocksAppConfig,
const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost',
    cache: [{
        name: 'stock-cache',
        provider: {
          constructor: Catboxmemory
        }
    }]
  });

  // server.route({
  //   method: 'GET',
  //   path: '/',
  //   handler: (request, h) => {
  //     console.log('base');
  //     return {
  //       hello: 'world'
  //     };
  //   }
  // });

  const getStock = async(symbol,period) => {
    const { res, payload } =await Wreck.get(`${environment.apiURL}/beta/stock/${symbol}/chart/${period}?token=${environment.apiKey}`);

          return payload;
  }

  const stockCache = server.cache({
    cache: 'stock-cache',
    expiresIn: 60*1000,
    segment: 'customSegment',
    // generateFunc: async(id) => {
    //   return await getStock(id['a'],id['b']);
    // },
    //generateTimeout: 2000
  });

  server.route({
    method: 'GET',
    path: '/api/{symbol}/{period}',
    handler: async (request, h) => {
          const { symbol, period} = request.params;
          
          const id = `${symbol}:${period}`;
          const fromCache = await stockCache.get(id);
          if (fromCache) {
            console.log('item found'); 
            return fromCache;
          }
          console.log('item not found'); 
          const fromAPi = await getStock(symbol,period);
          await stockCache.set(id, fromAPi, 500000);
          return fromAPi;
          //await Wreck.get(`${environment.apiURL}/beta/stock/${request.params.symbol}/chart/${request.params.period}?token=${environment.apiKey}`);

          //return payload;
        }
      
    
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
