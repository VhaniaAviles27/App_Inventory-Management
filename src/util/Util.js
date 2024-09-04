export const isValidInput = (email, password) => {
    return email.trim().length > 0 && password.trim().length > 0;
};
