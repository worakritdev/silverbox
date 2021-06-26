<script>
  import Sidebar from "$lib/components/Sidebar.svelte";
  import "../app.postcss";
</script>

<body>
  <ion-split-pane content-id="menu-content" when="md">
    <ion-menu
      content-id="menu-content"
      side="start"
      type="overlay"
      class="w-16"
    >
      <ion-header>
        <ion-toolbar>
          <ion-title>
              <ion-icon name="cube"></ion-icon>
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        content
        <nav>
          <a href="articles">articles</a>
        </nav>
      </ion-content>
    </ion-menu>
    <div class="ion-page" id="menu-content">
      <ion-content>
        <slot><!-- optional fallback --></slot>
      </ion-content>
    </div>
  </ion-split-pane>
</body>
