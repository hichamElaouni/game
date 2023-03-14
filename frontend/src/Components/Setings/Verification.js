const passwordCheck = (password) => {
    return password.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$") ? true : false;
}
const emailCheck = (email) => {
    return email.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$") ? true : false;
}
export {
    passwordCheck,
    emailCheck
}
