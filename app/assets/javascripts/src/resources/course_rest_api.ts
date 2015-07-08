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
//                    ,'transformResponse':[] //Uncomment to enable RAW text, no JSON decoding
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

                var c = new ApkiOrg.CourseMgr.Course();
    c.ID = 1;
    c.title = 'Halo halo!';
    c.lessonsPassed = [1, 2, 3];
    c.lessonCurrent = 1;

//    c.lessons = [];
    var newLess = new ApkiOrg.CourseMgr.Lesson();
    newLess.achievement = null;
    newLess.article = '<h1>HWDP JP 100%!</h1>';
    newLess.ID = 0;
//    newLess.quizzes=[];
//    newLess.exercises = new Array();

    var newExecrise = new ApkiOrg.CourseMgr.Exercise();
    newExecrise.ID=777;
    newExecrise.content_of_exercise='Zrób coś!';
    newExecrise.lang = 'javascript';
    newExecrise.code='heheheh';
//    newExecrise.code_locks = new Array();

    var newAch = new ApkiOrg.CourseMgr.Achivement();
    newAch.ID=1;
    newAch.title='Heheszki';
    newAch.points=100;

    newExecrise.achievement = newAch;
    newLess.exercises.push(newExecrise);
    c.lessons.push(newLess);

    var tekst = ApkiOrg.App.app.helperObjectToJSON<ApkiOrg.CourseMgr.Course>(c);

            console.log(this.res.create({}, '', (ans:string) => {
                console.log('Jest i ans!');
                console.log(ans);
            }));
        }
    }
}