import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {ProfileImageCutter} from "./ProfileImageCutter";

interface Props {
    isOpenModal: boolean
    picture: File | undefined
    onLoadPhoto: (photo: File) => void
    triggerModal: () => void
}

const ProfilePictureModal: React.FC<Props> = ({isOpenModal, picture, onLoadPhoto, triggerModal}) => {
    const [isOpen, setIsOpen] = useState<boolean>(isOpenModal)
    const [base64picture, setBase64picture] = useState<string>('')
    const [fileName, setFileName] = useState<string>('')

    if (picture)
        toBase64(picture)

    const onCloseModal = () => {
        setIsOpen(false)
        triggerModal()
    }


    function toBase64(file: File) {
        const reader = new FileReader()
        reader.readAsBinaryString(file)

        reader.onload = () => {
            if (picture)
                setFileName(picture.name)
            if (typeof reader.result === 'string') {
                setBase64picture(`data:image/gif;base64,${btoa(reader.result)}`)
            }
        }
        reader.onerror = () => console.log('there are some problems')
    }

    const getCroppedPicture = value => {
        onLoadPhoto(value)
        onCloseModal()
    }

    return (
        <Dialog open={isOpen}
                fullWidth={true}
                className="MuiDialog-paperFullWidth"
                onClose={onCloseModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                Загрузка фотографии профиля
            </DialogTitle>

            <DialogContent>
                <ProfileImageCutter picture={base64picture}
                                    fileName={fileName}
                                    onClose={onCloseModal}
                                    getCrop={getCroppedPicture}/>
            </DialogContent>
        </Dialog>
    )
}

export default ProfilePictureModal