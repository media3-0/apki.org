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
                this.fullName = - > ();
                $scope.firstName = "John";
                $scope.lastName = "Doe";
            }
            myCtrl.$inject = [
                '$scope'
            ];
            return myCtrl;
        })();
        CourseMgr.myCtrl = myCtrl;
        {
            return this.$scope.firstName + " " + this.$scope.lastName;
        }
    })(CourseMgr = ApkiOrg.CourseMgr || (ApkiOrg.CourseMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
app = angular.module('myApp', []);
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