import { LightningElement, wire } from 'lwc';
import { subscribe, APPLICATION_SCOPE, MessageContext } from "lightning/messageService";
import selectedPersonMessage from "@salesforce/messageChannel/personSelected__c";

export default class MessageEditPerson extends LightningElement {

    person;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToPersonSelected();
    }

    subscribeToPersonSelected() {
        this.subscription = subscribe(
            this.messageContext,
            selectedPersonMessage,
            (selectedPersonMessage) => this.handlePersonSelected(selectedPersonMessage),
            { scope: APPLICATION_SCOPE }
        );
    }

    handlePersonSelected(selectedPersonMessage) {
        this.person = selectedPersonMessage;
    }

    get iconType(){
        switch(this.person.type){
            case 'Contact':
                return 'standard:contact';
            case 'Lead':
                return 'standard:lead';
            case 'User':
                return 'standard:user';
            default:
                return 'standard:default';
        }
    }
}