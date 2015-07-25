//(c) Jakub Krol 2015
/// <reference path="../vendor/custom.d.ts"/>
/// <reference path="controllers/apanel_ctrl.ts"/>
/// <reference path="directives/select_picker_directive.ts"/>
/// <reference path="directives/auto_status_removal_directive.ts"/>
/// <reference path="directives/code_editor_directive.ts"/>
/// <reference path="directives/sliding_content_directive.ts"/>
/// <reference path="filters/to_trusted_filter.ts"/>
/// <reference path="filters/server_source_lang_to_ace_lang_filter.ts"/>

declare var app:any;

module ApkiOrg.APanelMgr {
    //Init Angular app
    app = angular.module('aPanelApp', ['ngResource']);
    app.controller('myCtrl', aPanelCtrl);

    app.filter('to_trusted', ApkiOrg.CourseMgr.ToTrustedFilter);
    app.filter('server_source_lang_to_ace_lang', ApkiOrg.CourseMgr.ServerSourceLangToACELangFilter);

    app.directive('selectpicker', ApkiOrg.CourseMgr.SelectPickerDirective.Factory());
    app.directive('autostatusremoval', ApkiOrg.CourseMgr.AutoStatusRemovalDirective.Factory());
    app.directive('codeeditor', ApkiOrg.CourseMgr.CodeEditorDirective.Factory());
    app.directive('slidingcontent', ApkiOrg.CourseMgr.SlidingContentDirective.Factory());
}