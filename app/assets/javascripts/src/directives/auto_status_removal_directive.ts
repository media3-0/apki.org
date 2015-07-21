//(c) Jakub Krol 2015
/// <reference path="../../vendor/custom.d.ts"/>

module ApkiOrg.CourseMgr {
    /**
     * Directive: select picker JQuerier.
     */
    export class AutoStatusRemovalDirective
    {
        public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
//        public template = '<div>{{name}}</div>';
        public scope = {};

        constructor($timeout)
        {
            // It's important to add `link` to the prototype or you will end up with state issues.
            // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
            AutoStatusRemovalDirective.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) =>
            {
                $timeout((element) => {
                    jQuery(element).on('click', function(){
                        $(this).removeClass('has-success has-warning has-error').find('.form-control-feedback').remove();
                    });
                }, 0, true, element);
            };
        }

        public static Factory()
        {
            var directive = ($timeout) =>
            {
                return new AutoStatusRemovalDirective($timeout);
            };

            directive['$inject'] = ['$timeout'];

            return directive;
        }
    }
}