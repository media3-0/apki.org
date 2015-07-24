//(c) Jakub Krol 2015
/// <reference path="base_rest_api.ts"/>

module ApkiOrg.CourseMgr {
    /**
     * Resource [REST API]: Course.
     */
    export class CourseRestAPI extends BaseRestAPI{
        public res : any;

        constructor(private $resource : any) {
            super();
            this.res = $resource('/course/course_data/:id.json', {}, {
                //Definition of RESTful API:
                'list':{
                    'method':'GET',
                    'url':'/course/course_data.json',
                    isArray: true
//                    'params':{
//                        'sub_url':'course_data/'
//                    }
                    ,'transformResponse':(data, headersGetter) => { return this.transformFromBackEndToFrontEnd(data, headersGetter, true) }
                }
                ,'show':{
                    'method':'GET'
                    ,'transformResponse':(data, headersGetter) => { return this.transformFromBackEndToFrontEnd(data, headersGetter, false) }
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