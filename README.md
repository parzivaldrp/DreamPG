

🏠 A Next.js-based online accommodation booking system designed to streamline the room booking process for customers and administrators.

**Overview**
-----------

Dream PG is a comprehensive online booking system that aims to revolutionize the way accommodation facilities are managed and booked. The system provides a user-friendly interface for customers to search and book rooms, while empowering administrators with powerful management tools and insights.

**Key Features**
---------------

* **Streamlined booking process** with real-time availability updates
* **Personalized recommendations** based on user preferences and browsing history
* **Secure payment processing** with integration with popular payment gateways
* **Comprehensive admin dashboard** for managing rooms, bookings, and users
* **Advanced search and filtering options** for customers
* **Group bookings and event planning features**
* **Integration with external calendars and loyalty programs**

**Technical Details**
-------------------

* **Front-end:** Next.js
* **Back-end:** MongoDB
* **Operating System:** Windows
* **Programming Languages:** JavaScript, HTML, CSS

**Getting Started**
-----------------

### 1. Clone the repository:

```bash
git clone https://github.com/parzivaldrp/Dream-PG.git

### 2. Install dependencies:

```bash
npm install

### 3. Start the development server:

```bash
npm run dev
Open your browser and navigate to http://localhost:3000 to see the project in action.

**Project Structure**
---------------------

The project follows a modular architecture, with separate folders for components, pages, public assets, and tests. Here's a brief overview of the project structure:

### Folders

* **components**: 📦 Contains reusable UI components used throughout the project.
* **pages**: 📄 Contains the Next.js pages that make up the application.
* **public**: 📂 Contains static assets that are served directly by the web server.
* **test**: 🧪 Contains unit tests for the project.

**User and Admin Panels**
-------------------------

The project includes separate user and admin panels, each with its own set of pages and functionality.

### Location of User and Admin Folders

To find the user and admin folders, navigate to `src/app/pages`. Inside this folder, you'll find two subfolders:

* **user**: 👥 Contains the pages and components that make up the user panel.
* **admin**: 👮 Contains the pages and components that make up the admin panel.

**User Panel**
-------------

The user panel allows users to view and manage PGs. To access the user panel, users can log in with their credentials. Once logged in, users can:

* View a list of PGs
* Search for PGs
* View details about each PG
* Book a PG


**Admin Panel**
-------------

The admin panel allows administrators to manage PGs and user accounts. To access the admin panel, administrators can log in with their credentials. Once logged in, administrators can:

* Add new PGs
* Edit existing PGs
* Delete PGs
* Manage user accounts

**Multi-Form Submission**
---------------------

The project includes a multi-form submission feature that allows administrators to enter detailed information about each PG. The form includes fields for:

* PG name
* Location
* Facilities
* And more!

Once the form is submitted, the information is stored in a database and displayed on the PG details page.

**Contributing**
--------------

We welcome contributions to the project! To get started, take a look at our [contributing guidelines](CONTRIBUTING.md).

  

