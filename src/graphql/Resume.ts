import { gql } from '@apollo/client'

/**
 * @todo
 * - make id part of the env
 * - rename the property for orcid
 */
export default gql`
  query {
    website(id: "6Hj7WP8kLonf5VHyQPoES3") {
      person {
        ...personBasics
        address {
          ...addressFragment
        }
        profilesCollection {
          items {
            ...networkFragment
          }
        }
      }
      workCollection {
        items {
          ...workItem
        }
      }
      projectsCollection {
        items {
          description
          name
          codeRepository
          url
          keywords
          datePublished
          dateCreated
          creator {
            ...personBasics
          }
          image {
            ...imageFragment
          }
        }
      }
      iconBaseUrl
      iconSvgUrl
    }
  }
  fragment networkFragment on Profiles {
    network
    username
    url
  }
  fragment imageFragment on ImageObject {
    url
    width
    height
    title
    description: caption
    srcSizes
  }
  fragment workItem on WorkExperience {
    id
    company
    position
    startDate
    endDate
    website
    image {
      ...imageFragment
    }
    summary {
      json
    }
    highlights {
      json
    }
  }
  fragment personBasics on Basics {
    name
    label
    email
    telephone
    website
    summary
    resumeWebsite
    skills
    orcid: ocid
    image {
      ...imageFragment
    }
  }
  fragment addressFragment on Address {
    address
    postalCode
    city
    countryCode
    region
  }
`
