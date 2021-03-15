/** @file download data on the server so that it does not need to be fetched on the browser. runs at compile time and run time. */
import type { GetStaticProps } from 'next'
import type { ResumeResponse, ResumeEverythingType } from '../typings'
import ResumeQuery from './Resume'
import { initApolloClient } from './apolloClient'
import { logger } from '../log'

function withoutTypeNameRecursive<Type extends {} | unknown[] | unknown>(
  obj: Type extends {} ? Type & { __typename?: string } : Type
): Type {
  if (Array.isArray(obj)) {
    return obj.map(withoutTypeNameRecursive) as any
  } else if (typeof obj === 'object' && obj !== null) {
    const { __typename, ...rest } = obj as any
    Object.keys(rest).forEach(key => {
      rest[key] = withoutTypeNameRecursive(rest[key])
    })
    return rest as any
  } else {
    return obj
  }
}

export const getStaticProps: GetStaticProps<ResumeEverythingType> = async context => {
  const apolloClient = initApolloClient()
  const gqlResponse = await apolloClient.query<ResumeResponse>({
    query: ResumeQuery,
    errorPolicy: 'all',
  })

  if (!gqlResponse.data && gqlResponse.errors) {
    logger.error(gqlResponse.errors)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } else if (process.env.NODE_ENV !== 'production') {
    logger.debug('graphql_get_static_props')
    // logger.debug(gqlResponse.data)
  }

  const { website } = gqlResponse.data

  return {
    props: withoutTypeNameRecursive({
      iconBaseUrl: website.iconBaseUrl,
      iconSvgUrl: website.iconSvgUrl,
      openSource: website.projectsCollection.items[0],
      highlightsPicture: website.highlightsPicture,
      person: {
        ...website.person,
        profiles: website.person.profilesCollection.items,
      },
      work: website.workCollection.items.map(item => ({
        ...item,
        summary: (item as any).summary.json.content[0].content[0].value,
        highlights: (item as any).highlights.json.content[0].content[0].value,
      })),
    } as ResumeEverythingType),
  }
}
