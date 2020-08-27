import { Component, Input, AfterViewInit, ElementRef, ChangeDetectorRef, OnDestroy, ViewChild, EventEmitter, Renderer2, } from "@angular/core";
import { Popover } from "./Popover";
export class PopoverContent {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(element, cdr, renderer) {
        this.element = element;
        this.cdr = cdr;
        this.renderer = renderer;
        this.placement = "bottom";
        this.animation = true;
        this.closeOnClickOutside = false;
        this.closeOnMouseOutside = false;
        this.onCloseFromOutside = new EventEmitter();
        this.top = -10000;
        this.left = -10000;
        this.isIn = false;
        this.displayType = "none";
        // -------------------------------------------------------------------------
        // Anonymous
        // -------------------------------------------------------------------------
        /**
           * Closes dropdown if user clicks outside of this directive.
           */
        this.onDocumentMouseDown = (event) => {
            const element = this.element.nativeElement;
            if (!element || !this.popover)
                return;
            if (element.contains(event.target) ||
                this.popover.getElement().contains(event.target))
                return;
            this.hide();
            this.onCloseFromOutside.emit(undefined);
        };
    }
    ngAfterViewInit() {
        if (this.closeOnClickOutside)
            this.listenClickFunc = this.renderer.listen("document", "mousedown", (event) => this.onDocumentMouseDown(event));
        if (this.closeOnMouseOutside)
            this.listenMouseFunc = this.renderer.listen("document", "mouseover", (event) => this.onDocumentMouseDown(event));
        this.show();
        this.cdr.detectChanges();
    }
    ngOnDestroy() {
        if (this.closeOnClickOutside)
            this.listenClickFunc();
        if (this.closeOnMouseOutside)
            this.listenMouseFunc();
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    show() {
        if (!this.popover || !this.popover.getElement() || !this.popover.content)
            return;
        const p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
        this.displayType = "block";
        this.top = p.top;
        this.left = p.left;
        this.isIn = true;
    }
    hide() {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
        this.popover.hide();
    }
    hideFromPopover() {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
    }
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    positionElements(hostEl, targetEl, positionStr, appendToBody = true) {
        let positionStrParts = positionStr.split("-");
        let pos0 = positionStrParts[0];
        let pos1 = positionStrParts[1] || "center";
        let hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        let targetElWidth = targetEl.offsetWidth;
        let targetElHeight = targetEl.offsetHeight;
        this.effectivePlacement = pos0 = this.getEffectivePlacement(pos0, hostEl, targetEl);
        let shiftWidth = {
            center: function () {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function () {
                return hostElPos.left;
            },
            right: function () {
                return hostElPos.left + hostElPos.width;
            },
        };
        let shiftHeight = {
            center: function () {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function () {
                return hostElPos.top;
            },
            bottom: function () {
                return hostElPos.top + hostElPos.height;
            },
        };
        let targetElPos;
        switch (pos0) {
            case "right":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0](),
                };
                break;
            case "left":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth,
                };
                break;
            case "bottom":
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1](),
                };
                break;
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1](),
                };
                break;
        }
        return targetElPos;
    }
    position(nativeEl) {
        let offsetParentBCR = { top: 0, left: 0 };
        const elBCR = this.offset(nativeEl);
        const offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document && !this.popover.popoverInBody) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top +=
                offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left +=
                offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left,
        };
    }
    offset(nativeEl) {
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top +
                (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left +
                (window.pageXOffset || window.document.documentElement.scrollLeft),
        };
    }
    getStyle(nativeEl, cssProp) {
        if (nativeEl.currentStyle)
            // IE
            return nativeEl.currentStyle[cssProp];
        if (window.getComputedStyle)
            return window.getComputedStyle(nativeEl)[cssProp];
        // finally try and get inline style
        return nativeEl.style[cssProp];
    }
    isStaticPositioned(nativeEl) {
        return (this.getStyle(nativeEl, "position") || "static") === "static";
    }
    parentOffsetEl(nativeEl) {
        let offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent &&
            offsetParent !== window.document &&
            this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }
    getEffectivePlacement(placement, hostElement, targetElement) {
        const placementParts = placement.split(" ");
        if (placementParts[0] !== "auto") {
            return placement;
        }
        const hostElBoundingRect = hostElement.getBoundingClientRect();
        const desiredPlacement = placementParts[1] || "bottom";
        if (desiredPlacement === "top" &&
            hostElBoundingRect.top - targetElement.offsetHeight < 0) {
            return "bottom";
        }
        if (desiredPlacement === "bottom" &&
            hostElBoundingRect.bottom + targetElement.offsetHeight >
                window.innerHeight) {
            return "top";
        }
        if (desiredPlacement === "left" &&
            hostElBoundingRect.left - targetElement.offsetWidth < 0) {
            return "right";
        }
        if (desiredPlacement === "right" &&
            hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
            return "left";
        }
        return desiredPlacement;
    }
}
PopoverContent.decorators = [
    { type: Component, args: [{
                selector: "popover-content",
                template: `
    <div
      #popoverDiv
      class="popover {{ effectivePlacement }}"
      [style.top]="top + 'px'"
      [style.left]="left + 'px'"
      [class.in]="isIn"
      [class.fade]="animation"
      style="display: block"
      role="popover"
    >
      <div [hidden]="!closeOnMouseOutside" class="virtual-area"></div>
      <div class="arrow"></div>
      <h3 class="popover-title" [hidden]="!title">{{ title }}</h3>
      <div class="popover-content">
        <ng-content></ng-content>
        <div [innerHtml]="content"></div>
      </div>
    </div>
  `,
                styles: [
                    `
      .popover .virtual-area {
        height: 11px;
        width: 100%;
        position: absolute;
      }
      .popover.top .virtual-area {
        bottom: -11px;
      }
      .popover.bottom .virtual-area {
        top: -11px;
      }
      .popover.left .virtual-area {
        right: -11px;
      }
      .popover.right .virtual-area {
        left: -11px;
      }
    `,
                ],
            },] },
];
/** @nocollapse */
PopoverContent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: Renderer2, },
];
PopoverContent.propDecorators = {
    "content": [{ type: Input },],
    "inBody": [{ type: Input },],
    "popoverInBody": [{ type: Input },],
    "placement": [{ type: Input },],
    "title": [{ type: Input },],
    "animation": [{ type: Input },],
    "closeOnClickOutside": [{ type: Input },],
    "closeOnMouseOutside": [{ type: Input },],
    "popoverDiv": [{ type: ViewChild, args: ["popoverDiv",] },],
};
//# sourceMappingURL=PopoverContent.js.map