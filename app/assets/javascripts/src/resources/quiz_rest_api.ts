//(c) Jakub Krol 2015

module ApkiOrg.CourseMgr {
    /**
     * Resource [REST API]: Quiz.
     */
    export class QuizRestAPI{
        public res : any;

        constructor(private $resource : any) {
            this.res = $resource('/course/user_courses/check_quizzes.json', {}, {
                //Definition of RESTful API:
                'check':{
                    'method':'POST'
                }
            });
        }
    }
}