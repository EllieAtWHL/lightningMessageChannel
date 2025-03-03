import { LightningElement } from 'lwc';
import peopleSearch from '@salesforce/apex/PeopleSearchService.searchPeople';


export default class ContainerBasedContainer extends LightningElement {

    searchKey;
    searchResults;
    person;

    handleSearch(event) {
        console.log(event.detail);
        this.searchKey = event.detail;
        peopleSearch({searchKey: this.searchKey})
            .then(result => {
                this.searchResults = result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleSelect(event) {
        this.person = event.detail;
    }
}