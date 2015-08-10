//(c) Jakub Krol 2015
/// <reference path="base_course_model.ts"/>
/// <reference path="code_lock_coord_model.ts"/>

module ApkiOrg.CourseMgr {
    /**
     * Model: Exercise.
     */
    export class MExercise extends MBase{
        data: MExerciseData;

        constructor() {
            super();
            this.data = new MExerciseData();
        }
    }
    /**
     * Helper model: Exercise data.
     */
    export class MExerciseData{
        title               :string;            //Very short title of exercise
        content_of_exercise :string;            //Content of exercise (command what to do) (HTML)
        code                :string;            //Initial visible code
        code_locks          :MCodeLockCoord[];  //Code locks
        allow_user_input    :boolean;           //True if user input should be visible
        default_user_input  :string;            //Default input of user input
        lang                :string;            //Programming language ACE code

        expected_result_expr:string;            //Expression of expented result

        code_before         :string;            //Code added before
        code_after          :string;            //Code added after

        constructor() {
            this.title = '';
            this.content_of_exercise = '';
            this.code = '';
            this.allow_user_input = false;
            this.default_user_input = '';
            this.lang = 'CSHARP';
            this.expected_result_expr = '';
            this.code_before = '';
            this.code_after = '';

            this.code_locks = new Array();
        }
    }
}