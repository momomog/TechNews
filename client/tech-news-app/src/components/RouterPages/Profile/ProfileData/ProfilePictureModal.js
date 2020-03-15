import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {ProfileImageCutter} from "./ProfileImageCutter";

class ProfilePictureModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpenModal,
            picture: props.picture,
            base64picture: undefined,
            fileName: undefined
        }

        if (props.picture)
            this.toBase64(props.picture)
    }

    onCloseModal = () => {
        this.setState({isOpen: false})
        this.props.triggerModal(false)
    }


    toBase64 = file => {
        const me = this,
            reader = new FileReader();

        reader.readAsBinaryString(file);

        reader.onload = function () {
            me.setState({fileName: me.props.picture.name})
            me.setState({base64picture: `data:image/gif;base64,${btoa(reader.result)}`})
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