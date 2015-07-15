//(c) Jakub Krol 2015
/// <reference path="base_course_model.ts"/>

module ApkiOrg.CourseMgr {
    /**
     * Model: Course.
     */
    export class MCourse extends MBase{
        data: MCourseData;

        constructor() {
            super();
            this.data = new MCourseData();
        }
    }

    /**
     * Helper model: Course data.
     */
    export class MCourseData{
        //Constant Metadata
        title               :string;            //Title of the Course
        description         :string;            //Description of the Course
        icon_src            :string;            //Src to use with images to represent current course
        difficulty_level    :number;            //Difficulty level: 1-3
        dependencies        :string[];          //Dependencies array of IDs of previous course

        //User-variable-metadata
        lessonsPassed       :number[];          //List of IDs of passed lessons
        lessonCurrent       :number;            //ID of current lesson, 0 or first lesson ID == from the beginning
        finished            :boolean;           //True if course is finished

        constructor() {
            this.lessonsPassed = new Array();
            this.dependencies = new Array();
        }
    }
}