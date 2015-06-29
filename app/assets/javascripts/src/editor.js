///<reference path="../vendor/jquery/jquery.d.ts" />
///<reference path="../vendor/angularjs/angular.d.ts" />
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            template: '<h1>My first Angular 2 App</h1>'
        })
    ], AppComponent);
    return AppComponent;
})();
angular2_1.bootstrap(AppComponent);
var Editor;
(function (Editor) {
    var EditorManager = (function () {
        function EditorManager(divId, langId) {
            this._disabled_ranges = Array();
            ace.config.set("basePath", "/ace");
            this.div = $('#' + divId);
            this.ace = ace.edit(divId);
            this.ace.setTheme("ace/theme/monokai");
            this.ace.getSession().setMode("ace/mode/" + langId);
            this.ace.$blockScrolling = Infinity;
        }
        EditorManager.prototype.disableRange = function (sRow, sCol, eRow, eCol) {
            var _this = this;
            var session = this.ace.getSession(), Range = ace.require('ace/range').Range, range = new Range(sRow, sCol, eRow, eCol), markerId = session.addMarker(range, "readonly-highlight");
            this.ace.setOption("dragEnabled", false); //Required to disable cheat
            this.ace.keyBinding.addKeyboardHandler({
                handleKeyboard: function (data, hash, keyString, keyCode, event) {
                    if (hash === -1 || (keyCode <= 40 && keyCode >= 37))
                        return false;
                    if (_this._intersects_ace_disabled(range)) {
                        return { command: "null", passEvent: false };
                    }
                }
            });
            this._before_ace_disabled(this.ace, 'onPaste', this._preventReadonly_ace_disabled.bind(this));
            this._before_ace_disabled(this.ace, 'onCut', this._preventReadonly_ace_disabled.bind(this));
            range.start = session.doc.createAnchor(range.start);
            range.end = session.doc.createAnchor(range.end);
            range.end.$insertRight = true;
            this._disabled_ranges.push(range);
        };
        EditorManager.prototype._before_ace_disabled = function (obj, method, wrapper) {
            var orig = obj[method];
            obj[method] = function () {
                var args = Array.prototype.slice.call(arguments);
                return wrapper.apply(this, function () {
                    return orig.apply(obj, args);
                });
            };
            return obj[method];
        };
        EditorManager.prototype._intersects_ace_disabled = function (range) {
            return this.ace.getSelectionRange().intersects(range);
        };
        EditorManager.prototype._preventReadonly_ace_disabled = function (next) {
            if (this._disabled_ranges.length == 0)
                next();
            else {
                for (var i = 0; i < this._disabled_ranges.length; i++) {
                    if (this._intersects_ace_disabled(this._disabled_ranges[i]))
                        return;
                }
                next();
            }
        };
        return EditorManager;
    })();
    Editor.EditorManager = EditorManager;
})(Editor || (Editor = {}));
//# sourceMappingURL=editor.js.map