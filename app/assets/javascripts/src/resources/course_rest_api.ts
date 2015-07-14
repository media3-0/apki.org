//(c) Jakub Krol 2015
/// <reference path="../course_interface.ts" />
/// <reference path="../../vendor/angularjs/angular.d.ts"/>
/// <reference path="../angular_helpers"/>
/// <reference path="../main"/>


module ApkiOrg.CourseMgr {
    export class CourseRestAPI{
        public res : any;

        constructor(private $resource : any) {
            this.res = $resource('/course/course_data/:id.json', {}, {
                //Definition of RESTful API:
                'list':{
                    'method':'GET',
                    'url':'/course/course_data.json'
//                    'params':{
//                        'sub_url':'course_data/'
//                    }
                    ,'transformResponse':this.transformFromBackEndToFrontEnd
                }
                ,'show':{
                    'method':'GET'
                    ,'transformResponse':this.transformFromBackEndToFrontEnd
                }
                ,'create':{
                    'method':'POST',
                    'url':'/course/course_data.json'
                    ,'transformResponse':this.transformFromBackEndToFrontEnd
                }
                ,'update':{
                    'method':'PUT'
                    ,'transformResponse':this.transformFromBackEndToFrontEnd
                }
                ,'delete':{
                    'method':'DELETE'
                    ,'transformResponse':this.transformFromBackEndToFrontEnd
                }
            });
        }

        private transformFromBackEndToFrontEnd(data, headersGetter){
            data = angular.fromJson(data);
            return $.extend(data.data, {'ID':data.id.$oid||''}); //overwrite ID to real ID
        }
    }
}