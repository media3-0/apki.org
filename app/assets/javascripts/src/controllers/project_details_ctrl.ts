//(c) Jakub Krol 2015
/// <reference path="../../vendor/angularjs/angular.d.ts"/>
/// <reference path="../resources/github_project_rest_api.ts"/>
/// <reference path="../../vendor/custom.d.ts"/>
/// <reference path="../main.ts"/>

declare var app:any;

module ApkiOrg.ProjectDetailsMgr {
    /**
     * Controller: This is main Angular controller for course front.
     */
    export interface IAppCtrlScope extends ng.IScope {
        apiProject:ApkiOrg.CourseMgr.ProjectRestAPI;
        project:any;
        inited:boolean;
        links:string[];

        initInfo(projectId:string)
        linksList()
        urlBtnRun(url:string)
    }

    export class appProjectDetailsCtrl {
        public static $inject = [
            '$scope',
            '$timeout',
            '$compile',
            '$resource'
        ];
        constructor(private $scope: IAppCtrlScope, private $timeout: ng.ITimeoutService, private $compile:ng.ICompileService, private $resource:any) {

            $scope.initInfo = (projectId:string) => {
                $scope.inited = false;

                $scope.project=null;

                $scope.apiProject = new ApkiOrg.CourseMgr.ProjectRestAPI($resource);

                $scope.project = $scope.apiProject.res.show({'id':projectId}, '', (data) => {
                    $scope.links = $scope.linksList();

                    $scope.inited=true;
                });
            }

            $scope.urlBtnRun = (url:string) => {
                if (url==$scope.project.info.clone_url){
                    prompt('Link do skopiowania repozytorium:', url);
                    return false;
                }
            }

            $scope.linksList = () => {
                var _lst:{url:string;html:string;onclick:string}[] = new Array();

                _lst.push({
                    url:$scope.project.info.html_url,
                    html:'Strona',
                    onclick:''
                });
                _lst.push({
                    url:$scope.project.info.clone_url,
                    html:'Klonuj',
                    onclick:''
                });
                _lst.push({
                    url:$scope.project.info.html_url+'/graphs/contributors',
                    html:'Wykresy',
                    onclick:''
                });
                _lst.push({
                    url:$scope.project.info.html_url+'/pulse',
                    html:'Aktywność',
                    onclick:''
                });
                _lst.push({
                    url:$scope.project.info.html_url+'/issues',
                    html:'Błędy',
                    onclick:''
                });
                _lst.push({
                    url:$scope.project.info.html_url+'/wiki',
                    html:'Wiki',
                    onclick:''
                });

                return _lst;
            }

        }
    }
}