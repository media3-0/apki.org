//(c) Jakub Krol 2015
/// <reference path="../vendor/custom.d.ts"/>
/// <reference path="controllers/course_ctrl.ts"/>
/// <reference path="directives/select_picker_directive.ts"/>
/// <reference path="directives/auto_status_removal_directive.ts"/>
/// <reference path="directives/code_editor_directive.ts"/>
/// <reference path="filters/to_trusted_filter.ts"/>
/// <reference path="filters/server_source_lang_to_ace_lang_filter.ts"/>

declare var app:any;

module ApkiOrg.CourseMgr {
    //Init Angular app
    app = angular.module('courseApp', ['ngResource', 'ngAnimate']);
    app.controller('myCtrl', appCourseCtrl);

    app.filter('to_trusted', ToTrustedFilter);
    app.filter('server_source_lang_to_ace_lang', ServerSourceLangToACELangFilter);

    app.directive('selectpicker', SelectPickerDirective.Factory());
    app.directive('autostatusremoval', AutoStatusRemovalDirective.Factory());
    app.directive('codeeditor', CodeEditorDirective.Factory());
}