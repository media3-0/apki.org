//(c) Jakub Krol 2015
/// <reference path="base_course_model.ts"/>

module ApkiOrg.CourseMgr {
    /**
     * Model: Quiz.
     */
    export class MQuiz extends MBase{
        data: MQuizData;

        constructor() {
            super();
            this.data = new MQuizData();
        }
    }

    /**
     * Helper model: Quiz data.
     */
    export class MQuizData{
        question            :string;            //Content of question (HTML)
        answers             :string[];          //Array of possible anserws.
        answer_idx          :number;            //Idx of correct answer

        constructor() {
            this.question='';
            this.answer_idx=0;
            this.answers = new Array();
        }
    }
}