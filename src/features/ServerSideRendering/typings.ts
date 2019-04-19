export interface DataLoadingContextType {
  set(key: string, arg: Promise<any>): void
  has(key: string): boolean
  get<TypeArg = any>(key: string): TypeArg | Promise<TypeArg>
}
