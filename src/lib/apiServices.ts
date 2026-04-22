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

export const getCategory = async (categoryId: string) => {
  const res = await payload.findByID({
    collection: 'categories',
    id: categoryId,
  })

  return res
}

export const getBooksByCategory = async (categoryId: string, { page = 1, limit = 8 } = {}) => {
  const res = await payload.find({
    collection: 'products',
    where: {
      category: {
        equals: categoryId,
      },
    },
    page,
    limit,
  })

  return {
    books: res.docs,
    total: res.totalDocs,
  }
}

export const getAboutUsPage = async () => {
  const res = await payload.findGlobal({
    slug: 'about',
    depth: 2,
  })

  return res
}

export const getDeliveryPolicyPage = async () => {
  const res = await payload.findGlobal({
    slug: 'delivery-policy',
    depth: 2,
  })

  return res
}

export const getReturnPolicyPage = async () => {
  const res = await payload.findGlobal({
    slug: 'return',
    depth: 2,
  })

  return res
}

export const getPrivacyPolicyPage = async () => {
  const res = await payload.findGlobal({
    slug: 'privacy-policy',
    depth: 2,
  })

  return res
}
