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
            this.code_locks = new Array();
        }
    }
}