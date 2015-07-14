//(c) Jakub Krol 2015

module ApkiOrg.CourseMgr {
    //Header interfaces:
    export interface ICourse extends IBase{
        data: ICourseData;
    }

    export interface IQuiz extends IBase{
        data: IQuizData;
    }

    export interface IExercise extends IBase{
        data: IExerciseData;
    }

    export interface ILesson extends IBase{
        data: ILessonData;
    }

    //Data interfaces:
    export interface ICourseData{
        //Constant Metadata
        title               :string;            //Title of the Course
        description         :string;            //Description of the Course
        icon_src            :string;            //Src to use with images to represent current course
        difficulty_level    :number;            //Difficulty level: 1-3

        //User-variable-metadata
        lessonsPassed       :number[];          //List of IDs of passed lessons
        lessonCurrent       :number;            //ID of current lesson, 0 or first lesson ID == from the beginning
        finished            :boolean;           //True if course is finished
    }

    export interface IQuizData{
        question            :string;            //Content of question (HTML)
        answers             :string[];          //Array of possible anserws.
        answer_id           :number;            //Idx of correct answer
    }

    export interface IExerciseData{
        content_of_exercise :string;            //Content of exercise (command what to do) (HTML)
        code                :string;            //Initial visible code
        code_locks          :ICodeLockCoord[];  //Code locks
        allow_user_input    :boolean;           //True if user input should be visible
        default_user_input  :string;            //Default input of user input
        lang                :string;            //Programming language ACE code

        expected_result_expr:string;            //Expression of expented result

        code_before         :string;            //Code added before
        code_after          :string;            //Code added after
    }

    export interface ILessonData{
        title               :string;            //Title of lesson

        article             :string;            //Conent of article in lesson (HTML)
        quizzes             :IQuiz[];           //Quizes of lesson (empty if none)
        exercises           :IExercise[];       //Exercises of lesson (empty if none)
    }

    //Helper interfaces:
    export interface IBase{
        ID          :string;    //Unique ID of element
        parent_ID   :string;    //Unique ID of parent element (empty when no parent at all)
//        data        :any;       //Data of element (I...Data interface)
    }

    export interface IAchievement{
        title               :string;            //Title of achievement
        icon_src            :string;            //Src to use with image to represent achievement
        points              :number;            //Number of points to add (DONT USE IT AT SERVER SIDE, use ID of achievement instead)
    }

    export interface ICodeLockCoord{
        rowStart            :number;            //Beginning of code lock - starting row
        colStart            :number;            //Beginning of code lock - starting column
        rowEnd              :number;            //End of code lock - ending row
        colEnd              :number;            //End of code lock - ending column
    }

    //Communication interfaces:
    export interface ICommSendExercise{
        ID                  :number;            //Unique ID
        code                :string;            //Whole code
        user_input          :string;            //Whole user input (empty if not allowed)
    }

    export interface ICommRecvExercise{
        ID                  :number;            //Unique ID
        output              :string;            //Output of code / errors / console, whatever...
        is_correct          :boolean;           //True if output is correct, as expected
    }

    export interface ICommSendQuiz{
        ID                  :number;            //Unique Lesson ID
        quizzes             :{};                //Quiz ID : Answer idx
    }

    export interface ICommRecvQuiz{
        ID                  :number;            //Unique ID
        is_correct          :boolean;           //True if answer is correct
    }
}