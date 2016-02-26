var Room = (function iife() {
    'use strict';
    var MAX_FREE_ROOMS = 3;
    function Room(number, beds) {
        this.number = number;
        this.freeBeds = beds;
        this.patients = [];
        this.genderOfPatients = null;
        this.canAdd = function canAdd(patient) {
            if(this.genderOfPatients === null || this.genderOfPatients === patient.getGender()){
                return !!this.freeBeds;
            }
        };
    }

    Room.prototype.addPatientToRoom = function addPatientToRoom(patient) {
        if(this.canAdd(patient)){
            this.freeBeds-=1;
            this.genderOfPatients = patient.getGender();
            patient.roomId = this.number;
            this.patients.push(patient);
        }
    };

    Room.prototype.releasePatientFromRoom = function releasePatientFromRoom(patient) {
        var index = this.patients.indexOf(patient);
        this.patients.splice(index, 1);
        this.freeBeds+=1;
        if(this.freeBeds === MAX_FREE_ROOMS){
            this.genderOfPatients = null;
        }
    };
    return Room;
}());