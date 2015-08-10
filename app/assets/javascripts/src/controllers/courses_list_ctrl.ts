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
/// <reference path="../resources/achievements_rest_api.ts"/>
/// <reference path="../resources/check_quiz_rest_api.ts"/>
/// <reference path="../resources/check_exercise_rest_api.ts"/>
/// <reference path="../../vendor/custom.d.ts"/>
/// <reference path="../main.ts"/>

declare var app:any;

module ApkiOrg.CoursesLstMgr {
    /**
     * Controller: This is main Angular controller for course front.
     */
    export interface IAppCtrlScope extends ng.IScope {
        courses:ApkiOrg.CourseMgr.MCourse[];
        invCourse:ApkiOrg.CourseMgr.MCourse;
        apiCourse:ApkiOrg.CourseMgr.CourseRestAPI;
        inited:boolean;

        initList()
        checkCourse($event:any, course:ApkiOrg.CourseMgr.MCourse)
        _getCourseById(id:string) : ApkiOrg.CourseMgr.MCourse
    }

    export class appCoursesLstCtrl {
        public static $inject = [
            '$scope',
            '$timeout',
            '$compile',
            '$resource'
        ];
        constructor(private $scope: IAppCtrlScope, private $timeout: ng.ITimeoutService, private $compile:ng.ICompileService, private $resource:any) {

            $scope.initList = () => {
                $scope.inited = false;

                $scope.courses=new Array();

                $scope.apiCourse = new ApkiOrg.CourseMgr.CourseRestAPI($resource);

                $scope.courses = $scope.apiCourse.res.list({}, '', (data) => {
                    $scope.inited=true;
                });
            }

            $scope._getCourseById = (id:string) : ApkiOrg.CourseMgr.MCourse => {
                var _course:ApkiOrg.CourseMgr.MCourse=null;
                $.each($scope.courses, function(i, el){
                    if (el.id == id){
                        _course = el;
                        return false; //Break
                    }
                });
                return _course;
            }
            $scope.checkCourse = ($event:any, course:ApkiOrg.CourseMgr.MCourse) => {
                $.each(course.data.dependencies, function(i, el){
                    if (($scope._getCourseById(el) !== null) && (!$scope._getCourseById(el).data.userFinished)){
                        $scope.invCourse = $scope._getCourseById(el);
                        $('#oldCourseInv').attr('href', '/course_front/index?id='+course.id);
                        $('#md-default').modal();
                        $event.preventDefault();
                        return false; //Break
                    }
                });
            }

        }
    }
}