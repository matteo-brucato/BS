#! /usr/bin/env python
# -*- coding: utf-8 -*-

from bedside.models import *

## Create Django Users by calling create_user()
u1 = User.objects.create_user('p1', 'p1@user.com', 'p1')
u2 = User.objects.create_user('p2', 'p2@user.com', 'p2')
u3 = User.objects.create_user('p3', 'p3@user.com', 'p3')
u4 = User.objects.create_user('d1', 'd1@user.com', 'd1')
u5 = User.objects.create_user('d2', 'd2@user.com', 'd2')
u1.first_name = 'Matteo'
u2.first_name = 'Mario'
u3.first_name = 'Luca'
u4.first_name = 'Gianni'
u5.first_name = 'Dr. Frankenstein'
u1.save()
u2.save()
u3.save()
u4.save()
u5.save()

# Create 3 Patients and 2 Doctors
p1 = Patient(pid=u1)
p2 = Patient(pid=u2)
p3 = Patient(pid=u3)
d1 = Doctor(did=u4)
d2 = Doctor(did=u5)
p1.save()
p2.save()
p3.save()
d1.save()
d2.save()

d2.pid.add(p1) # Doctor 2 gets patient 1
d2.pid.add(p2) # Doctor 2 gets also patient 2

# Creazione del questionario
quest1 = Questionnaire(created_by=d2, description='A ePRO about pain')
quest1.save()

# Aggiunta delle informazioni in lingua
Questionnaire_Lang(quid=quest1, lang='it', title='Questionario sul dolore', info='Lorem ipsum, bla bla bla...').save()
Questionnaire_Lang(quid=quest1, lang='en', title='Pain questionnaire', info='Lorem ipsum, bla bla bla...').save()

# Aggiunta delle domande
quest1_1 = Question(quid=quest1, type='o', left_val=1, right_val=1, description='Opzionale a risposta singola sul livello di dolore')
quest1_2 = Question(quid=quest1, type='o', left_val=0, right_val='NaN', description='Opzionale a risposta multipla sull\'ultima volta del dolore')
quest1_3 = Question(quid=quest1, type='b', left_val=1, right_val=2, description='Branching se ha misurato la glicemia. Se no, salta una domanda')
quest1_4 = Question(quid=quest1, type='n', left_val=100, right_val=200, description='Campo intero sul valore di glicemia, il range viene controllato ma non mostrato su schermo')
quest1_5 = Question(quid=quest1, type='r', left_val=100, right_val=200, description='Campo intero sulla pressione, con range')
quest1_6 = Question(quid=quest1, type='s', left_val=0, right_val=200, description='Input testuale')
quest1_1.save()
quest1_2.save()
quest1_3.save()
quest1_4.save()
quest1_5.save()
quest1_6.save()

# Aggiunta delle informazioni in lingua per ogni domanda
Question_Lang(qid=quest1_1, lang='it', string='Che livello di dolore prova?').save()
Question_Lang(qid=quest1_2, lang='it', string='Quando ha provato dolore l\'ultima volta?').save()
Question_Lang(qid=quest1_3, lang='it', string='Ha misurato la glicemia oggi?').save()
Question_Lang(qid=quest1_4, lang='it', string='Valore di glicemia registrato').save()
Question_Lang(qid=quest1_5, lang='it', string='Inserisca il valore della pressione misurata').save()
Question_Lang(qid=quest1_6, lang='it', string='Scriva la parola "casa"').save()
Question_Lang(qid=quest1_1, lang='en', string='How much pain do you feel?').save()
Question_Lang(qid=quest1_2, lang='en', string='When did you feel pain last time?').save()
Question_Lang(qid=quest1_3, lang='en', string='Did you measure your glycaemia today?').save()
Question_Lang(qid=quest1_4, lang='en', string='Glycaemia value').save()
Question_Lang(qid=quest1_5, lang='en', string='Please, insert the blood pressure value').save()
Question_Lang(qid=quest1_6, lang='en', string='Please, insert the word "casa"').save()

# Aggiunta delle opzioni (per le domande opzionali)
Option(qid=quest1_1, lang='it', description='Nessun dolore').save()
Option(qid=quest1_1, lang='it', description='Dolore moderato').save()
Option(qid=quest1_1, lang='it', description='Dolore molto forte').save()
Option(qid=quest1_1, lang='en', description='No pain, no gain').save()
Option(qid=quest1_1, lang='en', description='Moderate pain').save()
Option(qid=quest1_1, lang='en', description='Strong pain').save()

Option(qid=quest1_2, lang='it', description='L\'altro ieri').save()
Option(qid=quest1_2, lang='it', description='Ieri').save()
Option(qid=quest1_2, lang='it', description='Oggi').save()
Option(qid=quest1_2, lang='en', description='Two days ago').save()
Option(qid=quest1_2, lang='en', description='Yesterday').save()
Option(qid=quest1_2, lang='en', description='Today').save()

Option(qid=quest1_3, lang='it', description='Sì').save()
Option(qid=quest1_3, lang='it', description='No').save()
Option(qid=quest1_3, lang='en', description='Yes').save()
Option(qid=quest1_3, lang='en', description='No').save()

# Somministrazione del questionario ai due pazienti
Giving(did=d2, pid=p1, quid=quest1, from_date='2011-10-01 08:00', to_date='2012-01-01 20:00').save()
Giving(did=d2, pid=p1, quid=quest1, from_date='2011-10-01 08:00', to_date='2012-01-01 10:00').save()
Giving(did=d2, pid=p2, quid=quest1, from_date='2012-02-10 13:00', to_date='2012-02-10 23:59').save()
