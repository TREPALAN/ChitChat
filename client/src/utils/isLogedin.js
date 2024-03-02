function isLogedin() {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

export default isLogedin;
