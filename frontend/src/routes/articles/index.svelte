<script context="module">
  import { post } from "$lib/middleware/utils";
  const HOST = import.meta.env.VITE_HOST;
  const PORT = import.meta.env.VITE_PORT;

  export async function load({ fetch }) {
    const res = await post(`${HOST}:${PORT}/graphql`, {
      query: ` query{
              articles(where:{}){
                  id
                  title
                  content
                }
            }`,
    });
    return { props: { articles: await res } };
  }
</script>

<script>
  import { items } from "$lib/stores/utilStroe";
  export let articles = [];
  let title, description, slug, content;
  async function create() {
    const data = ` {title: "${title}", description: "${description}", content: "${content}",slug:"${slug}"}`;
    const res = await post(`${HOST}:${PORT}/graphql`, {
      query: ` mutation{
  createArticle(input:{data:${data}}){
    article{
      _id
      createdAt
      updatedAt
      title
    }
  }
}`,
    });
    console.log(await res);
  }
  let {
    data: {
      articles: [...arr],
    },
  } = articles;
</script>

<section>
  <form on:submit|preventDefault={create}>
    <fieldset class="m-4 p-5 shadow-md">
      <legend class="text-2xl font-bold">Article : {title}</legend>
      <input type="text" bind:value={title} />
      <input type="text" bind:value={description} />
      <input type="text" bind:value={content} />
      <input type="text" bind:value={slug} />
      <button type="submit"> Create </button>
    </fieldset>
  </form>
</section>

<div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
  {#each arr as { title, description, content, slug, url }}
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>{url}</ion-card-subtitle>
        <ion-card-title>{title}</ion-card-title>
      </ion-card-header>
      <ion-card-content> {description || ""} {content || ""}</ion-card-content>
    </ion-card>
  {/each}
</div>

<!-- markup (zero or more items) goes here -->
<style>
  input {
    @apply text-xl shadow-md bg-purple-400;
  }
</style>
