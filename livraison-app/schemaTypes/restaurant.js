// import {defineField, defineType} from 'sanity'

export default {
    name: 'restaurant',
    title: 'Boutique',
    type: 'document',
    fields: [
     {
        name: 'name',
        type: 'string',
        title: 'Nom',
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
     },
     {
        name: 'lat',
        type: 'number',
        title: 'Latitude de la boutique',
     },
     {
        name: 'lng',
        type: 'number',
        title: 'Longitude de la boutique',
     },
     {
        name: 'address',
        type: 'string',
        title: 'Adresse de la boutique',
        validation: rule=> rule.required(),
      },
      {
        name: 'rating',
        type: 'number',
        title: 'Entrer un nombre entre 1 et 5',
        validation: rule=>rule.required().min(1).max(5).error('Veuillez entrer un nombre entre 1 et 5')
      },
      {
        name: 'reviews',
        type: 'string',
        title: 'Avis'
      },
      {
        name: 'type',
        title: 'Catégorie',
        validation: rule=> rule.required(),
        type: 'reference',
        to: [{type: 'category'}]
      },
      {
        name: 'dishes',
        type: 'array',
        title: 'Menu',
        of: [{type: 'reference', to: [{type: 'dish'}]}]
      }
    ]
  }