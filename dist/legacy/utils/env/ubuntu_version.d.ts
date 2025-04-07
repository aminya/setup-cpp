import memoize from "memoizee";
declare function ubuntuVersion_(): Promise<number[] | null>;
/** Detect Ubuntu version */
export declare const ubuntuVersion: typeof ubuntuVersion_ & memoize.Memoized<typeof ubuntuVersion_>;
export {};
