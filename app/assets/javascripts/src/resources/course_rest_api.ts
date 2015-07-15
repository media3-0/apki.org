//(c) Jakub Krol 2015

module ApkiOrg.CourseMgr {
    /**
     * Resource [REST API]: Course.
     */
    export class CourseRestAPI{
        public res : any;

        constructor(private $resource : any) {
            this.res = $resource('/course/course_data/:id.json', {}, {
                //Definition of RESTful API:
                'list':{
                    'method':'GET',
                    'url':'/course/course_data.json',
                    isArray: true
//                    'params':{
//                        'sub_url':'course_data/'
//                    }
//                    ,'transformResponse':this.transformFromBackEndToFrontEnd
                }
                ,'show':{
                    'method':'GET'
                }
                ,'create':{
                    'method':'POST',
                    'url':'/course/course_data.json'
                }
                ,'update':{
                    'method':'PUT'
                }
                ,'delete':{
                    'method':'DELETE'
                }
            });
        }
    }
}