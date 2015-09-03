//(c) Jakub Krol 2015
/// <reference path="../../vendor/custom.d.ts"/>
/// <reference path="../main.ts"/>
/// <reference path="../controllers/course_ctrl.ts"/>

module ApkiOrg.CourseMgr {
    /**
     * Directive: select picker JQuerier.
     */
    export class CodeEditorDirective
    {
        public link: (scope: IAppCtrlScope, element: ng.IAugmentedJQuery, attrs: any) => void;
//        public template = '<div>{{name}}</div>';
        public scope = false;

        constructor($timeout)
        {
            // It's important to add `link` to the prototype or you will end up with state issues.
            // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
            CodeEditorDirective.prototype.link = (scope: IAppCtrlScope, element: ng.IAugmentedJQuery, attrs: any) =>
            {
                var _f = () => {
                    $timeout(() => {
                        ApkiOrg.App.app.initEditor(attrs['sourceLang'], scope.getExercise().data.code);
                        if (scope.getExercise().data.code_locks.length>0) {
                            $.each(scope.getExercise().data.code_locks, (i, el) => {
                                ApkiOrg.App.app.getEditor().disableRange(el.rowStart, el.colStart, el.rowEnd, el.colEnd);
                            });
                        }
                        $('#editorTest>textarea').focus();
                    }, 0, true, element);
                };

                attrs.$observe('exercId', () => {
                    _f();
                }, true);
            };
        }

        public static Factory()
        {
            var directive = ($timeout) =>
            {
                return new CodeEditorDirective($timeout);
            };

            directive['$inject'] = ['$timeout'];

            return directive;
        }
    }
}