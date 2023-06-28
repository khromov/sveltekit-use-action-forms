<script lang="ts">
  import toast, { Toaster } from "svelte-french-toast";

  function show_toast(data: FormResponseEvent) {
    console.log(data?.detail);
    if (data.detail.ok) {
      toast.success(data?.detail?.greeting, { duration: 2000 });
    } else {
      toast.error(data?.detail?.error || "Something went wrong", {
        duration: 2000,
      });
    }
  }
</script>

<div on:form-response={show_toast}>
  <Toaster />
  <slot />
</div>
