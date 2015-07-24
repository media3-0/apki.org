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

declare var app:any;

module ApkiOrg.APanelMgr {
    /**
     * Controller: This is main Angular controller for course front.
     */
    export interface IAppCtrlScope extends ng.IScope {
        course:ApkiOrg.CourseMgr.MCourse;
        courses:ApkiOrg.CourseMgr.MCourse[];
        lessons:ApkiOrg.CourseMgr.MLesson[];
        quizzes:ApkiOrg.CourseMgr.MQuiz[];
        exercises:ApkiOrg.CourseMgr.MExercise[];
        apiCourse:ApkiOrg.CourseMgr.CourseRestAPI;
        apiLesson:ApkiOrg.CourseMgr.LessonRestAPI;
        apiQuizzes:ApkiOrg.CourseMgr.QuizzesRestAPI;
        apiExercises:ApkiOrg.CourseMgr.ExercisesRestAPI;
        inited:boolean;
        toBeInited:{};
        courseId:string;
        addingNew:boolean;
        newDependency:any; //ApkiOrg.CourseMgr.MCourse or int
        currLess:ApkiOrg.CourseMgr.MLesson;
        newLess:ApkiOrg.CourseMgr.MLesson;

        initAPanel()
        checkIsLoaded(data:any, elId:string, clbOnFinish:() => any)
        loadView()
        addNewDependecy()
        removeDependecy()
        addNewLesson()
        saveCourse()
        reloadPageIfWant()
        saveLesson()
    }

    export class aPanelCtrl {
        public static $inject = [
            '$scope',
            '$timeout',
            '$compile',
            '$resource'
        ];
        constructor(private $scope: IAppCtrlScope, private $timeout: ng.ITimeoutService, private $compile:ng.ICompileService, private $resource:any) {

            $scope.saveLesson = () => {
                $scope.inited = false;
                var _lesson_data_str:string = ApkiOrg.App.app.helperObjectToJSON($scope.currLess.data);

                $scope.newLess = $scope.apiLesson.res.update({'id':$scope.currLess.id}, _lesson_data_str, (data) => {
                    $scope.inited = true;
                });
            }

            $scope.reloadPageIfWant = () => {
                if (confirm('Na pewno odrzucić WSZYSTKIE niezapisane zmiany na tej stronie? To w przeciwieństwie do zapisu dotyczy wszystkich miejsc w których coś zostało zmienione.')) {
                    window.location.reload();
                }
            }

            $scope.saveCourse = () => {
                $scope.inited = false;
                var _course_data_str:string = ApkiOrg.App.app.helperObjectToJSON($scope.course.data);

                $scope.newLess = $scope.apiCourse.res.update({'id':$scope.course.id}, _course_data_str, (data) => {
                    $scope.inited = true;
                });
            }

            $scope.addNewDependecy = () => {
                if (
                    ($scope.newDependency===null)
                        ||
                        ($scope.newDependency.id == $scope.course.id)
                        ||
                        ($scope.course.data.dependencies.indexOf($scope.newDependency.id)>-1)
                    ){
                    alert('Nie można dodać tego kursu do zależności, sprawdź czy jest wybrany kurs, czy nie jest już w zależnościach i czy nie dodajesz kursu do samego siebie.');
                    return;
                }

                $scope.course.data.dependencies.push($scope.newDependency.id);

                $scope.newDependency = null;
            }

            $scope.removeDependecy = () => {
                if (
                    ($scope.newDependency===null)
                        ||
                        ($scope.newDependency == $scope.course.id)
                        ||
                        ($scope.course.data.dependencies.indexOf($scope.newDependency)==-1)
                    ){
                    alert('Nie można usunąć tego kursu z zależności, sprawdź czy jest wybrany kurs, czy nie jest już usunięty z zależności i czy nie usuwasz kursu z samego siebie.');
                    return;
                }

                $scope.course.data.dependencies.splice($scope.course.data.dependencies.indexOf($scope.newDependency.id), 1);

                $scope.newDependency = null;
            }

            $scope.addNewLesson = () => {
                $scope.inited = false;
                $scope.apiLesson.res.create({'course_id':$scope.courseId}, '', (data) => {
                    $scope.newLess = new ApkiOrg.CourseMgr.MLesson();

                    var _n_less_data_str:string = ApkiOrg.App.app.helperObjectToJSON($scope.newLess.data);

                    $scope.newLess = $scope.apiLesson.res.update({'id':data.id}, _n_less_data_str, (data) => {
                        $scope.lessons.push($scope.newLess);
                        $scope.newLess=null;
                        $scope.inited = true;
                    });
                })
            }

            /**
             * This will init Course. Required at the beginning. Called in ng-init.
             */
            $scope.initAPanel = () => {
                var _f = () => {
                    $scope.inited = false;

                    $scope.toBeInited = {
                        'course':false,
                        'courses':false,
                        'lessons':false
                    };

                    $scope.newDependency=null;
                    $scope.currLess=null;

                    $scope.apiCourse = new ApkiOrg.CourseMgr.CourseRestAPI($resource);
                    $scope.apiLesson = new ApkiOrg.CourseMgr.LessonRestAPI($resource);
                    $scope.apiQuizzes = new ApkiOrg.CourseMgr.QuizzesRestAPI($resource);
                    $scope.apiExercises = new ApkiOrg.CourseMgr.ExercisesRestAPI($resource);

                    $scope.course = new ApkiOrg.CourseMgr.MCourse();
                    $scope.lessons = new Array();

                    $scope.course = $scope.apiCourse.res.show({'id':$scope.courseId}, '', (data) => { $scope.checkIsLoaded(data, 'course', $scope.loadView) });
                    $scope.courses = $scope.apiCourse.res.list({}, '', (data) => { $scope.checkIsLoaded(data, 'courses', $scope.loadView) });
                    $scope.lessons = $scope.apiLesson.res.list({'course_id':$scope.courseId}, '', (data) => { $scope.checkIsLoaded(data, 'lessons', $scope.loadView) });
                }
                $timeout(_f, 1, false);
            }

            $scope.loadView = () => {


                $scope.inited=true;
            }

            /**
             * This will create course object, init rest of app and set application as initialized.
             * Private.
             * @param any data Data from JSON
             * @param string elId Element to be inited id
             * @param function clbOnFinish Callback to run when all is inited.
             */
            $scope.checkIsLoaded = (data:any, elId:string, clbOnFinish:() => any) => {
                $scope.toBeInited[elId]=true;

                var _inited:boolean=true;
                $($scope.toBeInited).each((i, el) => {
                    if (!el)
                        _inited=false;
                });

                if (_inited){
                    clbOnFinish();
                }
            }

        }
    }
}