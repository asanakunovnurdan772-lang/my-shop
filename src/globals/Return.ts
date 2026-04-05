import type { GlobalConfig } from 'payload'

export const Return: GlobalConfig = {
  slug: 'return',
  access: {
    read: () => true,
  },
  label: 'Return Policy',
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
