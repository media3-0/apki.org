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

module ApkiOrg.APanelListMgr {
    /**
     * Controller: This is main Angular controller for course front.
     */
    export interface IAppCtrlScope extends ng.IScope {
        courses:ApkiOrg.CourseMgr.MCourse[];
        inited:boolean;
        apiCourse:ApkiOrg.CourseMgr.CourseRestAPI;

        initAPanelList()
        addNewCourse()
        removeCourse(course:ApkiOrg.CourseMgr.MCourse)
    }

    export class aPanelListCtrl {
        public static $inject = [
            '$scope',
            '$timeout',
            '$compile',
            '$resource'
        ];
        constructor(private $scope: IAppCtrlScope, private $timeout: ng.ITimeoutService, private $compile:ng.ICompileService, private $resource:any) {

            $scope.removeCourse = (course:ApkiOrg.CourseMgr.MCourse) => {
                if (course === null) return;
                if (!confirm('Czy jesteś pewien że chcesz usunąć cały ten kurs, wraz z wszystkimi lekcjami i całą jego zawartością??')) return;

                $scope.inited = false;

                $scope.apiCourse.res.delete({'id':course.id}, '', (data) => {
                    $scope.courses.splice($scope.courses.indexOf(course), 1);
                    course = null;

                    $scope.inited = true;
                });
            }

            $scope.addNewCourse = () => {
                $scope.inited = false;
                $scope.apiCourse.res.create({}, '', (data) => {
                    var newCourse:ApkiOrg.CourseMgr.MCourse = new ApkiOrg.CourseMgr.MCourse();

                    var _n_course_data_str:string = ApkiOrg.App.app.helperObjectToJSON(newCourse.data);

                    newCourse = $scope.apiCourse.res.update({'id':data.id}, _n_course_data_str, (data) => {
                        $scope.courses.push(newCourse);
                        $scope.inited = true;
                    });
                })
            }

            /**
             * This will init Course. Required at the beginning. Called in ng-init.
             */
            $scope.initAPanelList = () => {
                var _f = () => {
                    $scope.inited = false;

                    $scope.courses=new Array();

                    $scope.apiCourse = new ApkiOrg.CourseMgr.CourseRestAPI($resource);

                    $scope.courses = $scope.apiCourse.res.list({}, '', (data) => {
                        $scope.inited=true;
                    });
                }
                $timeout(_f, 1, false);
            }
        }
    }
}