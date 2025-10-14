const input = document.getElementById("numInput");
const result = document.getElementById("result");

input.addEventListener("input", () => {
  const value = input.value.trim();

  // Empty input
  if (!value) {
    result.textContent = "";
    result.className = "";
    return;
  }

  // Invalid input
  if (Number(value) < 0 || Number.isNaN(Number(value))) {
    result.textContent = "Please enter a valid positive number.";
    result.className = "text-danger";
    return;
  }

  // Check palindrome
  const reversed = value.split("").reverse().join("");
  if (value === reversed) {
    result.textContent = "Yes. This is a palindrome!";
    result.className = "text-success";
  } else {
    result.textContent = "No. Try again.";
    result.className = "text-danger";
  }
});
