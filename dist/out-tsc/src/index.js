import { CommonModule } from "@angular/common";
import { Popover } from "./Popover";
import { PopoverContent } from "./PopoverContent";
import { NgModule } from "@angular/core";
export * from "./Popover";
export * from "./PopoverContent";
export class PopoverModule {
}
PopoverModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    PopoverContent,
                    Popover,
                ],
                exports: [
                    PopoverContent,
                    Popover,
                ],
                entryComponents: [
                    PopoverContent
                ]
            },] },
];
/** @nocollapse */
PopoverModule.ctorParameters = () => [];
//# sourceMappingURL=index.js.map