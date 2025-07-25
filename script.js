
const apiUrl = "https://6858d592138a18086dfc021c.mockapi.io/Register";
const form = document.getElementById("registerform");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const last = document.getElementById("last").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const genderElement = document.querySelector('input[name="gender"]:checked');
    const gender = genderElement ? genderElement.value : "";
    const studentclass = document.getElementById("class").value.trim();
    const section = document.getElementById("section").value.trim();
    const emis= document.getElementById("emis").value.trim();
    const joinDate = document.getElementById("join").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const successMessage = document.getElementById("successMessage");
    
    document.getElementById("nameError").textContent = name ? "" : "First Name is required!";
   document.getElementById("lastError").textContent = last ? "" : "Last Name is required!";
   document.getElementById("dobError").textContent = dob ? "" : "Date of Birth is required!";
   document.getElementById("genderError").textContent = gender ? "" : "Gender is required!";
   document.getElementById("classError").textContent = studentclass ? "" : "Class is required!";
   document.getElementById("sectionError").textContent = section ? "" : "Section is required!";
   document.getElementById("emisError").textContent =  emis? "" : "EMIS Number is required!";
   document.getElementById("joinError").textContent = joinDate ? "" : "Joining Date is required!";
   document.getElementById("phoneError").textContent = phone ? "" : "Phone number is required!";
   document.getElementById("addressError").textContent = address ? "" : "Address is required!";

    if (name && last && dob && gender && studentclass && section && emis && joinDate && phone && address) {
      const studentData = {
        name,
        last,
        dob,
        gender,
        studentclass,
        section,
        emis,
        joinDate,
        phone,
        address,
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
      })
        .then(res => res.json())
        .then(() => {
          successMessage.textContent = "Student Registered Successfully!";
          successMessage.style.color = "green";
          form.reset();
          window.location.href = "table.html";        })
        .catch(err => {
          console.error(err);
          successMessage.textContent = "Registration failed!";
          successMessage.style.color = "red";
        });
    } else {
      successMessage.textContent = "";
    }
  });
}


