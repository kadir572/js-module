import { updateIndex } from './helpers/slider/helper.js'

//************************************************************
// VARIABLES
//************************************************************
const imageContainer = document.querySelector('.image__container')
const image = document.querySelector('.image')
const prevBtn = document.querySelector('.btn-prev')
const mediaBtn = document.querySelector('.btn-media-control')
const mediaBtnIcon = document.querySelector('.btn-media-control > i')
const nextBtn = document.querySelector('.btn-next')
const imageIndexContainer = document.querySelector('.image-index__container')
const imagesArr = [
  '../assets/images/image-1.jpg',
  '../assets/images/image-2.jpg',
  '../assets/images/image-3.jpg',
  '../assets/images/image-4.jpg',
  '../assets/images/image-5.jpg',
]

let currentImageIndex = 0
let newImageExists = false
let isPlaying = true
let sliderInterval // predefined to be able to remove interval
let imgIndexArr

//************************************************************
// FUNCTIONS
//************************************************************

// Would preferably use a string 'next' | 'prev' instead, which would
// make the code more readable. But because there are no type definitions
// in javascript, I will use a boolean because it can only have two values,
// to prevent unexpected behaviour, if any other value is entered as parameter.

// true ? next image : prev image
const changeImage = shouldChangeToNext => {
  if (newImageExists) return

  newImageExists = true
  image.classList.add('fadeOut')
  imgIndexArr[currentImageIndex].classList.remove('slider__index--active')

  currentImageIndex = updateIndex(
    currentImageIndex,
    imagesArr,
    shouldChangeToNext
  )

  imgIndexArr[currentImageIndex].classList.add('slider__index--active')

  let newImage = document.createElement('img')
  newImage.src = imagesArr[currentImageIndex]
  newImage.classList.add(shouldChangeToNext ? 'nextImage' : 'prevImage')
  image.classList.add(shouldChangeToNext ? 'nextImageMain' : 'prevImageMain')
  shouldChangeToNext
    ? imageContainer.appendChild(newImage, image)
    : imageContainer.insertBefore(newImage, image)

  setTimeout(() => {
    image.src = imagesArr[currentImageIndex]
    image.classList.remove('nextImageMain', 'prevImageMain', 'fadeOut')
    newImage.remove()
    newImageExists = false
  }, 1000)
}

// type = "play" | "pause"
const setMediaBtn = type => {
  const mediaBtnOptions = {
    play: {
      addClass: 'btn-play',
      removeClass: 'btn-pause',
      iconClass: 'fa-play',
      isPlaying: false,
      intervalFn: clearSliderInterval,
    },
    pause: {
      addClass: 'btn-pause',
      removeClass: 'btn-play',
      iconClass: 'fa-pause',
      isPlaying: true,
      intervalFn: setSliderInterval,
    },
  }

  const {
    addClass,
    removeClass,
    isPlaying: shouldPlay,
    iconClass,
    intervalFn,
  } = mediaBtnOptions[type]

  mediaBtn.classList.remove(removeClass)
  mediaBtn.classList.add(addClass)
  mediaBtnIcon.classList.remove('fa-play')
  mediaBtnIcon.classList.remove('fa-pause')
  mediaBtnIcon.classList.add(iconClass)
  isPlaying = shouldPlay
  intervalFn()
}

//************************************************************
// EXECUTION
//************************************************************
window.addEventListener('load', () => {
  image.src = imagesArr[currentImageIndex]
  setSliderInterval()
  setMediaBtn('pause')
  imgIndexArr = createImgIndexArr(imagesArr.length)
  imgIndexArr.forEach(el => imageIndexContainer.appendChild(el))
  imgIndexArr[currentImageIndex].classList.add('slider__index--active')
})

prevBtn.addEventListener('click', () => {
  changeImage(false)
  setMediaBtn('play')
})

mediaBtn.addEventListener('click', () =>
  isPlaying ? setMediaBtn('play') : setMediaBtn('pause')
)

nextBtn.addEventListener('click', () => {
  changeImage(true)
  setMediaBtn('play')
})

const setSliderInterval = () => {
  clearInterval(sliderInterval)

  sliderInterval = setInterval(() => {
    changeImage(true)
  }, 3000)
}

const clearSliderInterval = () => {
  clearInterval(sliderInterval)
}

const createImgIndexEl = () => {
  const el = document.createElement('div')
  el.classList.add('slider__index')
  // el.classList.add('slider__index--active')
  return el
}

const createImgIndexArr = arrLength => {
  const arr = []
  for (let i = 0; i < arrLength; i++) {
    arr.push(createImgIndexEl())
  }

  return arr
}
