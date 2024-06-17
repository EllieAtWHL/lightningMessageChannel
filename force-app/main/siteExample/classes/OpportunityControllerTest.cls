@isTest
public class OpportunityControllerTest {
    
    @testSetup
    static void makeData(){
        Account acc = new Account(name = 'test');
        insert acc;
        Opportunity opp = new Opportunity(Name = 'TestOpportunity', AccountId = acc.id, CloseDate = system.today(), StageName = 'Negotiation');
        insert opp;
    }

    @isTest
    static void testOpportunityController(){

        Test.startTest();
        List<Opportunity> opps =    OpportunityController.retrieveOpportunities();
        Test.stopTest();

        Assert.areEqual(1, opps.size(), 'Incorrect number of opportunities returned');
        Assert.areEqual('TestOpportunity', opps[0].Name, 'Incorrect opportunity name returned');
    }
}