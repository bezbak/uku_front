import EventEmmiter from 'events';

const Events = new EventEmmiter();

export const setProviderCreateEventListener = (callback = () => {}) => {
  Events.once('afterProviderCreated', (response) => callback(response));
};

export const fillRepaymentCardByProviderResponse = (response) => {
  Events.emit('afterProviderCreated', response);
};

export const setRMCreateEventListener = (callback = () => {}) => {
  Events.once('afterRMCreated', (response) => callback(response));
};

export const fillRepaymentCardByRMResponse = (response) => {
  Events.emit('afterRMCreated', response);
};

export const setRMUpdateEventListener = (callback = () => {}) => {
  Events.once('afterRMUpdated', (response) => callback(response));
};

export const fillRepaymentCardByRMUpdatedResponse = (response) => {
  Events.emit('afterRMUpdated', response);
};
