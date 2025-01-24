import axios from "axios"

const instance = axios.create({ baseURL: "http://localhost:3000" })

export async function getAllEvents() {
    const {data: {allEvents}} = await instance.get("/events")
    return allEvents
}

export async function getEventById(event_id) {
    const {data : {singleEvent}} = await instance.get(`/events/${event_id}`)
    return singleEvent
}
