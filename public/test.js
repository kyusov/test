const windowHeight = window.innerHeight
var windowWidth = window.innerWidth

let lightTheme = true

let map
let mapAgain = false

const cities = [
  {
    id: 0,
    city: 'Иркутск',
    street: 'ул. Пушкина',
    house: 'д. 3',
    fullAddress: 'Иркутск, ул. Пушкина, д. 3',
  },
  {
    id: 1,
    city: 'Ангарск',
    street: 'ул. Тайная',
    house: 'д. 5',
    fullAddress: 'Ангарск, ул. Тайная, д. 5',
  },
  {
    id: 2,
    city: 'Усолье-Сибирское',
    street: 'ул. Ленина',
    house: 'д. 10',
    fullAddress: 'Усолье-Сибирское, ул. Ленина, д. 10',
  },
  {
    id: 3,
    city: 'Магнитогорск',
    street: 'ул. Красноармейская',
    house: 'д. 14',
    fullAddress: 'Магнитогорск, ул. Красноармейская, д. 14',
  },
  {
    id: 4,
    city: 'Москва',
    street: 'ул. Мира',
    house: 'д. 1',
    fullAddress: 'Москва, ул. Мира, д. 1',
  },
  {
    id: 5,
    city: 'Иркутск',
    street: 'ул. Ленина',
    house: 'д. 69',
    fullAddress: 'Иркутск, ул. Ленина, д. 69',
  },
  {
    id: 6,
    city: 'Иркутск',
    street: 'ул. Пискунова',
    house: 'д. 22',
    fullAddress: 'Иркутск, ул. Пискунова, д. 22',
  },
  {
    id: 7,
    city: 'Новосибирск',
    street: 'ул. Крокодилова',
    house: 'д. 8',
    fullAddress: 'Новосибирск, ул. Крокодилова, д. 8',
  },
  {
    id: 8,
    city: 'Новосибирск',
    street: 'ул. Подснежникова',
    house: 'д. 13',
    fullAddress: 'Новосибирск, ул. Подснежникова, д. 13',
  },
  {
    id: 9,
    city: 'Иркутск',
    street: 'ул. Депутатская',
    house: 'д. 66',
    fullAddress: 'Иркутск, ул. Депутатская, д. 66',
  },
  {
    id: 10,
    city: 'Новосибирск',
    street: 'ул. Молочная',
    house: 'д. 96',
    fullAddress: 'Новосибирск, ул. Молочная, д. 96',
  },
  {
    id: 11,
    city: 'Ангарск',
    street: 'ул. Собакова',
    house: 'д. 104',
    fullAddress: 'Ангарск, ул. Собакова, д. 104',
  },
  {
    id: 12,
    city: 'Новосибирск',
    street: 'ул. Мраморная',
    house: 'д. 4',
    fullAddress: 'Новосибирск, ул. Мраморная, д. 4',
  },
]

const citiesCoords = [
  '52.279937,104.283285',
  '52.27199,104.278054',
  '52.281324,104.2823',
  '52.284427,104.290197',
  '52.286871,104.286396',
  '52.289328,104.278695',
  '52.287751,104.273992',
  '52.284654,104.272402',
  '52.281796,104.276275',
  '52.280786,104.28217',
  '52.273408,104.28818',
  '52.272306,104.283596',
  '52.272221,104.298479',
]

window.onload = () => {
  $('.first').marquee({
    duration: 15000,
    startVisible: true,
    duplicated: true,
  })

  anime({
    targets: [
      '.header',
      '.marquee',
      '.offer',
      '.offer',
      '.privilege',
      '.promo',
      '.partners',
      '.contacts',
    ],
    opacity: [0, 1],
    easing: 'easeInQuad',
  })
}

function cardAnimation(show) {
  if (show) {
    $('.card-terminal').css('animation-play-state', 'running')
    $('.terminal-shadow').css('animation-play-state', 'running')
    $('.one-money').css('animation-play-state', 'running')
    $('.two-money').css('animation-play-state', 'running')
  } else {
    $('.card-terminal').css('animation-play-state', 'paused')
    $('.terminal-shadow').css('animation-play-state', 'paused')
    $('.one-money').css('animation-play-state', 'paused')
    $('.two-money').css('animation-play-state', 'paused')
  }
}

function fireAnimation(show) {
  if (show) {
    $('.fire').css('animation-play-state', 'running')
    $('.fire-shadow').css('animation-play-state', 'running')
  } else {
    $('.fire').css('animation-play-state', 'paused')
    $('.fire-shadow').css('animation-play-state', 'paused')
  }
}

$(window).scroll(function () {
  if ($(this).scrollTop() > $('.first').offset().top + 100) {
    $('.first').marquee('pause')
  } else {
    $('.first').marquee('resume')
  }

  if (
    ($(this).scrollTop() >
      $('.card-terminal').closest('div').offset().top - 250 &&
      lightTheme) ||
    ($(this).scrollTop() <
      $('.card-terminal').closest('div').offset().top - 250 &&
      lightTheme)
  ) {
    if (
      $(this).scrollTop() >
        $('.card-terminal').closest('div').height() +
          $('.card-terminal').closest('div').offset().top ||
      $(this).scrollTop() <
        $('.card-terminal').closest('div').offset().top - 500
    ) {
      cardAnimation(false)
    } else {
      cardAnimation(true)
    }
  }

  if (
    ($(this).scrollTop() > $('.fire').closest('div').offset().top - 250 &&
      lightTheme) ||
    ($(this).scrollTop() < $('.fire').closest('div').offset().top - 250 &&
      lightTheme)
  ) {
    if (
      $(this).scrollTop() >
        $('.fire').closest('div').height() +
          $('.fire').closest('div').offset().top ||
      $(this).scrollTop() < $('.fire').closest('div').offset().top - 500
    ) {
      fireAnimation(false)
    } else {
      fireAnimation(true)
    }
  }
})

$(document).ready(() => {
  $('.header__menu-btn').on('click', (e) => {
    if (!lightTheme) {
      $('.menu__wrapper').css('background-color', '#fff')
      $('.menu__close').css('background-color', '#333')
      $('.menu__close span').css('background-color', '#fff')
      $('.menu__title').css('color', 'rgba(51, 51, 51, 0.3)')

      const items = [...document.querySelectorAll('.menu__item')]
      for (let i = 0; i < items.length; i++) {
        $(items[i]).css('color', '#333')
      }

      const imgs = [...document.querySelectorAll('.menu__social > a')]
      imgs[0].children[0].setAttribute(
        'src',
        'assets/pictures/social/Facebook icon.svg'
      )
      imgs[1].children[0].setAttribute(
        'src',
        'assets/pictures/social/Instagram icon.svg'
      )
      imgs[2].children[0].setAttribute(
        'src',
        'assets/pictures/social/VK icon.svg'
      )

      $('.menu__email').css('color', '#333')
    } else {
      $('.menu__wrapper').css('background-color', '#333')
      $('.menu__close').css('background-color', '#fff')
      $('.menu__close span').css('background-color', '#333')
      $('.menu__title').css('color', 'rgba(255, 255, 255, 0.3)')

      const items = [...document.querySelectorAll('.menu__item')]
      for (let i = 0; i < items.length; i++) {
        $(items[i]).css('color', '#fff')
      }

      const imgs = [...document.querySelectorAll('.menu__social > a')]
      imgs[0].children[0].setAttribute(
        'src',
        'assets/pictures/social/Facebook icon-darken.svg'
      )
      imgs[1].children[0].setAttribute(
        'src',
        'assets/pictures/social/Instagram icon-darken.svg'
      )
      imgs[2].children[0].setAttribute(
        'src',
        'assets/pictures/social/VK icon-darken.svg'
      )

      $('.menu__email').css('color', '#fff')
    }

    $('.menu').css({ display: 'flex', opacity: 1 })
    $('.menu__overlay').css('display', 'block')
    $('.first').marquee('pause')

    $('body').css('overflow-y', 'hidden')

    anime({
      targets: '.menu__overlay',
      opacity: 1,
      duration: 1000,
      easing: 'easeOutExpo',
    })

    anime({
      targets: '.menu__wrapper',
      opacity: 1,
      translateX: ['100%', '0'],
      duration: 1000,
      delay: 500,
      easing: 'easeOutExpo',
      begin: function () {
        $('.menu__wrapper').css('display', 'block')
      },
    })
  })

  $('.menu__wrapper-close').on('click', () => {
    $('body').css('overflow-y', 'unset')
    $('.first').marquee('resume')
    anime({
      targets: '.menu__wrapper',
      opacity: 0,
      translateX: ['0', '100%'],
      duration: 1000,
      easing: 'easeOutExpo',
      complete: function () {
        $('.menu__wrapper').css('display', 'none')
      },
    })

    anime({
      targets: '.menu__overlay',
      opacity: 0,
      duration: 1000,
      delay: 500,
      easing: 'easeOutExpo',
      complete: function () {
        $('.menu').css({ display: 'none', opacity: 0 })
        $('.menu__overlay').css('display', 'none')
      },
    })
  })

  $('.offer__purchase-card').each(function () {
    $(this).on('click', () => {
      if (lightTheme) {
        $('.first').marquee('pause')
      } else {
        $('.second').marquee('pause')
      }

      $('.modal').css('display', 'block')
      $('.modal__overlay').css('display', 'block')
      $('.modal__wrapper').css('display', 'block')
      $('.modal__back').css('display', 'block')

      anime({
        targets: '.modal__overlay',
        opacity: 1,
        duration: 1000,
        easing: 'easeOutExpo',
      })

      anime({
        targets: '.modal__wrapper',
        opacity: 1,
        translateY: ['100%', '-50%'],
        translateX: ['-50%', '-50%'],
        delay: 500,
        duration: 1000,
        easing: 'easeOutExpo',
      })

      anime({
        targets: '.modal__back',
        opacity: 1,
        translateY: ['100%', 'calc(-50% + 5px)'],
        translateX: ['calc(-50% + 5px)', 'calc(-50% + 5px)'],
        delay: 500,
        duration: 1000,
        easing: 'easeOutExpo',
      })
    })
  })

  $('.modal__close').on('click', () => {
    closeModal()
  })

  $('.button-next').on('click', (e) => {
    e.preventDefault()

    const success = (position) => {
      position.coords.latitude, position.coords.longitude
    }

    const error = () => {
      console.log('error')
    }

    navigator.geolocation.getCurrentPosition(success, error)

    $('.modal__button-wrapper button').each(function (index) {
      $(this).toggleClass('hidden')
    })

    $('.modal__title').each(function () {
      $(this).toggleClass('hidden')
    })

    $('.modal__form input').each(function () {
      $(this).toggleClass('hidden')
    })

    $('.modal__form label').toggleClass('hidden')
    $('.modal__wrapper-city').toggleClass('hidden')
    $('.city-search__search').toggleClass('hidden')

    const searchResults = document.querySelector('.search-results')
    let s = ''
    const autocomplite = (val) => {
      const regex = new RegExp(val, 'gi')
      const citiesFilter = cities.filter(
        (e) => e.city === $('.city-show').text()
      )

      return citiesFilter.map((e) =>
        e.fullAddress.match(regex) ? e.fullAddress : null
      )
    }

    document
      .querySelector('.city-search__search')
      .addEventListener('input', (e) => {
        let showResult = []

        console.log(e)

        e.data ? (s += e.data) : (s = s.slice(0, s.length - 1))

        if (s.length !== 0) {
          searchResults.innerHTML = ''
          showResult = autocomplite(s)

          for (let i = 0; i < showResult.length; i++) {
            if (showResult[i]) {
              const t = cities.filter((e) => e.fullAddress === showResult[i])[0]

              searchResults.innerHTML += `<li class="search-results__item" onclick="searchClick(this)" data-id="${
                citiesCoords[t.id]
              }">${showResult[i]}</li>`
            }
          }
        } else {
          searchResults.innerHTML = ''
        }
      })

    if (!mapAgain) {
      DG.then(function () {
        map = DG.map('map', {
          center: [52.283436, 104.296835],
          zoom: 17,
          fullscreenControl: false,
          zoomControl: false,
        })
        citiesCoords.map((e) => {
          DG.marker([e.split(',')[0], e.split(',')[1]])
            .on('click', (el) => {
              const idx = citiesCoords.indexOf(
                `${el.latlng.lat},${el.latlng.lng}`
              )
              $('.city-search__search').val(cities[idx].fullAddress)
            })
            .addTo(map)
        })
      })
    }
  })

  $('.modal__overlay').on('click', function (e) {
    if (e.target.classList.contains('modal__overlay')) {
      closeModal()
    }
  })

  $('.city-map__title > span').on('click', () => {
    $('.city-map__choose').css('display', 'block')
  })

  $('.city-map__chosen').each((i, el) => {
    $(el).on('click', (e) => {
      $('.city-show').text(e.target.textContent)
      $('.city-map__choose').css('display', 'none')
    })
  })
})

function searchClick(e) {
  $('.city-search__search').val(e.textContent)
  const coords = $(e)[0].dataset.id
  map.setView([coords.split(',')[0], coords.split(',')[1]], 17)
  $('.search-results li').each((i, el) => {
    $(el).remove()
  })
}

function closeModal() {
  if (lightTheme) {
    $('.first').marquee('resume')
  } else {
    $('.second').marquee('resume')
  }

  mapAgain = true

  $('.modal__button-wrapper button').each(function (index) {
    $(this).toggleClass('hidden')
  })

  $('.modal__title').each(function () {
    $(this).toggleClass('hidden')
  })

  $('.modal__form input').each(function () {
    $(this).toggleClass('hidden')
  })

  $('.modal__form label').toggleClass('hidden')
  $('.modal__wrapper-city').toggleClass('hidden')
  $('.city-search__search').toggleClass('hidden')

  anime({
    targets: '.modal__wrapper',
    opacity: 0,
    translateY: ['-50%', '100%'],
    translateX: ['-50%', '-50%'],
    duration: 1000,
    easing: 'easeOutExpo',
    complete: function () {
      $('.modal__wrapper').css('display', 'none')
    },
  })

  anime({
    targets: '.modal__back',
    opacity: 0,
    translateY: ['calc(-50% + 5px)', '100%'],
    translateX: ['calc(-50% + 5px)', 'calc(-50% + 5px)'],
    duration: 1000,
    easing: 'easeOutExpo',
    complete: function () {
      $('.modal__back').css('display', 'none')
    },
  })

  anime({
    targets: '.modal__overlay',
    opacity: 0,
    delay: 500,
    duration: 600,
    easing: 'easeOutExpo',
    complete: function () {
      $('.modal').css('display', 'none')
      $('.modal__overlay').css('display', 'none')
    },
  })
}
