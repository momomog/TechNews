import React from "react";
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

interface State {
    isOpen: boolean,
    picture: File,
    base64picture: any,
    fileName: string
}

class ProfilePictureModal extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpenModal,
            picture: props.picture,
            base64picture: undefined,
            fileName: ''
        }

        if (props.picture)
            this.toBase64(props.picture)
    }

    onCloseModal = () => {
        this.setState({isOpen: false})
        this.props.triggerModal()
    }


    toBase64 = (file: File) => {
        const me = this,
            reader = new FileReader();

        reader.readAsBinaryString(file);

        reader.onload = function () {
            if (me.props.picture)
                me.setState({fileName: me.props.picture.name})
            if (typeof reader.result === "string") {
                me.setState({base64picture: `data:image/gif;base64,${btoa(reader.result)}`})
            }
        }
        reader.onerror = function () {
            console.log('there are some problems')
        }

    }

    getCroppedPicture = value => {
        this.props.onLoadPhoto(value)
        this.onCloseModal()
    }

    render() {
        return (
            <Dialog open={this.state.isOpen}
                    className="MuiDialog-paperWidth"
                    onClose={this.onCloseModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Загрузка фотографии профиля
                </DialogTitle>

                <DialogContent>
                    <ProfileImageCutter picture={this.state.base64picture}
                                        fileName={this.state.fileName}
                                        onClose={this.onCloseModal}
                                        getCrop={this.getCroppedPicture}/>
                </DialogContent>
            </Dialog>
        )
    }
}

export default ProfilePictureModal