
export const validateInput = (input) => {

    // if (input == null) {
    //   //throw new Error('Input is null or undefined');
    //   return false;
    // }
  
 
    const inputStr = String(input);
  
    // Perform input validation
    const regex = /^[a-zA-Z0-9\s.,@:]+$/;
    if (!regex.test(inputStr)) {
      //throw new Error('Input contains invalid characters');
      return false
    }
  

    return true;
  }