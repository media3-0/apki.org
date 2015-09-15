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
declare var Prism:any;

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
        exerciseNum:number;
        youtubeTheaterModeSrc:string;
        currExerc:MExercise;

        initCourse(courseJSON:string)
        resizeElements()
        hidePanelBarClick(which:string)
        parseArticle()
        fullSizeElement(element:{}, $event:{})
        fullSizeClose()
        isPartVisible(part:string)
        goToPart(part:string, forceId?:string)
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
        loadExercise(part:string, forceId:string)
        getExercIconClass(exercId:string):string
        isExercEnabled(exercId:string):boolean
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

            $scope.isExercEnabled = (exercId:string) : boolean => {
                var _ret = $scope.getLesson().data.exercisesPassed.indexOf(exercId)>-1;
                if (_ret) return _ret;
                var _currIdx:number = $scope.getLesson().data.exercisesPassed.length, _exercIdx:number=0;
                $.each($scope.exercises, function(i, el:MExercise){
                    if (el.id == exercId){
                        _exercIdx = i;
                        return false; //Break
                    }
                });
                return _exercIdx<=_currIdx;
            }

            $scope.getExercIconClass = (exercId:string):string => {
                var icoClass:string = 'glyphicon glyphicon-console';

                $.each(($scope.getLesson().data.exercisesPassed || []), function(i, el){
                    if (el == exercId){
                        icoClass = 'glyphicon glyphicon-ok';
                        return false; //Break
                    }
                });

                return icoClass;
            }

            $scope.nextLesson = () => {
                var _idx = $scope.lessons.indexOf($scope.getLesson())+1;
                if (!$scope.isCourseFinished()){
                    $scope.course.data.lessonCurrent = $scope.lessons[_idx].id;
                    $scope.loadLesson();
                }
            }

            $scope.countLessonProgress = () => {
                var _perc:number = 1 + ((100/($scope.lessons.length - 1)) * ($scope.course.data.lessonsPassed.length - 1));

                _perc = Math.round(_perc);

                return {'width':_perc+'%'};
            }

            $scope.getScope = () => {
                return $scope;
            }

            $scope.userGoToLesson = (lessId:string) => {
                if (($scope.course.data.lessonsPassed.indexOf(lessId)>-1)||($scope.course.data.lessonCurrent == lessId)||($scope.oldLessonCurrent == lessId)){
                    $scope.inited=false;
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
                        $('.q-'+i).removeClass('text-success text-danger').addClass(el?'text-success':'');
                        $('.q-'+i).find('h4>.glyphicon').removeClass('glyphicon-ok glyphicon-ban-circle').addClass(el?'glyphicon-ok':'glyphicon-ban-circle');
                    });

                    $scope.quizzesAreCorrect = ans.is_correct;

                    if ($scope.quizzesAreCorrect){
                        $('.menu-quiz>i').attr('class', 'glyphicon glyphicon-ok');
                    }

                    $scope.quizChecking = false;
                });
            }

            $scope.checkExercise = (element:any, $event:any) => {
                $scope.exerciseChecking = true;
                $scope.exerciseCurrOutput = '<div class="has-spinner active text-center"><i class="fa fa-cog fa-spin color-primary" style="font-size:48px"></i></div>';

                var _exerc:MCommSendExercise = new MCommSendExercise();
                _exerc.id = $scope.getExercise().id;
                _exerc.user_input = $('#codeUserInput').val();
                _exerc.code = ApkiOrg.App.app.getEditor().getCode();

                var _exerc_str:string = ApkiOrg.App.app.helperObjectToJSON(_exerc);

                var $ExercCtrl:CheckExerciseRestAPI = new CheckExerciseRestAPI($resource);
                $ExercCtrl.res.check({}, _exerc_str, (ans:any) => {
                    $scope.exerciseCurrOutput = ans.output.output_html;

                    $scope.exerciseIsCorrect = ans.is_correct;

                    if ($scope.exerciseIsCorrect){
                        $('.menu-exerc-'+_exerc.id+'>i').attr('class', 'glyphicon glyphicon-ok');
                        $scope.getLesson().data.exercisesPassed.push(_exerc.id);
                    }

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

                    $scope.toBeInited = {
                        'course':false,
                        'lessons':false
                    };

                    $scope.currPart = 'article';

                    $(window).resize($scope.resizeElements);
                    setInterval(function(){
                        $('body').scrollTop(0);
                        $(window).scrollLeft(0);
                    }, 50); //Sorry, need it here :(
                    $(window).bind('beforeunload', function(){
                        return 'Czy na pewno chcesz opuścić stronę kursu?';
                    });

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

                $scope.quizzesAreCorrect=false;

                $scope.parseArticle();

                $scope.goToPart('article');

                if ($scope.getLesson().data.quizPassed){
                    $('.menu-quiz>i').attr('class', 'glyphicon glyphicon-ok');
                } else {
                    $('.menu-quiz>i').attr('class', 'glyphicon glyphicon-check');
                }

                $scope.inited = true;
                $scope.resizeElements();
                $('[data-toggle="tooltip"]').tooltip();
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

                $scope.exerciseNum = 0;

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

                $.each($scope.exercises, (i, el):any => {
                    if (_less.data.exercisesPassed.length==0){
                        $scope.currExerc = el;
                        return false; //Break
                    }
                });

                return $scope.currExerc;
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
                        'overflow':'hidden' //Yea, I know its very dirty, but Man, I have 15 mins to deadline xD
                    });
                    var freeHeight = $(window).height()-$('nav.navbar').height()-($('#courseLessons').is(':visible')?$('#courseLessons').height():3/*why required ??*/)-$('#courseContent').find('.secHidePanelBar').height();
                    $('#courseContent').height(freeHeight);
                    $('#courseContent').find('.col').height($('#courseContent').height());
                    $('#courseContent').find('.col.col-line-height-100-pro').css('line-height', $('#courseContent').height()+'px');
                    $('.exercise-instr-window').height($('#courseContent').height()-2);
                    $('.code-etc-window').height($('#courseContent').height()-2);
                    $('.exercise-console').height(Math.floor($('.code-etc-window').height()/2)-2);//$('#courseContent').height() - $('.exercise-instruction').height() - $('.exercise-console').height());
                    $('#editorTest').height($('#courseContent').height() - ($('.user-input-window').is(':visible')?$('.user-input-window').height():0) - ($('.send-code-window').is(':visible')?$('.send-code-window').height():0) - ($('.code-ok-window').is(':visible')?$('.code-ok-window').height():0) - ($('.exercise-console').is(':visible')?$('.exercise-console').height():0) - 2);
                    $('.exercise-instruction').css({'height':'100%'});//$('.code-etc-window').height());

                    $('.oneLessonDiv').css({'width':Math.floor($('#courseContent').width()/$scope.lessons.length)+'px'});
                    $('.lessonsProgressBar').css({
                        'padding-left':Math.floor($('#courseContent').width()/$scope.lessons.length/2)+'px',
                        'padding-right':Math.floor($('#courseContent').width()/$scope.lessons.length/2)+'px'
                    });

                    var freeWidth = $('#courseContent').width()-($('#courseContent').find('.col.first').is(':visible')?$('#courseContent').find('.col.first').width():0)-$('#courseContent').find('.firstHidePanelBar').width()-1;
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
                            $(this).replaceWith('<button class="btn btn-lg btn-primary" data-youtube-src="'+$(this).attr('src')+'" ng-click="fullSizeElement(this, $event)" id="'+iframe_id+'"><span class="glyphicon glyphicon-facetime-video"></span> Obejrzyj film</button>');
                            $compile($('#'+iframe_id))($scope);
                            sub_cats.push({
                                'title': $.trim($(this).attr('alt')),
                                'anchor':'#'+iframe_id,
                                'ico':'glyphicon-facetime-video'
                            });
                        }
                    });

                    $('#courseLessonMenu').find('ul.article-parsed').html(''); //Empty article-parsed submenu
                    $.each(sub_cats, function(){
                        $('#courseLessonMenu').find('ul.article-parsed').append('<li class="fx-fade-down"><i class="glyphicon '+this.ico+'"></i> <a href="'+this.anchor+'" ng-click="goToPart(\'article\')">'+this.title+'</a></li>');
                    });
                    $compile($('#courseLessonMenu').find('ul.article-parsed'))($scope);

                    Prism.highlightAll();
                }, 1, false);
            }

            /**
             * Select element in article as full-screen element.
             * @param string/DOMElement/jQuery element. Not used right now.
             * @param any $event Original event with $event.currentTarget.
             */
            $scope.fullSizeElement = (element:any, $event:any) => {
                $scope.youtubeTheaterModeSrc = $($event.currentTarget).data('youtube-src');
                $('.fullscreen_movie').data('old-curr-part', $scope.currPart).html('<iframe width="560" height="315" src="'+ $scope.youtubeTheaterModeSrc +'?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe><button class="btn btn-primary btn-sm" ng-click="fullSizeClose()">X Zamknij</button>');
                $compile($('.fullscreen_movie').find('button'))($scope);
                $scope.currPart = 'fullscreen_movie';
            }
            $scope.fullSizeClose = () => {
                $('.fullscreen_movie').html('');
                $scope.currPart = $('.fullscreen_movie').data('old-curr-part');
            }
            $scope.isPartVisible = (part:string):boolean =>{
                return $scope.currPart == part;
            }
            $scope.loadExercise = (part:string, forceId:string) => {

                if (forceId!=''){
//                    if ($scope.getLesson().data.exercisesPassed.indexOf(forceId)>-1){
//                        $scope.getLesson().data.exercisesPassed.splice($scope.getLesson().data.exercisesPassed.indexOf(forceId), 1);
//                    }
                    //$scope.getLesson().data.exercisesPassed.push(forceId);
                    $.each($scope.exercises, function(i, el:MExercise){
                        if (el.id == forceId){
                            $scope.currExerc = el;
                            return false; //Break
                        }
                    });
                } else {
                    $scope.currExerc=null;
                    $.each($scope.exercises, function(i, el:MExercise){
                        if ($scope.getLesson().data.exercisesPassed.indexOf(el.id) == -1){
                            $scope.currExerc = el;
                            return false; //Break
                        }
                    });
                }

                $scope.exerciseCurrOutput = 'Tutaj pojawi się wynik Twojego programu lub ewentualne błędy.<br>Kliknij "Sprawdź" aby wykonać kod.';

                $scope.exerciseIsCorrect = false;

                $scope.inited=true;

                if ($scope.currExerc === null){
                    $scope.goToPart('quiz');
                }

                $timeout(function(){
                    Prism.highlightAll();
                }, 500);

                $scope.$apply();
            }
            $scope.goToPart = (part:string, forceId:string='') =>{
                var possibleParts:boolean[] = [];
                possibleParts['article'] = true; //always enabled
                possibleParts['end'] = true; //always enabled
                possibleParts['quiz'] = (!!$scope.quizzes.length);
                possibleParts['exercise'] = (!!$scope.exercises.length);
                var path:string[] = ['article', 'exercise', 'quiz', 'end'];
                while (!possibleParts[part])
                    part = path[path.indexOf(part)+1];

                if (part == 'exercise'){
                    $scope.inited=false;
                    var _part = part;
                    var _forceId = forceId;
                    $timeout(() => { $scope.loadExercise(_part, _forceId); }, 1);
                }

                if (part == 'end'){
                    //Check is it valid to let User finish.

                    var _isOk = true;

                    $('.menu-to-check:visible').each(function(){
                        if (!$(this).find('i').is('.glyphicon-ok')){
                            var _el = this;
                            _isOk = false;
                            $timeout(() => { $(_el).find('a').click(); console.log(this); }, 1);
                            return false; //Break
                        }
                    });

                    if (!_isOk) return;
                }

                $scope.currPart = part;
            }

        }
    }
}