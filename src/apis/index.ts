import axios from "axios";
import {CreateEventPayload} from "types/apis";

const BASE_API = '/apis/'

export const createEvent = (payload: CreateEventPayload) => {
  return axios.post(`${BASE_API}/interview/social`, payload)
}
