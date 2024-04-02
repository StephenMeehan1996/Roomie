
export const validateInput = (input) => {

    // Check if input is not null or undefined
    if (input == null) {
      throw new Error('Input is null or undefined');
    }
  
    // Convert input to string
    const inputStr = String(input);
  
    // Perform input validation checks
    const regex = /^[a-zA-Z0-9\s]+$/; // Regular expression for alphanumeric characters and spaces
    if (!regex.test(inputStr)) {
      throw new Error('Input contains invalid characters');
    }
  
    // If input passes all validation checks, return true
    return true;
  }