//(c) Jakub Krol 2015
/// <reference path="course_interface.ts" />
/// <reference path="../vendor/angularjs/angular.d.ts"/>
/// <reference path="angular_helpers"/>

declare var app:any;

module ApkiOrg.CourseMgr {

    export interface IAppCtrlScope extends ng.IScope {
        firstName: string;
        lastName: string;

        fullName()
    }

    export class myCtrl {
        public static $inject = [
            '$scope'
//            ,'appStorage'
        ];
        constructor(private $scope: IAppCtrlScope) {
            $scope.firstName= "John";
            $scope.lastName= "Doe";
            $scope.fullName = () => {

                return $scope.firstName+" "+$scope.lastName;
            }
        }
    }

    app = angular.module('myApp', []);
    app.controller('myCtrl', myCtrl);

    export class Achivement implements IAchievement{
        ID                  :number;            //Unique ID of achievement

        title               :string;            //Title of achievement
        icon_src            :string;            //Src to use with image to represent achievement
        points              :number;            //Number of points to add (DONT USE IT AT SERVER SIDE, use ID of achievement instead)
    }

    export class Quiz implements IQuiz{
        ID                  :number;            //Unique ID of quiz

        question            :string;            //Content of question (HTML)
        answers             :string[];          //Array of possible anserws.

        achievement         :Achivement;      //Achievement for finished quiz (null if none)

        constructor() {
            this.answers     =   [];
            this.achievement = null;
        }
    }

    export class CodeLockCoord implements ICodeLockCoord{
        rowStart            :number;            //Beginning of code lock - starting row
        colStart            :number;            //Beginning of code lock - starting column
        rowEnd              :number;            //End of code lock - ending row
        colEnd              :number;            //End of code lock - ending column
    }

    export class Exercise implements IExercise{
        ID                  :number;            //Unique ID of exercise

        content_of_exercise :string;            //Content of exercise (command what to do) (HTML)
        code                :string;            //Initial visible code
        code_locks          :CodeLockCoord[];  //Code locks
        allow_user_input    :boolean;           //True if user input should be visible
        lang                :string;            //Programming language ACE code

        achievement         :Achivement;      //Achievement for finished exercise (null if none)

        constructor() {
            this.code_locks     =   [];
            this.achievement = null;
        }
    }

    export class Lesson implements ILesson{
        ID                  :number;            //Unique ID of lesson

        title               :string;            //Title of lesson

        article             :string;            //Conent of article in lesson (HTML)
        quizzes             :Quiz[];           //Quizes of lesson (empty if none)
        exercises           :Exercise[];       //Exercises of lesson (empty if none)

        achievement         :Achivement;      //Achievement for finished lesson (null if none)

        constructor() {
            this.quizzes     =   [];
            this.exercises   =   [];
            this.achievement = null;
        }
    }

//    export class CourseAngulared implements ICourseAngulared{
//
//    }

    export class Course implements ICourse{
        //Constant Metadata
        ID                  :number;            //Unique ID of course
        title               :string;            //Title of the Course
        description         :string;            //Description of the Course
        icon_src            :string;            //Src to use with images to represent current course

        //User-variable-metadata
        lessonsPassed       :number[];          //List of IDs of passed lessons
        lessonCurrent       :number;            //ID of current lesson, 0 or first lesson ID == from the beginning
        finished            :boolean;           //True if course is finished

        //Lessions:
        lessons            :Lesson[];         //Lessions in course

        constructor() {
            this.lessonsPassed  =   [];
            this.lessons        =   [];
        }
    }

    export class CommSendExercise implements ICommSendExercise{
        ID                  :number;            //Unique ID
        code                :string;            //Whole code
        user_input          :string;            //Whole user input (empty if not allowed)
    }

    export class CommRecvExercise implements ICommRecvExercise{
        ID                  :number;            //Unique ID
        output              :string;            //Output of code / errors / console, whatever...
        is_correct          :boolean;           //True if output is correct, as expected
    }

    export class CommSendQuiz implements ICommSendQuiz{
        ID                  :number;            //Unique ID
        answer_idx          :string;            //Answer idx
    }

    export class CommRecvQuiz implements ICommRecvQuiz{
        ID                  :number;            //Unique ID
        is_correct          :boolean;           //True if answer is correct
    }
}