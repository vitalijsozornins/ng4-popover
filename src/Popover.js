"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PopoverContent_1 = require("./PopoverContent");
var Popover = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function Popover(viewContainerRef, resolver, applicationRef, injector) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.PopoverComponent = PopoverContent_1.PopoverContent;
        this.popoverInBody = true;
        this.popoverOnHover = false;
        this.popoverDismissTimeout = 0;
        this.onShown = new core_1.EventEmitter();
        this.onHidden = new core_1.EventEmitter();
    }
    // -------------------------------------------------------------------------
    // Event listeners
    // -------------------------------------------------------------------------
    Popover.prototype.showOrHideOnClick = 
    // -------------------------------------------------------------------------
    // Event listeners
    // -------------------------------------------------------------------------
    function () {
        if (this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.toggle();
    };
    Popover.prototype.showOnHover = function () {
        if (!this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.show();
    };
    Popover.prototype.hideOnHover = function () {
        if (this.popoverCloseOnMouseOutside)
            return; // don't do anything since not we control this
        if (!this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.hide();
    };
    Popover.prototype.ngOnChanges = function (changes) {
        if (changes["popoverDisabled"]) {
            if (changes["popoverDisabled"].currentValue) {
                this.hide();
            }
        }
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    Popover.prototype.toggle = 
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    function () {
        if (!this.visible) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    Popover.prototype.show = function () {
        var _this = this;
        if (this.visible)
            return;
        this.visible = true;
        if (typeof this.content === "string") {
            var factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible)
                return;
            this.popover = this.viewContainerRef.createComponent(factory);
            if (this.popoverInBody || this.popoverInBody === undefined) {
                this.popover = factory.create(this.injector);
            }
            var popover = this.popover.instance;
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
            popover.onCloseFromOutside.subscribe(function () { return _this.hide(); });
            if (this.popoverInBody || this.popoverInBody === undefined) {
                this.applicationRef.attachView(this.popover.hostView);
                // Get DOM element from component
                var domElem = this.popover.hostView
                    .rootNodes[0];
                // Append DOM element to the body
                document.getElementsByTagName('app')[0].appendChild(domElem);
            }
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(function () { return _this.hide(); }, this.popoverDismissTimeout);
        }
        else {
            var popover = this.content;
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
            popover.onCloseFromOutside.subscribe(function () { return _this.hide(); });
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(function () { return _this.hide(); }, this.popoverDismissTimeout);
            popover.show();
        }
        this.onShown.emit(this);
    };
    Popover.prototype.hide = function () {
        if (!this.visible)
            return;
        this.visible = false;
        if (this.popover)
            this.popover.destroy();
        if (this.content instanceof PopoverContent_1.PopoverContent)
            this.content.hideFromPopover();
        this.onHidden.emit(this);
    };
    Popover.prototype.getElement = function () {
        return this.viewContainerRef.element.nativeElement;
    };
    Popover.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[popover]",
                    exportAs: "popover"
                },] },
    ];
    /** @nocollapse */
    Popover.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ApplicationRef, },
        { type: core_1.Injector, },
    ]; };
    Popover.propDecorators = {
        "content": [{ type: core_1.Input, args: ["popover",] },],
        "popoverInBody": [{ type: core_1.Input },],
        "popoverDisabled": [{ type: core_1.Input },],
        "popoverAnimation": [{ type: core_1.Input },],
        "popoverPlacement": [{ type: core_1.Input },],
        "popoverTitle": [{ type: core_1.Input },],
        "popoverOnHover": [{ type: core_1.Input },],
        "popoverCloseOnClickOutside": [{ type: core_1.Input },],
        "popoverCloseOnMouseOutside": [{ type: core_1.Input },],
        "popoverDismissTimeout": [{ type: core_1.Input },],
        "onShown": [{ type: core_1.Output },],
        "onHidden": [{ type: core_1.Output },],
        "showOrHideOnClick": [{ type: core_1.HostListener, args: ["click",] },],
        "showOnHover": [{ type: core_1.HostListener, args: ["focusin",] }, { type: core_1.HostListener, args: ["mouseenter",] },],
        "hideOnHover": [{ type: core_1.HostListener, args: ["focusout",] }, { type: core_1.HostListener, args: ["mouseleave",] },],
    };
    return Popover;
}());
exports.Popover = Popover;
//# sourceMappingURL=Popover.js.map