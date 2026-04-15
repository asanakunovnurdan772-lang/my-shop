import { cache } from 'react'

import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export const getStoreInfo = cache(async () => {
  const res = await payload.findGlobal({
    slug: 'store',
    depth: 1,
  })

  return {
    ...res,
    logoUrl:
      typeof res.logo === 'object' && res.logo !== null ? (res.logo.url ?? undefined) : undefined,
  }
})
export const getHomeProducts = async () => {
  const res = await payload.find({
    collection: 'products',
    limit: 4,
    depth: 1,
    where: {
      isPublished: {
        equals: true,
      },
    },
  })

  const products = res.docs
  return products
}

export const getCategories = async () => {
  const res = await payload.find({
    collection: 'categories',
    depth: 1,
  })

  const categories = res.docs
  return categories
}
