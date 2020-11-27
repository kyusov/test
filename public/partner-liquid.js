document.addEventListener('DOMContentLoaded', () => {
  const svgLeft = document.querySelector('.svg-slider-left')
  const pathLeft = document.querySelector('.svg-slider-left > path')
  const clipPathLeft = document.querySelector(
    '.svg-slider-left > defs > clipPath > path'
  )

  const width = 20
  const height = svgLeft.clientHeight + 100

  const offset = 10
  const pip = -40

  var shiftX;
  var shiftY;
  var widthInner;

  if (window.innerWidth < 768) {
    pathLeft.setAttribute('d', getPath(width, height, offset, pip, true, 0))
    clipPathLeft.setAttribute('d', getPath(width, height, offset, pip, true, 0))

    anime({
      targets: pathLeft,
      d: [
        {
          value: [getPath(width, height, offset, 0, false, 0),getPath(width, height, offset, pip, true, 0)]
        }
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

      pathLeft.setAttribute('d', getPath(widthInner, height, offset, 0, false, 0))
    }

    function moveAt(pageX, pageY) {
      const x = pageX - shiftX
      const y = pageY - shiftY

      svgLeft.style.width = x + 20 + 'px'
      widthInner = 20

      pathLeft.setAttribute('d', getPath(widthInner, height, offset, -x, true, y))

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
    pathLeft.setAttribute('d', getPath(width, height, offset, 0, false, 0))

    clipPathLeft.setAttribute('d', getPath(width, height, offset, 0, false, 0))

    const mouseLeave = () => {
      anime({
        targets: [pathLeft, clipPathLeft],
        d: [
          {
            value: getPath(width, height, offset, 0, false, 0),
          },
        ],
        duration: 400,
        easing: 'easeInQuad',
      })
      svgLeft.style.width = '50px'
      pathLeft.removeEventListener('mousedown', mouseDown)
    }

    const mouseEnter = () => {
      anime({
        targets: [pathLeft, clipPathLeft],
        d: [
          {
            value: getPath(width, height, offset, pip, true, 0),
          },
        ],
        duration: 400,
        easing: 'easeInQuad',
      })
      pathLeft.addEventListener('mousedown', mouseDown)
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
              window.location.href = '/'
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
