/**
 * === basics ===
 */
export type Primitive = string | number | boolean | symbol | null | undefined

export type SafePrimitive = string | number | boolean | symbol

export type BasicPrimitives = string | number | boolean

/**
 * === serialized ===
 */
export interface SerializedObj {
  [key: string]: BasicPrimitives | FrozenSerializedObj | FrozenSerializedArray
  [key: number]: BasicPrimitives | FrozenSerializedObj | FrozenSerializedArray
}

export type FrozenSerializedObj = Readonly<SerializedObj>

export interface FrozenSerializedArray extends Readonly<Serialized[]> {
  readonly(x: number): Serialized
}

export type Serialized =
  | SerializedObj
  | BasicPrimitives
  | FrozenSerializedObj
  | FrozenSerializedArray

export type Real = AnyArrayOrObj | SafePrimitive

/**
 * === any ===
 */

export interface AnyObj {
  [key: string]: any
  [key: number]: any
}

export type AnyArray = any[]

export type AnyArrayOrObj = (AnyObj & AnyArray) | AnyObj | AnyArray

export type AnyFunction = (...args: any[]) => any

/**
 * === unknown ===
 */
export interface UnknownObj {
  [key: string]: unknown
}

export type UnknownArray = unknown[]

/**
 * === helpers ===
 */

/**
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
 */
export type RecursiveRequired<Type> = {
  [Key in keyof Type]-?: RecursiveRequired<Type[Key]>
}

/**
 * === empty ===
 */

export type Empty =
  | { [key: string]: never }
  | EmptyArray
  | ''
  | EmptySet
  | EmptyMap
export interface EmptyMap<Key = string, Value = any> extends Map<Key, Value> {
  size: 0
}
export interface EmptySet<Value = any> extends Set<Value> {
  size: 0
}
export interface EmptyArray<Value = any> extends Array<Value> {
  length: 0
}
export type EmptyFunctionType = () => void

/**
 * === data ===
 */

export interface ImageObjectType {
  url: string
  width: number
  height: number
  title: string
  description?: string
  srcSizes: ReadonlyArray<
    [
      /** MediaSize */
      string,
      /** URL */
      string,
      /** Width */
      number,
      /** height */
      number
    ]
  >
}
export interface OpenSourceType {
  description: string
  name: string
  codeRepository: string
  url: string
  keywords: string[] | string
  datePublished: string
  dateCreated: string
  creator: BasicsType
  image: ImageObjectType
}
export interface ProfileType {
  network: string
  username: string
  url: string
}
export interface AddressType {
  address: string
  postalCode: string
  city: string
  countryCode: string
  region: string
}
/** @alias PersonType */
export interface BasicsType {
  orcid: string
  name: string
  label: string
  image: ImageObjectType
  email: string
  telephone: string
  website: string
  summary: string
  address: AddressType
  profiles: ProfileType[]
  resumeWebsite: string
  skills: string[]
}
export interface WorkType {
  company: string
  position: string
  website: string
  startDate: string
  endDate: string
  summary: string
  highlights: string[] | string
  image: ImageObjectType
}
export interface ResumeType {
  /** currently optional */
  id?: string
  person: BasicsType
  work: WorkType[]
  openSource: OpenSourceType
}

export interface WebsiteType {
  id?: string
  person: BasicsType & {
    profilesCollection: {
      items: ProfileType[]
    }
  }
  openSource: OpenSourceType
  workCollection: {
    items: WorkType[]
  }
  projectsCollection: {
    items: OpenSourceType
  }
  iconBaseUrl?: string
  iconSvgUrl?: string
}
export interface ResumeResponse {
  website: WebsiteType
}
