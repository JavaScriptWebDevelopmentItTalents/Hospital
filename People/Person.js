/*global validator*/
var Person = (function iife(global) {
    'use strict';
    function Person(firstName, lastName, gender) {
        var _firstName,
            _lastName,
            _gender;
        firstName = firstName || '';
        lastName = lastName || '';
        gender = gender || global.CONSTANTS.GENDER.MALE;
        validator.validateIfString(firstName, 'Person firstName');
        validator.validateIfString(lastName, 'Person lastName');

        _firstName = firstName;
        _lastName = lastName;

        this.getFullName = function getFullName() {
            return _firstName + ' ' + _lastName;
        };
        this.getGender = function get(){
            return _gender;
        };
        this.setGender = function set(value){
            validator.validateIfString(value, 'Person gender');
             _gender = value;
        };

        this.setGender(gender);
    }
    return Person;
}(window));