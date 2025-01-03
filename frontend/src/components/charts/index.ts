export type DailyStars = {
  date: Date,
  stars: number,
}

export type Series = {
  label: string,
  data: DailyStars[]
}

export const data: Series[] = [
  {
    label: 'React Charts',
    data: [
      {
        date: new Date(),
        stars: 202123,
      },
      {
        date: new Date(1099999999),
        stars: 19999999999,
      },
      // ...
    ],
  },
  {
    label: 'React Query',
    data: [
      {
        date: new Date(),
        stars: 10234230,
      }
      // ...
    ]
  }
]