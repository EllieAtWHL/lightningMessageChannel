import { LightningElement, api, wire } from 'lwc';


export default class ContainerBasedDetail extends LightningElement {
    @api person;

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