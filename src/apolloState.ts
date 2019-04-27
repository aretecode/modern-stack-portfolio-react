/**
 * @fileOverview this file is for the client side graphql
 *               it can be used with the `@client` directive
 * @see https://www.apollographql.com/docs/react/essentials/local-state
 */
import { gql, InMemoryCache } from 'apollo-boost'
import { withClientState } from 'apollo-link-state'
import { logger } from './log'
import { Resolvers, ResumeType } from './typings'
import { addTypeName } from './utils/addTypeName'
import ResumeQuery from './graphql/Resume'
import { defaultApolloStatePortfolio } from './constants'

export const typeDefs = gql`
  type ProfileType {
    network: string
    username: string
    url: string
  }
  type BasicsInputType {
    name: string
    label: string
    picture: string
    email: string
    telephone: string
    website: string
    summary: string
    address: string
    postalCode: string
    city: string
    countryCode: string
    region: string
    profiles: [Profile]
    resumeWebsite: string
    skills: [string]
  }
  type WorkInputType {
    company: string
    position: string
    startDate: string
    endDate: string
    summary: string
    highlights: [string]
    website: string
    picture: string
  }
  type ResumeType {
    id: ID
    basics: Basics
    work: [Work]
  }

  type AddOrUpdateResumeResponse {
    responseMessage: string
  }

  type Query {
    resume(id: ID): [ResumeType]
  }
  type Mutation {
    setResume(
      basics: BasicsInputType
      work: [WorkInputType]
    ): AddOrUpdateResumeResponse!
  }
`

// tslint:disable typedef
// @lint: ^ this is because we have typings for resolvers
//          no need to define for each method
export const apolloState = {
  // @todo as WithTypeNameRecursive<ResumeType>
  defaults: {
    resume: defaultApolloStatePortfolio,
  },
  resolvers: {
    Query: {
      async resume(obj, args, context, info) {
        logger.info('[query] resume')

        const data = context.cache.read<{ resume: ResumeType }>({
          query: ResumeQuery,
          optimistic: true,
        })

        logger.debug({ data })

        return { ...data!.resume }
      },
    },
    Mutation: {
      /**
       * @todo generate typings from graphql schema & import
       * could flatten it out
       */
      async setResume(
        obj,
        args: { id?: string; basics: { profiles?: {} }; work: unknown[] },
        context,
        info
      ) {
        logger.info('[mutation] setResume')
        logger.info(args)

        const updated = {
          __typename: 'Resume',
          basics: {
            __typename: 'Basics',
            ...args.basics,
            profiles: addTypeName('Profile', args.basics.profiles),
          },
          work: addTypeName('Work', args.work),
        }
        logger.info('[mutation] updated')
        logger.info(updated)

        context.cache.writeData({
          data: {
            resume: { ...updated },
            ...updated,
          },
        })

        return {
          __typename: 'AddOrUpdateResumeResponse',
          responseMessage: 'Success if it does not throw?',
        }
      },
    },
  } as Resolvers,
}

export const withState = (args: { cache: InMemoryCache }) =>
  withClientState({
    cache: args.cache,
    // removed for production...
    typeDefs,
    ...apolloState,
  })
