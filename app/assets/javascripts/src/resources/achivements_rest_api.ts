//(c) Jakub Krol 2015
/// <reference path="base_rest_api.ts"/>

module ApkiOrg.CourseMgr {
    /**
     * Resource [REST API]: Achivements.
     */
    export class AchivementsRestAPI extends BaseRestAPI{
        public res : any;

        constructor(private $resource : any) {
            super();
            this.res = $resource('/course/achievements/:id.json', {}, {
                //Definition of RESTful API:
                'list':{
                    'method':'GET',
                    'url':'/course/achievements.json',
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
                    'url':'/course/achievements.json'
                    ,'transformResponse':(data, headersGetter) => { return this.transformFromBackEndToFrontEnd(data, headersGetter, false) }
                }
                ,'update':{
                    'method':'PUT'
                    ,'transformResponse':(data, headersGetter) => { return this.transformFromBackEndToFrontEnd(data, headersGetter, false) }
                }
                ,'delete':{
                    'method':'DELETE'
                }
            });
        }
    }
}