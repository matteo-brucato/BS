from django.http import *
from django.contrib.auth.decorators import login_required
from django.utils.translation import ugettext as _
from django.core import serializers
from django.core.urlresolvers import reverse
from django.template import Template, Context, RequestContext
from django.shortcuts import render_to_response

from djangorestframework.views import View
from djangorestframework.response import Response
from djangorestframework import status

from models import *
import simplejson

"""class Givings(View):
	def get(self, request):
		return {"Some other resources": [reverse('giving', kwargs={'gid':gid}) for gid in range(3)]}

class Giving(View):
	def get(self, request, gid):
		return Response(status.HTTP_404_NOT_FOUND)
"""

def app(request):
	return render_to_response('app.html', {}, RequestContext(request))
	

@login_required
def givings(request):
	if not 'django_language' in request.session:
		request.session['django_language'] = 'it' # <-- Setta lingua del browser invece
	if request.method == 'POST': return HttpResponseNotAllowed(['GET'])
	# If patient
	todo = Giving.objects.filter(pid=request.user.pk).select_related()
	return render_to_response('quest_list.html', {'todo':todo}, RequestContext(request))

@login_required
def givings_compile_ui(request, gid):
	#@todo Bisogna controllare che l'utente ha i diritti di accesso al questionario
	return render_to_response('compile.html', {'gid':gid}, context_instance=RequestContext(request))

@login_required
def givings_get_xml(request, gid):
	try:
		giving = Giving.objects.get(pk=gid)
	except:
		return HttpResponseNotFound()
	#@todo Bisogna controllare che l'utente ha i diritti di accesso al questionario
	questionnaire = Question.objects.filter(quid=giving.quid).select_related()
	return render_to_response('questionnaire.xml', {'q':questionnaire}, RequestContext(request), mimetype='application/xml')

#def mobi(request):
	# Se sei loggato vai a /givings senno' a /login
#	if request.method == 'POST': return HttpResponseNotAllowed(['GET'])
#	return login(request)


""" Chiamata via Ajax
def login(request):
	if request.method == 'POST':
		# Per ora faccio un login sempre valido
		json = simplejson.dumps({'login_success': True})
		response = HttpResponse(json, mimetype='application/json')
		response.set_cookie('email', value=request.POST.get('email'))
		response.set_cookie('lang', value='it')
		request.session['django_language'] = 'it' ## <-- Metti lingua del browser
		return response
	else:
		return render_to_response('login.html', RequestContext(request))
"""
