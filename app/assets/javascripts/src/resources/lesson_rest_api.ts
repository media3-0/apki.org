//(c) Jakub Krol 2015

module ApkiOrg.CourseMgr {
    export class LessonRestAPI{
        public res : any;

        constructor(private $resource : any) {
            this.res = $resource('/course/lessons/:id.json', {}, {
                //Definition of RESTful API:
                'list':{
                    'method':'GET',
                    'url':'/course/lessons.json',
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
                    'url':'/course/lessons.json'
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