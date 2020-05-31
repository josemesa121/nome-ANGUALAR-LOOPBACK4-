import {NomeApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {NomeApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new NomeApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
