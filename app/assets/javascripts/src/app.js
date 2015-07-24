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
                this.title = '';
                this.article = '';
                this.exercisesPassed = new Array();
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
         * Model: Exercise - quiz sending.
         */
        var MCommSendExercise = (function () {
            function MCommSendExercise() {
            }
            return MCommSendExercise;
        })();
        CourseMgr.MCommSendExercise = MCommSendExercise;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Base class for Rest API. Contains some helpers.
         */
        var BaseRestAPI = (function () {
            function BaseRestAPI() {
            }
            /**
             * This will prepare data from backend to frontend use (for example will expose id). Use it like this: 'transformResponse':(data, headersGetter) => { return this.transformFromBackEndToFrontEnd(data, headersGetter, true); } or simply 'transformResponse':this.transformFromBackEndToFrontEnd .
             * @param any data Original data parameter.
             * @param any headersGetter Original data parameter.
             * @param boolean isArr Optional (defaults to false). Pass true if response in an array.
             * @return {*} Prepared data.
             */
            BaseRestAPI.prototype.transformFromBackEndToFrontEnd = function (data, headersGetter, isArr) {
                if (isArr === void 0) { isArr = false; }
                data = angular.fromJson(data);
                if (isArr) {
                    //Reassigned ID:
                    $.each(data, function (i, el) {
                        data[i].id = data[i].id.$oid;
                    });
                }
                else {
                    data.id = data.id.$oid; //Reassigned ID
                }
                return data;
            };
            return BaseRestAPI;
        })();
        CourseMgr.BaseRestAPI = BaseRestAPI;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="base_rest_api.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Resource [REST API]: Course.
         */
        var CourseRestAPI = (function (_super) {
            __extends(CourseRestAPI, _super);
            function CourseRestAPI($resource) {
                var _this = this;
                _super.call(this);
                this.$resource = $resource;
                this.res = $resource('/course/course_data/:id.json', {}, {
                    //Definition of RESTful API:
                    'list': {
                        'method': 'GET',
                        'url': '/course/course_data.json',
                        isArray: true,
                        'transformResponse': function (data, headersGetter) { return _this.transformFromBackEndToFrontEnd(data, headersGetter, true); }
                    },
                    'show': {
                        'method': 'GET',
                        'transformResponse': function (data, headersGetter) { return _this.transformFromBackEndToFrontEnd(data, headersGetter, false); }
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
        })(CourseMgr.BaseRestAPI);
        CourseMgr.CourseRestAPI = CourseRestAPI;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="base_rest_api.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        var LessonRestAPI = (function (_super) {
            __extends(LessonRestAPI, _super);
            function LessonRestAPI($resource) {
                var _this = this;
                _super.call(this);
                this.$resource = $resource;
                this.res = $resource('/course/lessons/:id.json', {}, {
                    //Definition of RESTful API:
                    'list': {
                        'method': 'GET',
                        'url': '/course/lessons.json',
                        isArray: true,
                        'transformResponse': function (data, headersGetter) { return _this.transformFromBackEndToFrontEnd(data, headersGetter, true); }
                    },
                    'show': {
                        'method': 'GET'
                    },
                    'create': {
                        'method': 'POST',
                        'url': '/course/lessons.json',
                        'transformResponse': function (data, headersGetter) { return _this.transformFromBackEndToFrontEnd(data, headersGetter, false); }
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
        })(CourseMgr.BaseRestAPI);
        CourseMgr.LessonRestAPI = LessonRestAPI;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="base_rest_api.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        var QuizzesRestAPI = (function (_super) {
            __extends(QuizzesRestAPI, _super);
            function QuizzesRestAPI($resource) {
                var _this = this;
                _super.call(this);
                this.$resource = $resource;
                this.res = $resource('/course/quizzes/:id.json', {}, {
                    //Definition of RESTful API:
                    'list': {
                        'method': 'GET',
                        'url': '/course/quizzes.json',
                        isArray: true,
                        'transformResponse': function (data, headersGetter) { return _this.transformFromBackEndToFrontEnd(data, headersGetter, true); }
                    },
                    'show': {
                        'method': 'GET'
                    },
                    'create': {
                        'method': 'POST',
                        'url': '/course/quizzes.json'
                    },
                    'update': {
                        'method': 'PUT'
                    },
                    'delete': {
                        'method': 'DELETE'
                    }
                });
            }
            return QuizzesRestAPI;
        })(CourseMgr.BaseRestAPI);
        CourseMgr.QuizzesRestAPI = QuizzesRestAPI;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="base_rest_api.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        var ExercisesRestAPI = (function (_super) {
            __extends(ExercisesRestAPI, _super);
            function ExercisesRestAPI($resource) {
                var _this = this;
                _super.call(this);
                this.$resource = $resource;
                this.res = $resource('/course/exercises/:id.json', {}, {
                    //Definition of RESTful API:
                    'list': {
                        'method': 'GET',
                        'url': '/course/exercises.json',
                        isArray: true,
                        'transformResponse': function (data, headersGetter) { return _this.transformFromBackEndToFrontEnd(data, headersGetter, true); }
                    },
                    'show': {
                        'method': 'GET'
                    },
                    'create': {
                        'method': 'POST',
                        'url': '/course/exercises.json'
                    },
                    'update': {
                        'method': 'PUT'
                    },
                    'delete': {
                        'method': 'DELETE'
                    }
                });
            }
            return ExercisesRestAPI;
        })(CourseMgr.BaseRestAPI);
        CourseMgr.ExercisesRestAPI = ExercisesRestAPI;
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
        var CheckQuizRestAPI = (function () {
            function CheckQuizRestAPI($resource) {
                this.$resource = $resource;
                this.res = $resource('/course/user_courses/check_quizzes.json', {}, {
                    //Definition of RESTful API:
                    'check': {
                        'method': 'POST'
                    }
                });
            }
            return CheckQuizRestAPI;
        })();
        CourseMgr.CheckQuizRestAPI = CheckQuizRestAPI;
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
        var CheckExerciseRestAPI = (function () {
            function CheckExerciseRestAPI($resource) {
                this.$resource = $resource;
                this.res = $resource('/course/user_courses/check_exercise.json', {}, {
                    //Definition of RESTful API:
                    'check': {
                        'method': 'POST'
                    }
                });
            }
            return CheckExerciseRestAPI;
        })();
        CourseMgr.CheckExerciseRestAPI = CheckExerciseRestAPI;
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
            this.ace.setTheme("ace/theme/chrome");
            this.ace.getSession().setMode("ace/mode/" + langId);
            this.ace.$blockScrolling = Infinity;
        }
        EditorManager.prototype.getCode = function () {
            return this.ace.getValue();
        };
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
//(c) Jakub Krol 2015
/// <reference path="../models/code_lock_coord_model.ts" />
/// <reference path="../models/base_course_model.ts" />
/// <reference path="../models/achievement_model.ts" />
/// <reference path="../models/course_model.ts" />
/// <reference path="../models/exercise_model.ts" />
/// <reference path="../models/lesson_model.ts" />
/// <reference path="../models/quiz_model.ts" />
/// <reference path="../models/comm_send_quiz.ts" />
/// <reference path="../models/comm_send_exercise.ts" />
/// <reference path="../../vendor/angularjs/angular.d.ts"/>
/// <reference path="../resources/course_rest_api.ts"/>
/// <reference path="../resources/lesson_rest_api.ts"/>
/// <reference path="../resources/quizzes_rest_api.ts"/>
/// <reference path="../resources/exercises_rest_api.ts"/>
/// <reference path="../resources/check_quiz_rest_api.ts"/>
/// <reference path="../resources/check_exercise_rest_api.ts"/>
/// <reference path="../../vendor/custom.d.ts"/>
/// <reference path="../main.ts"/>
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
                    $('#quizForm input:checked').each(function (i, el) {
                        _quiz.quizzes[$(el).data('quiz-id')] = parseInt($(el).val());
                    });
                    var _quiz_str = ApkiOrg.App.app.helperObjectToJSON(_quiz);
                    var $QuizCtrl = new CourseMgr.CheckQuizRestAPI($resource);
                    $QuizCtrl.res.check({}, _quiz_str, function (ans) {
                        $.each(ans.quizzes, function (i, el) {
                            $('.q-' + i).removeClass('has-success has-warning has-error').addClass(el ? 'has-success' : 'has-error');
                            $('.q-' + i).find('.field-value').next('.help-block').remove();
                            $('.q-' + i).find('.field-value').after('<div class="help-block">' + (el ? 'Odpowiedź poprawna.' : 'Niepoprawna odpowiedź.') + '</div>');
                        });
                        $scope.quizzesAreCorrect = ans.is_correct;
                        $scope.quizChecking = false;
                    });
                };
                $scope.checkExercise = function (element, $event) {
                    $scope.exerciseChecking = true;
                    $scope.exerciseCurrOutput = '<div class="has-spinner active text-center"><span class="spinner"><i class="glyphicon spinning glyphicon-refresh"></i></span></div>';
                    var _exerc = new CourseMgr.MCommSendExercise();
                    _exerc.id = $scope.getExercise().id;
                    _exerc.user_input = $('#codeUserInput').val();
                    _exerc.code = ApkiOrg.App.app.getEditor().getCode();
                    var _exerc_str = ApkiOrg.App.app.helperObjectToJSON(_exerc);
                    var $ExercCtrl = new CourseMgr.CheckExerciseRestAPI($resource);
                    $ExercCtrl.res.check({}, _exerc_str, function (ans) {
                        $scope.exerciseCurrOutput = ans.output.output_html;
                        $scope.exerciseIsCorrect = ans.is_correct;
                        $scope.exerciseChecking = false;
                    }, function () {
                        $scope.exerciseCurrOutput = '<div class="alert alert-danger" role="alert"><b>Błąd!</b> Przepraszamy, serwer w tej chwili nie odpowiada, spróbuj ponownie lub skontaktuj się z nami.</div>';
                        $scope.exerciseIsCorrect = false;
                        $scope.exerciseChecking = false;
                    });
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
                        $scope.quizzesAreCorrect = false;
                        $scope.toBeInited = {
                            'course': false,
                            'lessons': false
                        };
                        $scope.currPart = 'article';
                        $(window).resize($scope.resizeElements);
                        $scope.apiCourse = new CourseMgr.CourseRestAPI($resource);
                        $scope.apiLesson = new CourseMgr.LessonRestAPI($resource);
                        $scope.apiQuizzes = new CourseMgr.QuizzesRestAPI($resource);
                        $scope.apiExercises = new CourseMgr.ExercisesRestAPI($resource);
                        $scope.course = $scope.apiCourse.res.show({ 'id': $scope.courseId }, '', function (data) { $scope.checkIsLoaded(data, 'course', $scope.loadLesson); });
                        $scope.lessons = $scope.apiLesson.res.list({ 'course_id': $scope.courseId }, '', function (data) { $scope.checkIsLoaded(data, 'lessons', $scope.loadLesson); });
                    };
                    $timeout(_f, 1, false);
                };
                /**
                 * This will create course object, init rest of app and set application as initialized.
                 * Private.
                 */
                $scope.buildCourse = function () {
                    if ($scope.inited)
                        return;
                    $scope.parseArticle();
                    $scope.inited = true;
                    $scope.resizeElements();
                };
                /**
                 * This will create course object, init rest of app and set application as initialized.
                 * Private.
                 * @param any data Data from JSON
                 * @param string elId Element to be inited id
                 * @param function clbOnFinish Callback to run when all is inited.
                 */
                $scope.checkIsLoaded = function (data, elId, clbOnFinish) {
                    $scope.toBeInited[elId] = true;
                    var _inited = true;
                    $($scope.toBeInited).each(function (i, el) {
                        if (!el)
                            _inited = false;
                    });
                    if (_inited) {
                        clbOnFinish();
                    }
                };
                $scope.loadLesson = function () {
                    $scope.inited = false;
                    $scope.toBeInited = {
                        'quizzes': false,
                        'exercises': false
                    };
                    $scope.exerciseCurrOutput = 'Tutaj pojawi się wynik Twojego programu lub ewentualne błędy.<br>Kliknij "Sprawdź" aby wykonać kod.';
                    $scope.exerciseIsCorrect = false;
                    $scope.quizzes = $scope.apiQuizzes.res.list({ 'lesson_id': $scope.getLesson().id }, '', function (data) { $scope.checkIsLoaded(data, 'quizzes', $scope.buildCourse); });
                    $scope.exercises = $scope.apiExercises.res.list({ 'lesson_id': $scope.getLesson().id }, '', function (data) { $scope.checkIsLoaded(data, 'exercises', $scope.buildCourse); });
                };
                /**
                 * Gets current lesson.
                 * @return Lesson Current lesson or null if all finished
                 */
                $scope.getLesson = function () {
                    if ($scope.course.data.lessonCurrent == "")
                        $scope.course.data.lessonCurrent = $scope.lessons[0].id;
                    var _less = null;
                    $.each($scope.lessons, function (i, el) {
                        if (el.id == $scope.course.data.lessonCurrent) {
                            _less = el;
                            return false; //Break
                        }
                    });
                    return _less;
                };
                /**
                 * Gets current exercise.
                 * @return MExercise Current exercise or null if none
                 */
                $scope.getExercise = function () {
                    var _less = $scope.getLesson();
                    if (_less === null)
                        return null;
                    var _exerc = null;
                    $.each($scope.exercises, function (i, el) {
                        if (_less.data.exercisesPassed.length == 0) {
                            _exerc = el;
                            return false; //Break
                        }
                        if (el.id == _less.data.exercisesPassed[_less.data.exercisesPassed.length - 1]) {
                            _exerc = el;
                            return false; //Break
                        }
                    });
                    return _exerc;
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
                        $('.code-etc-window').height($('#courseContent').height());
                        $('#editorTest').height($('#courseContent').height() - ($('.user-input-window').is(':visible') ? $('.user-input-window').height() : 0) - ($('.send-code-window').is(':visible') ? $('.send-code-window').height() : 0) - ($('.code-ok-window').is(':visible') ? $('.code-ok-window').height() : 0));
                        $('.exercise-instruction').height(Math.round($('#courseContent').height() / 2 - 1));
                        $('.exercise-console').height($('#courseContent').height() - $('.exercise-instruction').height());
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
                    possibleParts['exercise'] = (!!$scope.exercises.length);
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
/// <reference path="../../vendor/custom.d.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Directive: select picker JQuerier.
         */
        var AutoStatusRemovalDirective = (function () {
            function AutoStatusRemovalDirective($timeout) {
                //        public template = '<div>{{name}}</div>';
                this.scope = {};
                // It's important to add `link` to the prototype or you will end up with state issues.
                // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
                AutoStatusRemovalDirective.prototype.link = function (scope, element, attrs) {
                    $timeout(function (element) {
                        jQuery(element).on('click', function () {
                            $(this).removeClass('has-success has-warning has-error').find('.form-control-feedback').remove();
                        });
                    }, 0, true, element);
                };
            }
            AutoStatusRemovalDirective.Factory = function () {
                var directive = function ($timeout) {
                    return new AutoStatusRemovalDirective($timeout);
                };
                directive['$inject'] = ['$timeout'];
                return directive;
            };
            return AutoStatusRemovalDirective;
        })();
        CourseMgr.AutoStatusRemovalDirective = AutoStatusRemovalDirective;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="../../vendor/custom.d.ts"/>
/// <reference path="../main.ts"/>
/// <reference path="../controllers/course_ctrl.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        /**
         * Directive: select picker JQuerier.
         */
        var CodeEditorDirective = (function () {
            function CodeEditorDirective($timeout) {
                //        public template = '<div>{{name}}</div>';
                this.scope = false;
                // It's important to add `link` to the prototype or you will end up with state issues.
                // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
                CodeEditorDirective.prototype.link = function (scope, element, attrs) {
                    $timeout(function (element) {
                        ApkiOrg.App.app.initEditor(attrs['sourceLang']);
                        if (scope.getExercise().data.code_locks.length > 0) {
                            $.each(scope.getExercise().data.code_locks, function (i, el) {
                                ApkiOrg.App.app.getEditor().disableRange(el.rowStart, el.colStart, el.rowEnd, el.colEnd);
                            });
                        }
                    }, 0, true, element);
                };
            }
            CodeEditorDirective.Factory = function () {
                var directive = function ($timeout) {
                    return new CodeEditorDirective($timeout);
                };
                directive['$inject'] = ['$timeout'];
                return directive;
            };
            return CodeEditorDirective;
        })();
        CourseMgr.CodeEditorDirective = CodeEditorDirective;
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="../course.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        CourseMgr.ToTrustedFilter = ['$sce', function ($sce) {
                return function (text) {
                    return $sce.trustAsHtml(text);
                };
            }];
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="../course.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        var _transTable = {
            'RUBY': 'ruby',
            'JAVASCRIPT': 'javascript',
            'CSHARP': 'csharp',
            'PYTHON': 'python'
        };
        CourseMgr.ServerSourceLangToACELangFilter = ['$sce', function ($sce) {
                return function (text) {
                    return _transTable[text];
                };
            }];
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="../vendor/custom.d.ts"/>
/// <reference path="controllers/course_ctrl.ts"/>
/// <reference path="directives/select_picker_directive.ts"/>
/// <reference path="directives/auto_status_removal_directive.ts"/>
/// <reference path="directives/code_editor_directive.ts"/>
/// <reference path="filters/to_trusted_filter.ts"/>
/// <reference path="filters/server_source_lang_to_ace_lang_filter.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        //Init Angular app
        app = angular.module('courseApp', ['ngResource']);
        app.controller('myCtrl', CourseMgr.appCourseCtrl);
        app.filter('to_trusted', CourseMgr.ToTrustedFilter);
        app.filter('server_source_lang_to_ace_lang', CourseMgr.ServerSourceLangToACELangFilter);
        app.directive('selectpicker', CourseMgr.SelectPickerDirective.Factory());
        app.directive('autostatusremoval', CourseMgr.AutoStatusRemovalDirective.Factory());
        app.directive('codeeditor', CourseMgr.CodeEditorDirective.Factory());
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
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
                var _json = JSON.stringify(obj);
                return _json;
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
//(c) Jakub Krol 2015
/// <reference path="../models/code_lock_coord_model.ts" />
/// <reference path="../models/base_course_model.ts" />
/// <reference path="../models/achievement_model.ts" />
/// <reference path="../models/course_model.ts" />
/// <reference path="../models/exercise_model.ts" />
/// <reference path="../models/lesson_model.ts" />
/// <reference path="../models/quiz_model.ts" />
/// <reference path="../models/comm_send_quiz.ts" />
/// <reference path="../models/comm_send_exercise.ts" />
/// <reference path="../../vendor/angularjs/angular.d.ts"/>
/// <reference path="../resources/course_rest_api.ts"/>
/// <reference path="../resources/lesson_rest_api.ts"/>
/// <reference path="../resources/quizzes_rest_api.ts"/>
/// <reference path="../resources/exercises_rest_api.ts"/>
/// <reference path="../resources/check_quiz_rest_api.ts"/>
/// <reference path="../resources/check_exercise_rest_api.ts"/>
/// <reference path="../../vendor/custom.d.ts"/>
/// <reference path="../main.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var APanelMgr;
    (function (APanelMgr) {
        var aPanelCtrl = (function () {
            function aPanelCtrl($scope, $timeout, $compile, $resource) {
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.$compile = $compile;
                this.$resource = $resource;
                $scope.saveLesson = function () {
                    $scope.inited = false;
                    var _lesson_data_str = ApkiOrg.App.app.helperObjectToJSON($scope.currLess.data);
                    $scope.newLess = $scope.apiLesson.res.update({ 'id': $scope.currLess.id }, _lesson_data_str, function (data) {
                        $scope.inited = true;
                    });
                };
                $scope.reloadPageIfWant = function () {
                    if (confirm('Na pewno odrzucić WSZYSTKIE niezapisane zmiany na tej stronie? To w przeciwieństwie do zapisu dotyczy wszystkich miejsc w których coś zostało zmienione.')) {
                        window.location.reload();
                    }
                };
                $scope.saveCourse = function () {
                    $scope.inited = false;
                    var _course_data_str = ApkiOrg.App.app.helperObjectToJSON($scope.course.data);
                    $scope.newLess = $scope.apiCourse.res.update({ 'id': $scope.course.id }, _course_data_str, function (data) {
                        $scope.inited = true;
                    });
                };
                $scope.addNewDependecy = function () {
                    if (($scope.newDependency === null)
                        ||
                            ($scope.newDependency.id == $scope.course.id)
                        ||
                            ($scope.course.data.dependencies.indexOf($scope.newDependency.id) > -1)) {
                        alert('Nie można dodać tego kursu do zależności, sprawdź czy jest wybrany kurs, czy nie jest już w zależnościach i czy nie dodajesz kursu do samego siebie.');
                        return;
                    }
                    $scope.course.data.dependencies.push($scope.newDependency.id);
                    $scope.newDependency = null;
                };
                $scope.removeDependecy = function () {
                    if (($scope.newDependency === null)
                        ||
                            ($scope.newDependency == $scope.course.id)
                        ||
                            ($scope.course.data.dependencies.indexOf($scope.newDependency) == -1)) {
                        alert('Nie można usunąć tego kursu z zależności, sprawdź czy jest wybrany kurs, czy nie jest już usunięty z zależności i czy nie usuwasz kursu z samego siebie.');
                        return;
                    }
                    $scope.course.data.dependencies.splice($scope.course.data.dependencies.indexOf($scope.newDependency.id), 1);
                    $scope.newDependency = null;
                };
                $scope.addNewLesson = function () {
                    $scope.inited = false;
                    $scope.apiLesson.res.create({ 'course_id': $scope.courseId }, '', function (data) {
                        $scope.newLess = new ApkiOrg.CourseMgr.MLesson();
                        var _n_less_data_str = ApkiOrg.App.app.helperObjectToJSON($scope.newLess.data);
                        $scope.newLess = $scope.apiLesson.res.update({ 'id': data.id }, _n_less_data_str, function (data) {
                            $scope.lessons.push($scope.newLess);
                            $scope.newLess = null;
                            $scope.inited = true;
                        });
                    });
                };
                /**
                 * This will init Course. Required at the beginning. Called in ng-init.
                 */
                $scope.initAPanel = function () {
                    var _f = function () {
                        $scope.inited = false;
                        $scope.toBeInited = {
                            'course': false,
                            'courses': false,
                            'lessons': false
                        };
                        $scope.newDependency = null;
                        $scope.currLess = null;
                        $scope.apiCourse = new ApkiOrg.CourseMgr.CourseRestAPI($resource);
                        $scope.apiLesson = new ApkiOrg.CourseMgr.LessonRestAPI($resource);
                        $scope.apiQuizzes = new ApkiOrg.CourseMgr.QuizzesRestAPI($resource);
                        $scope.apiExercises = new ApkiOrg.CourseMgr.ExercisesRestAPI($resource);
                        $scope.course = new ApkiOrg.CourseMgr.MCourse();
                        $scope.lessons = new Array();
                        $scope.course = $scope.apiCourse.res.show({ 'id': $scope.courseId }, '', function (data) { $scope.checkIsLoaded(data, 'course', $scope.loadView); });
                        $scope.courses = $scope.apiCourse.res.list({}, '', function (data) { $scope.checkIsLoaded(data, 'courses', $scope.loadView); });
                        $scope.lessons = $scope.apiLesson.res.list({ 'course_id': $scope.courseId }, '', function (data) { $scope.checkIsLoaded(data, 'lessons', $scope.loadView); });
                    };
                    $timeout(_f, 1, false);
                };
                $scope.loadView = function () {
                    $scope.inited = true;
                };
                /**
                 * This will create course object, init rest of app and set application as initialized.
                 * Private.
                 * @param any data Data from JSON
                 * @param string elId Element to be inited id
                 * @param function clbOnFinish Callback to run when all is inited.
                 */
                $scope.checkIsLoaded = function (data, elId, clbOnFinish) {
                    $scope.toBeInited[elId] = true;
                    var _inited = true;
                    $($scope.toBeInited).each(function (i, el) {
                        if (!el)
                            _inited = false;
                    });
                    if (_inited) {
                        clbOnFinish();
                    }
                };
            }
            aPanelCtrl.$inject = [
                '$scope',
                '$timeout',
                '$compile',
                '$resource'
            ];
            return aPanelCtrl;
        })();
        APanelMgr.aPanelCtrl = aPanelCtrl;
    })(APanelMgr = ApkiOrg.APanelMgr || (ApkiOrg.APanelMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
//(c) Jakub Krol 2015
/// <reference path="../vendor/custom.d.ts"/>
/// <reference path="controllers/apanel_ctrl.ts"/>
/// <reference path="directives/select_picker_directive.ts"/>
/// <reference path="directives/auto_status_removal_directive.ts"/>
/// <reference path="directives/code_editor_directive.ts"/>
/// <reference path="filters/to_trusted_filter.ts"/>
/// <reference path="filters/server_source_lang_to_ace_lang_filter.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var APanelMgr;
    (function (APanelMgr) {
        //Init Angular app
        app = angular.module('aPanelApp', ['ngResource']);
        app.controller('myCtrl', APanelMgr.aPanelCtrl);
        app.filter('to_trusted', ApkiOrg.CourseMgr.ToTrustedFilter);
        app.filter('server_source_lang_to_ace_lang', ApkiOrg.CourseMgr.ServerSourceLangToACELangFilter);
        app.directive('selectpicker', ApkiOrg.CourseMgr.SelectPickerDirective.Factory());
        app.directive('autostatusremoval', ApkiOrg.CourseMgr.AutoStatusRemovalDirective.Factory());
        app.directive('codeeditor', ApkiOrg.CourseMgr.CodeEditorDirective.Factory());
    })(APanelMgr = ApkiOrg.APanelMgr || (ApkiOrg.APanelMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
/// <reference path="../vendor/jquery/jquery.d.ts"/>
/// <reference path="../vendor/angularjs/angular.d.ts"/>
/// <reference path="../vendor/angularjs/angular-route.d.ts"/>
//# sourceMappingURL=app.js.map