var flag = true

window.onload = () => {
  new Marquee('.second', {
    continuos: true,
    direction: 'rtl',
  })

  $(window).scrollTop(window.location.search.replace('?', '').split('=')[1])

  anime({
    targets: [
      '.darken .header',
      '.darken .marquee',
      '.darken .offer',
      '.darken .offer',
      '.darken .privilege',
      '.darken .promo',
      '.darken .partners',
      '.darken .contacts',
    ],
    opacity: [0, 1],
    easing: 'easeInQuad',
  })

  if (window.innerWidth < 550) {
    anime({
      targets: '.check-card',
      translateX: ['-5%', '5%'],
      translateY: ['-2%', '2%'],
      easing: 'easeInQuad',
      direction: 'alternate',
      loop: true,
    })
  } else {
    anime({
      targets: '.check-card',
      translateX: ['-5%', '5%'],
      translateY: ['-2%', '2%'],
      easing: 'easeInQuad',
      direction: 'alternate',
      loop: true,
    })
  }
}

function basketAnimation() {
  if (window.innerWidth <= 550) {
    anime({
      targets: '.basket-front',
      opacity: [0, 1],
      translateX: ['-60%', '0%'],
      translateY: ['-38%', '0%'],
      easing: 'spring(1, 40, 10, 0)',
    })

    anime({
      targets: '.basket-back',
      opacity: [0, 1],
      translateX: ['-60%', '0%'],
      translateY: ['-38%', '8.5%'],
      easing: 'spring(1, 40, 10, 0)',
    })

    anime({
      targets: '.basket-bag-big',
      opacity: [0, 1],
      translateY: ['-100%', '-17%'],
      easing: 'easeOutQuart',
      delay: 300,
    })

    anime({
      targets: '.basket-bag-middle',
      opacity: [0, 1],
      translateY: ['-150%', '-17%'],
      easing: 'easeOutQuart',
      delay: 200,
    })

    anime({
      targets: '.basket-bag-top',
      opacity: [0, 1],
      translateY: ['-150%', '-17%'],
      easing: 'easeOutQuart',
      delay: 200,
    })
  } else {
    anime({
      targets: '.basket-front',
      opacity: [0, 1],
      translateX: ['-60%', '0%'],
      translateY: ['-38%', '0%'],
      easing: 'spring(1, 40, 10, 0)',
    })

    anime({
      targets: '.basket-back',
      opacity: [0, 1],
      translateX: ['-60%', '0%'],
      translateY: ['-38%', '0%'],
      easing: 'spring(1, 40, 10, 0)',
    })

    anime({
      targets: '.basket-bag-big',
      opacity: [0, 1],
      translateY: ['-100%', '0%'],
      easing: 'easeOutQuart',
      delay: 300,
    })

    anime({
      targets: '.basket-bag-middle',
      opacity: [0, 1],
      translateY: ['-150%', '0%'],
      easing: 'easeOutQuart',
      delay: 200,
    })

    anime({
      targets: '.basket-bag-top',
      opacity: [0, 1],
      translateY: ['-150%', '0%'],
      easing: 'easeOutQuart',
      delay: 200,
    })
  }

  flag = false
}

function smilesAnimation(show) {
  if (show) {
    $('.smiles').css('animation-play-state', 'running')
    $('.smiles-faster').css('animation-play-state', 'running')
  } else {
    $('.smiles').css('animation-play-state', 'paused')
    $('.smiles-faster').css('animation-play-state', 'paused')
  }
}

$(window).scroll(function () {
  if (
    $(this).scrollTop() > $('.smiles').closest('div').offset().top - 250 ||
    $(this).scrollTop() < $('.smiles').closest('div').offset().top - 250
  ) {
    if (
      $(this).scrollTop() >
        $('.smiles').closest('div').height() +
          $('.smiles').closest('div').offset().top ||
      $(this).scrollTop() < $('.smiles').closest('div').offset().top - 500
    ) {
      smilesAnimation(false)
    } else {
      smilesAnimation(true)
    }
  }

  if (
    $(this).scrollTop() >
      $('.basket-front').closest('div').offset().top - 250 &&
    $(this).scrollTop() < $('.basket-front').closest('div').offset().top + 500
  ) {
    if (flag) {
      basketAnimation()
    }
  }
})

$(document).ready(() => {
  $('.header__menu-btn').on('click', (e) => {
    if ($('.header__menu-btn').hasClass('close')) {
      menuClose()
    } else {
      menuOpen()
    }
  })

  $('.offer__partner-card').each(function () {
    $(this).on('click', () => {
      // $('.second').marquee('pause')
      modalOpen()
    })
  })

  $('.modal__close').on('click', () => {
    $('body').css('overflow', 'unset')
    modalClose()
  })

  $('.modal__overlay').on('click', (e) => {
    if (e.target.classList.contains('modal__overlay')) {
      modalClose()
    }
  })

  $('a[href="#buy"]').on('click', () => {
    menuClose()
    modalOpen()
  })

  $('a[href="#part"]').on('click', () => {
    menuClose()
    modalOpen()
  })

  $('a[href="#privilege"]').on('click', () => {
    menuClose()
    setTimeout(() => {
      $('html, body').animate({
        'scrollTop': $('#priv').offset().top
      }, 2000)
    }, 100)
  })

  $('a[href="#contacts"]').on('click', () => {
    menuClose()
    setTimeout(() => {
      $('html, body').animate({
        'scrollTop': $('#cont').offset().top
      }, 2000)
    }, 100)
  })
})

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('body').style.backgroundColor = '#333'
})

function modalClose() {
  // $('.second').marquee('resume')
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

function menuOpen() {
  if (window.innerWidth < 616) {
    $('.header__logo').css('opacity', '0')
  } else {
    $('.header__logo').css('filter', 'blur(10px)')
  }

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
  imgs[2].children[0].setAttribute('src', 'assets/pictures/social/VK icon.svg')

  $('.menu__email').css('color', '#333')

  $('.menu').css({ display: 'flex', opacity: 1 })
  $('.menu__overlay').css('display', 'block')

  $('.header').css({
    zIndex: '11000',
  })

  $('.header__menu-btn')
    .css({
      backgroundColor: '#333',
      border: 'none',
      position: 'relative',
    })
    .addClass('close')
    .text('')
    .append(['<span></span>', '<span></span>'])

  $('.header__menu-btn span').each((i, e) => {
    $(e).css({
      width: '26px',
      height: '3px',
      backgroundColor: '#fff',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform:
        i === 0
          ? 'translate3d(-50%, -50%, 0) rotate(45deg)'
          : 'translate3d(-50%, -50%, 0) rotate(-45deg)',
    })
  })

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
}

function menuClose() {
  $('.header').css({
    zIndex: '500',
  })

  if (window.innerWidth < 616) {
    $('.header__logo').css('opacity', '1')
  } else {
    $('.header__logo').css('filter', 'none')
  }

  $('.header__menu-btn')
    .css({
      backgroundColor: '#fff',
      border: '1px solid #fff',
      position: 'unset',
    })
    .removeClass('close')
    .text('МЕНЮ')

  $('.header__menu-btn span').each((i, e) => {
    $(e).remove()
  })

  $('body').css('overflow-y', 'unset')
  // $('.first').marquee('resume')
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
}

function modalOpen() {
  $('body').css('overflow', 'hidden')
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
}
