/**
 * could also make schema per component
 * but that wasn't needed here
 */
import * as React from 'react'
import { WorkType } from '../typings'
import { PortfolioContext, PortfolioContextType } from './PortfolioContext'
import { Script } from './Script'

/**
 * could do this with a sealed obj
 * could also
 *  - nest the json for smaller js
 *  - but more in the request due to additional req
 *  - and also bigger cache...
 *
 * @see https://schema.org/PostalAddress
 * @see https://schema.org/Person
 * @see http://blog.schema.org/2014/06/introducing-role.html
 * @see https://schema.org/Role
 * @see https://schema.org/OrganizationRole
 * @see https://schema.org/EmployeeRole
 *
 *
 *
 * @see https://developers.google.com/search/docs/guides/mark-up-listings
 * @note when using detailed information it uses _Single, all-in-one-page list_. This requires them all to use the same url.
 */
function fromContextToSchema(context: PortfolioContextType) {
  const { basics, work } = context

  // https://moz.com/community/q/where-to-link-to-html-sitemap
  /**
   * @todo https://schema.org/contributor for open source
   */
  const personSchema = {
    '@type': 'Person',
    /**
     * @todo add this to data
     */
    '@id': 'https://orcid.org/0000-0002-6397-6217',
    name: basics.name,
    sameAs: basics.profiles.map(profile => profile.url),
    url: basics.website,
    email: basics.email,
    telephone: basics.telephone,
    description: basics.summary,
    image: basics.picture,
    weight: '100kg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: basics.city,
      addressRegion: basics.region,
      postalCode: basics.postalCode,
      streetAddress: basics.address,
    },
    /**
     * @see https://schema.org/knowsAbout
     */
    knowsAbout: basics.skills.map(skill => {
      return skill
    }),
  }

  /**
   * could scope this function outside, so it is not a closure
   * but this function is lightweight
   * and is used to at least reuse this small piece of functionality
   */
  function fromWorkItemToOrganization(workItem: WorkType, index: number) {
    return {
      '@type': 'Organization',
      name: workItem.company,
      url: personSchema.url + '/Portfolio/' + '#' + index,
      member: {
        '@type': 'OrganizationRole',
        member: {
          '@type': 'Person',
          name: basics.name,
          description: basics.summary,
          image: basics.picture,
        },
        startDate: workItem.startDate,
        endDate: workItem.endDate,
        roleName: workItem.position,
      },
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema,

      /**
       * @todo put all open source stuff like this
       */
      {
        '@type': 'SoftwareSourceCode',
        description:
          'modern stack web resume in react, amp, pwa, jest, storybook, next, monorepo, styled-components, graphql, apollo',
        name: 'Modern Stack Web Portfolio',
        url: 'https://github.com/aretecode/modern-stack-web-portfolio',
        keywords: 'personal,opensource,react,typescript,graphql,apollo',
        datePublished: '2018-03-15',
        dateCreated: '2018-03-20',
        creator: personSchema,
        image: {
          '@type': 'ImageObject',
          url:
            'https://noccumpr-cdn.sirv.com/images/modern-stack-skeletons-web-lighthouse.png',
          height: 866,
          width: 3140,
        },
      },

      {
        '@type': 'WebSite',
        name: personSchema.url,
        url: personSchema.url,
        // @todo
        // potentialAction: {
        //   '@type': 'SearchAction',
        //   target: '{search_term_string}',
        //   'query-input': 'required name=search_term_string',
        // },
      },

      ...work.map(fromWorkItemToOrganization),

      {
        '@type': 'ItemList',
        itemListElement: work.map((workItem, index) => {
          return {
            '@type': 'ListItem',
            // starts @1
            position: index + 1,
            item: fromWorkItemToOrganization(workItem, index),
          }
        }),
      },
    ],
  }
}

export class PortfolioSchema extends React.PureComponent {
  static contextType = PortfolioContext
  readonly context: PortfolioContextType

  render() {
    const schemaData = fromContextToSchema(this.context)

    return <Script children={schemaData} />
  }
}
