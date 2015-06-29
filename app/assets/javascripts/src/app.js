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
            function myCtrl($scope) {
                this.$scope = $scope;
                $scope.firstName = "John";
                $scope.lastName = "Doe";
                $scope.fullName = function () {
                    return $scope.firstName + " " + $scope.lastName;
                };
            }
            myCtrl.$inject = [
                '$scope'
            ];
            return myCtrl;
        })();
        CourseMgr.myCtrl = myCtrl;
        app = angular.module('myApp', []);
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