document.addEventListener('DOMContentLoaded', () => {
  const svgLeft = document.querySelector('.svg-slider-left')
  const pathLeft = document.querySelector('.svg-slider-left > path')
  const clipPathLeft = document.querySelector(
    '.svg-slider-left > defs > clipPath > path'
  )

  const width = 40
  const height = svgLeft.clientHeight + 100

  const offset = 40
  const pip = -40

  var shiftX
  var shiftY
  var widthInner

  const arrowCircle = document.querySelector('.arrow-slider-left')
  arrowCircle.style.transform = 'translateY(' + (height / 2 - 120) + 'px) translateX(-200%)'


  if (window.innerWidth < 768) {
    $('.text-dark').css('display', 'none')
    let width = 20
    let offset = 10
    pathLeft.setAttribute('d', getPath(width, height, offset, pip, true, 0))
    clipPathLeft.setAttribute('d', getPath(width, height, offset, pip, true, 0))

    anime({
      targets: pathLeft,
      d: [
        {
          value: [
            getPath(width, height, offset, 0, false, 0),
            getPath(width, height, offset, pip, true, 0),
          ],
        },
      ],
      easing: 'easeInQuad',
    })

    const touchEnd = (e) => {
      e.preventDefault()
      anime({
        targets: [pathLeft, clipPathLeft],
        d: [
          {
            value: getPath(width, height, offset, pip, true, 0),
          },
        ],
        duration: 0,
        easing: 'easeInQuad',
      })
      svgLeft.style.width = '50px'
    }

    const touchStart = (e) => {
      e.preventDefault()
      shiftX = e.targetTouches[0].clientX + pip
      shiftY = e.targetTouches[0].clientY + 60

      widthInner = 20

      pathLeft.setAttribute(
        'd',
        getPath(widthInner, height, offset, 0, false, 0)
      )
    }

    function moveAt(pageX, pageY) {
      const x = pageX - shiftX
      const y = pageY - shiftY

      svgLeft.style.width = x + 20 + 'px'
      widthInner = 20

      pathLeft.setAttribute(
        'd',
        getPath(widthInner, height, offset, -x, true, y)
      )

      if (x >= window.innerWidth - window.innerWidth / 4) {
        svgLeft.style.width = '100%'

        svgLeft.removeEventListener('touchmove', touchMove)
        svgLeft.removeEventListener('touchstart', touchStart)
        svgLeft.removeEventListener('touchend', touchEnd)

        pathLeft.setAttribute('d', getPath(0, height, offset, -x, true, y))

        anime({
          targets: [
            '.darken .header',
            '.darken .marquee',
            '.darken .offer',
            '.darken .privilege',
            '.darken .promo',
            '.darken .partners',
            '.darken .contacts',
          ],
          opacity: [1, 0],
          easing: 'easeInQuad',
        })

        anime({
          targets: pathLeft,
          d: [
            {
              value: [
                getPath(0, height, offset, -x, true, y),
                getPath(
                  svgLeft.clientWidth,
                  height,
                  svgLeft.clientWidth,
                  0,
                  false,
                  0
                ),
              ],
            },
          ],
          easing: 'spring(1, 30, 10, 0)',
          duration: 2000,
          complete: () => {
            window.location.href = '/'
          },
        })
      }
    }

    function touchMove(e) {
      moveAt(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
    }

    svgLeft.addEventListener('touchmove', touchMove)

    svgLeft.addEventListener('touchstart', touchStart)
    svgLeft.addEventListener('touchend', touchEnd)
  } else {
    pathLeft.setAttribute('d', getPath(width, height, offset, 0, false, 100))

    clipPathLeft.setAttribute('d', getPath(width, height, offset, 0, false, 100))

    const mouseLeave = () => {
      svgLeft.removeEventListener('mouseleave', mouseLeave)

      anime({
        targets: '.arrow-slider-left',
        translateX: ['15%', '-100%'],
        easing: 'spring(2, 45, 10, 0)',
        duration: 100
      })

      anime({
        targets: '.text-dark',
        left: ['-30%', '0'],
        opacity: 1,
        easing: 'spring(1, 30, 10, 0)',
        duration: 200
      })
      
      anime({
        targets: [pathLeft, clipPathLeft],
        d: [
          {
            value: getPath(width, height, offset, 0, false, 100),
          },
        ],
        duration: 400,
        easing: 'easeInQuad',
        complete: () => {
          setTimeout(() => {
            svgLeft.style.width = '50px'
            pathLeft.setAttribute('d', getPath(width, height, offset, 0, false, 100)) // доделать клик
            svgLeft.addEventListener('mouseenter', mouseEnter)
          }, 100)
        }
      })
    }

    const mouseEnter = () => {
      svgLeft.removeEventListener('mouseenter', mouseEnter)

      anime({
        targets: '.text-dark',
        left: '-30%',
        opacity: 0,
        easing: 'spring(1, 30, 10, 0)',
        duration: 400
      })

      anime({
        targets: '.arrow-slider-left',
        translateX: ['-100%', '15%'],
        easing: 'spring(2, 40, 20, 5)',
        delay: 100
      })

      svgLeft.style.width = '100px'

      anime({
        targets: [pathLeft, clipPathLeft],
        d: [
          {
            value: [getPath(width, height, offset - 10, 0, false, 100), getPath(width, height, offset - 10, pip, false, 100)],
          },
        ],
        duration: 250,
        easing: 'easeInQuad',
        complete: () => {
          svgLeft.addEventListener('mouseleave', mouseLeave)
        }
      })

      // pathLeft.addEventListener('mousedown', mouseDown)
    }

    const mouseDown = function (e) {
      svgLeft.removeEventListener('mouseleave', mouseLeave)
      svgLeft.removeEventListener('mouseenter', mouseEnter)

      let shiftX = e.clientX + pip
      let shiftY = e.clientY + 60

      let widthInner = 20

      pathLeft.setAttribute(
        'd',
        getPath(widthInner, height, offset, 0, false, 0)
      )

      moveAt(e.screenX, e.screenY)

      function moveAt(pageX, pageY) {
        const x = pageX - shiftX
        const y = pageY - shiftY

        svgLeft.style.width = x + 20 + 'px'
        widthInner = 20

        pathLeft.setAttribute(
          'd',
          getPath(widthInner, height, offset, -x, true, y)
        )

        // для больших экранов
        if (x >= window.innerWidth / 4) {
          svgLeft.style.width = '100%'
          document.removeEventListener('mousemove', onMouseMove)
          svgLeft.onmouseup = null

          pathLeft.setAttribute('d', getPath(0, height, offset, -x, true, y))

          pathLeft.removeEventListener('mousedown', mouseDown)

          anime({
            targets: [
              '.darken .header',
              '.darken .marquee',
              '.darken .offer',
              '.darken .privilege',
              '.darken .promo',
              '.darken .partners',
              '.darken .contacts',
            ],
            opacity: [1, 0],
            easing: 'easeInQuad',
          })

          anime({
            targets: pathLeft,
            d: [
              {
                value: [
                  getPath(0, height, offset, -x, true, y),
                  getPath(
                    svgLeft.clientWidth,
                    height,
                    svgLeft.clientWidth,
                    0,
                    false,
                    0
                  ),
                ],
              },
            ],
            easing: 'spring(1, 30, 10, 0)',
            duration: 2000,
            complete: () => {
              window.location.href = '/?ot=' + $(window).scrollTop()
            },
          })
        }
      }

      function onMouseMove(e) {
        moveAt(e.screenX, e.screenY)
      }

      document.addEventListener('mousemove', onMouseMove)

      svgLeft.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove)

        anime({
          targets: pathLeft,
          d: [
            {
              value: getPath(width, height, offset, 0, false, 0),
            },
          ],
        })

        svgLeft.style.width = '50px'
        svgLeft.addEventListener('mouseleave', mouseLeave)
        svgLeft.addEventListener('mouseenter', mouseEnter)

        svgLeft.onmouseup = null
      }
    }

    arrowCircle.addEventListener('click', () => {
      svgLeft.style.width = '100%'

      anime({
        targets: '.arrow-slider-left',
        opacity: [1, 0],
        easing: 'easeInQuad',
        duration: 100
      })

      anime({
        targets: [
          '.darken .header',
          '.darken .marquee',
          '.darken .offer',
          '.darken .privilege',
          '.darken .promo',
          '.darken .partners',
          '.darken .contacts',
        ],
        opacity: [1, 0],
        easing: 'easeInQuad',
      })

      anime({
        targets: pathLeft,
        d: [
          {
            value: [
              getPath(0, height, offset - 10, pip, false, 100),
              getPath(svgLeft.clientWidth - 20, height, svgLeft.clientWidth - 10, 0, false, 100)
            ],
          },
        ],
        easing: 'spring(1, 30, 10, 0)',
        duration: 2000,
        complete: () => {
          window.location.href = '/?ot=' + $(window).scrollTop()
        },
      })


    })

    svgLeft.addEventListener('mouseenter', mouseEnter)
    svgLeft.addEventListener('mouseleave', mouseLeave)

    pathLeft.addEventListener('dragstart', () => {
      return false
    })
  }
})

function getPath(w, h, offset, pip = 0, resize = false, y = 0) {
  return `
    M${w} 0 
    H${w - offset} 
    V${h} 
    H${w} 
    V${h / 2 + y} 
    C
    ${resize ? w + offset : w} ${h / 2 - 150 + y} 
    ${w - pip} ${h / 2 - 150 + y} 
    ${w - pip} ${h / 2 - 200 + y} 
    S
    ${w} ${h / 2 - 250 + y} 
    ${w} ${h / 2 - 400 + y} 
    V0 
    Z`
}
