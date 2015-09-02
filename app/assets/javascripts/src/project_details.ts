//(c) Jakub Krol 2015
/// <reference path="../vendor/custom.d.ts"/>
/// <reference path="controllers/project_details_ctrl.ts"/>
/// <reference path="filters/to_trusted_filter.ts"/>

declare var app:any;

module ApkiOrg.ProjectDetailsMgr {
    //Init Angular app
    app = angular.module('projectDetailsApp', ['ngResource', 'ngAnimate']);
    app.controller('myCtrl', appProjectDetailsCtrl);

    app.filter('to_trusted', ApkiOrg.CourseMgr.ToTrustedFilter);
}