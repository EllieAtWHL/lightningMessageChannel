public with sharing class CaseController {

    @AuraEnabled(cacheable=true)
    public static List<Case> retrieveCases(){
        try {
            return [SELECT Id, Subject, Status FROM Case WITH USER_MODE ORDER By Status];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}