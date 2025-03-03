import { LightningElement } from "lwc";

export default class ExampleSubmit extends LightningElement {
  handleClick() {
    const message = this.refs.text.value;
    const submitEvent = new CustomEvent("submit", { detail: message });
    this.dispatchEvent(submitEvent);
  }
}
