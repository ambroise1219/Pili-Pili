import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Catégorie',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom de la catégorie',
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
      title: 'Image de la boutique',
   }
  ],
})