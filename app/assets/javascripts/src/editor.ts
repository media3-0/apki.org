///<reference path="../vendor/jquery.d.ts" />

declare var ace: any; //Reference to ACE

module Editor {
    export class EditorManager {
        private div:JQuery;
        private ace:any;
        private _disabled_ranges:any[] = Array();
        constructor(divId, langId: string) {
            this.div = $('#'+divId);
            this.ace = ace.edit(divId);
            this.ace.setTheme("ace/theme/monokai");
            this.ace.getSession().setMode("ace/mode/"+langId);
            this.ace.$blockScrolling = Infinity;
        }
        disableRange(sRow,sCol,eRow,eCol:number){
            var session  = this.ace.getSession()
                , Range    = ace.require('ace/range').Range
                , range    = new Range(sRow,sCol,eRow,eCol)
                , markerId = session.addMarker(range, "readonly-highlight");

            this.ace.setOption("dragEnabled", false); //Required to disable cheat

            this.ace.keyBinding.addKeyboardHandler({
                handleKeyboard : (data, hash, keyString, keyCode, event):any => {
                        if (hash === -1 || (keyCode <= 40 && keyCode >= 37)) return false;

                        if (this._intersects_ace_disabled(range)) {
                            return {command:"null", passEvent:false};
                        }
                    }
            });

            this._before_ace_disabled(this.ace, 'onPaste', this._preventReadonly_ace_disabled.bind(this));
            this._before_ace_disabled(this.ace, 'onCut',   this._preventReadonly_ace_disabled.bind(this));

            range.start  = session.doc.createAnchor(range.start);
            range.end    = session.doc.createAnchor(range.end);
            range.end.$insertRight = true;

            this._disabled_ranges.push(range);
        }

        private _before_ace_disabled(obj, method, wrapper) {
            var orig = obj[method];
            obj[method] = function() {
                var args = Array.prototype.slice.call(arguments);
                return wrapper.apply(this, function(){
                    return orig.apply(obj, args);
                });
            }

            return obj[method];
        }

        private _intersects_ace_disabled(range) {
            return this.ace.getSelectionRange().intersects(range);
        }

        private _preventReadonly_ace_disabled(next) {
            if (this._disabled_ranges.length==0)
                next();
            else {
                for(var i=0; i<this._disabled_ranges.length; i++){
                    if (this._intersects_ace_disabled(this._disabled_ranges[i]))
                        return;
                }
                next();
            }
        }
    }
}