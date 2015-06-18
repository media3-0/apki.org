///<reference path="../vendor/jquery.d.ts" />
///<reference path="editor.ts" />

module ApkiOrg {
    export class ApkiOrg {
        private editor:Editor.EditorManager;
        constructor() {

        }
        initEditor(langId:string){
            this.editor = new Editor.EditorManager('hello', langId);
        }
        getEditor(): Editor.EditorManager{
            return this.editor;
        }
    }

}

declare var apkiOrg;

jQuery(function(){
    apkiOrg = new ApkiOrg.ApkiOrg();
});