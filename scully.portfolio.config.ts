import { ScullyConfig } from '@scullyio/scully';

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "portfolio",
  outDir: './dist/static',
  routes: {
    '/about': {
      type: 'default',
    },
    '/experience': {
      type: 'default',
    },
    '/projects': {
      type: 'default',
    },
    '/contact': {
      type: 'default',
    },
  },
};