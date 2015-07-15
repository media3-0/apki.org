//(c) Jakub Krol 2015


module ApkiOrg.CourseMgr {
    /**
     * Model: Communication - quiz sending.
     */
    export class MCommSendQuiz{
        id      :string;        //ID od Lesson
        quizzes :{};            //Object of values where key is id of quiz and value is idx of answer

        constructor() {
            this.quizzes = {};
        }
    }
}