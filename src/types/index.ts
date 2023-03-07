import {FieldValues} from "react-hook-form";

export interface CreateEventFieldValues extends FieldValues {
  title: string,
  date: string,
  time: string,
  venue: string
  capacity: number
  price?: number
  description: string
  banner: string
  tags: string[]
  isManualApprove?: boolean
  privacy: string
}
