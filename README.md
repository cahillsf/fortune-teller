# Fortune Teller

Docker + Express + Angular + MySQL
---
This sandbox serves a fortune telling Angular web application based on Zoltar Speaks from the timeless Tom Hanks film [Big](https://www.youtube.com/watch?v=Q6RK4479XD8).  Thus we have ***ZoltBits Speaks*** who will tell all of your Datadog fortunes!  And by "fortunes" I mean small pieces of info related to either Logs, Agent, or Synthetics that I have scraped from our docs.


Once the application is spun up, you be able to see the related logs, traces, and RUM data being sent to your Datadog account.  You can also install the MySQL integration in your account, as the agent will autodiscover the MySQL database through the container labels.

## Sections
- Step 1: <ADD_RUM_APP_INSRUCTIONS>
- Step 2: Configure ENV file with your Datadog Agent API key, Datadog RUM App ID, and Datadog RUM Client Token
---

**Step 1.  SEE ABOVE**

**Step 2.  Configure ENV file with your Datadog Agent API key**

In your ```~``` directory, create a file called ```sandbox.docker.env``` that contains:
```
DD_API_KEY=<YOUR_API_KEY>
DD_APP_ID=<YOUR_APP_ID>
DD_CLIENT_TOKEN =<YOUR_CLIENT_TOKEN>

```
