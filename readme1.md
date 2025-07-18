# AYUSH Startup Registration Portal

## Project Overview

The **AYUSH Startup Registration Portal** is a digital platform designed to support and facilitate the growth of startups in the AYUSH (Ayurveda, Yoga, Naturopathy, Unani, Siddha, and Homeopathy) sector. The portal provides a streamlined process for startup registration, access to funding opportunities, mentorship, networking, and more. With the goal of promoting innovation in traditional medicine and wellness, this platform empowers startups to contribute to the growth of the AYUSH ecosystem and enhance the healthcare landscape in India.

## Key Features

- **User-Friendly Interface**: A simple and intuitive design for ease of use by entrepreneurs, government officials, and stakeholders across various technical backgrounds.
- **Startup Registration**: A seamless online registration process to help AYUSH-based startups gain access to government support and recognition.
- **Funding Schemes**: Direct access to financial grants, fellowships, and government schemes aimed at supporting innovation in the AYUSH sector.
- **Mentorship & Networking**: A platform for startups to connect with industry experts, investors, and potential investors to enhance their growth and scalability.
- **Interactive Dashboard**: Personalized dashboards to track registration status, monitor available funding, and keep track of upcoming deadlines.
- **Incubation Center Locator**: A tool to help startups find and connect with AYUSH-specific incubation centers for support and resources.
- **Real-Time Notifications**: Automated alerts for registration updates, new funding opportunities, and important deadlines.
- **Knowledge Hub**: A centralized repository of resources, including training materials, research papers, webinars, and best practices to support startup development.
- **Community Engagement**: Public forums and discussion boards for fostering collaboration, sharing ideas, and providing solutions to common challenges in the AYUSH sector.

## Tech Stack

### Front-End

- **React.js**: For building dynamic and responsive user interfaces.
- **Redux**: For managing state in a predictable manner across the application.
- **Tailwind CSS**: For creating modern, mobile-responsive designs with efficiency.
- **Socket.io**: To enable real-time features like live notifications and updates.
- **D3.js**: For visualizing data, such as funding allocation, statistics, and project timelines.

### Back-End

- **Node.js**: A scalable and efficient server-side platform for handling a high volume of requests and data processing.
- **Express.js**: For building RESTful APIs to manage user registrations, project data, and internal communications between departments.
- **MongoDB**: A flexible NoSQL database for managing unstructured data such as startup profiles, funding details, and application statuses.
- **Mongoose ODM**: For working with MongoDB in an efficient, structured manner.

### Security & Authentication

- **JWT (JSON Web Tokens)**: For secure user authentication and session management.
- **DDoS Protection**: To safeguard the platform from denial-of-service attacks and ensure availability.
- **Role-Based Access Control (RBAC)**: To ensure users access only the data and features they are authorized to use, based on their role (e.g., startup, investor, government official).

## Installation

### Prerequisites

Before you begin, ensure you have the following software installed:

- **Node.js** (version 14 or later) - for running the backend and managing dependencies.
- **npm** (Node Package Manager) - comes with Node.js and is used to manage project dependencies.
- **Git** - for cloning the repository.


### Step 1: Fork the Repository (using GitHub UI)
- *Visit the repository on my account*
- *Fork it*
- *You will get the repository on your account*

### Step 2: Clone the Repository on VSCode (using VSCode UI)
- *Click on "Clone Git Repository"*
- *Clone from GitHub*
- *Select the Forked Repository*

### Step 3: Run following Command
- *Run In Root Directory*
- *Use Command Prompt not powershell*

``` 
    npm i && cd frontend && npm i && cd .. && cd backend && npm i && cd .. && cd video-chat-v1 && npm i && cd ..
```

### Step 4: Run the Server now 
- *Use all commands in root directory*

#### To run all Frontend & Backend & videocall
```
    npm run dev 
```

#### To run Frontend
```
    npm run frontend
```

#### To run Backend
```
    npm run backend
```

#### To run video call
```
    npm run videochat
```

