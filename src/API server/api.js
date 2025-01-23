import axios from "axios"

const instance = axios.create({ baseURL: "http://localhost:3000" })

export async function getAllEvents() {
    const {data: {allEvents}} = await instance.get("/events")
    return allEvents
}

