/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
/** Harness for interacting with a standard mat-snack-bar in tests. */
export class MatSnackBarHarness extends ComponentHarness {
    constructor() {
        super(...arguments);
        this._simpleSnackBar = this.locatorForOptional('.mat-simple-snackbar');
        this._simpleSnackBarMessage = this.locatorFor('.mat-simple-snackbar > span');
        this._simpleSnackBarActionButton = this.locatorForOptional('.mat-simple-snackbar-action > button');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a snack-bar with
     * specific attributes.
     * @param options Options for narrowing the search.
     *   - `selector` finds a snack-bar that matches the given selector. Note that the
     *                selector must match the snack-bar container element.
     * @return `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatSnackBarHarness, options);
    }
    /**
     * Gets the role of the snack-bar. The role of a snack-bar is determined based
     * on the ARIA politeness specified in the snack-bar config.
     */
    getRole() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).getAttribute('role');
        });
    }
    /**
     * Gets whether the snack-bar has an action. Method cannot be
     * used for snack-bar's with custom content.
     */
    hasAction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._assertSimpleSnackBar();
            return (yield this._simpleSnackBarActionButton()) !== null;
        });
    }
    /**
     * Gets the description of the snack-bar. Method cannot be
     * used for snack-bar's without action or with custom content.
     */
    getActionDescription() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._assertSimpleSnackBarWithAction();
            return (yield this._simpleSnackBarActionButton()).text();
        });
    }
    /**
     * Dismisses the snack-bar by clicking the action button. Method cannot
     * be used for snack-bar's without action or with custom content.
     */
    dismissWithAction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._assertSimpleSnackBarWithAction();
            yield (yield this._simpleSnackBarActionButton()).click();
        });
    }
    /**
     * Gets the message of the snack-bar. Method cannot be used for
     * snack-bar's with custom content.
     */
    getMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._assertSimpleSnackBar();
            return (yield this._simpleSnackBarMessage()).text();
        });
    }
    /**
     * Asserts that the current snack-bar does not use custom content. Throws if
     * custom content is used.
     */
    _assertSimpleSnackBar() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this._isSimpleSnackBar())) {
                throw new Error('Method cannot be used for snack-bar with custom content.');
            }
        });
    }
    /**
     * Asserts that the current snack-bar does not use custom content and has
     * an action defined. Otherwise an error will be thrown.
     */
    _assertSimpleSnackBarWithAction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._assertSimpleSnackBar();
            if (!(yield this.hasAction())) {
                throw new Error('Method cannot be used for standard snack-bar without action.');
            }
        });
    }
    /** Gets whether the snack-bar is using the default content template. */
    _isSimpleSnackBar() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._simpleSnackBar()) !== null;
        });
    }
}
// Developers can provide a custom component or template for the
// snackbar. The canonical snack-bar parent is the "MatSnackBarContainer".
MatSnackBarHarness.hostSelector = '.mat-snack-bar-container';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc25hY2stYmFyL3Rlc3Rpbmcvc25hY2stYmFyLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR3hFLHNFQUFzRTtBQUN0RSxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsZ0JBQWdCO0lBQXhEOztRQUtVLG9CQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDbEUsMkJBQXNCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ3hFLGdDQUEyQixHQUMvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQW9GdEUsQ0FBQztJQWxGQzs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFrQyxFQUFFO1FBQzlDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0csT0FBTzs7WUFDWCxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFtQyxDQUFDO1FBQ3BGLENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNHLFNBQVM7O1lBQ2IsTUFBTSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNuQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQztRQUM3RCxDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDRyxvQkFBb0I7O1lBQ3hCLE1BQU0sSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7WUFDN0MsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1RCxDQUFDO0tBQUE7SUFHRDs7O09BR0c7SUFDRyxpQkFBaUI7O1lBQ3JCLE1BQU0sSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7WUFDN0MsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1RCxDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDRyxVQUFVOztZQUNkLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDbkMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0RCxDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDVyxxQkFBcUI7O1lBQ2pDLElBQUksQ0FBQyxDQUFBLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUEsRUFBRTtnQkFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO2FBQzdFO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7OztPQUdHO0lBQ1csK0JBQStCOztZQUMzQyxNQUFNLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxDQUFBLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBLEVBQUU7Z0JBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsOERBQThELENBQUMsQ0FBQzthQUNqRjtRQUNILENBQUM7S0FBQTtJQUVELHdFQUF3RTtJQUMxRCxpQkFBaUI7O1lBQzdCLE9BQU8sQ0FBQSxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsTUFBSyxJQUFJLENBQUM7UUFDL0MsQ0FBQztLQUFBOztBQTFGRCxnRUFBZ0U7QUFDaEUsMEVBQTBFO0FBQ25FLCtCQUFZLEdBQUcsMEJBQTBCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1NuYWNrQmFySGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vc25hY2stYmFyLWhhcm5lc3MtZmlsdGVycyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgc3RhbmRhcmQgbWF0LXNuYWNrLWJhciBpbiB0ZXN0cy4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTbmFja0Jhckhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLy8gRGV2ZWxvcGVycyBjYW4gcHJvdmlkZSBhIGN1c3RvbSBjb21wb25lbnQgb3IgdGVtcGxhdGUgZm9yIHRoZVxuICAvLyBzbmFja2Jhci4gVGhlIGNhbm9uaWNhbCBzbmFjay1iYXIgcGFyZW50IGlzIHRoZSBcIk1hdFNuYWNrQmFyQ29udGFpbmVyXCIuXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1zbmFjay1iYXItY29udGFpbmVyJztcblxuICBwcml2YXRlIF9zaW1wbGVTbmFja0JhciA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWF0LXNpbXBsZS1zbmFja2JhcicpO1xuICBwcml2YXRlIF9zaW1wbGVTbmFja0Jhck1lc3NhZ2UgPSB0aGlzLmxvY2F0b3JGb3IoJy5tYXQtc2ltcGxlLXNuYWNrYmFyID4gc3BhbicpO1xuICBwcml2YXRlIF9zaW1wbGVTbmFja0JhckFjdGlvbkJ1dHRvbiA9XG4gICAgICB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1zaW1wbGUtc25hY2tiYXItYWN0aW9uID4gYnV0dG9uJyk7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgc25hY2stYmFyIHdpdGhcbiAgICogc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgbmFycm93aW5nIHRoZSBzZWFyY2guXG4gICAqICAgLSBgc2VsZWN0b3JgIGZpbmRzIGEgc25hY2stYmFyIHRoYXQgbWF0Y2hlcyB0aGUgZ2l2ZW4gc2VsZWN0b3IuIE5vdGUgdGhhdCB0aGVcbiAgICogICAgICAgICAgICAgICAgc2VsZWN0b3IgbXVzdCBtYXRjaCB0aGUgc25hY2stYmFyIGNvbnRhaW5lciBlbGVtZW50LlxuICAgKiBAcmV0dXJuIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBTbmFja0Jhckhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdFNuYWNrQmFySGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRTbmFja0Jhckhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJvbGUgb2YgdGhlIHNuYWNrLWJhci4gVGhlIHJvbGUgb2YgYSBzbmFjay1iYXIgaXMgZGV0ZXJtaW5lZCBiYXNlZFxuICAgKiBvbiB0aGUgQVJJQSBwb2xpdGVuZXNzIHNwZWNpZmllZCBpbiB0aGUgc25hY2stYmFyIGNvbmZpZy5cbiAgICovXG4gIGFzeW5jIGdldFJvbGUoKTogUHJvbWlzZTwnYWxlcnQnfCdzdGF0dXMnfG51bGw+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSBhcyBQcm9taXNlPCdhbGVydCd8J3N0YXR1cyd8bnVsbD47XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB3aGV0aGVyIHRoZSBzbmFjay1iYXIgaGFzIGFuIGFjdGlvbi4gTWV0aG9kIGNhbm5vdCBiZVxuICAgKiB1c2VkIGZvciBzbmFjay1iYXIncyB3aXRoIGN1c3RvbSBjb250ZW50LlxuICAgKi9cbiAgYXN5bmMgaGFzQWN0aW9uKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGF3YWl0IHRoaXMuX2Fzc2VydFNpbXBsZVNuYWNrQmFyKCk7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9zaW1wbGVTbmFja0JhckFjdGlvbkJ1dHRvbigpKSAhPT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgc25hY2stYmFyLiBNZXRob2QgY2Fubm90IGJlXG4gICAqIHVzZWQgZm9yIHNuYWNrLWJhcidzIHdpdGhvdXQgYWN0aW9uIG9yIHdpdGggY3VzdG9tIGNvbnRlbnQuXG4gICAqL1xuICBhc3luYyBnZXRBY3Rpb25EZXNjcmlwdGlvbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGF3YWl0IHRoaXMuX2Fzc2VydFNpbXBsZVNuYWNrQmFyV2l0aEFjdGlvbigpO1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5fc2ltcGxlU25hY2tCYXJBY3Rpb25CdXR0b24oKSkhLnRleHQoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIERpc21pc3NlcyB0aGUgc25hY2stYmFyIGJ5IGNsaWNraW5nIHRoZSBhY3Rpb24gYnV0dG9uLiBNZXRob2QgY2Fubm90XG4gICAqIGJlIHVzZWQgZm9yIHNuYWNrLWJhcidzIHdpdGhvdXQgYWN0aW9uIG9yIHdpdGggY3VzdG9tIGNvbnRlbnQuXG4gICAqL1xuICBhc3luYyBkaXNtaXNzV2l0aEFjdGlvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLl9hc3NlcnRTaW1wbGVTbmFja0JhcldpdGhBY3Rpb24oKTtcbiAgICBhd2FpdCAoYXdhaXQgdGhpcy5fc2ltcGxlU25hY2tCYXJBY3Rpb25CdXR0b24oKSkhLmNsaWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbWVzc2FnZSBvZiB0aGUgc25hY2stYmFyLiBNZXRob2QgY2Fubm90IGJlIHVzZWQgZm9yXG4gICAqIHNuYWNrLWJhcidzIHdpdGggY3VzdG9tIGNvbnRlbnQuXG4gICAqL1xuICBhc3luYyBnZXRNZXNzYWdlKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgYXdhaXQgdGhpcy5fYXNzZXJ0U2ltcGxlU25hY2tCYXIoKTtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX3NpbXBsZVNuYWNrQmFyTWVzc2FnZSgpKS50ZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSBjdXJyZW50IHNuYWNrLWJhciBkb2VzIG5vdCB1c2UgY3VzdG9tIGNvbnRlbnQuIFRocm93cyBpZlxuICAgKiBjdXN0b20gY29udGVudCBpcyB1c2VkLlxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfYXNzZXJ0U2ltcGxlU25hY2tCYXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFhd2FpdCB0aGlzLl9pc1NpbXBsZVNuYWNrQmFyKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIGNhbm5vdCBiZSB1c2VkIGZvciBzbmFjay1iYXIgd2l0aCBjdXN0b20gY29udGVudC4nKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSBjdXJyZW50IHNuYWNrLWJhciBkb2VzIG5vdCB1c2UgY3VzdG9tIGNvbnRlbnQgYW5kIGhhc1xuICAgKiBhbiBhY3Rpb24gZGVmaW5lZC4gT3RoZXJ3aXNlIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfYXNzZXJ0U2ltcGxlU25hY2tCYXJXaXRoQWN0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuX2Fzc2VydFNpbXBsZVNuYWNrQmFyKCk7XG4gICAgaWYgKCFhd2FpdCB0aGlzLmhhc0FjdGlvbigpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBjYW5ub3QgYmUgdXNlZCBmb3Igc3RhbmRhcmQgc25hY2stYmFyIHdpdGhvdXQgYWN0aW9uLicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIHNuYWNrLWJhciBpcyB1c2luZyB0aGUgZGVmYXVsdCBjb250ZW50IHRlbXBsYXRlLiAqL1xuICBwcml2YXRlIGFzeW5jIF9pc1NpbXBsZVNuYWNrQmFyKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9zaW1wbGVTbmFja0JhcigpICE9PSBudWxsO1xuICB9XG59XG4iXX0=