  require('dotenv').config()
  const dialogflow = require('dialogflow');
  const path = require('path');
  const argv = process.argv.slice(2);

  //GOOGLE IAM PERMISSION (.env file)
  const PROJECT_ID = process.env.PROJECT_ID; //https://dialogflow.cloud.google.com/#/editAgent/
  const PROJECT_SESSION_ID = process.env.PROJECT_SESSION_ID; //https://console.cloud.google.com/iam-admin/iam
  const PROJECT_FILENAME = process.env.PROJECT_FILENAME; //https://console.cloud.google.com/iam-admin/serviceaccounts

  //SESSION CLIENT DIALOGFLOW
  const LANGUAGE_CODE = 'es-ES';
  const PROJECT_FILEPATH = path.dirname(__filename) + '/private/' + PROJECT_FILENAME;
  const SessionsClient = new dialogflow.SessionsClient({projectId: PROJECT_ID, keyFilename: PROJECT_FILEPATH});
  const SessionPath = SessionsClient.sessionPath(PROJECT_ID, PROJECT_SESSION_ID);

  //QUERY
  if(typeof argv[0] === 'undefined')var query = '';
  else var query = argv[0];

  //PREPARE REQUEST TO DIALOGFLOW
  if(query != ''){
    new Promise((resolve, reject) => {
      const request = {
        session: SessionPath,
        queryInput: {
          text: {
            text: query,
            languageCode: LANGUAGE_CODE,
          },
        },
      };

      //SEND REQUEST TO DETECT INTENT DIALOGFLOW
      SessionsClient.detectIntent(request).then(responses => {
        console.log(responses);
        const queryResult = responses[0].queryResult;
        const action = queryResult.action;
        const queryText = queryResult.queryText;
        const fulfillmentText = queryResult.fulfillmentText;

      }).catch(err => {
        console.log(err);
      })
    })
  }
