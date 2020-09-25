import React from "react"
import {Search} from "./Search"
import {Router} from "react-router"


describe('Search: ', () => {
    test('change search input test', () => {
        const historyMock = {push: jest.fn(), location: {}, listen: jest.fn()}

        const wrapper = mount(
            <Router history={historyMock}>
                <Search/>
            </Router>
        )

        wrapper.find('input').at(0).simulate('change', {target: {value: 50}})
        expect(wrapper.find('input').at(0).getDOMNode().value).toEqual('50')
    })
})