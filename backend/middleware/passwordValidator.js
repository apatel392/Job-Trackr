

const validatePassword = (password) => {

    const minlength = 8;
    const upperRegex = /[A-Z]/;
    const lowerRegex = /[a-z]/g;
    const numberRegex = /[0-9]/;
    const specialRegex = /[^A-Za-z0-9]/;

    if (password.length < minlength) {
        return { valid: false, message: "Password must be at least 8 characters"};
    }

    if (!upperRegex.test(password)) {
        return { valid: false, message: "Password must include at least 1 uppercase letter." };
    }

    if ((password.match(lowerRegex) || []).length < 2) {
        return { valid: false, message: "Password must include at least 2 lowercase letters." };
    }

    if (!numberRegex.test(password)) {
        return { valid: false, message: "Password must include at least 1 number." };
    }

    if (!specialRegex.test(password)) {
        return { valid: false, message: "Password must include at least 1 special character." };
    }

    return { valid: true };
    }

module.exports = validatePassword;