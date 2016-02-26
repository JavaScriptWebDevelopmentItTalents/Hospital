var TreatmentPlan = (function iife() {
    'use strict';
    function TreatmentPlan(period, diagnose, medicines, procedures) {
        this.period = period;
        this.medicines = medicines;
        this.diagnose = diagnose;
        this.procedures = procedures;
    }

    return TreatmentPlan;
}());