import { OverlayModule, OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { CdkPortalOutlet, BasePortalOutlet, PortalModule, TemplatePortal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DOCUMENT, CommonModule, Location } from '@angular/common';
import { InjectionToken, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Optional, Inject, ViewChild, NgModule, TemplateRef, Injectable, Injector, SkipSelf, ɵɵdefineInjectable, ɵɵinject, INJECTOR } from '@angular/core';
import { AnimationDurations, AnimationCurves, MatCommonModule } from '@angular/material/core';
import { __extends, __assign } from 'tslib';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Subject, merge, of } from 'rxjs';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { filter, take } from 'rxjs/operators';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token that can be used to access the data that was passed in to a bottom sheet. */
var MAT_BOTTOM_SHEET_DATA = new InjectionToken('MatBottomSheetData');
/**
 * Configuration used when opening a bottom sheet.
 */
var MatBottomSheetConfig = /** @class */ (function () {
    function MatBottomSheetConfig() {
        /** Data being injected into the child component. */
        this.data = null;
        /** Whether the bottom sheet has a backdrop. */
        this.hasBackdrop = true;
        /** Whether the user can use escape or clicking outside to close the bottom sheet. */
        this.disableClose = false;
        /** Aria label to assign to the bottom sheet element. */
        this.ariaLabel = null;
        /**
         * Whether the bottom sheet should close when the user goes backwards/forwards in history.
         * Note that this usually doesn't include clicking on links (unless the user is using
         * the `HashLocationStrategy`).
         */
        this.closeOnNavigation = true;
        // Note that this is disabled by default, because while the a11y recommendations are to focus
        // the first focusable element, doing so prevents screen readers from reading out the
        // rest of the bottom sheet content.
        /** Whether the bottom sheet should focus the first focusable element on open. */
        this.autoFocus = false;
        /**
         * Whether the bottom sheet should restore focus to the
         * previously-focused element, after it's closed.
         */
        this.restoreFocus = true;
    }
    return MatBottomSheetConfig;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Animations used by the Material bottom sheet. */
var matBottomSheetAnimations = {
    /** Animation that shows and hides a bottom sheet. */
    bottomSheetState: trigger('state', [
        state('void, hidden', style({ transform: 'translateY(100%)' })),
        state('visible', style({ transform: 'translateY(0%)' })),
        transition('visible => void, visible => hidden', animate(AnimationDurations.COMPLEX + " " + AnimationCurves.ACCELERATION_CURVE)),
        transition('void => visible', animate(AnimationDurations.EXITING + " " + AnimationCurves.DECELERATION_CURVE)),
    ])
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// TODO(crisbeto): consolidate some logic between this, MatDialog and MatSnackBar
/**
 * Internal component that wraps user-provided bottom sheet content.
 * @docs-private
 */
var MatBottomSheetContainer = /** @class */ (function (_super) {
    __extends(MatBottomSheetContainer, _super);
    function MatBottomSheetContainer(_elementRef, _changeDetectorRef, _focusTrapFactory, breakpointObserver, document, 
    /** The bottom sheet configuration. */
    bottomSheetConfig) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._focusTrapFactory = _focusTrapFactory;
        _this.bottomSheetConfig = bottomSheetConfig;
        /** The state of the bottom sheet animations. */
        _this._animationState = 'void';
        /** Emits whenever the state of the animation changes. */
        _this._animationStateChanged = new EventEmitter();
        /** Element that was focused before the bottom sheet was opened. */
        _this._elementFocusedBeforeOpened = null;
        /**
         * Attaches a DOM portal to the bottom sheet container.
         * @deprecated To be turned into a method.
         * @breaking-change 10.0.0
         */
        _this.attachDomPortal = function (portal) {
            _this._validatePortalAttached();
            _this._setPanelClass();
            _this._savePreviouslyFocusedElement();
            return _this._portalOutlet.attachDomPortal(portal);
        };
        _this._document = document;
        _this._breakpointSubscription = breakpointObserver
            .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
            .subscribe(function () {
            _this._toggleClass('mat-bottom-sheet-container-medium', breakpointObserver.isMatched(Breakpoints.Medium));
            _this._toggleClass('mat-bottom-sheet-container-large', breakpointObserver.isMatched(Breakpoints.Large));
            _this._toggleClass('mat-bottom-sheet-container-xlarge', breakpointObserver.isMatched(Breakpoints.XLarge));
        });
        return _this;
    }
    /** Attach a component portal as content to this bottom sheet container. */
    MatBottomSheetContainer.prototype.attachComponentPortal = function (portal) {
        this._validatePortalAttached();
        this._setPanelClass();
        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachComponentPortal(portal);
    };
    /** Attach a template portal as content to this bottom sheet container. */
    MatBottomSheetContainer.prototype.attachTemplatePortal = function (portal) {
        this._validatePortalAttached();
        this._setPanelClass();
        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachTemplatePortal(portal);
    };
    /** Begin animation of bottom sheet entrance into view. */
    MatBottomSheetContainer.prototype.enter = function () {
        if (!this._destroyed) {
            this._animationState = 'visible';
            this._changeDetectorRef.detectChanges();
        }
    };
    /** Begin animation of the bottom sheet exiting from view. */
    MatBottomSheetContainer.prototype.exit = function () {
        if (!this._destroyed) {
            this._animationState = 'hidden';
            this._changeDetectorRef.markForCheck();
        }
    };
    MatBottomSheetContainer.prototype.ngOnDestroy = function () {
        this._breakpointSubscription.unsubscribe();
        this._destroyed = true;
    };
    MatBottomSheetContainer.prototype._onAnimationDone = function (event) {
        if (event.toState === 'hidden') {
            this._restoreFocus();
        }
        else if (event.toState === 'visible') {
            this._trapFocus();
        }
        this._animationStateChanged.emit(event);
    };
    MatBottomSheetContainer.prototype._onAnimationStart = function (event) {
        this._animationStateChanged.emit(event);
    };
    MatBottomSheetContainer.prototype._toggleClass = function (cssClass, add) {
        var classList = this._elementRef.nativeElement.classList;
        add ? classList.add(cssClass) : classList.remove(cssClass);
    };
    MatBottomSheetContainer.prototype._validatePortalAttached = function () {
        if (this._portalOutlet.hasAttached()) {
            throw Error('Attempting to attach bottom sheet content after content is already attached');
        }
    };
    MatBottomSheetContainer.prototype._setPanelClass = function () {
        var element = this._elementRef.nativeElement;
        var panelClass = this.bottomSheetConfig.panelClass;
        if (Array.isArray(panelClass)) {
            // Note that we can't use a spread here, because IE doesn't support multiple arguments.
            panelClass.forEach(function (cssClass) { return element.classList.add(cssClass); });
        }
        else if (panelClass) {
            element.classList.add(panelClass);
        }
    };
    /** Moves the focus inside the focus trap. */
    MatBottomSheetContainer.prototype._trapFocus = function () {
        var element = this._elementRef.nativeElement;
        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(element);
        }
        if (this.bottomSheetConfig.autoFocus) {
            this._focusTrap.focusInitialElementWhenReady();
        }
        else {
            var activeElement = this._document.activeElement;
            // Otherwise ensure that focus is on the container. It's possible that a different
            // component tried to move focus while the open animation was running. See:
            // https://github.com/angular/components/issues/16215. Note that we only want to do this
            // if the focus isn't inside the bottom sheet already, because it's possible that the
            // consumer turned off `autoFocus` in order to move focus themselves.
            if (activeElement !== element && !element.contains(activeElement)) {
                element.focus();
            }
        }
    };
    /** Restores focus to the element that was focused before the bottom sheet was opened. */
    MatBottomSheetContainer.prototype._restoreFocus = function () {
        var toFocus = this._elementFocusedBeforeOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (this.bottomSheetConfig.restoreFocus && toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    };
    /** Saves a reference to the element that was focused before the bottom sheet was opened. */
    MatBottomSheetContainer.prototype._savePreviouslyFocusedElement = function () {
        var _this = this;
        this._elementFocusedBeforeOpened = this._document.activeElement;
        // The `focus` method isn't available during server-side rendering.
        if (this._elementRef.nativeElement.focus) {
            Promise.resolve().then(function () { return _this._elementRef.nativeElement.focus(); });
        }
    };
    MatBottomSheetContainer.decorators = [
        { type: Component, args: [{
                    selector: 'mat-bottom-sheet-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [matBottomSheetAnimations.bottomSheetState],
                    host: {
                        'class': 'mat-bottom-sheet-container',
                        'tabindex': '-1',
                        'role': 'dialog',
                        'aria-modal': 'true',
                        '[attr.aria-label]': 'bottomSheetConfig?.ariaLabel',
                        '[@state]': '_animationState',
                        '(@state.start)': '_onAnimationStart($event)',
                        '(@state.done)': '_onAnimationDone($event)'
                    },
                    styles: [".mat-bottom-sheet-container{padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto}@media(-ms-high-contrast: active){.mat-bottom-sheet-container{outline:1px solid}}.mat-bottom-sheet-container-xlarge,.mat-bottom-sheet-container-large,.mat-bottom-sheet-container-medium{border-top-left-radius:4px;border-top-right-radius:4px}.mat-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.mat-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.mat-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}\n"]
                }] }
    ];
    /** @nocollapse */
    MatBottomSheetContainer.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: FocusTrapFactory },
        { type: BreakpointObserver },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
        { type: MatBottomSheetConfig }
    ]; };
    MatBottomSheetContainer.propDecorators = {
        _portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }]
    };
    return MatBottomSheetContainer;
}(BasePortalOutlet));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MatBottomSheetModule = /** @class */ (function () {
    function MatBottomSheetModule() {
    }
    MatBottomSheetModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        MatCommonModule,
                        PortalModule,
                    ],
                    exports: [MatBottomSheetContainer, MatCommonModule],
                    declarations: [MatBottomSheetContainer],
                    entryComponents: [MatBottomSheetContainer],
                },] }
    ];
    return MatBottomSheetModule;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 */
var MatBottomSheetRef = /** @class */ (function () {
    function MatBottomSheetRef(containerInstance, _overlayRef, 
    // @breaking-change 8.0.0 `_location` parameter to be removed.
    _location) {
        var _this = this;
        this._overlayRef = _overlayRef;
        /** Subject for notifying the user that the bottom sheet has been dismissed. */
        this._afterDismissed = new Subject();
        /** Subject for notifying the user that the bottom sheet has opened and appeared. */
        this._afterOpened = new Subject();
        this.containerInstance = containerInstance;
        this.disableClose = containerInstance.bottomSheetConfig.disableClose;
        // Emit when opening animation completes
        containerInstance._animationStateChanged.pipe(filter(function (event) { return event.phaseName === 'done' && event.toState === 'visible'; }), take(1))
            .subscribe(function () {
            _this._afterOpened.next();
            _this._afterOpened.complete();
        });
        // Dispose overlay when closing animation is complete
        containerInstance._animationStateChanged
            .pipe(filter(function (event) { return event.phaseName === 'done' && event.toState === 'hidden'; }), take(1))
            .subscribe(function () {
            clearTimeout(_this._closeFallbackTimeout);
            _overlayRef.dispose();
        });
        _overlayRef.detachments().pipe(take(1)).subscribe(function () {
            _this._afterDismissed.next(_this._result);
            _this._afterDismissed.complete();
        });
        merge(_overlayRef.backdropClick(), _overlayRef.keydownEvents().pipe(filter(function (event) { return event.keyCode === ESCAPE; }))).subscribe(function (event) {
            if (!_this.disableClose &&
                (event.type !== 'keydown' || !hasModifierKey(event))) {
                event.preventDefault();
                _this.dismiss();
            }
        });
    }
    /**
     * Dismisses the bottom sheet.
     * @param result Data to be passed back to the bottom sheet opener.
     */
    MatBottomSheetRef.prototype.dismiss = function (result) {
        var _this = this;
        if (!this._afterDismissed.closed) {
            // Transition the backdrop in parallel to the bottom sheet.
            this.containerInstance._animationStateChanged.pipe(filter(function (event) { return event.phaseName === 'start'; }), take(1)).subscribe(function (event) {
                // The logic that disposes of the overlay depends on the exit animation completing, however
                // it isn't guaranteed if the parent view is destroyed while it's running. Add a fallback
                // timeout which will clean everything up if the animation hasn't fired within the specified
                // amount of time plus 100ms. We don't need to run this outside the NgZone, because for the
                // vast majority of cases the timeout will have been cleared before it has fired.
                _this._closeFallbackTimeout = setTimeout(function () {
                    _this._overlayRef.dispose();
                }, event.totalTime + 100);
                _this._overlayRef.detachBackdrop();
            });
            this._result = result;
            this.containerInstance.exit();
        }
    };
    /** Gets an observable that is notified when the bottom sheet is finished closing. */
    MatBottomSheetRef.prototype.afterDismissed = function () {
        return this._afterDismissed.asObservable();
    };
    /** Gets an observable that is notified when the bottom sheet has opened and appeared. */
    MatBottomSheetRef.prototype.afterOpened = function () {
        return this._afterOpened.asObservable();
    };
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    MatBottomSheetRef.prototype.backdropClick = function () {
        return this._overlayRef.backdropClick();
    };
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    MatBottomSheetRef.prototype.keydownEvents = function () {
        return this._overlayRef.keydownEvents();
    };
    return MatBottomSheetRef;
}());

/** Injection token that can be used to specify default bottom sheet options. */
var MAT_BOTTOM_SHEET_DEFAULT_OPTIONS = new InjectionToken('mat-bottom-sheet-default-options');
/**
 * Service to trigger Material Design bottom sheets.
 */
var MatBottomSheet = /** @class */ (function () {
    function MatBottomSheet(_overlay, _injector, _parentBottomSheet, _location, _defaultOptions) {
        this._overlay = _overlay;
        this._injector = _injector;
        this._parentBottomSheet = _parentBottomSheet;
        this._location = _location;
        this._defaultOptions = _defaultOptions;
        this._bottomSheetRefAtThisLevel = null;
    }
    Object.defineProperty(MatBottomSheet.prototype, "_openedBottomSheetRef", {
        /** Reference to the currently opened bottom sheet. */
        get: function () {
            var parent = this._parentBottomSheet;
            return parent ? parent._openedBottomSheetRef : this._bottomSheetRefAtThisLevel;
        },
        set: function (value) {
            if (this._parentBottomSheet) {
                this._parentBottomSheet._openedBottomSheetRef = value;
            }
            else {
                this._bottomSheetRefAtThisLevel = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    MatBottomSheet.prototype.open = function (componentOrTemplateRef, config) {
        var _this = this;
        var _config = _applyConfigDefaults(this._defaultOptions || new MatBottomSheetConfig(), config);
        var overlayRef = this._createOverlay(_config);
        var container = this._attachContainer(overlayRef, _config);
        var ref = new MatBottomSheetRef(container, overlayRef, this._location);
        if (componentOrTemplateRef instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, null, {
                $implicit: _config.data,
                bottomSheetRef: ref
            }));
        }
        else {
            var portal = new ComponentPortal(componentOrTemplateRef, undefined, this._createInjector(_config, ref));
            var contentRef = container.attachComponentPortal(portal);
            ref.instance = contentRef.instance;
        }
        // When the bottom sheet is dismissed, clear the reference to it.
        ref.afterDismissed().subscribe(function () {
            // Clear the bottom sheet ref if it hasn't already been replaced by a newer one.
            if (_this._openedBottomSheetRef == ref) {
                _this._openedBottomSheetRef = null;
            }
        });
        if (this._openedBottomSheetRef) {
            // If a bottom sheet is already in view, dismiss it and enter the
            // new bottom sheet after exit animation is complete.
            this._openedBottomSheetRef.afterDismissed().subscribe(function () { return ref.containerInstance.enter(); });
            this._openedBottomSheetRef.dismiss();
        }
        else {
            // If no bottom sheet is in view, enter the new bottom sheet.
            ref.containerInstance.enter();
        }
        this._openedBottomSheetRef = ref;
        return ref;
    };
    /**
     * Dismisses the currently-visible bottom sheet.
     */
    MatBottomSheet.prototype.dismiss = function () {
        if (this._openedBottomSheetRef) {
            this._openedBottomSheetRef.dismiss();
        }
    };
    MatBottomSheet.prototype.ngOnDestroy = function () {
        if (this._bottomSheetRefAtThisLevel) {
            this._bottomSheetRefAtThisLevel.dismiss();
        }
    };
    /**
     * Attaches the bottom sheet container component to the overlay.
     */
    MatBottomSheet.prototype._attachContainer = function (overlayRef, config) {
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var injector = new PortalInjector(userInjector || this._injector, new WeakMap([
            [MatBottomSheetConfig, config]
        ]));
        var containerPortal = new ComponentPortal(MatBottomSheetContainer, config.viewContainerRef, injector);
        var containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    };
    /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified bottom sheet config.
     */
    MatBottomSheet.prototype._createOverlay = function (config) {
        var overlayConfig = new OverlayConfig({
            direction: config.direction,
            hasBackdrop: config.hasBackdrop,
            disposeOnNavigation: config.closeOnNavigation,
            maxWidth: '100%',
            scrollStrategy: config.scrollStrategy || this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position().global().centerHorizontally().bottom('0')
        });
        if (config.backdropClass) {
            overlayConfig.backdropClass = config.backdropClass;
        }
        return this._overlay.create(overlayConfig);
    };
    /**
     * Creates an injector to be used inside of a bottom sheet component.
     * @param config Config that was used to create the bottom sheet.
     * @param bottomSheetRef Reference to the bottom sheet.
     */
    MatBottomSheet.prototype._createInjector = function (config, bottomSheetRef) {
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var injectionTokens = new WeakMap([
            [MatBottomSheetRef, bottomSheetRef],
            [MAT_BOTTOM_SHEET_DATA, config.data]
        ]);
        if (config.direction &&
            (!userInjector || !userInjector.get(Directionality, null))) {
            injectionTokens.set(Directionality, {
                value: config.direction,
                change: of()
            });
        }
        return new PortalInjector(userInjector || this._injector, injectionTokens);
    };
    MatBottomSheet.decorators = [
        { type: Injectable, args: [{ providedIn: MatBottomSheetModule },] }
    ];
    /** @nocollapse */
    MatBottomSheet.ctorParameters = function () { return [
        { type: Overlay },
        { type: Injector },
        { type: MatBottomSheet, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: Location, decorators: [{ type: Optional }] },
        { type: MatBottomSheetConfig, decorators: [{ type: Optional }, { type: Inject, args: [MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,] }] }
    ]; };
    MatBottomSheet.ɵprov = ɵɵdefineInjectable({ factory: function MatBottomSheet_Factory() { return new MatBottomSheet(ɵɵinject(Overlay), ɵɵinject(INJECTOR), ɵɵinject(MatBottomSheet, 12), ɵɵinject(Location, 8), ɵɵinject(MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, 8)); }, token: MatBottomSheet, providedIn: MatBottomSheetModule });
    return MatBottomSheet;
}());
/**
 * Applies default options to the bottom sheet config.
 * @param defaults Object containing the default values to which to fall back.
 * @param config The configuration to which the defaults will be applied.
 * @returns The new configuration object with defaults applied.
 */
function _applyConfigDefaults(defaults, config) {
    return __assign(__assign({}, defaults), config);
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBottomSheet, MAT_BOTTOM_SHEET_DATA, MatBottomSheetConfig, MatBottomSheetContainer, matBottomSheetAnimations, MatBottomSheetRef };
//# sourceMappingURL=bottom-sheet.js.map
