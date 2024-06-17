import { LightningElement, wire } from "lwc";
import {
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE,
  MessageContext,
} from "lightning/messageService";
import headerContent from "@salesforce/messageChannel/headerContent__c";

export default class SiteHeader extends LightningElement {
  page;
  breadcrumbs;

  @wire(MessageContext)
  messageContext;

  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        headerContent,
        (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE }
      );
    }
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  handleMessage(message) {
    this.page = message.page;
    this.breadcrumbs = JSON.parse(message.breadcrumbs);
    console.log(JSON.stringify(this.breadcrumbs));
  }

  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  disconnectedCallback() {
    this.unsubscribeToMessageChannel();
  }
}
