//(c) Jakub Krol 2015
/// <reference path="course_interface.ts" />
/// <reference path="../vendor/angularjs/angular.d.ts"/>
/// <reference path="../vendor/angularjs/angular-route.d.ts"/>
var ApkiOrg;
(function (ApkiOrg) {
    var CourseMgr;
    (function (CourseMgr) {
        var AngularConfig = (function () {
            function AngularConfig($routeProvider) {
                $routeProvider.when("/list", {
                    templateUrl: "App/Templates/VideoList.html",
                    controller: "TechVidsListCtrl"
                })
                    .when("/list/:id", {
                    templateUrl: "App/Templates/VideoList.html",
                    controller: "TechVidsListCtrl"
                })
                    .when("/add", {
                    templateUrl: "App/Templates/AddVideo.html",
                    controller: "AddTechVideoCtrl"
                })
                    .when("/edit/:id", {
                    templateUrl: "App/Templates/EditVideo.html",
                    controller: "EditTechVideoCtrl"
                })
                    .otherwise({
                    redirectTo: '/list'
                });
            }
            return AngularConfig;
        })();
        var AngularFactory = (function () {
            function AngularFactory() {
                //Logic of constructor
            }
            AngularFactory.prototype.method1 = ;
            return AngularFactory;
        })();
        return -type;
        {
        }
        ;
        MyClassFactory();
        {
            return new MyClass();
        }
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
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
var CommSendAchievement = (function () {
    function CommSendAchievement() {
    }
    return CommSendAchievement;
})();
exports.CommSendAchievement = CommSendAchievement;
//# sourceMappingURL=course.js.map