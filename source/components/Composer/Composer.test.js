import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';
import avatar from '../../theme/assets/lisa.png';

const props = {
    _createPost:          jest.fn(),
    currentUserFirstName: 'Антон',
    avatar,
};

const comment = 'Merry christmas';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');

describe('composer component:', () => {
    test('should have 1 "section" element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 "form" element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 "textarea" element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 "input" element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have 1 "img" element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change property', () => {
        result.setState({
            comment,
        });
        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({
            comment: '',
        });

        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea "change" event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });

        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });

    test('should handle form "submit" event', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('_createPost should be invoked once after form submission', () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit class methods should be inviked once after form is submitted', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    test('_submitComment should return null if been called with empty string', () => {
        result.setState({
            comment: '',
        });
        result.instance()._submitComment();
        expect(_submitCommentSpy).toHaveReturnedWith(null);
        jest.clearAllMocks();
    });

    test('should have string props "avatar" and "currentUserFirstName"', () => {
        expect(typeof props.avatar).toBe('string');
        expect(typeof props.currentUserFirstName).toBe('string');
    });

    test('method _submitOnEnter should be exist', () => {
        expect(typeof result.instance()._submitOnEnter).toBe('function');
    });

    test('_submitOnEnter should call the _submitComment class method once, being called as the keyPres event handler, after pressing the Enter key,', () => {
        result.find('textarea').simulate('keydown', {
            target: {
                value: comment,
            },
            key:            'Enter',
            preventDefault: () => {},
        });

        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
    });
});
