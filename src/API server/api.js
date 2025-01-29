import axios from "axios"

const instance = axios.create({ baseURL: "http://localhost:3000" })

export async function getAllEvents(searchTitle) {
    if(searchTitle.search){
        const {data: {allEvents} } = await instance.get(`/events?search=${searchTitle.search}`)
        return allEvents
    } else {
        const {data: {allEvents}} = await instance.get("/events")
        return allEvents
    }
}

export async function getEventById(event_id) {
    const {data : {singleEvent}} = await instance.get(`/events/${event_id}`)
    return singleEvent
}

export async function registerUserEventSpace(user) {
    const {data: {addUser}} = await instance.post("/events/user/register", user)
    return addUser
}

export async function logInUserEventSpace(user) {
    const {data : {login}} = await instance.post("/events/user/login", user)
    return login
}

export async function employeeRegisterEventSpace(newEmployee) {
    const {data} = await instance.post("/events/employee/register", newEmployee)
    return data
}

export async function employeeLogInEventSpace(employeeDetails) {
    const {data} = await instance.post("/events/employee/login", employeeDetails)
    return data
}

export async function createEventInEventSpace(newEvent) {
    const {data : {addEvent}} = await instance.post("/events", newEvent)
    return addEvent
}

export async function signUpUserToEvent(event_id, userId) {
    const {data: {addUserToEvent}} = await instance.post(`/events/signup/${event_id}`, userId )
    return addUserToEvent
}

export async function fetchUserJoinedEvents(userId) {
    const { data: {userJoined}} = await instance.get(`/events/user/joined/${userId}`)
    return userJoined
}

export async function cancelEventByUser(userId, id) {
    const {data: {cancelUserEvent}} = await instance.patch(`/events/user/cancelevent/${userId}`, id)
    return cancelUserEvent
}

export async function hostedEventsByEmployee(employeeID) {
    const {data: {employeeHosted} } = await instance.get(`/events/employee/author/${employeeID}`)
    return employeeHosted
}

export async function deleteEventByEmployee(eventID) {
    const data = await instance.delete(`/events/employee/deleteevent/${eventID}`)
    return data
}