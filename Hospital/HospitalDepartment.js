/*global Room*/
var HospitalDepartment = (function iife() {
    'use strict';
    var FREE_ROOMS = 10,
        FREE_BEDS = 3;
    function HospitalDepartment(name, diagnose, id){
        this.id = id;
        this.rooms = [];
        this.name = name;
        this.diagnose = diagnose;
        for (var i = 0; i < FREE_ROOMS; i++) {
            this.rooms.push(new Room(i, FREE_BEDS));
        }
    }

    HospitalDepartment.prototype.canAdd = function canAdd(patient){
        if(this.diagnose === patient.treatmentPlan.diagnose){
            for (var i = 0; i < this.rooms.length; i++) {
                if(this.rooms[i].canAdd(patient)){
                    return true;
                }
            }
        }
        return false;
    };

    HospitalDepartment.prototype.addPatient = function addPatient(patient){
        for (var i = 0; i < this.rooms.length; i++) {
                if(this.rooms[i].canAdd(patient)){
                    patient.deparmentId = this.id;
                    this.rooms[i].addPatientToRoom(patient);
                    return;
                }
        }
    };
    return HospitalDepartment;
}());