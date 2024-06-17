import { LightningElement } from "lwc";

export default class ExampleContainer extends LightningElement {
  text;

  handleSubmit(event) {
    this.text = event.detail;
  }
}
