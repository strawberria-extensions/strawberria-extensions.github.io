export const template =
`{# Handlebar for individual jigsaw puzzles #}
{% for jigsawData in config.jigsaws %}
**[{{ jigsawData.display }} - {{ jigsawData.rowColsRatio[2] }} pieces]**
{% if jigsawData.settings.rotation != 0 %}
- {{ jigsawData.settings.rotation }}° rotation increments
{% endif %}
{% if jigsawData.settings.allowGhost == false %}
- Ghosting pieces not allowed!
{% endif %}
{% if jigsawData.settings.allowEdge == false %}
- Edge piece filtering not allowed!
{% endif %}
{% endfor %}

{# Shared section for extensions #}
{{ base | generateConfigHandlebar }}`;