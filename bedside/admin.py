from bedside.models import *
from django.contrib import admin

admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(Questionnaire)
admin.site.register(Questionnaire_Lang)
admin.site.register(Question)
admin.site.register(Question_Lang)
admin.site.register(Option)
admin.site.register(Giving)
admin.site.register(Outcome)

