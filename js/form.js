//************************************************************
// VARIABLES
//************************************************************
const form = document.querySelector('.form')
const titleSelect = document.querySelector('.form__title')
const nameInput = document.querySelector('.form__name')
const surnameInput = document.querySelector('.form__surname')
const addressInput = document.querySelector('.form__address')
const zipInput = document.querySelector('.form__zip')
const locationInput = document.querySelector('.form__location')
const emailInput = document.querySelector('.form__email')
const messageTextarea = document.querySelector('.form__message')
const btnSubmit = document.querySelector('.btn-submit')

const inputArr = [
  titleSelect,
  nameInput,
  surnameInput,
  addressInput,
  zipInput,
  locationInput,
  emailInput,
  messageTextarea,
]

//************************************************************
// FUNCTIONS
//************************************************************
const isNotEmpty = () =>
  inputArr.filter(input => input.value.length <= 0).length > 0 ? false : true

const createErrSpan = () => {
  const err = document.createElement('span')
  err.classList.add('error')

  return err
}

const validateEmail = email =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )

const updateErr = (shouldAdd, siblingInput, err, errMsg) => {
  if (shouldAdd) {
    err.innerText = errMsg
    if (err.parentNode !== siblingInput.parentNode) {
      siblingInput.parentNode.appendChild(err)
    }
  } else {
    if (err.parentNode === siblingInput.parentNode) {
      siblingInput.parentNode.removeChild(err)
    }
  }
}

const validateInput = (input, eventType, errorSpan) => {
  if (input === zipInput && isNaN(input.value) && input.value) {
    updateErr(true, input, errorSpan, 'Must only contain numbers')
  } else if (
    input === zipInput &&
    eventType === 'focusout' &&
    input.value.length !== 4
  ) {
    updateErr(true, input, errorSpan, 'Must be 4 chars long')
  } else if (
    eventType === 'focusout' &&
    input === emailInput &&
    !validateEmail(input.value)
  ) {
    updateErr(true, input, errorSpan, 'Invalid email')
  } else if (!input.value) {
    updateErr(true, input, errorSpan, 'Field cannot be empty')
  } else {
    updateErr(false, input, errorSpan)
  }

  // toggle submit button disabled property
  isNotEmpty() && errorSpan.parentNode !== input.parentNode
    ? (btnSubmit.disabled = false)
    : (btnSubmit.disabled = true)
}

//************************************************************
// EVENTLISTENERS
//************************************************************
form.addEventListener('submit', e => {
  e.preventDefault()
  console.log({
    response: 'Submitted successfully',
    title: titleSelect.value,
    name: nameInput.value,
    surname: surnameInput.value,
    address: addressInput.value,
    zipCode: zipInput.value,
    location: locationInput.value,
    email: emailInput.value,
    message: messageTextarea.value,
  })
  alert('Submitted successfully')
})

window.addEventListener('load', () => {
  isNotEmpty()
  btnSubmit.disabled = true
})

inputArr.forEach(input => {
  const genericError = createErrSpan()
  const eventTypesArr = ['focusout', 'input']
  eventTypesArr.forEach(eventType =>
    input.addEventListener(eventType, () =>
      validateInput(input, eventType, genericError)
    )
  )
})
