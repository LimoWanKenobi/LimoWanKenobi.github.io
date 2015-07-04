---
layout: archive
permalink: /projects/
title: "Projects"
excerpt: "Personal projects"
---

<div class="tiles">
{% for post in site.posts %}
    {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->
