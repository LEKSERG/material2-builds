/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation, } from '@angular/core';
import { MatPaginatorIntl } from './paginator-intl';
import { mixinInitialized, mixinDisabled, } from '@angular/material/core';
/** The default page size if there is no page size and there are no provided page size options. */
var DEFAULT_PAGE_SIZE = 50;
/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
var PageEvent = /** @class */ (function () {
    function PageEvent() {
    }
    return PageEvent;
}());
export { PageEvent };
// Boilerplate for applying mixins to MatPaginator.
/** @docs-private */
var MatPaginatorBase = /** @class */ (function () {
    function MatPaginatorBase() {
    }
    return MatPaginatorBase;
}());
var _MatPaginatorBase = mixinDisabled(mixinInitialized(MatPaginatorBase));
/**
 * Component to provide navigation between paged information. Displays the size of the current
 * page, user-selectable options to change that size, what items are being shown, and
 * navigational button to go to the previous or next page.
 */
var MatPaginator = /** @class */ (function (_super) {
    __extends(MatPaginator, _super);
    function MatPaginator(_intl, _changeDetectorRef) {
        var _this = _super.call(this) || this;
        _this._intl = _intl;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._pageIndex = 0;
        _this._length = 0;
        _this._pageSizeOptions = [];
        _this._hidePageSize = false;
        _this._showFirstLastButtons = false;
        /** Event emitted when the paginator changes the page size or page index. */
        _this.page = new EventEmitter();
        _this._intlChanges = _intl.changes.subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
        return _this;
    }
    Object.defineProperty(MatPaginator.prototype, "pageIndex", {
        /** The zero-based page index of the displayed list of items. Defaulted to 0. */
        get: function () { return this._pageIndex; },
        set: function (value) {
            this._pageIndex = Math.max(coerceNumberProperty(value), 0);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPaginator.prototype, "length", {
        /** The length of the total number of items that are being paginated. Defaulted to 0. */
        get: function () { return this._length; },
        set: function (value) {
            this._length = coerceNumberProperty(value);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPaginator.prototype, "pageSize", {
        /** Number of items to display on a page. By default set to 50. */
        get: function () { return this._pageSize; },
        set: function (value) {
            this._pageSize = Math.max(coerceNumberProperty(value), 0);
            this._updateDisplayedPageSizeOptions();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPaginator.prototype, "pageSizeOptions", {
        /** The set of provided page size options to display to the user. */
        get: function () { return this._pageSizeOptions; },
        set: function (value) {
            this._pageSizeOptions = (value || []).map(function (p) { return coerceNumberProperty(p); });
            this._updateDisplayedPageSizeOptions();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPaginator.prototype, "hidePageSize", {
        /** Whether to hide the page size selection UI from the user. */
        get: function () { return this._hidePageSize; },
        set: function (value) {
            this._hidePageSize = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPaginator.prototype, "showFirstLastButtons", {
        /** Whether to show the first/last buttons UI to the user. */
        get: function () { return this._showFirstLastButtons; },
        set: function (value) {
            this._showFirstLastButtons = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    MatPaginator.prototype.ngOnInit = function () {
        this._initialized = true;
        this._updateDisplayedPageSizeOptions();
        this._markInitialized();
    };
    MatPaginator.prototype.ngOnDestroy = function () {
        this._intlChanges.unsubscribe();
    };
    /** Advances to the next page if it exists. */
    MatPaginator.prototype.nextPage = function () {
        if (!this.hasNextPage()) {
            return;
        }
        var previousPageIndex = this.pageIndex;
        this.pageIndex++;
        this._emitPageEvent(previousPageIndex);
    };
    /** Move back to the previous page if it exists. */
    MatPaginator.prototype.previousPage = function () {
        if (!this.hasPreviousPage()) {
            return;
        }
        var previousPageIndex = this.pageIndex;
        this.pageIndex--;
        this._emitPageEvent(previousPageIndex);
    };
    /** Move to the first page if not already there. */
    MatPaginator.prototype.firstPage = function () {
        // hasPreviousPage being false implies at the start
        if (!this.hasPreviousPage()) {
            return;
        }
        var previousPageIndex = this.pageIndex;
        this.pageIndex = 0;
        this._emitPageEvent(previousPageIndex);
    };
    /** Move to the last page if not already there. */
    MatPaginator.prototype.lastPage = function () {
        // hasNextPage being false implies at the end
        if (!this.hasNextPage()) {
            return;
        }
        var previousPageIndex = this.pageIndex;
        this.pageIndex = this.getNumberOfPages() - 1;
        this._emitPageEvent(previousPageIndex);
    };
    /** Whether there is a previous page. */
    MatPaginator.prototype.hasPreviousPage = function () {
        return this.pageIndex >= 1 && this.pageSize != 0;
    };
    /** Whether there is a next page. */
    MatPaginator.prototype.hasNextPage = function () {
        var maxPageIndex = this.getNumberOfPages() - 1;
        return this.pageIndex < maxPageIndex && this.pageSize != 0;
    };
    /** Calculate the number of pages */
    MatPaginator.prototype.getNumberOfPages = function () {
        if (!this.pageSize) {
            return 0;
        }
        return Math.ceil(this.length / this.pageSize);
    };
    /**
     * Changes the page size so that the first item displayed on the page will still be
     * displayed using the new page size.
     *
     * For example, if the page size is 10 and on the second page (items indexed 10-19) then
     * switching so that the page size is 5 will set the third page as the current page so
     * that the 10th item will still be displayed.
     */
    MatPaginator.prototype._changePageSize = function (pageSize) {
        // Current page needs to be updated to reflect the new page size. Navigate to the page
        // containing the previous page's first item.
        var startIndex = this.pageIndex * this.pageSize;
        var previousPageIndex = this.pageIndex;
        this.pageIndex = Math.floor(startIndex / pageSize) || 0;
        this.pageSize = pageSize;
        this._emitPageEvent(previousPageIndex);
    };
    /** Checks whether the buttons for going forwards should be disabled. */
    MatPaginator.prototype._nextButtonsDisabled = function () {
        return this.disabled || !this.hasNextPage();
    };
    /** Checks whether the buttons for going backwards should be disabled. */
    MatPaginator.prototype._previousButtonsDisabled = function () {
        return this.disabled || !this.hasPreviousPage();
    };
    /**
     * Updates the list of page size options to display to the user. Includes making sure that
     * the page size is an option and that the list is sorted.
     */
    MatPaginator.prototype._updateDisplayedPageSizeOptions = function () {
        if (!this._initialized) {
            return;
        }
        // If no page size is provided, use the first page size option or the default page size.
        if (!this.pageSize) {
            this._pageSize = this.pageSizeOptions.length != 0 ?
                this.pageSizeOptions[0] :
                DEFAULT_PAGE_SIZE;
        }
        this._displayedPageSizeOptions = this.pageSizeOptions.slice();
        if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
            this._displayedPageSizeOptions.push(this.pageSize);
        }
        // Sort the numbers using a number-specific sort function.
        this._displayedPageSizeOptions.sort(function (a, b) { return a - b; });
        this._changeDetectorRef.markForCheck();
    };
    /** Emits an event notifying that a change of the paginator's properties has been triggered. */
    MatPaginator.prototype._emitPageEvent = function (previousPageIndex) {
        this.page.emit({
            previousPageIndex: previousPageIndex,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            length: this.length
        });
    };
    MatPaginator.decorators = [
        { type: Component, args: [{
                    selector: 'mat-paginator',
                    exportAs: 'matPaginator',
                    template: "<div class=\"mat-paginator-outer-container\">\n  <div class=\"mat-paginator-container\">\n    <div class=\"mat-paginator-page-size\" *ngIf=\"!hidePageSize\">\n      <div class=\"mat-paginator-page-size-label\">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <mat-form-field\n        *ngIf=\"_displayedPageSizeOptions.length > 1\"\n        [color]=\"color\"\n        class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"pageSize\"\n          [disabled]=\"disabled\"\n          [aria-label]=\"_intl.itemsPerPageLabel\"\n          (selectionChange)=\"_changePageSize($event.value)\">\n          <mat-option *ngFor=\"let pageSizeOption of _displayedPageSizeOptions\" [value]=\"pageSizeOption\">\n            {{pageSizeOption}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <div *ngIf=\"_displayedPageSizeOptions.length <= 1\">{{pageSize}}</div>\n    </div>\n\n    <div class=\"mat-paginator-range-actions\">\n      <div class=\"mat-paginator-range-label\">\n        {{_intl.getRangeLabel(pageIndex, pageSize, length)}}\n      </div>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-first\"\n              (click)=\"firstPage()\"\n              [attr.aria-label]=\"_intl.firstPageLabel\"\n              [matTooltip]=\"_intl.firstPageLabel\"\n              [matTooltipDisabled]=\"_previousButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_previousButtonsDisabled()\"\n              *ngIf=\"showFirstLastButtons\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-previous\"\n              (click)=\"previousPage()\"\n              [attr.aria-label]=\"_intl.previousPageLabel\"\n              [matTooltip]=\"_intl.previousPageLabel\"\n              [matTooltipDisabled]=\"_previousButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_previousButtonsDisabled()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-next\"\n              (click)=\"nextPage()\"\n              [attr.aria-label]=\"_intl.nextPageLabel\"\n              [matTooltip]=\"_intl.nextPageLabel\"\n              [matTooltipDisabled]=\"_nextButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_nextButtonsDisabled()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-last\"\n              (click)=\"lastPage()\"\n              [attr.aria-label]=\"_intl.lastPageLabel\"\n              [matTooltip]=\"_intl.lastPageLabel\"\n              [matTooltipDisabled]=\"_nextButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_nextButtonsDisabled()\"\n              *ngIf=\"showFirstLastButtons\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z\"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n",
                    inputs: ['disabled'],
                    host: {
                        'class': 'mat-paginator',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".mat-paginator{display:block}.mat-paginator-outer-container{display:flex}.mat-paginator-container{display:flex;align-items:center;justify-content:flex-end;min-height:56px;padding:0 8px;flex-wrap:wrap-reverse;width:100%}.mat-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-paginator-page-size{margin-right:0;margin-left:8px}.mat-paginator-page-size-label{margin:0 4px}.mat-paginator-page-size-select{margin:6px 4px 0 4px;width:56px}.mat-paginator-page-size-select.mat-form-field-appearance-outline{width:64px}.mat-paginator-page-size-select.mat-form-field-appearance-fill{width:64px}.mat-paginator-range-label{margin:0 32px 0 24px}.mat-paginator-range-actions{display:flex;align-items:center}.mat-paginator-icon{width:28px;fill:currentColor}[dir=rtl] .mat-paginator-icon{transform:rotate(180deg)}\n"]
                }] }
    ];
    /** @nocollapse */
    MatPaginator.ctorParameters = function () { return [
        { type: MatPaginatorIntl },
        { type: ChangeDetectorRef }
    ]; };
    MatPaginator.propDecorators = {
        color: [{ type: Input }],
        pageIndex: [{ type: Input }],
        length: [{ type: Input }],
        pageSize: [{ type: Input }],
        pageSizeOptions: [{ type: Input }],
        hidePageSize: [{ type: Input }],
        showFirstLastButtons: [{ type: Input }],
        page: [{ type: Output }]
    };
    return MatPaginator;
}(_MatPaginatorBase));
export { MatPaginator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3BhZ2luYXRvci9wYWdpbmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2xGLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUdMLGdCQUFnQixFQUVoQixhQUFhLEdBR2QsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxrR0FBa0c7QUFDbEcsSUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFFN0I7OztHQUdHO0FBQ0g7SUFBQTtJQWVBLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFmRCxJQWVDOztBQUVELG1EQUFtRDtBQUNuRCxvQkFBb0I7QUFDcEI7SUFBQTtJQUF3QixDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBQXpCLElBQXlCO0FBQ3pCLElBQU0saUJBQWlCLEdBQ25CLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7QUFFdEQ7Ozs7R0FJRztBQUNIO0lBWWtDLGdDQUFpQjtJQW1FakQsc0JBQW1CLEtBQXVCLEVBQ3RCLGtCQUFxQztRQUR6RCxZQUVFLGlCQUFPLFNBRVI7UUFKa0IsV0FBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdEIsd0JBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQXJEakQsZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFTZixhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBa0Ja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TSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQXhORixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxjQUFjO29CQUN4Qiw2b0hBQTZCO29CQUU3QixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3BCLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsZUFBZTtxQkFDekI7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7Z0JBekRPLGdCQUFnQjtnQkFWdEIsaUJBQWlCOzs7d0JBMEVoQixLQUFLOzRCQUdMLEtBQUs7eUJBU0wsS0FBSzsyQkFTTCxLQUFLO2tDQVNMLEtBQUs7K0JBU0wsS0FBSzt1Q0FTTCxLQUFLO3VCQVFMLE1BQU07O0lBc0pULG1CQUFDO0NBQUEsQUFoT0QsQ0FZa0MsaUJBQWlCLEdBb05sRDtTQXBOWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHksIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge01hdFBhZ2luYXRvckludGx9IGZyb20gJy4vcGFnaW5hdG9yLWludGwnO1xuaW1wb3J0IHtcbiAgSGFzSW5pdGlhbGl6ZWQsXG4gIEhhc0luaXRpYWxpemVkQ3RvcixcbiAgbWl4aW5Jbml0aWFsaXplZCxcbiAgVGhlbWVQYWxldHRlLFxuICBtaXhpbkRpc2FibGVkLFxuICBDYW5EaXNhYmxlQ3RvcixcbiAgQ2FuRGlzYWJsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbi8qKiBUaGUgZGVmYXVsdCBwYWdlIHNpemUgaWYgdGhlcmUgaXMgbm8gcGFnZSBzaXplIGFuZCB0aGVyZSBhcmUgbm8gcHJvdmlkZWQgcGFnZSBzaXplIG9wdGlvbnMuICovXG5jb25zdCBERUZBVUxUX1BBR0VfU0laRSA9IDUwO1xuXG4vKipcbiAqIENoYW5nZSBldmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhXG4gKiBkaWZmZXJlbnQgcGFnZSBzaXplIG9yIG5hdmlnYXRlcyB0byBhbm90aGVyIHBhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdlRXZlbnQge1xuICAvKiogVGhlIGN1cnJlbnQgcGFnZSBpbmRleC4gKi9cbiAgcGFnZUluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBwYWdlIHRoYXQgd2FzIHNlbGVjdGVkIHByZXZpb3VzbHkuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgOC4wLjAgVG8gYmUgbWFkZSBpbnRvIGEgcmVxdWlyZWQgcHJvcGVydHkuXG4gICAqL1xuICBwcmV2aW91c1BhZ2VJbmRleD86IG51bWJlcjtcblxuICAvKiogVGhlIGN1cnJlbnQgcGFnZSBzaXplICovXG4gIHBhZ2VTaXplOiBudW1iZXI7XG5cbiAgLyoqIFRoZSBjdXJyZW50IHRvdGFsIG51bWJlciBvZiBpdGVtcyBiZWluZyBwYWdlZCAqL1xuICBsZW5ndGg6IG51bWJlcjtcbn1cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRQYWdpbmF0b3IuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuY2xhc3MgTWF0UGFnaW5hdG9yQmFzZSB7fVxuY29uc3QgX01hdFBhZ2luYXRvckJhc2U6IENhbkRpc2FibGVDdG9yICYgSGFzSW5pdGlhbGl6ZWRDdG9yICYgdHlwZW9mIE1hdFBhZ2luYXRvckJhc2UgPVxuICAgIG1peGluRGlzYWJsZWQobWl4aW5Jbml0aWFsaXplZChNYXRQYWdpbmF0b3JCYXNlKSk7XG5cbi8qKlxuICogQ29tcG9uZW50IHRvIHByb3ZpZGUgbmF2aWdhdGlvbiBiZXR3ZWVuIHBhZ2VkIGluZm9ybWF0aW9uLiBEaXNwbGF5cyB0aGUgc2l6ZSBvZiB0aGUgY3VycmVudFxuICogcGFnZSwgdXNlci1zZWxlY3RhYmxlIG9wdGlvbnMgdG8gY2hhbmdlIHRoYXQgc2l6ZSwgd2hhdCBpdGVtcyBhcmUgYmVpbmcgc2hvd24sIGFuZFxuICogbmF2aWdhdGlvbmFsIGJ1dHRvbiB0byBnbyB0byB0aGUgcHJldmlvdXMgb3IgbmV4dCBwYWdlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcGFnaW5hdG9yJyxcbiAgZXhwb3J0QXM6ICdtYXRQYWdpbmF0b3InLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2luYXRvci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2luYXRvci5jc3MnXSxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LXBhZ2luYXRvcicsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQYWdpbmF0b3IgZXh0ZW5kcyBfTWF0UGFnaW5hdG9yQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDYW5EaXNhYmxlLFxuICBIYXNJbml0aWFsaXplZCB7XG4gIHByaXZhdGUgX2luaXRpYWxpemVkOiBib29sZWFuO1xuICBwcml2YXRlIF9pbnRsQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKiBUaGVtZSBjb2xvciB0byBiZSB1c2VkIGZvciB0aGUgdW5kZXJseWluZyBmb3JtIGNvbnRyb2xzLiAqL1xuICBASW5wdXQoKSBjb2xvcjogVGhlbWVQYWxldHRlO1xuXG4gIC8qKiBUaGUgemVyby1iYXNlZCBwYWdlIGluZGV4IG9mIHRoZSBkaXNwbGF5ZWQgbGlzdCBvZiBpdGVtcy4gRGVmYXVsdGVkIHRvIDAuICovXG4gIEBJbnB1dCgpXG4gIGdldCBwYWdlSW5kZXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3BhZ2VJbmRleDsgfVxuICBzZXQgcGFnZUluZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wYWdlSW5kZXggPSBNYXRoLm1heChjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSksIDApO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG4gIHByaXZhdGUgX3BhZ2VJbmRleCA9IDA7XG5cbiAgLyoqIFRoZSBsZW5ndGggb2YgdGhlIHRvdGFsIG51bWJlciBvZiBpdGVtcyB0aGF0IGFyZSBiZWluZyBwYWdpbmF0ZWQuIERlZmF1bHRlZCB0byAwLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZW5ndGg7IH1cbiAgc2V0IGxlbmd0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbGVuZ3RoID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG4gIHByaXZhdGUgX2xlbmd0aCA9IDA7XG5cbiAgLyoqIE51bWJlciBvZiBpdGVtcyB0byBkaXNwbGF5IG9uIGEgcGFnZS4gQnkgZGVmYXVsdCBzZXQgdG8gNTAuICovXG4gIEBJbnB1dCgpXG4gIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcGFnZVNpemU7IH1cbiAgc2V0IHBhZ2VTaXplKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wYWdlU2l6ZSA9IE1hdGgubWF4KGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKSwgMCk7XG4gICAgdGhpcy5fdXBkYXRlRGlzcGxheWVkUGFnZVNpemVPcHRpb25zKCk7XG4gIH1cbiAgcHJpdmF0ZSBfcGFnZVNpemU6IG51bWJlcjtcblxuICAvKiogVGhlIHNldCBvZiBwcm92aWRlZCBwYWdlIHNpemUgb3B0aW9ucyB0byBkaXNwbGF5IHRvIHRoZSB1c2VyLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcGFnZVNpemVPcHRpb25zKCk6IG51bWJlcltdIHsgcmV0dXJuIHRoaXMuX3BhZ2VTaXplT3B0aW9uczsgfVxuICBzZXQgcGFnZVNpemVPcHRpb25zKHZhbHVlOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX3BhZ2VTaXplT3B0aW9ucyA9ICh2YWx1ZSB8fCBbXSkubWFwKHAgPT4gY29lcmNlTnVtYmVyUHJvcGVydHkocCkpO1xuICAgIHRoaXMuX3VwZGF0ZURpc3BsYXllZFBhZ2VTaXplT3B0aW9ucygpO1xuICB9XG4gIHByaXZhdGUgX3BhZ2VTaXplT3B0aW9uczogbnVtYmVyW10gPSBbXTtcblxuICAvKiogV2hldGhlciB0byBoaWRlIHRoZSBwYWdlIHNpemUgc2VsZWN0aW9uIFVJIGZyb20gdGhlIHVzZXIuICovXG4gIEBJbnB1dCgpXG4gIGdldCBoaWRlUGFnZVNpemUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWRlUGFnZVNpemU7IH1cbiAgc2V0IGhpZGVQYWdlU2l6ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVQYWdlU2l6ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaGlkZVBhZ2VTaXplID0gZmFsc2U7XG5cblxuICAvKiogV2hldGhlciB0byBzaG93IHRoZSBmaXJzdC9sYXN0IGJ1dHRvbnMgVUkgdG8gdGhlIHVzZXIuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzaG93Rmlyc3RMYXN0QnV0dG9ucygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dGaXJzdExhc3RCdXR0b25zOyB9XG4gIHNldCBzaG93Rmlyc3RMYXN0QnV0dG9ucyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dGaXJzdExhc3RCdXR0b25zID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9zaG93Rmlyc3RMYXN0QnV0dG9ucyA9IGZhbHNlO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHBhZ2luYXRvciBjaGFuZ2VzIHRoZSBwYWdlIHNpemUgb3IgcGFnZSBpbmRleC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHBhZ2U6IEV2ZW50RW1pdHRlcjxQYWdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQYWdlRXZlbnQ+KCk7XG5cbiAgLyoqIERpc3BsYXllZCBzZXQgb2YgcGFnZSBzaXplIG9wdGlvbnMuIFdpbGwgYmUgc29ydGVkIGFuZCBpbmNsdWRlIGN1cnJlbnQgcGFnZSBzaXplLiAqL1xuICBfZGlzcGxheWVkUGFnZVNpemVPcHRpb25zOiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2ludGw6IE1hdFBhZ2luYXRvckludGwsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5faW50bENoYW5nZXMgPSBfaW50bC5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5fdXBkYXRlRGlzcGxheWVkUGFnZVNpemVPcHRpb25zKCk7XG4gICAgdGhpcy5fbWFya0luaXRpYWxpemVkKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9pbnRsQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqIEFkdmFuY2VzIHRvIHRoZSBuZXh0IHBhZ2UgaWYgaXQgZXhpc3RzLiAqL1xuICBuZXh0UGFnZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGFzTmV4dFBhZ2UoKSkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IHByZXZpb3VzUGFnZUluZGV4ID0gdGhpcy5wYWdlSW5kZXg7XG4gICAgdGhpcy5wYWdlSW5kZXgrKztcbiAgICB0aGlzLl9lbWl0UGFnZUV2ZW50KHByZXZpb3VzUGFnZUluZGV4KTtcbiAgfVxuXG4gIC8qKiBNb3ZlIGJhY2sgdG8gdGhlIHByZXZpb3VzIHBhZ2UgaWYgaXQgZXhpc3RzLiAqL1xuICBwcmV2aW91c1BhZ2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmhhc1ByZXZpb3VzUGFnZSgpKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgcHJldmlvdXNQYWdlSW5kZXggPSB0aGlzLnBhZ2VJbmRleDtcbiAgICB0aGlzLnBhZ2VJbmRleC0tO1xuICAgIHRoaXMuX2VtaXRQYWdlRXZlbnQocHJldmlvdXNQYWdlSW5kZXgpO1xuICB9XG5cbiAgLyoqIE1vdmUgdG8gdGhlIGZpcnN0IHBhZ2UgaWYgbm90IGFscmVhZHkgdGhlcmUuICovXG4gIGZpcnN0UGFnZSgpOiB2b2lkIHtcbiAgICAvLyBoYXNQcmV2aW91c1BhZ2UgYmVpbmcgZmFsc2UgaW1wbGllcyBhdCB0aGUgc3RhcnRcbiAgICBpZiAoIXRoaXMuaGFzUHJldmlvdXNQYWdlKCkpIHsgcmV0dXJuOyB9XG5cbiAgICBjb25zdCBwcmV2aW91c1BhZ2VJbmRleCA9IHRoaXMucGFnZUluZGV4O1xuICAgIHRoaXMucGFnZUluZGV4ID0gMDtcbiAgICB0aGlzLl9lbWl0UGFnZUV2ZW50KHByZXZpb3VzUGFnZUluZGV4KTtcbiAgfVxuXG4gIC8qKiBNb3ZlIHRvIHRoZSBsYXN0IHBhZ2UgaWYgbm90IGFscmVhZHkgdGhlcmUuICovXG4gIGxhc3RQYWdlKCk6IHZvaWQge1xuICAgIC8vIGhhc05leHRQYWdlIGJlaW5nIGZhbHNlIGltcGxpZXMgYXQgdGhlIGVuZFxuICAgIGlmICghdGhpcy5oYXNOZXh0UGFnZSgpKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgcHJldmlvdXNQYWdlSW5kZXggPSB0aGlzLnBhZ2VJbmRleDtcbiAgICB0aGlzLnBhZ2VJbmRleCA9IHRoaXMuZ2V0TnVtYmVyT2ZQYWdlcygpIC0gMTtcbiAgICB0aGlzLl9lbWl0UGFnZUV2ZW50KHByZXZpb3VzUGFnZUluZGV4KTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZXJlIGlzIGEgcHJldmlvdXMgcGFnZS4gKi9cbiAgaGFzUHJldmlvdXNQYWdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2VJbmRleCA+PSAxICYmIHRoaXMucGFnZVNpemUgIT0gMDtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZXJlIGlzIGEgbmV4dCBwYWdlLiAqL1xuICBoYXNOZXh0UGFnZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBtYXhQYWdlSW5kZXggPSB0aGlzLmdldE51bWJlck9mUGFnZXMoKSAtIDE7XG4gICAgcmV0dXJuIHRoaXMucGFnZUluZGV4IDwgbWF4UGFnZUluZGV4ICYmIHRoaXMucGFnZVNpemUgIT0gMDtcbiAgfVxuXG4gIC8qKiBDYWxjdWxhdGUgdGhlIG51bWJlciBvZiBwYWdlcyAqL1xuICBnZXROdW1iZXJPZlBhZ2VzKCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLnBhZ2VTaXplKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMubGVuZ3RoIC8gdGhpcy5wYWdlU2l6ZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSBwYWdlIHNpemUgc28gdGhhdCB0aGUgZmlyc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIHBhZ2Ugd2lsbCBzdGlsbCBiZVxuICAgKiBkaXNwbGF5ZWQgdXNpbmcgdGhlIG5ldyBwYWdlIHNpemUuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBpZiB0aGUgcGFnZSBzaXplIGlzIDEwIGFuZCBvbiB0aGUgc2Vjb25kIHBhZ2UgKGl0ZW1zIGluZGV4ZWQgMTAtMTkpIHRoZW5cbiAgICogc3dpdGNoaW5nIHNvIHRoYXQgdGhlIHBhZ2Ugc2l6ZSBpcyA1IHdpbGwgc2V0IHRoZSB0aGlyZCBwYWdlIGFzIHRoZSBjdXJyZW50IHBhZ2Ugc29cbiAgICogdGhhdCB0aGUgMTB0aCBpdGVtIHdpbGwgc3RpbGwgYmUgZGlzcGxheWVkLlxuICAgKi9cbiAgX2NoYW5nZVBhZ2VTaXplKHBhZ2VTaXplOiBudW1iZXIpIHtcbiAgICAvLyBDdXJyZW50IHBhZ2UgbmVlZHMgdG8gYmUgdXBkYXRlZCB0byByZWZsZWN0IHRoZSBuZXcgcGFnZSBzaXplLiBOYXZpZ2F0ZSB0byB0aGUgcGFnZVxuICAgIC8vIGNvbnRhaW5pbmcgdGhlIHByZXZpb3VzIHBhZ2UncyBmaXJzdCBpdGVtLlxuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLnBhZ2VJbmRleCAqIHRoaXMucGFnZVNpemU7XG4gICAgY29uc3QgcHJldmlvdXNQYWdlSW5kZXggPSB0aGlzLnBhZ2VJbmRleDtcblxuICAgIHRoaXMucGFnZUluZGV4ID0gTWF0aC5mbG9vcihzdGFydEluZGV4IC8gcGFnZVNpemUpIHx8IDA7XG4gICAgdGhpcy5wYWdlU2l6ZSA9IHBhZ2VTaXplO1xuICAgIHRoaXMuX2VtaXRQYWdlRXZlbnQocHJldmlvdXNQYWdlSW5kZXgpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBidXR0b25zIGZvciBnb2luZyBmb3J3YXJkcyBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gIF9uZXh0QnV0dG9uc0Rpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8ICF0aGlzLmhhc05leHRQYWdlKCk7XG4gIH1cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGJ1dHRvbnMgZm9yIGdvaW5nIGJhY2t3YXJkcyBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gIF9wcmV2aW91c0J1dHRvbnNEaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5oYXNQcmV2aW91c1BhZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBsaXN0IG9mIHBhZ2Ugc2l6ZSBvcHRpb25zIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXIuIEluY2x1ZGVzIG1ha2luZyBzdXJlIHRoYXRcbiAgICogdGhlIHBhZ2Ugc2l6ZSBpcyBhbiBvcHRpb24gYW5kIHRoYXQgdGhlIGxpc3QgaXMgc29ydGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlRGlzcGxheWVkUGFnZVNpemVPcHRpb25zKCkge1xuICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAvLyBJZiBubyBwYWdlIHNpemUgaXMgcHJvdmlkZWQsIHVzZSB0aGUgZmlyc3QgcGFnZSBzaXplIG9wdGlvbiBvciB0aGUgZGVmYXVsdCBwYWdlIHNpemUuXG4gICAgaWYgKCF0aGlzLnBhZ2VTaXplKSB7XG4gICAgICB0aGlzLl9wYWdlU2l6ZSA9IHRoaXMucGFnZVNpemVPcHRpb25zLmxlbmd0aCAhPSAwID9cbiAgICAgICAgICB0aGlzLnBhZ2VTaXplT3B0aW9uc1swXSA6XG4gICAgICAgICAgREVGQVVMVF9QQUdFX1NJWkU7XG4gICAgfVxuXG4gICAgdGhpcy5fZGlzcGxheWVkUGFnZVNpemVPcHRpb25zID0gdGhpcy5wYWdlU2l6ZU9wdGlvbnMuc2xpY2UoKTtcblxuICAgIGlmICh0aGlzLl9kaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMuaW5kZXhPZih0aGlzLnBhZ2VTaXplKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuX2Rpc3BsYXllZFBhZ2VTaXplT3B0aW9ucy5wdXNoKHRoaXMucGFnZVNpemUpO1xuICAgIH1cblxuICAgIC8vIFNvcnQgdGhlIG51bWJlcnMgdXNpbmcgYSBudW1iZXItc3BlY2lmaWMgc29ydCBmdW5jdGlvbi5cbiAgICB0aGlzLl9kaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEVtaXRzIGFuIGV2ZW50IG5vdGlmeWluZyB0aGF0IGEgY2hhbmdlIG9mIHRoZSBwYWdpbmF0b3IncyBwcm9wZXJ0aWVzIGhhcyBiZWVuIHRyaWdnZXJlZC4gKi9cbiAgcHJpdmF0ZSBfZW1pdFBhZ2VFdmVudChwcmV2aW91c1BhZ2VJbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5wYWdlLmVtaXQoe1xuICAgICAgcHJldmlvdXNQYWdlSW5kZXgsXG4gICAgICBwYWdlSW5kZXg6IHRoaXMucGFnZUluZGV4LFxuICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICBsZW5ndGg6IHRoaXMubGVuZ3RoXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcGFnZUluZGV4OiBudW1iZXIgfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbGVuZ3RoOiBudW1iZXIgfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcGFnZVNpemU6IG51bWJlciB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oaWRlUGFnZVNpemU6IGJvb2xlYW4gfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2hvd0ZpcnN0TGFzdEJ1dHRvbnM6IGJvb2xlYW4gfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IGJvb2xlYW4gfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xufVxuIl19