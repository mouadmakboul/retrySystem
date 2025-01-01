
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  assets: {
    'index.csr.html': {size: 8108, hash: '8949176022e9c7d21613c443a634d2bebac31bff8c4d7e2030c719b95c30debc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1679, hash: '283ffac1ca6d1b9ff7fe25add025b38147ded86d2c7639e11e41eb9e6bf27407', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 72165, hash: '5f95fddca1389dc4308766ba13eb20d286bf1fc91ade052c02a45a384e4fe53e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5ABRXPG2.css': {size: 6982, hash: 'LJQ8PhgllFg', text: () => import('./assets-chunks/styles-5ABRXPG2_css.mjs').then(m => m.default)}
  },
};
