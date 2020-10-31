<svelte:head>
  <title>{pad.name}</title>
</svelte:head>

<script context="module">
    export async function preload(params, query) {
      console.log(params)
    }
</script>

<p>Yolo</p>
