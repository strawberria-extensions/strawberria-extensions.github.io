export const template = `{# Skip actions, will be handled by individual handlebars themselves #}
{# Event handling #}
{% if events | length > 0 %}
**[ Events ]**
{% endif %}
{% for regex, eventData in events %}
- On action matching "{{ regex }}":
{% for lockEffect in eventData.effects %}
  - {{ lockEffect | generateLockEffect }} 
{% endfor %}
{% endfor %}
{% if events | length > 0 %}
{% endif %}
{# Skip penalties, will be handled by individual handlebars themselves #}
{% if periodic | length > 0 %}
**[ Periodic ]**
{% for periodicData in periodic %}
- Every {{ generateTimeString(periodicData.interval / 1000) }}:
{% for lockEffect in periodicData.effects %}
  - {{ lockEffect | generateLockEffect }}
{% endfor %}
{% endfor %}
{% endif %}`;