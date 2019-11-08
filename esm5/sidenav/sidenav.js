/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, forwardRef, Inject, Input, ViewEncapsulation, QueryList, ElementRef, NgZone, } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MAT_DRAWER_CONTAINER } from './drawer';
import { matDrawerAnimations } from './drawer-animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
var MatSidenavContent = /** @class */ (function (_super) {
    __extends(MatSidenavContent, _super);
    function MatSidenavContent(changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) {
        return _super.call(this, changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) || this;
    }
    MatSidenavContent.decorators = [
        { type: Component, args: [{
                    selector: 'mat-sidenav-content',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-drawer-content mat-sidenav-content',
                        '[style.margin-left.px]': '_container._contentMargins.left',
                        '[style.margin-right.px]': '_container._contentMargins.right',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    MatSidenavContent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: MatSidenavContainer, decorators: [{ type: Inject, args: [forwardRef(function () { return MatSidenavContainer; }),] }] },
        { type: ElementRef },
        { type: ScrollDispatcher },
        { type: NgZone }
    ]; };
    return MatSidenavContent;
}(MatDrawerContent));
export { MatSidenavContent };
var MatSidenav = /** @class */ (function (_super) {
    __extends(MatSidenav, _super);
    function MatSidenav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._fixedInViewport = false;
        _this._fixedTopGap = 0;
        _this._fixedBottomGap = 0;
        return _this;
    }
    Object.defineProperty(MatSidenav.prototype, "fixedInViewport", {
        /** Whether the sidenav is fixed in the viewport. */
        get: function () { return this._fixedInViewport; },
        set: function (value) { this._fixedInViewport = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSidenav.prototype, "fixedTopGap", {
        /**
         * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
         * mode.
         */
        get: function () { return this._fixedTopGap; },
        set: function (value) { this._fixedTopGap = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSidenav.prototype, "fixedBottomGap", {
        /**
         * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
         * fixed mode.
         */
        get: function () { return this._fixedBottomGap; },
        set: function (value) { this._fixedBottomGap = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    MatSidenav.decorators = [
        { type: Component, args: [{
                    selector: 'mat-sidenav',
                    exportAs: 'matSidenav',
                    template: "<div class=\"mat-drawer-inner-container\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                    animations: [matDrawerAnimations.transformDrawer],
                    host: {
                        'class': 'mat-drawer mat-sidenav',
                        'tabIndex': '-1',
                        // must prevent the browser from aligning text based on value
                        '[attr.align]': 'null',
                        '[class.mat-drawer-end]': 'position === "end"',
                        '[class.mat-drawer-over]': 'mode === "over"',
                        '[class.mat-drawer-push]': 'mode === "push"',
                        '[class.mat-drawer-side]': 'mode === "side"',
                        '[class.mat-drawer-opened]': 'opened',
                        '[class.mat-sidenav-fixed]': 'fixedInViewport',
                        '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
                        '[style.bottom.px]': 'fixedInViewport ? fixedBottomGap : null',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    MatSidenav.propDecorators = {
        fixedInViewport: [{ type: Input }],
        fixedTopGap: [{ type: Input }],
        fixedBottomGap: [{ type: Input }]
    };
    return MatSidenav;
}(MatDrawer));
export { MatSidenav };
var MatSidenavContainer = /** @class */ (function (_super) {
    __extends(MatSidenavContainer, _super);
    function MatSidenavContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatSidenavContainer.decorators = [
        { type: Component, args: [{
                    selector: 'mat-sidenav-container',
                    exportAs: 'matSidenavContainer',
                    template: "<div class=\"mat-drawer-backdrop\" (click)=\"_onBackdropClicked()\" *ngIf=\"hasBackdrop\"\n     [class.mat-drawer-shown]=\"_isShowingBackdrop()\"></div>\n\n<ng-content select=\"mat-sidenav\"></ng-content>\n\n<ng-content select=\"mat-sidenav-content\">\n</ng-content>\n<mat-sidenav-content *ngIf=\"!_content\" cdkScrollable>\n  <ng-content></ng-content>\n</mat-sidenav-content>\n",
                    host: {
                        'class': 'mat-drawer-container mat-sidenav-container',
                        '[class.mat-drawer-container-explicit-backdrop]': '_backdropOverride',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [{
                            provide: MAT_DRAWER_CONTAINER,
                            useExisting: MatSidenavContainer
                        }],
                    styles: [".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer{transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}\n"]
                }] }
    ];
    MatSidenavContainer.propDecorators = {
        _allDrawers: [{ type: ContentChildren, args: [MatSidenav, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }],
        _content: [{ type: ContentChild, args: [MatSidenavContent,] }]
    };
    return MatSidenavContainer;
}(MatDrawerContainer));
export { MatSidenavContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zaWRlbmF2L3NpZGVuYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQy9GLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2xGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBR3hEO0lBV3VDLHFDQUFnQjtJQUNyRCwyQkFDSSxpQkFBb0MsRUFDVyxTQUE4QixFQUM3RSxVQUFtQyxFQUNuQyxnQkFBa0MsRUFDbEMsTUFBYztlQUNoQixrQkFBTSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQztJQUMzRSxDQUFDOztnQkFuQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsd0NBQXdDO3dCQUNqRCx3QkFBd0IsRUFBRSxpQ0FBaUM7d0JBQzNELHlCQUF5QixFQUFFLGtDQUFrQztxQkFDOUQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0Qzs7OztnQkE1QkMsaUJBQWlCO2dCQWdDNkMsbUJBQW1CLHVCQUE1RSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxtQkFBbUIsRUFBbkIsQ0FBbUIsQ0FBQztnQkF2QmpELFVBQVU7Z0JBTUosZ0JBQWdCO2dCQUx0QixNQUFNOztJQTRCUix3QkFBQztDQUFBLEFBcEJELENBV3VDLGdCQUFnQixHQVN0RDtTQVRZLGlCQUFpQjtBQVk5QjtJQXNCZ0MsOEJBQVM7SUF0QnpDO1FBQUEscUVBcURDO1FBMUJTLHNCQUFnQixHQUFHLEtBQUssQ0FBQztRQVN6QixrQkFBWSxHQUFHLENBQUMsQ0FBQztRQVNqQixxQkFBZSxHQUFHLENBQUMsQ0FBQzs7SUFROUIsQ0FBQztJQTdCQyxzQkFDSSx1Q0FBZTtRQUZuQixvREFBb0Q7YUFDcEQsY0FDaUMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2FBQ2hFLFVBQW9CLEtBQUssSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FEcEI7SUFRaEUsc0JBQ0ksbUNBQVc7UUFMZjs7O1dBR0c7YUFDSCxjQUM0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQ3ZELFVBQWdCLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BRHBCO0lBUXZELHNCQUNJLHNDQUFjO1FBTGxCOzs7V0FHRzthQUNILGNBQytCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7YUFDN0QsVUFBbUIsS0FBSyxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FEcEI7O2dCQTNDOUQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsbUdBQTBCO29CQUMxQixVQUFVLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUM7b0JBQ2pELElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsd0JBQXdCO3dCQUNqQyxVQUFVLEVBQUUsSUFBSTt3QkFDaEIsNkRBQTZEO3dCQUM3RCxjQUFjLEVBQUUsTUFBTTt3QkFDdEIsd0JBQXdCLEVBQUUsb0JBQW9CO3dCQUM5Qyx5QkFBeUIsRUFBRSxpQkFBaUI7d0JBQzVDLHlCQUF5QixFQUFFLGlCQUFpQjt3QkFDNUMseUJBQXlCLEVBQUUsaUJBQWlCO3dCQUM1QywyQkFBMkIsRUFBRSxRQUFRO3dCQUNyQywyQkFBMkIsRUFBRSxpQkFBaUI7d0JBQzlDLGdCQUFnQixFQUFFLHNDQUFzQzt3QkFDeEQsbUJBQW1CLEVBQUUseUNBQXlDO3FCQUMvRDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3RDOzs7a0NBR0UsS0FBSzs4QkFTTCxLQUFLO2lDQVNMLEtBQUs7O0lBV1IsaUJBQUM7Q0FBQSxBQXJERCxDQXNCZ0MsU0FBUyxHQStCeEM7U0EvQlksVUFBVTtBQWtDdkI7SUFpQnlDLHVDQUFrQjtJQWpCM0Q7O0lBNkJBLENBQUM7O2dCQTdCQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0Isc1lBQXFDO29CQUVyQyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLDRDQUE0Qzt3QkFDckQsZ0RBQWdELEVBQUUsbUJBQW1CO3FCQUN0RTtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDOzRCQUNWLE9BQU8sRUFBRSxvQkFBb0I7NEJBQzdCLFdBQVcsRUFBRSxtQkFBbUI7eUJBQ2pDLENBQUM7O2lCQUVIOzs7OEJBRUUsZUFBZSxTQUFDLFVBQVUsRUFBRTt3QkFDM0IsdUVBQXVFO3dCQUN2RSw4Q0FBOEM7d0JBQzlDLFdBQVcsRUFBRSxJQUFJO3FCQUNsQjsyQkFHQSxZQUFZLFNBQUMsaUJBQWlCOztJQUlqQywwQkFBQztDQUFBLEFBN0JELENBaUJ5QyxrQkFBa0IsR0FZMUQ7U0FaWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgUXVlcnlMaXN0LFxuICBFbGVtZW50UmVmLFxuICBOZ1pvbmUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREcmF3ZXIsIE1hdERyYXdlckNvbnRhaW5lciwgTWF0RHJhd2VyQ29udGVudCwgTUFUX0RSQVdFUl9DT05UQUlORVJ9IGZyb20gJy4vZHJhd2VyJztcbmltcG9ydCB7bWF0RHJhd2VyQW5pbWF0aW9uc30gZnJvbSAnLi9kcmF3ZXItYW5pbWF0aW9ucyc7XG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1Njcm9sbERpc3BhdGNoZXJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zaWRlbmF2LWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1kcmF3ZXItY29udGVudCBtYXQtc2lkZW5hdi1jb250ZW50JyxcbiAgICAnW3N0eWxlLm1hcmdpbi1sZWZ0LnB4XSc6ICdfY29udGFpbmVyLl9jb250ZW50TWFyZ2lucy5sZWZ0JyxcbiAgICAnW3N0eWxlLm1hcmdpbi1yaWdodC5weF0nOiAnX2NvbnRhaW5lci5fY29udGVudE1hcmdpbnMucmlnaHQnLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2lkZW5hdkNvbnRlbnQgZXh0ZW5kcyBNYXREcmF3ZXJDb250ZW50IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWF0U2lkZW5hdkNvbnRhaW5lcikpIGNvbnRhaW5lcjogTWF0U2lkZW5hdkNvbnRhaW5lcixcbiAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgIG5nWm9uZTogTmdab25lKSB7XG4gICAgc3VwZXIoY2hhbmdlRGV0ZWN0b3JSZWYsIGNvbnRhaW5lciwgZWxlbWVudFJlZiwgc2Nyb2xsRGlzcGF0Y2hlciwgbmdab25lKTtcbiAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zaWRlbmF2JyxcbiAgZXhwb3J0QXM6ICdtYXRTaWRlbmF2JyxcbiAgdGVtcGxhdGVVcmw6ICdkcmF3ZXIuaHRtbCcsXG4gIGFuaW1hdGlvbnM6IFttYXREcmF3ZXJBbmltYXRpb25zLnRyYW5zZm9ybURyYXdlcl0sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWRyYXdlciBtYXQtc2lkZW5hdicsXG4gICAgJ3RhYkluZGV4JzogJy0xJyxcbiAgICAvLyBtdXN0IHByZXZlbnQgdGhlIGJyb3dzZXIgZnJvbSBhbGlnbmluZyB0ZXh0IGJhc2VkIG9uIHZhbHVlXG4gICAgJ1thdHRyLmFsaWduXSc6ICdudWxsJyxcbiAgICAnW2NsYXNzLm1hdC1kcmF3ZXItZW5kXSc6ICdwb3NpdGlvbiA9PT0gXCJlbmRcIicsXG4gICAgJ1tjbGFzcy5tYXQtZHJhd2VyLW92ZXJdJzogJ21vZGUgPT09IFwib3ZlclwiJyxcbiAgICAnW2NsYXNzLm1hdC1kcmF3ZXItcHVzaF0nOiAnbW9kZSA9PT0gXCJwdXNoXCInLFxuICAgICdbY2xhc3MubWF0LWRyYXdlci1zaWRlXSc6ICdtb2RlID09PSBcInNpZGVcIicsXG4gICAgJ1tjbGFzcy5tYXQtZHJhd2VyLW9wZW5lZF0nOiAnb3BlbmVkJyxcbiAgICAnW2NsYXNzLm1hdC1zaWRlbmF2LWZpeGVkXSc6ICdmaXhlZEluVmlld3BvcnQnLFxuICAgICdbc3R5bGUudG9wLnB4XSc6ICdmaXhlZEluVmlld3BvcnQgPyBmaXhlZFRvcEdhcCA6IG51bGwnLFxuICAgICdbc3R5bGUuYm90dG9tLnB4XSc6ICdmaXhlZEluVmlld3BvcnQgPyBmaXhlZEJvdHRvbUdhcCA6IG51bGwnLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2lkZW5hdiBleHRlbmRzIE1hdERyYXdlciB7XG4gIC8qKiBXaGV0aGVyIHRoZSBzaWRlbmF2IGlzIGZpeGVkIGluIHRoZSB2aWV3cG9ydC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGZpeGVkSW5WaWV3cG9ydCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2ZpeGVkSW5WaWV3cG9ydDsgfVxuICBzZXQgZml4ZWRJblZpZXdwb3J0KHZhbHVlKSB7IHRoaXMuX2ZpeGVkSW5WaWV3cG9ydCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgcHJpdmF0ZSBfZml4ZWRJblZpZXdwb3J0ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBnYXAgYmV0d2VlbiB0aGUgdG9wIG9mIHRoZSBzaWRlbmF2IGFuZCB0aGUgdG9wIG9mIHRoZSB2aWV3cG9ydCB3aGVuIHRoZSBzaWRlbmF2IGlzIGluIGZpeGVkXG4gICAqIG1vZGUuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgZml4ZWRUb3BHYXAoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2ZpeGVkVG9wR2FwOyB9XG4gIHNldCBmaXhlZFRvcEdhcCh2YWx1ZSkgeyB0aGlzLl9maXhlZFRvcEdhcCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTsgfVxuICBwcml2YXRlIF9maXhlZFRvcEdhcCA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBnYXAgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoZSBzaWRlbmF2IGFuZCB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydCB3aGVuIHRoZSBzaWRlbmF2IGlzIGluXG4gICAqIGZpeGVkIG1vZGUuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgZml4ZWRCb3R0b21HYXAoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2ZpeGVkQm90dG9tR2FwOyB9XG4gIHNldCBmaXhlZEJvdHRvbUdhcCh2YWx1ZSkgeyB0aGlzLl9maXhlZEJvdHRvbUdhcCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTsgfVxuICBwcml2YXRlIF9maXhlZEJvdHRvbUdhcCA9IDA7XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkSW5WaWV3cG9ydDogYm9vbGVhbiB8IHN0cmluZztcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkVG9wR2FwOiBudW1iZXIgfCBzdHJpbmc7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maXhlZEJvdHRvbUdhcDogbnVtYmVyIHwgc3RyaW5nO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZUNsb3NlOiBib29sZWFuIHwgc3RyaW5nO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0ZvY3VzOiBib29sZWFuIHwgc3RyaW5nO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3BlbmVkOiBib29sZWFuIHwgc3RyaW5nO1xufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zaWRlbmF2LWNvbnRhaW5lcicsXG4gIGV4cG9ydEFzOiAnbWF0U2lkZW5hdkNvbnRhaW5lcicsXG4gIHRlbXBsYXRlVXJsOiAnc2lkZW5hdi1jb250YWluZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydkcmF3ZXIuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWRyYXdlci1jb250YWluZXIgbWF0LXNpZGVuYXYtY29udGFpbmVyJyxcbiAgICAnW2NsYXNzLm1hdC1kcmF3ZXItY29udGFpbmVyLWV4cGxpY2l0LWJhY2tkcm9wXSc6ICdfYmFja2Ryb3BPdmVycmlkZScsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogTUFUX0RSQVdFUl9DT05UQUlORVIsXG4gICAgdXNlRXhpc3Rpbmc6IE1hdFNpZGVuYXZDb250YWluZXJcbiAgfV1cblxufSlcbmV4cG9ydCBjbGFzcyBNYXRTaWRlbmF2Q29udGFpbmVyIGV4dGVuZHMgTWF0RHJhd2VyQ29udGFpbmVyIHtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRTaWRlbmF2LCB7XG4gICAgLy8gV2UgbmVlZCB0byB1c2UgYGRlc2NlbmRhbnRzOiB0cnVlYCwgYmVjYXVzZSBJdnkgd2lsbCBubyBsb25nZXIgbWF0Y2hcbiAgICAvLyBpbmRpcmVjdCBkZXNjZW5kYW50cyBpZiBpdCdzIGxlZnQgYXMgZmFsc2UuXG4gICAgZGVzY2VuZGFudHM6IHRydWVcbiAgfSlcbiAgX2FsbERyYXdlcnM6IFF1ZXJ5TGlzdDxNYXRTaWRlbmF2PjtcblxuICBAQ29udGVudENoaWxkKE1hdFNpZGVuYXZDb250ZW50KSBfY29udGVudDogTWF0U2lkZW5hdkNvbnRlbnQ7XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2F1dG9zaXplOiBib29sZWFuIHwgc3RyaW5nO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGFzQmFja2Ryb3A6IGJvb2xlYW4gfCBzdHJpbmc7XG59XG4iXX0=