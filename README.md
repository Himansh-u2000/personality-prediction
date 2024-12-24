A comprehensive web-based application that utilizes resumes and personality-based questions to generate detailed personality profiles. This project combines a modern frontend with a robust backend powered by Gemini, making it an excellent solution for recruitment, personal assessment, and academic analysis.

Features
Resume Parsing: Upload and analyze resumes in PDF format using pdf.js to extract essential details.
Questionnaire Assessment: Interactive personality tests to evaluate behavioral traits and aptitudes.
Personality Insights: Provides detailed personality analysis by combining resume data and questionnaire responses.
Modern UI/UX: Built with React and styled using Tailwind CSS for a sleek, responsive user experience.
Smooth Navigation: Seamless routing powered by react-router-dom.
Dynamic Components: Utilizes Lucide React and other libraries for rich, interactive user interface elements.
Scalable Backend: Backend functionality powered by Gemini for reliable and efficient data processing.
Tech Stack
Frontend
Framework: React
Styling: Tailwind CSS
Resume Parsing: pdf.js
Routing: react-router-dom
Icons & Components: Lucide React
Backend
Framework: Gemini
Functionality: Handles API endpoints, data processing, and personality profile generation.
Installation and Usage
Prerequisites
Node.js
Gemini setup (refer to the Gemini documentation for installation)
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/personality-detection.git
cd personality-detection
Install frontend dependencies:

bash
Copy code
npm install
Set up Gemini backend:

Configure your Gemini backend and ensure it is running.
Update API endpoints in the frontend to connect to the Gemini server.
Run the application:

bash
Copy code
npm start
Access the app:
Open your browser and navigate to http://localhost:3000.

How It Works
Upload Resume: Users upload resumes in PDF format. The app uses pdf.js to extract and parse data.
Answer Questions: Users complete a personality questionnaire designed to assess behavioral and psychological traits.
Data Processing: The frontend sends data to the Gemini backend, where it is analyzed and processed.
View Results: Receive a detailed personality profile based on combined insights from the resume and questionnaire.
Contribution
We welcome contributions to make this application even better! Whether it's adding new features, optimizing the backend, or enhancing the user interface, feel free to submit a pull request.

License
This project is licensed under the MIT License.
