//(c) Jakub Krol 2015
/// <reference path="../course.ts"/>

declare var app:any;

module ApkiOrg.CourseMgr {
    var _transTable:any = {
        'RUBY':'ruby',
        'JAVASCRIPT':'javascript',
        'CSHARP':'csharp',
        'PYTHON':'python'
    };

    export var ServerSourceLangToACELangFilter:any = ['$sce', ($sce) => {
        return (text) => {
            return _transTable[text];
        };
    }];
}