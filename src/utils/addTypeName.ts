import { WithTypeNameRecursive } from '../typings'

export function addTypeName<DataType = any>(
  typeName: string,
  data: DataType
): WithTypeNameRecursive<DataType> {
  if (Array.isArray(data)) {
    const listWithTypeName = data.map(x => {
      return { ...x, __typename: typeName }
    })
    return listWithTypeName as any
  } else if (
    typeof data === 'string' ||
    typeof data === 'number' ||
    typeof data === 'function'
  ) {
    return data as any
  } else if (data === null || data === undefined) {
    return undefined as any
  } else if (typeof data === 'object') {
    return {
      __typename: typeName,
      ...data,
    } as any
  } else {
    // or could throw or leave this empty or warn in dev
    return undefined as any
  }
}
