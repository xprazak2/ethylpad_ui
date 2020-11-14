<script>
  import { createEventDispatcher } from 'svelte';

  export let text;
  export let minRows = 1;
  export let maxRows;

  $: minHeight = `${1 + minRows * 1.2}em`;
  $: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : 'auto';

  let timer;
  const dispatch = createEventDispatcher();

  const dispatchTextChanged = updatedText => {
    dispatch('textChanged', { text: updatedText })
  }
</script>

<div class="container">
  <pre
    aria-hidden="true"
    style="min-height: {minHeight}; max-height: {maxHeight}"
  >
    { text + '\n'}
  </pre>
  <textarea on:keyup={({ target: { value } }) => dispatchTextChanged(value)} value={text}></textarea>
</div>

<style>
  .container {
    position: relative;
  }

  pre, textarea {
    font-family: inherit;
    padding: 0.5em;
    box-sizing: border-box;
    border: 1px solid #eee;
    line-height: 1.2;
    overflow: hidden;
  }

  textarea {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    resize: none;
  }
</style>