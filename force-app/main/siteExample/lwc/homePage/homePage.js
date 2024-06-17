import { LightningElement, wire } from "lwc";
import { publish, MessageContext } from "lightning/messageService";
import headerContent from "@salesforce/messageChannel/headerContent__c";

export default class HomePage extends LightningElement {
  page = "Home";
  breadcrumb = [
    {
      label: "Home",
      url: "https://ellieatlc2024-dev-ed.develop.my.site.com/",
    },
  ];

  @wire(MessageContext)
  messageContext;

  connectedCallback() {
    const page = {
      page: this.page,
      breadcrumbs: JSON.stringify(this.breadcrumb),
    };
    publish(this.messageContext, headerContent, page);
  }
}
