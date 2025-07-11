# Portfolio Analytics Dashboard

A real-time analytics dashboard to visualize portfolio events, built with React frontend and Python (Flask) backend. It enables filtering events by date range and displays event counts by type, page, and source with interactive charts.

---

## Technologies Used

- **React** — Frontend UI development with functional components and hooks  
- **JavaScript (ES6+)** — Primary language for frontend development  
- **Python (Flask)** — Backend API and server-side programming with Flask framework  
- **Chart.js** (via **react-chartjs-2**) — Data visualization and charts  
- **CSS** — Styling for dashboard components  
- **MongoDB** — NoSQL database to store event data  
- **Postman** — API testing and debugging tool  
- **Node.js / npm** — JavaScript runtime and package manager for frontend dependencies  
- **Git** — Version control system  

---

## Project Structure

- `backend/` — Flask API server code  
- `frontend/` — React dashboard app code  

---

## Getting Started

### Prerequisites

- Node.js (v16+) and npm installed  
- Python (v3.8+) installed  
- MongoDB installed and running locally or accessible remotely  

---

### Backend Setup

1. Navigate to backend folder:

   ```bash
   cd backend
2. Create and activate a Python virtual environment:
   
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
4. Configure MongoDB connection in your backend config (e.g., environment variables or config file).
5. Run the Flask server:
   ```bash
   flask run
  The API server will start at http://localhost:5000 by default.

### Testing Backend API with Postman
- Open Postman
- Create a new GET request to your events endpoint, e.g.,
```bash
http://localhost:5000/api/events
```
- Hit Send to fetch the list of events.
- You can apply query parameters if supported (like date filters) to test the API functionality.

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend

2. Install dependencies:
   ```bash
   npm install
3. Start the React development server:
   ```bash
   npm start
4. Open http://localhost:3000 in your browser to view the dashboard.

### Usage
- Use the Start Date and End Date filters on the dashboard to filter portfolio events by date range.
- View interactive charts showing event counts by type, page, and source.
- The backend API serves event data from MongoDB, which the frontend fetches and displays in charts.

### License
This project is open-source and available under the MIT License.

### Contributing to this project
Contributions are always welcome.

Open issues or PRs for feature suggestions or bugs.







