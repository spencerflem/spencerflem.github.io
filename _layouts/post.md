---
layout: default
---
<div class="post">
  <div class="post-nav">
    {% if page.next.url %}
      <a href="{{ page.next.url }}">&laquo; Prev</a>
    {% endif %}
    {% if page.previous.url and page.next.url %}
      |
    {% endif %}
    {% if page.previous.url %}
      <a href="{{ page.previous.url }}">Next &raquo;</a>
    {% endif %}
  </div>

  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
  </header>

  <article class="post-content">
    ![{{page.title}}]({{page.img.large}})
    {{ content }}
  </article>

</div>