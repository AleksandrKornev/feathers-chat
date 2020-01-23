// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const userID = context.params.authentication.payload.sub;
    if (context.params.query && context.params.query.chat) {
      context.params.query = {
        $or: [
          { fromID: userID },
          { toID: userID },
        ],
        $sort: {
          id: -1
        },
        $limit: 99999999
      }
      context.isChats = true;
    }

    return context;
  };
};
