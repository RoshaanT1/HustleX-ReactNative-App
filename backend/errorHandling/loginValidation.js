import validator from "validator";

export const loginValidations = (req, res, next) => {
  try {
    const { emailOrPhone, password } = req.body;

    // Validate required fields
    const errors = [];

    if (!emailOrPhone) {
      errors.push("Email or Phone number is required");
    }

    if (!password) {
      errors.push("Password is required");
    }

    // Validate input format
    if (emailOrPhone) {
      // Check if it's a valid email
      const isEmail = validator.isEmail(emailOrPhone);
      
      // Check if it's a valid phone number (assuming numeric phone number)
      const isPhoneNumber = /^[0-9]{10,14}$/.test(emailOrPhone);

      if (!isEmail && !isPhoneNumber) {
        errors.push("Invalid email or phone number format");
      }
    }

    // Validate password length
    if (password && password.length < 8) {
      errors.push("Password must be at least 8 characters long");
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
    console.error("Login Validation Middleware Error:", error);
    res.status(500).json({ 
      message: "Internal server error during validation", 
      error: error.message 
    });
  }
};