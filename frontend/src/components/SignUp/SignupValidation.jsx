function validation(values) {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[\s@]+$/
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{8,}$/

    // Name Validation
    if (!values.name.trim()) {
        errors.name = "Name should not be empty";
    }

    // Email Validation
    if (!values.email.trim()) {
        errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "Email is incorrect";
    }

    // Password Validation
    if (!values.password.trim()) {
        errors.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
        errors.password = "Password is incorrect";
    }

    // Confirm Password Validation
    if (!values.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm Password should not be empty";
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
}

export default validation;
