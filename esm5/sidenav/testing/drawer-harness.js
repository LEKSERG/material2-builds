/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter, __extends, __generator } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
/**
 * Harness for interacting with a standard mat-drawer in tests.
 * @dynamic
 */
var MatDrawerHarness = /** @class */ (function (_super) {
    __extends(MatDrawerHarness, _super);
    function MatDrawerHarness() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a drawer with
     * specific attributes.
     * @param options Options for narrowing the search.
     * @return `HarnessPredicate` configured with the given options.
     */
    MatDrawerHarness.with = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatDrawerHarness, options)
            .addOption('position', options.position, function (harness, position) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, harness.getPosition()];
                case 1: return [2 /*return*/, (_a.sent()) === position];
            }
        }); }); });
    };
    /** Gets whether the drawer is open. */
    MatDrawerHarness.prototype.isOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).hasClass('mat-drawer-opened')];
                }
            });
        });
    };
    /** Gets the position of the drawer inside its container. */
    MatDrawerHarness.prototype.getPosition = function () {
        return __awaiter(this, void 0, void 0, function () {
            var host;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1:
                        host = _a.sent();
                        return [4 /*yield*/, host.hasClass('mat-drawer-end')];
                    case 2: return [2 /*return*/, (_a.sent()) ? 'end' : 'start'];
                }
            });
        });
    };
    /** Gets the mode that the drawer is in. */
    MatDrawerHarness.prototype.getMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var host;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1:
                        host = _a.sent();
                        return [4 /*yield*/, host.hasClass('mat-drawer-push')];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, 'push'];
                        }
                        return [4 /*yield*/, host.hasClass('mat-drawer-side')];
                    case 3:
                        if (_a.sent()) {
                            return [2 /*return*/, 'side'];
                        }
                        return [2 /*return*/, 'over'];
                }
            });
        });
    };
    MatDrawerHarness.hostSelector = '.mat-drawer';
    return MatDrawerHarness;
}(ComponentHarness));
export { MatDrawerHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc2lkZW5hdi90ZXN0aW5nL2RyYXdlci1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RTs7O0dBR0c7QUFDSDtJQUFzQyxvQ0FBZ0I7SUFBdEQ7O0lBd0NBLENBQUM7SUFyQ0M7Ozs7O09BS0c7SUFDSSxxQkFBSSxHQUFYLFVBQVksT0FBa0M7UUFBOUMsaUJBSUM7UUFKVyx3QkFBQSxFQUFBLFlBQWtDO1FBQzVDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUM7YUFDakQsU0FBUyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUNuQyxVQUFPLE9BQU8sRUFBRSxRQUFROzt3QkFBTSxxQkFBTSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUE7d0JBQTVCLHNCQUFBLENBQUMsU0FBMkIsQ0FBQyxLQUFLLFFBQVEsRUFBQTs7aUJBQUEsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCx1Q0FBdUM7SUFDakMsaUNBQU0sR0FBWjs7Ozs0QkFDVSxxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7NEJBQXpCLHNCQUFPLENBQUMsU0FBaUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFDOzs7O0tBQzFEO0lBRUQsNERBQTREO0lBQ3RELHNDQUFXLEdBQWpCOzs7Ozs0QkFDZSxxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUF4QixJQUFJLEdBQUcsU0FBaUI7d0JBQ3RCLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBQTs0QkFBN0Msc0JBQU8sQ0FBQyxTQUFxQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFDOzs7O0tBQ2xFO0lBRUQsMkNBQTJDO0lBQ3JDLGtDQUFPLEdBQWI7Ozs7OzRCQUNlLHFCQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQTs7d0JBQXhCLElBQUksR0FBRyxTQUFpQjt3QkFFMUIscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFBOzt3QkFBMUMsSUFBSSxTQUFzQyxFQUFFOzRCQUMxQyxzQkFBTyxNQUFNLEVBQUM7eUJBQ2Y7d0JBRUcscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFBOzt3QkFBMUMsSUFBSSxTQUFzQyxFQUFFOzRCQUMxQyxzQkFBTyxNQUFNLEVBQUM7eUJBQ2Y7d0JBRUQsc0JBQU8sTUFBTSxFQUFDOzs7O0tBQ2Y7SUF0Q00sNkJBQVksR0FBRyxhQUFhLENBQUM7SUF1Q3RDLHVCQUFDO0NBQUEsQUF4Q0QsQ0FBc0MsZ0JBQWdCLEdBd0NyRDtTQXhDWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlfSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge0RyYXdlckhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2RyYXdlci1oYXJuZXNzLWZpbHRlcnMnO1xuXG4vKipcbiAqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBzdGFuZGFyZCBtYXQtZHJhd2VyIGluIHRlc3RzLlxuICogQGR5bmFtaWNcbiAqL1xuZXhwb3J0IGNsYXNzIE1hdERyYXdlckhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LWRyYXdlcic7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgZHJhd2VyIHdpdGhcbiAgICogc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgbmFycm93aW5nIHRoZSBzZWFyY2guXG4gICAqIEByZXR1cm4gYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IERyYXdlckhhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdERyYXdlckhhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0RHJhd2VySGFybmVzcywgb3B0aW9ucylcbiAgICAgICAgLmFkZE9wdGlvbigncG9zaXRpb24nLCBvcHRpb25zLnBvc2l0aW9uLFxuICAgICAgICAgICAgYXN5bmMgKGhhcm5lc3MsIHBvc2l0aW9uKSA9PiAoYXdhaXQgaGFybmVzcy5nZXRQb3NpdGlvbigpKSA9PT0gcG9zaXRpb24pO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgZHJhd2VyIGlzIG9wZW4uICovXG4gIGFzeW5jIGlzT3BlbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5oYXNDbGFzcygnbWF0LWRyYXdlci1vcGVuZWQnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgZHJhd2VyIGluc2lkZSBpdHMgY29udGFpbmVyLiAqL1xuICBhc3luYyBnZXRQb3NpdGlvbigpOiBQcm9taXNlPCdzdGFydCd8J2VuZCc+IHtcbiAgICBjb25zdCBob3N0ID0gYXdhaXQgdGhpcy5ob3N0KCk7XG4gICAgcmV0dXJuIChhd2FpdCBob3N0Lmhhc0NsYXNzKCdtYXQtZHJhd2VyLWVuZCcpKSA/ICdlbmQnIDogJ3N0YXJ0JztcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtb2RlIHRoYXQgdGhlIGRyYXdlciBpcyBpbi4gKi9cbiAgYXN5bmMgZ2V0TW9kZSgpOiBQcm9taXNlPCdvdmVyJ3wncHVzaCd8J3NpZGUnPiB7XG4gICAgY29uc3QgaG9zdCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuXG4gICAgaWYgKGF3YWl0IGhvc3QuaGFzQ2xhc3MoJ21hdC1kcmF3ZXItcHVzaCcpKSB7XG4gICAgICByZXR1cm4gJ3B1c2gnO1xuICAgIH1cblxuICAgIGlmIChhd2FpdCBob3N0Lmhhc0NsYXNzKCdtYXQtZHJhd2VyLXNpZGUnKSkge1xuICAgICAgcmV0dXJuICdzaWRlJztcbiAgICB9XG5cbiAgICByZXR1cm4gJ292ZXInO1xuICB9XG59XG4iXX0=