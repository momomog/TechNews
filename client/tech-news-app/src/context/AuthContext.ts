import React, {createContext} from 'react'
import {User, UserInitial} from "../models/UserModel";

export type AppAuthContext = {
    isAuth: boolean
    user: User
}

export const AuthContext: React.Context<AppAuthContext> = createContext<AppAuthContext>({
    isAuth: false,
    user: UserInitial
})

AuthContext.displayName = 'AuthenticationContext'