//(c) Jakub Krol 2015
/// <reference path="../models/code_lock_coord_model.ts" />
/// <reference path="../models/base_course_model.ts" />
/// <reference path="../models/achievement_model.ts" />
/// <reference path="../models/course_model.ts" />
/// <reference path="../models/exercise_model.ts" />
/// <reference path="../models/lesson_model.ts" />
/// <reference path="../models/quiz_model.ts" />
/// <reference path="../models/comm_send_quiz.ts" />
/// <reference path="../../vendor/angularjs/angular.d.ts"/>
/// <reference path="../resources/course_rest_api.ts"/>
/// <reference path="../resources/lesson_rest_api.ts"/>
/// <reference path="../resources/quiz_rest_api.ts"/>
/// <reference path="../../vendor/custom.d.ts"/>

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
        quizzes:MLesson[];
        exercises:MLesson[];
        apiCourse:CourseRestAPI;
        apiLesson:LessonRestAPI;
        inited:boolean;
        toBeInited:{};
        courseId:string;
        quizChecking:boolean;

        initCourse(courseJSON:string)
        resizeElements()
        hidePanelBarClick(which:string)
        parseArticle()
        fullSizeElement(element:{}, $event:{})
        isPartVisible(part:string)
        goToPart(part:string)
        checkCourseLoaded(data:any, elId:string)
        buildCourse()
        getLesson():MLesson
        checkQuiz(element:{}, $event:any)
    }

    export class appCourseCtrl {
        public static $inject = [
            '$scope',
            '$timeout',
            '$compile',
            '$resource'
        ];
        constructor(private $scope: IAppCtrlScope, private $timeout: ng.ITimeoutService, private $compile:ng.ICompileService, private $resource:any) {

            $scope.checkQuiz = (element:any, $event:any) => {
                $scope.quizChecking = true;

                var _quiz:MCommSendQuiz = new MCommSendQuiz();
                _quiz.id = $scope.getLesson().id;

                _quiz.quizzes['55a512ef416d6927dc00000a'] = 8;
                _quiz.quizzes['55a512f0416d6927dc00000b'] = 0;

                console.log(_quiz);

                var _quiz_str:string = ApkiOrg.App.app.helperObjectToJSON(_quiz);

                console.log(_quiz_str);

                var $QuizCtrl:QuizRestAPI = new QuizRestAPI($resource);
                $QuizCtrl.res.check({}, _quiz_str, (ans:any) => {
                    console.log(ans);
                });

                $scope.quizChecking = false;
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

                    $scope.apiCourse = new CourseRestAPI($resource);
                    $scope.apiLesson = new LessonRestAPI($resource);

                    $scope.course = $scope.apiCourse.res.show({'id':$scope.courseId}, '', (data) => { $scope.checkCourseLoaded(data, 'course') });
                    $scope.lessons = $scope.apiLesson.res.list({'course_id':$scope.courseId}, '', (data) => { $scope.checkCourseLoaded(data, 'lessons') });
                }
                $timeout(_f, 1, false);
            }

            /**
             * This will create course object, init rest of app and set application as initialized.
             * Private.
             */
            $scope.buildCourse = () => {
                $scope.parseArticle();

                $scope.inited = true;
                $scope.resizeElements();
            }

            /**
             * This will create course object, init rest of app and set application as initialized.
             * Private.
             * @param any data Data from JSON
             * @param string elId Element to be inited id
             */
            $scope.checkCourseLoaded = (data:any, elId:string) => {
                $scope.toBeInited[elId]=true;

                var _inited:boolean=true;
                $($scope.toBeInited).each((i, el) => {
                    if (!el)
                        _inited=false;
                });

                if (_inited)
                    $scope.buildCourse();
            }

            /**
             * Gets current lesson.
             * @return Lesson Current lesson or null if all finished
             */
            $scope.getLesson = ():MLesson => {
                if ($scope.course.data.lessonCurrent>=$scope.lessons.length)
                    return null;
                else
                    return $scope.lessons[$scope.course.data.lessonCurrent];
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
                    var freeHeight = $(window).height()-$('nav.navbar').height()-($('#courseLessons').is(':visible')?$('#courseLessons').height():3/*why required ??*/)-$('#courseContent').find('.secHidePanelBar').height();
                    $('#courseContent').height(freeHeight);
                    $('#courseContent').find('.col').height($('#courseContent').height());
                    $('#courseContent').find('.col.col-line-height-100-pro').css('line-height', $('#courseContent').height()+'px');
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
                possibleParts['exercise'] = (!!$scope.quizzes.length);
                var path:string[] = ['article', 'quiz', 'exercise', 'end'];
                if (!possibleParts[part])
                    part = path[path.indexOf(part)+1];

                $scope.currPart = part;
            }

        }
    }
}