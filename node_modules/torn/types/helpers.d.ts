/**
 * Valid API field that could have a different type in some circumstances,
 * eg. `null` when the player is traveling.
 */
export declare type unconfirmed<T> = T;
/**
 * Valid API field that still needs explicit types.
 */
export declare type incomplete<T> = T;
/**
 *  Valid API object that's not yet documented.
 */
export declare type unimplemented = Record<string, any>;
/**
 * Utility type: generates an intersection type from a union type.
 */
export declare type Intersection<T> = (T extends T ? ((p: T) => void) : never) extends (p: infer U) => void ? U : never;
