import { LightningElement, api } from 'lwc';

export default class ContainerBasedList extends LightningElement {

    @api searchResults;

    handleSelect(event){
        console.log('Card clicked - containerBasedList!')
        console.log(JSON.stringify(event.detail));
        const selectEvent = new CustomEvent('select', {detail: event.detail});
        this.dispatchEvent(selectEvent);
    }

}