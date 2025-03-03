import { LightningElement, wire } from 'lwc';
import peopleSearch from '@salesforce/apex/PeopleSearchService.searchPeople';
import { publish, MessageContext } from "lightning/messageService";
import searchResultsMessage from "@salesforce/messageChannel/searchResults__c";

export default class MessageSearch extends LightningElement {

    searchKey;

    @wire(MessageContext)
    messageContext;


    handleClick() {
        peopleSearch({searchKey: this.searchKey})
            .then(result => {
                publish(this.messageContext, searchResultsMessage, {searchResults: result});
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleSearchKeyChange(event) {
        this.searchKey = event.target.value;
    }

    get isSearchDisabled(){
        return !this.searchKey || this.searchKey.length < 2;
    }
}