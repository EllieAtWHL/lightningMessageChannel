import { createElement } from 'lwc';
import MessagePublisher from 'c/messagePublisher';
import { publish } from 'lightning/messageService';
import internalExample from '@salesforce/messageChannel/internalExample__c';


describe('c-message-publisher', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    it('publishes the message on button click', async () => {
      
        const element = createElement('c-message-publisher', {
            is: MessagePublisher
        });
        document.body.appendChild(element);

        const mockTextValue = 'Test message';

        const textarea = element.shadowRoot.querySelector('lightning-textarea');
        textarea.value = mockTextValue;

        const button = element.shadowRoot.querySelector('lightning-button');
        button.click();

        await Promise.resolve();

        expect(publish).toHaveBeenCalledTimes(1);
        expect(publish).toHaveBeenCalledWith(
            undefined,
            internalExample,
            { text: mockTextValue }
        );
    });
});
