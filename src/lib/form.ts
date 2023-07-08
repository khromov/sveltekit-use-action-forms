export default function form(formElement: HTMLFormElement) {
  // This triggers our function when the form is submitted
  // TODO: Maybe needs to be at end or define the handlesubmit separately
  formElement.addEventListener("submit", handleSubmit);

  // Here is where you could put the full URL to any server that should receive the form data.
  const serverPrefix = "";

  // @ts-ignore
  formElement.setAttribute("novalidate", true); 
  
  async function handleSubmit(event: SubmitEvent) {
    // Prevent the default behavior of sending the form data to the URL in the action attribute
    event.preventDefault();

    // Get a reference to the Form HTML element
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

    // TODO: needs to be validated
    if (!is_valid) return;

    // Assemble a FormData element with all the fields in our form
    const formData = new FormData(target);

    // Send the form data to the server
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

      // Handle the response
      const json = await response.json();

      const { ok } = response;
      const { message = undefined } = json;

      // Trigger our form response callback
      target.dispatchEvent(
        new CustomEvent("form-response", {
          bubbles: true,
          detail: { ...json, ok, error: message },
        })
      );

      if (ok) {
        formElement.reset();
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
}
