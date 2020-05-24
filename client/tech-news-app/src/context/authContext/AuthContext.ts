import {createContext} from 'react'
import {UserInitial} from "../../models/UserModel";

export const AuthContext = createContext({isAuth:false, user: UserInitial})