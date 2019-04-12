import { gql } from 'apollo-boost'

export default gql`
  mutation SetResume($basics: BasicsInputType, $work: [WorkInputType]) {
    setResume(basics: $basics, work: $work) {
      __typename
      responseMessage
    }
  }
`
