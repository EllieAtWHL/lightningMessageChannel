import { LightningElement, wire } from "lwc";
import { publish, MessageContext } from "lightning/messageService";
import internalExample from "@salesforce/messageChannel/internalExample__c";

export default class MessagePublisher extends LightningElement {
  @wire(MessageContext)
  messageContext;

  handleClick() {
    const message = { text: this.refs.text.value };
    try {
      publish(this.messageContext, internalExample, message);
    } catch (error) {
      console.log(`Error: ${JSON.stringify(error)}`);
    }
  }
}
