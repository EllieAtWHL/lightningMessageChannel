import { LightningElement, wire } from 'lwc';
import { publish, subscribe, APPLICATION_SCOPE, MessageContext } from "lightning/messageService";
import searchResultsMessage from "@salesforce/messageChannel/searchResults__c";
import selectedPersonMessage from "@salesforce/messageChannel/personSelected__c";

export default class MessageSearchResults extends LightningElement {
    searchResults;
    subscription;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToSearchResults();
    }

    subscribeToSearchResults() {
        this.subscription = subscribe(
            this.messageContext,
            searchResultsMessage,
            (searchResultsMessage) => this.handleSearchResults(searchResultsMessage),
            { scope: APPLICATION_SCOPE }
        );
    }

    handleSearchResults(searchResultsMessage) {
        this.searchResults = searchResultsMessage.searchResults;
    }

    handleSelect(event){
        const selectedPerson = event.detail;
        publish(this.messageContext, selectedPersonMessage, selectedPerson);
    }

}