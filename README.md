### Event Space Front-End 🌍

Welcome to the **Event Space** front-end platform. This is a web application where users can browse, book, and manage event tickets. Employees can host and manage events. The front-end is built using React JS and integrates with the Event Space back-end server.

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Live Production View](#live-production-view)
3. [Prerequisites](#prerequisites)
4. [Setting Up Locally](#setting-up-locally)
5. [Test Account Credentials](#test-account-credentials)
6. [Features](#features)
7. [User Authentication & Account Management](#user-authentication--account-management)
8. [Employee Authentication & Event Management](#employee-authentication--event-management)
9. [Events](#events)

## Tech Stack
- **React.js** 
- **Material UI** 
- **Axios** (for API requests)
- **Google Calendar API** (for users to add events to their Google Calendar)
- **Netlify** (hosting platform)

## Live Production View
The front-end of the application is hosted on **Netlify**:
https://event-space-connect.netlify.app/

The back-end is hosted on **Vercel**:
https://events-space-be-messat.vercel.app/



## Prerequisites
Before running the project locally, ensure the following is installed:
- **Node.js** (v21.6.7, run node -v in your CLI to check the version)

## Setting Up Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/messat/events-platform-eventSpace.git
   cd events-platform-eventSpace
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory** and add the following environment variables:
   ```env
   CLIENT_ID=your_google_client_id
   API_KEY=your_google_api_key
   ```
   - Replace `your_google_client_id` and `your_google_api_key` with the actual values from your **Google Developer Console**.
   - Ensure your **OAuth consent screen** and **Authorized Redirect URIs** match your **http://localhost:5173** URL.
   
   Please click on the link and follow the instructions to generate the API_KEY and CLIENT_ID: 
   https://developers.google.com/calendar/api/quickstart/js


4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app should be running on: **http://localhost:5173**


## Test Account Credentials
To test the application, use the following credentials:

### Please note employee login/register details are accessed via separate page.

### **User Account**
- **Username**: testuser
- **Password**: 1234

### **Employee Account**
- **EmployeeID**: 12341234
- **Password**: testEmployee

[`Employee Login Page`](https://event-space-connect.netlify.app/events/vpn/employee/login)

[`Employee Register Page`](https://event-space-connect.netlify.app/events/vpn/employee/eventspace/register)


## Features
- **User**: View events, book tickets, cancel reservations.
- **Employee**: Host events, manage attendees, delete events.
- **Google Calendar Integration**: Add booked events to Google Calendar by **user** only.
- **Authentication**: Used local storage to manage user authentication.
- **Fully Responsive**: Works on mobile and desktop devices.
- **Accessibility**: Priority to ensure it is accessible for screen readers and keyboard navigation. 

### User Authentication & Account Management
| Endpoint | Description |
|----------|-------------|
[`/events/user/register`](https://event-space-connect.netlify.app/events/user/register) | Register a new user |
[`/events/user/login`](https://event-space-connect.netlify.app/events/user/login) | User login |
[`/events/user/account-management`](https://event-space-connect.netlify.app/events/user/account-management) | User Account Management |


### Employee Authentication & Event Management
| Endpoint | Description |
|----------|-------------|
[`/events/vpn/employee/eventspace/register`](https://event-space-connect.netlify.app/events/vpn/employee/eventspace/register) | Register a new employee |
[`/events/vpn/employee/login`](https://event-space-connect.netlify.app/events/vpn/employee/login) | Employee login |
[`/events/vpn/employee/hostEvent`](https://event-space-connect.netlify.app/events/vpn/employee/hostEvent) | Host Event Form |
[`/events/vpn/employee/account-management`](https://event-space-connect.netlify.app/events/vpn/employee/account-management) | Employee Account Management |


### Events
| Endpoint | Description |
|----------|-------------|
[`/`](https://event-space-connect.netlify.app/) | Get all events |
[`/events/:event_id`](https://event-space-connect.netlify.app/event/67a20971057403592b1f2c43) | Get details of a specific event |
[`*`](https://event-space-connect.netlify.app/not-exist) | Error page |

