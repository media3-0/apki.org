//(c) Jakub Krol 2015
/// <reference path="../vendor/custom.d.ts"/>
/// <reference path="controllers/apanel_list_ctrl.ts"/>
/// <reference path="filters/to_trusted_filter.ts"/>
/// <reference path="filters/server_source_lang_to_ace_lang_filter.ts"/>

declare var app:any;

module ApkiOrg.APanelListMgr {
    //Init Angular app
    app = angular.module('aPanelListApp', ['ngResource']);
    app.controller('myCtrl', aPanelListCtrl);

    app.filter('to_trusted', ApkiOrg.CourseMgr.ToTrustedFilter);
    app.filter('server_source_lang_to_ace_lang', ApkiOrg.CourseMgr.ServerSourceLangToACELangFilter);
}