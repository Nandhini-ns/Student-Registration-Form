const apiUrl = "https://6858d592138a18086dfc021c.mockapi.io/Register";
const form = document.getElementById("registerform");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get values
        const name = document.getElementById("name").value.trim();
        const last = document.getElementById("last").value.trim();
        const dob = document.getElementById("dob").value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const studentclass = document.getElementById("Class").value.trim();
        const section = document.getElementById("section").value.trim();
        const emis = document.getElementById("emis").value.trim();
        const joinDate = document.getElementById("join").value;
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();

        // Error elements
        const nameError = document.getElementById("nameError");
        const lastError = document.getElementById("lastError");
        const dobError = document.getElementById("dobError");
        const genderError = document.getElementById("genderError");
        const ClassError = document.getElementById("ClassError");
        const sectionError = document.getElementById("sectionError");
        const emisError = document.getElementById("emisError");
        const joinError = document.getElementById("joinError");
        const phoneError = document.getElementById("phoneError");
        const addressError = document.getElementById("addressError");
        const successMessage = document.getElementById("successMessage");

        // Reset error messages
        nameError.textContent = name ? "" : "First Name is required!";
        lastError.textContent = last ? "" : "Last Name is required!";
        dobError.textContent = dob ? "" : "Date of Birth is required!";
        genderError.textContent = gender ? "" : "Gender is required!";
        ClassError.textContent = studentclass ? "" : "Class is required!";
        sectionError.textContent = section ? "" : "Section is required!";
        emisError.textContent = emis ? "" : "EMIS Number is required!";
        joinError.textContent = joinDate ? "" : "Joining Date is required!";
        phoneError.textContent = phone ? "" : "Phone Number is required!";
        addressError.textContent = address ? "" : "Address is required!";

        // Validate
        if (
            name && last && dob && gender && studentclass &&
            section && emis && joinDate && phone && address
        ) {
            // All valid - submit to mock API
            const studentData = {
                name,
                last,
                dob,
                gender: gender.value,
                studentclass,
                section,
                emis,
                joinDate,
                phone,
                address
            };

            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Success:", data);
                    successMessage.textContent = "Student Registered Successfully!";
                    successMessage.style.color = "green";
                    form.reset();
                    // Redirect after success
                    window.location.href = "table.html";
                })
                .catch(error => {
                    console.error("Error:", error);
                    successMessage.textContent = "Registration failed!";
                    successMessage.style.color = "red";
                });
        } else {
            successMessage.textContent = "";
        }
    });
}

 function loadStudentTable() {
  const tbody = document.getElementById("studentBody");
  if (!tbody) return;
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("studentBody");
      tbody.innerHTML = "";
      data.forEach((student, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.last}</td>
            <td>${student.dob}</td>
            <td>${student.class}</td>
            <td>${student.section}</td>
            <td>${student.emis}</td>
            <td>${student.joiningDate}</td>
            <td>${student.phone}</td>
            <td>${student.address}</td>
            <td>
              <button class="btn btn-primary btn-sm" onclick="viewStudent('${student.id}')">View</button>
              <button class="btn btn-warning btn-sm" onclick="editStudent('${student.id}')">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
          </tr>
        `;
        tbody.innerHTML += row;
      });
    });
}

loadStudentTable();

function viewStudent(id) {
  fetch(`${apiUrl}/${id}`)
    .then(res => res.json())
    .then(student => {
      document.getElementById("viewBody").innerHTML = `
        Name: ${student.name} ${student.last}<br>
        DOB: ${student.dob}<br>
        Gender: ${student.gender}<br>
        Class: ${student.studentclass}<br>
        Section: ${student.section}<br>
        EMIS: ${student.emis}<br>
        Join Date: ${student.joiningDate}<br>
        Phone: ${student.phone}<br>
        Address: ${student.address}
      `;
      document.getElementById("viewModal").style.display = "block";
    });
}

function closeView() {
  document.getElementById("viewModal").style.display = "none";
}

function editStudent(id) {
  window.location.href = `index.html?id=${id}`;
}

function deleteStudent(id) {
  if (confirm("Are you sure?")) {
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    })
    .then(() => loadStudentTable());
  }
}


