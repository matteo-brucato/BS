from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin

"""class User(models.Model):
	uid = models.AutoField(primary_key=True)
	email = models.CharField(max_length=200, unique=True)
	password = models.CharField(max_length=16)
	class Meta:
		db_table = 'User'
	def __unicode__(self):
		return self.email
"""

class Patient(models.Model):
	pid = models.ForeignKey(User, primary_key=True)
	#name = models.CharField(max_length=200)
	class Meta:
		db_table = 'Patient'
	def __unicode__(self):
		return str(self.pid)

class Doctor(models.Model):
	did = models.ForeignKey(User, primary_key=True)
	pid = models.ManyToManyField(Patient)
	#name = models.CharField(max_length=200)
	class Meta:
		db_table = 'Doctor'
	def __unicode__(self):
		return str(self.did.first_name)

class Questionnaire(models.Model):
	quid = models.AutoField(primary_key=True)
	created_by = models.ForeignKey(Doctor)
	description = models.CharField(max_length=1000, null=True)
	class Meta:
		db_table = 'Questionnaire'
	def __unicode__(self):
		return str(self.quid)
	def natural_key(self):
		return (self.quid)

class Questionnaire_Lang(models.Model):
	quid = models.ForeignKey(Questionnaire)
	lang = models.CharField(max_length=5)
	title = models.CharField(max_length=1000)
	info = models.TextField()
	class Meta:
		unique_together = ('quid', 'lang')
	def __unicode__(self):
		return str(self.quid)

class Question(models.Model):
	qid = models.AutoField(primary_key=True)
	quid = models.ForeignKey(Questionnaire)
	type = models.CharField(max_length=3)
	left_val = models.DecimalField(max_digits=32, decimal_places=16)
	right_val = models.DecimalField(max_digits=32, decimal_places=16)
	description = models.CharField(max_length=500, null=True)
	class Meta:
		db_table = 'Question'
	def __unicode__(self):
		return str(self.quid) + ':' + str(self.qid) + ' ' + self.description

class Question_Lang(models.Model):
	qid = models.ForeignKey(Question)
	lang = models.CharField(max_length=5)
	string = models.CharField(max_length=500)
	class Meta:
		unique_together = ('qid', 'lang')
	def __unicode__(self):
		return str(self.qid.quid) + ':' + str(self.qid.qid) + ' (' + self.lang + '): ' + self.string

class Option(models.Model):
	oid = models.AutoField(primary_key=True)
	qid = models.ForeignKey(Question)
	lang = models.CharField(max_length=5)
	description = models.CharField(max_length=500)
	class Meta:
		db_table = 'Option'
	def __unicode__(self):
		return self.description

class Giving(models.Model):
	gid        = models.AutoField(primary_key=True)
	did        = models.ForeignKey(Doctor)
	pid        = models.ForeignKey(Patient)
	quid       = models.ForeignKey(Questionnaire)
	from_date  = models.DateTimeField()
	to_date    = models.DateTimeField()
	given_date = models.DateTimeField(auto_now=True)
	completed  = models.BooleanField(default=False)
	class Meta:
		db_table = 'Giving'
	def __unicode__(self):
		return str(self.gid) + ' given to patient ' + str(self.pid) + ' from doc ' + str(self.did)

class Outcome(models.Model):
	outid  = models.AutoField(primary_key=True)
	gid    = models.ForeignKey(Giving)
	qid    = models.ForeignKey(Question)
	oid    = models.ForeignKey(Option, null=True)
	num    = models.DecimalField(max_digits=32, decimal_places=16, null=True)
	string = models.CharField(max_length=5, null=True)
	date   = models.DateTimeField(auto_now=True)
	class Meta:
		db_table = 'Outcome'
	
