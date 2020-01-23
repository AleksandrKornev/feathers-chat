// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const userID = context.params.authentication.payload.sub;

    if (context.params.query && context.params.query.$paginate) {
      if (context.params.query.$paginate === 'false') {
        //console.log(context.params.paginate);
        context.params.paginate = {
          default: 20,
          max: 1000
        }
        delete context.params.query.$paginate;
      }
    }

    if (context.params.query && context.params.query.companionID) {
      const { companionID } = context.params.query;
      context.params.query = {
        ...context.params.query,
        $or: [
          { fromID: userID, toID: companionID },
          { fromID: companionID, toID: userID },
        ],
        $sort: {
          id: -1
        }
      }
      delete context.params.query.companionID;
    }

    return context;
  };
};
