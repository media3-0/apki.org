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

module ApkiOrg.CourseMgr {
    /**
     * Controller: This is main Angular controller for course front.
     */
    export interface IAppCtrlScope extends ng.IScope {
        menuVisible:{'left':boolean; 'bottom':boolean};
        currPart:string;
        course:MCourse;
        lessons:MLesson[];
        quizzes:MQuiz[];
        exercises:MExercise[];
        apiCourse:CourseRestAPI;
        apiLesson:LessonRestAPI;
        apiQuizzes:QuizzesRestAPI;
        apiExercises:ExercisesRestAPI;
        inited:boolean;
        toBeInited:{};
        courseId:string;
        quizChecking:boolean;
        quizzesAreCorrect:boolean;
        exerciseCurrOutput:string;
        exerciseChecking:boolean;
        exerciseIsCorrect:boolean;
        oldLessonCurrent:string;

        initCourse(courseJSON:string)
        resizeElements()
        hidePanelBarClick(which:string)
        parseArticle()
        fullSizeElement(element:{}, $event:{})
        isPartVisible(part:string)
        goToPart(part:string)
        checkIsLoaded(data:any, elId:string, clbOnFinish:() => any)
        buildCourse()
        getLesson():MLesson
        getExercise():MExercise
        checkQuiz(element:{}, $event:any)
        checkExercise(element:{}, $event:any)
        loadLesson()
        userGoToLesson(lessId:string)
        getScope()
        countLessonProgress()
        nextLesson()
        isCourseFinished()
    }

    export class appCourseCtrl {
        public static $inject = [
            '$scope',
            '$timeout',
            '$compile',
            '$resource'
        ];
        constructor(private $scope: IAppCtrlScope, private $timeout: ng.ITimeoutService, private $compile:ng.ICompileService, private $resource:any) {

            $scope.isCourseFinished = () => {
                var _idx = $scope.lessons.indexOf($scope.getLesson())+1;
                return (_idx>=$scope.lessons.length);
            }

            $scope.nextLesson = () => {
                var _idx = $scope.lessons.indexOf($scope.getLesson())+1;
                if (!$scope.isCourseFinished()){
                    $scope.course.data.lessonCurrent = $scope.lessons[_idx].id;
                    $scope.loadLesson();
                }
            }

            $scope.countLessonProgress = () => {
                var _perc:number = 1 + ((100/($scope.lessons.length - 1)) * ($scope.course.data.lessonsPassed.length));

                _perc = Math.round(_perc);

                return {'width':_perc+'%'};
            }

            $scope.getScope = () => {
                return $scope;
            }

            $scope.userGoToLesson = (lessId:string) => {
                if (($scope.course.data.lessonsPassed.indexOf(lessId)>-1)||($scope.course.data.lessonCurrent == lessId)||($scope.oldLessonCurrent == lessId)){
                    $scope.oldLessonCurrent == $scope.course.data.lessonCurrent;
                    $scope.course.data.lessonCurrent = lessId;
                    $scope.loadLesson();
                }
            }

            $scope.checkQuiz = (element:any, $event:any) => {
                $scope.quizChecking = true;

                var _quiz:MCommSendQuiz = new MCommSendQuiz();
                _quiz.id = $scope.getLesson().id;

                $('#quizForm input:checked').each((i, el) => {
                    _quiz.quizzes[$(el).data('quiz-id')] =parseInt($(el).val());
                });

                var _quiz_str:string = ApkiOrg.App.app.helperObjectToJSON(_quiz);

                var $QuizCtrl:CheckQuizRestAPI = new CheckQuizRestAPI($resource);
                $QuizCtrl.res.check({}, _quiz_str, (ans:any) => {
                    $.each(ans.quizzes, (i, el) => {
                        $('.q-'+i).removeClass('has-success has-warning has-error').addClass(el?'has-success':'has-error');
                        $('.q-'+i).find('.field-value').next('.help-block').remove();
                        $('.q-'+i).find('.field-value').after('<div class="help-block">'+(el?'Odpowiedź poprawna.':'Niepoprawna odpowiedź.')+'</div>');
                    });

                    $scope.quizzesAreCorrect = ans.is_correct;

                    $scope.quizChecking = false;
                });
            }

            $scope.checkExercise = (element:any, $event:any) => {
                $scope.exerciseChecking = true;
                $scope.exerciseCurrOutput = '<div class="has-spinner active text-center"><span class="spinner"><i class="glyphicon spinning glyphicon-refresh"></i></span></div>';

                var _exerc:MCommSendExercise = new MCommSendExercise();
                _exerc.id = $scope.getExercise().id;
                _exerc.user_input = $('#codeUserInput').val();
                _exerc.code = ApkiOrg.App.app.getEditor().getCode();

                var _exerc_str:string = ApkiOrg.App.app.helperObjectToJSON(_exerc);

                var $ExercCtrl:CheckExerciseRestAPI = new CheckExerciseRestAPI($resource);
                $ExercCtrl.res.check({}, _exerc_str, (ans:any) => {
                    $scope.exerciseCurrOutput = ans.output.output_html;

                    $scope.exerciseIsCorrect = ans.is_correct;

                    $scope.exerciseChecking = false;
                }, () => {
                    $scope.exerciseCurrOutput = '<div class="alert alert-danger" role="alert"><b>Błąd!</b> Przepraszamy, serwer w tej chwili nie odpowiada, spróbuj ponownie lub skontaktuj się z nami.</div>';

                    $scope.exerciseIsCorrect = false;

                    $scope.exerciseChecking = false;
                });
            }
            /**
             * Hold are menus visible
             * @type {{left: boolean, bottom: boolean}}
             */
            $scope.menuVisible={'left':true, 'bottom':true};

            /**
             * This will init Course. Required at the beginning. Called in ng-init.
             */
            $scope.initCourse = () => {
                var _f = () => {
                    $scope.inited = false;

                    $scope.quizzesAreCorrect=false;

                    $scope.toBeInited = {
                        'course':false,
                        'lessons':false
                    };

                    $scope.currPart = 'article';

                    $(window).resize($scope.resizeElements);

                    $scope.apiCourse = new CourseRestAPI($resource);
                    $scope.apiLesson = new LessonRestAPI($resource);
                    $scope.apiQuizzes = new QuizzesRestAPI($resource);
                    $scope.apiExercises = new ExercisesRestAPI($resource);

                    $scope.course = $scope.apiCourse.res.show({'id':$scope.courseId}, '', (data) => { $scope.checkIsLoaded(data, 'course', $scope.loadLesson) });
                    $scope.lessons = $scope.apiLesson.res.list({'course_id':$scope.courseId}, '', (data) => { $scope.checkIsLoaded(data, 'lessons', $scope.loadLesson) });
                }
                $timeout(_f, 1, false);
            }

            /**
             * This will create course object, init rest of app and set application as initialized.
             * Private.
             */
            $scope.buildCourse = () => {
                if ($scope.inited) return;

                $scope.parseArticle();

                $scope.goToPart('article');

                $scope.inited = true;
                $scope.resizeElements();
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

            $scope.loadLesson = () => {
                $scope.inited = false;

                if ($scope.course.data.lessonsPassed.indexOf($scope.course.data.lessonCurrent)==-1)
                    $scope.course.data.lessonsPassed.push($scope.course.data.lessonCurrent);

                $scope.toBeInited = {
                    'quizzes':false,
                    'exercises':false
                };

                $scope.exerciseCurrOutput = 'Tutaj pojawi się wynik Twojego programu lub ewentualne błędy.<br>Kliknij "Sprawdź" aby wykonać kod.';

                $scope.exerciseIsCorrect = false;

                $scope.quizzes = $scope.apiQuizzes.res.list({'lesson_id':$scope.getLesson().id}, '', (data) => { $scope.checkIsLoaded(data, 'quizzes', $scope.buildCourse) });
                $scope.exercises = $scope.apiExercises.res.list({'lesson_id':$scope.getLesson().id}, '', (data) => { $scope.checkIsLoaded(data, 'exercises', $scope.buildCourse) });
            }


            /**
             * Gets current lesson.
             * @return Lesson Current lesson or null if all finished
             */
            $scope.getLesson = ():MLesson => {
                if ($scope.course.data.lessonCurrent == "")
                    $scope.course.data.lessonCurrent = $scope.lessons[0].id;

                var _less:MLesson = null;
                $.each($scope.lessons, (i, el):any => {
                    if (el.id == $scope.course.data.lessonCurrent){
                        _less = el;
                        return false; //Break
                    }
                });

                if (_less === null)
                    _less = $scope.lessons[0]; //In case of invalid ID (for example when course is changed when User is inside)

                return _less;
            }


            /**
             * Gets current exercise.
             * @return MExercise Current exercise or null if none
             */
            $scope.getExercise = ():MExercise => {
                var _less:MLesson = $scope.getLesson();
                if (_less === null) return null;

                var _exerc = null;
                $.each($scope.exercises, (i, el):any => {
                    if (_less.data.exercisesPassed.length==0){
                        _exerc = el;
                        return false; //Break
                    }
                    if (el.id == _less.data.exercisesPassed[_less.data.exercisesPassed.length-1]){
                        _exerc = el;
                        return false; //Break
                    }
                });

                return _exerc;
            }

            /**
             * Hides or shows one of the menus.
             * @param string which
             */
            $scope.hidePanelBarClick = (which:string) => {
                $scope.menuVisible[which]=!$scope.menuVisible[which];
            }
            /**
             * This will be called in window resize. May be also used manually.
             * @param number delay Defaults to 0. When >0 it will postpone execution of this method for delay ms using $timeout.
             */
            $scope.resizeElements = (delay:number=0) => {
                var _resFnc = () => {
                    $('body').css({
                        'overflow':'hidden' //Yea, I know its very dirsty, but Man, I have 15 mins to deadline xD
                    });
                    var freeHeight = $(window).height()-$('nav.navbar').height()-($('#courseLessons').is(':visible')?$('#courseLessons').height():3/*why required ??*/)-$('#courseContent').find('.secHidePanelBar').height();
                    $('#courseContent').height(freeHeight);
                    $('#courseContent').find('.col').height($('#courseContent').height());
                    $('#courseContent').find('.col.col-line-height-100-pro').css('line-height', $('#courseContent').height()+'px');
                    $('.code-etc-window').height($('#courseContent').height());
                    $('#editorTest').height($('#courseContent').height() - ($('.user-input-window').is(':visible')?$('.user-input-window').height():0) - ($('.send-code-window').is(':visible')?$('.send-code-window').height():0) - ($('.code-ok-window').is(':visible')?$('.code-ok-window').height():0));
                    $('.exercise-instruction').height(Math.round($('#courseContent').height() / 2 - 1));
                    $('.exercise-console').height($('#courseContent').height() - $('.exercise-instruction').height());

                    $('.oneLessonDiv').css({'width':Math.floor($('#courseContent').width()/$scope.lessons.length)+'px'});
                    $('.lessonsProgressBar').css({
                        'padding-left':Math.floor($('#courseContent').width()/$scope.lessons.length/2)+'px',
                        'padding-right':Math.floor($('#courseContent').width()/$scope.lessons.length/2)+'px'
                    });

                    var freeWidth = $('#courseContent').width()-($('#courseContent').find('.col.first').is(':visible')?$('#courseContent').find('.col.first').width():0)-$('#courseContent').find('.firstHidePanelBar').width();
                    $('#courseContent').find('.col.sec').width(freeWidth);

                    if ($('.full-screen-element').length==1){
                        $('.full-screen-element').height(freeHeight-$('.full-screen-element').prev().prev().height());
                        $('.full-screen-element').prev().prev()[0].scrollIntoView( true );
                    }
                }
                if (delay>0)
                    $timeout(_resFnc, delay, false);
                else
                    _resFnc();
            }

            /**
             * This is for parsing article :-)
             * Private.
             */
            $scope.parseArticle = () => {
                $timeout(() => {

                    var get_gen_id = (element:any):string => {
                        if ($.inArray($(element).attr('id'), [undefined, null, ''])>-1){
                            var rand_id:string;
                            do {
                                var rand_id = 'anchor_'+Math.round(Math.random()*1000)+Math.round(Math.random()*1000);
                            } while ($('*[id="'+rand_id+'"]').length>0);
                            $(element).attr('id', rand_id);
                        }
                        return $(element).attr('id');
                    };
                    var art_el : JQuery = $('#courseCnt').find('.course-article');
                    if (art_el.length==0) return;
                    var sub_cats : {'title':string; 'anchor':string; 'ico':string}[] = [];

                    art_el.find(':header, iframe').each(function(){
                        if ($(this).is(':header')){
                            sub_cats.push({
                                'title': $.trim($(this).text()),
                                'anchor':'#'+get_gen_id(this),
                                'ico':'glyphicon-align-justify'
                            });
                        }
                        if ($(this).is('iframe')){
                            if ($.inArray($(this).attr('alt'), [undefined, null, ''])>-1){
                                $(this).attr('alt', 'Film');
                            }
                            var iframe_id:string = get_gen_id(this);
                            $(this).wrap('<div></div>');
                            $(this).before('<a href="javascript:;" ng-click="fullSizeElement(this, $event)">Przejdź do trybu pełnoekranowego</a><br>');
                            $compile($(this).parent('div'))($scope);
                            sub_cats.push({
                                'title': $.trim($(this).attr('alt')),
                                'anchor':'#'+iframe_id,
                                'ico':'glyphicon-facetime-video'
                            });
                        }
                    });

                    $('#courseLessonMenu').find('ul.article-parsed').html(''); //Empty article-parsed submenu
                    $.each(sub_cats, function(){
                        $('#courseLessonMenu').find('ul.article-parsed').append('<li><i class="glyphicon '+this.ico+'"></i> <a href="'+this.anchor+'" ng-click="goToPart(\'article\')">'+this.title+'</a></li>');
                    });
                    $compile($('#courseLessonMenu').find('ul.article-parsed'))($scope);
                }, 1, false);
            }

            /**
             * Select element in article as full-screen element.
             * @param string/DOMElement/jQuery element. Not used right now.
             * @param any $event Original event with $event.currentTarget.
             */
            $scope.fullSizeElement = (element:any, $event:any) => {
                $('.full-screen-element').removeClass('.full-screen-element');

                if ($($event.currentTarget).data('full-screen') === true) {
                    //close full-screen:
                    $('#courseCnt').removeClass('full-screen-art-element');

                    $($event.currentTarget).text('Przejdź do trybu pelnoekranowego');

                    $($event.currentTarget).next().next().removeClass('full-screen-element').height($($event.currentTarget).next().next().data('oryg-height'));

                    $($event.currentTarget).data('full-screen', false);
                } else {
                    //open full-screen:
                    $('#courseCnt').addClass('full-screen-art-element');

                    $($event.currentTarget).text('Wyjdź z trybu pelnoekranowego');

                    $($event.currentTarget).next().next().addClass('full-screen-element').data('oryg-height', $($event.currentTarget).next().next().height());

                    $($event.currentTarget).data('full-screen', true);
                }

                $($event.currentTarget)[0].scrollIntoView( true );
            }
            $scope.isPartVisible = (part:string):boolean =>{
                return $scope.currPart == part;
            }
            $scope.goToPart = (part:string) =>{
                var possibleParts:boolean[] = [];
                possibleParts['article'] = true; //always enabled
                possibleParts['end'] = true; //always enabled
                possibleParts['quiz'] = (!!$scope.quizzes.length);
                possibleParts['exercise'] = (!!$scope.exercises.length);
                var path:string[] = ['article', 'quiz', 'exercise', 'end'];
                while (!possibleParts[part])
                    part = path[path.indexOf(part)+1];

                $scope.currPart = part;
            }

        }
    }
}