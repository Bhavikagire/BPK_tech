<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Management System README</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      margin: 20px;
    }
    a {
      color: #007BFF;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    h1 {
      color: #333;
    }
    h2 {
      color: #333;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
    }
    h3 {
      color: #333;
    }
    p {
      margin-bottom: 15px;
    }
    ul {
      list-style-type: square;
      margin-left: 20px;
    }
  </style>
</head>
<body>

  <h1>Student Management System</h1>

  <p>Welcome to the Student Management System! This web-based application allows you to manage student records effortlessly. The system provides features to add, update, and delete student information, offering a seamless experience for both administrators and users.</p>

  <h2>Live Demo</h2>

  <p>Experience the Student Management System live: <a href="https://monumental-cassata-64865e.netlify.app/" target="_blank" rel="noopener noreferrer">Student Management System Demo</a></p>

  <h2>Table of Contents</h2>

  <ul>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#api-integration">API Integration</a></li>
    <li><a href="#dependencies">Dependencies</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ul>

  <h2>Getting Started</h2>

  <ol>
    <li>Clone the repository to your local machine:</li>
  </ol>

  <pre><code>git clone &lt;repository-url&gt;</code></pre>

  <ol start="2">
    <li>Open the <code>index.html</code> file in a web browser.</li>
  </ol>

  <h2>Features</h2>

  <h3>1. Add Student</h3>

  <p>Add a new student to the system by providing essential details such as first name, last name, student ID, date of birth, phone, gender, address, and enrollment date. The system ensures that the date of birth and enrollment date are not in the future.</p>

  <h3>2. Update Student</h3>

  <p>Modify student information by clicking the "Update" button next to the respective student. Update the necessary fields and save changes. Use the "Cancel" button to discard modifications.</p>

  <h3>3. Delete Student</h3>

  <p>Remove a student from the system by clicking the "Delete" button next to the respective student. A confirmation dialog will appear to prevent accidental deletions.</p>

  <h3>4. View Student List</h3>

  <p>The system displays a comprehensive table with student details, including full name, student ID, date of birth, phone, gender, address, enrollment date, and action buttons for updating or deleting each student.</p>

  <h3>5. Popup Notifications</h3>

  <p>Popup notifications provide feedback for successful and unsuccessful operations, enhancing the user experience.</p>

  <h2>API Integration</h2>

  <p>The system interacts with a backend API hosted at <code>https://fair-erin-magpie-belt.cyclic.app/api/students</code> to perform CRUD operations on student data.</p>

  <h2>Dependencies</h2>

  <p>The system uses the Fetch API to communicate with the backend API for data retrieval and manipulation.</p>

  <h2>Contributing</h2>

  <p>Contributions are welcome! Feel free to open issues or submit pull requests to enhance functionality or address any bugs.</p>

  <h2>License</h2>

  <p>This project is licensed under the <a href="LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>.</p>

  <h2>Acknowledgments</h2>

  <ul>
    <li>Special thanks to <a href="https://cyclic.app/" target="_blank" rel="noopener noreferrer">cyclic.app</a> for providing the backend API used in this project.</li>
    <li>This system was created as part of a student management project and is intended for educational purposes.</li>
  </ul>

</body>
</html>
