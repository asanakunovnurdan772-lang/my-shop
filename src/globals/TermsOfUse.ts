import type { GlobalConfig } from 'payload'

export const TermsOfUse: GlobalConfig = {
  slug: 'terms-of-use',
  access: {
    read: () => true,
  },
  label: 'Terms of Use',
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
