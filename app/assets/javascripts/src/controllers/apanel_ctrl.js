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
        /;
        initAPanel();
        checkIsLoaded(data, any, elId, string, clbOnFinish, function () { return any; });
        loadView();
        addNewDependecy();
        removeDependecy();
        addNewLesson();
        saveCourse();
        reloadPageIfWant();
        saveLesson();
        getScope();
        test(s, string);
        setCurrLess();
        removeQuizAns(quiz, ApkiOrg.CourseMgr.MQuiz, index, number);
        addQuizAns(quiz, ApkiOrg.CourseMgr.MQuiz);
        parseInt(num, string);
        standardSaveObject(object, any, resource, any, id, string);
        saveQuiz(quiz, ApkiOrg.CourseMgr.MQuiz);
        addNewQuiz();
        removeCodeLock(exerc, ApkiOrg.CourseMgr.MExercise, index, number);
        addCodeLock(exerc, ApkiOrg.CourseMgr.MExercise);
        saveExercise(exerc, ApkiOrg.CourseMgr.MExercise);
        addNewExercise();
        achievementEditor(desc, string, id_query_name, string, id, string);
    })(APanelMgr = ApkiOrg.APanelMgr || (ApkiOrg.APanelMgr = {}));
})(ApkiOrg || (ApkiOrg = {}));
var aPanelCtrl = (function () {
    function aPanelCtrl($scope, $timeout, $compile, $resource) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.$resource = $resource;
        $scope.achievementEditor = function (desc, id_query_name, id) {
            console.log(desc);
            console.log(id_query_name);
            console.log(id);
        };
        $scope.addNewQuiz = function () {
            $scope.inited = false;
            $scope.apiQuizzes.res.create({ 'lesson_id': $scope.currLess.id }, '', function (data) {
                $scope.newQuiz = new ApkiOrg.CourseMgr.MQuiz();
                var _n_quiz_data_str = ApkiOrg.App.app.helperObjectToJSON($scope.newQuiz.data);
                $scope.newQuiz = $scope.apiQuizzes.res.update({ 'id': data.id }, _n_quiz_data_str, function (data) {
                    $scope.quizzes.push($scope.newQuiz);
                    $scope.newQuiz = null;
                    $scope.inited = true;
                });
            });
        };
        $scope.addNewExercise = function () {
            $scope.inited = false;
            $scope.apiExercises.res.create({ 'lesson_id': $scope.currLess.id }, '', function (data) {
                $scope.newExerc = new ApkiOrg.CourseMgr.MExercise();
                var _n_exerc_data_str = ApkiOrg.App.app.helperObjectToJSON($scope.newExerc.data);
                $scope.newExerc = $scope.apiExercises.res.update({ 'id': data.id }, _n_exerc_data_str, function (data) {
                    $scope.exercises.push($scope.newExerc);
                    $scope.newExerc = null;
                    $scope.inited = true;
                });
            });
        };
        $scope.standardSaveObject = function (object, resource, id) {
            $scope.inited = false;
            var _data_str = ApkiOrg.App.app.helperObjectToJSON(object.data);
            object = resource.update({ 'id': id }, _data_str, function (data) {
                $scope.inited = true;
            });
        };
        $scope.saveLesson = function () {
            $scope.standardSaveObject($scope.currLess, $scope.apiLesson.res, $scope.currLess.id);
        };
        $scope.saveCourse = function () {
            $scope.standardSaveObject($scope.course, $scope.apiCourse.res, $scope.course.id);
        };
        $scope.saveQuiz = function (quiz) {
            $scope.standardSaveObject(quiz, $scope.apiQuizzes.res, quiz.id);
        };
        $scope.saveExercise = function (exerc) {
            $scope.standardSaveObject(exerc, $scope.apiExercises.res, exerc.id);
        };
        $scope.parseInt = function (num) {
            return parseInt(num, 10);
        };
        $scope.removeQuizAns = function (quiz, index) {
            quiz.data.answers.splice(index, 1);
        };
        $scope.addQuizAns = function (quiz) {
            quiz.data.answers.push('');
        };
        $scope.removeCodeLock = function (exerc, index) {
            exerc.data.code_locks.splice(index, 1);
            console.log(exerc.data.code_locks);
        };
        $scope.addCodeLock = function (exerc) {
            var _n_code_l = new ApkiOrg.CourseMgr.MCodeLockCoord();
            exerc.data.code_locks.push(_n_code_l);
        };
        $scope.setCurrLess = function () {
            $scope.inited = false;
            $scope.toBeInited = {
                'quizzes': false,
                'exercises': false
            };
            var _readyFunc = function () {
                $scope.inited = true;
            };
            $scope.quizzes = $scope.apiQuizzes.res.list({ 'lesson_id': $scope.currLess.id }, '', function (data) { $scope.checkIsLoaded(data, 'quizzes', _readyFunc); });
            $scope.exercises = $scope.apiExercises.res.list({ 'lesson_id': $scope.currLess.id }, '', function (data) { $scope.checkIsLoaded(data, 'exercises', _readyFunc); });
        };
        $scope.test = function (s) {
            console.log(s);
        };
        $scope.getScope = function () {
            return $scope;
        };
        $scope.reloadPageIfWant = function () {
            if (confirm('Na pewno odrzucić WSZYSTKIE niezapisane zmiany na tej stronie? To w przeciwieństwie do zapisu dotyczy wszystkich miejsc w których coś zostało zmienione.')) {
                window.location.reload();
            }
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
                $scope.currTab = 'Ustawienia kursu';
                $scope.currLessTab = 'Ustawienia i artykuł';
                $scope.achievementEditorActive = false;
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
exports.aPanelCtrl = aPanelCtrl;
//# sourceMappingURL=apanel_ctrl.js.map