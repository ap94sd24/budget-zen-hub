# BudgetZenHub

Welcome to Budget Zen Hub, a comprehensive budgeting and social collaborative platform designed to help users discuss and learn about budget management and other finance topics which helps enhance their financial literacy. Budget Zen Hub serves as a hub for setting budgeting goals, collaborate on budgeting roadblocks, and follow other financial gurus that are well-hearsed in this topic.

Site: https://budget-zen-hub-ap94sd24s-projects.vercel.app/


## Features

- **Create posts**: Get insights from community with help you need to set financial goals
- **Create private discussions**: Create private posts to track progress with a financial guru you follow
- **Share public posts on financial insights & news**: Create public posts to motivate, educate and promote financial well-ness in the community
- **1-1 chat with other members**: chat with other community members to facilitate learnings and get help

### Prerequisites

- Node.js (v12.x or later)
- npm (v6.x or later) or yarn (v1.22.x or later)
- Django (version 3.x.x or later)
- python (3.x.x or later)

### Installation

Clone the repository to your local machine:
```bash
git clone https://github.com/ap94sd24/budget-zen-hub.git
cd budget-zen-hub
cd client
mkdir server 
git clone https://github.com/ap94sd24/budget-zen-hub-server.git
```
This will clone the backend and frontend of the project.

Go to client side by cd into client assuming you are in budget-zen-hub directory. 

```
Run npm install 
```
Create a virtual environment so you can run development server.
Go to backend in server directory to install necessary dependencies assuming you have python and pip installed. 

```
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Run development environment 
For frontend:
```javascript
npm run dev 
// available now on http://localhost:5173/
```
For backend:
```python
python manage.py runserver
# It will now be available on http://127.0.0.1:8000/
```

### Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.
Fork the Project
1. Create your Feature Branch (git checkout -b feature/AmazingFeature)
2. Commit your Changes (git commit -m 'Add some AmazingFeature')
3. Push to the Branch (git push origin feature/AmazingFeature)
4. Open a Pull Request



### Reference 
For further information on frontend, go to client folder for details on frontend setup. For further information on backend setup, go to https://github.com/ap94sd24/budget-zen-hub-server
