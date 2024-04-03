const { validateInput } = require('../functions/Validation');

describe('validateInput function', () => {
  // Test cases for safe inputs
  describe('basic input validation', () => {
    it('should throw an error for null input', () => {
      expect(() => validateInput(null)).toThrow('Input is null or undefined');
    });

    it('should throw an error for undefined input', () => {
      expect(() => validateInput(undefined)).toThrow('Input is null or undefined');
    });

    it('should throw an error for empty string input', () => {
      expect(() => validateInput('')).toThrow('Input contains invalid characters');
    });

    it('should return true for valid alphanumeric input', () => {
      expect(validateInput('abc123')).toBe(true);
    });

    it('should return true for input containing spaces', () => {
      expect(validateInput('hello world')).toBe(true);
    });


  });

  describe('Edge case inputs', () => {
    it('should return error - Outside alphanumeric range', () => {
        expect(() => validateInput("'abc123$%^&'")).toThrow('Input contains invalid characters');
      });

    it('should return error - Unicode characters', () => {
        expect(() => validateInput("ａｂｃ１２３")).toThrow('Input contains invalid characters');
      });

    it('should return error - Special characters', () => {
        expect(() => validateInput("abc123<>")).toThrow('Input contains invalid characters');
      });
});

  // Test cases for specific vulnerability checks
  describe('specific vulnerability checks', () => {
    it('should throw an error for invalid characters - SQL injection', () => {
      expect(() => validateInput("'; DROP TABLE users; --")).toThrow('Input contains invalid characters');
    });

    it('should throw an error for invalid characters - XSS attack', () => {
      expect(() => validateInput('<script>alert("XSS")</script>')).toThrow('Input contains invalid characters');
    });

    it('should throw an error for invalid characters - command injection', () => {
      expect(() => validateInput('&& rm -rf /')).toThrow('Input contains invalid characters');
    });

    it('should throw an error for invalid characters - file path traversal', () => {
      expect(() => validateInput('../etc/passwd')).toThrow('Input contains invalid characters');
    });


    it('should throw an error for invalid characters - XML injection', () => {
      expect(() => validateInput('<?xml version="1.0" encoding="UTF-8"?>')).toThrow('Input contains invalid characters');
    });

    it('should throw an error for invalid characters - HTTP header injection', () => {
      expect(() => validateInput('User-Agent: Mozilla/5.0\r\n')).toThrow('Input contains invalid characters');
    });


    // Add more test cases for other specific vulnerabilities
  });
});

