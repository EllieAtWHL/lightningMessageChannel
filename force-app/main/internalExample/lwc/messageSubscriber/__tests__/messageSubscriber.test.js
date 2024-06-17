import { createElement } from 'lwc';
import MessageSubscriber from 'c/messageSubscriber';
import {
    publish,
    subscribe,
    unsubscribe,
    MessageContext,
    APPLICATION_SCOPE,
} from 'lightning/messageService';
import internalExample from '@salesforce/messageChannel/InternalExample__c';

// Mocking the lightning/messageService module
jest.mock('lightning/messageService', () => {
    return {
        subscribe: jest.fn(),
        unsubscribe: jest.fn(),
        MessageContext: jest.fn(),
        APPLICATION_SCOPE: {},
    };
});

describe('c-message-subscriber', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    it('subscribes to the message channel on connectedCallback', () => {
        // Arrange
        const element = createElement('c-message-subscriber', {
            is: MessageSubscriber,
        });
        document.body.appendChild(element);

        // Assert
        expect(subscribe).toHaveBeenCalledTimes(1);
        expect(subscribe).toHaveBeenCalledWith(
            expect.any(Object), // messageContext
            internalExample,
            expect.any(Function),
            { scope: APPLICATION_SCOPE }
        );
    });

    it('unsubscribes from the message channel on disconnectedCallback', () => {
        // Arrange
        const element = createElement('c-message-subscriber', {
            is: MessageSubscriber,
        });
        document.body.appendChild(element);

        // Act
        document.body.removeChild(element);

        // Assert
        expect(unsubscribe).toHaveBeenCalledTimes(1);
    });

    //TODO: Fix this test
    it('updates text property when a message is received', async() => {
        
        const element = createElement('c-message-subscriber', {is: MessageSubscriber});
        document.body.appendChild(element);

        const messagePayload = { text: 'Test' };
        publish(MessageContext, internalExample, messagePayload);

        await flushPromises();

        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('Test'); 
    });

})
