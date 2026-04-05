import type { GlobalConfig } from 'payload'

export const FeaturedProductList: GlobalConfig = {
  slug: 'featured-product-list',
  fields: [
    {
      name: 'products',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
        },
      ],
    },
  ],
}
