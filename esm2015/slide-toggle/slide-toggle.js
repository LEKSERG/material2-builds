/**
 * @fileoverview added by tsickle
 * Generated from: src/material/slide-toggle/slide-toggle.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation, NgZone, Optional, Inject, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinColor, mixinDisabled, mixinDisableRipple, mixinTabIndex, } from '@angular/material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS } from './slide-toggle-config';
// Increasing integer for generating unique ids for slide-toggle components.
/** @type {?} */
let nextUniqueId = 0;
/**
 * \@docs-private
 * @type {?}
 */
export const MAT_SLIDE_TOGGLE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MatSlideToggle)),
    multi: true
};
/**
 * Change event object emitted by a MatSlideToggle.
 */
export class MatSlideToggleChange {
    /**
     * @param {?} source
     * @param {?} checked
     */
    constructor(source, checked) {
        this.source = source;
        this.checked = checked;
    }
}
if (false) {
    /**
     * The source MatSlideToggle of the event.
     * @type {?}
     */
    MatSlideToggleChange.prototype.source;
    /**
     * The new `checked` value of the MatSlideToggle.
     * @type {?}
     */
    MatSlideToggleChange.prototype.checked;
}
// Boilerplate for applying mixins to MatSlideToggle.
/**
 * \@docs-private
 */
class MatSlideToggleBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    MatSlideToggleBase.prototype._elementRef;
}
/** @type {?} */
const _MatSlideToggleMixinBase = mixinTabIndex(mixinColor(mixinDisableRipple(mixinDisabled(MatSlideToggleBase)), 'accent'));
/**
 * Represents a slidable "switch" toggle that can be moved between on and off.
 */
export class MatSlideToggle extends _MatSlideToggleMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _focusMonitor
     * @param {?} _changeDetectorRef
     * @param {?} tabIndex
     * @param {?} _ngZone
     * @param {?} defaults
     * @param {?=} _animationMode
     * @param {?=} _dir
     */
    constructor(elementRef, _focusMonitor, _changeDetectorRef, tabIndex, 
    /**
     * @deprecated `_ngZone` and `_dir` parameters to be removed.
     * @breaking-change 10.0.0
     */
    _ngZone, defaults, _animationMode, _dir) {
        super(elementRef);
        this._focusMonitor = _focusMonitor;
        this._changeDetectorRef = _changeDetectorRef;
        this.defaults = defaults;
        this._animationMode = _animationMode;
        this._onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this._onTouched = (/**
         * @return {?}
         */
        () => { });
        this._uniqueId = `mat-slide-toggle-${++nextUniqueId}`;
        this._required = false;
        this._checked = false;
        /**
         * Name value will be applied to the input element if present.
         */
        this.name = null;
        /**
         * A unique id for the slide-toggle input. If none is supplied, it will be auto-generated.
         */
        this.id = this._uniqueId;
        /**
         * Whether the label should appear after or before the slide-toggle. Defaults to 'after'.
         */
        this.labelPosition = 'after';
        /**
         * Used to set the aria-label attribute on the underlying input element.
         */
        this.ariaLabel = null;
        /**
         * Used to set the aria-labelledby attribute on the underlying input element.
         */
        this.ariaLabelledby = null;
        /**
         * An event will be dispatched each time the slide-toggle changes its value.
         */
        this.change = new EventEmitter();
        /**
         * An event will be dispatched each time the slide-toggle input is toggled.
         * This event is always emitted when the user toggles the slide toggle, but this does not mean
         * the slide toggle's value has changed.
         */
        this.toggleChange = new EventEmitter();
        /**
         * An event will be dispatched each time the slide-toggle is dragged.
         * This event is always emitted when the user drags the slide toggle to make a change greater
         * than 50%. It does not mean the slide toggle's value is changed. The event is not emitted when
         * the user toggles the slide toggle to change its value.
         * @deprecated No longer being used. To be removed.
         * \@breaking-change 10.0.0
         */
        this.dragChange = new EventEmitter();
        this.tabIndex = parseInt(tabIndex) || 0;
    }
    /**
     * Whether the slide-toggle is required.
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * Whether the slide-toggle element is checked or not.
     * @return {?}
     */
    get checked() { return this._checked; }
    /**
     * @param {?} value
     * @return {?}
     */
    set checked(value) {
        this._checked = coerceBooleanProperty(value);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Returns the unique id for the visual hidden input.
     * @return {?}
     */
    get inputId() { return `${this.id || this._uniqueId}-input`; }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._focusMonitor
            .monitor(this._elementRef, true)
            .subscribe((/**
         * @param {?} focusOrigin
         * @return {?}
         */
        focusOrigin => {
            if (!focusOrigin) {
                // When a focused element becomes disabled, the browser *immediately* fires a blur event.
                // Angular does not expect events to be raised during change detection, so any state
                // change (such as a form control's 'ng-touched') will cause a changed-after-checked
                // error. See https://github.com/angular/angular/issues/17793. To work around this,
                // we defer telling the form control it has been touched until the next tick.
                Promise.resolve().then((/**
                 * @return {?}
                 */
                () => this._onTouched()));
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
    /**
     * Method being called whenever the underlying input emits a change event.
     * @param {?} event
     * @return {?}
     */
    _onChangeEvent(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the component's `change` output.
        event.stopPropagation();
        this.toggleChange.emit();
        // When the slide toggle's config disables toggle change event by setting
        // `disableToggleValue: true`, the slide toggle's value does not change, and the
        // checked state of the underlying input needs to be changed back.
        if (this.defaults.disableToggleValue) {
            this._inputElement.nativeElement.checked = this.checked;
            return;
        }
        // Sync the value from the underlying input element with the component instance.
        this.checked = this._inputElement.nativeElement.checked;
        // Emit our custom change event only if the underlying input emitted one. This ensures that
        // there is no change event, when the checked state changes programmatically.
        this._emitChangeEvent();
    }
    /**
     * Method being called whenever the slide-toggle has been clicked.
     * @param {?} event
     * @return {?}
     */
    _onInputClick(event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `slide-toggle` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = !!value;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Focuses the slide-toggle.
     * @param {?=} options
     * @return {?}
     */
    focus(options) {
        this._focusMonitor.focusVia(this._inputElement, 'keyboard', options);
    }
    /**
     * Toggles the checked state of the slide-toggle.
     * @return {?}
     */
    toggle() {
        this.checked = !this.checked;
        this._onChange(this.checked);
    }
    /**
     * Emits a change event on the `change` output. Also notifies the FormControl about the change.
     * @private
     * @return {?}
     */
    _emitChangeEvent() {
        this._onChange(this.checked);
        this.change.emit(new MatSlideToggleChange(this, this.checked));
    }
    /**
     * Method being called whenever the label text changes.
     * @return {?}
     */
    _onLabelTextChange() {
        // Since the event of the `cdkObserveContent` directive runs outside of the zone, the
        // slide-toggle component will be only marked for check, but no actual change detection runs
        // automatically. Instead of going back into the zone in order to trigger a change detection
        // which causes *all* components to be checked (if explicitly marked or not using OnPush),
        // we only trigger an explicit change detection for the slide-toggle view and its children.
        this._changeDetectorRef.detectChanges();
    }
}
MatSlideToggle.decorators = [
    { type: Component, args: [{
                selector: 'mat-slide-toggle',
                exportAs: 'matSlideToggle',
                host: {
                    'class': 'mat-slide-toggle',
                    '[id]': 'id',
                    // Needs to be `-1` so it can still receive programmatic focus.
                    '[attr.tabindex]': 'disabled ? null : -1',
                    '[attr.aria-label]': 'null',
                    '[attr.aria-labelledby]': 'null',
                    '[class.mat-checked]': 'checked',
                    '[class.mat-disabled]': 'disabled',
                    '[class.mat-slide-toggle-label-before]': 'labelPosition == "before"',
                    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                    '(focus)': '_inputElement.nativeElement.focus()',
                },
                template: "<label [attr.for]=\"inputId\" class=\"mat-slide-toggle-label\" #label>\n  <div #toggleBar class=\"mat-slide-toggle-bar\"\n       [class.mat-slide-toggle-bar-no-side-margin]=\"!labelContent.textContent || !labelContent.textContent.trim()\">\n\n    <input #input class=\"mat-slide-toggle-input cdk-visually-hidden\" type=\"checkbox\"\n           role=\"switch\"\n           [id]=\"inputId\"\n           [required]=\"required\"\n           [tabIndex]=\"tabIndex\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [attr.name]=\"name\"\n           [attr.aria-checked]=\"checked.toString()\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           (change)=\"_onChangeEvent($event)\"\n           (click)=\"_onInputClick($event)\">\n\n    <div class=\"mat-slide-toggle-thumb-container\" #thumbContainer>\n      <div class=\"mat-slide-toggle-thumb\"></div>\n      <div class=\"mat-slide-toggle-ripple\" mat-ripple\n           [matRippleTrigger]=\"label\"\n           [matRippleDisabled]=\"disableRipple || disabled\"\n           [matRippleCentered]=\"true\"\n           [matRippleRadius]=\"20\"\n           [matRippleAnimation]=\"{enterDuration: 150}\">\n\n        <div class=\"mat-ripple-element mat-slide-toggle-persistent-ripple\"></div>\n      </div>\n    </div>\n\n  </div>\n\n  <span class=\"mat-slide-toggle-content\" #labelContent (cdkObserveContent)=\"_onLabelTextChange()\">\n    <!-- Add an invisible span so JAWS can read the label -->\n    <span style=\"display:none\">&nbsp;</span>\n    <ng-content></ng-content>\n  </span>\n</label>\n",
                providers: [MAT_SLIDE_TOGGLE_VALUE_ACCESSOR],
                inputs: ['disabled', 'disableRipple', 'color', 'tabIndex'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mat-slide-toggle{display:inline-block;height:24px;max-width:100%;line-height:24px;white-space:nowrap;outline:none;-webkit-tap-highlight-color:transparent}.mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container{transform:translate3d(16px, 0, 0)}[dir=rtl] .mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container{transform:translate3d(-16px, 0, 0)}.mat-slide-toggle.mat-disabled{opacity:.38}.mat-slide-toggle.mat-disabled .mat-slide-toggle-label,.mat-slide-toggle.mat-disabled .mat-slide-toggle-thumb-container{cursor:default}.mat-slide-toggle-label{display:flex;flex:1;flex-direction:row;align-items:center;height:inherit;cursor:pointer}.mat-slide-toggle-content{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-slide-toggle-label-before .mat-slide-toggle-label{order:1}.mat-slide-toggle-label-before .mat-slide-toggle-bar{order:2}[dir=rtl] .mat-slide-toggle-label-before .mat-slide-toggle-bar,.mat-slide-toggle-bar{margin-right:8px;margin-left:0}[dir=rtl] .mat-slide-toggle-bar,.mat-slide-toggle-label-before .mat-slide-toggle-bar{margin-left:8px;margin-right:0}.mat-slide-toggle-bar-no-side-margin{margin-left:0;margin-right:0}.mat-slide-toggle-thumb-container{position:absolute;z-index:1;width:20px;height:20px;top:-3px;left:0;transform:translate3d(0, 0, 0);transition:all 80ms linear;transition-property:transform}._mat-animation-noopable .mat-slide-toggle-thumb-container{transition:none}[dir=rtl] .mat-slide-toggle-thumb-container{left:auto;right:0}.mat-slide-toggle-thumb{height:20px;width:20px;border-radius:50%}.mat-slide-toggle-bar{position:relative;width:36px;height:14px;flex-shrink:0;border-radius:8px}.mat-slide-toggle-input{bottom:0;left:10px}[dir=rtl] .mat-slide-toggle-input{left:auto;right:10px}.mat-slide-toggle-bar,.mat-slide-toggle-thumb{transition:all 80ms linear;transition-property:background-color;transition-delay:50ms}._mat-animation-noopable .mat-slide-toggle-bar,._mat-animation-noopable .mat-slide-toggle-thumb{transition:none}.mat-slide-toggle .mat-slide-toggle-ripple{position:absolute;top:calc(50% - 20px);left:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.mat-slide-toggle .mat-slide-toggle-ripple .mat-ripple-element:not(.mat-slide-toggle-persistent-ripple){opacity:.12}.mat-slide-toggle-persistent-ripple{width:100%;height:100%;transform:none}.mat-slide-toggle-bar:hover .mat-slide-toggle-persistent-ripple{opacity:.04}.mat-slide-toggle:not(.mat-disabled).cdk-keyboard-focused .mat-slide-toggle-persistent-ripple{opacity:.12}.mat-slide-toggle-persistent-ripple,.mat-slide-toggle.mat-disabled .mat-slide-toggle-bar:hover .mat-slide-toggle-persistent-ripple{opacity:0}@media(hover: none){.mat-slide-toggle-bar:hover .mat-slide-toggle-persistent-ripple{display:none}}.cdk-high-contrast-active .mat-slide-toggle-thumb{background:#fff;border:1px solid #000}.mat-slide-toggle.mat-checked .cdk-high-contrast-active .mat-slide-toggle-thumb{background:#000;border:1px solid #fff}.cdk-high-contrast-active .mat-slide-toggle-bar{background:#fff}.mat-slide-toggle.cdk-keyboard-focused .cdk-high-contrast-active .mat-slide-toggle-bar{outline:1px dotted;outline-offset:5px}.cdk-high-contrast-black-on-white .mat-slide-toggle-bar{border:1px solid #000}\n"]
            }] }
];
/** @nocollapse */
MatSlideToggle.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
MatSlideToggle.propDecorators = {
    _thumbEl: [{ type: ViewChild, args: ['thumbContainer',] }],
    _thumbBarEl: [{ type: ViewChild, args: ['toggleBar',] }],
    name: [{ type: Input }],
    id: [{ type: Input }],
    labelPosition: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    required: [{ type: Input }],
    checked: [{ type: Input }],
    change: [{ type: Output }],
    toggleChange: [{ type: Output }],
    dragChange: [{ type: Output }],
    _inputElement: [{ type: ViewChild, args: ['input',] }]
};
if (false) {
    /** @type {?} */
    MatSlideToggle.ngAcceptInputType_required;
    /** @type {?} */
    MatSlideToggle.ngAcceptInputType_checked;
    /** @type {?} */
    MatSlideToggle.ngAcceptInputType_disabled;
    /** @type {?} */
    MatSlideToggle.ngAcceptInputType_disableRipple;
    /**
     * @type {?}
     * @private
     */
    MatSlideToggle.prototype._onChange;
    /**
     * @type {?}
     * @private
     */
    MatSlideToggle.prototype._onTouched;
    /**
     * @type {?}
     * @private
     */
    MatSlideToggle.prototype._uniqueId;
    /**
     * @type {?}
     * @private
     */
    MatSlideToggle.prototype._required;
    /**
     * @type {?}
     * @private
     */
    MatSlideToggle.prototype._checked;
    /**
     * Reference to the thumb HTMLElement.
     * @type {?}
     */
    MatSlideToggle.prototype._thumbEl;
    /**
     * Reference to the thumb bar HTMLElement.
     * @type {?}
     */
    MatSlideToggle.prototype._thumbBarEl;
    /**
     * Name value will be applied to the input element if present.
     * @type {?}
     */
    MatSlideToggle.prototype.name;
    /**
     * A unique id for the slide-toggle input. If none is supplied, it will be auto-generated.
     * @type {?}
     */
    MatSlideToggle.prototype.id;
    /**
     * Whether the label should appear after or before the slide-toggle. Defaults to 'after'.
     * @type {?}
     */
    MatSlideToggle.prototype.labelPosition;
    /**
     * Used to set the aria-label attribute on the underlying input element.
     * @type {?}
     */
    MatSlideToggle.prototype.ariaLabel;
    /**
     * Used to set the aria-labelledby attribute on the underlying input element.
     * @type {?}
     */
    MatSlideToggle.prototype.ariaLabelledby;
    /**
     * An event will be dispatched each time the slide-toggle changes its value.
     * @type {?}
     */
    MatSlideToggle.prototype.change;
    /**
     * An event will be dispatched each time the slide-toggle input is toggled.
     * This event is always emitted when the user toggles the slide toggle, but this does not mean
     * the slide toggle's value has changed.
     * @type {?}
     */
    MatSlideToggle.prototype.toggleChange;
    /**
     * An event will be dispatched each time the slide-toggle is dragged.
     * This event is always emitted when the user drags the slide toggle to make a change greater
     * than 50%. It does not mean the slide toggle's value is changed. The event is not emitted when
     * the user toggles the slide toggle to change its value.
     * @deprecated No longer being used. To be removed.
     * \@breaking-change 10.0.0
     * @type {?}
     */
    MatSlideToggle.prototype.dragChange;
    /**
     * Reference to the underlying input element.
     * @type {?}
     */
    MatSlideToggle.prototype._inputElement;
    /**
     * @type {?}
     * @private
     */
    MatSlideToggle.prototype._focusMonitor;
    /**
     * @type {?}
     * @private
     */
    MatSlideToggle.prototype._changeDetectorRef;
    /** @type {?} */
    MatSlideToggle.prototype.defaults;
    /** @type {?} */
    MatSlideToggle.prototype._animationMode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3NsaWRlLXRvZ2dsZS9zbGlkZS10b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBRUwsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNqQixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUtMLFVBQVUsRUFDVixhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLGFBQWEsR0FDZCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFDTCxnQ0FBZ0MsRUFFakMsTUFBTSx1QkFBdUIsQ0FBQzs7O0lBRzNCLFlBQVksR0FBRyxDQUFDOzs7OztBQUdwQixNQUFNLE9BQU8sK0JBQStCLEdBQVE7SUFDbEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsY0FBYyxFQUFDO0lBQzdDLEtBQUssRUFBRSxJQUFJO0NBQ1o7Ozs7QUFHRCxNQUFNLE9BQU8sb0JBQW9COzs7OztJQUMvQixZQUVTLE1BQXNCLEVBRXRCLE9BQWdC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SUFFOUIsbUNBQWlFOzs7OztJQUNqRSxtQ0FBbUM7Ozs7O0lBQ25DLGtDQUFrQzs7Ozs7SUFHbEMsa0NBQWtEOzs7OztJQUdsRCxxQ0FBZ0Q7Ozs7O0lBR2hELDhCQUFvQzs7Ozs7SUFHcEMsNEJBQXFDOzs7OztJQUdyQyx1Q0FBcUQ7Ozs7O0lBR3JELG1DQUFxRDs7Ozs7SUFHckQsd0NBQStEOzs7OztJQWUvRCxnQ0FDNkM7Ozs7Ozs7SUFPN0Msc0NBQStFOzs7Ozs7Ozs7O0lBVS9FLG9DQUE2RTs7Ozs7SUFNN0UsdUNBQWdFOzs7OztJQUdwRCx1Q0FBbUM7Ozs7O0lBQ25DLDRDQUE2Qzs7SUFPN0Msa0NBQ2lEOztJQUNqRCx3Q0FBeUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtGb2N1c01vbml0b3J9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE5nWm9uZSxcbiAgT3B0aW9uYWwsXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvcixcbiAgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsXG4gIENhbkRpc2FibGVSaXBwbGUsIENhbkRpc2FibGVSaXBwbGVDdG9yLFxuICBIYXNUYWJJbmRleCwgSGFzVGFiSW5kZXhDdG9yLFxuICBtaXhpbkNvbG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpbkRpc2FibGVSaXBwbGUsXG4gIG1peGluVGFiSW5kZXgsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBNQVRfU0xJREVfVE9HR0xFX0RFRkFVTFRfT1BUSU9OUyxcbiAgTWF0U2xpZGVUb2dnbGVEZWZhdWx0T3B0aW9uc1xufSBmcm9tICcuL3NsaWRlLXRvZ2dsZS1jb25maWcnO1xuXG4vLyBJbmNyZWFzaW5nIGludGVnZXIgZm9yIGdlbmVyYXRpbmcgdW5pcXVlIGlkcyBmb3Igc2xpZGUtdG9nZ2xlIGNvbXBvbmVudHMuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQVRfU0xJREVfVE9HR0xFX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRTbGlkZVRvZ2dsZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IGEgTWF0U2xpZGVUb2dnbGUuICovXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVUb2dnbGVDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogVGhlIHNvdXJjZSBNYXRTbGlkZVRvZ2dsZSBvZiB0aGUgZXZlbnQuICovXG4gICAgcHVibGljIHNvdXJjZTogTWF0U2xpZGVUb2dnbGUsXG4gICAgLyoqIFRoZSBuZXcgYGNoZWNrZWRgIHZhbHVlIG9mIHRoZSBNYXRTbGlkZVRvZ2dsZS4gKi9cbiAgICBwdWJsaWMgY2hlY2tlZDogYm9vbGVhbikgeyB9XG59XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0U2xpZGVUb2dnbGUuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuY2xhc3MgTWF0U2xpZGVUb2dnbGVCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuY29uc3QgX01hdFNsaWRlVG9nZ2xlTWl4aW5CYXNlOlxuICAgIEhhc1RhYkluZGV4Q3RvciAmXG4gICAgQ2FuQ29sb3JDdG9yICZcbiAgICBDYW5EaXNhYmxlUmlwcGxlQ3RvciAmXG4gICAgQ2FuRGlzYWJsZUN0b3IgJlxuICAgIHR5cGVvZiBNYXRTbGlkZVRvZ2dsZUJhc2UgPVxuICAgICAgICBtaXhpblRhYkluZGV4KG1peGluQ29sb3IobWl4aW5EaXNhYmxlUmlwcGxlKG1peGluRGlzYWJsZWQoTWF0U2xpZGVUb2dnbGVCYXNlKSksICdhY2NlbnQnKSk7XG5cbi8qKiBSZXByZXNlbnRzIGEgc2xpZGFibGUgXCJzd2l0Y2hcIiB0b2dnbGUgdGhhdCBjYW4gYmUgbW92ZWQgYmV0d2VlbiBvbiBhbmQgb2ZmLiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNsaWRlLXRvZ2dsZScsXG4gIGV4cG9ydEFzOiAnbWF0U2xpZGVUb2dnbGUnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1zbGlkZS10b2dnbGUnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAvLyBOZWVkcyB0byBiZSBgLTFgIHNvIGl0IGNhbiBzdGlsbCByZWNlaXZlIHByb2dyYW1tYXRpYyBmb2N1cy5cbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IC0xJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbF0nOiAnbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnbnVsbCcsXG4gICAgJ1tjbGFzcy5tYXQtY2hlY2tlZF0nOiAnY2hlY2tlZCcsXG4gICAgJ1tjbGFzcy5tYXQtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1zbGlkZS10b2dnbGUtbGFiZWwtYmVmb3JlXSc6ICdsYWJlbFBvc2l0aW9uID09IFwiYmVmb3JlXCInLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJ19hbmltYXRpb25Nb2RlID09PSBcIk5vb3BBbmltYXRpb25zXCInLFxuICAgICcoZm9jdXMpJzogJ19pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpJyxcbiAgfSxcbiAgdGVtcGxhdGVVcmw6ICdzbGlkZS10b2dnbGUuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzbGlkZS10b2dnbGUuY3NzJ10sXG4gIHByb3ZpZGVyczogW01BVF9TTElERV9UT0dHTEVfVkFMVUVfQUNDRVNTT1JdLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAnZGlzYWJsZVJpcHBsZScsICdjb2xvcicsICd0YWJJbmRleCddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2xpZGVUb2dnbGUgZXh0ZW5kcyBfTWF0U2xpZGVUb2dnbGVNaXhpbkJhc2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbkRpc2FibGUsIENhbkNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGFzVGFiSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYW5EaXNhYmxlUmlwcGxlIHtcbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBfdW5pcXVlSWQ6IHN0cmluZyA9IGBtYXQtc2xpZGUtdG9nZ2xlLSR7KytuZXh0VW5pcXVlSWR9YDtcbiAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHRodW1iIEhUTUxFbGVtZW50LiAqL1xuICBAVmlld0NoaWxkKCd0aHVtYkNvbnRhaW5lcicpIF90aHVtYkVsOiBFbGVtZW50UmVmO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHRodW1iIGJhciBIVE1MRWxlbWVudC4gKi9cbiAgQFZpZXdDaGlsZCgndG9nZ2xlQmFyJykgX3RodW1iQmFyRWw6IEVsZW1lbnRSZWY7XG5cbiAgLyoqIE5hbWUgdmFsdWUgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBpbnB1dCBlbGVtZW50IGlmIHByZXNlbnQuICovXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIHNsaWRlLXRvZ2dsZSBpbnB1dC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYXBwZWFyIGFmdGVyIG9yIGJlZm9yZSB0aGUgc2xpZGUtdG9nZ2xlLiBEZWZhdWx0cyB0byAnYWZ0ZXInLiAqL1xuICBASW5wdXQoKSBsYWJlbFBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcicgPSAnYWZ0ZXInO1xuXG4gIC8qKiBVc2VkIHRvIHNldCB0aGUgYXJpYS1sYWJlbCBhdHRyaWJ1dGUgb24gdGhlIHVuZGVybHlpbmcgaW5wdXQgZWxlbWVudC4gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKiogVXNlZCB0byBzZXQgdGhlIGFyaWEtbGFiZWxsZWRieSBhdHRyaWJ1dGUgb24gdGhlIHVuZGVybHlpbmcgaW5wdXQgZWxlbWVudC4gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlLXRvZ2dsZSBpcyByZXF1aXJlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7IH1cbiAgc2V0IHJlcXVpcmVkKHZhbHVlKSB7IHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZS10b2dnbGUgZWxlbWVudCBpcyBjaGVja2VkIG9yIG5vdC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jaGVja2VkOyB9XG4gIHNldCBjaGVja2VkKHZhbHVlKSB7XG4gICAgdGhpcy5fY2hlY2tlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbiAgLyoqIEFuIGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCBlYWNoIHRpbWUgdGhlIHNsaWRlLXRvZ2dsZSBjaGFuZ2VzIGl0cyB2YWx1ZS4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdFNsaWRlVG9nZ2xlQ2hhbmdlPiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPE1hdFNsaWRlVG9nZ2xlQ2hhbmdlPigpO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgZWFjaCB0aW1lIHRoZSBzbGlkZS10b2dnbGUgaW5wdXQgaXMgdG9nZ2xlZC5cbiAgICogVGhpcyBldmVudCBpcyBhbHdheXMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIHRvZ2dsZXMgdGhlIHNsaWRlIHRvZ2dsZSwgYnV0IHRoaXMgZG9lcyBub3QgbWVhblxuICAgKiB0aGUgc2xpZGUgdG9nZ2xlJ3MgdmFsdWUgaGFzIGNoYW5nZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdG9nZ2xlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCBlYWNoIHRpbWUgdGhlIHNsaWRlLXRvZ2dsZSBpcyBkcmFnZ2VkLlxuICAgKiBUaGlzIGV2ZW50IGlzIGFsd2F5cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgZHJhZ3MgdGhlIHNsaWRlIHRvZ2dsZSB0byBtYWtlIGEgY2hhbmdlIGdyZWF0ZXJcbiAgICogdGhhbiA1MCUuIEl0IGRvZXMgbm90IG1lYW4gdGhlIHNsaWRlIHRvZ2dsZSdzIHZhbHVlIGlzIGNoYW5nZWQuIFRoZSBldmVudCBpcyBub3QgZW1pdHRlZCB3aGVuXG4gICAqIHRoZSB1c2VyIHRvZ2dsZXMgdGhlIHNsaWRlIHRvZ2dsZSB0byBjaGFuZ2UgaXRzIHZhbHVlLlxuICAgKiBAZGVwcmVjYXRlZCBObyBsb25nZXIgYmVpbmcgdXNlZC4gVG8gYmUgcmVtb3ZlZC5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMC4wLjBcbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBkcmFnQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIFJldHVybnMgdGhlIHVuaXF1ZSBpZCBmb3IgdGhlIHZpc3VhbCBoaWRkZW4gaW5wdXQuICovXG4gIGdldCBpbnB1dElkKCk6IHN0cmluZyB7IHJldHVybiBgJHt0aGlzLmlkIHx8IHRoaXMuX3VuaXF1ZUlkfS1pbnB1dGA7IH1cblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQuICovXG4gIEBWaWV3Q2hpbGQoJ2lucHV0JykgX2lucHV0RWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQGRlcHJlY2F0ZWQgYF9uZ1pvbmVgIGFuZCBgX2RpcmAgcGFyYW1ldGVycyB0byBiZSByZW1vdmVkLlxuICAgICAgICAgICAgICAgICAqIEBicmVha2luZy1jaGFuZ2UgMTAuMC4wXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgQEluamVjdChNQVRfU0xJREVfVE9HR0xFX0RFRkFVTFRfT1BUSU9OUylcbiAgICAgICAgICAgICAgICAgIHB1YmxpYyBkZWZhdWx0czogTWF0U2xpZGVUb2dnbGVEZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgX2Rpcj86IERpcmVjdGlvbmFsaXR5KSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlSW50KHRhYkluZGV4KSB8fCAwO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2ZvY3VzTW9uaXRvclxuICAgICAgLm1vbml0b3IodGhpcy5fZWxlbWVudFJlZiwgdHJ1ZSlcbiAgICAgIC5zdWJzY3JpYmUoZm9jdXNPcmlnaW4gPT4ge1xuICAgICAgICBpZiAoIWZvY3VzT3JpZ2luKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIGZvY3VzZWQgZWxlbWVudCBiZWNvbWVzIGRpc2FibGVkLCB0aGUgYnJvd3NlciAqaW1tZWRpYXRlbHkqIGZpcmVzIGEgYmx1ciBldmVudC5cbiAgICAgICAgICAvLyBBbmd1bGFyIGRvZXMgbm90IGV4cGVjdCBldmVudHMgdG8gYmUgcmFpc2VkIGR1cmluZyBjaGFuZ2UgZGV0ZWN0aW9uLCBzbyBhbnkgc3RhdGVcbiAgICAgICAgICAvLyBjaGFuZ2UgKHN1Y2ggYXMgYSBmb3JtIGNvbnRyb2wncyAnbmctdG91Y2hlZCcpIHdpbGwgY2F1c2UgYSBjaGFuZ2VkLWFmdGVyLWNoZWNrZWRcbiAgICAgICAgICAvLyBlcnJvci4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE3NzkzLiBUbyB3b3JrIGFyb3VuZCB0aGlzLFxuICAgICAgICAgIC8vIHdlIGRlZmVyIHRlbGxpbmcgdGhlIGZvcm0gY29udHJvbCBpdCBoYXMgYmVlbiB0b3VjaGVkIHVudGlsIHRoZSBuZXh0IHRpY2suXG4gICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLl9vblRvdWNoZWQoKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnRSZWYpO1xuICB9XG5cbiAgLyoqIE1ldGhvZCBiZWluZyBjYWxsZWQgd2hlbmV2ZXIgdGhlIHVuZGVybHlpbmcgaW5wdXQgZW1pdHMgYSBjaGFuZ2UgZXZlbnQuICovXG4gIF9vbkNoYW5nZUV2ZW50KGV2ZW50OiBFdmVudCkge1xuICAgIC8vIFdlIGFsd2F5cyBoYXZlIHRvIHN0b3AgcHJvcGFnYXRpb24gb24gdGhlIGNoYW5nZSBldmVudC5cbiAgICAvLyBPdGhlcndpc2UgdGhlIGNoYW5nZSBldmVudCwgZnJvbSB0aGUgaW5wdXQgZWxlbWVudCwgd2lsbCBidWJibGUgdXAgYW5kXG4gICAgLy8gZW1pdCBpdHMgZXZlbnQgb2JqZWN0IHRvIHRoZSBjb21wb25lbnQncyBgY2hhbmdlYCBvdXRwdXQuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy50b2dnbGVDaGFuZ2UuZW1pdCgpO1xuXG4gICAgLy8gV2hlbiB0aGUgc2xpZGUgdG9nZ2xlJ3MgY29uZmlnIGRpc2FibGVzIHRvZ2dsZSBjaGFuZ2UgZXZlbnQgYnkgc2V0dGluZ1xuICAgIC8vIGBkaXNhYmxlVG9nZ2xlVmFsdWU6IHRydWVgLCB0aGUgc2xpZGUgdG9nZ2xlJ3MgdmFsdWUgZG9lcyBub3QgY2hhbmdlLCBhbmQgdGhlXG4gICAgLy8gY2hlY2tlZCBzdGF0ZSBvZiB0aGUgdW5kZXJseWluZyBpbnB1dCBuZWVkcyB0byBiZSBjaGFuZ2VkIGJhY2suXG4gICAgaWYgKHRoaXMuZGVmYXVsdHMuZGlzYWJsZVRvZ2dsZVZhbHVlKSB7XG4gICAgICB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGVja2VkID0gdGhpcy5jaGVja2VkO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFN5bmMgdGhlIHZhbHVlIGZyb20gdGhlIHVuZGVybHlpbmcgaW5wdXQgZWxlbWVudCB3aXRoIHRoZSBjb21wb25lbnQgaW5zdGFuY2UuXG4gICAgdGhpcy5jaGVja2VkID0gdGhpcy5faW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZDtcblxuICAgIC8vIEVtaXQgb3VyIGN1c3RvbSBjaGFuZ2UgZXZlbnQgb25seSBpZiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbWl0dGVkIG9uZS4gVGhpcyBlbnN1cmVzIHRoYXRcbiAgICAvLyB0aGVyZSBpcyBubyBjaGFuZ2UgZXZlbnQsIHdoZW4gdGhlIGNoZWNrZWQgc3RhdGUgY2hhbmdlcyBwcm9ncmFtbWF0aWNhbGx5LlxuICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICB9XG5cbiAgLyoqIE1ldGhvZCBiZWluZyBjYWxsZWQgd2hlbmV2ZXIgdGhlIHNsaWRlLXRvZ2dsZSBoYXMgYmVlbiBjbGlja2VkLiAqL1xuICBfb25JbnB1dENsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgIC8vIFdlIGhhdmUgdG8gc3RvcCBwcm9wYWdhdGlvbiBmb3IgY2xpY2sgZXZlbnRzIG9uIHRoZSB2aXN1YWwgaGlkZGVuIGlucHV0IGVsZW1lbnQuXG4gICAgLy8gQnkgZGVmYXVsdCwgd2hlbiBhIHVzZXIgY2xpY2tzIG9uIGEgbGFiZWwgZWxlbWVudCwgYSBnZW5lcmF0ZWQgY2xpY2sgZXZlbnQgd2lsbCBiZVxuICAgIC8vIGRpc3BhdGNoZWQgb24gdGhlIGFzc29jaWF0ZWQgaW5wdXQgZWxlbWVudC4gU2luY2Ugd2UgYXJlIHVzaW5nIGEgbGFiZWwgZWxlbWVudCBhcyBvdXJcbiAgICAvLyByb290IGNvbnRhaW5lciwgdGhlIGNsaWNrIGV2ZW50IG9uIHRoZSBgc2xpZGUtdG9nZ2xlYCB3aWxsIGJlIGV4ZWN1dGVkIHR3aWNlLlxuICAgIC8vIFRoZSByZWFsIGNsaWNrIGV2ZW50IHdpbGwgYnViYmxlIHVwLCBhbmQgdGhlIGdlbmVyYXRlZCBjbGljayBldmVudCBhbHNvIHRyaWVzIHRvIGJ1YmJsZSB1cC5cbiAgICAvLyBUaGlzIHdpbGwgbGVhZCB0byBtdWx0aXBsZSBjbGljayBldmVudHMuXG4gICAgLy8gUHJldmVudGluZyBidWJibGluZyBmb3IgdGhlIHNlY29uZCBldmVudCB3aWxsIHNvbHZlIHRoYXQgaXNzdWUuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2VkID0gISF2YWx1ZTtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLiAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKiBJbXBsZW1lbnRlZCBhcyBhIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIHNsaWRlLXRvZ2dsZS4gKi9cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLl9pbnB1dEVsZW1lbnQsICdrZXlib2FyZCcsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIFRvZ2dsZXMgdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhlIHNsaWRlLXRvZ2dsZS4gKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGNoYW5nZSBldmVudCBvbiB0aGUgYGNoYW5nZWAgb3V0cHV0LiBBbHNvIG5vdGlmaWVzIHRoZSBGb3JtQ29udHJvbCBhYm91dCB0aGUgY2hhbmdlLlxuICAgKi9cbiAgcHJpdmF0ZSBfZW1pdENoYW5nZUV2ZW50KCkge1xuICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMuY2hlY2tlZCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChuZXcgTWF0U2xpZGVUb2dnbGVDaGFuZ2UodGhpcywgdGhpcy5jaGVja2VkKSk7XG4gIH1cblxuICAvKiogTWV0aG9kIGJlaW5nIGNhbGxlZCB3aGVuZXZlciB0aGUgbGFiZWwgdGV4dCBjaGFuZ2VzLiAqL1xuICBfb25MYWJlbFRleHRDaGFuZ2UoKSB7XG4gICAgLy8gU2luY2UgdGhlIGV2ZW50IG9mIHRoZSBgY2RrT2JzZXJ2ZUNvbnRlbnRgIGRpcmVjdGl2ZSBydW5zIG91dHNpZGUgb2YgdGhlIHpvbmUsIHRoZVxuICAgIC8vIHNsaWRlLXRvZ2dsZSBjb21wb25lbnQgd2lsbCBiZSBvbmx5IG1hcmtlZCBmb3IgY2hlY2ssIGJ1dCBubyBhY3R1YWwgY2hhbmdlIGRldGVjdGlvbiBydW5zXG4gICAgLy8gYXV0b21hdGljYWxseS4gSW5zdGVhZCBvZiBnb2luZyBiYWNrIGludG8gdGhlIHpvbmUgaW4gb3JkZXIgdG8gdHJpZ2dlciBhIGNoYW5nZSBkZXRlY3Rpb25cbiAgICAvLyB3aGljaCBjYXVzZXMgKmFsbCogY29tcG9uZW50cyB0byBiZSBjaGVja2VkIChpZiBleHBsaWNpdGx5IG1hcmtlZCBvciBub3QgdXNpbmcgT25QdXNoKSxcbiAgICAvLyB3ZSBvbmx5IHRyaWdnZXIgYW4gZXhwbGljaXQgY2hhbmdlIGRldGVjdGlvbiBmb3IgdGhlIHNsaWRlLXRvZ2dsZSB2aWV3IGFuZCBpdHMgY2hpbGRyZW4uXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlcXVpcmVkOiBib29sZWFuIHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2NoZWNrZWQ6IGJvb2xlYW4gfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IGJvb2xlYW4gfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogYm9vbGVhbiB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG59XG4iXX0=