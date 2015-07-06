//(c) Jakub Krol 2015
/// <reference path="../vendor/angularjs/angular.d.ts"/>
/// <reference path="../vendor/angularjs/angular-route.d.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var Angular;
    (function (Angular) {
        var AngularHelper = (function () {
            function AngularHelper() {
            }
            AngularHelper.prototype.initAngularApp = function (modName, modules, Config, factoryName, factoryClass) {
                var app = angular.module(modName, modules);
                Config.$inject = ['$routeProvider'];
                app.config(Config);
                app.factory(factoryName, factoryClass);
                return app;
            };
            return AngularHelper;
        })();
        Angular.AngularHelper = AngularHelper;
    })(Angular = ApkiOrg.Angular || (ApkiOrg.Angular = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
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
                 * Private.
                 */
                $scope.parseArticle = function () {
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
                /**
                 * Select element in article as full-screen element.
                 * @param string/DOMElement/jQuery element. Not used right now.
                 * @param any $event Original event with $event.currentTarget.
                 */
                $scope.fullSizeElement = function (element, $event) {
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
                $scope.isPartVisible = function (part) {
                    return $scope.currPart == part;
                };
                $scope.goToPart = function (part) {
                    $scope.currPart = part;
                };
            }
            myCtrl.$inject = [
                '$scope',
                '$timeout',
                '$compile'
            ];
            return myCtrl;
        })();
        CourseMgr.myCtrl = myCtrl;
        app = angular.module('courseApp', []);
        app.controller('myCtrl', myCtrl);
        var Achivement = (function () {
            function Achivement() {
            }
            return Achivement;
        })();
        CourseMgr.Achivement = Achivement;
        var Quiz = (function () {
            function Quiz() {
                this.answers = [];
                this.achievement = null;
            }
            return Quiz;
        })();
        CourseMgr.Quiz = Quiz;
        var CodeLockCoord = (function () {
            function CodeLockCoord() {
            }
            return CodeLockCoord;
        })();
        CourseMgr.CodeLockCoord = CodeLockCoord;
        var Exercise = (function () {
            function Exercise() {
                this.code_locks = [];
                this.achievement = null;
            }
            return Exercise;
        })();
        CourseMgr.Exercise = Exercise;
        var Lesson = (function () {
            function Lesson() {
                this.quizzes = [];
                this.exercises = [];
                this.achievement = null;
            }
            return Lesson;
        })();
        CourseMgr.Lesson = Lesson;
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
        CourseMgr.Course = Course;
        var CommSendExercise = (function () {
            function CommSendExercise() {
            }
            return CommSendExercise;
        })();
        CourseMgr.CommSendExercise = CommSendExercise;
        var CommRecvExercise = (function () {
            function CommRecvExercise() {
            }
            return CommRecvExercise;
        })();
        CourseMgr.CommRecvExercise = CommRecvExercise;
        var CommSendQuiz = (function () {
            function CommSendQuiz() {
            }
            return CommSendQuiz;
        })();
        CourseMgr.CommSendQuiz = CommSendQuiz;
        var CommRecvQuiz = (function () {
            function CommRecvQuiz() {
            }
            return CommRecvQuiz;
        })();
        CourseMgr.CommRecvQuiz = CommRecvQuiz;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
///<reference path="../vendor/jquery/jquery.d.ts" />
var Editor;
(function (Editor) {
    var EditorManager = (function () {
        function EditorManager(divId, langId) {
            this._disabled_ranges = Array();
            ace.config.set("basePath", "/ace");
            this.div = $('#' + divId);
            this.ace = ace.edit(divId);
            this.ace.setTheme("ace/theme/monokai");
            this.ace.getSession().setMode("ace/mode/" + langId);
            this.ace.$blockScrolling = Infinity;
        }
        EditorManager.prototype.disableRange = function (sRow, sCol, eRow, eCol) {
            var _this = this;
            var session = this.ace.getSession(), Range = ace.require('ace/range').Range, range = new Range(sRow, sCol, eRow, eCol), markerId = session.addMarker(range, "readonly-highlight");
            this.ace.setOption("dragEnabled", false); //Required to disable cheat
            this.ace.keyBinding.addKeyboardHandler({
                handleKeyboard: function (data, hash, keyString, keyCode, event) {
                    if (hash === -1 || (keyCode <= 40 && keyCode >= 37))
                        return false;
                    if (_this._intersects_ace_disabled(range)) {
                        return { command: "null", passEvent: false };
                    }
                }
            });
            this._before_ace_disabled(this.ace, 'onPaste', this._preventReadonly_ace_disabled.bind(this));
            this._before_ace_disabled(this.ace, 'onCut', this._preventReadonly_ace_disabled.bind(this));
            range.start = session.doc.createAnchor(range.start);
            range.end = session.doc.createAnchor(range.end);
            range.end.$insertRight = true;
            this._disabled_ranges.push(range);
        };
        EditorManager.prototype._before_ace_disabled = function (obj, method, wrapper) {
            var orig = obj[method];
            obj[method] = function () {
                var args = Array.prototype.slice.call(arguments);
                return wrapper.apply(this, function () {
                    return orig.apply(obj, args);
                });
            };
            return obj[method];
        };
        EditorManager.prototype._intersects_ace_disabled = function (range) {
            return this.ace.getSelectionRange().intersects(range);
        };
        EditorManager.prototype._preventReadonly_ace_disabled = function (next) {
            if (this._disabled_ranges.length == 0)
                next();
            else {
                for (var i = 0; i < this._disabled_ranges.length; i++) {
                    if (this._intersects_ace_disabled(this._disabled_ranges[i]))
                        return;
                }
                next();
            }
        };
        return EditorManager;
    })();
    Editor.EditorManager = EditorManager;
})(Editor || (Editor = {}));
///<reference path="../vendor/jquery/jquery.d.ts" />
///<reference path="editor.ts" />
///<reference path="course.ts" />
var ApkiOrg;
(function (ApkiOrg) {
    var App;
    (function (App) {
        var AppMgr = (function () {
            function AppMgr() {
            }
            AppMgr.prototype.initEditor = function (langId) {
                this.editor = new Editor.EditorManager('editorTest', langId);
            };
            AppMgr.prototype.getEditor = function () {
                return this.editor;
            };
            AppMgr.prototype.helperImageCircle = function (element, imgSrc, widthAndHeight) {
                if (jQuery(element).length == 0)
                    return;
                jQuery(element).addClass('circular').css({
                    'background-image': 'url(https://images.weserv.nl/?h=' + widthAndHeight + '&w=' + widthAndHeight + '&url=' + encodeURIComponent(imgSrc.substr(imgSrc.indexOf('://') + 3)) + ')',
                    'border-radius': Math.round(widthAndHeight / 2) + 'px',
                    'width': widthAndHeight + 'px',
                    'height': widthAndHeight + 'px'
                });
            };
            AppMgr.prototype.helperObjectFromJSON = function (json_str) {
                var new_obj = JSON.parse(json_str);
                return new_obj;
            };
            AppMgr.prototype.helperObjectToJSON = function (obj) {
                return JSON.stringify(obj);
            };
            return AppMgr;
        })();
        App.AppMgr = AppMgr;
    })(App = ApkiOrg.App || (ApkiOrg.App = {}));
})(ApkiOrg || (ApkiOrg = {}));
jQuery(function () {
    apkiOrg = new ApkiOrg.App.AppMgr();
    //Layout, elements etc:
    apkiOrg.helperImageCircle('#loginImage', jQuery('#loginImage').data('src'), 35);
    var elems = jQuery('.selectpicker');
    elems.selectpicker();
    jQuery('.auto-status-removal').on('click', function () {
        $(this).removeClass('has-success has-warning has-error').find('.form-control-feedback').remove();
    });
    //    var newCommSendExercise = new Course.CommSendExercise();
    //    newCommSendExercise.code = 'Jakiś kod...';
    //    newCommSendExercise.ID = 1;
    //    newCommSendExercise.user_input = '';
    //
    //    var tekst = Course.objectToJSON<Course.CommSendExercise>(newCommSendExercise);
    //
    //    console.log(tekst);
    //    var tekst = '{"code":"Jakiś kod...","ID":1,"user_input":""}';
    //
    //    var newCommSendExercise = Course.objectFromJSON<Course.CommSendExercise>(tekst);
    //    console.log(newCommSendExercise);
    //    var c = new ApkiOrg.CourseMgr.Course();
    //    c.ID = 1;
    //    c.title = 'Halo halo!';
    //    c.lessonsPassed = [1, 2, 3];
    //    c.lessonCurrent = 1;
    //
    //    c.lessons = new Array();
    //    var newLess = new ApkiOrg.CourseMgr.Lesson();
    //    newLess.achievement = null;
    //    newLess.article = '<h1>HWDP JP 100%!</h1>';
    //    newLess.ID = 0;
    //    newLess.quizzes=[];
    //    newLess.exercises = new Array();
    //
    //    var newExecrise = new ApkiOrg.CourseMgr.Exercise();
    //    newExecrise.ID=777;
    //    newExecrise.content_of_exercise='Zrób coś!';
    //    newExecrise.lang = 'javascript';
    //    newExecrise.code='heheheh';
    //    newExecrise.code_locks = new Array();
    //
    //    var newAch = new ApkiOrg.CourseMgr.Achivement();
    //    newAch.ID=1;
    //    newAch.title='Heheszki';
    //    newAch.points=100;
    //
    //    newExecrise.achievement = newAch;
    //    newLess.exercises.push(newExecrise);
    //    c.lessons.push(newLess);
    //
    //    var tekst = apkiOrg.helperObjectToJSON<ApkiOrg.CourseMgr.Course>(c);
    //
    //    console.log(tekst);
    //
    //    var newC = apkiOrg.helperObjectFromJSON<ApkiOrg.CourseMgr.Course>(tekst);
    //
    //    console.log(newC);
});
/// <reference path="../vendor/jquery/jquery.d.ts"/>
/// <reference path="../vendor/angularjs/angular.d.ts"/>
/// <reference path="../vendor/angularjs/angular-route.d.ts"/>
//# sourceMappingURL=app.js.map