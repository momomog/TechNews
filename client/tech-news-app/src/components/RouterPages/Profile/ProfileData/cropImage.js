const createImage = url =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', error => reject(error))
        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        image.src = url
    })

export default async function getCroppedImg(imageSrc, pixelCrop, fileName) {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const maxSize = Math.max(image.width, image.height)
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

    canvas.width = safeArea
    canvas.height = safeArea

    ctx.translate(safeArea / 2, safeArea / 2)
    ctx.translate(-safeArea / 2, -safeArea / 2)

    // draw rotated image and store data.
    ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
    )
    const data = ctx.getImageData(0, 0, safeArea, safeArea)

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
        data,
        0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
        0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
    )

    return new Promise(resolve => {
        canvas.toBlob(blob => {
            blob.lastModifiedDate = new Date();
            const file = new File([blob], fileName);

            resolve(file)
        }, 'image/jpeg', )
    })
}

export const imageCropStyles = theme => ({
    cropContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
        background: '#333',
        [theme.breakpoints.up('sm')]: {
            height: 400
        }
    },
    cropButton: {
        flexShrink: 0,
        marginLeft: 16
    },
    controls: {
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center'
        }
    },
    sliderContainer: {
        display: 'flex',
        flex: '1',
        alignItems: 'center'
    },
    sliderLabel: {
        [theme.breakpoints.down('xs')]: {
            minWidth: 65
        }
    },
    slider: {
        padding: '22px 0px',
        marginLeft: 16,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: '0 16px'
        }
    }
})
