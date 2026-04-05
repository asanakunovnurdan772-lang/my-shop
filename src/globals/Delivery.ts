import type { GlobalConfig } from 'payload'

export const Delivery: GlobalConfig = {
  slug: 'delivery',
  access: {
    read: () => true,
  },
  label: 'Delivery Policy',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
