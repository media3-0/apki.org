//(c) Jakub Krol 2015

module ApkiOrg.CourseMgr {
    /**
     * Resource [REST API]: Quiz.
     */
    export class CheckExerciseRestAPI{
        public res : any;

        constructor(private $resource : any) {
            this.res = $resource('/course/user_courses/check_exercise.json', {}, {
                //Definition of RESTful API:
                'check':{
                    'method':'POST'
                }
            });
        }
    }
}