'use strict';

module.exports = {
  async receive(context) {
    let properties = context.properties;
    let auth = context.auth;
    console.log(111, auth, properties);
    let state = context.state;

    let url = 'https://api.hubapi.com/crm/v3/imports/';
    url += '?type=' + context.messages.in.content.type;
    const { data } = await context.httpRequest({ url: url, method: 'GET' });

    // modify state
    state.data = data;
    // save state
    context.state = state;

    context.sendJson(data, 'out');
  }
};

// appmixer test component appmixer/hubapi/crm/imports -i '{ "in": { "after": "123", "before": "123", "limit": 10 } }'
