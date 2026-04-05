import type { GlobalConfig } from 'payload'

export const Store: GlobalConfig = {
  slug: 'store',
  access: {
    read: () => true,
  },
  label: 'Store Information',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
    {
      name: 'socials',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'telegram',
          type: 'text',
        },
        {
          name: 'whatsapp',
          type: 'text',
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
