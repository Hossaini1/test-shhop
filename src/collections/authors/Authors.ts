import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',

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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export default Authors
