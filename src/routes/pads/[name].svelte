<svelte:head>
  <title>{pad.name}</title>
</svelte:head>

<script context="module">
    export async function preload({ params }) {
      const pad = await getPad(params.name);
      return { pad };
    }
</script>

<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";
  const { page } = stores();
  const { name } = $page.params;

  import { getPad } from '../../requests/pads';
  import TextAreaAutoresize from '../../components/TextAreaAutoresize.svelte';
  import { Socket } from 'phoenix';

  let socket;
  let channel;
  let channelInitialized = false;

  const onTextChanged = payload => {
    if (!channelInitialized) {
      return;
    }
    channel.push("update_pad", { text: payload.detail.text });
  }

  const updatePad = data => {
    pad = { ...pad, text: data.text };
  }

  const handleChannelJoinOk = resp => console.log("joined", resp);
  const handleChannelJoinError = resp => console.log("not joined", resp);

  // Set up channel in onMount,
  // because websockets are only present in browser
  // but if you access the pad directly by url,
  // the page is rendered on server
  onMount(() => {
    // booo!
    let socket = new Socket("ws://localhost:4000/socket", { params: { token: 'foo' } })

    socket.connect();

    channel = socket.channel(`pad:${name}`, {});

    channel.on("update_pad", updatePad);

    channel.join().receive("ok", handleChannelJoinOk).receive("error", handleChannelJoinError);
    channelInitialized = true;
  });

  export let pad = {};

</script>

<TextAreaAutoresize on:textChanged={onTextChanged} minRows={2} bind:text={pad.text} />
