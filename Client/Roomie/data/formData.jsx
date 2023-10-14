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
    
    { label: 'House Rental', value: 'House Rental',enabled : true },
    { label: 'House Share', value: 'House Share',enabled : true },
    { label: 'Digs', value: 'Digs',enabled : true }
  ];

  const priceRange = [
    { label:'Select an option', value:"" },
    { label: '€100', value: '100' },
    { label: '€200', value: '200' },
    { label: '€300', value: '300' },
    { label: '€400', value: '400' },
    { label: '€500', value: '500' },
    { label: '€600', value: '600' },
    { label: '€700', value: '700' },
    { label: '€800', value: '800' },
    { label: '€900', value: '900' },
    { label: '€1000', value: '1000' },
    { label: '€1100', value: '1100' },
    { label: '€1200', value: '1200' },
    { label: '€1300', value: '1300' },
    { label: '€1400', value: '1400' },
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

  const irishCounties = [
    { label:'Select county', value: "" },
    { label: 'Antrim', value: 'Antrim' },
    { label: 'Armagh', value: 'Armagh' },
    { label: 'Carlow', value: 'Carlow' },
    { label: 'Cavan',  value: 'Cavan' },
    { label: 'Clare', value: 'Clare' },
    { label: 'Cork', value: 'Cork' },
    { label: 'Derry', value: 'Derry' },
    { label: 'Donegal', value: 'Donegal' },
    { label: 'Down', value: 'Down' },
    { label: 'Dublin', value: 'Dublin' },
    { label: 'Fermanagh', value: 'Fermanagh' },
    { label: 'Galway', value: 'Galway' },
    { label: 'Kerry', value: 'Kerry' },
    { label: 'Kildare', value: 'Kildare' },
    { label: 'Kilkenny', value: 'Kilkenny' },
    { label: 'Laois', value: 'Laois' },
    { label: 'Leitrim', value: 'Leitrim' },
    { label: 'Limerick', value: 'Limerick' },
    { label: 'Longford', value: 'Longford' },
    { label: 'Louth', value: 'Louth' },
    { label: 'Mayo', value: 'Mayo' },
    { label: 'Meath', value: 'Meath' },
    { label: 'Monaghan', value: 'Monaghan' },
    { label: 'Offaly', value: 'Offaly' },
    { label: 'Roscommon', value: 'Roscommon' },
    { label: 'Sligo', value: 'Sligo' },
    { label: 'Tipperary', value: 'Tipperary' },
    { label: 'Tyrone', value: 'Tyrone' },
    { label: 'Waterford', value: 'Waterford' },
    { label: 'Westmeath', value: 'Westmeath' },
    { label: 'Wexford', value: 'Wexford' },
    { label: 'Wicklow', value: 'Wicklow' },
  ];

  export {
          genderOptions,
          workingHoursOptions,
          occupationOptions,
          yearOfStudyOptions,
          yesNO,
          rentalPreference,
          priceRange,
          number,
          roomType,
          houseType,
          houseMatExpectations,
          environmentOptions,
          days,
          irishCounties
        };