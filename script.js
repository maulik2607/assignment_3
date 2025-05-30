$(document).ready(function () {
  // Only allow numbers in phone input
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  // Toggle password visibility
  $("#togglePassword").click(function () {
    const password = $("#password");
    const type = password.attr("type") === "password" ? "text" : "password";
    password.attr("type", type);
    $(this).text(type === "password" ? "Show" : "Hide");
  });

  // Toggle confirm password visibility
  $("#toggleConfirmPassword").click(function () {
    const confirmPassword = $("#confirmPassword");
    const type = confirmPassword.attr("type") === "password" ? "text" : "password";
    confirmPassword.attr("type", type);
    $(this).text(type === "password" ? "Show" : "Hide");
  });

  // Form submission handler
  $("#userForm").submit(function (e) {
    e.preventDefault();

    const messageBox = $("#messageBox");
    messageBox.removeClass("error success").hide();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phone = phoneInput.value.trim();
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    const errors = [];

    if (name === "") errors.push("Name is required.");
    if (email === "" || !validateEmail(email)) errors.push("Enter a valid email.");
    if (!/^\d{10}$/.test(phone)) errors.push("Phone number must be exactly 10 digits.");
    if (!validatePassword(password)) {
      errors.push("Password must be at least 8 characters, include uppercase, lowercase, and a number.");
    }
    if (confirmPassword !== password) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      messageBox.addClass("error").html(errors.join("<br>")).fadeIn();
    } else {
      messageBox.addClass("success").html("Form submitted successfully!").fadeIn();
      $("#userForm")[0].reset();
      $("#togglePassword").text("Show");
      $("#toggleConfirmPassword").text("Show");
    }
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }
});
