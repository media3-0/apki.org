//(c) Jakub Krol 2015
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Model: Code lock coordinates.
         */
        var MCodeLockCoord = (function () {
            function MCodeLockCoord() {
            }
            return MCodeLockCoord;
        })();
        CourseMgr.MCodeLockCoord = MCodeLockCoord;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Model: Basic model for course-based REST stuff. Not to be used directly.
         */
        var MBase = (function () {
            function MBase() {
            }
            return MBase;
        })();
        CourseMgr.MBase = MBase;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Model: Achievement.
         */
        var MAchievement = (function () {
            function MAchievement() {
            }
            return MAchievement;
        })();
        CourseMgr.MAchievement = MAchievement;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="base_course_model.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Model: Course.
         */
        var MCourse = (function (_super) {
            __extends(MCourse, _super);
            function MCourse() {
                _super.call(this);
                this.data = new MCourseData();
            }
            return MCourse;
        })(CourseMgr.MBase);
        CourseMgr.MCourse = MCourse;
        /**
         * Helper model: Course data.
         */
        var MCourseData = (function () {
            function MCourseData() {
                this.lessonsPassed = new Array();
                this.dependencies = new Array();
            }
            return MCourseData;
        })();
        CourseMgr.MCourseData = MCourseData;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="base_course_model.ts"/>
/// <reference path="code_lock_coord_model.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Model: Exercise.
         */
        var MExercise = (function (_super) {
            __extends(MExercise, _super);
            function MExercise() {
                _super.call(this);
                this.data = new MExerciseData();
            }
            return MExercise;
        })(CourseMgr.MBase);
        CourseMgr.MExercise = MExercise;
        /**
         * Helper model: Exercise data.
         */
        var MExerciseData = (function () {
            function MExerciseData() {
                this.code_locks = new Array();
            }
            return MExerciseData;
        })();
        CourseMgr.MExerciseData = MExerciseData;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="base_course_model.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Model: Lesson.
         */
        var MLesson = (function (_super) {
            __extends(MLesson, _super);
            function MLesson() {
                _super.call(this);
                this.data = new MLessonData();
            }
            return MLesson;
        })(CourseMgr.MBase);
        CourseMgr.MLesson = MLesson;
        /**
         * Helper model: Lesson data.
         */
        var MLessonData = (function () {
            function MLessonData() {
            }
            return MLessonData;
        })();
        CourseMgr.MLessonData = MLessonData;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="base_course_model.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Model: Quiz.
         */
        var MQuiz = (function (_super) {
            __extends(MQuiz, _super);
            function MQuiz() {
                _super.call(this);
                this.data = new MQuizData();
            }
            return MQuiz;
        })(CourseMgr.MBase);
        CourseMgr.MQuiz = MQuiz;
        /**
         * Helper model: Quiz data.
         */
        var MQuizData = (function () {
            function MQuizData() {
                this.answers = new Array();
            }
            return MQuizData;
        })();
        CourseMgr.MQuizData = MQuizData;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Model: Communication - quiz sending.
         */
        var MCommSendQuiz = (function () {
            function MCommSendQuiz() {
                this.quizzes = {};
            }
            return MCommSendQuiz;
        })();
        CourseMgr.MCommSendQuiz = MCommSendQuiz;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Resource [REST API]: Course.
         */
        var CourseRestAPI = (function () {
            function CourseRestAPI($resource) {
                this.$resource = $resource;
                this.res = $resource('/course/course_data/:id.json', {}, {
                    //Definition of RESTful API:
                    'list': {
                        'method': 'GET',
                        'url': '/course/course_data.json',
                        isArray: true
                    },
                    'show': {
                        'method': 'GET'
                    },
                    'create': {
                        'method': 'POST',
                        'url': '/course/course_data.json'
                    },
                    'update': {
                        'method': 'PUT'
                    },
                    'delete': {
                        'method': 'DELETE'
                    }
                });
            }
            return CourseRestAPI;
        })();
        CourseMgr.CourseRestAPI = CourseRestAPI;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        var LessonRestAPI = (function () {
            function LessonRestAPI($resource) {
                this.$resource = $resource;
                this.res = $resource('/course/lessons/:id.json', {}, {
                    //Definition of RESTful API:
                    'list': {
                        'method': 'GET',
                        'url': '/course/lessons.json',
                        isArray: true
                    },
                    'show': {
                        'method': 'GET'
                    },
                    'create': {
                        'method': 'POST',
                        'url': '/course/lessons.json'
                    },
                    'update': {
                        'method': 'PUT'
                    },
                    'delete': {
                        'method': 'DELETE'
                    }
                });
            }
            return LessonRestAPI;
        })();
        CourseMgr.LessonRestAPI = LessonRestAPI;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Resource [REST API]: Quiz.
         */
        var QuizRestAPI = (function () {
            function QuizRestAPI($resource) {
                this.$resource = $resource;
                this.res = $resource('/course/user_courses/check_quizzes.json', {}, {
                    //Definition of RESTful API:
                    'check': {
                        'method': 'POST'
                    }
                });
            }
            return QuizRestAPI;
        })();
        CourseMgr.QuizRestAPI = QuizRestAPI;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="../models/code_lock_coord_model.ts" />
/// <reference path="../models/base_course_model.ts" />
/// <reference path="../models/achievement_model.ts" />
/// <reference path="../models/course_model.ts" />
/// <reference path="../models/exercise_model.ts" />
/// <reference path="../models/lesson_model.ts" />
/// <reference path="../models/quiz_model.ts" />
/// <reference path="../models/comm_send_quiz.ts" />
/// <reference path="../../vendor/angularjs/angular.d.ts"/>
/// <reference path="../resources/course_rest_api.ts"/>
/// <reference path="../resources/lesson_rest_api.ts"/>
/// <reference path="../resources/quiz_rest_api.ts"/>
/// <reference path="../../vendor/custom.d.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        var appCourseCtrl = (function () {
            function appCourseCtrl($scope, $timeout, $compile, $resource) {
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.$compile = $compile;
                this.$resource = $resource;
                $scope.checkQuiz = function (element, $event) {
                    $scope.quizChecking = true;
                    var _quiz = new CourseMgr.MCommSendQuiz();
                    _quiz.id = $scope.getLesson().id;
                    _quiz.quizzes['55a512ef416d6927dc00000a'] = 8;
                    _quiz.quizzes['55a512f0416d6927dc00000b'] = 0;
                    console.log(_quiz);
                    var _quiz_str = ApkiOrg.App.app.helperObjectToJSON(_quiz);
                    console.log(_quiz_str);
                    var $QuizCtrl = new CourseMgr.QuizRestAPI($resource);
                    $QuizCtrl.res.check({}, _quiz_str, function (ans) {
                        console.log(ans);
                    });
                    $scope.quizChecking = false;
                };
                /**
                 * Hold are menus visible
                 * @type {{left: boolean, bottom: boolean}}
                 */
                $scope.menuVisible = { 'left': true, 'bottom': true };
                /**
                 * This will init Course. Required at the beginning. Called in ng-init.
                 */
                $scope.initCourse = function () {
                    var _f = function () {
                        $scope.inited = false;
                        $scope.toBeInited = {
                            'course': false,
                            'lessons': false
                        };
                        $scope.currPart = 'article';
                        $(window).resize($scope.resizeElements);
                        $scope.apiCourse = new CourseMgr.CourseRestAPI($resource);
                        $scope.apiLesson = new CourseMgr.LessonRestAPI($resource);
                        $scope.course = $scope.apiCourse.res.show({ 'id': $scope.courseId }, '', function (data) { $scope.checkCourseLoaded(data, 'course'); });
                        $scope.lessons = $scope.apiLesson.res.list({ 'course_id': $scope.courseId }, '', function (data) { $scope.checkCourseLoaded(data, 'lessons'); });
                    };
                    $timeout(_f, 1, false);
                };
                /**
                 * This will create course object, init rest of app and set application as initialized.
                 * Private.
                 */
                $scope.buildCourse = function () {
                    $scope.parseArticle();
                    $scope.inited = true;
                    $scope.resizeElements();
                };
                /**
                 * This will create course object, init rest of app and set application as initialized.
                 * Private.
                 * @param any data Data from JSON
                 * @param string elId Element to be inited id
                 */
                $scope.checkCourseLoaded = function (data, elId) {
                    $scope.toBeInited[elId] = true;
                    var _inited = true;
                    $($scope.toBeInited).each(function (i, el) {
                        if (!el)
                            _inited = false;
                    });
                    if (_inited)
                        $scope.buildCourse();
                };
                /**
                 * Gets current lesson.
                 * @return Lesson Current lesson or null if all finished
                 */
                $scope.getLesson = function () {
                    if ($scope.course.data.lessonCurrent >= $scope.lessons.length)
                        return null;
                    else
                        return $scope.lessons[$scope.course.data.lessonCurrent];
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
                    $timeout(function () {
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
                            $('#courseLessonMenu').find('ul.article-parsed').append('<li><i class="glyphicon ' + this.ico + '"></i> <a href="' + this.anchor + '" ng-click="goToPart(\'article\')">' + this.title + '</a></li>');
                        });
                        $compile($('#courseLessonMenu').find('ul.article-parsed'))($scope);
                    }, 1, false);
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
                    var possibleParts = [];
                    possibleParts['article'] = true; //always enabled
                    possibleParts['end'] = true; //always enabled
                    possibleParts['quiz'] = (!!$scope.quizzes.length);
                    possibleParts['exercise'] = (!!$scope.quizzes.length);
                    var path = ['article', 'quiz', 'exercise', 'end'];
                    if (!possibleParts[part])
                        part = path[path.indexOf(part) + 1];
                    $scope.currPart = part;
                };
            }
            appCourseCtrl.$inject = [
                '$scope',
                '$timeout',
                '$compile',
                '$resource'
            ];
            return appCourseCtrl;
        })();
        CourseMgr.appCourseCtrl = appCourseCtrl;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="../../vendor/custom.d.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Directive: select picker JQuerier.
         */
        var SelectPickerDirective = (function () {
            function SelectPickerDirective($timeout) {
                //        public template = '<div>{{name}}</div>';
                this.scope = {};
                // It's important to add `link` to the prototype or you will end up with state issues.
                // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
                SelectPickerDirective.prototype.link = function (scope, element, attrs) {
                    $timeout(function (element) {
                        $(element).selectpicker();
                    }, 0, true, element);
                };
            }
            SelectPickerDirective.Factory = function () {
                var directive = function ($timeout) {
                    return new SelectPickerDirective($timeout);
                };
                directive['$inject'] = ['$timeout'];
                return directive;
            };
            return SelectPickerDirective;
        })();
        CourseMgr.SelectPickerDirective = SelectPickerDirective;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="../vendor/custom.d.ts"/>
/// <reference path="controllers/course_ctrl.ts"/>
/// <reference path="directives/select_picker_directive.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        //Init Angular app
        app = angular.module('courseApp', ['ngResource']);
        app.controller('myCtrl', CourseMgr.appCourseCtrl);
        app.filter('to_trusted', ['$sce', function ($sce) {
                return function (text) {
                    return $sce.trustAsHtml(text);
                };
            }]);
        app.directive('selectpicker', CourseMgr.SelectPickerDirective.Factory());
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
        App.app;
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
    ApkiOrg.App.app = new ApkiOrg.App.AppMgr();
    //Layout, elements etc:
    ApkiOrg.App.app.helperImageCircle('#loginImage', jQuery('#loginImage').data('src'), 35);
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