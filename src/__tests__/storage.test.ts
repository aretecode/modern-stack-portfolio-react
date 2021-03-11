import { portfolioKeyValStore } from '../storage'
import { defaultApolloStatePortfolio } from '../../__tests__/constants'

describe('storage', () => {
  it('should work in node using a map', async() => {
    const initialValue = await portfolioKeyValStore.get('portfolio')
    expect(initialValue).toEqual(undefined)

    await portfolioKeyValStore.set(
      'portfolio',
      defaultApolloStatePortfolio as any
    )

    const valueGottenAfterSetting = await portfolioKeyValStore.get('portfolio')
    expect(valueGottenAfterSetting).toEqual(defaultApolloStatePortfolio)

    const keys = Array.from(await portfolioKeyValStore.keys())
    expect(Array.isArray(keys)).toEqual(true)
    expect(keys.length).toEqual(1)

    await portfolioKeyValStore.delete('portfolio')
    const valueGottenAfterDeleting = await portfolioKeyValStore.get('portfolio')
    expect(valueGottenAfterDeleting).toEqual(undefined)

    await portfolioKeyValStore.set(
      'portfolio',
      defaultApolloStatePortfolio as any
    )
    await portfolioKeyValStore.clear()
    const valueGottenAfterClearing = await portfolioKeyValStore.get('portfolio')
    expect(valueGottenAfterClearing).toEqual(undefined)
  })
})
