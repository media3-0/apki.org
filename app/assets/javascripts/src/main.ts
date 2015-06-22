///<reference path="../vendor/jquery.d.ts" />
///<reference path="editor.ts" />

module ApkiOrg {
    export class ApkiOrg {
        private editor:Editor.EditorManager;
        constructor() {

        }
        initEditor(langId:string){
            this.editor = new Editor.EditorManager('editorTest', langId);
        }
        getEditor(): Editor.EditorManager{
            return this.editor;
        }
        helperImageCircle(element:any, imgSrc:string, widthAndHeight:number){
            jQuery(element).addClass('circular').css({
                'background-image':'url('+imgSrc+')',
                'border-radius':Math.round(widthAndHeight/2)+'px',
                'width':widthAndHeight+'px',
                'height':widthAndHeight+'px'
            });
        }
    }

}

declare var apkiOrg;

jQuery(function(){
    apkiOrg = new ApkiOrg.ApkiOrg();

    //Layout:
    apkiOrg.helperImageCircle('#loginImage', jQuery('#loginImage').data('src'), 35);

});