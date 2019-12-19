/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatCellHarness, MatHeaderCellHarness, MatFooterCellHarness } from './cell-harness';
/** Harness for interacting with a standard Angular Material table row. */
export class MatRowHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatRowHarness, options);
    }
    /** Gets a list of `MatCellHarness` for all cells in the row. */
    getCells(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatCellHarness.with(filter))();
        });
    }
    /** Gets the text of the cells in the row. */
    getCellTextByIndex(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTextByIndex(this, filter);
        });
    }
}
/** The selector for the host element of a `MatRowHarness` instance. */
MatRowHarness.hostSelector = '.mat-row';
/** Harness for interacting with a standard Angular Material table header row. */
export class MatHeaderRowHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table header row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatHeaderRowHarness, options);
    }
    /** Gets a list of `MatHeaderCellHarness` for all cells in the row. */
    getCells(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatHeaderCellHarness.with(filter))();
        });
    }
    /** Gets the text of the cells in the header row. */
    getCellTextByIndex(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTextByIndex(this, filter);
        });
    }
}
/** The selector for the host element of a `MatHeaderRowHarness` instance. */
MatHeaderRowHarness.hostSelector = '.mat-header-row';
/** Harness for interacting with a standard Angular Material table footer row. */
export class MatFooterRowHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table footer row cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatFooterRowHarness, options);
    }
    /** Gets a list of `MatFooterCellHarness` for all cells in the row. */
    getCells(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorForAll(MatFooterCellHarness.with(filter))();
        });
    }
    /** Gets the text of the cells in the footer row. */
    getCellTextByIndex(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return getCellTextByIndex(this, filter);
        });
    }
}
/** The selector for the host element of a `MatFooterRowHarness` instance. */
MatFooterRowHarness.hostSelector = '.mat-footer-row';
function getCellTextByIndex(harness, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        const cells = yield harness.getCells(filter);
        return Promise.all(cells.map(cell => cell.getText()));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvdGFibGUvdGVzdGluZy9yb3ctaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFeEUsT0FBTyxFQUFDLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTFGLDBFQUEwRTtBQUMxRSxNQUFNLE9BQU8sYUFBYyxTQUFRLGdCQUFnQjtJQUlqRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUE2QixFQUFFO1FBQ3pDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELGdFQUFnRTtJQUMxRCxRQUFRLENBQUMsU0FBNkIsRUFBRTs7WUFDNUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNELENBQUM7S0FBQTtJQUVELDZDQUE2QztJQUN2QyxrQkFBa0IsQ0FBQyxTQUE2QixFQUFFOztZQUN0RCxPQUFPLGtCQUFrQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDO0tBQUE7O0FBcEJELHVFQUF1RTtBQUNoRSwwQkFBWSxHQUFHLFVBQVUsQ0FBQztBQXNCbkMsaUZBQWlGO0FBQ2pGLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFJdkQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQTZCLEVBQUU7UUFDekMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxzRUFBc0U7SUFDaEUsUUFBUSxDQUFDLFNBQTZCLEVBQUU7O1lBQzVDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2pFLENBQUM7S0FBQTtJQUVELG9EQUFvRDtJQUM5QyxrQkFBa0IsQ0FBQyxTQUE2QixFQUFFOztZQUN0RCxPQUFPLGtCQUFrQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDO0tBQUE7O0FBckJELDZFQUE2RTtBQUN0RSxnQ0FBWSxHQUFHLGlCQUFpQixDQUFDO0FBd0IxQyxpRkFBaUY7QUFDakYsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUl2RDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBNkIsRUFBRTtRQUN6QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHNFQUFzRTtJQUNoRSxRQUFRLENBQUMsU0FBNkIsRUFBRTs7WUFDNUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDakUsQ0FBQztLQUFBO0lBRUQsb0RBQW9EO0lBQzlDLGtCQUFrQixDQUFDLFNBQTZCLEVBQUU7O1lBQ3RELE9BQU8sa0JBQWtCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTs7QUFyQkQsNkVBQTZFO0FBQ3RFLGdDQUFZLEdBQUcsaUJBQWlCLENBQUM7QUF1QjFDLFNBQWUsa0JBQWtCLENBQUMsT0FFakMsRUFBRSxNQUEwQjs7UUFDM0IsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1Jvd0hhcm5lc3NGaWx0ZXJzLCBDZWxsSGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vdGFibGUtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7TWF0Q2VsbEhhcm5lc3MsIE1hdEhlYWRlckNlbGxIYXJuZXNzLCBNYXRGb290ZXJDZWxsSGFybmVzc30gZnJvbSAnLi9jZWxsLWhhcm5lc3MnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIHN0YW5kYXJkIEFuZ3VsYXIgTWF0ZXJpYWwgdGFibGUgcm93LiAqL1xuZXhwb3J0IGNsYXNzIE1hdFJvd0hhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRSb3dIYXJuZXNzYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LXJvdyc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgdGFibGUgcm93IHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgbmFycm93aW5nIHRoZSBzZWFyY2hcbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBSb3dIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRSb3dIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFJvd0hhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBsaXN0IG9mIGBNYXRDZWxsSGFybmVzc2AgZm9yIGFsbCBjZWxscyBpbiB0aGUgcm93LiAqL1xuICBhc3luYyBnZXRDZWxscyhmaWx0ZXI6IENlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRDZWxsSGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbChNYXRDZWxsSGFybmVzcy53aXRoKGZpbHRlcikpKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBvZiB0aGUgY2VsbHMgaW4gdGhlIHJvdy4gKi9cbiAgYXN5bmMgZ2V0Q2VsbFRleHRCeUluZGV4KGZpbHRlcjogQ2VsbEhhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIGdldENlbGxUZXh0QnlJbmRleCh0aGlzLCBmaWx0ZXIpO1xuICB9XG59XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgc3RhbmRhcmQgQW5ndWxhciBNYXRlcmlhbCB0YWJsZSBoZWFkZXIgcm93LiAqL1xuZXhwb3J0IGNsYXNzIE1hdEhlYWRlclJvd0hhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRIZWFkZXJSb3dIYXJuZXNzYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LWhlYWRlci1yb3cnO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvclxuICAgKiBhIHRhYmxlIGhlYWRlciByb3cgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFJvd0hhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdEhlYWRlclJvd0hhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0SGVhZGVyUm93SGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogR2V0cyBhIGxpc3Qgb2YgYE1hdEhlYWRlckNlbGxIYXJuZXNzYCBmb3IgYWxsIGNlbGxzIGluIHRoZSByb3cuICovXG4gIGFzeW5jIGdldENlbGxzKGZpbHRlcjogQ2VsbEhhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPE1hdEhlYWRlckNlbGxIYXJuZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yQWxsKE1hdEhlYWRlckNlbGxIYXJuZXNzLndpdGgoZmlsdGVyKSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IG9mIHRoZSBjZWxscyBpbiB0aGUgaGVhZGVyIHJvdy4gKi9cbiAgYXN5bmMgZ2V0Q2VsbFRleHRCeUluZGV4KGZpbHRlcjogQ2VsbEhhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIGdldENlbGxUZXh0QnlJbmRleCh0aGlzLCBmaWx0ZXIpO1xuICB9XG59XG5cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBzdGFuZGFyZCBBbmd1bGFyIE1hdGVyaWFsIHRhYmxlIGZvb3RlciByb3cuICovXG5leHBvcnQgY2xhc3MgTWF0Rm9vdGVyUm93SGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdEZvb3RlclJvd0hhcm5lc3NgIGluc3RhbmNlLiAqL1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtZm9vdGVyLXJvdyc7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yXG4gICAqIGEgdGFibGUgZm9vdGVyIHJvdyBjZWxsIHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgbmFycm93aW5nIHRoZSBzZWFyY2hcbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBSb3dIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRGb290ZXJSb3dIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdEZvb3RlclJvd0hhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEdldHMgYSBsaXN0IG9mIGBNYXRGb290ZXJDZWxsSGFybmVzc2AgZm9yIGFsbCBjZWxscyBpbiB0aGUgcm93LiAqL1xuICBhc3luYyBnZXRDZWxscyhmaWx0ZXI6IENlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxNYXRGb290ZXJDZWxsSGFybmVzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbChNYXRGb290ZXJDZWxsSGFybmVzcy53aXRoKGZpbHRlcikpKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBvZiB0aGUgY2VsbHMgaW4gdGhlIGZvb3RlciByb3cuICovXG4gIGFzeW5jIGdldENlbGxUZXh0QnlJbmRleChmaWx0ZXI6IENlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiBnZXRDZWxsVGV4dEJ5SW5kZXgodGhpcywgZmlsdGVyKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRDZWxsVGV4dEJ5SW5kZXgoaGFybmVzczoge1xuICBnZXRDZWxsczogKGZpbHRlcj86IENlbGxIYXJuZXNzRmlsdGVycykgPT4gUHJvbWlzZTxNYXRDZWxsSGFybmVzc1tdPlxufSwgZmlsdGVyOiBDZWxsSGFybmVzc0ZpbHRlcnMpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gIGNvbnN0IGNlbGxzID0gYXdhaXQgaGFybmVzcy5nZXRDZWxscyhmaWx0ZXIpO1xuICByZXR1cm4gUHJvbWlzZS5hbGwoY2VsbHMubWFwKGNlbGwgPT4gY2VsbC5nZXRUZXh0KCkpKTtcbn1cbiJdfQ==