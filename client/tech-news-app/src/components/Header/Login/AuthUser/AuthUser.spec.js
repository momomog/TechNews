import AuthUser from "./AuthUser";
import React from "react";
import sinon from 'sinon';
import {UserInitial} from "../../../../models/UserModel";


describe('AuthUser: ', () => {
    const initProps = {
        user: {
            ...UserInitial,
            firstName: 'Sergey'
        },
        isAuth: false,
        setIsAuth: () => {
        },
        setCurrentUserData: () => {
        }
    }

    test('isAuth dropdown test', () => {
        const props = {
            ...initProps,
            user: {
                ...UserInitial,
                firstName: 'Sergey'
            },
            isAuth: true
        }
        const component = shallow(<AuthUser {...props}/>)
        expect(component.find('button')).toHaveLength(1)
        expect(component.find('button').text().trim()).toEqual('Sergey')
    })

    test('simulation logout', () => {
        const setIsAuthClick = sinon.spy();
        const props = {
            ...initProps,
            isAuth: true,
            setIsAuth: setIsAuthClick,
            setCurrentUserData: setIsAuthClick
        }
        const component = shallow(<AuthUser {...props}/>)
        component.find('span').simulate('click');
        expect(setIsAuthClick).toHaveProperty('callCount', 2);
    })
})