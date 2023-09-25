## Project Setup and Execution

### Prerequisites
Before running this project, make sure you have the following installed:
- Node.js (v12 or higher)
- MySQL (v5.7 or higher)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/your-project.git
   ```
2. Navigate to the project directory:
   ```
   cd your-project
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Configuration
1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your-mysql-password
   DB_NAME=your-database-name
   ```
   Replace `your-mysql-password` with your actual MySQL password and `your-database-name` with the name of your MySQL database.

### Database Setup
1. Create a new MySQL database with the name specified in the `.env` file.
2. Run the database migrations to create the necessary tables:


### Running the Project
To start the project in dev mode, run the following command:
   npm run dev

To start the project in production mode, run the following command:
   npm start

### API Documentation
#### Create a new task
Endpoint: `POST /tasks`

Request body:
```
{
  "title": "Task 18",
  "description": "Task Description 18",
  "status":"completed"
}
```
Response body:
```
{
   "id": 19
   "title": "Task 18",
   "description": "Task Description 18",
   "status": "completed",
}
```

#### Get all tasks
Endpoint: `GET /tasks`

Query parameters:
```
page: number (default: 0)
limit: number (default: 10)
```
Response body:
```
{
    "results": [
        {
            "id": 7,
            "title": "Task 7",
            "description": "Task Description 7",
            "status": "inprogress"
        },
        {
            "id": 8,
            "title": "Task 8",
            "description": "Task Description 8",
            "status": "inprogress"
        }
    ],
    "total": 19
}
```

#### Update a task
Endpoint: `PUT /tasks/:id`

Request body:
```
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "status": "completed"
}
```
Response body:
```
{
  "id": 1,
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "status": "completed",
  "created_at": "2022-01-01T00:00:00.000Z",
  "updated_at": "2022-01-01T00:00:00.000Z"
}
```

#### Get task metrics
Endpoint: `GET /tasks/metrics`

Response body:
```
[
    {
        "date": "May 2023",
        "metrics": {
            "open_tasks": 0,
            "inprogress_tasks": 0,
            "completed_tasks": 1
        }
    },
    {
        "date": "September 2023",
        "metrics": {
            "open_tasks": 3,
            "inprogress_tasks": 10,
            "completed_tasks": 4
        }
    }
]
```




