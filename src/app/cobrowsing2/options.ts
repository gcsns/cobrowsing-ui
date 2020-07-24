export const EVENTS = {
  SYNC_PREVIOUS_SESSIONS : 'SYNC_PREVIOUS_SESSIONS'
};



export const formJSON = {
  name: 'KYC Application Form',
  description: 'KYC application form',
  header: 'KYC Application Form',
  isFormReviewable: true,
  eformType: 'docuSignPDF',
  playTypeCode: 'PT01',
  tags: [
    'kyc',
    'application',
    'lead',
    'eform'
  ],
  metadata: {
    section0: {
      type: 'sectionheader',
      name: 'section0',
      label: 'Completing this form',
      defaultValue: 'Please fill the form on your computer or mobile and sign the declaration.'
    },
    section1: {
      type: 'sectionheader',
      name: 'section1',
      label: 'Policy owners'
    },
    lifeInsured: {
      type: 'radiogroup',
      label: 'Who will be the life/lives insured?',
      name: 'lifeInsured',
      defaultValue: 'policyOwner1',
      required: true,
      isVertical: false,
      requiredErrorMsg: 'This field is mandatory',
      options: [
        {
          value: 'policyOwner1',
          text: 'Policy Owner 1'
        },
        {
          value: 'policyOwner2',
          text: 'Policy Owner 2'
        },
        {
          value: 'other',
          text: 'Other'
        }
      ]
    },
    section2: {
      type: 'sectionheader',
      name: 'section2',
      label: 'Policy Owner'
    },
    usTaxPayer: {
      type: 'radiogroup',
      label: 'Are you a US tax payer ?',
      name: 'usTaxPayer',
      defaultValue: 'yes',
      required: true,
      isVertical: false,
      requiredErrorMsg: 'This field is mandatory',
      options: [
        {
          value: 'yes',
          text: 'Yes'
        },
        {
          value: 'no',
          text: 'No'
        }
      ]
    },
    usCitizen: {
      type: 'radiogroup',
      label: 'Are you a US citizen?',
      name: 'usCitizen',
      defaultValue: 'yes',
      required: true,
      isVertical: false,
      requiredErrorMsg: 'This field is mandatory',
      options: [
        {
          value: 'yes',
          text: 'Yes'
        },
        {
          value: 'no',
          text: 'No'
        }
      ]
    },
    usNumber: {
      type: 'radiogroup',
      label: 'Is the telephone number you intend to supply, a US based number?',
      name: 'usNumber',
      defaultValue: 'yes',
      required: true,
      isVertical: false,
      requiredErrorMsg: 'This field is mandatory',
      options: [
        {
          value: 'yes',
          text: 'Yes'
        },
        {
          value: 'no',
          text: 'No'
        }
      ]
    },
    section3: {
      type: 'sectionheader',
      name: 'section3',
      label: 'Policy Owner Details',
      defaultValue: 'Please state all countries where you are currently deemed to be resident for tax purposes'
    },
    taxResidence: {
      disabled: false,
      label: 'Country/Countries of tax residence',
      name: 'taxResidence',
      required: true,
      requiredErrorMsg: 'Tax residence is required',
      type: 'input'
    },
    taxReference: {
      disabled: false,
      label: 'Tax reference number ( optional )',
      name: 'taxReference',
      required: false,
      requiredErrorMsg: 'Tax reference is required',
      type: 'input'
    },
    title: {
      type: 'radiogroup',
      label: 'Title',
      name: 'title',
      defaultValue: 'mr',
      required: true,
      isVertical: false,
      requiredErrorMsg: 'This field is mandatory',
      options: [
        {
          value: 'mr',
          text: 'Mr'
        },
        {
          value: 'mrs',
          text: 'Mrs'
        },
        {
          value: 'miss',
          text: 'Miss'
        },
        {
          value: 'ms',
          text: 'Ms'
        },
        {
          value: 'dr',
          text: 'Dr'
        }
      ]
    },
    otherTile: {
      disabled: false,
      label: 'Other Title ( optional )',
      name: 'otherTile',
      required: false,
      requiredErrorMsg: 'Tax reference is required',
      type: 'input'
    },
    familyName: {
      disabled: false,
      label: 'Family Name',
      name: 'familyName',
      required: true,
      requiredErrorMsg: 'Family name is required',
      type: 'input'
    },
    foreName: {
      disabled: false,
      label: 'Forename(s)',
      name: 'foreName',
      required: true,
      requiredErrorMsg: 'Fore name is required',
      type: 'input'
    },
    dateOfBirth: {
      type: 'date',
      label: 'Date of birth',
      name: 'dateOfBirth',
      required: true,
      max: 'today',
      requiredErrorMsg: 'This field is mandatory'
    },
    gender: {
      type: 'radiogroup',
      label: 'Gender',
      name: 'gender',
      defaultValue: 'male',
      required: true,
      isVertical: false,
      requiredErrorMsg: 'This field is mandatory',
      options: [
        {
          value: 'male',
          text: 'Male'
        },
        {
          value: 'female',
          text: 'Female'
        }
      ]
    },
    countryOfBirth: {
      disabled: false,
      label: 'Country of Birth ( optional )',
      name: 'countryOfBirth',
      required: false,
      requiredErrorMsg: 'Country of birth is required',
      type: 'input'
    },
    placeOfBirth: {
      disabled: false,
      label: 'Place of birth (town or city)',
      name: 'placeOfBirth',
      required: false,
      requiredErrorMsg: 'Place of birth is required',
      type: 'input'
    },
    nationality: {
      disabled: false,
      label: 'Nationality ( optional )',
      name: 'nationality',
      required: false,
      requiredErrorMsg: 'Nationality is required',
      type: 'input'
    },
    otherNationalityCountry: {
      type: 'radiogroup',
      label: 'Do you hold nationality in another country?',
      name: 'otherNationalityCountry',
      defaultValue: 'no',
      required: false,
      isVertical: false,
      requiredErrorMsg: 'This field is mandatory',
      options: [
        {
          value: 'yes',
          text: 'Yes'
        },
        {
          value: 'no',
          text: 'No'
        }
      ]
    },
    otherOptionalNationality: {
      disabled: false,
      label: 'Other ( If \'Yes\' please confirm the country )',
      name: 'otherOptionalNationality',
      required: false,
      requiredErrorMsg: 'Nationality is required',
      type: 'input'
    },
    maritalStatus: {
      type: 'radiogroup',
      label: 'Marital status',
      name: 'maritalStatus',
      defaultValue: 'single',
      required: true,
      isVertical: false,
      requiredErrorMsg: 'This field is mandatory',
      options: [
        {
          value: 'single',
          text: 'Single'
        },
        {
          value: 'married',
          text: 'Married'
        }
      ]
    },
    occupation: {
      disabled: false,
      label: 'Occupation ( optional )',
      name: 'occupation',
      required: false,
      requiredErrorMsg: 'Occupation is required',
      type: 'input'
    },
    jobTitle: {
      disabled: false,
      label: 'Job Title ( optional )',
      name: 'jobTitle',
      required: false,
      requiredErrorMsg: 'Job Title is required',
      type: 'input'
    },
    section4: {
      type: 'sectionheader',
      name: 'section4',
      label: 'Correspondence address'
    },
    poBoxNumber: {
      disabled: false,
      label: 'P.O. Box number',
      name: 'poBoxNumber',
      required: true,
      requiredErrorMsg: 'P.O. Box number is required',
      type: 'input'
    },
    city: {
      disabled: false,
      label: 'City ( optional )',
      name: 'city',
      required: false,
      requiredErrorMsg: 'City is required',
      type: 'input'
    },
    country: {
      disabled: false,
      label: 'Country ( optional )',
      name: 'country',
      required: false,
      requiredErrorMsg: 'Country is required',
      type: 'input'
    },
    additionalAddress: {
      disabled: false,
      label: 'Additional address details for correspondence ( optional )',
      name: 'additionalAddress',
      required: false,
      requiredErrorMsg: 'Additional address is required',
      type: 'textarea'
    },
    section5: {
      type: 'sectionheader',
      name: 'section5',
      label: 'Telephone and Email details'
    },
    telephoneNumber: {
      disabled: false,
      label: 'Telephone number ( optional )',
      name: 'telephoneNumber',
      required: false,
      requiredErrorMsg: 'Telephone Number is required',
      type: 'input'
    },
    countryOfTelephoneNumber: {
      disabled: false,
      label: 'Telephone number country ( optional )',
      name: 'countryOfTelephoneNumber',
      required: false,
      requiredErrorMsg: 'Country of telephone number is required',
      type: 'input'
    },
    mobileNumber: {
      disabled: false,
      label: 'Mobile number',
      name: 'mobileNumber',
      required: true,
      requiredErrorMsg: 'Mobile Number is required',
      type: 'input'
    },
    countryOfMobileNumber: {
      disabled: false,
      label: 'Mobile number country ( optional )',
      name: 'countryOfMobileNumber',
      required: false,
      requiredErrorMsg: 'Country of mobile number is required',
      type: 'input'
    },
    emailAddress: {
      disabled: false,
      label: 'Email address',
      name: 'emailAddress',
      required: true,
      requiredErrorMsg: 'Email address is required',
      type: 'input'
    },
    section6: {
      type: 'sectionheader',
      name: 'section6',
      label: 'Payment details'
    },
    policyCurrency: {
      type: 'radiogroup',
      label: 'Policy currency (Please give all amounts in the policy currency selected)',
      name: 'policyCurrency',
      defaultValue: 'usd',
      required: false,
      isVertical: true,
      requiredErrorMsg: 'This field is mandatory',
      options: [
        {
          value: 'usd',
          text: 'USD'
        },
        {
          value: 'gbp',
          text: 'GBP'
        },
        {
          value: 'eur',
          text: 'EUR'
        }
      ]
    },
    regularPaymentAmount: {
      disabled: false,
      label: 'Regular payment amount',
      name: 'regularPaymentAmount',
      required: true,
      requiredErrorMsg: 'Regular payment amount is required',
      type: 'input'
    },
    regularPaymentFrequency: {
      type: 'radiogroup',
      label: 'Regular payment frequency',
      name: 'regularPaymentFrequency',
      defaultValue: 'monthly',
      required: false,
      isVertical: true,
      requiredErrorMsg: 'This field is mandatory',
      options: [
        {
          value: 'monthly',
          text: 'Monthly'
        },
        {
          value: 'quarterly',
          text: 'Quarterly'
        },
        {
          value: 'halfyearly',
          text: 'Half-yearly'
        },
        {
          value: 'yearly',
          text: 'Yearly'
        }
      ]
    },
    section7: {
      type: 'sectionheader',
      name: 'section7',
      label: 'Fund Selection'
    },
    fundCurrency: {
      type: 'radiogroup',
      label: 'Select fund currency',
      name: 'fundCurrency',
      defaultValue: 'usd',
      required: true,
      isVertical: true,
      requiredErrorMsg: 'This field is mandatory',
      options: [
        {
          value: 'usd',
          text: 'USD'
        },
        {
          value: 'gbp',
          text: 'GBP'
        },
        {
          value: 'eur',
          text: 'EUR'
        }
      ]
    },
    adventurousFund: {
      disabled: false,
      label: 'Adventurous Fund (To select this fund, Please add allocation %)',
      name: 'adventurousFund',
      required: false,
      requiredErrorMsg: 'Adventurous fund is required',
      type: 'input'
    },
    blueChipFund: {
      disabled: false,
      label: 'Blue Chip Fund (To select this fund, Please add allocation %)',
      name: 'blueChipFund',
      required: false,
      requiredErrorMsg: 'Blue Chip fund is required',
      type: 'input'
    },
    cautiousFund: {
      disabled: false,
      label: 'Cautious Fund (To select this fund, Please add allocation %)',
      name: 'cautiousFund',
      required: false,
      requiredErrorMsg: 'Cautious fund is required',
      type: 'input'
    },
    defensiveFund: {
      disabled: false,
      label: 'Defensive Fund (To select this fund, Please add allocation %)',
      name: 'defensiveFund',
      required: false,
      requiredErrorMsg: 'Defensive fund is required',
      type: 'input'
    },
    performanceFund: {
      disabled: false,
      label: 'Performance Fund (To select this fund, Please add allocation %)',
      name: 'performanceFund',
      required: false,
      requiredErrorMsg: 'Performance fund is required',
      type: 'input'
    },
    citizenId: {
      type: 'upload',
      url: '',
      required: true,
      label: 'National ID',
      name: 'citizenId',
      isReviewable: true
    },
    addressProof: {
      type: 'upload',
      required: true,
      label: 'Address Proof',
      hint: '(ex: electic bill, house tax)',
      name: 'addressProof',
      isReviewable: true
    },
    customerSignature: {
      type: 'textarea',
      label: 'Customer Signature:',
      name: 'customerSignature',
      required: true,
      requiredErrorMsg: 'This field is mandatory'
    }
  }
};
