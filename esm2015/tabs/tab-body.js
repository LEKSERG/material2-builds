/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ChangeDetectorRef, Input, Inject, Output, EventEmitter, ElementRef, Directive, Optional, ViewEncapsulation, ChangeDetectionStrategy, ComponentFactoryResolver, ViewContainerRef, forwardRef, ViewChild, } from '@angular/core';
import { TemplatePortal, CdkPortalOutlet, PortalHostDirective } from '@angular/cdk/portal';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { Subscription, Subject } from 'rxjs';
import { matTabsAnimations } from './tabs-animations';
import { startWith, distinctUntilChanged } from 'rxjs/operators';
/**
 * The portal host directive for the contents of the tab.
 * \@docs-private
 */
export class MatTabBodyPortal extends CdkPortalOutlet {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} _host
     * @param {?=} _document
     */
    constructor(componentFactoryResolver, viewContainerRef, _host, 
    /**
     * @deprecated `_document` parameter to be made required.
     * @breaking-change 9.0.0
     */
    _document) {
        super(componentFactoryResolver, viewContainerRef, _document);
        this._host = _host;
        /**
         * Subscription to events for when the tab body begins centering.
         */
        this._centeringSub = Subscription.EMPTY;
        /**
         * Subscription to events for when the tab body finishes leaving from center position.
         */
        this._leavingSub = Subscription.EMPTY;
    }
    /**
     * Set initial visibility or set up subscription for changing visibility.
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this._centeringSub = this._host._beforeCentering
            .pipe(startWith(this._host._isCenterPosition(this._host._position)))
            .subscribe((/**
         * @param {?} isCentering
         * @return {?}
         */
        (isCentering) => {
            if (isCentering && !this.hasAttached()) {
                this.attach(this._host._content);
            }
        }));
        this._leavingSub = this._host._afterLeavingCenter.subscribe((/**
         * @return {?}
         */
        () => {
            this.detach();
        }));
    }
    /**
     * Clean up centering subscription.
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this._centeringSub.unsubscribe();
        this._leavingSub.unsubscribe();
    }
}
MatTabBodyPortal.decorators = [
    { type: Directive, args: [{
                selector: '[matTabBodyHost]'
            },] }
];
/** @nocollapse */
MatTabBodyPortal.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: MatTabBody, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => MatTabBody)),] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
if (false) {
    /**
     * Subscription to events for when the tab body begins centering.
     * @type {?}
     * @private
     */
    MatTabBodyPortal.prototype._centeringSub;
    /**
     * Subscription to events for when the tab body finishes leaving from center position.
     * @type {?}
     * @private
     */
    MatTabBodyPortal.prototype._leavingSub;
    /**
     * @type {?}
     * @private
     */
    MatTabBodyPortal.prototype._host;
}
/**
 * Base class with all of the `MatTabBody` functionality.
 * \@docs-private
 * @abstract
 */
// tslint:disable-next-line:class-name
export class _MatTabBodyBase {
    /**
     * @param {?} _elementRef
     * @param {?} _dir
     * @param {?} changeDetectorRef
     */
    constructor(_elementRef, _dir, changeDetectorRef) {
        this._elementRef = _elementRef;
        this._dir = _dir;
        /**
         * Subscription to the directionality change observable.
         */
        this._dirChangeSubscription = Subscription.EMPTY;
        /**
         * Emits when an animation on the tab is complete.
         */
        this._translateTabComplete = new Subject();
        /**
         * Event emitted when the tab begins to animate towards the center as the active tab.
         */
        this._onCentering = new EventEmitter();
        /**
         * Event emitted before the centering of the tab begins.
         */
        this._beforeCentering = new EventEmitter();
        /**
         * Event emitted before the centering of the tab begins.
         */
        this._afterLeavingCenter = new EventEmitter();
        /**
         * Event emitted when the tab completes its animation towards the center.
         */
        this._onCentered = new EventEmitter(true);
        // Note that the default value will always be overwritten by `MatTabBody`, but we need one
        // anyway to prevent the animations module from throwing an error if the body is used on its own.
        /**
         * Duration for the tab's animation.
         */
        this.animationDuration = '500ms';
        if (_dir) {
            this._dirChangeSubscription = _dir.change.subscribe((/**
             * @param {?} dir
             * @return {?}
             */
            (dir) => {
                this._computePositionAnimationState(dir);
                changeDetectorRef.markForCheck();
            }));
        }
        // Ensure that we get unique animation events, because the `.done` callback can get
        // invoked twice in some browsers. See https://github.com/angular/angular/issues/24084.
        this._translateTabComplete.pipe(distinctUntilChanged((/**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        (x, y) => {
            return x.fromState === y.fromState && x.toState === y.toState;
        }))).subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            // If the transition to the center is complete, emit an event.
            if (this._isCenterPosition(event.toState) && this._isCenterPosition(this._position)) {
                this._onCentered.emit();
            }
            if (this._isCenterPosition(event.fromState) && !this._isCenterPosition(this._position)) {
                this._afterLeavingCenter.emit();
            }
        }));
    }
    /**
     * The shifted index position of the tab body, where zero represents the active center tab.
     * @param {?} position
     * @return {?}
     */
    set position(position) {
        this._positionIndex = position;
        this._computePositionAnimationState();
    }
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     * @return {?}
     */
    ngOnInit() {
        if (this._position == 'center' && this.origin != null) {
            this._position = this._computePositionFromOrigin(this.origin);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._dirChangeSubscription.unsubscribe();
        this._translateTabComplete.complete();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onTranslateTabStarted(event) {
        /** @type {?} */
        const isCentering = this._isCenterPosition(event.toState);
        this._beforeCentering.emit(isCentering);
        if (isCentering) {
            this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
        }
    }
    /**
     * The text direction of the containing app.
     * @return {?}
     */
    _getLayoutDirection() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /**
     * Whether the provided position state is considered center, regardless of origin.
     * @param {?} position
     * @return {?}
     */
    _isCenterPosition(position) {
        return position == 'center' ||
            position == 'left-origin-center' ||
            position == 'right-origin-center';
    }
    /**
     * Computes the position state that will be used for the tab-body animation trigger.
     * @private
     * @param {?=} dir
     * @return {?}
     */
    _computePositionAnimationState(dir = this._getLayoutDirection()) {
        if (this._positionIndex < 0) {
            this._position = dir == 'ltr' ? 'left' : 'right';
        }
        else if (this._positionIndex > 0) {
            this._position = dir == 'ltr' ? 'right' : 'left';
        }
        else {
            this._position = 'center';
        }
    }
    /**
     * Computes the position state based on the specified origin position. This is used if the
     * tab is becoming visible immediately after creation.
     * @private
     * @param {?} origin
     * @return {?}
     */
    _computePositionFromOrigin(origin) {
        /** @type {?} */
        const dir = this._getLayoutDirection();
        if ((dir == 'ltr' && origin <= 0) || (dir == 'rtl' && origin > 0)) {
            return 'left-origin-center';
        }
        return 'right-origin-center';
    }
}
_MatTabBodyBase.decorators = [
    { type: Directive, args: [{
                // TODO(crisbeto): this selector can be removed when we update to Angular 9.0.
                selector: 'do-not-use-abstract-mat-tab-body-base'
            },] }
];
/** @nocollapse */
_MatTabBodyBase.ctorParameters = () => [
    { type: ElementRef },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef }
];
_MatTabBodyBase.propDecorators = {
    _onCentering: [{ type: Output }],
    _beforeCentering: [{ type: Output }],
    _afterLeavingCenter: [{ type: Output }],
    _onCentered: [{ type: Output }],
    _content: [{ type: Input, args: ['content',] }],
    origin: [{ type: Input }],
    animationDuration: [{ type: Input }],
    position: [{ type: Input }]
};
if (false) {
    /**
     * Current position of the tab-body in the tab-group. Zero means that the tab is visible.
     * @type {?}
     * @private
     */
    _MatTabBodyBase.prototype._positionIndex;
    /**
     * Subscription to the directionality change observable.
     * @type {?}
     * @private
     */
    _MatTabBodyBase.prototype._dirChangeSubscription;
    /**
     * Tab body position state. Used by the animation trigger for the current state.
     * @type {?}
     */
    _MatTabBodyBase.prototype._position;
    /**
     * Emits when an animation on the tab is complete.
     * @type {?}
     */
    _MatTabBodyBase.prototype._translateTabComplete;
    /**
     * Event emitted when the tab begins to animate towards the center as the active tab.
     * @type {?}
     */
    _MatTabBodyBase.prototype._onCentering;
    /**
     * Event emitted before the centering of the tab begins.
     * @type {?}
     */
    _MatTabBodyBase.prototype._beforeCentering;
    /**
     * Event emitted before the centering of the tab begins.
     * @type {?}
     */
    _MatTabBodyBase.prototype._afterLeavingCenter;
    /**
     * Event emitted when the tab completes its animation towards the center.
     * @type {?}
     */
    _MatTabBodyBase.prototype._onCentered;
    /**
     * The portal host inside of this container into which the tab body content will be loaded.
     * @type {?}
     */
    _MatTabBodyBase.prototype._portalHost;
    /**
     * The tab body content to display.
     * @type {?}
     */
    _MatTabBodyBase.prototype._content;
    /**
     * Position that will be used when the tab is immediately becoming visible after creation.
     * @type {?}
     */
    _MatTabBodyBase.prototype.origin;
    /**
     * Duration for the tab's animation.
     * @type {?}
     */
    _MatTabBodyBase.prototype.animationDuration;
    /**
     * @type {?}
     * @private
     */
    _MatTabBodyBase.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    _MatTabBodyBase.prototype._dir;
}
/**
 * Wrapper for the contents of a tab.
 * \@docs-private
 */
export class MatTabBody extends _MatTabBodyBase {
    /**
     * @param {?} elementRef
     * @param {?} dir
     * @param {?} changeDetectorRef
     */
    constructor(elementRef, dir, changeDetectorRef) {
        super(elementRef, dir, changeDetectorRef);
    }
}
MatTabBody.decorators = [
    { type: Component, args: [{
                selector: 'mat-tab-body',
                template: "<div class=\"mat-tab-body-content\" #content\n     [@translateTab]=\"{\n        value: _position,\n        params: {animationDuration: animationDuration}\n     }\"\n     (@translateTab.start)=\"_onTranslateTabStarted($event)\"\n     (@translateTab.done)=\"_translateTabComplete.next($event)\">\n  <ng-template matTabBodyHost></ng-template>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                // tslint:disable-next-line:validate-decorators
                changeDetection: ChangeDetectionStrategy.Default,
                animations: [matTabsAnimations.translateTab],
                host: {
                    'class': 'mat-tab-body',
                },
                styles: [".mat-tab-body-content{height:100%;overflow:auto}.mat-tab-group-dynamic-height .mat-tab-body-content{overflow:hidden}\n"]
            }] }
];
/** @nocollapse */
MatTabBody.ctorParameters = () => [
    { type: ElementRef },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef }
];
MatTabBody.propDecorators = {
    _portalHost: [{ type: ViewChild, args: [PortalHostDirective,] }]
};
if (false) {
    /** @type {?} */
    MatTabBody.prototype._portalHost;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvdGFicy90YWItYm9keS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFlBQVksRUFHWixVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsRUFDUixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLHdCQUF3QixFQUN4QixnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsY0FBYyxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3pGLE9BQU8sRUFBQyxjQUFjLEVBQVksTUFBTSxtQkFBbUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBRSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFDLFNBQVMsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7OztBQThCL0QsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGVBQWU7Ozs7Ozs7SUFNbkQsWUFDRSx3QkFBa0QsRUFDbEQsZ0JBQWtDLEVBQ1ksS0FBaUI7SUFDL0Q7OztPQUdHO0lBQ2UsU0FBZTtRQUNqQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFOZixVQUFLLEdBQUwsS0FBSyxDQUFZOzs7O1FBUHpELGtCQUFhLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQzs7OztRQUVuQyxnQkFBVyxHQUFHLFlBQVksQ0FB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QWdQUCxRQUFRO1lBblFyQixpQkFBaUI7OzswQkFnUWhCLFNBQVMsU0FBQyxtQkFBbUI7Ozs7SUFBOUIsaUNBQWlFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgRWxlbWVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBPcHRpb25hbCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIGZvcndhcmRSZWYsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FuaW1hdGlvbkV2ZW50fSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7VGVtcGxhdGVQb3J0YWwsIENka1BvcnRhbE91dGxldCwgUG9ydGFsSG9zdERpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5LCBEaXJlY3Rpb259IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbiwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hdFRhYnNBbmltYXRpb25zfSBmcm9tICcuL3RhYnMtYW5pbWF0aW9ucyc7XG5pbXBvcnQge3N0YXJ0V2l0aCwgZGlzdGluY3RVbnRpbENoYW5nZWR9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBUaGVzZSBwb3NpdGlvbiBzdGF0ZXMgYXJlIHVzZWQgaW50ZXJuYWxseSBhcyBhbmltYXRpb24gc3RhdGVzIGZvciB0aGUgdGFiIGJvZHkuIFNldHRpbmcgdGhlXG4gKiBwb3NpdGlvbiBzdGF0ZSB0byBsZWZ0LCByaWdodCwgb3IgY2VudGVyIHdpbGwgdHJhbnNpdGlvbiB0aGUgdGFiIGJvZHkgZnJvbSBpdHMgY3VycmVudFxuICogcG9zaXRpb24gdG8gaXRzIHJlc3BlY3RpdmUgc3RhdGUuIElmIHRoZXJlIGlzIG5vdCBjdXJyZW50IHBvc2l0aW9uICh2b2lkLCBpbiB0aGUgY2FzZSBvZiBhIG5ld1xuICogdGFiIGJvZHkpLCB0aGVuIHRoZXJlIHdpbGwgYmUgbm8gdHJhbnNpdGlvbiBhbmltYXRpb24gdG8gaXRzIHN0YXRlLlxuICpcbiAqIEluIHRoZSBjYXNlIG9mIGEgbmV3IHRhYiBib2R5IHRoYXQgc2hvdWxkIGltbWVkaWF0ZWx5IGJlIGNlbnRlcmVkIHdpdGggYW4gYW5pbWF0aW5nIHRyYW5zaXRpb24sXG4gKiB0aGVuIGxlZnQtb3JpZ2luLWNlbnRlciBvciByaWdodC1vcmlnaW4tY2VudGVyIGNhbiBiZSB1c2VkLCB3aGljaCB3aWxsIHVzZSBsZWZ0IG9yIHJpZ2h0IGFzIGl0c1xuICogcHN1ZWRvLXByaW9yIHN0YXRlLlxuICovXG5leHBvcnQgdHlwZSBNYXRUYWJCb2R5UG9zaXRpb25TdGF0ZSA9XG4gICAgJ2xlZnQnIHwgJ2NlbnRlcicgfCAncmlnaHQnIHwgJ2xlZnQtb3JpZ2luLWNlbnRlcicgfCAncmlnaHQtb3JpZ2luLWNlbnRlcic7XG5cbi8qKlxuICogVGhlIG9yaWdpbiBzdGF0ZSBpcyBhbiBpbnRlcm5hbGx5IHVzZWQgc3RhdGUgdGhhdCBpcyBzZXQgb24gYSBuZXcgdGFiIGJvZHkgaW5kaWNhdGluZyBpZiBpdFxuICogYmVnYW4gdG8gdGhlIGxlZnQgb3IgcmlnaHQgb2YgdGhlIHByaW9yIHNlbGVjdGVkIGluZGV4LiBGb3IgZXhhbXBsZSwgaWYgdGhlIHNlbGVjdGVkIGluZGV4IHdhc1xuICogc2V0IHRvIDEsIGFuZCBhIG5ldyB0YWIgaXMgY3JlYXRlZCBhbmQgc2VsZWN0ZWQgYXQgaW5kZXggMiwgdGhlbiB0aGUgdGFiIGJvZHkgd291bGQgaGF2ZSBhblxuICogb3JpZ2luIG9mIHJpZ2h0IGJlY2F1c2UgaXRzIGluZGV4IHdhcyBncmVhdGVyIHRoYW4gdGhlIHByaW9yIHNlbGVjdGVkIGluZGV4LlxuICovXG5leHBvcnQgdHlwZSBNYXRUYWJCb2R5T3JpZ2luU3RhdGUgPSAnbGVmdCcgfCAncmlnaHQnO1xuXG4vKipcbiAqIFRoZSBwb3J0YWwgaG9zdCBkaXJlY3RpdmUgZm9yIHRoZSBjb250ZW50cyBvZiB0aGUgdGFiLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0VGFiQm9keUhvc3RdJ1xufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWJCb2R5UG9ydGFsIGV4dGVuZHMgQ2RrUG9ydGFsT3V0bGV0IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKiogU3Vic2NyaXB0aW9uIHRvIGV2ZW50cyBmb3Igd2hlbiB0aGUgdGFiIGJvZHkgYmVnaW5zIGNlbnRlcmluZy4gKi9cbiAgcHJpdmF0ZSBfY2VudGVyaW5nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAvKiogU3Vic2NyaXB0aW9uIHRvIGV2ZW50cyBmb3Igd2hlbiB0aGUgdGFiIGJvZHkgZmluaXNoZXMgbGVhdmluZyBmcm9tIGNlbnRlciBwb3NpdGlvbi4gKi9cbiAgcHJpdmF0ZSBfbGVhdmluZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNYXRUYWJCb2R5KSkgcHJpdmF0ZSBfaG9zdDogTWF0VGFiQm9keSxcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBgX2RvY3VtZW50YCBwYXJhbWV0ZXIgdG8gYmUgbWFkZSByZXF1aXJlZC5cbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDkuMC4wXG4gICAgICovXG4gICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50PzogYW55KSB7XG4gICAgc3VwZXIoY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCB2aWV3Q29udGFpbmVyUmVmLCBfZG9jdW1lbnQpO1xuICB9XG5cbiAgLyoqIFNldCBpbml0aWFsIHZpc2liaWxpdHkgb3Igc2V0IHVwIHN1YnNjcmlwdGlvbiBmb3IgY2hhbmdpbmcgdmlzaWJpbGl0eS4gKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIHRoaXMuX2NlbnRlcmluZ1N1YiA9IHRoaXMuX2hvc3QuX2JlZm9yZUNlbnRlcmluZ1xuICAgICAgLnBpcGUoc3RhcnRXaXRoKHRoaXMuX2hvc3QuX2lzQ2VudGVyUG9zaXRpb24odGhpcy5faG9zdC5fcG9zaXRpb24pKSlcbiAgICAgIC5zdWJzY3JpYmUoKGlzQ2VudGVyaW5nOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChpc0NlbnRlcmluZyAmJiAhdGhpcy5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgdGhpcy5hdHRhY2godGhpcy5faG9zdC5fY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fbGVhdmluZ1N1YiA9IHRoaXMuX2hvc3QuX2FmdGVyTGVhdmluZ0NlbnRlci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBDbGVhbiB1cCBjZW50ZXJpbmcgc3Vic2NyaXB0aW9uLiAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX2NlbnRlcmluZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2xlYXZpbmdTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuXG4vKipcbiAqIEJhc2UgY2xhc3Mgd2l0aCBhbGwgb2YgdGhlIGBNYXRUYWJCb2R5YCBmdW5jdGlvbmFsaXR5LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgLy8gVE9ETyhjcmlzYmV0byk6IHRoaXMgc2VsZWN0b3IgY2FuIGJlIHJlbW92ZWQgd2hlbiB3ZSB1cGRhdGUgdG8gQW5ndWxhciA5LjAuXG4gIHNlbGVjdG9yOiAnZG8tbm90LXVzZS1hYnN0cmFjdC1tYXQtdGFiLWJvZHktYmFzZSdcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y2xhc3MtbmFtZVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIF9NYXRUYWJCb2R5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIEN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHRhYi1ib2R5IGluIHRoZSB0YWItZ3JvdXAuIFplcm8gbWVhbnMgdGhhdCB0aGUgdGFiIGlzIHZpc2libGUuICovXG4gIHByaXZhdGUgX3Bvc2l0aW9uSW5kZXg6IG51bWJlcjtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIHRoZSBkaXJlY3Rpb25hbGl0eSBjaGFuZ2Ugb2JzZXJ2YWJsZS4gKi9cbiAgcHJpdmF0ZSBfZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBUYWIgYm9keSBwb3NpdGlvbiBzdGF0ZS4gVXNlZCBieSB0aGUgYW5pbWF0aW9uIHRyaWdnZXIgZm9yIHRoZSBjdXJyZW50IHN0YXRlLiAqL1xuICBfcG9zaXRpb246IE1hdFRhYkJvZHlQb3NpdGlvblN0YXRlO1xuXG4gIC8qKiBFbWl0cyB3aGVuIGFuIGFuaW1hdGlvbiBvbiB0aGUgdGFiIGlzIGNvbXBsZXRlLiAqL1xuICBfdHJhbnNsYXRlVGFiQ29tcGxldGUgPSBuZXcgU3ViamVjdDxBbmltYXRpb25FdmVudD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSB0YWIgYmVnaW5zIHRvIGFuaW1hdGUgdG93YXJkcyB0aGUgY2VudGVyIGFzIHRoZSBhY3RpdmUgdGFiLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgX29uQ2VudGVyaW5nOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIGJlZm9yZSB0aGUgY2VudGVyaW5nIG9mIHRoZSB0YWIgYmVnaW5zLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgX2JlZm9yZUNlbnRlcmluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIGJlZm9yZSB0aGUgY2VudGVyaW5nIG9mIHRoZSB0YWIgYmVnaW5zLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgX2FmdGVyTGVhdmluZ0NlbnRlcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHRhYiBjb21wbGV0ZXMgaXRzIGFuaW1hdGlvbiB0b3dhcmRzIHRoZSBjZW50ZXIuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBfb25DZW50ZXJlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPih0cnVlKTtcblxuICAgLyoqIFRoZSBwb3J0YWwgaG9zdCBpbnNpZGUgb2YgdGhpcyBjb250YWluZXIgaW50byB3aGljaCB0aGUgdGFiIGJvZHkgY29udGVudCB3aWxsIGJlIGxvYWRlZC4gKi9cbiAgYWJzdHJhY3QgX3BvcnRhbEhvc3Q6IFBvcnRhbEhvc3REaXJlY3RpdmU7XG5cbiAgLyoqIFRoZSB0YWIgYm9keSBjb250ZW50IHRvIGRpc3BsYXkuICovXG4gIEBJbnB1dCgnY29udGVudCcpIF9jb250ZW50OiBUZW1wbGF0ZVBvcnRhbDtcblxuICAvKiogUG9zaXRpb24gdGhhdCB3aWxsIGJlIHVzZWQgd2hlbiB0aGUgdGFiIGlzIGltbWVkaWF0ZWx5IGJlY29taW5nIHZpc2libGUgYWZ0ZXIgY3JlYXRpb24uICovXG4gIEBJbnB1dCgpIG9yaWdpbjogbnVtYmVyIHwgbnVsbDtcblxuICAvLyBOb3RlIHRoYXQgdGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBhbHdheXMgYmUgb3ZlcndyaXR0ZW4gYnkgYE1hdFRhYkJvZHlgLCBidXQgd2UgbmVlZCBvbmVcbiAgLy8gYW55d2F5IHRvIHByZXZlbnQgdGhlIGFuaW1hdGlvbnMgbW9kdWxlIGZyb20gdGhyb3dpbmcgYW4gZXJyb3IgaWYgdGhlIGJvZHkgaXMgdXNlZCBvbiBpdHMgb3duLlxuICAvKiogRHVyYXRpb24gZm9yIHRoZSB0YWIncyBhbmltYXRpb24uICovXG4gIEBJbnB1dCgpIGFuaW1hdGlvbkR1cmF0aW9uOiBzdHJpbmcgPSAnNTAwbXMnO1xuXG4gIC8qKiBUaGUgc2hpZnRlZCBpbmRleCBwb3NpdGlvbiBvZiB0aGUgdGFiIGJvZHksIHdoZXJlIHplcm8gcmVwcmVzZW50cyB0aGUgYWN0aXZlIGNlbnRlciB0YWIuICovXG4gIEBJbnB1dCgpXG4gIHNldCBwb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5fcG9zaXRpb25JbmRleCA9IHBvc2l0aW9uO1xuICAgIHRoaXMuX2NvbXB1dGVQb3NpdGlvbkFuaW1hdGlvblN0YXRlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG5cbiAgICBpZiAoX2Rpcikge1xuICAgICAgdGhpcy5fZGlyQ2hhbmdlU3Vic2NyaXB0aW9uID0gX2Rpci5jaGFuZ2Uuc3Vic2NyaWJlKChkaXI6IERpcmVjdGlvbikgPT4ge1xuICAgICAgICB0aGlzLl9jb21wdXRlUG9zaXRpb25BbmltYXRpb25TdGF0ZShkaXIpO1xuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGF0IHdlIGdldCB1bmlxdWUgYW5pbWF0aW9uIGV2ZW50cywgYmVjYXVzZSB0aGUgYC5kb25lYCBjYWxsYmFjayBjYW4gZ2V0XG4gICAgLy8gaW52b2tlZCB0d2ljZSBpbiBzb21lIGJyb3dzZXJzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjQwODQuXG4gICAgdGhpcy5fdHJhbnNsYXRlVGFiQ29tcGxldGUucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgoeCwgeSkgPT4ge1xuICAgICAgcmV0dXJuIHguZnJvbVN0YXRlID09PSB5LmZyb21TdGF0ZSAmJiB4LnRvU3RhdGUgPT09IHkudG9TdGF0ZTtcbiAgICB9KSkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIC8vIElmIHRoZSB0cmFuc2l0aW9uIHRvIHRoZSBjZW50ZXIgaXMgY29tcGxldGUsIGVtaXQgYW4gZXZlbnQuXG4gICAgICBpZiAodGhpcy5faXNDZW50ZXJQb3NpdGlvbihldmVudC50b1N0YXRlKSAmJiB0aGlzLl9pc0NlbnRlclBvc2l0aW9uKHRoaXMuX3Bvc2l0aW9uKSkge1xuICAgICAgICB0aGlzLl9vbkNlbnRlcmVkLmVtaXQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2lzQ2VudGVyUG9zaXRpb24oZXZlbnQuZnJvbVN0YXRlKSAmJiAhdGhpcy5faXNDZW50ZXJQb3NpdGlvbih0aGlzLl9wb3NpdGlvbikpIHtcbiAgICAgICAgdGhpcy5fYWZ0ZXJMZWF2aW5nQ2VudGVyLmVtaXQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciBpbml0aWFsaXplZCwgY2hlY2sgaWYgdGhlIGNvbnRlbnQgaXMgY2VudGVyZWQgYW5kIGhhcyBhbiBvcmlnaW4uIElmIHNvLCBzZXQgdGhlXG4gICAqIHNwZWNpYWwgcG9zaXRpb24gc3RhdGVzIHRoYXQgdHJhbnNpdGlvbiB0aGUgdGFiIGZyb20gdGhlIGxlZnQgb3IgcmlnaHQgYmVmb3JlIGNlbnRlcmluZy5cbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLl9wb3NpdGlvbiA9PSAnY2VudGVyJyAmJiB0aGlzLm9yaWdpbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX2NvbXB1dGVQb3NpdGlvbkZyb21PcmlnaW4odGhpcy5vcmlnaW4pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2RpckNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3RyYW5zbGF0ZVRhYkNvbXBsZXRlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBfb25UcmFuc2xhdGVUYWJTdGFydGVkKGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGlzQ2VudGVyaW5nID0gdGhpcy5faXNDZW50ZXJQb3NpdGlvbihldmVudC50b1N0YXRlKTtcbiAgICB0aGlzLl9iZWZvcmVDZW50ZXJpbmcuZW1pdChpc0NlbnRlcmluZyk7XG4gICAgaWYgKGlzQ2VudGVyaW5nKSB7XG4gICAgICB0aGlzLl9vbkNlbnRlcmluZy5lbWl0KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGUgdGV4dCBkaXJlY3Rpb24gb2YgdGhlIGNvbnRhaW5pbmcgYXBwLiAqL1xuICBfZ2V0TGF5b3V0RGlyZWN0aW9uKCk6IERpcmVjdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnID8gJ3J0bCcgOiAnbHRyJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBwcm92aWRlZCBwb3NpdGlvbiBzdGF0ZSBpcyBjb25zaWRlcmVkIGNlbnRlciwgcmVnYXJkbGVzcyBvZiBvcmlnaW4uICovXG4gIF9pc0NlbnRlclBvc2l0aW9uKHBvc2l0aW9uOiBNYXRUYWJCb2R5UG9zaXRpb25TdGF0ZXxzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcG9zaXRpb24gPT0gJ2NlbnRlcicgfHxcbiAgICAgICAgcG9zaXRpb24gPT0gJ2xlZnQtb3JpZ2luLWNlbnRlcicgfHxcbiAgICAgICAgcG9zaXRpb24gPT0gJ3JpZ2h0LW9yaWdpbi1jZW50ZXInO1xuICB9XG5cbiAgLyoqIENvbXB1dGVzIHRoZSBwb3NpdGlvbiBzdGF0ZSB0aGF0IHdpbGwgYmUgdXNlZCBmb3IgdGhlIHRhYi1ib2R5IGFuaW1hdGlvbiB0cmlnZ2VyLiAqL1xuICBwcml2YXRlIF9jb21wdXRlUG9zaXRpb25BbmltYXRpb25TdGF0ZShkaXI6IERpcmVjdGlvbiA9IHRoaXMuX2dldExheW91dERpcmVjdGlvbigpKSB7XG4gICAgaWYgKHRoaXMuX3Bvc2l0aW9uSW5kZXggPCAwKSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IGRpciA9PSAnbHRyJyA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9wb3NpdGlvbkluZGV4ID4gMCkge1xuICAgICAgdGhpcy5fcG9zaXRpb24gPSBkaXIgPT0gJ2x0cicgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbiA9ICdjZW50ZXInO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgcG9zaXRpb24gc3RhdGUgYmFzZWQgb24gdGhlIHNwZWNpZmllZCBvcmlnaW4gcG9zaXRpb24uIFRoaXMgaXMgdXNlZCBpZiB0aGVcbiAgICogdGFiIGlzIGJlY29taW5nIHZpc2libGUgaW1tZWRpYXRlbHkgYWZ0ZXIgY3JlYXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9jb21wdXRlUG9zaXRpb25Gcm9tT3JpZ2luKG9yaWdpbjogbnVtYmVyKTogTWF0VGFiQm9keVBvc2l0aW9uU3RhdGUge1xuICAgIGNvbnN0IGRpciA9IHRoaXMuX2dldExheW91dERpcmVjdGlvbigpO1xuXG4gICAgaWYgKChkaXIgPT0gJ2x0cicgJiYgb3JpZ2luIDw9IDApIHx8IChkaXIgPT0gJ3J0bCcgJiYgb3JpZ2luID4gMCkpIHtcbiAgICAgIHJldHVybiAnbGVmdC1vcmlnaW4tY2VudGVyJztcbiAgICB9XG5cbiAgICByZXR1cm4gJ3JpZ2h0LW9yaWdpbi1jZW50ZXInO1xuICB9XG59XG5cbi8qKlxuICogV3JhcHBlciBmb3IgdGhlIGNvbnRlbnRzIG9mIGEgdGFiLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtdGFiLWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJ3RhYi1ib2R5Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFiLWJvZHkuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgYW5pbWF0aW9uczogW21hdFRhYnNBbmltYXRpb25zLnRyYW5zbGF0ZVRhYl0sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LXRhYi1ib2R5JyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWJCb2R5IGV4dGVuZHMgX01hdFRhYkJvZHlCYXNlIHtcbiAgQFZpZXdDaGlsZChQb3J0YWxIb3N0RGlyZWN0aXZlKSBfcG9ydGFsSG9zdDogUG9ydGFsSG9zdERpcmVjdGl2ZTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgZGlyLCBjaGFuZ2VEZXRlY3RvclJlZik7XG4gIH1cbn1cbiJdfQ==