@isTest
public class CaseControllerTest {
  @testSetup
  static void makeData(){
        List<Case> cases = new List<Case>();
        for(Integer i = 0; i < 10; i++){
          cases.add(new Case(Status = 'New', Subject = 'Test'+i));
        }
        insert cases;
      }

  @isTest
  static void testRetrieveCases(){

    Test.startTest();
    List<Case> cases = CaseController.retrieveCases();
    Test.stopTest();

    Assert.areEqual(10, cases.size(), 'The incorrect number of cases were retrieved');
    Assert.areEqual('New', cases[0].Status, 'The correct status was not retrieved');
    Assert.areEqual('Test0', cases[0].Subject, 'The correct subject was not retrieved');
  }
}