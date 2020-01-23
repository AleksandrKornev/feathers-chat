// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (!context.isChats) return context;

    const messages = context.result.data;
    const messagesFiltered = [];
    const userIDs = [];
    
    messages.forEach(message => {
      if (!userIDs.includes(message.fromID) || !userIDs.includes(message.toID)) {
        if (!userIDs.includes(message.fromID) && 
            !userIDs.includes(message.toID)
        ) {
          userIDs.push(message.fromID);
          userIDs.push(message.toID);
          messagesFiltered.push(message);
          return;
        } 
        if (!userIDs.includes(message.fromID)) {
          userIDs.push(message.fromID);
          messagesFiltered.push(message);
          return;
        } 
        if (!userIDs.includes(message.toID)) {
          userIDs.push(message.toID);
          messagesFiltered.push(message);
          return;
        } 
      }
    });

    if (messagesFiltered.length == 0) return context;

    context.result.data = messagesFiltered;

    return context;
  };
};
