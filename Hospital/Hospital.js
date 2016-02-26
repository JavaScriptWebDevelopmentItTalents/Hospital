/*global validator, HospitalDepartment*/
var hospital = (function iife(global) {
    'use strict';
    var hospital;
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Hospital() {
        this.doctors = [];
        this.nurses = [];
        this.patients = [];
        this.departments = [];

        this.takePatients = function takePatients(patient) {
            var doctorId = getRandomInt(0, this.doctors.length - 1);
            patient.treatmentPlan = this.doctors[doctorId].makeNewTreatmentPlan();
            this.patients.push(patient);
            this.doctors[doctorId].addPatient(patient);
            this.assignPatientToRoom(patient);
            console.log('Пациент ' + patient.getFullName() + ' от пол ' + patient.getGender() +
                ' е приет с диагноза ' + patient.treatmentPlan.diagnose + '. Лекуващ лекар: д-р ' + this.doctors[doctorId].getFullName());
        };
        this.addDoctor = function addDoctor(doctor) {
            validator.validateIfObject(doctor, 'Hospital doctor');
            this.doctors.push(doctor);
        };
        this.addNurse = function addNurse(nurse) {
            validator.validateIfObject(nurse, 'Hospital nurse');
            switch(nurse.department){//this is soo, so, so wrong :(
                case "Ортопедия": nurse.department = this.departments[0];
                    break;
                case "Кардиология": nurse.department = this.departments[1];
                    break;
                case "Вирусология": nurse.department = this.departments[2];
                    break;
            }
            this.nurses.push(nurse);
        };
        this.assignPatientToRoom = function assignPatientToRoom(patient) {
            for (var i = 0; i < this.departments.length; i++) {
                if(this.departments[i].canAdd(patient)){
                    this.departments[i].addPatient(patient);
                }
            }
        };
        this.releasePatientFromRoom = function releasePatientFromRoom(patient) {
            this.departments[patient.deparmentId].rooms[patient.roomId].releasePatientFromRoom(patient);
        };
        this.passADay = function passADay() {
            for (var i = 0; i < this.nurses.length; i++) {
                this.nurses[i].giveMedicines();
            }
            for (var i = 0; i < this.doctors.length; i++) {
                var message = this.doctors[i].visitPatients();
                if(message.code === 200){
                    for (var j = 0; j < message.patients.length; j++) {
                        this.releasePatientFromRoom( message.patients[j] ) ;
                    }
                }
            }
        };
        this.spravkaZaSvobodniLegla = function spravkaZaSvobodniLegla(){
            var svobodniLegla = 0;
            for (var i = 0; i < this.departments.length; i++) {
                for (var j = 0; j < this.departments[i].rooms.length; j++) {
                    svobodniLegla += this.departments[i].rooms[j].freeBeds;
                }
            }
            console.log(svobodniLegla);
        };
        this.broiPacientsiZaVsekiDoktor = function broiPacientiZaVsekiDoktor() {
            for (var i = 0; i < this.doctors.length; i++) {
                if(this.doctors[i].getPatients()){
                    console.log(this.doctors[i].getFullName() + ' има ' + this.doctors[i].getPatients().length + ' пациента.');
                }
            }
        };
        this.broiPacientiKoitoShteBudatIzpisaniSledvashtiqDen = function broiPacientiKoitoShteBudatIzpisaniSledvashtiqDen() {
            var numberOfPatients = 0;
            for (var i = 0; i < this.doctors.length; i++) {
                if(this.doctors[i].getPatients()){
                    for (var j = 0; j < this.doctors[i].getPatients().length; j++) {
                        if(this.doctors[i].getPatients()[j].treatmentPlan.period === 1){
                            numberOfPatients += 1;
                        }
                    }
                }
            }
            console.log('Броя пациенти, който ще се изпишат утреее:', numberOfPatients);
        }
    }

    hospital = new Hospital();

    hospital.departments.push(new HospitalDepartment('Ортопедия', global.CONSTANTS.DIAGNOSE.ORTO, 0));
    hospital.departments.push(new HospitalDepartment('Кардиология', global.CONSTANTS.DIAGNOSE.KARDIO, 1));
    hospital.departments.push(new HospitalDepartment('Вирусология', global.CONSTANTS.DIAGNOSE.VIRUS, 2));

    return {
        takePatient: hospital.takePatients.bind(hospital),
        addDoctor: hospital.addDoctor.bind(hospital),
        addNurse: hospital.addNurse.bind(hospital),
        passADay: hospital.passADay.bind(hospital),
        showNumberOfFreeBeds: hospital.spravkaZaSvobodniLegla.bind(hospital),
        showNumberOfPatientsForEachDoctor: hospital.broiPacientsiZaVsekiDoktor.bind(hospital),
        showNumberOfPatientsToGoHomeTomorrow: hospital.broiPacientiKoitoShteBudatIzpisaniSledvashtiqDen.bind(hospital)
    };
}(window));