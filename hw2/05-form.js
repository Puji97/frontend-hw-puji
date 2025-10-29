const form = document.getElementById("regForm");
const resultList = document.getElementById("resultList");
const resultModal = new bootstrap.Modal(document.getElementById("resultModal"));

const toItem = (label, value) => {
  const dt = document.createElement("dt");
  dt.className = "col-sm-4";
  dt.textContent = label;

  const dd = document.createElement("dd");
  dd.className = "col-sm-8";
  dd.textContent = value;

  return [dt, dd];
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const status = document.getElementById("status").value || "";
  const notes = document.getElementById("notes").value.trim();

  const courses = Array.from(
    document.querySelectorAll('input[name="courses"]:checked')
  ).map((c) => c.value);

  const data = {
    "Full Name": name,
    Email: email,
    "Registration Status": status || "(none)",
    Courses: courses.length ? courses.join(", ") : "(none)",
    Notes: notes || "(none)",
  };

  resultList.replaceChildren();
  Object.entries(data).forEach(([label, value]) => {
    const [dt, dd] = toItem(label, value);
    resultList.append(dt, dd);
  });

  resultModal.show();
});
