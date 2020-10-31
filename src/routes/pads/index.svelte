<svelte:head>
  <title>Pads</title>
</svelte:head>

<script context="module">
  export async function preload({params, query}) {
    const pads = await getPads()
    return { pads }
  }  
</script>


<script>
  import { getPads } from '../../requests/pads';

  export let pads = [];
</script>

<ul>
  {#each pads as pad (pad.id)}
    <li><a rel="prefetch" href="pads/{pad.name}">{pad.name}</a></li>
  {/each}
</ul>
