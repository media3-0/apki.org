//(c) Jakub Krol 2015
/// <reference path="base_rest_api.ts"/>

module ApkiOrg.CourseMgr {
    export class ProjectRestAPI extends BaseRestAPI{
        public res : any;

        constructor(private $resource : any) {
            super();
            this.res = $resource('/projects/repo/:id.json', {}, {
                //Definition of RESTful API:
                'show':{
                    'method':'POST'
                }
            });
        }
    }
}