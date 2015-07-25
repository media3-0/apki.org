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
/// <reference path="../resources/achivements_rest_api.ts"/>
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
        apiAchievements:ApkiOrg.CourseMgr.AchivementsRestAPI;
        inited:boolean;
        toBeInited:{};
        courseId:string;
        addingNew:boolean;
        newDependency:any; //ApkiOrg.CourseMgr.MCourse or int
        currLess:ApkiOrg.CourseMgr.MLesson;
        newLess:ApkiOrg.CourseMgr.MLesson;
        currTab:string;
        currLessTab:string;
        newQuiz:ApkiOrg.CourseMgr.MQuiz;
        newExerc:ApkiOrg.CourseMgr.MExercise;
        achievementEditorActive:boolean;
        achievementEditorSubTitle:string;
        achievement:ApkiOrg.CourseMgr.MAchievement;
        achievementParentIdQueryName:string;
        achievementParentId:string;

        initAPanel()
        checkIsLoaded(data:any, elId:string, clbOnFinish:() => any)
        loadView()
        addNewDependecy()
        removeDependecy()
        addNewLesson()
        saveCourse()
        reloadPageIfWant()
        saveLesson()
        getScope()
        test(s:string)
        setCurrLess()
        removeQuizAns(quiz:ApkiOrg.CourseMgr.MQuiz, index:number)
        addQuizAns(quiz:ApkiOrg.CourseMgr.MQuiz)
        parseInt(num:string)
        standardSaveObject(object:any, resource:any, id:string)
        saveQuiz(quiz:ApkiOrg.CourseMgr.MQuiz)
        addNewQuiz()
        removeCodeLock(exerc:ApkiOrg.CourseMgr.MExercise, index:number)
        addCodeLock(exerc:ApkiOrg.CourseMgr.MExercise)
        saveExercise(exerc:ApkiOrg.CourseMgr.MExercise)
        addNewExercise()
        achievementEditor(desc:string, id_query_name:string, id:string)
        saveAchivement()
        addNewAchivement()
    }

    export class aPanelCtrl {
        public static $inject = [
            '$scope',
            '$timeout',
            '$compile',
            '$resource'
        ];
        constructor(private $scope: IAppCtrlScope, private $timeout: ng.ITimeoutService, private $compile:ng.ICompileService, private $resource:any) {

            $scope.saveAchivement = () => {
                $scope.standardSaveObject($scope.achievement, $scope.apiAchievements.res, $scope.achievement.id);
                $scope.achievementEditorActive=false;
            }

            $scope.addNewAchivement = () => {
                $scope.inited = false;

                var _ask_data = {};

                _ask_data[$scope.achievementParentIdQueryName] = $scope.achievementParentId;

                $scope.apiAchievements.res.create(_ask_data, '', (data) => {
                    $scope.achievement = new ApkiOrg.CourseMgr.MAchievement();

                    var _n_achiv_data_str:string = ApkiOrg.App.app.helperObjectToJSON($scope.achievement.data);

                    $scope.achievement = $scope.apiQuizzes.res.update({'id':data.id}, _n_achiv_data_str, (data) => {
                        $scope.inited = true;
                    });
                })
            }

            $scope.achievementEditor = (desc:string, id_query_name:string, id:string) => {
                $scope.inited=false;
                $scope.achievementEditorActive=true;
                $scope.achievementEditorSubTitle=desc;
                $scope.achievementParentIdQueryName=id_query_name;
                $scope.achievementParentId=id;

                var _achiv:ApkiOrg.CourseMgr.MAchievement[] = new Array();

                var _ask_data = {};

                _ask_data[id_query_name] = id;

                $scope.quizzes = $scope.apiAchievements.res.list(_ask_data, '', (data) => {
                    if (data.length == 0){
                        $scope.achievement = null;
                    } else {
                        $scope.achievement = data[0];
                    }

                    $scope.inited=true;
                });
            }

            $scope.addNewQuiz = () => {
                $scope.inited = false;
                $scope.apiQuizzes.res.create({'lesson_id':$scope.currLess.id}, '', (data) => {
                    $scope.newQuiz = new ApkiOrg.CourseMgr.MQuiz();

                    var _n_quiz_data_str:string = ApkiOrg.App.app.helperObjectToJSON($scope.newQuiz.data);

                    $scope.newQuiz = $scope.apiQuizzes.res.update({'id':data.id}, _n_quiz_data_str, (data) => {
                        $scope.quizzes.push($scope.newQuiz);
                        $scope.newQuiz=null;
                        $scope.inited = true;
                    });
                })
            }

            $scope.addNewExercise = () => {
                $scope.inited = false;
                $scope.apiExercises.res.create({'lesson_id':$scope.currLess.id}, '', (data) => {
                    $scope.newExerc = new ApkiOrg.CourseMgr.MExercise();

                    var _n_exerc_data_str:string = ApkiOrg.App.app.helperObjectToJSON($scope.newExerc.data);

                    $scope.newExerc = $scope.apiExercises.res.update({'id':data.id}, _n_exerc_data_str, (data) => {
                        $scope.exercises.push($scope.newExerc);
                        $scope.newExerc=null;
                        $scope.inited = true;
                    });
                })
            }

            $scope.standardSaveObject = (object:any, resource:any, id:string) => {
                $scope.inited = false;
                var _data_str:string = ApkiOrg.App.app.helperObjectToJSON(object.data);

                object = resource.update({'id':id}, _data_str, (data) => {
                    $scope.inited = true;
                });
            }

            $scope.saveLesson = () => {
                $scope.standardSaveObject($scope.currLess, $scope.apiLesson.res, $scope.currLess.id);
            }

            $scope.saveCourse = () => {
                $scope.standardSaveObject($scope.course, $scope.apiCourse.res, $scope.course.id);
            }

            $scope.saveQuiz = (quiz:ApkiOrg.CourseMgr.MQuiz) => {
                $scope.standardSaveObject(quiz, $scope.apiQuizzes.res, quiz.id);
            }

            $scope.saveExercise = (exerc:ApkiOrg.CourseMgr.MExercise) => {
                $scope.standardSaveObject(exerc, $scope.apiExercises.res, exerc.id);
            }

            $scope.parseInt = function(num:string) {
                return parseInt(num, 10);
            }
            $scope.removeQuizAns = (quiz:ApkiOrg.CourseMgr.MQuiz, index:number) => {
                quiz.data.answers.splice(index, 1);
            }
            $scope.addQuizAns = (quiz:ApkiOrg.CourseMgr.MQuiz) => {
                quiz.data.answers.push('');
            }
            $scope.removeCodeLock = (exerc:ApkiOrg.CourseMgr.MExercise, index:number) => {
                exerc.data.code_locks.splice(index, 1);
                console.log(exerc.data.code_locks);
            }
            $scope.addCodeLock = (exerc:ApkiOrg.CourseMgr.MExercise) => {
                var _n_code_l = new ApkiOrg.CourseMgr.MCodeLockCoord();
                exerc.data.code_locks.push(_n_code_l);
            }
            $scope.setCurrLess = () => {
                $scope.inited = false;

                $scope.toBeInited = {
                    'quizzes':false,
                    'exercises':false
                };

                var _readyFunc = () => {
                    $scope.inited = true;
                };

                $scope.quizzes = $scope.apiQuizzes.res.list({'lesson_id':$scope.currLess.id}, '', (data) => { $scope.checkIsLoaded(data, 'quizzes', _readyFunc) });
                $scope.exercises = $scope.apiExercises.res.list({'lesson_id':$scope.currLess.id}, '', (data) => { $scope.checkIsLoaded(data, 'exercises', _readyFunc) });
            }

            $scope.test = (s:string) => {
                console.log(s);
            }

            $scope.getScope = () => {
                return $scope;
            }

            $scope.reloadPageIfWant = () => {
                if (confirm('Na pewno odrzucić WSZYSTKIE niezapisane zmiany na tej stronie? To w przeciwieństwie do zapisu dotyczy wszystkich miejsc w których coś zostało zmienione.')) {
                    window.location.reload();
                }
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
                    $scope.currTab='Ustawienia kursu';
                    $scope.currLessTab='Ustawienia i artykuł';
                    $scope.achievementEditorActive=false;

                    $scope.apiCourse = new ApkiOrg.CourseMgr.CourseRestAPI($resource);
                    $scope.apiLesson = new ApkiOrg.CourseMgr.LessonRestAPI($resource);
                    $scope.apiQuizzes = new ApkiOrg.CourseMgr.QuizzesRestAPI($resource);
                    $scope.apiExercises = new ApkiOrg.CourseMgr.ExercisesRestAPI($resource);
                    $scope.apiAchievements = new ApkiOrg.CourseMgr.AchivementsRestAPI($resource);

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