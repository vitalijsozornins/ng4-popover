"use strict";
/**
* @fileoverview This file is generated by the Angular template compiler.
* Do not edit.
* @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
* tslint:disable
*/ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = require("@angular/core");
var i1 = require("./PopoverContent");
var styles_PopoverContent = [".popover[_ngcontent-%COMP%]   .virtual-area[_ngcontent-%COMP%] {\n    height: 11px;\n    width: 100%;\n    position: absolute;\n}\n.popover.top[_ngcontent-%COMP%]   .virtual-area[_ngcontent-%COMP%] {\n    bottom: -11px;\n}\n.popover.bottom[_ngcontent-%COMP%]   .virtual-area[_ngcontent-%COMP%] {\n    top: -11px;\n}\n.popover.left[_ngcontent-%COMP%]   .virtual-area[_ngcontent-%COMP%] {\n    right: -11px;\n}\n.popover.right[_ngcontent-%COMP%]   .virtual-area[_ngcontent-%COMP%] {\n    left: -11px;\n}"];
var RenderType_PopoverContent = i0.ɵcrt({ encapsulation: 0, styles: styles_PopoverContent, data: {} });
exports.RenderType_PopoverContent = RenderType_PopoverContent;
function View_PopoverContent_0(_l) { return i0.ɵvid(0, [i0.ɵqud(402653184, 1, { popoverDiv: 0 }), (_l()(), i0.ɵted(-1, null, ["\n"])), (_l()(), i0.ɵeld(2, 0, [[1, 0], ["popoverDiv", 1]], null, 15, "div", [["role", "popover"], ["style", "display: block"]], [[8, "className", 0], [4, "top", null], [4, "left", null], [2, "in", null], [2, "fade", null]], null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(4, 0, null, null, 0, "div", [["class", "virtual-area"]], [[8, "hidden", 0]], null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(6, 0, null, null, 0, "div", [["class", "arrow"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(8, 0, null, null, 1, "h3", [["class", "popover-title"]], [[8, "hidden", 0]], null, null, null, null)), (_l()(), i0.ɵted(9, null, ["", ""])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(11, 0, null, null, 5, "div", [["class", "popover-content"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n        "])), i0.ɵncd(null, 0), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(15, 0, null, null, 0, "div", [], [[8, "innerHTML", 1]], null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n"])), (_l()(), i0.ɵted(-1, null, ["\n"]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵinlineInterpolate(1, "popover ", _co.effectivePlacement, ""); var currVal_1 = (_co.top + "px"); var currVal_2 = (_co.left + "px"); var currVal_3 = _co.isIn; var currVal_4 = _co.animation; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4); var currVal_5 = !_co.closeOnMouseOutside; _ck(_v, 4, 0, currVal_5); var currVal_6 = !_co.title; _ck(_v, 8, 0, currVal_6); var currVal_7 = _co.title; _ck(_v, 9, 0, currVal_7); var currVal_8 = _co.content; _ck(_v, 15, 0, currVal_8); }); }
exports.View_PopoverContent_0 = View_PopoverContent_0;
function View_PopoverContent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "popover-content", [], null, null, null, View_PopoverContent_0, RenderType_PopoverContent)), i0.ɵdid(1, 4374528, null, 0, i1.PopoverContent, [i0.ElementRef, i0.ChangeDetectorRef, i0.Renderer], null, null)], null, null); }
exports.View_PopoverContent_Host_0 = View_PopoverContent_Host_0;
var PopoverContentNgFactory = i0.ɵccf("popover-content", i1.PopoverContent, View_PopoverContent_Host_0, { content: "content", inBody: "inBody", popoverInBody: "popoverInBody", placement: "placement", title: "title", animation: "animation", closeOnClickOutside: "closeOnClickOutside", closeOnMouseOutside: "closeOnMouseOutside" }, {}, ["*"]);
exports.PopoverContentNgFactory = PopoverContentNgFactory;
//# sourceMappingURL=PopoverContent.ngfactory.js.map