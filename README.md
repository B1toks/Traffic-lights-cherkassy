# Traffic Lights Cherkasy

A real-time **traffic light status** application for the city of Cherkasy — users can vote on whether a specific traffic light is currently working, with admin moderation. Built as a **3-person team project** during my second internship at eKreative.

🚦 *(Live demo: not currently deployed)*

---

## What it does

- Interactive map of Cherkasy with all city traffic lights as markers
- Click a marker → modal showing traffic light info (street, status, vote count)
- "Working" / "Not working" voting — community-driven status updates
- **Admin moderation** — admins can confirm/override user votes
- JWT-protected admin routes with bcrypt-hashed credentials

## Tech

**Front-end:**
- **React 19** + Create React App
- **Leaflet** + **react-leaflet** — interactive OpenStreetMap rendering
- **Redux Toolkit** + react-redux — state for markers, modals, auth
- **react-modal** — voting modal

**Back-end (`/server`):**
- **Express** REST API
- **MongoDB** + **Mongoose** — traffic light data + users + votes
- **JWT** + **bcrypt** — auth
- **dotenv** + **CORS** + **body-parser**
- **nodemon** for development

## Run locally

```bash
# Front-end
npm install
npm start            # http://localhost:3000

# Back-end (in separate terminal, /server folder)
cd server
npm install
npm run serve        # http://localhost:5000
```

The CRA `proxy` is set to `http://localhost:5000` so API calls just work.

## My role on the team

This was a **3-person team project** at eKreative. I owned the **OpenStreetMap API integration** (Leaflet markers, custom popups, map state syncing with Redux) and the **front-end** as a whole — voting UI, admin moderation interface, status update flows. Backend (Express + MongoDB + auth) was built alongside teammates.

---

Built by **Oleksandr Honchar** with the eKreative team · [honchar.dev](https://www.honchar.dev) · [LinkedIn](https://www.linkedin.com/in/honchar-oleksandr/)
