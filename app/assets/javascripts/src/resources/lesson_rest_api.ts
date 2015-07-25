//(c) Jakub Krol 2015
/// <reference path="base_rest_api.ts"/>

module ApkiOrg.CourseMgr {
    export class LessonRestAPI extends BaseRestAPI{
        public res : any;

        constructor(private $resource : any) {
            super();
            this.res = $resource('/course/lessons/:id.json', {}, {
                //Definition of RESTful API:
                'list':{
                    'method':'GET',
                    'url':'/course/lessons.json'
                    ,isArray: true
//                    'params':{
//                        'sub_url':'course_data/'
//                    }
                    ,'transformResponse':(data, headersGetter) => { return this.transformFromBackEndToFrontEnd(data, headersGetter, true); }
                }
                ,'show':{
                    'method':'GET'
                }
                ,'create':{
                    'method':'POST',
                    'url':'/course/lessons.json'
                    ,'transformResponse':(data, headersGetter) => { return this.transformFromBackEndToFrontEnd(data, headersGetter, false); }
                }
                ,'update':{
                    'method':'PUT'
                    ,'transformResponse':(data, headersGetter) => { return this.transformFromBackEndToFrontEnd(data, headersGetter, false); }
                }
                ,'delete':{
                    'method':'DELETE'
                }
            });
        }
    }
}