/**
 * can split PortfolioContext & PortfolioProvider
 */
import * as React from 'react'
import { Query } from 'react-apollo'
import { isObj } from '../utils/is'
import ResumeQuery from '../graphql/Resume'
import { defaultApolloStatePortfolio } from '../constants'
import { ResumeResponse, GraphqlProps, BasicsType, WorkType } from '../typings'

export interface PortfolioContextType {
  isLoading?: boolean
  basics: BasicsType
  work: WorkType[]
}

export const PortfolioContext = React.createContext<PortfolioContextType>(
  defaultApolloStatePortfolio as any
)

/**
 * @see /packages/graphql/src/graphql-modules/resume/utils.ts
 */
export function isValidResumeValue(
  response: GraphqlProps<ResumeResponse>
): response is GraphqlProps<Required<ResumeResponse>> {
  return (
    Array.isArray(response.data?.resume?.work) &&
    isObj(response.data!.resume.basics) === true &&
    Object.keys(response.data!.resume.basics).length > 0
  )
}
/**
 * @todo @@perf can simplify & improve
 */
function fromResponseToSafeValue(response: GraphqlProps<ResumeResponse>) {
  const portfolio = isValidResumeValue(response)
    ? response.data!.resume
    : defaultApolloStatePortfolio

  const { refetch, loading } = response
  const value = { isLoading: !!loading, refetch, ...portfolio }
  return value
}

export class PortfolioProvider extends React.PureComponent {
  renderContext = (response: GraphqlProps<ResumeResponse>) => {
    const value = fromResponseToSafeValue(response)
    return (
      <PortfolioContext.Provider value={value as any}>
        {this.props.children}
      </PortfolioContext.Provider>
    )
  }

  render() {
    return (
      <Query<ResumeResponse>
        query={ResumeQuery}
        fetchPolicy="cache-and-network"
      >
        {this.renderContext}
      </Query>
    )
  }
}
