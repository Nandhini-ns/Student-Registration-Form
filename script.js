

const apiUrl = "https://6858d592138a18086dfc021c.mockapi.io/Register";
document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById("registerform");

const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get("id");

  if (studentId) {
    // ✅ Pre-fill form when editing
    fetch(`${apiUrl}/${studentId}`)
      .then(res => res.json())
      .then(student => {
        document.getElementById("name").value = student.name;
        document.getElementById("last").value = student.last;
        document.getElementById("dob").value = student.dob;
        document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
        document.getElementById("Class").value = student.studentclass;
        document.getElementById("section").value = student.section;
        document.getElementById("emis").value = student.emis;
        document.getElementById("join").value = student.joinDate;
        document.getElementById("phone").value = student.phone;
        document.getElementById("address").value = student.address;
      });
  }

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
        const requestUrl = studentId ? `${apiUrl}/${studentId}` : apiUrl;
        const requestMethod = studentId ? "PUT" : "POST";

        fetch(requestUrl, {
          method: requestMethod,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(studentData)
        })
          .then(res => res.json())
          .then(data => {
            successMessage.textContent = studentId
              ? "Student Updated Successfully!"
              : "Student Registered Successfully!";
            successMessage.style.color = "green";
            form.reset();
            window.location.href = "table.html";
          })
          .catch(error => {
            console.error("Error:", error);
            successMessage.textContent = "Operation failed!";
            successMessage.style.color = "red";
          });
      } else {
        successMessage.textContent = "";
      }
    });
  }
});

 function loadStudentTable() {
  const tbody = document.getElementById("studentBody");
  if (!tbody) return;
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = "";
      data.forEach((student, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.last}</td>
            <td>${student.dob}</td>
            <td>${student.gender}</td>
            <td>${student.studentclass}</td>
            <td>${student.section}</td>
            <td>${student.emis}</td>
            <td>${student.joinDate}</td>
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
        <table class="table">
          <tr><th>First Name</th><td>${student.name}</td></tr>
          <tr><th>Last Name</th><td>${student.last}</td></tr>
          <tr><th>DOB</th><td>${student.dob}</td></tr>
          <tr><th>Gender</th><td>${student.gender}</td></tr>
          <tr><th>Class</th><td>${student.studentclass}</td></tr>
          <tr><th>Section</th><td>${student.section}</td></tr>
          <tr><th>EMIS</th><td>${student.emis}</td></tr>
          <tr><th>Join Date</th><td>${student.joinDate}</td></tr>
          <tr><th>Phone</th><td>${student.phone}</td></tr>
          <tr><th>Address</th><td>${student.address}</td></tr>
        </table>
      `;

      // Bootstrap 5 way to show modal
      const viewModal = new bootstrap.Modal(document.getElementById("viewModal"));
      viewModal.show();
    })
    .catch(err => {
      console.error("Error:", err);
      alert("Something went wrong while loading the student details.");
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


