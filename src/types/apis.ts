export type CreateEventPayload = {
  title: string,
  startAt: string,
  venue: string
  capacity: number
  price?: number
  description: string
  banner: string
  tags: string[]
  isManualApprove?: boolean
  privacy: string
}
