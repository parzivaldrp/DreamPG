

# DreamPG — Accommodation Booking System

DreamPG is a full-stack accommodation booking web application built with **Next.js** and **MongoDB**.

It is designed for PG / rental-style accommodation listings, where users can browse available properties and admins can manage listings through a dedicated admin panel.

This project helped me practice building a real-world CRUD-based application with separate user and admin flows, database-backed content, form handling, and structured project architecture.

---

## 🚀 Live Demo

Coming soon

---

## 📌 Overview

DreamPG focuses on the core structure of an accommodation booking platform.

Users can browse PG / rental listings, view details, and submit booking-related information.

Admins can manage accommodation data by adding, editing, and deleting PG listings from the system.

The goal of this project was to understand how a real booking platform is structured from both sides:

- **User side:** browsing and booking
- **Admin side:** managing listings and data
- **Database side:** storing and retrieving accommodation information

---

## ✨ Key Features

### User Side

- View available PG / accommodation listings
- Browse property options
- View details about individual PG listings
- Submit booking-related information
- User-friendly layout for exploring accommodation options

### Admin Side

- Add new PG listings
- Edit existing listing details
- Delete PG listings
- Manage accommodation data through an admin panel
- Store listing information in MongoDB

---

## 🛠 Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js |
| Language | JavaScript |
| Styling | CSS |
| Database | MongoDB |
| Backend | Next.js server-side / API logic |
| Version Control | Git & GitHub |

---

## 🧱 Project Structure

```txt
src/
├── app/
│   └── pages/
│       ├── user/          # User-facing pages
│       └── admin/         # Admin panel pages
│
├── components/            # Reusable UI components
├── public/                # Static assets
└── ...
```

---

## ⚙️ How It Works

DreamPG follows a simple full-stack flow:

1. Admin adds PG / accommodation details through the admin panel
2. The data is stored in MongoDB
3. Users can browse the available PG listings
4. Users can view details of each listing
5. Booking-related information can be submitted through the user side
6. Admin can update or remove listings when needed

This structure helped me understand how frontend pages, backend logic, and a database work together in a full-stack application.

---

## 🧑‍💼 Admin Functionality

The admin panel is used to manage accommodation listings.

Admins can:

- Create new PG listings
- Update existing listings
- Delete listings
- Manage listing details such as name, location, facilities, and other property information

This helped me practice CRUD operations and admin-side application flow.

---

## 👤 User Functionality

The user side is focused on browsing and booking.

Users can:

- Explore available PG listings
- View details about a selected PG
- Submit booking-related details
- Navigate through a simple accommodation discovery flow

---

## 🧠 What I Learned

While building DreamPG, I practiced:

- Structuring a full-stack Next.js project
- Building separate user and admin flows
- Creating reusable UI components
- Performing CRUD operations with MongoDB
- Handling form submissions
- Managing database-backed content
- Thinking through real-world booking platform logic
- Organizing project folders and routes
- Improving UI layout and user experience

---

## 📦 Getting Started

Clone the repository:

```bash
git clone https://github.com/parzivaldrp/DreamPG.git
cd DreamPG
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app in your browser:

```txt
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root of the project.

```bash
MONGO_URI=your_mongodb_connection_string
```

Do not commit real database credentials to GitHub.

---

## 📸 Screenshots

Screenshots will be added after the next UI polish pass.

---

## 🔮 Future Improvements

Planned improvements for DreamPG:

- Add user authentication
- Add admin authentication
- Add booking status tracking
- Add image upload for PG listings
- Add better search and filtering
- Add form validation
- Improve error handling
- Improve responsive UI
- Add deployment link
- Add screenshots
- Add payment integration in the future
- Add booking confirmation emails

---

## 💡 Why This Project Matters

DreamPG shows how a basic accommodation booking platform can be structured using a modern full-stack JavaScript stack.

The project demonstrates important junior developer skills such as:

- Building pages and components
- Connecting an app to a database
- Creating admin-side CRUD functionality
- Handling user-facing flows
- Organizing a full-stack project
- Thinking beyond UI and considering real application behavior

---

## 👨‍💻 About Me

Built by [Darshan Panchal](https://github.com/parzivaldrp).

I’m a junior full-stack developer based in Melbourne, Australia, currently building practical projects with **Next.js**, **MongoDB**, **Supabase**, and **AWS**.

I’m looking for junior / entry-level frontend or full-stack developer roles where I can learn from experienced developers and contribute to real products.
