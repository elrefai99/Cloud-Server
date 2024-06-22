const phoneRegex = /(\d{3}[-\s]?\d{3}[-\s]?\d{4})/g

export function checkPhoneNumberPosition(inputText: string) {
  // Check if the phone number is at the beginning, middle, or end of the title
  const matches = inputText.match(phoneRegex)

  if (!matches) {
    return { code: 200, status: 'OK', message: inputText }
  }

  const phoneNumber = matches[0]
  const index = inputText.indexOf(phoneNumber)

  if (index === 0) {
    return { code: 400, status: 'Bad Request', message: 'Phone number is at the beginning of the title.' }
  }
  else if (index + phoneNumber.length === inputText.length) {
    return { code: 400, status: 'Bad Request', message: 'Phone number is at the end of the title.' }
  }
  else {
    return { code: 400, status: 'Bad Request', message: 'Phone number is in the middle of the title.' }
  }
}
