import 'date-fns';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField";

class ProfileEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vk: new Date(),
            instagram: '',
            facebook: '',
            twitter: '',
        }
    }

    seth = (dataValue) => {
        debugger;
        this.setState({vk: dataValue})
    };

    render() {

        return (
            <div className="row">
                <div className="col-md-11 center-block ">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h4>Редактирование профиля</h4></div>
                        <div className="panel-body">
                            <div>
                                <h5 className="card-header w-100">Ссылки на социальные сети</h5>
                                <div className="row p-2 ml-4">
                                    <div className="col-6">
                                        <i id="social-fb" className="fa fa-vk social mr-2 mt-4 profile-edit-icon"/>
                                        <span className="mr-3 soc-name">vk.com/</span>
                                        <TextField id="standard-basic" label="ссылка на страницу vk" color="primary"/>
                                    </div>
                                    <div className="col-6">
                                        <i id="social-gp" className="fa fa-instagram social mr-2 mt-4 profile-edit-icon"/>
                                        <span className="mr-3 soc-name">instagram.com/ </span>
                                        <TextField id="standard-basic" label="ссылка на страницу vk" color="primary"/>
                                    </div>

                                </div>


                            </div>





                            <div className="row p-5">
                                <h5 className="card-header w-100">Основная информация</h5>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        format="MM/dd/yyyy"
                                        value={this.state.vk}
                                        onChange={this.seth}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProfileEdit;