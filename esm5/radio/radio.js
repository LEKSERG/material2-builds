/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Inject, InjectionToken, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinDisableRipple, mixinTabIndex, } from '@angular/material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
export var MAT_RADIO_DEFAULT_OPTIONS = new InjectionToken('mat-radio-default-options', {
    providedIn: 'root',
    factory: MAT_RADIO_DEFAULT_OPTIONS_FACTORY
});
export function MAT_RADIO_DEFAULT_OPTIONS_FACTORY() {
    return {
        color: 'accent'
    };
}
// Increasing integer for generating unique ids for radio components.
var nextUniqueId = 0;
/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export var MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MatRadioGroup; }),
    multi: true
};
/** Change event object emitted by MatRadio and MatRadioGroup. */
var MatRadioChange = /** @class */ (function () {
    function MatRadioChange(
    /** The MatRadioButton that emits the change event. */
    source, 
    /** The value of the MatRadioButton. */
    value) {
        this.source = source;
        this.value = value;
    }
    return MatRadioChange;
}());
export { MatRadioChange };
/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
var MatRadioGroup = /** @class */ (function () {
    function MatRadioGroup(_changeDetector) {
        this._changeDetector = _changeDetector;
        /** Selected value for the radio group. */
        this._value = null;
        /** The HTML name attribute applied to radio buttons in this group. */
        this._name = "mat-radio-group-" + nextUniqueId++;
        /** The currently selected radio button. Should match value. */
        this._selected = null;
        /** Whether the `value` has been set to its initial value. */
        this._isInitialized = false;
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        this._labelPosition = 'after';
        /** Whether the radio group is disabled. */
        this._disabled = false;
        /** Whether the radio group is required. */
        this._required = false;
        /** The method to be called in order to update ngModel */
        this._controlValueAccessorChangeFn = function () { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         * @docs-private
         */
        this.onTouched = function () { };
        /**
         * Event emitted when the group value changes.
         * Change events are only emitted when the value changes due to user interaction with
         * a radio button (the same behavior as `<input type-"radio">`).
         */
        this.change = new EventEmitter();
    }
    Object.defineProperty(MatRadioGroup.prototype, "name", {
        /** Name of the radio button group. All radio buttons inside this group will use this name. */
        get: function () { return this._name; },
        set: function (value) {
            this._name = value;
            this._updateRadioButtonNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioGroup.prototype, "labelPosition", {
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        get: function () {
            return this._labelPosition;
        },
        set: function (v) {
            this._labelPosition = v === 'before' ? 'before' : 'after';
            this._markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioGroup.prototype, "value", {
        /**
         * Value for the radio-group. Should equal the value of the selected radio button if there is
         * a corresponding radio button with a matching value. If there is not such a corresponding
         * radio button, this value persists to be applied in case a new radio button is added with a
         * matching value.
         */
        get: function () { return this._value; },
        set: function (newValue) {
            if (this._value !== newValue) {
                // Set this before proceeding to ensure no circular loop occurs with selection.
                this._value = newValue;
                this._updateSelectedRadioFromValue();
                this._checkSelectedRadioButton();
            }
        },
        enumerable: true,
        configurable: true
    });
    MatRadioGroup.prototype._checkSelectedRadioButton = function () {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    };
    Object.defineProperty(MatRadioGroup.prototype, "selected", {
        /**
         * The currently selected radio button. If set to a new radio button, the radio group value
         * will be updated to match the new selected button.
         */
        get: function () { return this._selected; },
        set: function (selected) {
            this._selected = selected;
            this.value = selected ? selected.value : null;
            this._checkSelectedRadioButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioGroup.prototype, "disabled", {
        /** Whether the radio group is disabled */
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
            this._markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioGroup.prototype, "required", {
        /** Whether the radio group is required */
        get: function () { return this._required; },
        set: function (value) {
            this._required = coerceBooleanProperty(value);
            this._markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    MatRadioGroup.prototype.ngAfterContentInit = function () {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on MatRadioGroup, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the MatRadioGroup.
        this._isInitialized = true;
    };
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     */
    MatRadioGroup.prototype._touch = function () {
        if (this.onTouched) {
            this.onTouched();
        }
    };
    MatRadioGroup.prototype._updateRadioButtonNames = function () {
        var _this = this;
        if (this._radios) {
            this._radios.forEach(function (radio) {
                radio.name = _this.name;
                radio._markForCheck();
            });
        }
    };
    /** Updates the `selected` radio button from the internal _value state. */
    MatRadioGroup.prototype._updateSelectedRadioFromValue = function () {
        var _this = this;
        // If the value already matches the selected radio, do nothing.
        var isAlreadySelected = this._selected !== null && this._selected.value === this._value;
        if (this._radios && !isAlreadySelected) {
            this._selected = null;
            this._radios.forEach(function (radio) {
                radio.checked = _this.value === radio.value;
                if (radio.checked) {
                    _this._selected = radio;
                }
            });
        }
    };
    /** Dispatch change event with current selection and group value. */
    MatRadioGroup.prototype._emitChangeEvent = function () {
        if (this._isInitialized) {
            this.change.emit(new MatRadioChange(this._selected, this._value));
        }
    };
    MatRadioGroup.prototype._markRadiosForCheck = function () {
        if (this._radios) {
            this._radios.forEach(function (radio) { return radio._markForCheck(); });
        }
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value
     */
    MatRadioGroup.prototype.writeValue = function (value) {
        this.value = value;
        this._changeDetector.markForCheck();
    };
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    MatRadioGroup.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    MatRadioGroup.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the control should be disabled.
     */
    MatRadioGroup.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this._changeDetector.markForCheck();
    };
    MatRadioGroup.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-radio-group',
                    exportAs: 'matRadioGroup',
                    providers: [MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
                    host: {
                        'role': 'radiogroup',
                        'class': 'mat-radio-group',
                    },
                },] }
    ];
    /** @nocollapse */
    MatRadioGroup.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    MatRadioGroup.propDecorators = {
        change: [{ type: Output }],
        _radios: [{ type: ContentChildren, args: [forwardRef(function () { return MatRadioButton; }), { descendants: true },] }],
        color: [{ type: Input }],
        name: [{ type: Input }],
        labelPosition: [{ type: Input }],
        value: [{ type: Input }],
        selected: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }]
    };
    return MatRadioGroup;
}());
export { MatRadioGroup };
// Boilerplate for applying mixins to MatRadioButton.
/** @docs-private */
var MatRadioButtonBase = /** @class */ (function () {
    function MatRadioButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatRadioButtonBase;
}());
// As per Material design specifications the selection control radio should use the accent color
// palette by default. https://material.io/guidelines/components/selection-controls.html
var _MatRadioButtonMixinBase = mixinDisableRipple(mixinTabIndex(MatRadioButtonBase));
/**
 * A Material design radio-button. Typically placed inside of `<mat-radio-group>` elements.
 */
var MatRadioButton = /** @class */ (function (_super) {
    __extends(MatRadioButton, _super);
    function MatRadioButton(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, _animationMode, _providerOverride) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetector = _changeDetector;
        _this._focusMonitor = _focusMonitor;
        _this._radioDispatcher = _radioDispatcher;
        _this._animationMode = _animationMode;
        _this._providerOverride = _providerOverride;
        _this._uniqueId = "mat-radio-" + ++nextUniqueId;
        /** The unique ID for the radio button. */
        _this.id = _this._uniqueId;
        /**
         * Event emitted when the checked state of this radio button changes.
         * Change events are only emitted when the value changes due to user interaction with
         * the radio button (the same behavior as `<input type-"radio">`).
         */
        _this.change = new EventEmitter();
        /** Whether this radio is checked. */
        _this._checked = false;
        /** Value assigned to this radio. */
        _this._value = null;
        /** Unregister function for _radioDispatcher */
        _this._removeUniqueSelectionListener = function () { };
        // Assertions. Ideally these should be stripped out by the compiler.
        // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.
        _this.radioGroup = radioGroup;
        _this._removeUniqueSelectionListener =
            _radioDispatcher.listen(function (id, name) {
                if (id !== _this.id && name === _this.name) {
                    _this.checked = false;
                }
            });
        return _this;
    }
    Object.defineProperty(MatRadioButton.prototype, "checked", {
        /** Whether this radio button is checked. */
        get: function () { return this._checked; },
        set: function (value) {
            var newCheckedState = coerceBooleanProperty(value);
            if (this._checked !== newCheckedState) {
                this._checked = newCheckedState;
                if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
                    this.radioGroup.selected = this;
                }
                else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
                    // When unchecking the selected radio button, update the selected radio
                    // property on the group.
                    this.radioGroup.selected = null;
                }
                if (newCheckedState) {
                    // Notify all radio buttons with the same name to un-check.
                    this._radioDispatcher.notify(this.id, this.name);
                }
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "value", {
        /** The value of this radio button. */
        get: function () { return this._value; },
        set: function (value) {
            if (this._value !== value) {
                this._value = value;
                if (this.radioGroup !== null) {
                    if (!this.checked) {
                        // Update checked when the value changed to match the radio group's value
                        this.checked = this.radioGroup.value === value;
                    }
                    if (this.checked) {
                        this.radioGroup.selected = this;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "labelPosition", {
        /** Whether the label should appear after or before the radio button. Defaults to 'after' */
        get: function () {
            return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
        },
        set: function (value) {
            this._labelPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "disabled", {
        /** Whether the radio button is disabled. */
        get: function () {
            return this._disabled || (this.radioGroup !== null && this.radioGroup.disabled);
        },
        set: function (value) {
            var newDisabledState = coerceBooleanProperty(value);
            if (this._disabled !== newDisabledState) {
                this._disabled = newDisabledState;
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "required", {
        /** Whether the radio button is required. */
        get: function () {
            return this._required || (this.radioGroup && this.radioGroup.required);
        },
        set: function (value) {
            this._required = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "color", {
        /** Theme color of the radio button. */
        get: function () {
            return this._color ||
                (this.radioGroup && this.radioGroup.color) ||
                this._providerOverride && this._providerOverride.color || 'accent';
        },
        set: function (newValue) { this._color = newValue; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "inputId", {
        /** ID of the native input element inside `<mat-radio-button>` */
        get: function () { return (this.id || this._uniqueId) + "-input"; },
        enumerable: true,
        configurable: true
    });
    /** Focuses the radio button. */
    MatRadioButton.prototype.focus = function (options) {
        this._focusMonitor.focusVia(this._inputElement, 'keyboard', options);
    };
    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     */
    MatRadioButton.prototype._markForCheck = function () {
        // When group value changes, the button will not be notified. Use `markForCheck` to explicit
        // update radio button's status
        this._changeDetector.markForCheck();
    };
    MatRadioButton.prototype.ngOnInit = function () {
        if (this.radioGroup) {
            // If the radio is inside a radio group, determine if it should be checked
            this.checked = this.radioGroup.value === this._value;
            // Copy name from parent radio group
            this.name = this.radioGroup.name;
        }
    };
    MatRadioButton.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._focusMonitor
            .monitor(this._elementRef, true)
            .subscribe(function (focusOrigin) {
            if (!focusOrigin && _this.radioGroup) {
                _this.radioGroup._touch();
            }
        });
    };
    MatRadioButton.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._elementRef);
        this._removeUniqueSelectionListener();
    };
    /** Dispatch change event with current value. */
    MatRadioButton.prototype._emitChangeEvent = function () {
        this.change.emit(new MatRadioChange(this, this._value));
    };
    MatRadioButton.prototype._isRippleDisabled = function () {
        return this.disableRipple || this.disabled;
    };
    MatRadioButton.prototype._onInputClick = function (event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `radio-button` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    /**
     * Triggered when the radio button received a click or the input recognized any change.
     * Clicking on a label element, will trigger a change event on the associated input.
     */
    MatRadioButton.prototype._onInputChange = function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        var groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
        this.checked = true;
        this._emitChangeEvent();
        if (this.radioGroup) {
            this.radioGroup._controlValueAccessorChangeFn(this.value);
            if (groupValueChanged) {
                this.radioGroup._emitChangeEvent();
            }
        }
    };
    MatRadioButton.decorators = [
        { type: Component, args: [{
                    selector: 'mat-radio-button',
                    template: "<!-- TODO(jelbourn): render the radio on either side of the content -->\n<!-- TODO(mtlin): Evaluate trade-offs of using native radio vs. cost of additional bindings. -->\n<label [attr.for]=\"inputId\" class=\"mat-radio-label\" #label>\n  <!-- The actual 'radio' part of the control. -->\n  <div class=\"mat-radio-container\">\n    <div class=\"mat-radio-outer-circle\"></div>\n    <div class=\"mat-radio-inner-circle\"></div>\n    <div mat-ripple class=\"mat-radio-ripple\"\n         [matRippleTrigger]=\"label\"\n         [matRippleDisabled]=\"_isRippleDisabled()\"\n         [matRippleCentered]=\"true\"\n         [matRippleRadius]=\"20\"\n         [matRippleAnimation]=\"{enterDuration: 150}\">\n\n      <div class=\"mat-ripple-element mat-radio-persistent-ripple\"></div>\n    </div>\n\n    <input #input class=\"mat-radio-input cdk-visually-hidden\" type=\"radio\"\n        [id]=\"inputId\"\n        [checked]=\"checked\"\n        [disabled]=\"disabled\"\n        [tabIndex]=\"tabIndex\"\n        [attr.name]=\"name\"\n        [attr.value]=\"value\"\n        [required]=\"required\"\n        [attr.aria-label]=\"ariaLabel\"\n        [attr.aria-labelledby]=\"ariaLabelledby\"\n        [attr.aria-describedby]=\"ariaDescribedby\"\n        (change)=\"_onInputChange($event)\"\n        (click)=\"_onInputClick($event)\">\n  </div>\n\n  <!-- The label content for radio control. -->\n  <div class=\"mat-radio-label-content\" [class.mat-radio-label-before]=\"labelPosition == 'before'\">\n    <!-- Add an invisible span so JAWS can read the label -->\n    <span style=\"display:none\">&nbsp;</span>\n    <ng-content></ng-content>\n  </div>\n</label>\n",
                    inputs: ['disableRipple', 'tabIndex'],
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matRadioButton',
                    host: {
                        'class': 'mat-radio-button',
                        '[class.mat-radio-checked]': 'checked',
                        '[class.mat-radio-disabled]': 'disabled',
                        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                        '[class.mat-primary]': 'color === "primary"',
                        '[class.mat-accent]': 'color === "accent"',
                        '[class.mat-warn]': 'color === "warn"',
                        // Needs to be -1 so the `focus` event still fires.
                        '[attr.tabindex]': '-1',
                        '[attr.id]': 'id',
                        '[attr.aria-label]': 'null',
                        '[attr.aria-labelledby]': 'null',
                        '[attr.aria-describedby]': 'null',
                        // Note: under normal conditions focus shouldn't land on this element, however it may be
                        // programmatically set, for example inside of a focus trap, in this case we want to forward
                        // the focus to the native element.
                        '(focus)': '_inputElement.nativeElement.focus()',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mat-radio-button{display:inline-block;-webkit-tap-highlight-color:transparent;outline:0}.mat-radio-label{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;display:inline-flex;align-items:center;white-space:nowrap;vertical-align:middle;width:100%}.mat-radio-container{box-sizing:border-box;display:inline-block;position:relative;width:20px;height:20px;flex-shrink:0}.mat-radio-outer-circle{box-sizing:border-box;height:20px;left:0;position:absolute;top:0;transition:border-color ease 280ms;width:20px;border-width:2px;border-style:solid;border-radius:50%}._mat-animation-noopable .mat-radio-outer-circle{transition:none}.mat-radio-inner-circle{border-radius:50%;box-sizing:border-box;height:20px;left:0;position:absolute;top:0;transition:transform ease 280ms,background-color ease 280ms;width:20px;transform:scale(0.001)}._mat-animation-noopable .mat-radio-inner-circle{transition:none}.mat-radio-checked .mat-radio-inner-circle{transform:scale(0.5)}.cdk-high-contrast-active .mat-radio-checked .mat-radio-inner-circle{border:solid 10px}.mat-radio-label-content{-webkit-user-select:auto;-moz-user-select:auto;-ms-user-select:auto;user-select:auto;display:inline-block;order:0;line-height:inherit;padding-left:8px;padding-right:0}[dir=rtl] .mat-radio-label-content{padding-right:8px;padding-left:0}.mat-radio-label-content.mat-radio-label-before{order:-1;padding-left:0;padding-right:8px}[dir=rtl] .mat-radio-label-content.mat-radio-label-before{padding-right:0;padding-left:8px}.mat-radio-disabled,.mat-radio-disabled .mat-radio-label{cursor:default}.mat-radio-button .mat-radio-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.mat-radio-button .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple){opacity:.16}.mat-radio-persistent-ripple{width:100%;height:100%;transform:none}.mat-radio-container:hover .mat-radio-persistent-ripple{opacity:.04}.mat-radio-button:not(.mat-radio-disabled).cdk-keyboard-focused .mat-radio-persistent-ripple,.mat-radio-button:not(.mat-radio-disabled).cdk-program-focused .mat-radio-persistent-ripple{opacity:.12}.mat-radio-persistent-ripple,.mat-radio-disabled .mat-radio-container:hover .mat-radio-persistent-ripple{opacity:0}@media(hover: none){.mat-radio-container:hover .mat-radio-persistent-ripple{display:none}}.mat-radio-input{bottom:0;left:50%}.cdk-high-contrast-active .mat-radio-disabled{opacity:.5}\n"]
                }] }
    ];
    /** @nocollapse */
    MatRadioButton.ctorParameters = function () { return [
        { type: MatRadioGroup, decorators: [{ type: Optional }] },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: FocusMonitor },
        { type: UniqueSelectionDispatcher },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RADIO_DEFAULT_OPTIONS,] }] }
    ]; };
    MatRadioButton.propDecorators = {
        id: [{ type: Input }],
        name: [{ type: Input }],
        ariaLabel: [{ type: Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
        ariaDescribedby: [{ type: Input, args: ['aria-describedby',] }],
        checked: [{ type: Input }],
        value: [{ type: Input }],
        labelPosition: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        color: [{ type: Input }],
        change: [{ type: Output }],
        _inputElement: [{ type: ViewChild, args: ['input',] }]
    };
    return MatRadioButton;
}(_MatRadioButtonMixinBase));
export { MatRadioButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmFkaW8vcmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBS0wsa0JBQWtCLEVBQ2xCLGFBQWEsR0FFZCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBTzNFLE1BQU0sQ0FBQyxJQUFNLHlCQUF5QixHQUNwQyxJQUFJLGNBQWMsQ0FBeUIsMkJBQTJCLEVBQUU7SUFDeEUsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLGlDQUFpQztDQUMzQyxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsaUNBQWlDO0lBQy9DLE9BQU87UUFDTCxLQUFLLEVBQUUsUUFBUTtLQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVELHFFQUFxRTtBQUNyRSxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7Ozs7R0FJRztBQUNILE1BQU0s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QU07d0JBQzNCLHdCQUF3QixFQUFFLE1BQU07d0JBQ2hDLHlCQUF5QixFQUFFLE1BQU07d0JBQ2pDLHdGQUF3Rjt3QkFDeEYsNEZBQTRGO3dCQUM1RixtQ0FBbUM7d0JBQ25DLFNBQVMsRUFBRSxxQ0FBcUM7cUJBQ2pEO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBd0lxQyxhQUFhLHVCQUFwQyxRQUFRO2dCQTVkckIsVUFBVTtnQkFKVixpQkFBaUI7Z0JBUFgsWUFBWTtnQkFFWix5QkFBeUI7NkNBMGVsQixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjtnREFDdEMsUUFBUSxZQUFJLE1BQU0sU0FBQyx5QkFBeUI7OztxQkF2STFELEtBQUs7dUJBR0wsS0FBSzs0QkFHTCxLQUFLLFNBQUMsWUFBWTtpQ0FHbEIsS0FBSyxTQUFDLGlCQUFpQjtrQ0FHdkIsS0FBSyxTQUFDLGtCQUFrQjswQkFHeEIsS0FBSzt3QkF3QkwsS0FBSztnQ0FrQkwsS0FBSzsyQkFVTCxLQUFLOzJCQWFMLEtBQUs7d0JBU0wsS0FBSzt5QkFjTCxNQUFNO2dDQXdCTixTQUFTLFNBQUMsT0FBTzs7SUE4R3BCLHFCQUFDO0NBQUEsQUEvUUQsQ0E0Qm9DLHdCQUF3QixHQW1QM0Q7U0FuUFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0ZvY3VzTW9uaXRvcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1VuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIENhbkRpc2FibGVSaXBwbGUsXG4gIENhbkRpc2FibGVSaXBwbGVDdG9yLFxuICBIYXNUYWJJbmRleCxcbiAgSGFzVGFiSW5kZXhDdG9yLFxuICBtaXhpbkRpc2FibGVSaXBwbGUsXG4gIG1peGluVGFiSW5kZXgsXG4gIFRoZW1lUGFsZXR0ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIE1hdFJhZGlvRGVmYXVsdE9wdGlvbnMge1xuICBjb2xvcjogVGhlbWVQYWxldHRlO1xufVxuXG5leHBvcnQgY29uc3QgTUFUX1JBRElPX0RFRkFVTFRfT1BUSU9OUyA9XG4gIG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRSYWRpb0RlZmF1bHRPcHRpb25zPignbWF0LXJhZGlvLWRlZmF1bHQtb3B0aW9ucycsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiBNQVRfUkFESU9fREVGQVVMVF9PUFRJT05TX0ZBQ1RPUllcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gTUFUX1JBRElPX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IE1hdFJhZGlvRGVmYXVsdE9wdGlvbnMge1xuICByZXR1cm4ge1xuICAgIGNvbG9yOiAnYWNjZW50J1xuICB9O1xufVxuXG4vLyBJbmNyZWFzaW5nIGludGVnZXIgZm9yIGdlbmVyYXRpbmcgdW5pcXVlIGlkcyBmb3IgcmFkaW8gY29tcG9uZW50cy5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG4vKipcbiAqIFByb3ZpZGVyIEV4cHJlc3Npb24gdGhhdCBhbGxvd3MgbWF0LXJhZGlvLWdyb3VwIHRvIHJlZ2lzdGVyIGFzIGEgQ29udHJvbFZhbHVlQWNjZXNzb3IuIFRoaXNcbiAqIGFsbG93cyBpdCB0byBzdXBwb3J0IFsobmdNb2RlbCldIGFuZCBuZ0NvbnRyb2wuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfUkFESU9fR1JPVVBfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0UmFkaW9Hcm91cCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IE1hdFJhZGlvIGFuZCBNYXRSYWRpb0dyb3VwLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFJhZGlvQ2hhbmdlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgLyoqIFRoZSBNYXRSYWRpb0J1dHRvbiB0aGF0IGVtaXRzIHRoZSBjaGFuZ2UgZXZlbnQuICovXG4gICAgcHVibGljIHNvdXJjZTogTWF0UmFkaW9CdXR0b24sXG4gICAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgTWF0UmFkaW9CdXR0b24uICovXG4gICAgcHVibGljIHZhbHVlOiBhbnkpIHt9XG59XG5cbi8qKlxuICogQSBncm91cCBvZiByYWRpbyBidXR0b25zLiBNYXkgY29udGFpbiBvbmUgb3IgbW9yZSBgPG1hdC1yYWRpby1idXR0b24+YCBlbGVtZW50cy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LXJhZGlvLWdyb3VwJyxcbiAgZXhwb3J0QXM6ICdtYXRSYWRpb0dyb3VwJyxcbiAgcHJvdmlkZXJzOiBbTUFUX1JBRElPX0dST1VQX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAncmFkaW9ncm91cCcsXG4gICAgJ2NsYXNzJzogJ21hdC1yYWRpby1ncm91cCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFJhZGlvR3JvdXAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBTZWxlY3RlZCB2YWx1ZSBmb3IgdGhlIHJhZGlvIGdyb3VwLiAqL1xuICBwcml2YXRlIF92YWx1ZTogYW55ID0gbnVsbDtcblxuICAvKiogVGhlIEhUTUwgbmFtZSBhdHRyaWJ1dGUgYXBwbGllZCB0byByYWRpbyBidXR0b25zIGluIHRoaXMgZ3JvdXAuICovXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZyA9IGBtYXQtcmFkaW8tZ3JvdXAtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIHJhZGlvIGJ1dHRvbi4gU2hvdWxkIG1hdGNoIHZhbHVlLiAqL1xuICBwcml2YXRlIF9zZWxlY3RlZDogTWF0UmFkaW9CdXR0b24gfCBudWxsID0gbnVsbDtcblxuICAvKiogV2hldGhlciB0aGUgYHZhbHVlYCBoYXMgYmVlbiBzZXQgdG8gaXRzIGluaXRpYWwgdmFsdWUuICovXG4gIHByaXZhdGUgX2lzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgbGFiZWxzIHNob3VsZCBhcHBlYXIgYWZ0ZXIgb3IgYmVmb3JlIHRoZSByYWRpby1idXR0b25zLiBEZWZhdWx0cyB0byAnYWZ0ZXInICovXG4gIHByaXZhdGUgX2xhYmVsUG9zaXRpb246ICdiZWZvcmUnIHwgJ2FmdGVyJyA9ICdhZnRlcic7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGdyb3VwIGlzIGRpc2FibGVkLiAqL1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSByYWRpbyBncm91cCBpcyByZXF1aXJlZC4gKi9cbiAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIG1ldGhvZCB0byBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gdXBkYXRlIG5nTW9kZWwgKi9cbiAgX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm46ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIG9uVG91Y2ggZnVuY3Rpb24gcmVnaXN0ZXJlZCB2aWEgcmVnaXN0ZXJPblRvdWNoIChDb250cm9sVmFsdWVBY2Nlc3NvcikuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIG9uVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZ3JvdXAgdmFsdWUgY2hhbmdlcy5cbiAgICogQ2hhbmdlIGV2ZW50cyBhcmUgb25seSBlbWl0dGVkIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMgZHVlIHRvIHVzZXIgaW50ZXJhY3Rpb24gd2l0aFxuICAgKiBhIHJhZGlvIGJ1dHRvbiAodGhlIHNhbWUgYmVoYXZpb3IgYXMgYDxpbnB1dCB0eXBlLVwicmFkaW9cIj5gKS5cbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXRSYWRpb0NoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdFJhZGlvQ2hhbmdlPigpO1xuXG4gIC8qKiBDaGlsZCByYWRpbyBidXR0b25zLiAqL1xuICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTWF0UmFkaW9CdXR0b24pLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIF9yYWRpb3M6IFF1ZXJ5TGlzdDxNYXRSYWRpb0J1dHRvbj47XG5cbiAgLyoqIFRoZW1lIGNvbG9yIGZvciBhbGwgb2YgdGhlIHJhZGlvIGJ1dHRvbnMgaW4gdGhlIGdyb3VwLiAqL1xuICBASW5wdXQoKSBjb2xvcjogVGhlbWVQYWxldHRlO1xuXG4gIC8qKiBOYW1lIG9mIHRoZSByYWRpbyBidXR0b24gZ3JvdXAuIEFsbCByYWRpbyBidXR0b25zIGluc2lkZSB0aGlzIGdyb3VwIHdpbGwgdXNlIHRoaXMgbmFtZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX25hbWU7IH1cbiAgc2V0IG5hbWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVSYWRpb0J1dHRvbk5hbWVzKCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGFiZWxzIHNob3VsZCBhcHBlYXIgYWZ0ZXIgb3IgYmVmb3JlIHRoZSByYWRpby1idXR0b25zLiBEZWZhdWx0cyB0byAnYWZ0ZXInICovXG4gIEBJbnB1dCgpXG4gIGdldCBsYWJlbFBvc2l0aW9uKCk6ICdiZWZvcmUnIHwgJ2FmdGVyJyB7XG4gICAgcmV0dXJuIHRoaXMuX2xhYmVsUG9zaXRpb247XG4gIH1cbiAgc2V0IGxhYmVsUG9zaXRpb24odikge1xuICAgIHRoaXMuX2xhYmVsUG9zaXRpb24gPSB2ID09PSAnYmVmb3JlJyA/ICdiZWZvcmUnIDogJ2FmdGVyJztcbiAgICB0aGlzLl9tYXJrUmFkaW9zRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWx1ZSBmb3IgdGhlIHJhZGlvLWdyb3VwLiBTaG91bGQgZXF1YWwgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3RlZCByYWRpbyBidXR0b24gaWYgdGhlcmUgaXNcbiAgICogYSBjb3JyZXNwb25kaW5nIHJhZGlvIGJ1dHRvbiB3aXRoIGEgbWF0Y2hpbmcgdmFsdWUuIElmIHRoZXJlIGlzIG5vdCBzdWNoIGEgY29ycmVzcG9uZGluZ1xuICAgKiByYWRpbyBidXR0b24sIHRoaXMgdmFsdWUgcGVyc2lzdHMgdG8gYmUgYXBwbGllZCBpbiBjYXNlIGEgbmV3IHJhZGlvIGJ1dHRvbiBpcyBhZGRlZCB3aXRoIGFcbiAgICogbWF0Y2hpbmcgdmFsdWUuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG4gIHNldCB2YWx1ZShuZXdWYWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgLy8gU2V0IHRoaXMgYmVmb3JlIHByb2NlZWRpbmcgdG8gZW5zdXJlIG5vIGNpcmN1bGFyIGxvb3Agb2NjdXJzIHdpdGggc2VsZWN0aW9uLlxuICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgICAgdGhpcy5fdXBkYXRlU2VsZWN0ZWRSYWRpb0Zyb21WYWx1ZSgpO1xuICAgICAgdGhpcy5fY2hlY2tTZWxlY3RlZFJhZGlvQnV0dG9uKCk7XG4gICAgfVxuICB9XG5cbiAgX2NoZWNrU2VsZWN0ZWRSYWRpb0J1dHRvbigpIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0ZWQgJiYgIXRoaXMuX3NlbGVjdGVkLmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkLmNoZWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIHJhZGlvIGJ1dHRvbi4gSWYgc2V0IHRvIGEgbmV3IHJhZGlvIGJ1dHRvbiwgdGhlIHJhZGlvIGdyb3VwIHZhbHVlXG4gICAqIHdpbGwgYmUgdXBkYXRlZCB0byBtYXRjaCB0aGUgbmV3IHNlbGVjdGVkIGJ1dHRvbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZCgpIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGVkOyB9XG4gIHNldCBzZWxlY3RlZChzZWxlY3RlZDogTWF0UmFkaW9CdXR0b24gfCBudWxsKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB0aGlzLnZhbHVlID0gc2VsZWN0ZWQgPyBzZWxlY3RlZC52YWx1ZSA6IG51bGw7XG4gICAgdGhpcy5fY2hlY2tTZWxlY3RlZFJhZGlvQnV0dG9uKCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgcmFkaW8gZ3JvdXAgaXMgZGlzYWJsZWQgKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX21hcmtSYWRpb3NGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGdyb3VwIGlzIHJlcXVpcmVkICovXG4gIEBJbnB1dCgpXG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlcXVpcmVkOyB9XG4gIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLl9tYXJrUmFkaW9zRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgcHJvcGVydGllcyBvbmNlIGNvbnRlbnQgY2hpbGRyZW4gYXJlIGF2YWlsYWJsZS5cbiAgICogVGhpcyBhbGxvd3MgdXMgdG8gcHJvcGFnYXRlIHJlbGV2YW50IGF0dHJpYnV0ZXMgdG8gYXNzb2NpYXRlZCBidXR0b25zLlxuICAgKi9cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIC8vIE1hcmsgdGhpcyBjb21wb25lbnQgYXMgaW5pdGlhbGl6ZWQgaW4gQWZ0ZXJDb250ZW50SW5pdCBiZWNhdXNlIHRoZSBpbml0aWFsIHZhbHVlIGNhblxuICAgIC8vIHBvc3NpYmx5IGJlIHNldCBieSBOZ01vZGVsIG9uIE1hdFJhZGlvR3JvdXAsIGFuZCBpdCBpcyBwb3NzaWJsZSB0aGF0IHRoZSBPbkluaXQgb2YgdGhlXG4gICAgLy8gTmdNb2RlbCBvY2N1cnMgKmFmdGVyKiB0aGUgT25Jbml0IG9mIHRoZSBNYXRSYWRpb0dyb3VwLlxuICAgIHRoaXMuX2lzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcmsgdGhpcyBncm91cCBhcyBiZWluZyBcInRvdWNoZWRcIiAoZm9yIG5nTW9kZWwpLiBNZWFudCB0byBiZSBjYWxsZWQgYnkgdGhlIGNvbnRhaW5lZFxuICAgKiByYWRpbyBidXR0b25zIHVwb24gdGhlaXIgYmx1ci5cbiAgICovXG4gIF90b3VjaCgpIHtcbiAgICBpZiAodGhpcy5vblRvdWNoZWQpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlUmFkaW9CdXR0b25OYW1lcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmFkaW9zKSB7XG4gICAgICB0aGlzLl9yYWRpb3MuZm9yRWFjaChyYWRpbyA9PiB7XG4gICAgICAgIHJhZGlvLm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgICAgIHJhZGlvLl9tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBVcGRhdGVzIHRoZSBgc2VsZWN0ZWRgIHJhZGlvIGJ1dHRvbiBmcm9tIHRoZSBpbnRlcm5hbCBfdmFsdWUgc3RhdGUuICovXG4gIHByaXZhdGUgX3VwZGF0ZVNlbGVjdGVkUmFkaW9Gcm9tVmFsdWUoKTogdm9pZCB7XG4gICAgLy8gSWYgdGhlIHZhbHVlIGFscmVhZHkgbWF0Y2hlcyB0aGUgc2VsZWN0ZWQgcmFkaW8sIGRvIG5vdGhpbmcuXG4gICAgY29uc3QgaXNBbHJlYWR5U2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3RlZCAhPT0gbnVsbCAmJiB0aGlzLl9zZWxlY3RlZC52YWx1ZSA9PT0gdGhpcy5fdmFsdWU7XG5cbiAgICBpZiAodGhpcy5fcmFkaW9zICYmICFpc0FscmVhZHlTZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgdGhpcy5fcmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xuICAgICAgICByYWRpby5jaGVja2VkID0gdGhpcy52YWx1ZSA9PT0gcmFkaW8udmFsdWU7XG4gICAgICAgIGlmIChyYWRpby5jaGVja2VkKSB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSByYWRpbztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERpc3BhdGNoIGNoYW5nZSBldmVudCB3aXRoIGN1cnJlbnQgc2VsZWN0aW9uIGFuZCBncm91cCB2YWx1ZS4gKi9cbiAgX2VtaXRDaGFuZ2VFdmVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdChuZXcgTWF0UmFkaW9DaGFuZ2UodGhpcy5fc2VsZWN0ZWQhLCB0aGlzLl92YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIF9tYXJrUmFkaW9zRm9yQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMuX3JhZGlvcykge1xuICAgICAgdGhpcy5fcmFkaW9zLmZvckVhY2gocmFkaW8gPT4gcmFkaW8uX21hcmtGb3JDaGVjaygpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbW9kZWwgdmFsdWUuIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBtb2RlbCB2YWx1ZSBjaGFuZ2VzLlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIHRyaWdnZXJlZCB3aGVuIHRoZSBjb250cm9sIGlzIHRvdWNoZWQuXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSByZWdpc3RlcmVkLlxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGNvbnRyb2wuIEltcGxlbWVudGVkIGFzIGEgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICogQHBhcmFtIGlzRGlzYWJsZWQgV2hldGhlciB0aGUgY29udHJvbCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogYm9vbGVhbiB8IHN0cmluZztcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlcXVpcmVkOiBib29sZWFuIHwgc3RyaW5nO1xufVxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdFJhZGlvQnV0dG9uLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmNsYXNzIE1hdFJhZGlvQnV0dG9uQmFzZSB7XG4gIC8vIFNpbmNlIHRoZSBkaXNhYmxlZCBwcm9wZXJ0eSBpcyBtYW51YWxseSBkZWZpbmVkIGZvciB0aGUgTWF0UmFkaW9CdXR0b24gYW5kIGlzbid0IHNldCB1cCBpblxuICAvLyB0aGUgbWl4aW4gYmFzZSBjbGFzcy4gVG8gYmUgYWJsZSB0byB1c2UgdGhlIHRhYmluZGV4IG1peGluLCBhIGRpc2FibGVkIHByb3BlcnR5IG11c3QgYmVcbiAgLy8gZGVmaW5lZCB0byBwcm9wZXJseSB3b3JrLlxuICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG4vLyBBcyBwZXIgTWF0ZXJpYWwgZGVzaWduIHNwZWNpZmljYXRpb25zIHRoZSBzZWxlY3Rpb24gY29udHJvbCByYWRpbyBzaG91bGQgdXNlIHRoZSBhY2NlbnQgY29sb3Jcbi8vIHBhbGV0dGUgYnkgZGVmYXVsdC4gaHR0cHM6Ly9tYXRlcmlhbC5pby9ndWlkZWxpbmVzL2NvbXBvbmVudHMvc2VsZWN0aW9uLWNvbnRyb2xzLmh0bWxcbmNvbnN0IF9NYXRSYWRpb0J1dHRvbk1peGluQmFzZTpcbiAgICBDYW5EaXNhYmxlUmlwcGxlQ3RvciAmIEhhc1RhYkluZGV4Q3RvciAmIHR5cGVvZiBNYXRSYWRpb0J1dHRvbkJhc2UgPVxuICAgICAgICBtaXhpbkRpc2FibGVSaXBwbGUobWl4aW5UYWJJbmRleChNYXRSYWRpb0J1dHRvbkJhc2UpKTtcblxuLyoqXG4gKiBBIE1hdGVyaWFsIGRlc2lnbiByYWRpby1idXR0b24uIFR5cGljYWxseSBwbGFjZWQgaW5zaWRlIG9mIGA8bWF0LXJhZGlvLWdyb3VwPmAgZWxlbWVudHMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1yYWRpby1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJ3JhZGlvLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncmFkaW8uY3NzJ10sXG4gIGlucHV0czogWydkaXNhYmxlUmlwcGxlJywgJ3RhYkluZGV4J10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWF0UmFkaW9CdXR0b24nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1yYWRpby1idXR0b24nLFxuICAgICdbY2xhc3MubWF0LXJhZGlvLWNoZWNrZWRdJzogJ2NoZWNrZWQnLFxuICAgICdbY2xhc3MubWF0LXJhZGlvLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gICAgJ1tjbGFzcy5tYXQtcHJpbWFyeV0nOiAnY29sb3IgPT09IFwicHJpbWFyeVwiJyxcbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2NvbG9yID09PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PT0gXCJ3YXJuXCInLFxuICAgIC8vIE5lZWRzIHRvIGJlIC0xIHNvIHRoZSBgZm9jdXNgIGV2ZW50IHN0aWxsIGZpcmVzLlxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnLTEnLFxuICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnbnVsbCcsXG4gICAgLy8gTm90ZTogdW5kZXIgbm9ybWFsIGNvbmRpdGlvbnMgZm9jdXMgc2hvdWxkbid0IGxhbmQgb24gdGhpcyBlbGVtZW50LCBob3dldmVyIGl0IG1heSBiZVxuICAgIC8vIHByb2dyYW1tYXRpY2FsbHkgc2V0LCBmb3IgZXhhbXBsZSBpbnNpZGUgb2YgYSBmb2N1cyB0cmFwLCBpbiB0aGlzIGNhc2Ugd2Ugd2FudCB0byBmb3J3YXJkXG4gICAgLy8gdGhlIGZvY3VzIHRvIHRoZSBuYXRpdmUgZWxlbWVudC5cbiAgICAnKGZvY3VzKSc6ICdfaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKScsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRSYWRpb0J1dHRvbiBleHRlbmRzIF9NYXRSYWRpb0J1dHRvbk1peGluQmFzZVxuICAgIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIENhbkRpc2FibGVSaXBwbGUsIEhhc1RhYkluZGV4IHtcblxuICBwcml2YXRlIF91bmlxdWVJZDogc3RyaW5nID0gYG1hdC1yYWRpby0keysrbmV4dFVuaXF1ZUlkfWA7XG5cbiAgLyoqIFRoZSB1bmlxdWUgSUQgZm9yIHRoZSByYWRpbyBidXR0b24uICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcblxuICAvKiogQW5hbG9nIHRvIEhUTUwgJ25hbWUnIGF0dHJpYnV0ZSB1c2VkIHRvIGdyb3VwIHJhZGlvcyBmb3IgdW5pcXVlIHNlbGVjdGlvbi4gKi9cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIC8qKiBVc2VkIHRvIHNldCB0aGUgJ2FyaWEtbGFiZWwnIGF0dHJpYnV0ZSBvbiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZztcblxuICAvKiogVGhlICdhcmlhLWxhYmVsbGVkYnknIGF0dHJpYnV0ZSB0YWtlcyBwcmVjZWRlbmNlIGFzIHRoZSBlbGVtZW50J3MgdGV4dCBhbHRlcm5hdGl2ZS4gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nO1xuXG4gIC8qKiBUaGUgJ2FyaWEtZGVzY3JpYmVkYnknIGF0dHJpYnV0ZSBpcyByZWFkIGFmdGVyIHRoZSBlbGVtZW50J3MgbGFiZWwgYW5kIGZpZWxkIHR5cGUuICovXG4gIEBJbnB1dCgnYXJpYS1kZXNjcmliZWRieScpIGFyaWFEZXNjcmliZWRieTogc3RyaW5nO1xuXG4gIC8qKiBXaGV0aGVyIHRoaXMgcmFkaW8gYnV0dG9uIGlzIGNoZWNrZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBjaGVja2VkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY2hlY2tlZDsgfVxuICBzZXQgY2hlY2tlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IG5ld0NoZWNrZWRTdGF0ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX2NoZWNrZWQgIT09IG5ld0NoZWNrZWRTdGF0ZSkge1xuICAgICAgdGhpcy5fY2hlY2tlZCA9IG5ld0NoZWNrZWRTdGF0ZTtcbiAgICAgIGlmIChuZXdDaGVja2VkU3RhdGUgJiYgdGhpcy5yYWRpb0dyb3VwICYmIHRoaXMucmFkaW9Hcm91cC52YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICB0aGlzLnJhZGlvR3JvdXAuc2VsZWN0ZWQgPSB0aGlzO1xuICAgICAgfSBlbHNlIGlmICghbmV3Q2hlY2tlZFN0YXRlICYmIHRoaXMucmFkaW9Hcm91cCAmJiB0aGlzLnJhZGlvR3JvdXAudmFsdWUgPT09IHRoaXMudmFsdWUpIHtcblxuICAgICAgICAvLyBXaGVuIHVuY2hlY2tpbmcgdGhlIHNlbGVjdGVkIHJhZGlvIGJ1dHRvbiwgdXBkYXRlIHRoZSBzZWxlY3RlZCByYWRpb1xuICAgICAgICAvLyBwcm9wZXJ0eSBvbiB0aGUgZ3JvdXAuXG4gICAgICAgIHRoaXMucmFkaW9Hcm91cC5zZWxlY3RlZCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdDaGVja2VkU3RhdGUpIHtcbiAgICAgICAgLy8gTm90aWZ5IGFsbCByYWRpbyBidXR0b25zIHdpdGggdGhlIHNhbWUgbmFtZSB0byB1bi1jaGVjay5cbiAgICAgICAgdGhpcy5fcmFkaW9EaXNwYXRjaGVyLm5vdGlmeSh0aGlzLmlkLCB0aGlzLm5hbWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSB2YWx1ZSBvZiB0aGlzIHJhZGlvIGJ1dHRvbi4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5yYWRpb0dyb3VwICE9PSBudWxsKSB7XG4gICAgICAgIGlmICghdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgLy8gVXBkYXRlIGNoZWNrZWQgd2hlbiB0aGUgdmFsdWUgY2hhbmdlZCB0byBtYXRjaCB0aGUgcmFkaW8gZ3JvdXAncyB2YWx1ZVxuICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMucmFkaW9Hcm91cC52YWx1ZSA9PT0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgIHRoaXMucmFkaW9Hcm91cC5zZWxlY3RlZCA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGFiZWwgc2hvdWxkIGFwcGVhciBhZnRlciBvciBiZWZvcmUgdGhlIHJhZGlvIGJ1dHRvbi4gRGVmYXVsdHMgdG8gJ2FmdGVyJyAqL1xuICBASW5wdXQoKVxuICBnZXQgbGFiZWxQb3NpdGlvbigpOiAnYmVmb3JlJyB8ICdhZnRlcicge1xuICAgIHJldHVybiB0aGlzLl9sYWJlbFBvc2l0aW9uIHx8ICh0aGlzLnJhZGlvR3JvdXAgJiYgdGhpcy5yYWRpb0dyb3VwLmxhYmVsUG9zaXRpb24pIHx8ICdhZnRlcic7XG4gIH1cbiAgc2V0IGxhYmVsUG9zaXRpb24odmFsdWUpIHtcbiAgICB0aGlzLl9sYWJlbFBvc2l0aW9uID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfbGFiZWxQb3NpdGlvbjogJ2JlZm9yZScgfCAnYWZ0ZXInO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSByYWRpbyBidXR0b24gaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgKHRoaXMucmFkaW9Hcm91cCAhPT0gbnVsbCAmJiB0aGlzLnJhZGlvR3JvdXAuZGlzYWJsZWQpO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IG5ld0Rpc2FibGVkU3RhdGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9kaXNhYmxlZCAhPT0gbmV3RGlzYWJsZWRTdGF0ZSkge1xuICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdEaXNhYmxlZFN0YXRlO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHJhZGlvIGJ1dHRvbiBpcyByZXF1aXJlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZCB8fCAodGhpcy5yYWRpb0dyb3VwICYmIHRoaXMucmFkaW9Hcm91cC5yZXF1aXJlZCk7XG4gIH1cbiAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgLyoqIFRoZW1lIGNvbG9yIG9mIHRoZSByYWRpbyBidXR0b24uICovXG4gIEBJbnB1dCgpXG4gIGdldCBjb2xvcigpOiBUaGVtZVBhbGV0dGUge1xuICAgIHJldHVybiB0aGlzLl9jb2xvciB8fFxuICAgICAgKHRoaXMucmFkaW9Hcm91cCAmJiB0aGlzLnJhZGlvR3JvdXAuY29sb3IpIHx8XG4gICAgICB0aGlzLl9wcm92aWRlck92ZXJyaWRlICYmIHRoaXMuX3Byb3ZpZGVyT3ZlcnJpZGUuY29sb3IgfHwgJ2FjY2VudCc7XG4gIH1cbiAgc2V0IGNvbG9yKG5ld1ZhbHVlOiBUaGVtZVBhbGV0dGUpIHsgdGhpcy5fY29sb3IgPSBuZXdWYWx1ZTsgfVxuICBwcml2YXRlIF9jb2xvcjogVGhlbWVQYWxldHRlO1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhpcyByYWRpbyBidXR0b24gY2hhbmdlcy5cbiAgICogQ2hhbmdlIGV2ZW50cyBhcmUgb25seSBlbWl0dGVkIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMgZHVlIHRvIHVzZXIgaW50ZXJhY3Rpb24gd2l0aFxuICAgKiB0aGUgcmFkaW8gYnV0dG9uICh0aGUgc2FtZSBiZWhhdmlvciBhcyBgPGlucHV0IHR5cGUtXCJyYWRpb1wiPmApLlxuICAgKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdFJhZGlvQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0UmFkaW9DaGFuZ2U+KCk7XG5cbiAgLyoqIFRoZSBwYXJlbnQgcmFkaW8gZ3JvdXAuIE1heSBvciBtYXkgbm90IGJlIHByZXNlbnQuICovXG4gIHJhZGlvR3JvdXA6IE1hdFJhZGlvR3JvdXA7XG5cbiAgLyoqIElEIG9mIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCBpbnNpZGUgYDxtYXQtcmFkaW8tYnV0dG9uPmAgKi9cbiAgZ2V0IGlucHV0SWQoKTogc3RyaW5nIHsgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy5fdW5pcXVlSWR9LWlucHV0YDsgfVxuXG4gIC8qKiBXaGV0aGVyIHRoaXMgcmFkaW8gaXMgY2hlY2tlZC4gKi9cbiAgcHJpdmF0ZSBfY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoaXMgcmFkaW8gaXMgZGlzYWJsZWQuICovXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoaXMgcmFkaW8gaXMgcmVxdWlyZWQuICovXG4gIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuO1xuXG4gIC8qKiBWYWx1ZSBhc3NpZ25lZCB0byB0aGlzIHJhZGlvLiAqL1xuICBwcml2YXRlIF92YWx1ZTogYW55ID0gbnVsbDtcblxuICAvKiogVW5yZWdpc3RlciBmdW5jdGlvbiBmb3IgX3JhZGlvRGlzcGF0Y2hlciAqL1xuICBwcml2YXRlIF9yZW1vdmVVbmlxdWVTZWxlY3Rpb25MaXN0ZW5lcjogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQgdHlwZT1yYWRpbz5gIGVsZW1lbnQgKi9cbiAgQFZpZXdDaGlsZCgnaW5wdXQnKSBfaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHJhZGlvR3JvdXA6IE1hdFJhZGlvR3JvdXAsXG4gICAgICAgICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3JhZGlvRGlzcGF0Y2hlcjogVW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlcixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9SQURJT19ERUZBVUxUX09QVElPTlMpXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfcHJvdmlkZXJPdmVycmlkZT86IE1hdFJhZGlvRGVmYXVsdE9wdGlvbnMpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgIC8vIEFzc2VydGlvbnMuIElkZWFsbHkgdGhlc2Ugc2hvdWxkIGJlIHN0cmlwcGVkIG91dCBieSB0aGUgY29tcGlsZXIuXG4gICAgLy8gVE9ETyhqZWxib3Vybik6IEFzc2VydCB0aGF0IHRoZXJlJ3Mgbm8gbmFtZSBiaW5kaW5nIEFORCBhIHBhcmVudCByYWRpbyBncm91cC5cbiAgICB0aGlzLnJhZGlvR3JvdXAgPSByYWRpb0dyb3VwO1xuXG4gICAgdGhpcy5fcmVtb3ZlVW5pcXVlU2VsZWN0aW9uTGlzdGVuZXIgPVxuICAgICAgX3JhZGlvRGlzcGF0Y2hlci5saXN0ZW4oKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoaWQgIT09IHRoaXMuaWQgJiYgbmFtZSA9PT0gdGhpcy5uYW1lKSB7XG4gICAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIHJhZGlvIGJ1dHRvbi4gKi9cbiAgZm9jdXMob3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLl9pbnB1dEVsZW1lbnQsICdrZXlib2FyZCcsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcmtzIHRoZSByYWRpbyBidXR0b24gYXMgbmVlZGluZyBjaGVja2luZyBmb3IgY2hhbmdlIGRldGVjdGlvbi5cbiAgICogVGhpcyBtZXRob2QgaXMgZXhwb3NlZCBiZWNhdXNlIHRoZSBwYXJlbnQgcmFkaW8gZ3JvdXAgd2lsbCBkaXJlY3RseVxuICAgKiB1cGRhdGUgYm91bmQgcHJvcGVydGllcyBvZiB0aGUgcmFkaW8gYnV0dG9uLlxuICAgKi9cbiAgX21hcmtGb3JDaGVjaygpIHtcbiAgICAvLyBXaGVuIGdyb3VwIHZhbHVlIGNoYW5nZXMsIHRoZSBidXR0b24gd2lsbCBub3QgYmUgbm90aWZpZWQuIFVzZSBgbWFya0ZvckNoZWNrYCB0byBleHBsaWNpdFxuICAgIC8vIHVwZGF0ZSByYWRpbyBidXR0b24ncyBzdGF0dXNcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnJhZGlvR3JvdXApIHtcbiAgICAgIC8vIElmIHRoZSByYWRpbyBpcyBpbnNpZGUgYSByYWRpbyBncm91cCwgZGV0ZXJtaW5lIGlmIGl0IHNob3VsZCBiZSBjaGVja2VkXG4gICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnJhZGlvR3JvdXAudmFsdWUgPT09IHRoaXMuX3ZhbHVlO1xuICAgICAgLy8gQ29weSBuYW1lIGZyb20gcGFyZW50IHJhZGlvIGdyb3VwXG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLnJhZGlvR3JvdXAubmFtZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fZm9jdXNNb25pdG9yXG4gICAgICAubW9uaXRvcih0aGlzLl9lbGVtZW50UmVmLCB0cnVlKVxuICAgICAgLnN1YnNjcmliZShmb2N1c09yaWdpbiA9PiB7XG4gICAgICAgIGlmICghZm9jdXNPcmlnaW4gJiYgdGhpcy5yYWRpb0dyb3VwKSB7XG4gICAgICAgICAgdGhpcy5yYWRpb0dyb3VwLl90b3VjaCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmKTtcbiAgICB0aGlzLl9yZW1vdmVVbmlxdWVTZWxlY3Rpb25MaXN0ZW5lcigpO1xuICB9XG5cbiAgLyoqIERpc3BhdGNoIGNoYW5nZSBldmVudCB3aXRoIGN1cnJlbnQgdmFsdWUuICovXG4gIHByaXZhdGUgX2VtaXRDaGFuZ2VFdmVudCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KG5ldyBNYXRSYWRpb0NoYW5nZSh0aGlzLCB0aGlzLl92YWx1ZSkpO1xuICB9XG5cbiAgX2lzUmlwcGxlRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZVJpcHBsZSB8fCB0aGlzLmRpc2FibGVkO1xuICB9XG5cbiAgX29uSW5wdXRDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAvLyBXZSBoYXZlIHRvIHN0b3AgcHJvcGFnYXRpb24gZm9yIGNsaWNrIGV2ZW50cyBvbiB0aGUgdmlzdWFsIGhpZGRlbiBpbnB1dCBlbGVtZW50LlxuICAgIC8vIEJ5IGRlZmF1bHQsIHdoZW4gYSB1c2VyIGNsaWNrcyBvbiBhIGxhYmVsIGVsZW1lbnQsIGEgZ2VuZXJhdGVkIGNsaWNrIGV2ZW50IHdpbGwgYmVcbiAgICAvLyBkaXNwYXRjaGVkIG9uIHRoZSBhc3NvY2lhdGVkIGlucHV0IGVsZW1lbnQuIFNpbmNlIHdlIGFyZSB1c2luZyBhIGxhYmVsIGVsZW1lbnQgYXMgb3VyXG4gICAgLy8gcm9vdCBjb250YWluZXIsIHRoZSBjbGljayBldmVudCBvbiB0aGUgYHJhZGlvLWJ1dHRvbmAgd2lsbCBiZSBleGVjdXRlZCB0d2ljZS5cbiAgICAvLyBUaGUgcmVhbCBjbGljayBldmVudCB3aWxsIGJ1YmJsZSB1cCwgYW5kIHRoZSBnZW5lcmF0ZWQgY2xpY2sgZXZlbnQgYWxzbyB0cmllcyB0byBidWJibGUgdXAuXG4gICAgLy8gVGhpcyB3aWxsIGxlYWQgdG8gbXVsdGlwbGUgY2xpY2sgZXZlbnRzLlxuICAgIC8vIFByZXZlbnRpbmcgYnViYmxpbmcgZm9yIHRoZSBzZWNvbmQgZXZlbnQgd2lsbCBzb2x2ZSB0aGF0IGlzc3VlLlxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJlZCB3aGVuIHRoZSByYWRpbyBidXR0b24gcmVjZWl2ZWQgYSBjbGljayBvciB0aGUgaW5wdXQgcmVjb2duaXplZCBhbnkgY2hhbmdlLlxuICAgKiBDbGlja2luZyBvbiBhIGxhYmVsIGVsZW1lbnQsIHdpbGwgdHJpZ2dlciBhIGNoYW5nZSBldmVudCBvbiB0aGUgYXNzb2NpYXRlZCBpbnB1dC5cbiAgICovXG4gIF9vbklucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgIC8vIFdlIGFsd2F5cyBoYXZlIHRvIHN0b3AgcHJvcGFnYXRpb24gb24gdGhlIGNoYW5nZSBldmVudC5cbiAgICAvLyBPdGhlcndpc2UgdGhlIGNoYW5nZSBldmVudCwgZnJvbSB0aGUgaW5wdXQgZWxlbWVudCwgd2lsbCBidWJibGUgdXAgYW5kXG4gICAgLy8gZW1pdCBpdHMgZXZlbnQgb2JqZWN0IHRvIHRoZSBgY2hhbmdlYCBvdXRwdXQuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBjb25zdCBncm91cFZhbHVlQ2hhbmdlZCA9IHRoaXMucmFkaW9Hcm91cCAmJiB0aGlzLnZhbHVlICE9PSB0aGlzLnJhZGlvR3JvdXAudmFsdWU7XG4gICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcbiAgICB0aGlzLl9lbWl0Q2hhbmdlRXZlbnQoKTtcblxuICAgIGlmICh0aGlzLnJhZGlvR3JvdXApIHtcbiAgICAgIHRoaXMucmFkaW9Hcm91cC5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbih0aGlzLnZhbHVlKTtcbiAgICAgIGlmIChncm91cFZhbHVlQ2hhbmdlZCkge1xuICAgICAgICB0aGlzLnJhZGlvR3JvdXAuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jaGVja2VkOiBib29sZWFuIHwgc3RyaW5nO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IGJvb2xlYW4gfCBzdHJpbmc7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZXF1aXJlZDogYm9vbGVhbiB8IHN0cmluZztcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IGJvb2xlYW4gfCBzdHJpbmc7XG59XG4iXX0=