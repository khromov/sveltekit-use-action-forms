<script lang="ts">
    import form from '$lib/form';
</script>

<h1>Sveltekit use:form action demo</h1>

<!-- TODO use:form={{ validateFn, callbackFn }}-->
<form method="POST" action="/api/hello" use:form>
    <label for="name">What is your name?</label>
    <input id="name" name="name" />

    <button type="submit">Say hello</button>
</form>