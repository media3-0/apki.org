///<reference path="../vendor/jquery/jquery.d.ts" />
///<reference path="editor.ts" />
///<reference path="course.ts" />

module ApkiOrg.App {
    export var app:ApkiOrg.App.AppMgr;

    export class AppMgr {
        private editor:Editor.EditorManager;
        constructor() {
            this.editor = null;
        }
        initEditor(langId, initCode:string){
            if (this.editor !== null){
                this.editor.destroy();
            }
            this.editor = new Editor.EditorManager('editorTest', langId, initCode);
        }
        getEditor(): Editor.EditorManager{
            return this.editor;
        }
        helperImageCircle(element:any, imgSrc:string, widthAndHeight:number){
            if (jQuery(element).length==0) return;
            jQuery(element).addClass('circular').css({
                'background-image':'url(https://images.weserv.nl/?h='+widthAndHeight+'&w='+widthAndHeight+'&url='+encodeURIComponent(imgSrc.substr(imgSrc.indexOf('://')+3))+')',
                'border-radius':Math.round(widthAndHeight/2)+'px',
                'width':widthAndHeight+'px',
                'height':widthAndHeight+'px',
                'border':'2px solid #e7e7e7 !important'
            });
        }
        helperObjectFromJSON<T>(json_str:string):T{
            var new_obj:T = JSON.parse(json_str);
            return new_obj;
        }
        helperObjectToJSON<T>(obj:T):string{
            var _json:string = JSON.stringify(obj);

            return _json;
        }
    }

}

jQuery(function(){
    ApkiOrg.App.app = new ApkiOrg.App.AppMgr();

    //Layout, elements etc:
    ApkiOrg.App.app.helperImageCircle('#loginImage', jQuery('#loginImage').data('src'), 35);
    var elems:any = jQuery('.selectpicker');
    elems.selectpicker();
    jQuery('.auto-status-removal').on('click', function(){
        $(this).removeClass('has-success has-warning has-error').find('.form-control-feedback').remove();
    });

//    var newCommSendExercise = new Course.CommSendExercise();
//    newCommSendExercise.code = 'Jakiś kod...';
//    newCommSendExercise.ID = 1;
//    newCommSendExercise.user_input = '';
//
//    var tekst = Course.objectToJSON<Course.CommSendExercise>(newCommSendExercise);
//
//    console.log(tekst);

//    var tekst = '{"code":"Jakiś kod...","ID":1,"user_input":""}';
//
//    var newCommSendExercise = Course.objectFromJSON<Course.CommSendExercise>(tekst);

//    console.log(newCommSendExercise);

//    var c = new ApkiOrg.CourseMgr.Course();
//    c.ID = 1;
//    c.title = 'Halo halo!';
//    c.lessonsPassed = [1, 2, 3];
//    c.lessonCurrent = 1;
//
//    c.lessons = new Array();
//    var newLess = new ApkiOrg.CourseMgr.Lesson();
//    newLess.achievement = null;
//    newLess.article = '<h1>HWDP JP 100%!</h1>';
//    newLess.ID = 0;
//    newLess.quizzes=[];
//    newLess.exercises = new Array();
//
//    var newExecrise = new ApkiOrg.CourseMgr.Exercise();
//    newExecrise.ID=777;
//    newExecrise.content_of_exercise='Zrób coś!';
//    newExecrise.lang = 'javascript';
//    newExecrise.code='heheheh';
//    newExecrise.code_locks = new Array();
//
//    var newAch = new ApkiOrg.CourseMgr.Achivement();
//    newAch.ID=1;
//    newAch.title='Heheszki';
//    newAch.points=100;
//
//    newExecrise.achievement = newAch;
//    newLess.exercises.push(newExecrise);
//    c.lessons.push(newLess);
//
//    var tekst = apkiOrg.helperObjectToJSON<ApkiOrg.CourseMgr.Course>(c);
//
//    console.log(tekst);
//
//    var newC = apkiOrg.helperObjectFromJSON<ApkiOrg.CourseMgr.Course>(tekst);
//
//    console.log(newC);
});