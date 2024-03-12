-- Patients
INSERT INTO Patients (idPatient, prenom, nom, dateDeNaissance, sexe, adresse, numeroDeTelephone, nomContactUrgence, numeroContactUrgence)
VALUES
    (0, 'Claire', 'Lavoie', TO_DATE('10-02-1989', 'DD-MM-YYYY'), 'Féminin', '987 Rue E', '555-7890', 'Marcel Lavoie', '555-4329'),
    (1, 'David', 'Tessier', TO_DATE('25-07-2001', 'DD-MM-YYYY'), 'Masculin', '654 boulveard France', '555-5678', 'Sophie Tessier', '555-8765'),
    (2, 'Émilie', 'Roy', TO_DATE('14-04-1975', 'DD-MM-YYYY'), 'Féminin', '321 avenue G', '555-2345', 'Louis Roy', '555-6789'),
    (3, 'Alexandre', 'Boucher', TO_DATE('29-11-1993', 'DD-MM-YYYY'), 'Masculin', '789 RuE H', '555-8901', 'Marie Boucher', '555-1098'),
    (4, 'Julie', 'Côté', TO_DATE('02-09-1982', 'DD-MM-YYYY'), 'Féminin', '456 Rue I', '555-4321', 'Marc Côté', '555-9876'),
    (5, 'François', 'Dufresne', TO_DATE('11-12-1970', 'DD-MM-YYYY'), 'Masculin', '123 Rue J', '555-6789', 'Isabelle Dufresne', '555-1234'),
    (6, 'Sophie', 'Leblanc', TO_DATE('03-08-1996', 'DD-MM-YYYY'), 'Féminin', '789 RuE K', '555-7890', 'Pierre Leblanc', '555-4321'),
    (7, 'Martin', 'Girard', TO_DATE('22-05-2000', 'DD-MM-YYYY'), 'Masculin', '654 R Lor', '555-5678', 'Marie Girard', '555-8765'),
    (8, 'Caroline', 'Morin', TO_DATE('17-09-1988', 'DD-MM-YYYY'), 'Féminin', '321 Blv Marcel', '555-2345', 'Daniel Morin', '555-6789'),
    (9, 'Sébastien', 'Lemieux', TO_DATE('05-04-1977', 'DD-MM-YYYY'), 'Masculin', '789 Street Nile', '555-8901', 'Chantal Lemieux', '555-1098')
ON CONFLICT (idPatient) DO NOTHING;


-- Services
INSERT INTO  Services (idService, nomService)
VALUES
    (0, 'Dermatologie'),
    (1, 'Neurologie'),
    (2, 'Ophtalmologie'),
    (3, 'Orthopédie'),
    (4, 'Psychiatrie'),
    (5, 'Cardiologie'),
    (6, 'Pédiatrie'),
    (7, 'Chirurgie'),
    (8, 'Gynécologie'),
    (9, 'Radiologie')
ON CONFLICT (idService) DO NOTHING;


-- Medecins
INSERT INTO Medecins (idMedecin, prenom, nom, specialite, anneesExperience, idService)
VALUES
    (0, 'Marie', 'Rousseau', 'Dermatologie', 8, 3),
    (1, 'Philippe', 'Lemelin', 'Neurologie', 6, 4),
    (2, 'Valérie', 'Bélanger', 'Ophtalmologie', 10, 1),
    (3, 'Alex', 'Michaud', 'Orthopédie', 12, 2),
    (4, 'Nathalie', 'Gagné', 'Psychiatrie', 9, 3),
    (5, 'Simon', 'Tremblay', 'Cardiologie', 15, 4),
    (6, 'Audrey', 'Beaulieu', 'Pédiatrie', 7, 1),
    (7, 'David', 'Fournier', 'Chirurgie', 11, 2),
    (8, 'Isabelle', 'Lapointe', 'Gynécologie', 14, 3),
    (9, 'François', 'Martel', 'Radiologie', 5, 4)
ON CONFLICT (idMedecin) DO NOTHING;


-- RendezVous
INSERT INTO RendezVous (idRendezVous, idPatient, idMedecin, dateRendezVous, motif, diagnostic, ordonnance)
VALUES
    (0, 0, 0, TO_DATE('15-09-2023', 'DD-MM-YYYY'), 'Problèmes cutanés', 'Dermatite', 'Crème hydratante'),
    (1, 1, 1, TO_DATE('20-09-2023', 'DD-MM-YYYY'), 'Maux de tête fréquents', 'Migraine', 'Analgesiques'),
    (2, 2, 2, TO_DATE('25-09-2023', 'DD-MM-YYYY'), 'Examen de la vue', 'Myopie', 'Lunettes de correction'),
    (3, 3, 3, TO_DATE('30-09-2023', 'DD-MM-YYYY'), 'Douleurs au genou', 'Entorse', 'Repos et glace'),
    (4, 4, 4, TO_DATE('05-10-2023', 'DD-MM-YYYY'), 'Problèmes de sommeil', 'Insomnie', 'Conseils pour un meilleur sommeil'),
    (5, 5, 5, TO_DATE('10-10-2023', 'DD-MM-YYYY'), 'Tension artérielle élevée', 'Hypertension', 'Médicaments antihypertenseurs'),
    (6, 6, 6, TO_DATE('15-10-2023', 'DD-MM-YYYY'), 'Vérification de routine', 'En bonne santé', ''),
    (7, 7, 7, TO_DATE('20-10-2023', 'DD-MM-YYYY'), 'Blessure au bras', 'Fracture', 'Plâtre et repos'),
    (8, 8, 8, TO_DATE('25-10-2023', 'DD-MM-YYYY'), 'Douleurs abdominales', 'Gastrite', 'Médicaments et régime alimentaire'),
    (9, 9, 9, TO_DATE('30-10-2023', 'DD-MM-YYYY'), 'Consultation pré-natale', 'En bonne santé', ''),
    (10, 0, 3, TO_DATE('10-11-2023', 'DD-MM-YYYY'), 'Douleurs abdominales', 'Indigestion', 'Repos et régime léger'),
    (11, 1, 5, TO_DATE('15-11-2023', 'DD-MM-YYYY'), 'Palpitations cardiaques', 'Arythmie cardiaque', 'Médicaments et suivi médical'),
    (12, 2, 2, TO_DATE('20-11-2023', 'DD-MM-YYYY'), 'Consultation ophtalmologique', 'Myopie', 'Lunettes de correction'),
    (13, 3, 7, TO_DATE('25-11-2023', 'DD-MM-YYYY'), 'Douleurs lombaires', 'Hernie discale', 'Physiothérapie et repos'),
    (14, 4, 0, TO_DATE('30-11-2023', 'DD-MM-YYYY'), 'Problèmes cutanés', 'Éruption cutanée', 'Crème topique'),
    (15, 5, 8, TO_DATE('05-12-2023', 'DD-MM-YYYY'), 'Consultation gynécologique', 'Examen de routine', ''),
    (16, 6, 1, TO_DATE('10-12-2023', 'DD-MM-YYYY'), 'Maux de tête sévères', 'Migraine chronique', 'Médicaments spécifiques'),
    (17, 7, 4, TO_DATE('15-12-2023', 'DD-MM-YYYY'), 'Consultation psychiatrique', 'Anxiété', 'Thérapie cognitive'),
    (18, 8, 6, TO_DATE('20-12-2023', 'DD-MM-YYYY'), 'Vérification pédiatrique', 'En bonne santé', ''),
    (19, 9, 9, TO_DATE('25-12-2023', 'DD-MM-YYYY'), 'Examen radiologique', 'Aucune anomalie détectée', '')
ON CONFLICT (idRendezVous) DO NOTHING;

-- Examens
INSERT INTO Examens (idExamen, nomExamen, idService, cout)
VALUES
    (0, 'Échographie abdominale', 0, 180.00),
    (1, 'Radiographie pulmonaire', 1, 250.00),
    (2, 'Analyse de sang', 2, 100.00),
    (3, 'IRM cérébrale', 3, 350.00),
    (4, 'Électroencéphalogramme', 4, 200.00),
    (5, 'Endoscopie gastro-intestinale', 5, 280.00),
    (6, 'Test de vision', 6, 50.00),
    (7, 'Épreuve d effort cardiaque', 7, 300.00),
    (8, 'Coloscopie', 8, 320.00),
    (9, 'Mammographie', 9, 180.00)
ON CONFLICT (idExamen) DO NOTHING;


-- PatientExamens
INSERT INTO PatientExamens (idPatientExamen, idPatient, idExamen, dateExamen, resultat)
VALUES
    (0, 0, 0, TO_DATE('25-09-2023', 'DD-MM-YYYY'), 'Résultats normaux'),
    (1, 1, 1, TO_DATE('05-10-2023', 'DD-MM-YYYY'), 'Aucune anomalie détectée'),
    (2, 2, 2, TO_DATE('15-10-2023', 'DD-MM-YYYY'), 'Niveaux sanguins normaux'),
    (3, 3, 3, TO_DATE('20-10-2023', 'DD-MM-YYYY'), 'Pas d anomalies cérébrales'),
    (4, 4, 4, TO_DATE('30-10-2023', 'DD-MM-YYYY'), 'Activité cérébrale normale'),
    (5, 5, 5, TO_DATE('10-11-2023', 'DD-MM-YYYY'), 'Aucun problème gastro-intestinal détecté'),
    (6, 6, 6, TO_DATE('20-11-2023', 'DD-MM-YYYY'), 'Acuité visuelle normale'),
    (7, 7, 7, TO_DATE('01-12-2023', 'DD-MM-YYYY'), 'Bonne tolérance à l effort'),
    (8, 8, 8, TO_DATE('15-12-2023', 'DD-MM-YYYY'), 'Pas d anomalies intestinales'),
    (9, 9, 9, TO_DATE('28-12-2023', 'DD-MM-YYYY'), 'Aucune anomalie mammaire détectée')
ON CONFLICT (idPatientExamen) DO NOTHING;
