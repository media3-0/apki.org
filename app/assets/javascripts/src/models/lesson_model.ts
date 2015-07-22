//(c) Jakub Krol 2015
/// <reference path="base_course_model.ts"/>

module ApkiOrg.CourseMgr {
    /**
     * Model: Lesson.
     */
    export class MLesson extends MBase{
        data: MLessonData;

        constructor() {
            super();
            this.data = new MLessonData();
        }
    }

    /**
     * Helper model: Lesson data.
     */
    export class MLessonData{
        title               :string;            //Title of lesson
        article             :string;            //Conent of article in lesson (HTML)

        //User metadata:
        exercisesPassed      :string[];         //List of IDs of passed lessons

        constructor() {
            this.exercisesPassed = new Array();
        }
    }
}