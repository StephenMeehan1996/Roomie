const genderOptions = [
    { label:'Select an option', value:"",  enabled : false },
    { label: 'Male', value: 'Male',  enabled : true  },
    { label: 'Female', value: 'Female',  enabled : true  },
    { label: 'Other', value: 'Other' ,  enabled : true },
  ];

  const workingHoursOptions = [
    { label:'Select an option', value:"" },
    { label: '9-5', value: '9-5' },
    { label: 'Shift-work', value: 'Shift-work' }
  ];

  const occupationOptions = [
    { label:'Select an option', value:"" },
    { label: 'Working Professional', value: 'Working Professional' },
    { label: 'Student', value: 'Student' }
  ];

  const yearOfStudyOptions = [
    { label:'Select an option', value:"" },
    { label: '1st', value: '1st' },
    { label: '2nd', value: '2nd' },
    { label: '3rd', value: '3rd' },
    { label: '4th', value: '4th' },
    { label: 'Masters', value: 'Masters' },
    { label: 'PHD', value: 'PHD' },
  ];

  const yesNO = [
    { label:'Select an option', value:"" },
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' }
  ];

  const rentalPreference = [
    { label:'Select an option', value:"" },
    { label: 'House Rental', value: 'House Rental' },
    { label: 'House Share', value: 'House Share' },
    { label: 'Digs', value: 'Digs' }
  ];

  const priceRange = [
    { label:'Select an option', value:"" },
    { label: '€100', value: '100' },
    { label: '€200', value: '200' },
    { label: '€300', value: '300' }
  ];

  const number = [
    { label:'Select an option', value:"" },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
  ];

  const roomType = [
    { label:'Select an option', value:"", enabled : false },
    { label: 'Single', value: 'Single' },
    { label: 'Double', value: 'Double' }
  ];

  const houseType = [
    { label:'Select an option', value:"" },
    { label: 'Bungalow', value: 'Bungalow' },
    { label: 'Detached', value: 'Detached' },
    { label: 'Semi-Detached', value: 'Semi-Detached' },
    { label: 'Apartment', value: 'Apartment' },
  ];

  const houseMatExpectations = [
    { label:'Select an option', value:"" },
    { label: 'Everyone does own thing', value: 'Everyone does own thing' },
    { label: 'Friendly', value: 'Friendly' },
    { label: 'Socialize With Housemates', value: 'Socialize With Housemates' }
  ];

  const environmentOptions = [
    { label:'Select an option', value:"" },
    { label: 'Quiet', value: 'Quiet' },
    { label: 'Social', value: 'Social' },
    { label: 'Party', value: 'Party' }
  ];

  const days = [
    { label:'Select an option', value:"" },
    { label: 'Monday-Friday', value: 'Monday-Friday' },
    { label: 'Full Week', value: 'Full Week' }
  ];

  export {genderOptions, workingHoursOptions, occupationOptions,yearOfStudyOptions,yesNO, rentalPreference,priceRange, number, roomType, houseType, houseMatExpectations, environmentOptions, days};