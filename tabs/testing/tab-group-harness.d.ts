/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { TabGroupHarnessFilters } from './tab-harness-filters';
import { MatTabHarness } from './tab-harness';
/**
 * Harness for interacting with a standard mat-tab-group in tests.
 * @dynamic
 */
export declare class MatTabGroupHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a radio-button with
     * specific attributes.
     * @param options Options for narrowing the search
     *   - `selector` finds a tab-group whose host element matches the given selector.
     *   - `selectedTabLabel` finds a tab-group with a selected tab that matches the
     *      specified tab label.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: TabGroupHarnessFilters): HarnessPredicate<MatTabGroupHarness>;
    private _tabs;
    /** Gets all tabs of the tab group. */
    getTabs(): Promise<MatTabHarness[]>;
    /** Gets the selected tab of the tab group. */
    getSelectedTab(): Promise<MatTabHarness>;
}
