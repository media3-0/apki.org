//(c) Jakub Krol 2015
/// <reference path="../../vendor/custom.d.ts"/>

module ApkiOrg.CourseMgr {
    /**
     * Directive: select picker JQuerier.
     */
    export class SlidingContentDirective
    {
        public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
//        public template = '<div>{{name}}</div>';
        public scope = {};

        constructor($timeout)
        {
            // It's important to add `link` to the prototype or you will end up with state issues.
            // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
            SlidingContentDirective.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) =>
            {
                $timeout((element) => {
                    jQuery(element).append('<div style="float:right" class="show-hide-sliding-content"><a href="javascript:;">Pokaż / schowaj</a></div>');
                    jQuery(element).find('.show-hide-sliding-content>a').click(function() {
                        var _div = $(this).parent().parent().next('div');
                        if (_div.is(':visible'))
                            _div.slideUp('fast');
                        else
                            _div.slideDown('fast');
                    }).parent().parent().next('div').hide();
                }, 0, true, element);
            };
        }

        public static Factory()
        {
            var directive = ($timeout) =>
            {
                return new SlidingContentDirective($timeout);
            };

            directive['$inject'] = ['$timeout'];

            return directive;
        }
    }
}