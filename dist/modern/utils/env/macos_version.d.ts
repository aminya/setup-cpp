import memoize from "memoizee";
/**
 * Get macOS version
 *
 * @returns {number[]} - The macOS version as an array of numbers
 */
declare function macosVersion_(): number[];
export declare const macosVersion: typeof macosVersion_ & memoize.Memoized<typeof macosVersion_>;
export {};
