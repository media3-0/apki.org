//(c) Jakub Krol 2015
/// <reference path="../vendor/angularjs/angular.d.ts"/>
/// <reference path="../vendor/angularjs/angular-route.d.ts"/>

module ApkiOrg.Angular {
    export class AngularHelper{
        initAngularApp(modName:string, modules:string[], Config:any, factoryName:string, factoryClass:any):any{
            var app = angular.module(modName, modules);

            Config.$inject = ['$routeProvider'];
            app.config(Config);

            app.factory(factoryName, factoryClass);

            return app;
        }
    }
}