# Doctor Online Appointment Booking System

A simple web-based application for booking doctor appointments online. The system is built using **HTML**, **Tailwind CSS**, and **JavaScript**. It provides features like doctor scheduling, appointment booking, profile management, reviews, reporting, and data backup/recovery.

The application initializes with predefined startup data (users, doctors, patients) from `Data.html`. This must be run separately once to populate the browser's **localStorage** before using the app.

---

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing.

### Prerequisites

* A modern web browser (Chrome, Edge, Firefox, etc.)
* A code editor like **VS Code** (optional, for development)
* No server installation required (pure frontend project).

### Installing & Setup

1. Clone or download the project.

   ```bash
   git clone https://github.com/Rahul-thiagarajan/Doctor-Online-Appoinment-Booking-System
   cd Doctor-Online-Appoinment-Booking-System
   ```

2. **If you have VS Code (recommended):**

   * Open the project in VS Code.
   * Install the **Live Server** extension.
   * Right-click `Data.html` to load startup data into localStorage (First time or login fails).
   * Right-click `index.html` → **Open with Live Server**.

3. **If you don’t have VS Code:**

   * Simply open the files directly in your browser.
   * First, double-click `Data.html` to load startup data into localStorage (FIrst time or login fails).
   * Then, double-click `index.html` to launch the app.

Example: After running `Data.html`, open Developer Tools → Application → Local Storage to see the loaded users, doctors, and patients.

---

## Running the Tests

### End-to-End Tests

These tests check the complete workflow of booking an appointment.
Example:

* User logs in → Selects doctor → Books an appointment → Confirmation is stored in localStorage.

### Coding Style Tests

The project follows:

* Consistent **Tailwind CSS** utility classes for styling
* Modular **JavaScript** functions for each feature
* LocalStorage-based mock database

---


## Built With

* **HTML5** – Page structure
* **Tailwind CSS** – Styling framework
* **JavaScript (ES6)** – Application logic
* **LocalStorage** – Data persistence

---

## Authors

* **Rahul Thiagarajan** – Initial Work & Development

---

## Acknowledgments

* Tailwind CSS for making styling fast and responsive
* Inspiration from real-world hospital appointment systems
* All contributors and testers who supported this project

---

## Login Credentials

After loading `Data.html`, you can log in with the following sample accounts:

### Admin

* **Email:** `admin1@gencare.com`
* **Password:** `Admin@123`

### Doctors

* **Email:** `doctor1@gencare.com` | **Password:** `Doc@123`
* **Email:** `doctor2@gencare.com` | **Password:** `Doc@123`

### Patients

* **Email:** `patient1@gencare.com` | **Password:** `Pat@123`
* **Email:** `patient2@gencare.com` | **Password:** `Pat@123`
* **Email:** `patient3@gencare.com` | **Password:** `Pat@123`

---
