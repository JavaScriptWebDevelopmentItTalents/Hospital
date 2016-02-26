var pesho = new Patient('Pesho', 'Ivanov', CONSTANTS.GENDER.MALE);
var ivan = new Patient('Ivan', 'Ivanov', CONSTANTS.GENDER.MALE);
var gosho = new Patient('Gosho', 'Petrov', CONSTANTS.GENDER.MALE);
var ginka = new Patient('Ginka', 'Petrova', CONSTANTS.GENDER.FEMALE);
var penka = new Patient('Penka', 'Nostradamova', CONSTANTS.GENDER.FEMALE);
var chichoGosho = new Doctor('Chicho', 'Gosho', CONSTANTS.GENDER.MALE);
var strumbadin = new Doctor('Strumbadin', 'Nedqlkov', CONSTANTS.GENDER.MALE);
var qna = new Nurse('Qna', 'Ivanova', CONSTANTS.GENDER.FEMALE, 'Ортопедия');
var mariika = new Nurse('Sexy', 'Mariika', CONSTANTS.GENDER.FEMALE, 'Кардиология');
var sexyQna = new Nurse ('Sexy', 'Qna', CONSTANTS.GENDER.FEMALE, 'Вирусология');
hospital.addDoctor(chichoGosho);
hospital.addDoctor(strumbadin);
hospital.addNurse(qna);
hospital.addNurse(mariika);
hospital.addNurse(sexyQna);
hospital.takePatient(pesho);
hospital.takePatient(ivan);
hospital.takePatient(gosho);
hospital.takePatient(ginka);
hospital.takePatient(penka);

var counterForDays = 0;
var dayLongInSeconds = 5;
var days = 10;
for (var i = 1; i <= days; i++) {
    setTimeout(hospital.passADay, dayLongInSeconds * i * 1000);
}