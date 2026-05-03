-- Create the Database
CREATE DATABASE neelavathi;

-- Connect to neelavathi and create tables
-- Parent Table: Items (Managed by Dhanushree)
CREATE TABLE items (
    item_id INT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Parent Table: Orders (Managed by Harika)
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Child Table: Order Details (Your Core Infrastructure)
CREATE TABLE order_details (
    order_detail_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    item_id INT REFERENCES items(item_id),
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'Ordered'
);

-- Seed Data to prevent Foreign Key Violations
INSERT INTO items (item_id, item_name, price) VALUES 
(101, 'Headphones', 500.00), (102, 'Keyboard', 1200.00), (205, 'Gaming Laptop', 45000.00)
ON CONFLICT DO NOTHING;

INSERT INTO orders (order_id) VALUES (1), (2), (3) 
ON CONFLICT DO NOTHING;


 Shopping Mall Management System
**Module:** Order Details & Integration Infrastructure  


## 🚀 Project Overview
This module handles the core transactional data of the Shopping Mall Management System. It facilitates the creation, tracking, and management of line items within customer orders, ensuring real-time UI updates and strict database integrity.

## 🛠️ Tech Stack
- **Frontend:** React.js, Axios, Modern CSS-in-JS
- **Backend:** Spring Boot 3.x, Spring Data JPA, Hibernate
- **Database:** PostgreSQL 16
- **Tools:** Eclipse IDE, VS Code, Git

## 📂 Project Structure
```text
neela/
├── backend/           # Spring Boot Application
│   ├── src/main/java  # Java Source Code (Controller, Service, Entity)
│   └── pom.xml        # Maven Dependencies
└── frontend/          # React Application
    ├── src/           # React Components & Logic
    └── package.json   # NPM Dependencies


Since you are the Integration Lead for the GO_REPIREO project, a high-quality README is essential for your technical team and your 3rd-year reviews at DSATM. It serves as the "source of truth" for how the core infrastructure and UI function together.

Here is a comprehensive README.md and the full SQL setup.

1. Database Setup (schema.sql)
Before running the application, execute this code in your PostgreSQL terminal or pgAdmin to establish the data integrity rules.

SQL
-- Create the Database
CREATE DATABASE neelavathi;

-- Connect to neelavathi and create tables
-- Parent Table: Items (Managed by Dhanushree)
CREATE TABLE items (
    item_id INT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Parent Table: Orders (Managed by Harika)
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Child Table: Order Details (Your Core Infrastructure)
CREATE TABLE order_details (
    order_detail_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    item_id INT REFERENCES items(item_id),
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'Ordered'
);

-- Seed Data to prevent Foreign Key Violations
INSERT INTO items (item_id, item_name, price) VALUES 
(101, 'Headphones', 500.00), (102, 'Keyboard', 1200.00), (205, 'Gaming Laptop', 45000.00)
ON CONFLICT DO NOTHING;

INSERT INTO orders (order_id) VALUES (1), (2), (3) 
ON CONFLICT DO NOTHING;
2. Project README (README.md)
Copy this into a file named README.md in your root directory (C:\Users\chinm\OneDrive\Desktop\neela).

Markdown
# GO_REPIREO: Shopping Mall Management System
**Module:** Order Details & Integration Infrastructure  
**Lead:** Integration Lead, 3rd Year ISE, DSATM

## 🚀 Project Overview
This module handles the core transactional data of the Shopping Mall Management System. It facilitates the creation, tracking, and management of line items within customer orders, ensuring real-time UI updates and strict database integrity.

## 🛠️ Tech Stack
- **Frontend:** React.js, Axios, Modern CSS-in-JS
- **Backend:** Spring Boot 3.x, Spring Data JPA, Hibernate
- **Database:** PostgreSQL 16
- **Tools:** Eclipse IDE, VS Code, Git

## 📂 Project Structure
```text
neela/
├── backend/           # Spring Boot Application
│   ├── src/main/java  # Java Source Code (Controller, Service, Entity)
│   └── pom.xml        # Maven Dependencies
└── frontend/          # React Application
    ├── src/           # React Components & Logic
    └── package.json   # NPM Dependencies
⚙️ Running the Project
1. Database Configuration
Open PostgreSQL and run the schema.sql provided in this repository.

Update backend/src/main/resources/application.properties:

Properties
spring.datasource.url=jdbc:postgresql://localhost:5432/neelavathi
spring.datasource.username=your_username
spring.datasource.password=your_password
2. Backend Execution
Import the backend folder into Eclipse IDE.

Run OrderDetailApplication.java as a Spring Boot App.

The server will start at http://localhost:8080.

3. Frontend Execution
Open a terminal in the frontend folder.

Install dependencies:

Bash
npm install
Start the React app:

Bash
npm start
Access the UI at http://localhost:3000.

📌 Features implemented
Dynamic Subtotaling: Automatically calculates quantity * price via the Backend Service.

Foreign Key Safety: Prevents orphaned records via PostgreSQL constraints.

CRUD Operations: Full Add, Delete, and Update (Deliver) functionality.

Modern UI: Responsive dashboard with status badges and confirmation prompts.

🤝 Team Coordination
Integration Lead: Managing GitHub repository and core infrastructure.

Collaborators: Prithivi, Archana, Sathyajit (Module syncing).


---

### 3. Final Git Push
Now that you have the file created, finish the push to GitHub:

1.  **Save the README.md** in your `neela` folder.
2.  **Run these commands:**
    ```bash
    git add .
    git commit -m "docs: add comprehensive readme and sql schema"
    git push origin main
    ```

This ensures your project is professional, well-documented, and ready for your department's review at **DSATM**.
