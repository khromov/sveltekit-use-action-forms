<script lang="ts">
  import toast, { Toaster } from "svelte-french-toast";

  function show_toast(data: any) {
    toast.success(data?.detail?.greeting);
  }
</script>

<div on:form-response={show_toast}>
  <Toaster />
  <slot />
</div>
