/*global validator, Person*/
var Nurse = (function iife(parent) {
    'use strict';
    function Nurse(firstName, lastName, gender, department) {
        parent.call(this, firstName, lastName, gender);
        this.department = department;
    }

    Nurse.prototype.giveMedicines = function giveMedicines() {
        for (var i = 0; i < this.department.rooms.length; i++) {
            if (this.department.rooms[i].patients) {
                for (var j = 0; j < this.department.rooms[i].patients.length; j++) {
                    var medicine = this.department.rooms[i].patients[j].treatmentPlan.medicines;
                    console.log('Сестра ' + this.getFullName() + ' даде на пациент '
                        + this.department.rooms[i].patients[j].getFullName() +
                        ' в стая ' + i + ' от отделение ' + this.department.name + ' лекарство: ' + medicine);
                }
            }
        }
    };
    return Nurse;
}(Person));