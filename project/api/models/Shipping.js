/**
 * Shipping.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    grain: {
      type: 'string',
      defaultsTo: '',
    },
    
    date: { 
      type:'date',
      defaultsTo: '',

    },
    
    portY1: {
      collection: 'port',
      defaultsTo: [],
      via: 'ownerPortY1'
    },
    
    portY2: {
      collection: 'port',
      defaultsTo: [],
      via: 'ownerPortY2'
    },
    
    avgY1: { 
      type: 'float',
      defaultsTo: 0.00,
    },
    
    avgY2: { 
      type: 'float',
      defaultsTo: 0.00,
    }


  }
};
