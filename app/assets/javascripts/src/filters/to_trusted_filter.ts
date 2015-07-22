//(c) Jakub Krol 2015
/// <reference path="../course.ts"/>

declare var app:any;

module ApkiOrg.CourseMgr {
    export var ToTrustedFilter:any = ['$sce', ($sce) => {
        return (text) => {
            return $sce.trustAsHtml(text);
        };
    }];
}