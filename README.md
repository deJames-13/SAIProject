User Manual for VIPYR: https://vipyr-frontend.vercel.app/ 

------------------------------------------------------
User Workflow
------------------------------------------------------
1. Registration and Login:
   - Register an Account:
     - Navigate to the registration page.
     - Enter the required details (e.g., username, email, password) and submit.
   - Login to Your Account:
     - Use your registered credentials to log in via the login page.

2. Submit URL for Analysis:
   - After logging in, navigate to the URL submission page.
   - Enter the URL you want to analyze in the provided input field.
   - Click the "Submit" button to initiate the analysis.

3. Receive Report:
   - Once the analysis is complete, you will receive a report based on the submitted URL.
   - You can view the report as needed.

------------------------------------------------------
Developer Guide
------------------------------------------------------

Frontend Setup
--------------
1. Install Dependencies:
   npm install

2. Start Development Server:
   npm run dev

Backend Setup
-------------
1. Setup Environment:
   - Go to the root folder containing the Pipfile.
   - Install pipenv and create a virtual environment:
     pip install pipenv
     pipenv shell
     pipenv install

2. Run Backend Server:
   - Navigate to the backend folder:
     cd backend
   - If not already in the virtual environment, activate it:
     pipenv shell
   - Apply migrations:
     python manage.py migrate
   - Create a superuser for administrative tasks:
     python manage.py createsuperuser
   - Start the development server:
     python manage.py runserver

3. Handle 500 Errors:
   - If you encounter a 500 error, create a .env file in the backend directory with the following content:
     DEBUG=True
     SECRET_KEY=your_secret_key_here

Add New App (e.g., charts)
--------------------------
1. Create a New Django App:
   - Ensure you are in the virtual environment:
     pipenv shell
   - Create a new app:
     python manage.py startapp charts

------------------------------------------------------
Troubleshooting
------------------------------------------------------
- 500 Errors:
  - Check if the .env file exists and contains valid DEBUG and SECRET_KEY values.

- Dependency Issues:
  - Ensure all dependencies are installed by running:
    pipenv install
    npm install

- Server Not Running:
  - Verify the backend server is running on the correct port.
  - Check if the virtual environment is activated.

------------------------------------------------------
Notes
------------------------------------------------------
- Always activate the pipenv environment before running backend commands.
- For frontend development, ensure npm is installed and configured.
