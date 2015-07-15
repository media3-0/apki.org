//(c) Jakub Krol 2015
/// <reference path="../../vendor/custom.d.ts"/>

module ApkiOrg.CourseMgr {
    /**
     * Directive: select picker JQuerier.
     */
    export class SelectPickerDirective
    {
        public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
//        public template = '<div>{{name}}</div>';
        public scope = {};

        constructor($timeout)
        {
            // It's important to add `link` to the prototype or you will end up with state issues.
            // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
            SelectPickerDirective.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) =>
            {
                $timeout((element) => {
                    $(element).selectpicker();
                }, 0, true, element);
            };
        }

        public static Factory()
        {
            var directive = ($timeout) =>
            {
                return new SelectPickerDirective($timeout);
            };

            directive['$inject'] = ['$timeout'];

            return directive;
        }
    }
}