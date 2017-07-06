export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/ionic-login.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng.ionic-login',
  globals: {
    '@angular/core': 'ng.core',
    'rxjs/Observable': 'Rx',
    'rxjs/ReplaySubject': 'Rx',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observable'
  }
}