// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }

  interface FormResponseEvent {
    detail: FormResponseEventDetail;
  }

  interface FormResponseEventDetail {
    ok: boolean;
    error?: string;
    [key: string]: any;
  }

  declare namespace svelteHTML {
    interface HTMLAttributes<T> {
      "on:form-response"?: (event: FormResponseEvent) => void;
    }
  }
}

export {};
