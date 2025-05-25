$(document).ready(function () {
  // Toggle password visibility
  $("#togglePassword").click(function () {
    const password = $("#password");
    var type = "password";
    if(password.attr("type") == "password"){
        type = "text";
    }
    password.attr("type", type);
    $(this).text(type === "password" ? "Show" : "Hide");
  });

  // Form submission handler
  $("#userForm").submit(function (e) {
       e.preventDefault()


    // Clear any previous messages
    const messageBox = $("#messageBox");
    messageBox.removeClass("error success").hide();

    // Retrieve input values
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const password = $("#password").val();

    // Validate inputs
    const errors = [];

    if (name === "") errors.push("Name is required.");
    if (email === "" || !validateEmail(email)) errors.push("Enter a valid email.");
    if (!/^\d{10}$/.test(phone)) errors.push("Phone number must be exactly 10 digits.");
    if (!validatePassword(password)) {
      errors.push("Password must be at least 8 characters, include uppercase, lowercase, and a number.");
    }

    // Display messages
    if (errors.length > 0) {
      messageBox
        .addClass("error")
        .html(errors.join("<br>"))
        .fadeIn();
    } else {
      messageBox
        .addClass("success")
        .html("Form submitted successfully!")
        .fadeIn();

      // Optionally, reset form after success
      $("#userForm")[0].reset();
      $("#togglePassword").text("Show");
    }
  });

  // Email format validation
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Password validation rules
  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }
});
