import React, {useCallback, useState} from 'react'
import Cropper from 'react-easy-crop'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import getCroppedImg from './cropImage'
import {imageCropStyles as styles} from './cropImage'
import Slider from "@material-ui/core/Slider";
import DialogActions from "@material-ui/core/DialogActions";

const Cutter = (props) => {
    const classes = props.classes;

    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)
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
    }, [croppedAreaPixels])

    return (
        <div>
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
                            onChange={(e, zoom) => setZoom(zoom)}/>
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
        </div>
    )
}

export const ProfileImageCutter = withStyles(styles)(Cutter)