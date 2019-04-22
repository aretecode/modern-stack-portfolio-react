/**
 * could also make schema per component
 * but that wasn't needed here
 *
 * could also have a `withSchema` here that could consume the context
 *
 * @see https://developers.google.com/search/docs/data-types/speakable
 * @see https://hackernoon.com/everything-you-need-to-know-about-google-knowledge-graph-and-how-to-get-included-e14c07f95fe6
 * @see https://www.searchenginejournal.com/maximize-reach-using-googles-knowledge-graph/144579/
 */
import * as React from 'react'
/**
 * this makes vscode hang :/
 */
// import {
//   Organization as BaseOrganizationSchemaType,
//   Person as BasePersonSchemaType,
//   SoftwareSourceCode as BaseSoftwareSourceCodeSchemaType,
//   WebSite as BaseWebSiteSchemaType,
//   ItemList as BaseItemListSchemaType,
// } from 'schema-dts'
import { WorkType, AnyObj } from '../typings'
import { PortfolioContext, PortfolioContextType } from './PortfolioContext'
import { Script } from './Script'

export type SoftwareSourceCodeSchemaType = AnyObj
export type ItemListSchemaType = AnyObj
export type WebSiteSchemaType = AnyObj
export type OrganizationSchemaType = AnyObj
export type PersonSchemaType = { '@id': string } & AnyObj
export interface SchemaOptionsType {
  workIndex?: number
}

/**
 * @todo https://schema.org/contributor for open source
 */
export function fromContextToPersonSchema(context: PortfolioContextType) {
  const { basics } = context

  /**
   * @todo add this to data
   */
  const personId = 'https://orcid.org/0000-0002-6397-6217'

  const personSchema: PersonSchemaType = {
    '@type': 'Person',
    '@id': personId,
    name: basics.name,
    sameAs: basics.profiles.map(profile => profile.url),
    url: basics.website,
    email: basics.email,
    telephone: basics.telephone,
    description: basics.summary,
    image: basics.picture,
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

  const shortPersonSchema: PersonSchemaType = {
    '@type': 'Person',
    '@id': personId,
    name: basics.name,
  }

  return {
    personId,
    personSchema,
    shortPersonSchema,
  }
}

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
 * @see https://developers.google.com/search/docs/guides/mark-up-listings
 * @note when using detailed information it uses _Single, all-in-one-page list_. This requires them all to use the same url.
 */

function fromContextToSchema(
  context: PortfolioContextType,
  options: SchemaOptionsType
) {
  const { work } = context
  const { personSchema, shortPersonSchema } = fromContextToPersonSchema(context)
  const basePortfolioUrl = personSchema.url + '/Portfolio/Experience?index='

  /**
   * could scope this function outside, so it is not a closure
   * but this function is lightweight
   * and is used to at least reuse this small piece of functionality
   */
  function fromWorkItemToOrganization(
    workItem: WorkType,
    index: number
  ): OrganizationSchemaType {
    return {
      '@type': 'Organization',
      url: basePortfolioUrl + index,
      name: workItem.company,
      member: {
        '@type': 'OrganizationRole',
        member: shortPersonSchema,
        startDate: workItem.startDate,
        endDate: workItem.endDate,
        roleName: workItem.position,
      },
    }
  }

  const openSourceSchema: SoftwareSourceCodeSchemaType = {
    '@type': 'SoftwareSourceCode',
    description:
      'modern stack web resume in react, amp, pwa, jest, storybook, next, monorepo, styled-components, graphql, apollo',
    name: 'Modern Stack Web Portfolio',
    url: 'https://github.com/aretecode/modern-stack-web-portfolio',
    keywords: 'portfolio,opensource,react,typescript,graphql,apollo',
    datePublished: '2019-03-15',
    dateCreated: '2019-03-20',
    creator: shortPersonSchema,
    image: {
      '@type': 'ImageObject',
      url:
        'https://noccumpr-cdn.sirv.com/images/modern-stack-skeletons-web-lighthouse.png',
      height: 866,
      width: 3140,
    },
  }

  /**
   * @todo https://schema.org/WebPage
   * @todo https://schema.org/ProfilePage
   * @todo https://schema.org/AboutPage
   * @see https://schema.org/mentions
   * @todo https://schema.org/isPartOf
   */
  const siteSchema: WebSiteSchemaType = {
    '@type': 'WebSite',
    name: personSchema.url,
    url: personSchema.url,
    '@id': process.env.WEBSITE_ORIGIN,
    // @todo
    // potentialAction: {
    //   '@type': 'SearchAction',
    //   target: '{search_term_string}',
    //   'query-input': 'required name=search_term_string',
    // },
  }

  /**
   * @see https://www.endurantdevs.com/blog/values-provided-url-must-point-page-problem-googles-sdtt/
   * @see https://github.com/aretecode/modern-stack-web-portfolio/issues/64
   * @example https://search.google.com/structured-data/testing-tool/u/0/#url=https%3A%2F%2Fmodern-stack-portfolio-react-client-h8l37civ4.now.sh%2F
   *
   * @description when deploying, the structured data testing tool fails, unfortunately
   *              though the same data works if we enter the code in
   *              there are 2 types of lists:
   *              1. **combined**: _has all data on 1 page_
   *              2. **separate**: _list of links to other pages_
   *              #1 is preferred, but we'll need to implement #2
   */
  const carouselList: ItemListSchemaType = {
    '@type': 'ItemList',
    itemListElement: work.map((workItem, index) => {
      return {
        '@type': 'ListItem',
        // starts @1
        position: index + 1,
        url: basePortfolioUrl + index,
      }
    }),
  }

  const graphList = [personSchema, openSourceSchema, siteSchema]

  /**
   * if we have an index, add just 1
   * else, add all + carousel
   */
  if (options.workIndex === undefined) {
    const workList = work.map(fromWorkItemToOrganization)
    graphList.push(...workList)
    graphList.push(carouselList)
  } else {
    const workItem = fromWorkItemToOrganization(
      work[options.workIndex],
      options.workIndex
    )
    graphList.unshift(workItem)
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graphList,
  }
}

export function PortfolioSchema(props: SchemaOptionsType) {
  const context = React.useContext(PortfolioContext)
  const schemaData = fromContextToSchema(context, props)
  return <Script children={schemaData} />
}
