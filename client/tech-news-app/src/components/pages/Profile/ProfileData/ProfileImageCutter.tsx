import React, {useCallback, useState} from 'react'
import Cropper from 'react-easy-crop'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import DialogActions from '@material-ui/core/DialogActions'

const Cutter = (props: any) => {
    const classes = props.classes

    const [crop, setCrop] = useState<{x: number, y: number}>({x: 0, y: 0})
    const [zoom, setZoom] = useState<number>(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const getCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(props.picture, croppedAreaPixels, props.fileName)
            props.getCrop(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, props])

    return (
        <>
            <div className={classes.cropContainer}>
                <Cropper image={props.picture}
                         crop={crop}
                         zoom={zoom}
                         aspect={3 / 3}
                         onCropChange={setCrop}
                         onCropComplete={onCropComplete}
                         onZoomChange={setZoom}/>
            </div>

            <div className={classes.controls}>
                <div className={classes.sliderContainer}>
                    <Typography variant="overline"
                                classes={{root: classes.sliderLabel}}>
                        Масштаб
                    </Typography>
                    <Slider value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Масштаб"
                            onChange={(e, zoom) => typeof zoom === 'number' && setZoom(zoom)}/>
                </div>

                <DialogActions className="ml-5">
                    <Button className="ml-5"
                            onClick={props.onClose}
                            color="primary">
                        Отменить
                    </Button>
                    <Button onClick={getCroppedImage}
                            color="primary">
                        Загрузить
                    </Button>
                </DialogActions>

            </div>
        </>
    )
}

const styles: any = (theme: any) => ({
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


export const ProfileImageCutter = withStyles(styles)(Cutter)

const createImage: any = url =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', error => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
    })

async function getCroppedImg(imageSrc, pixelCrop, fileName) {
    const image: HTMLImageElement = await createImage(imageSrc)
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const maxSize = Math.max(image.width, image.height)
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

    canvas.width = safeArea
    canvas.height = safeArea

    if (ctx) {
        ctx.translate(safeArea / 2, safeArea / 2)
        ctx.translate(-safeArea / 2, -safeArea / 2)
        ctx.drawImage(
            image,
            safeArea / 2 - image.width * 0.5,
            safeArea / 2 - image.height * 0.5
        )
        const data = ctx.getImageData(0, 0, safeArea, safeArea)

        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height

        ctx.putImageData(
            data,
            0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
            0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
        )
    }

    return new Promise(resolve => {
        canvas.toBlob((blob: any) => {
            blob.lastModifiedDate = new Date()
            const file = new File([blob], fileName)

            resolve(file)
        }, 'image/jpeg')
    })
}
