import validator from "validator";

const signupValidations = (req, res, next) => {
  try {
    const { email, password, confirmPassword, age, gender } = req.body;

    // 🔴 Validate required fields
    const errors = [];

    if (!email) errors.push("Email is required");
    if (!password) errors.push("Password is required");
    if (!confirmPassword) errors.push("Confirm Password is required");
    if (!age) errors.push("Age is required");
    if (!gender) errors.push("Gender is required");

    // 🔴 Check if passwords match
    if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }

    // 🔴 Validate email format
    if (email && !validator.isEmail(email)) {
      errors.push("Invalid email format");
    }

    // 🔴 Validate password length and complexity
    if (password && password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    // Optional: Password complexity check
    const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password && !passwordComplexityRegex.test(password)) {
      errors.push("Password must include uppercase, lowercase, number, and special character");
    }

    // 🔴 Validate age range
    if (age && (age < 18 || age > 100)) {
      errors.push("Age must be between 18 and 100");
    }

    // 🔴 Validate gender
    const validGenders = ['male', 'female', 'other'];
    if (gender && !validGenders.includes(gender.toLowerCase())) {
      errors.push("Invalid gender selection");
    }

    // If there are any errors, return them
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation Error",
        errors: errors
      });
    }

    // If all validations pass, proceed to the next middleware
    next();
  } catch (error) {
    console.error("Validation Middleware Error:", error);
    res.status(500).json({ 
      message: "Internal server error during validation", 
      error: error.message 
    });
  }
};


export {signupValidations}