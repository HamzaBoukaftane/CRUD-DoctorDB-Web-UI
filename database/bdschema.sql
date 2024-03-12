CREATE TABLE IF NOT EXISTS Patients (
    idPatient 				INT PRIMARY KEY,
    prenom 					VARCHAR(50),
    nom 					VARCHAR(50),
    dateDeNaissance 		DATE,
    sexe 					VARCHAR(10),
    adresse 				VARCHAR(100),
    numeroDeTelephone 		VARCHAR(20),
    nomContactUrgence 		VARCHAR(50),
    numeroContactUrgence 	VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Services (
    idService 				INT PRIMARY KEY,
    nomService 				VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Medecins (
    idMedecin 				INT PRIMARY KEY,
    prenom 					VARCHAR(50),
    nom 					VARCHAR(50),
    specialite 				VARCHAR(50),
    anneesExperience 		INT,
    idService 				INT,
    FOREIGN KEY (idService) REFERENCES Services(idService)
);

CREATE TABLE IF NOT EXISTS Rendezvous (
    idRendezVous 			INT PRIMARY KEY,
    idPatient 				INT,
    idMedecin 				INT,
    dateRendezVous 			DATE,
    motif 					VARCHAR(200),
    diagnostic 				VARCHAR(200),
    ordonnance 				VARCHAR(200),
    FOREIGN KEY (idPatient) REFERENCES Patients(idPatient),
    FOREIGN KEY (idMedecin) REFERENCES Medecins(idMedecin)
);

CREATE TABLE IF NOT EXISTS Examens (
    idExamen 				INT PRIMARY KEY,
    nomExamen 				VARCHAR(100),
    idService 				INT,
    cout 					DECIMAL(10, 2),
    FOREIGN KEY (idService) REFERENCES Services(idService)
);

CREATE TABLE IF NOT EXISTS PatientExamens (
    idPatientExamen 		INT PRIMARY KEY,
    idPatient 				INT,
    idExamen 				INT,
    dateExamen 				DATE,
    resultat 				VARCHAR(100),
    FOREIGN KEY (idPatient) REFERENCES Patients(idPatient),
    FOREIGN KEY (idExamen) REFERENCES Examens(idExamen)
);