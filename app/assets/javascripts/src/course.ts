//(c) Jakub Krol 2015
/// <reference path="../vendor/custom.d.ts"/>
/// <reference path="controllers/course_ctrl.ts"/>
/// <reference path="directives/select_picker_directive.ts"/>

declare var app:any;

module ApkiOrg.CourseMgr {
    //Init Angular app
    app = angular.module('courseApp', ['ngResource']);
    app.controller('myCtrl', appCourseCtrl);
    app.filter('to_trusted', ['$sce', ($sce) => {
        return (text) => {
            return $sce.trustAsHtml(text);
        };
    }]);

    app.directive('selectpicker', SelectPickerDirective.Factory());
}