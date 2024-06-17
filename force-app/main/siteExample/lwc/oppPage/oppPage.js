import { LightningElement, wire } from "lwc";
import getOpps from "@salesforce/apex/OpportunityController.retrieveOpportunities";
import { publish, MessageContext } from "lightning/messageService";
import headerContent from "@salesforce/messageChannel/headerContent__c";

export default class OppPage extends LightningElement {
  page = "Opportunities";
  breadcrumb = [
    {
      label: "Home",
      url: "https://ellieatlc2024-dev-ed.develop.my.site.com/",
    },
    {
      label: "Opportunities",
      url: "/opportunities",
    },
  ];

  columns = [
    { label: "Name", fieldName: "Name" },
    { label: "Amount", fieldName: "Amount" },
    { label: "StageName", fieldName: "StageName" },
  ];

  @wire(MessageContext)
  messageContext;

  opps;

  @wire(getOpps)
  retrievedOpps(response) {
    if (response.data) {
      this.opps = response.data;
      const page = {
        page: this.page,
        breadcrumbs: JSON.stringify(this.breadcrumb),
      };
      publish(this.messageContext, headerContent, page);
    }
  }
}
