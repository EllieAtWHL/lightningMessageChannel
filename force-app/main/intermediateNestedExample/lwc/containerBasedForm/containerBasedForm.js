import { LightningElement } from 'lwc';

export default class ContainerBasedForm extends LightningElement {

    searchKey;

    handleClick() {
        const searchEvent = new CustomEvent('search', { detail: this.searchKey });
        this.dispatchEvent(searchEvent);
 }

    handleSearchKeyChange(event) {
        this.searchKey = event.target.value;
    }

    get isSearchDisabled(){
        return !this.searchKey || this.searchKey.length < 2;
    }

}