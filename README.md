
# 🏠 Hostel Allocation System

The **Hostel Allocation System** is a comprehensive platform designed to streamline the process of allocating hostel accommodations for students. It allows students to register, apply for hostels, and view allocations, while administrators can manage rooms, assign beds, and track the allocation process.

---

## 📚 **Table of Contents**
- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
  - [Prerequisites](#1-prerequisites)
  - [Clone the Repository](#2-clone-the-repository)
  - [Install Dependencies](#3-install-dependencies)
  - [Set Up Environment Variables](#4-set-up-environment-variables)
  - [Set Up Database](#5-set-up-database)
  - [Run the Application](#6-run-the-application)
  - [Access the Application](#7-access-the-application)
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
Clone the repository to your local machine:

```bash
git clone https://github.com/Cyrus-11/hostel_allocation.git
cd hostel_allocation

---


```

---

### **3️⃣ Install Dependencies**
Run the following command to install all the necessary dependencies:

```bash
npm install
```

---

### **4️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add the following environment variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=hostel_allocation
JWT_SECRET=your_secret_key
PORT=3000
```

> **Note**: Replace `your_database_password` and `your_secret_key` with your actual database password and a strong secret key.

---

### **5️⃣ Set Up Database**
Log in to **phpMyAdmin** or MySQL CLI and create a database called **`hostel_allocation`**.

```sql
CREATE DATABASE hostel_allocation;
```

Run **Sequelize migrations** (if applicable):

```bash
npx sequelize db:migrate
```

---

### **6️⃣ Run the Application**
To run the application locally, use the following command:

```bash
npm start
```

Alternatively, you can use **nodemon** for development, which will automatically restart the server when changes are made:

```bash
npx nodemon server.js
```

---

### **7️⃣ Access the Application**
Once the server is running, you can access the application in your browser or through an API client like **Postman**.

**URL**:  
```
http://localhost:3000/
```

---

## 🚀 **Usage**

1. **Students** can register and log in to access their dashboard.  
2. **Admins** can manage students, rooms, and hostel assignments via the admin panel.  
3. **Developers** can access the API endpoints for registration, login, and allocation.  

---

## 📡 **API Endpoints**

| **HTTP Method** | **Endpoint**               | **Description**               |
|-----------------|--------------------------|---------------------------------|
| **POST**        | `/api/students/register`  | Register a new student         |
| **POST**        | `/api/students/login`     | Login a student                |
| **GET**         | `/api/hostels`            | Get list of available hostels  |
| **POST**        | `/api/hostels/apply`      | Apply for hostel allocation    |
| **GET**         | `/api/admin/students`     | Admin view of all students     |
| **POST**        | `/api/admin/allocate`     | Admin allocates a hostel       |

> For testing, you can use **Postman** or **Insomnia** to send HTTP requests.

---

## 📂 **Folder Structure**

```
📦 hostel_allocation_system
├── 📁 config
│   └── database.js           # MySQL database configuration
├── 📁 controllers
│   ├── adminController.js    # Controller for admin logic
│   └── studentController.js  # Controller for student logic
├── 📁 models
│   ├── student.js            # Sequelize model for students
│   └── hostel.js             # Sequelize model for hostels
├── 📁 routes
│   ├── adminRoutes.js        # Routes for admin operations
│   └── studentRoutes.js      # Routes for student operations
├── 📁 views
│   └── index.ejs             # Optional view for web app
├── 📁 utils
│   └── helpers.js            # Helper functions
├── .env                      # Environment variables
├── .gitignore                # Files to ignore in Git
├── package.json              # Dependencies
└── server.js                 # Entry point for the server
```

---

## 🤝 **Contributing**

We welcome contributions! If you'd like to help improve the **Hostel Allocation System**, follow these steps:  
1. Fork the repo.  
2. Create a new branch (`git checkout -b feature/your-feature-name`).  
3. Commit your changes (`git commit -m 'Add some feature'`).  
4. Push to the branch (`git push origin feature/your-feature-name`).  
5. Open a Pull Request.  

---

## 📜 **License**
This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for more details.

---

## 📞 **Contact**
If you have any questions, feedback, or suggestions, feel free to reach out:  

**GitHub**: [Cyrus-11](https://github.com/Cyrus-11)  
**Email**: cyrus11@example.com

---

🎉 Thank you for using the **Hostel Allocation System**! We hope it makes your hostel allocation process fast, smooth, and efficient. 🚀
```






