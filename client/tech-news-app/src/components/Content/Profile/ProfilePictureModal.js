import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {StyledDemo} from "./ProfileData/ProfileImageCutter";

class ProfilePictureModal extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        this.state = {
            isOpen: props.isOpenModal,
            picture: props.picture,
            base64picture: undefined
        }

        if (props.picture)
            this.toBase64(props.picture)
    }

    onCloseModal = () => {
        this.props.triggerModal(false)
    }


    toBase64 = file => {
        const me = this;
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = function () {
            me.setState({base64picture: `data:image/gif;base64,${btoa(reader.result)}`})
        }
        reader.onerror = function () {
            console.log('there are some problems');
        }
    }

    render() {
        return (
            <Dialog
                open={this.state.isOpen}
                classes={'MuiDialog-paperWidth'}
                className="MuiDialog-paperWidth"
                onClose={this.onCloseModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Загрузка фотографии профиля
                </DialogTitle>

                <DialogContent>
                    <StyledDemo picture={this.state.base64picture}/>
                    {/*<img src={this.state.base64picture} alt="qwe"/>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCloseModal}
                            color="primary">
                        Отменить
                    </Button>
                    <Button
                        // onClick={this.onDeletePost}
                        color="primary">
                        Загрузить
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

}

export default ProfilePictureModal