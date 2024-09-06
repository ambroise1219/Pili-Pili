import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Menu',
  type: 'document',
  fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Nom du plat',
        validation: rule=> rule.required(),
    },
    {
        name: 'description',
        type: 'string',
        title: 'Description',
        validation: rule=> rule.max(200),
    },
    {
      name: 'image', 
      type: 'image',
      title: 'Image '
    },
    {
      name: 'price',
      title: 'Prix',
      type: 'number'
    }
  ]
})