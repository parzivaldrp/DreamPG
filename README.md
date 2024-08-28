🏠 A Next.js-based online accommodation booking system designed to streamline the room booking process for customers and administrators.

**Overview**
-----------

Dream PG is a comprehensive online booking system that aims to revolutionize the way accommodation facilities are managed and booked. The system provides a user-friendly interface for customers to search and book rooms, while empowering administrators with powerful management tools and insights.

**Key Features**
---------------

* Multi-form submission system for detailed PG information, utilizing state management to pass data from one form to another

* Separate user and admin panels with distinct functionality

* User panel for PG management with features for viewing, searching, and booking PGs

* Admin panel for PG and user management with features for adding, editing, and deleting PGs, as well as managing user accounts

* Real-time updates for PG availability and booking status

**Technical Details**
-------------------

* **Front-end:** Next.js
* **Back-end:** MongoDB
* **Operating System:** Windows

**Getting Started**
-----------------

### 1. Clone the repository:


git clone https://github.com/parzivaldrp/Dream-PG.git

### 2. Install dependencies:

npm install

### 3. Start the development server:

npm run dev

### Open your browser and navigate to http://localhost:3000 to see the project in action.

**Project Structure**
---------------------

The project follows a modular architecture, with separate folders for components, pages, public assets, and tests. Here's a brife overview of the project structure:

### Folders

    public: 📂 Contains static assets that are served directly by the web server.
    
      src: 📂 Contains the application code, including components, pages, and APIs.
    
        app: 📂 Contains the application logic, including components, pages, and APIs.
    
          api: 📂 Contains the API routes for the application.
    
            admin-api: 📂 Contains the admin API routes.
    
        component: 📦 Contains reusable UI components used throughout the project.
    
        models: 📂 Contains the data models used in the application.
    
        pages: 👥 Contains the Next.js pages that make up the application, including the user panel layout.
    
          admin: 👮 Contains the pages and components that make up the admin panel, including a admin panel layout.
    
            multi: 📂 Contains the multi-form submission feature.
    
              Allforms: 📂 Imports and displays all forms.
    
     config: ⚙️ Contains configuration files for the application, and connects to the database using Mongoose.
    
     styles: 💄 Contains CSS styles for the application.
    
     .env.local: 📜 Environment variables for the application.


**User and Admin Panels**
-------------------------

The project includes separate user and admin panels, each with its own set of pages and functionality.


**User Panel 👥**
-------------

The user panel allows users to view and manage PGs. To access the user panel, users can log in with their credentials. Once logged in, users can:

* View a list of PGs
* Search for PGs
* View details about each PG
* Book a PG


**Admin Panel 👮**
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


**User and Admin Management**
---------------------

The project uses a single schema/model for both users and administrators, with an additional isAdmin field that determines whether a user is an administrator or not. This allows for easy management of user and admin roles.
 
* [**Live Demo**](https://dream-pg-eight.vercel.app/)👉
