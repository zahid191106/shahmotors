import { defineType } from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'stars',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1).max(5),
      initialValue: 5,
    },
    {
      name: 'active',
      title: 'Approved',
      type: 'boolean',
      description: 'Mark this review as approved before showing it publicly.',
      initialValue: false,
    },
    {
      name: 'createdAt',
      title: 'Submitted At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'active',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle,
        media,
        description: subtitle,
      }
    },
  },
})
