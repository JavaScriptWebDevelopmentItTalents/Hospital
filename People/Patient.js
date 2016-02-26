/*global validator, Person*/
var Patient = (function iife(parent) {
    'use strict';
    function Patient(firstName, lastName, gender, treatmentPlan) {
        parent.call(this, firstName, lastName, gender);
        this.treatmentPlan = treatmentPlan;
        this.departmentId = -1;
        this.roomId = -1;
    }

    return Patient;
}(Person));