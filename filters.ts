export const filtered = (id: string, checkeds: { id: number }[]) =>
  checkeds.filter((checked) => checked.id !== +id)
export const update = (id: string, checkeds: { id: number }[]) => [
  ...checkeds,
  { id: +id },
]
