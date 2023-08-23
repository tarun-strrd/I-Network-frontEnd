type stringorNull = string | null;
const validate = (
  email: stringorNull,
  password: stringorNull,
  confirmpassword: stringorNull = "",
  name: stringorNull = "",
  method: string
) => {
  if (!email) return "Email cannot be empty";
  if (!password) return "Password can not be empty";

  var filter =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!filter.test(email)) {
    return "Please provide a valid email address";
  }
  if (method === "login") return "No Error";

  if (!name) return "Name cannot be empty";
  if (password !== confirmpassword) {
    return "Passwords do not match";
  }
  if (password.length < 6) return "Password must be at least 6 characters long";
  return "No Error";
};

export default validate;
