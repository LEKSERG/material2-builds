/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { MatDrawerHarness } from './drawer-harness';
import { DrawerHarnessFilters } from './drawer-harness-filters';
/** Harness for interacting with a standard mat-sidenav in tests. */
export declare class MatSidenavHarness extends MatDrawerHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a sidenav with
     * specific attributes.
     * @param options Options for narrowing the search.
     * @return `HarnessPredicate` configured with the given options.
     */
    static with(options?: DrawerHarnessFilters): HarnessPredicate<MatDrawerHarness>;
    /** Gets whether the sidenav is fixed in the viewport. */
    isFixedInViewport(): Promise<boolean>;
}
