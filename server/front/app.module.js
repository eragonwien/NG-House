var app = angular.module('app', []);
app.config(appConfig);

appConfig.$inject = ['$httpProvider']
function appConfig(httpProvider) {
    httpProvider.defaults.withCredentials = true;
}
