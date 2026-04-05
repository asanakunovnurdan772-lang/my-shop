import type { GlobalConfig } from 'payload'

export const PrivacyPolicy: GlobalConfig = {
  slug: 'privacy-policy',
  access: {
    read: () => true,
  },
  label: 'Privacy Policy',
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
