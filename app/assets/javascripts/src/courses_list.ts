//(c) Jakub Krol 2015
/// <reference path="../vendor/custom.d.ts"/>
/// <reference path="controllers/courses_list_ctrl.ts"/>
/// <reference path="filters/to_trusted_filter.ts"/>

declare var app:any;

module ApkiOrg.CoursesLstMgr {
    //Init Angular app
    app = angular.module('coursesLstApp', ['ngResource', 'ngAnimate']);
    app.controller('myCtrl', appCoursesLstCtrl);

    app.filter('to_trusted', ApkiOrg.CourseMgr.ToTrustedFilter);
}