public with sharing class OpportunityController {

    @AuraEnabled(cacheable=true)

    public static List<Opportunity> retrieveOpportunities(){
        try {            
            return [SELECT Id, Name, Amount, StageName FROM Opportunity WITH USER_MODE ORDER BY StageName];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}