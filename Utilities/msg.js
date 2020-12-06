const moment = require('moment');//import time library

function messageFormatter(username, text){//returns a message with time name and content
    return{
        username,
        text,
        time: ' ' + moment().format('h:mm a')
    }
}
module.exports = messageFormatter;