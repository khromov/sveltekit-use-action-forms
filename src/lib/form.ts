export default function form(form_element: HTMLFormElement) {
  // Here is where you could put the full URL to any server that should
  // receive the form data.
  const serverPrefix = "";

  // @ts-ignore
  form_element.setAttribute("novalidate", true); // TODO: true?

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    if (!event || !target) {
      console.error("Form error: No event or target");
      return;
    }

    function validate() {
      // https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/
      // Add your own validation logic here
      return true;
    }

    const is_valid = validate();

    if (!is_valid) return;

    const formData = new FormData(target);

    try {
      const response = await fetch(
        serverPrefix +
          (target.getAttribute("action") ||
            (window ? window.location.pathname : "/")),
        {
          method: target.getAttribute("method") || "POST",
          body: formData,
        }
      );

      const json = await response.json();

      const { ok } = response;
      const { message = undefined } = json;

      target.dispatchEvent(
        new CustomEvent("form-response", {
          bubbles: true,
          detail: { ...json, ok, error: message },
        })
      );

      if (ok) {
        form_element.reset();
      }
    } catch (error: any) {
      target.dispatchEvent(
        new CustomEvent("form-response", {
          bubbles: true,
          detail: { ok: false, error: error?.message || "Unknown error" },
        })
      );
    }
  }

  form_element.addEventListener("submit", handleSubmit);
}
