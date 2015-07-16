//(c) Jakub Krol 2015
/// <reference path="base_rest_api.ts"/>

module ApkiOrg.CourseMgr {
    export class ExercisesRestAPI extends BaseRestAPI{
        public res : any;

        constructor(private $resource : any) {
            super();
            this.res = $resource('/course/exercises/:id.json', {}, {
                //Definition of RESTful API:
                'list':{
                    'method':'GET',
                    'url':'/course/exercises.json',
                    isArray: true
//                    'params':{
//                        'sub_url':'course_data/'
//                    }
                    ,'transformResponse':(data, headersGetter) => { return this.transformFromBackEndToFrontEnd(data, headersGetter, true) }
                }
                ,'show':{
                    'method':'GET'
                }
                ,'create':{
                    'method':'POST',
                    'url':'/course/exercises.json'
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