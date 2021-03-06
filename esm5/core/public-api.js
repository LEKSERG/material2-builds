/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export * from './version';
export * from './animation/animation';
export * from './common-behaviors/index';
export * from './datetime/index';
export * from './error/error-options';
export * from './gestures/gesture-config';
export * from './line/line';
export * from './option/index';
export * from './label/label-options';
export * from './ripple/index';
export * from './selection/index';
// TODO(devversion): remove this with v8
export * from './month-constants';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9jb3JlL3B1YmxpYy1hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsY0FBYyxXQUFXLENBQUM7QUFDMUIsY0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxjQUFjLDBCQUEwQixDQUFDO0FBQ3pDLGNBQWMsa0JBQWtCLENBQUM7QUFDakMsY0FBYyx1QkFBdUIsQ0FBQztBQUV0QyxjQUFjLDJCQUEyQixDQUFDO0FBQzFDLGNBQWMsYUFBYSxDQUFDO0FBQzVCLGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxjQUFjLGdCQUFnQixDQUFDO0FBQy9CLGNBQWMsbUJBQW1CLENBQUM7QUFFbEMsd0NBQXdDO0FBQ3hDLGNBQWMsbUJBQW1CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi92ZXJzaW9uJztcbmV4cG9ydCAqIGZyb20gJy4vYW5pbWF0aW9uL2FuaW1hdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL2NvbW1vbi1iZWhhdmlvcnMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRldGltZS9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2Vycm9yL2Vycm9yLW9wdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9nZXN0dXJlcy9nZXN0dXJlLWFubm90YXRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vZ2VzdHVyZXMvZ2VzdHVyZS1jb25maWcnO1xuZXhwb3J0ICogZnJvbSAnLi9saW5lL2xpbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9vcHRpb24vaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9sYWJlbC9sYWJlbC1vcHRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vcmlwcGxlL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vc2VsZWN0aW9uL2luZGV4JztcblxuLy8gVE9ETyhkZXZ2ZXJzaW9uKTogcmVtb3ZlIHRoaXMgd2l0aCB2OFxuZXhwb3J0ICogZnJvbSAnLi9tb250aC1jb25zdGFudHMnO1xuIl19