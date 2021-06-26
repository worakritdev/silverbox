<script context="module">
  import { post } from "$lib/middleware/utils";
  export async function load({ fetch, page }) {
    const url = `http://localhost:3000/api`;
    const res = await post(url, {
      query: ` query{ getAllPages{id\ntitle\ncontent\nauthor\nurl\ncategories{name}} }`,
    });

    const {
      data: { getAllPages },
    } = await res;

    return { props: { pages: getAllPages } };
  }
</script>

<script>
  export let pages = [];
  console.log(pages);
</script>

{#each pages as page}
<a href='/pages/{page.id}'>
  {page}

  </a>
{/each}

<!-- markup (zero or more items) goes here -->
<style>
  /* your styles go here */
</style>
