// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const userID = context.params.authentication.payload.sub;
    const messages = context.result.data;

    const res = await context.app.service("/users").find();
    const users = res.data;

    messages.forEach(message => {
      if (message.fromID != userID) {
        users.forEach(user => {
          if (message.fromID == user.id) { 
            message.companion = user.email;
            message.companionID = user.id;
          }
        })
      } else if (message.toID != userID) {
        users.forEach(user => {
          if (message.toID == user.id) {
            message.companion = user.email;
            message.companionID = user.id;
          }
        })
      }
    })
    
    context.result.data = messages;

    return context;
  };
};
