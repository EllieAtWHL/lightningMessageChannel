import { LightningElement, wire } from "lwc";
import getCases from "@salesforce/apex/CaseController.retrieveCases";
import { publish, MessageContext } from "lightning/messageService";
import headerContent from "@salesforce/messageChannel/headerContent__c";

export default class CasePage extends LightningElement {
  page = "Cases";
  breadcrumb = [
    {
      label: "Home",
      url: "https://ellieatlc2024-dev-ed.develop.my.site.com/",
    },
    {
      label: "Cases",
      url: "/cases",
    },
  ];

  @wire(MessageContext)
  messageContext;

  cases;
  columns = [
    { label: "Subject", fieldName: "Subject" },
    { label: "Status", fieldName: "Status" },
  ];

  @wire(getCases)
  retrievedCases(response) {
    if (response.data) {
      this.cases = response.data;
      const page = {
        page: this.page,
        breadcrumbs: JSON.stringify(this.breadcrumb),
      };
      publish(this.messageContext, headerContent, page);
    }
  }
}
