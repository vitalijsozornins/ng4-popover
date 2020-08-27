import { Directive, HostListener, ComponentRef, EmbeddedViewRef, ViewContainerRef, Injector, ApplicationRef, ComponentFactoryResolver, ComponentFactory, Input, OnChanges, SimpleChange, Output, EventEmitter } from "@angular/core";
import { PopoverContent } from "./PopoverContent";
export class Popover {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(viewContainerRef, resolver, applicationRef, injector) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.PopoverComponent = PopoverContent;
        this.popoverInBody = true;
        this.popoverOnHover = false;
        this.popoverDismissTimeout = 0;
        this.onShown = new EventEmitter();
        this.onHidden = new EventEmitter();
    }
    // -------------------------------------------------------------------------
    // Event listeners
    // -------------------------------------------------------------------------
    showOrHideOnClick() {
        if (this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.toggle();
    }
    showOnHover() {
        if (!this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.show();
    }
    hideOnHover() {
        if (this.popoverCloseOnMouseOutside)
            return; // don't do anything since not we control this
        if (!this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.hide();
    }
    ngOnChanges(changes) {
        if (changes["popoverDisabled"]) {
            if (changes["popoverDisabled"].currentValue) {
                this.hide();
            }
        }
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    toggle() {
        if (!this.visible) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    show() {
        if (this.visible)
            return;
        this.visible = true;
        if (typeof this.content === "string") {
            const factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible)
                return;
            this.popover = this.viewContainerRef.createComponent(factory);
            if (this.popoverInBody || this.popoverInBody === undefined) {
                this.popover = factory.create(this.injector);
            }
            const popover = this.popover.instance;
            popover.popover = this;
            popover.content = this.content;
            if (this.popoverPlacement !== undefined)
                popover.placement = this.popoverPlacement;
            if (this.popoverInBody || this.popoverInBody === undefined)
                popover.popoverInBody = this.popoverInBody;
            if (this.popoverAnimation !== undefined)
                popover.animation = this.popoverAnimation;
            if (this.popoverTitle !== undefined)
                popover.title = this.popoverTitle;
            if (this.popoverCloseOnClickOutside !== undefined)
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            if (this.popoverCloseOnMouseOutside !== undefined)
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;
            popover.onCloseFromOutside.subscribe(() => this.hide());
            if (this.popoverInBody || this.popoverInBody === undefined) {
                this.applicationRef.attachView(this.popover.hostView);
                // Get DOM element from component
                const domElem = this.popover.hostView
                    .rootNodes[0];
                // Append DOM element to the body
                if (document.getElementsByTagName("app").length > 0) {
                    document.getElementsByTagName("app")[0].appendChild(domElem);
                }
                else {
                    document.getElementsByTagName("app-root")[0].appendChild(domElem);
                }
            }
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
        }
        else {
            const popover = this.content;
            popover.popover = this;
            if (this.popoverPlacement !== undefined)
                popover.placement = this.popoverPlacement;
            if (this.popoverInBody)
                popover.popoverInBody = this.popoverInBody;
            if (this.popoverAnimation !== undefined)
                popover.animation = this.popoverAnimation;
            if (this.popoverTitle !== undefined)
                popover.title = this.popoverTitle;
            if (this.popoverCloseOnClickOutside !== undefined)
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            if (this.popoverCloseOnMouseOutside !== undefined)
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;
            popover.onCloseFromOutside.subscribe(() => this.hide());
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
            popover.show();
        }
        this.onShown.emit(this);
    }
    hide() {
        if (!this.visible)
            return;
        this.visible = false;
        if (this.popover)
            this.popover.destroy();
        if (this.content instanceof PopoverContent)
            this.content.hideFromPopover();
        this.onHidden.emit(this);
    }
    getElement() {
        return this.viewContainerRef.element.nativeElement;
    }
}
Popover.decorators = [
    { type: Directive, args: [{
                selector: "[popover]",
                exportAs: "popover"
            },] },
];
/** @nocollapse */
Popover.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
    { type: ApplicationRef, },
    { type: Injector, },
];
Popover.propDecorators = {
    "content": [{ type: Input, args: ["popover",] },],
    "popoverInBody": [{ type: Input },],
    "popoverDisabled": [{ type: Input },],
    "popoverAnimation": [{ type: Input },],
    "popoverPlacement": [{ type: Input },],
    "popoverTitle": [{ type: Input },],
    "popoverOnHover": [{ type: Input },],
    "popoverCloseOnClickOutside": [{ type: Input },],
    "popoverCloseOnMouseOutside": [{ type: Input },],
    "popoverDismissTimeout": [{ type: Input },],
    "onShown": [{ type: Output },],
    "onHidden": [{ type: Output },],
    "showOrHideOnClick": [{ type: HostListener, args: ["click",] },],
    "showOnHover": [{ type: HostListener, args: ["focusin",] }, { type: HostListener, args: ["mouseenter",] },],
    "hideOnHover": [{ type: HostListener, args: ["focusout",] }, { type: HostListener, args: ["mouseleave",] },],
};
//# sourceMappingURL=Popover.js.map