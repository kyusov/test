document.addEventListener('DOMContentLoaded', () => {
  const svgRight = document.querySelector('.svg-slider-right')
  const pathRight = document.querySelector('.svg-slider-right > path')

  const clipPathRight = document.querySelector(
    '.svg-slider-right > defs > clipPath > path'
  )

  const width = svgRight.clientWidth - 40
  const height = svgRight.clientHeight + 100
  const offset = 40
  const pip = 40

  const arrowCircle = document.querySelector('.arrow-slider')
  arrowCircle.style.transform =
    'translateY(' + (height / 2 - 120) + 'px) translateX(200%)'

  var shiftX
  var shiftY
  var widthInner

  if (window.innerWidth < 770) {
    $('.text').css('display', 'none')
    let width = svgRight.clientWidth - 20
    let offset = 10
    pathRight.setAttribute('d', getPath(width, height, offset, pip, true, height / 5))
    clipPathRight.setAttribute(
      'd',
      getPath(width, height, offset, pip, true, 0)
    )

    arrowCircle.style.display = 'none'

    anime({
      targets: pathRight,
      d: [
        {
          value: [
            getPath(width, height, offset, 0, false, height / 5),
            getPath(width, height, offset, pip, true, height / 5),
          ],
        },
      ],
      easing: 'easeInQuad',
    })

    const touchEnd = (e) => {
      e.preventDefault()
      anime({
        targets: [pathRight, clipPathRight],
        d: [
          {
            value: getPath(width, height, offset, pip, true, height / 5),
          },
        ],
        duration: 0,
        easing: 'easeInQuad',
      })
      svgRight.style.width = '50px'
    }

    const touchStart = (e) => {
      e.preventDefault()
      shiftX = e.targetTouches[0].clientX + pip + 50
      shiftY = e.targetTouches[0].clientY + 60

      widthInner = svgRight.clientWidth - 20

      pathRight.setAttribute(
        'd',
        getPath(widthInner, height, offset, 0, false, height / 5)
      )
    }

    function moveAt(pageX, pageY) {
      const x = pageX - shiftX
      const y = pageY - shiftY

      svgRight.style.width = Math.abs(x) + 20 + 'px'
      widthInner = svgRight.clientWidth - 20

      pathRight.setAttribute(
        'd',
        getPath(widthInner, height, offset, Math.abs(x), true, y + height / 5)
      )

      if (Math.abs(x) >= window.innerWidth - window.innerWidth / 4) {
        svgRight.style.width = '100%'

        svgRight.removeEventListener('touchmove', touchMove)
        svgRight.removeEventListener('touchstart', touchStart)
        svgRight.removeEventListener('touchend', touchEnd)

        pathRight.setAttribute(
          'd',
          getPath(svgRight.clientWidth, height, offset, Math.abs(x), true, y + height / 5)
        )

        anime({
          targets: [
            '.white .header',
            '.white .marquee',
            '.white .offer',
            '.white .privilege',
            '.white .promo',
            '.white .partners',
            '.white .contacts',
          ],
          opacity: [1, 0],
          easing: 'easeInQuad',
        })

        anime({
          targets: pathRight,
          d: [
            {
              value: [
                getPath(
                  svgRight.clientWidth,
                  height,
                  offset,
                  Math.abs(x),
                  true,
                  y + height / 5
                ),
                getPath(0, height, svgRight.clientWidth, 0, false, height / 5),
              ],
            },
          ],
          easing: 'spring(1, 30, 10, 0)',
          duration: 2000,
          complete: () => {
            window.location.href = '/partners'
          },
        })
      }
    }

    function touchMove(e) {
      moveAt(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
    }

    svgRight.addEventListener('touchmove', touchMove)

    svgRight.addEventListener('touchstart', touchStart)
    svgRight.addEventListener('touchend', touchEnd)
  } else {

    const clickedHandler = () => {
      // svgRight.style.width = '100%'
      // console.log('click')
      // anime({
      //   targets: [
      //     '.white .header',
      //     '.white .marquee',
      //     '.white .offer',
      //     '.white .privilege',
      //     '.white .promo',
      //     '.white .partners',
      //     '.white .contacts',
      //   ],
      //   opacity: [1, 0],
      //   easing: 'easeInQuad',
      // })
      // anime({
      //   targets: pathRight,
      //   d: [
      //     {
      //       value: [
      //         getPath(
      //           svgRight.clientWidth,
      //           height,
      //           offset,
      //           0,
      //           true,
      //           0
      //         ),
      //         getPath(0, height, svgRight.clientWidth, 0, false, 0),
      //       ],
      //     },
      //   ],
      //   easing: 'spring(1, 30, 10, 0)',
      //   duration: 2000,
      //   complete: () => {
      //     window.location.href = '/partners?ot=' + $(window).scrollTop()
      //   },
      // })
    }

    pathRight.addEventListener('click', clickedHandler)
    pathRight.setAttribute('d', getPath(width, height, offset, 0, false, 0))
    clipPathRight.setAttribute('d', getPath(width, height, offset, 0, false, 0))


    const mouseLeave = () => {
      svgRight.removeEventListener('mouseleave', mouseLeave)

      anime({
        targets: '.arrow-slider',
        translateX: ['25%', '200%'],
        easing: 'spring(2, 45, 10, 0)',
        duration: 100
      })

      anime({
        targets: '.text',
        right: ['-30%', '0'],
        opacity: 1,
        easing: 'spring(1, 30, 10, 0)',
        duration: 200
      })

      anime({
        targets: [pathRight, clipPathRight],
        d: [
          {
            value: getPath(svgRight.clientWidth - 40, height, offset - 10, 0, false, 100),
          },
        ],
        duration: 250,
        easing: 'easeInQuad',
        complete: () => {
          setTimeout(() => {
            svgRight.style.width = '50px'
            pathRight.setAttribute('d', getPath(svgRight.clientWidth - 40, height, offset - 10, 0, false, 100))
            svgRight.addEventListener('mouseenter', mouseEnter)
          }, 100)
        }
      })
      
      pathRight.removeEventListener('mousedown', mouseDown)
      pathRight.removeEventListener('click', clickedHandler)
    }

    const mouseEnter = () => {
      svgRight.removeEventListener('mouseenter', mouseEnter)

      anime({
        targets: '.text',
        right: '-30%',
        opacity: 0,
        easing: 'spring(1, 30, 10, 0)',
        duration: 400
      })

      anime({
        targets: '.arrow-slider',
        translateX: ['200%', '25%'],
        easing: 'spring(2, 40, 20, 5)',
        delay: 100
      })

      svgRight.style.width = '100px'

      anime({
        targets: pathRight,
        d: [
          {
            value: [
              getPath(svgRight.clientWidth - 40, height, offset - 10, 0, false, 100),
              getPath(svgRight.clientWidth - 40, height, offset - 10, 55, false, 100)
            ]
          }
        ],
        easing: 'easeInQuad',
        duration: 250,
        complete: () => {
          svgRight.addEventListener('mouseleave', mouseLeave)
        }
      })

      // pathRight.addEventListener('mousedown', mouseDown)
    }

    const mouseDown = function (e) {
      svgRight.removeEventListener('mouseleave', mouseLeave)
      svgRight.removeEventListener('mouseenter', mouseEnter)

      let shiftX = e.clientX + pip + 50
      let shiftY = e.clientY + 60

      let widthInner = svgRight.clientWidth - 20

      pathRight.setAttribute(
        'd',
        getPath(widthInner, height, offset, 0, false, 0)
      )

      moveAt(e.screenX, e.screenY)

      function moveAt(pageX, pageY) {
        const x = pageX - shiftX
        const y = pageY - shiftY

        svgRight.style.width = Math.abs(x) + 20 + 'px'
        widthInner = svgRight.clientWidth - 20

        pathRight.setAttribute(
          'd',
          getPath(widthInner, height, offset, Math.abs(x), true, y)
        )

        if (Math.abs(x) >= window.innerWidth / 4) {
          svgRight.style.width = '100%'
          document.removeEventListener('mousemove', onMouseMove)
          svgRight.onmouseup = null
          svgRight.ontouchend = null

          pathRight.setAttribute(
            'd',
            getPath(svgRight.clientWidth, height, offset, Math.abs(x), true, y)
          )

          pathRight.removeEventListener('mousedown', mouseDown)

          anime({
            targets: [
              '.white .header',
              '.white .marquee',
              '.white .offer',
              '.white .privilege',
              '.white .promo',
              '.white .partners',
              '.white .contacts',
            ],
            opacity: [1, 0],
            easing: 'easeInQuad',
          })

          anime({
            targets: pathRight,
            d: [
              {
                value: [
                  getPath(
                    svgRight.clientWidth,
                    height,
                    offset,
                    Math.abs(x),
                    true,
                    y
                  ),
                  getPath(0, height, svgRight.clientWidth, 0, false, 0),
                ],
              },
            ],
            easing: 'spring(1, 30, 10, 0)',
            duration: 2000,
            complete: () => {
              window.location.href = '/partners?ot=' + $(window).scrollTop()
            },
          })
        }
      }

      function onMouseMove(e) {
        moveAt(e.screenX, e.screenY)
      }

      document.addEventListener('mousemove', onMouseMove)

      svgRight.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove)

        anime({
          targets: pathRight,
          d: [
            {
              value: getPath(width, height, offset, 0, false, 0),
            },
          ],
        })

        svgRight.style.width = '50px'
        svgRight.addEventListener('mouseleave', mouseLeave)
        svgRight.addEventListener('mouseenter', mouseEnter)

        svgRight.onmouseup = null
        svgRight.ontouchend = null
      }
    }

    arrowCircle.addEventListener('click', () => {
      
      svgRight.style.width = '100%'

      anime({
        targets: '.arrow-slider',
        opacity: [1, 0],
        easing: 'easeInQuad',
        duration: 100
      })

      anime({
        targets: [
          '.white .header',
          '.white .marquee',
          '.white .offer',
          '.white .privilege',
          '.white .promo',
          '.white .partners',
          '.white .contacts',
        ],
        opacity: [1, 0],
        easing: 'easeInQuad',
      })
      anime({
        targets: pathRight,
        d: [
          {
            value: [
              getPath(svgRight.clientWidth - 40, height, offset - 10, 55, false, 100),
              getPath(0, height, svgRight.clientWidth, 0, false, 100),
            ],
          },
        ],
        easing: 'spring(1, 30, 10, 0)',
        duration: 2000,
        complete: () => {
          window.location.href = '/partners?ot=' + $(window).scrollTop()
        },
      })
    })

    svgRight.addEventListener('mouseenter', mouseEnter)

    pathRight.addEventListener('dragstart', () => {
      return false
    })
  }
})

function getPath(w, h, offset, pip = 0, resize = false, y = 0) {
  return `
  M${w} 0 
  H${w + offset} 
  V${h} 
  H${w} 
  V${h / 2 + y} 
  C
  ${resize ? w - offset : w} ${h / 2 - 150 + y} 
  ${w - pip} ${h / 2 - 150 + y} 
  ${w - pip} ${h / 2 - 200 + y} 
  S
  ${w} ${h / 2 - 250 + y} 
  ${w} ${h / 2 - 400 + y} 
  V0 
  Z`
}
