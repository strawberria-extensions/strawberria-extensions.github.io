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
{% if penalties | length > 0 %}
**[ Penalties ]**
{% for ruleKey, penaltyData in penalties %}
- Complete {{ penaltyData.required }} "{{ ruleKey }}" actions every {{ penaltyData.interval | generateTimeString(true) }}{% if penaltyData.block == true %}; required to unlock{% endif %}. Otherwise:
{% for lockEffect in penaltyData.effects %}
  - {{ lockEffect | generateLockEffect }}
{% endfor %}
{% endfor %}
{% endif %}
{% set scheduled = periodics or periodic %}
{% if scheduled | length > 0 %}
**[ Periodic ]**
{% for ruleKey, periodicData in scheduled %}
- "{{ ruleKey }}" every {{ periodicData.interval | generateTimeString(true) }}:
{% for lockEffect in periodicData.effects %}
  - {{ lockEffect | generateLockEffect }}
{% endfor %}
{% endfor %}
{% endif %}`;
