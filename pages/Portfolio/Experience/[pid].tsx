/** @todo use gql to query just work by id */
import { gql } from '@apollo/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import { initApolloClient } from '../../../src/apolloClient'
import { getStaticProps as getStaticPropsCommon } from '../../../src/apolloGetStaticProps'

export const config = { amp: 'hybrid' }

const GET_EXPERIENCE_IDS = gql`
  query {
    website(id: "6Hj7WP8kLonf5VHyQPoES3") {
      workCollection {
        items {
          id
        }
      }
    }
  }
`

export const getStaticPaths: GetStaticPaths<any> = async () => {
  const apolloClient = initApolloClient()
  const gqlResponse = await apolloClient.query<{
    website: {
      workCollection: {
        items: {
          id: string
        }[]
      }
    }
  }>({
    query: GET_EXPERIENCE_IDS,
    errorPolicy: 'all',
  })

  return {
    paths: gqlResponse.data.website.workCollection.items.map(({ id }) => ({
      params: { pid: id },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const response = await getStaticPropsCommon(context)

  return response
}

export { default } from '../../../src/pages/Portfolio/ExperiencePage'
