/*global validator, Person*/
var Doctor = (function iife(parent, global) {
    'use strict';
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Doctor(firstName, lastName, gender) {
        var _patients = [];
        parent.call(this, firstName, lastName, gender);

        this.addPatient = function addPatient(patient){
            validator.validateIfObject(patient, 'Doctor patient');
            _patients.push(patient);
        };
        this.getPatients = function get(){
            return _patients;
        };
    }

    Doctor.prototype.visitPatients = function visitPatients() {
        var patientToRelease = [];
        for (var i = 0; i < this.getPatients().length; i++) {
            console.log('Лекар ' +  this.getFullName() + ' посети пациент ' +
            this.getPatients()[i].getFullName() + ' в стая ' +
            this.getPatients()[i].roomId + ' от отделение ' + this.getPatients()[i].deparmentId);
            this.getPatients()[i].treatmentPlan.period--;
            if(this.getPatients()[i].treatmentPlan.period === 0){
                //TODO: notify observers
                patientToRelease.push(this.getPatients()[i]);
                console.log('Пациент ' + this.getPatients()[i].getFullName() + ' от пол ' + this.getPatients()[i].getGender() +
                    ' с диагноза ' + this.getPatients()[i].treatmentPlan.diagnose + ' беше изписан.');
                this.getPatients().splice(i, 1);
            }
        }
        if(patientToRelease){ // this is called cheating, too much time observers will take
            return {
                code: 200,
                patients: patientToRelease
            }
        }
        return {
            code: 300
        }
    };

    Doctor.prototype.makeNewTreatmentPlan = function makeNewTreatmentPlan(medicines, procedures, period, diagnose) {
        period = period || getRandomInt(3, 5);
        if (!diagnose) {
            switch (getRandomInt(0, 2)) {
                case 0: diagnose = global.CONSTANTS.DIAGNOSE.KARDIO;
                    break;
                case 1: diagnose = global.CONSTANTS.DIAGNOSE.ORTO;
                    break;
                case 2: diagnose = global.CONSTANTS.DIAGNOSE.VIRUS;
                    break;
            }
        }
        medicines = medicines || 'aspirin';
        procedures = procedures || 'sleep';
        return new TreatmentPlan(period, diagnose, medicines, procedures);
    };

    return Doctor;
}(Person, window));