

const apiUrl = "https://6858d592138a18086dfc021c.mockapi.io/Register";
document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById("registerform");

const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get("id");

  if (studentId) {
    fetch(`${apiUrl}/${studentId}`)
      .then(res => res.json())
      .then(student => {
        document.getElementById("name").value = student.name;
        document.getElementById("last").value = student.last;
        document.getElementById("dob").value = student.dob;
        document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
        document.getElementById("class").value = student.studentclass;
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
        const studentclass = document.getElementById("class").value.trim();
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
        const classError = document.getElementById("classError");
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
        classError.textContent = studentclass ? "" : "Class is required!";
        sectionError.textContent = section ? "" : "Section is required!";
        emisError.textContent = emis ? "" : "EMIS Number is required!";
        joinError.textContent = joinDate ? "" : "Date of Joining is required!";
        phoneError.textContent = phone ? "" : "Phone Number is required!";
        addressError.textContent = address ? "" : "Address is required!";

    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        // phoneError.textContent = "Phone number must be exactly 10 digits";
        return;
    }
    // EMIS number validation (15 digits)
    if (emis.length !== 15 || !/^\d{15}$/.test(emis)) {
        emisError.textContent = "EMIS number must be exactly 15 digits";
        return;
    }    
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
            <td>${formatDateToDMY(student.dob)}</td>
            <td>${student.gender}</td>
            <td>${student.studentclass}</td>
            <td>${student.section}</td>
            <td>${student.emis}</td>
            <td>${formatDateToDMY(student.joinDate)}</td>
            <td>${student.phone}</td>
            <td>${student.address}</td>
            <td>
              <button class="btn btn-primary btn-sm" onclick="viewStudent('${student.id}')"><i class="fas fa-eye"></i></button>
              <button class="btn btn-warning btn-sm" onclick="editStudent('${student.id}')"><i class="fas fa-edit"></i></button>
              <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student.id}')"><i class="fas fa-trash-alt"></i></button>
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
          <tr><th>DOB</th><td>${formatDateToDMY(student.dob)}</td></tr>
          <tr><th>Gender</th><td>${student.gender}</td></tr>
          <tr><th>Class</th><td>${student.studentclass}</td></tr>
          <tr><th>Section</th><td>${student.section}</td></tr>
          <tr><th>EMIS</th><td>${student.emis}</td></tr>
          <tr><th>Join Date</th><td>${formatDateToDMY(student.joinDate)}</td></tr>
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

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const tbody = document.getElementById("studentBody");

    searchInput.addEventListener("input", function () {
        const filter = searchInput.value.toLowerCase();
        const rows = tbody.getElementsByTagName("tr");

        for (let row of rows) {
            const firstName = row.cells[1]?.textContent.toLowerCase();
            const lastName = row.cells[2]?.textContent.toLowerCase();
            const dob = row.cells[3]?.textContent.toLowerCase();
            const studentClass = row.cells[5]?.textContent.toLowerCase();
            const section = row.cells[6]?.textContent.toLowerCase();
            const joinDate = row.cells[8]?.textContent.toLowerCase();
               if (
                firstName.includes(filter) ||
                lastName.includes(filter) ||
                dob.includes(filter) ||
                studentClass.includes(filter) ||
                section.includes(filter) ||
                joinDate.includes(filter)
            ){
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    });
});

// All field IDs and their corresponding error span IDs
const fields = [
  { id: "name", errorId: "nameError" },
  { id: "last", errorId: "lastError" },
  { id: "dob", errorId: "dobError" },
  { id: "class", errorId: "classError" },
  { id: "section", errorId: "sectionError" },
  { id: "emis", errorId: "emisError" },
  { id: "join", errorId: "joinError" },
  { id: "phone", errorId: "phoneError" },
  { id: "address", errorId: "addressError" }
];

// Loop through all fields and add focus event to clear error text
fields.forEach(field => {
  const input = document.getElementById(field.id);
  const error = document.getElementById(field.errorId);
  if (input && error) {
    input.addEventListener("focus", () => {
      error.textContent = "";
    });
  }
});

// For gender radio buttons - clear error on focus
const genderInputs = document.querySelectorAll('input[name="gender"]');
genderInputs.forEach(input => {
  input.addEventListener("focus", () => {
    const genderError = document.getElementById("genderError");
    if (genderError) genderError.textContent = "";
  });
});

function formatDateToDMY(dateString) {
   const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

// Restrict phone input to exactly 10 digits
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", () => {
  if (phoneInput.value.length > 10) {
    phoneInput.value = phoneInput.value.slice(0, 10);
  }
});

const emisInput = document.getElementById("emis");
emisInput.addEventListener("input", () => {
  if (emisInput.value.length > 15) {
    emisInput.value = emisInput.value.slice(0, 15);
  }
});
function goBack() {
    window.location.href = "index.html";
  }