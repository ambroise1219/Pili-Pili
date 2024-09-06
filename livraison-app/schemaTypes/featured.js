import { defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Restaurants en vogue',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom du groupe ',
      validation: rule=> rule.required(),
   },
   {
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: rule=> rule.max(200),
   },
   {
      name: 'restaurants',
      type: 'array',
      title: 'Restaurant',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}]
   }
  ],
})