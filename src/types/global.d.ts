export {};

declare global {
  type Nullable<T> = T | null;
  type Undefinedable<T> = T | undefined;
}
