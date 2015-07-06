//(c) Jakub Krol 2015
/// <reference path="course_interface.ts" />
/// <reference path="../vendor/angularjs/angular.d.ts"/>
/// <reference path="angular_helpers"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        var myCtrl = (function () {
            function myCtrl($scope, $timeout, $compile) {
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.$compile = $compile;
                this.parseArticle = function () {
                    var get_gen_id = function (element) {
                        if ($.inArray($(element).attr('id'), [undefined, null, '']) > -1) {
                            var rand_id;
                            do {
                                var rand_id = 'anchor_' + Math.round(Math.random() * 1000) + Math.round(Math.random() * 1000);
                            } while ($('*[id="' + rand_id + '"]').length > 0);
                            $(element).attr('id', rand_id);
                        }
                        return $(element).attr('id');
                    };
                    var art_el = $('#courseCnt').find('.course-article');
                    if (art_el.length == 0)
                        return;
                    var sub_cats = [];
                    art_el.find(':header, iframe').each(function () {
                        if ($(this).is(':header')) {
                            sub_cats.push({
                                'title': $.trim($(this).text()),
                                'anchor': '#' + get_gen_id(this),
                                'ico': 'glyphicon-align-justify'
                            });
                        }
                        if ($(this).is('iframe')) {
                            if ($.inArray($(this).attr('alt'), [undefined, null, '']) > -1) {
                                $(this).attr('alt', 'Film');
                            }
                            var iframe_id = get_gen_id(this);
                            $(this).wrap('<div></div>');
                            $(this).before('<a href="javascript:;" ng-click="fullSizeElement(this, $event)">Przejdź do trybu pełnoekranowego</a><br>');
                            $compile($(this).parent('div'))($scope);
                            sub_cats.push({
                                'title': $.trim($(this).attr('alt')),
                                'anchor': '#' + iframe_id,
                                'ico': 'glyphicon-facetime-video'
                            });
                        }
                    });
                    $('#courseLessonMenu').find('ul.article-parsed').html(''); //Empty article-parsed submenu
                    $.each(sub_cats, function () {
                        $('#courseLessonMenu').find('ul.article-parsed').append('<li><i class="glyphicon ' + this.ico + '"></i> <a href="' + this.anchor + '">' + this.title + '</a></li>');
                    });
                };
                this.fullSizeElement = function (element, $event) {
                    $('.full-screen-element').removeClass('.full-screen-element');
                    if ($($event.currentTarget).data('full-screen') === true) {
                        //close full-screen:
                        $('#courseCnt').removeClass('full-screen-art-element');
                        $($event.currentTarget).text('Przejdź do trybu pelnoekranowego');
                        $($event.currentTarget).next().next().removeClass('full-screen-element').height($($event.currentTarget).next().next().data('oryg-height'));
                        $($event.currentTarget).data('full-screen', false);
                    }
                    else {
                        //open full-screen:
                        $('#courseCnt').addClass('full-screen-art-element');
                        $($event.currentTarget).text('Wyjdź z trybu pelnoekranowego');
                        $($event.currentTarget).next().next().addClass('full-screen-element').data('oryg-height', $($event.currentTarget).next().next().height());
                        $($event.currentTarget).data('full-screen', true);
                    }
                    $($event.currentTarget)[0].scrollIntoView(true);
                };
                this.isPartVisible = function (part) {
                    return $scope.currPart == part;
                };
                this.goToPart = function (part) {
                    $scope.currPart = part;
                };
                /**
                 * Hold are menus visible
                 * @type {{left: boolean, bottom: boolean}}
                 */
                $scope.menuVisible = { 'left': true, 'bottom': true };
                /**
                 * This will init Course. Required at the beginning. Called in ng-init.
                 * @param string courseJSON JSON holding Course configuration
                 */
                $scope.initCourse = function (courseJSON) {
                    $scope.course = apkiOrg.helperObjectFromJSON(courseJSON);
                    $(window).resize($scope.resizeElements);
                    $scope.resizeElements();
                    $scope.parseArticle();
                    $scope.currPart = 'article';
                };
                /**
                 * Hides or shows one of the menus.
                 * @param string which
                 */
                $scope.hidePanelBarClick = function (which) {
                    $scope.menuVisible[which] = !$scope.menuVisible[which];
                };
                /**
                 * This will be called in window resize. May be also used manually.
                 * @param number delay Defaults to 0. When >0 it will postpone execution of this method for delay ms using $timeout.
                 */
                $scope.resizeElements = function (delay) {
                    if (delay === void 0) { delay = 0; }
                    var _resFnc = function () {
                        console.log('resizeElements...');
                        var freeHeight = $(window).height() - $('nav.navbar').height() - ($('#courseLessons').is(':visible') ? $('#courseLessons').height() : 3 /*why required ??*/) - $('#courseContent').find('.secHidePanelBar').height();
                        $('#courseContent').height(freeHeight);
                        $('#courseContent').find('.col').height($('#courseContent').height());
                        $('#courseContent').find('.col.col-line-height-100-pro').css('line-height', $('#courseContent').height() + 'px');
                        var freeWidth = $('#courseContent').width() - ($('#courseContent').find('.col.first').is(':visible') ? $('#courseContent').find('.col.first').width() : 0) - $('#courseContent').find('.firstHidePanelBar').width();
                        $('#courseContent').find('.col.sec').width(freeWidth);
                        if ($('.full-screen-element').length == 1) {
                            $('.full-screen-element').height(freeHeight - $('.full-screen-element').prev().prev().height());
                            $('.full-screen-element').prev().prev()[0].scrollIntoView(true);
                        }
                    };
                    if (delay > 0)
                        $timeout(_resFnc, delay, false);
                    else
                        _resFnc();
                };
                /**
                 * This is for parsing article :-)
                 */
            }
            myCtrl.$inject = [
                '$scope',
                '$timeout',
                '$compile'
            ];
            return myCtrl;
        })();
        CourseMgr.myCtrl = myCtrl;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
app = angular.module('courseApp', []);
app.controller('myCtrl', myCtrl);
var Achivement = (function () {
    function Achivement() {
    }
    return Achivement;
})();
exports.Achivement = Achivement;
var Quiz = (function () {
    function Quiz() {
        this.answers = [];
        this.achievement = null;
    }
    return Quiz;
})();
exports.Quiz = Quiz;
var CodeLockCoord = (function () {
    function CodeLockCoord() {
    }
    return CodeLockCoord;
})();
exports.CodeLockCoord = CodeLockCoord;
var Exercise = (function () {
    function Exercise() {
        this.code_locks = [];
        this.achievement = null;
    }
    return Exercise;
})();
exports.Exercise = Exercise;
var Lesson = (function () {
    function Lesson() {
        this.quizzes = [];
        this.exercises = [];
        this.achievement = null;
    }
    return Lesson;
})();
exports.Lesson = Lesson;
//    export class CourseAngulared implements ICourseAngulared{
//
//    }
var Course = (function () {
    function Course() {
        this.lessonsPassed = [];
        this.lessons = [];
    }
    return Course;
})();
exports.Course = Course;
var CommSendExercise = (function () {
    function CommSendExercise() {
    }
    return CommSendExercise;
})();
exports.CommSendExercise = CommSendExercise;
var CommRecvExercise = (function () {
    function CommRecvExercise() {
    }
    return CommRecvExercise;
})();
exports.CommRecvExercise = CommRecvExercise;
var CommSendQuiz = (function () {
    function CommSendQuiz() {
    }
    return CommSendQuiz;
})();
exports.CommSendQuiz = CommSendQuiz;
var CommRecvQuiz = (function () {
    function CommRecvQuiz() {
    }
    return CommRecvQuiz;
})();
exports.CommRecvQuiz = CommRecvQuiz;
//# sourceMappingURL=course.js.map