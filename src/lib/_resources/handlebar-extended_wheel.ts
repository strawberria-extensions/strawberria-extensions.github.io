export const template =`{# Wheel definitions for handlebar #}
{% for wheelID, wheelData in config.wheels %}
{% if wheelData.settings.disabled == false -%}
**[{{ wheelData.display }} / {{ wheelData.regularity.mode | capitalize }} {% if wheelData.regularity.mode != "unlimited" -%} 
every {{ wheelData.regularity.interval | generateTimeString(true) }}{% if wheelData.regularity.mode == "non_cumulative" and wheelData.regularity.spinsPerPeriod > 1 %}, {{ wheelData.regularity.spinsPerPeriod }} spins per period{% endif %}{% if wheelData.regularity.mode == "cumulative" and wheelData.regularity.maximum != undefined %}, maximum {{ wheelData.regularity.maximum }}{% endif %}]**
{% endif %}
{% set actionData = base.actions[wheelID] %}
{% if actionData != undefined -%}
**Effects on spin**:
{% for lockEffect in actionData.effects %}
- {{ lockEffect | generateLockEffect }}
{% endfor %}
{% endif %}
{% if wheelData.settings.hiddenOutcomes == true -%}
Wheel outcomes are hidden!
{% else -%}
{% for wheelOutcome in wheelData.outcomes %}
- ({% if wheelData.settings.hiddenWeights -%}
???
{% else -%}
{{ wheelOutcome.weight }}
{%- endif %}) {{ wheelOutcome.text }}
{% endfor %}
{% endif %}
{% endif %}
{% endfor %}

{# Shared section for extensions #}
{{ base | generateConfigHandlebar }}`;
