export default function form(form_element) {
    form_element.setAttribute('novalidate', true);
  
    async function handle_submit(event) {
      event.preventDefault();
  
      function validate() {
        // https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/
        return true;
      }
  
      const is_valid = validate();
  
      if (!is_valid) return;

      const formData = new FormData(event.target);
  
      const response = await fetch(event.target.getAttribute('action'), {
        method: event.target.getAttribute('method') || 'POST',
        body: formData
      });

      const json = await response.json();
  
      event.target.dispatchEvent(
        new CustomEvent('form-response', { bubbles: true, detail: json })
      );
    }
  
    form_element.addEventListener('submit', handle_submit);
  }