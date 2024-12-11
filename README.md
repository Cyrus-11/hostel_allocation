# 🏠 Hostel Allocation System

The **Hostel Allocation System** is a comprehensive platform designed to streamline the process of allocating hostel accommodations for students. It allows students to register, apply for hostels, and view allocations, while administrators can manage rooms, assign beds, and track the allocation process.

---

## 📚 **Table of Contents**
- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Folder Structure](#-folder-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🚀 **About The Project**
The **Hostel Allocation System** aims to solve the challenges associated with manual hostel allocation processes. This system automates the allocation process, making it easier for administrators to manage available hostels and for students to select their preferred hostel accommodation.

With features for student registration, login, and hostel allocation, the system simplifies the previously cumbersome process, improving speed, accuracy, and efficiency.

---

## ✨ **Features**
- 📝 **Student Registration & Login**: Students can register, log in, and access their personal dashboard.
- 📋 **Hostel Allocation**: Automatically assigns hostels based on availability and student preferences.
- 📦 **Admin Panel**: Admins can manage student applications, hostel capacity, and room availability.
- 🔐 **Secure Authentication**: Passwords are hashed for security.
- 📡 **API-Driven**: Provides endpoints for student registration, login, and hostel allocation.
- 📊 **Room Availability Tracking**: View available hostels and track occupancy.

---

## 🛠️ **Tech Stack**
| **Technology**   | **Description**          |
|-----------------|-------------------------|
| **Node.js**      | Backend runtime         |
| **Express.js**   | Web framework for Node  |
| **MySQL**        | Relational database     |
| **Sequelize**    | ORM for MySQL           |
| **Postman**      | API testing tool        |
| **Git & GitHub** | Version control         |
| **VS Code**      | Code editor             |

---

## ⚙️ **Installation**

### **1️⃣ Prerequisites**
Make sure you have the following installed:
- **Node.js** (v18 or higher)  
- **MySQL** (XAMPP, WAMP, or standalone MySQL)  
- **Git**  

---

### **2️⃣ Clone the Repository**
```bash
git clone https://github.com/Cyrus-11/hostel_allocation.git
cd hostel_allocation


### **3️⃣ Install Dependencies**
Run the following command to install all the necessary dependencies:

npm install


### **4️⃣ Set Up Environment Variables**
Create a .env file in the root directory and add the following:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
PORT=3000
Note: Replace your_database_password and your_secret_key with your actual database password and a strong secret key.


### **5️⃣ Set Up Database**
Log in to phpMyAdmin or MySQL CLI and create a database called hostel_allocation.

CREATE DATABASE hostel_allocation;
Run Sequelize migrations (if applicable):

npx sequelize db:migrate


### **6️⃣ Run the Application**
Run the application locally.

npm start
or use nodemon for development (auto-restarts on changes):

npx nodemon server.js


### **7️⃣ Access the Application**
Visit the URL in your browser or API client (like Postman):
http://localhost:3000/



