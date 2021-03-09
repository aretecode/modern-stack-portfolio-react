/**
 * @todo add to schema for jsonresume
 *  - nationality
 *  - height
 *  - gender
 *  - birthPlace
 *  - birthDate
 *  - education
 *  - sameAs (for other links not in the ui)
 *
 * could also make schema per component
 * but that wasn't needed here
 *
 * could also have a `withSchema` here that could consume the context
 *
 * @see https://jsonld.com/social-network-profiles/
 * @see https://developers.google.com/search/docs/data-types/speakable
 * @see https://hackernoon.com/everything-you-need-to-know-about-google-knowledge-graph-and-how-to-get-included-e14c07f95fe6
 * @see https://www.searchenginejournal.com/maximize-reach-using-googles-knowledge-graph/144579/
 */
import * as React from 'react'
import * as Schema from 'schema-dts'
import { WorkType, BasicsType, ResumeType } from '../typings'
import Script from './Script'

export type PersonSchemaType = Exclude<Schema.Person, string> & {
  '@id': string
}
export interface SchemaOptionsType {
  workIndex?: number
}

/**
 * @todo https://schema.org/contributor for open source
 */
export function fromContextToPersonSchema(basics: BasicsType) {
  const personId = `https://orcid.org/${basics.orcid}`

  const personSchema: PersonSchemaType = {
    '@type': 'Person',
    '@id': personId,
    name: basics.name,
    sameAs: basics.profiles.map(profile => profile.url).concat([personId]),
    url: basics.website,
    email: basics.email,
    telephone: basics.telephone,
    description: basics.summary,
    image: basics.image.url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: basics.address.city,
      addressRegion: basics.address.region,
      postalCode: basics.address.postalCode,
      streetAddress: basics.address.address,
    },
    /** @see https://schema.org/knowsAbout */
    knowsAbout: basics.skills.map(skill => skill),
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
  } as {
    personId: string
    personSchema: PersonSchemaType
    shortPersonSchema: PersonSchemaType
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
  { work, person, openSource }: ResumeType,
  options: SchemaOptionsType
) {
  const { personSchema, shortPersonSchema } = fromContextToPersonSchema(person)
  const basePortfolioUrl = personSchema.url + '/Portfolio/Experience/'

  /**
   * could scope this function outside, so it is not a closure
   * but this function is lightweight
   * and is used to at least reuse this small piece of functionality
   */
  function fromWorkItemToOrganization(
    workItem: WorkType,
    index: number
  ): Schema.Organization {
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
      } as any,
    }
  }

  const { image: openSourceImage, ...openSourceProps } = openSource

  const openSourceSchema: Schema.SoftwareSourceCode = {
    '@type': 'SoftwareSourceCode',
    ...openSourceProps,
    creator: shortPersonSchema,
    image: {
      '@type': 'ImageObject',
      ...openSourceImage,
    } as any,
  }

  /**
   * @todo https://schema.org/WebPage
   * @todo https://schema.org/ProfilePage
   * @todo https://schema.org/AboutPage
   * @see https://schema.org/mentions
   * @todo https://schema.org/isPartOf
   * @todo https://serpact.com/schema-org-structured-data-basic-markup/ with WPFooter?
   */
  const siteSchema: Schema.WebSite = {
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
  const carouselList: Schema.ItemList = {
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
    graphList.push(...(workList as any[]))
    graphList.push(carouselList as any)
  } else {
    const workItem = fromWorkItemToOrganization(
      work[options.workIndex],
      options.workIndex
    )
    graphList.unshift(workItem as any)
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graphList,
  }
}

export function PortfolioSchema(props: SchemaOptionsType & ResumeType) {
  const { workIndex, ...context } = props
  const schemaData = fromContextToSchema(context, { workIndex })
  return <Script type={'application/ld+json'}>{schemaData}</Script>
}
