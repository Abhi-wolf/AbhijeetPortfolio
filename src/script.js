const namePerson = document.getElementById("namePer");
const emailId = document.getElementById("emailId");
const mesaage = document.getElementById("message");
const contactForm = document.getElementById("contactForm");
console.log(mesaage);

function showMessage(input, message, type) {
  // get the small element and set the message
  const msg = input.parentNode.querySelector("small");
  msg.innerText = message;
  msg.style.color = "red";
  // update the class for the input
  input.className = type ? "success" : "error";
  return type;
}

function showError(input, message) {
  return showMessage(input, message, false);
}

function showSuccess(input) {
  return showMessage(input, "", true);
}

function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }
  return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
  // check if the value is not empty
  if (!hasValue(input, requiredMsg)) {
    return false;
  }
  // validate email format
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const email = input.value.trim();
  if (!emailRegex.test(email)) {
    return showError(input, invalidMsg);
  }
  return true;
}

const NAME_REQUIRED = "Please enter your name";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";
const MESS_REQUIRED = "Please enter your message";

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let nameValid = hasValue(namePerson, NAME_REQUIRED);
  let emailValid = validateEmail(emailId, EMAIL_REQUIRED, EMAIL_INVALID);
  let messageValid = hasValue(message, MESS_REQUIRED);
  if (nameValid && emailValid && messageValid) {
    var params = {
      name: namePerson.value,
      email: emailId.value,
      message: mesaage.value,
    };

    const serviceId = "service_ktf4lk8";
    const templateId = "template_gky4pn3";

    emailjs
      .send(serviceId, templateId, params)
      .then((res) => {
        namePerson.value = "";
        emailId.value = "";
        message.value = "";
        console.log(res);
        alert("Your message sent successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("notvalid");
  }
});
