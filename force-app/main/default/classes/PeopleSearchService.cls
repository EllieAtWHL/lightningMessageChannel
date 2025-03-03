public with sharing class PeopleSearchService {
    @AuraEnabled
    public static List<SearchResult> searchPeople(String searchKey) {
        List<SearchResult> results = new List<SearchResult>();

        // Query for contacts
        List<Contact> matchingContacts = [SELECT Id, Name, Email FROM Contact WHERE Name LIKE :('%' + searchKey + '%') WITH SECURITY_ENFORCED];
        for (Contact c : matchingContacts) {
            results.add(new SearchResult(c.Id, c.Name, c.Email, 'Contact'));
        }

        // Query for leads
        List<Lead> matchingLeads = [SELECT Id, Name, Email FROM Lead WHERE Name LIKE :('%' + searchKey + '%') WITH SECURITY_ENFORCED];
        for (Lead l : matchingLeads) {
            results.add(new SearchResult(l.Id, l.Name, l.Email, 'Lead'));
        }

        // Query for users
        List<User> matchingUsers = [SELECT Id, Name, Email FROM User WHERE Name LIKE :('%' + searchKey + '%') WITH SECURITY_ENFORCED];
        for (User u : matchingUsers) {
            results.add(new SearchResult(u.Id, u.Name, u.Email, 'User'));
        }

        return results;
    }

    
    public class SearchResult {
        @AuraEnabled
        public Id recordId;
        @AuraEnabled
        public String name;
        @AuraEnabled
        public String email;
        @AuraEnabled
        public String type;

        public SearchResult(Id recordId, String name, String email, String type) {
            this.recordId = recordId;
            this.name = name;
            this.email = email;
            this.type = type;
        }
    }
}