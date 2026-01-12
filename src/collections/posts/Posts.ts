import type { AccessArgs, CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'posts',

  access:{
  create: ({ req: { user } }) => {
return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor'))},
  update: ({ req: { user } }) => {
return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor'))},
  delete: ({ req: { user } }) => {
return Boolean(user?.roles?.includes('admin'))},
read:()=> true
  },

  fields: [
    {
      name: 'author',
      type: 'relationship',
      relationTo:'authors',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
    },

    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
 
  ],
}

export default Authors
