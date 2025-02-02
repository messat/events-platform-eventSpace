import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";


const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const GoogleCalendar = ({ addEventToGoogleCalendar }) => {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const loadGapiScript = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.gapi.load("client", async () => {
          await window.gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
          });
          setGapiLoaded(true);
        });
      };
      document.body.appendChild(script);
    };

    const loadGisScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: (resp) => {
            if (resp.error) return;
            setIsAuthorized(true);
          },
        });
        setTokenClient(client);
        setGisLoaded(true);
      };
      document.body.appendChild(script);
    };

    loadGapiScript();
    loadGisScript();
  }, []);

  const handleAuthClick = () => {
    if (!tokenClient) return;
    tokenClient.requestAccessToken();
  };

  const handleSignoutClick = () => {
    const token = window.gapi.client.getToken();
    if (token) {
      window.google.accounts.oauth2.revoke(token.access_token, () => {
        window.gapi.client.setToken(null);
        setIsAuthorized(false);
      });
    }
  };

  const addEvent = async () => {
    try {
      const event = {
        summary: addEventToGoogleCalendar.title,
        location: addEventToGoogleCalendar.location,
        description: addEventToGoogleCalendar.description,
        start: {
          dateTime: addEventToGoogleCalendar.start,
          timeZone: "Europe/London",
        },
        end: {
          dateTime: addEventToGoogleCalendar.end,
          timeZone: "Europe/London",
        },
      };

      const request = window.gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
      await request.execute((event) => {
        if (event.htmlLink) {
          window.open(event.htmlLink, "_blank");
        } else {
          alert("Event created, but no link available.");
        }
      });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };



return (
  <div>
    <Typography variant="h4" gutterBottom>
      Google Calendar API Quickstart
    </Typography>
    <Stack direction="row" spacing={2}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAuthClick} 
        disabled={!gapiLoaded || !gisLoaded}
      >
        {isAuthorized ? "Refresh" : "Authorize"}
      </Button>
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={handleSignoutClick} 
        disabled={!isAuthorized}
      >
        Sign Out
      </Button>
      <Button 
        variant="contained" 
        color="success" 
        onClick={addEvent} 
        disabled={!isAuthorized}
      >
        Add Event
      </Button>
    </Stack>
  </div>
);
};

export default GoogleCalendar;
