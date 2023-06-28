<script lang="ts">
    import form from '$lib/form';
    let name: string | undefined;
</script>

<h1>Sveltekit use:form action demo</h1>

<form method="POST" action="/api/hello" use:form>
    <label for="name">What is your name?</label>
    <input id="name" name="name" bind:value={name} />

    <button type="submit">Say hello</button>
</form>