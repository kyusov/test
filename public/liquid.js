document.addEventListener('DOMContentLoaded', () => {
  const svgRight = document.querySelector('.svg-slider-right')
  const pathRight = document.querySelector('.svg-slider-right > path')

  const clipPathRight = document.querySelector(
    '.svg-slider-right > defs > clipPath > path'
  )

  const width = svgRight.clientWidth - 20
  const height = svgRight.clientHeight + 100
  const offset = 10
  const pip = 40

  if (window.innerWidth < 768) {
    pathRight.setAttribute('d', getPath(width, height, offset, pip, true, 0))
    clipPathRight.setAttribute('d', getPath(width, height, offset, pip, true, 0))

    anime({
      targets: pathRight,
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
        targets: [pathRight, clipPathRight],
        d: [
          {
            value: getPath(width, height, offset, pip, true, 0),
          },
        ],
        duration: 0,
        easing: 'easeInQuad',
      })
      svgRight.style.width = '50px'
    }

    const touchStart = (e) => {
      e.preventDefault()
      let shiftX = e.targetTouches[0].clientX + pip + 50
      let shiftY = e.targetTouches[0].clientY + 60

      let widthInner = svgRight.clientWidth - 20

      pathRight.setAttribute(
        'd',
        getPath(widthInner, height, offset, 0, false, 0)
      )

      moveAt(e.targetTouches[0].clientX, e.targetTouches[0].clientY)

      function moveAt(pageX, pageY) {
        const x = pageX - shiftX
        const y = pageY - shiftY

        svgRight.style.width = Math.abs(x) + 20 + 'px'
        widthInner = svgRight.clientWidth - 20

        pathRight.setAttribute(
          'd',
          getPath(widthInner, height, offset, Math.abs(x), true, y)
        )

        if (Math.abs(x) >= window.innerWidth - window.innerWidth / 4) {
          svgRight.style.width = '100%'

          svgRight.removeEventListener('touchstart', touchStart)
          svgRight.removeEventListener('touchend', touchEnd)
          document.removeEventListener('touchmove', touchMove)

          pathRight.setAttribute(
            'd',
            getPath(svgRight.clientWidth, height, offset, Math.abs(x), true, y)
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
                    y
                  ),
                  getPath(0, height, svgRight.clientWidth, 0, false, 0),
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

      document.addEventListener('touchmove', touchMove)
    }

    svgRight.addEventListener('touchstart', touchStart)
    svgRight.addEventListener('touchend', touchEnd)

  } else {
    pathRight.setAttribute('d', getPath(width, height, offset, 0, false, 0))

    clipPathRight.setAttribute('d', getPath(width, height, offset, 0, false, 0))

    const mouseLeave = () => {
      anime({
        targets: [pathRight, clipPathRight],
        d: [
          {
            value: getPath(width, height, offset, 0, false, 0),
          },
        ],
        duration: 400,
        easing: 'easeInQuad',
      })
      svgRight.style.width = '50px'
      pathRight.removeEventListener('mousedown', mouseDown)
    }

    const mouseEnter = () => {
      anime({
        targets: [pathRight, clipPathRight],
        d: [
          {
            value: getPath(width, height, offset, pip, true, 0),
          },
        ],
        duration: 400,
        easing: 'easeInQuad',
      })
      pathRight.addEventListener('mousedown', mouseDown)
      // pathRight.addEventListener('touchstart', mouseDown)
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
              window.location.href = '/partners'
            },
          })
        }
      }

      function onMouseMove(e) {
        moveAt(e.screenX, e.screenY)
      }

      document.addEventListener('mousemove', onMouseMove)
      // document.addEventListener('touchmove', onMouseMove)

      svgRight.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove)
        // document.removeEventListener('touchmove', onMouseMove)

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
        // svgRight.addEventListener('touchleave', mouseLeave)
        svgRight.addEventListener('mouseenter', mouseEnter)
        // svgRight.addEventListener('touchenter', mouseEnter)

        svgRight.onmouseup = null
        svgRight.ontouchend = null
      }
    }

    svgRight.addEventListener('mouseenter', mouseEnter)
    svgRight.addEventListener('mouseleave', mouseLeave)
    // svgRight.addEventListener('touchleave', mouseEnter)
    // svgRight.addEventListener('touchenter', mouseLeave)

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
