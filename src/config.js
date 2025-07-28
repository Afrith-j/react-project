
const config = {
    allowedDomains: ["gmail.com", "yahoo.com", "outlook.com"],

    credentials: {
        email: "afrith12@gmail.com",
        password: "AFRITHmohammed123@"
    },

    messages: {
        loading: "loading...",
        success: "Successfully Logged in!",
        invalid: "Invalid credentials",
        emailLength: "Email must be between 5 and 254 characters",
        passwordLength: "Password must be between 8 and 64 characters",
        passwordStrength: "Password must contain uppercase, lowercase, number, and special character",
        invalidDomain: "Invalid email domain"
    },

    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/

};

export default config;