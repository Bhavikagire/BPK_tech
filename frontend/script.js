document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://fair-erin-magpie-belt.cyclic.app/api/students';

  const formContainer = document.getElementById('form-container');
  const studentListContainer = document.getElementById('student-list');

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB', options).replace(/\//g, '/');
    console.log(formattedDate);
    return formattedDate;
  };

  const createStudentForm = () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" required>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" required>
      <label for="studentID">Student ID:</label>
      <input type="text" id="studentID" required>
      <label for="dob">Date of Birth:</label>
      <input type="date" id="dob" required>
      <label for="phone">Phone:</label>
      <input type="text" id="phone" required>
      <label for="gender">Gender:</label>
      <select id="gender" required>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <label for="address">Address:</label>
      <input type="text" id="address" required>
      <label for="enrollmentDate">Enrollment Date:</label>
      <input type="date" id="enrollmentDate" required>
      <button type="submit">Submit</button>
    `;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Get the input values
      const firstName = form.querySelector('#firstName').value;
      const lastName = form.querySelector('#lastName').value;
      const studentID = form.querySelector('#studentID').value;
      const dob = form.querySelector('#dob').value;
      const phone = form.querySelector('#phone').value;
      const gender = form.querySelector('#gender').value;
      const address = form.querySelector('#address').value;
      const enrollmentDate = form.querySelector('#enrollmentDate').value;

      // Check if dates are in the future
      const currentDate = new Date().toISOString().split('T')[0]; // Get the current date
      if (dob > currentDate || enrollmentDate > currentDate) {
        showAlert('Date of Birth and Enrollment Date cannot be in the future. Please select a valid date.');
        return; // Stop execution if dates are invalid
      }

      // Create student object
      const newStudent = {
        firstName,
        lastName,
        studentID,
        dob,
        phone,
        gender,
        address,
        enrollmentDate,
      };

      // Add the student
      const addedStudent = await addStudent(newStudent);
      form.reset();
      createStudentList();
    });

    formContainer.innerHTML = '';
    formContainer.appendChild(form);
    
  };

  const createStudentList = async () => {
    const students = await fetchStudents();

    const table = document.createElement('table');
    table.innerHTML = `
      <tr>
        <th>Full Name</th>
        <th>Student ID</th>
        <th>Date of Birth</th>
        <th>Phone</th>
        <th>Gender</th>
        <th>Address</th>
        <th>Enrollment Date</th>
        <th>Actions</th>
      </tr>
    `;

    students.forEach((student) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.firstName} ${student.lastName}</td>
        <td>${student.studentID}</td>
        <td>${formatDate(student.dob)}</td>
        <td>${student.phone}</td>
        <td>${student.gender}</td>
        <td>${student.address}</td>
        <td>${formatDate(student.enrollmentDate)}</td>
        <td class="action-buttons">
          <button class="update-button" data-student-id="${student._id}">Update</button>
          <button class="delete-button" data-student-id="${student._id}">Delete</button>
        </td>
      `;

      table.appendChild(row);
    });

    studentListContainer.innerHTML = '';
    studentListContainer.appendChild(table);

    // Add event listeners for update and delete buttons
    document.querySelectorAll('.update-button').forEach(button => {
      button.addEventListener('click', async () => {
        const studentId = button.getAttribute('data-student-id');
        const student = await fetchStudent(studentId);

        if (student) {
          createUpdateForm(student);
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        } else {
          showAlert('Student not found');
        }
      });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', () => {
        const studentId = button.getAttribute('data-student-id');
        deleteStudent(studentId);
      });
    });
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(apiUrl);
      const students = await response.json();
      return students;
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const addStudent = async (studentData) => {
    try {
      console.log('Adding student:', studentData);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        const newStudent = await response.json();
        console.log('Student added successfully:', newStudent);
        createStudentList(); // Refresh the student list
        showAlert('Student added successfully');
        return newStudent;
      } else {
        const errorData = await response.json();
        console.error('Failed to add student. Server returned:', response.status, errorData);

        if (response.status === 400 && errorData.message.includes('duplicate key error')) {
          showAlert('Student with the same ID already exists. Please use a different ID.');
        } else {
          showAlert('Failed to add student. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error adding student:', error);
      showAlert('Failed to add student. Please try again later.');
    }
  };

  const updateStudent = async (studentId, updatedData) => {
    try {
      const response = await fetch(`${apiUrl}/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedStudent = await response.json();
        // Display a success message
        showAlert('Student updated successfully');

        // Refresh the page to see the updated data
        location.reload();

        return updatedStudent;
      } else {
        // If the response status is not ok, handle the error
        console.error('Error updating student:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      const student = await fetchStudent(studentId);

      if (!student) {
        showAlert('Student not found');
        return;
      }

      const confirmDelete = window.confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`);

      if (confirmDelete) {
        await fetch(`${apiUrl}/${studentId}`, {
          method: 'DELETE',
        });
        showAlert('Student deleted successfully');
        createStudentList();
      } else {
        showAlert('Deletion canceled');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const createUpdateForm = (student) => {
    const form = document.createElement('form');
    form.innerHTML = `
      <label for="updateFirstName">First Name:</label>
      <input type="text" id="updateFirstName" value="${student.firstName}" required>
      <label for="updateLastName">Last Name:</label>
      <input type="text" id="updateLastName" value="${student.lastName}" required>
      <label for="updateStudentID">Student ID:</label>
      <input type="text" id="updateStudentID" value="${student.studentID}" required>
      <label for="updateDob">Date of Birth:</label>
      <input type="date" id="updateDob" value="${formatDateForInput(student.dob)}" required>
      <label for="updatePhone">Phone:</label>
      <input type="text" id="updatePhone" value="${student.phone}" required>
      <label for="updateGender">Gender:</label>
      <select id="updateGender" required>
        <option value="Male" ${student.gender === 'Male' ? 'selected' : ''}>Male</option>
        <option value="Female" ${student.gender === 'Female' ? 'selected' : ''}>Female</option>
        <option value="Other" ${student.gender === 'Other' ? 'selected' : ''}>Other</option>
      </select>
      <label for="updateAddress">Address:</label>
      <input type="text" id="updateAddress" value="${student.address}" required>
      <label for="updateEnrollmentDate">Enrollment Date:</label>
      <input type="date" id="updateEnrollmentDate" value="${formatDateForInput(student.enrollmentDate)}" required>
      <button type="button" onclick="cancelUpdate()">Cancel</button>
      <button type="button" onclick="submitUpdate('${student._id}')">Update</button>
    `;

    formContainer.innerHTML = '';
    formContainer.appendChild(form);
    

    // Define cancelUpdate function
    window.cancelUpdate = () => {
      formContainer.innerHTML = ''; // Clear the form
      location.reload();
    };
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const setDateInputValue = (id, dateString) => {
    const dateInput = document.getElementById(id);
    if (dateInput) {
      // Convert the date string to the format 'yyyy-MM-dd'
      const formattedDate = new Date(dateString).toISOString().split('T')[0];
      dateInput.value = formattedDate;
    }
  };

  const updateStudentForm = async (studentId) => {
    const student = await fetchStudent(studentId);

    if (student) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      createUpdateForm(student);
      
    }
  };

  const fetchStudent = async (studentId) => {
    try {
      const response = await fetch(`${apiUrl}/${studentId}`);
      const student = await response.json();
      return student;
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  // Function to cancel the update operation
  window.cancelUpdate = () => {
    formContainer.innerHTML = ''; // Clear the form container
    location.reload();
  };

  // Function to submit the updated data
  window.submitUpdate = async (studentId) => {
    const updatedStudent = {
      firstName: document.getElementById('updateFirstName').value,
      lastName: document.getElementById('updateLastName').value,
      studentID: document.getElementById('updateStudentID').value,
      dob: document.getElementById('updateDob').value,
      phone: document.getElementById('updatePhone').value,
      gender: document.getElementById('updateGender').value,
      address: document.getElementById('updateAddress').value,
      enrollmentDate: document.getElementById('updateEnrollmentDate').value,
    };

    await updateStudent(studentId, updatedStudent);
    formContainer.innerHTML = ''; // Clear the form container
    showAlert("student updated ")
    createStudentList(); // Refresh the student list
    
  };

  createStudentForm();
  createStudentList();
});


    // Function to show the popup
    function showAlert(message) {
      // Set the message
      document.getElementById('popupMessage').innerText = message;

      // Show the overlay
      document.getElementById('popupOverlay').style.display = 'flex';
    }

    // Function to close the popup
    function closePopup() {
      // Hide the overlay
      document.getElementById('popupOverlay').style.display = 'none';
    }

    // Example usage:
    // showAlert('This is a custom popup!');
  