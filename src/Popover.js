"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var PopoverContent_1 = require("./PopoverContent");
var Popover = (function () {
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
        this.popoverOnHover = false;
        this.popoverDismissTimeout = 0;
        this.onShown = new core_1.EventEmitter();
        this.onHidden = new core_1.EventEmitter();
    }
    // -------------------------------------------------------------------------
    // Event listeners
    // -------------------------------------------------------------------------
    Popover.prototype.showOrHideOnClick = function () {
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
    Popover.prototype.toggle = function () {
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
            if (this.popoverInBody) {
                this.popover = factory.create(this.injector);
            }
            var popover = this.popover.instance;
            popover.popover = this;
            popover.content = this.content;
            if (this.popoverPlacement !== undefined)
                popover.placement = this.popoverPlacement;
            if (this.popoverAnimation !== undefined)
                popover.animation = this.popoverAnimation;
            if (this.popoverTitle !== undefined)
                popover.title = this.popoverTitle;
            if (this.popoverCloseOnClickOutside !== undefined)
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            if (this.popoverCloseOnMouseOutside !== undefined)
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;
            popover.onCloseFromOutside.subscribe(function () { return _this.hide(); });
            if (this.popoverInBody) {
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
    __decorate([
        core_1.Input("popover")
    ], Popover.prototype, "content");
    __decorate([
        core_1.Input()
    ], Popover.prototype, "popoverInBody");
    __decorate([
        core_1.Input()
    ], Popover.prototype, "popoverDisabled");
    __decorate([
        core_1.Input()
    ], Popover.prototype, "popoverAnimation");
    __decorate([
        core_1.Input()
    ], Popover.prototype, "popoverPlacement");
    __decorate([
        core_1.Input()
    ], Popover.prototype, "popoverTitle");
    __decorate([
        core_1.Input()
    ], Popover.prototype, "popoverOnHover");
    __decorate([
        core_1.Input()
    ], Popover.prototype, "popoverCloseOnClickOutside");
    __decorate([
        core_1.Input()
    ], Popover.prototype, "popoverCloseOnMouseOutside");
    __decorate([
        core_1.Input()
    ], Popover.prototype, "popoverDismissTimeout");
    __decorate([
        core_1.Output()
    ], Popover.prototype, "onShown");
    __decorate([
        core_1.Output()
    ], Popover.prototype, "onHidden");
    __decorate([
        core_1.HostListener("click")
    ], Popover.prototype, "showOrHideOnClick");
    __decorate([
        core_1.HostListener("focusin"),
        core_1.HostListener("mouseenter")
    ], Popover.prototype, "showOnHover");
    __decorate([
        core_1.HostListener("focusout"),
        core_1.HostListener("mouseleave")
    ], Popover.prototype, "hideOnHover");
    Popover = __decorate([
        core_1.Directive({
            selector: "[popover]",
            exportAs: "popover"
        })
    ], Popover);
    return Popover;
}());
exports.Popover = Popover;
