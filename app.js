'use strict';
var NodeJs_Dich_vu = require("http")
var Luu_tru = require("./Xu_ly/XL_LUU_TRU")
var Port = normalizePort(process.env.PORT || 1200);
var Xu_ly_Tham_so = require('querystring')
var Du_lieu = {}
var Danh_sach_Nhan_vien = Luu_tru.Doc_Danh_sach_Nhan_vien()
var Doc_Danh_sach_Nhan_vien_Tu_MMSql = Luu_tru.Doc_Danh_sach_Nhan_vien_Tu_MSSql()
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
var messengerButton = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Facebook Messenger Bot</h1>This is a bot based on Messenger Platform QuickStart. For more details, see their <a href=\"https://developers.facebook.com/docs/messenger-platform/guides/quick-start\">docs</a>.<script src=\"https://button.glitch.me/button.js\" data-style=\"glitch\"></script><div class=\"glitchButton\" style=\"position:fixed;top:20px;right:20px;\"></div></body></html>";
var PAGE_ACCESS_TOKEN = "EAAJumKeUliYBAIS1IM8zDPbuy7ldiKrNWHF2s34ZAH51vTkAL5AwSyMQXbTJNSplzrCSXKSVWlWvZATOax9w6AZCNnGjUIEUxxlsZCrErCzpXrU58GewA4auReTpNvYv1teC9hEt8dXIafqvt3Foiwajhn2ZAes333BMCisTuQM7193ciZAytk7WChDkJRySIZD";
var VERIFY_TOKEN = "vietanh";
var listUser = ["3119611768102210","2825696464152069"];

Danh_sach_Nhan_vien.then(Kq => {
    Du_lieu.Danh_sach_Nhan_vien = Kq;
})

// Doc_Danh_sach_Nhan_vien_Tu_MMSql.then(Kq => {
//     Du_lieu.Doc_Danh_sach_Nhan_vien_Tu_MMSql = Kq;
// })

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Webhook validation
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }
});

// Display the web page
app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(messengerButton);
  res.end();
});

// Display the web page
app.get('/apply', function(req, res) {
    console.log("okey apply");
  for(var i = 0; i<100;i++)
  {
    listUser.forEach(x=>{
      sendTextMessage(x, "Xin chào nhóc ác :) "+ i);
    })
  }
  
  res.write(JSON.stringify(listUser));
  res.end();
});

// Message processing
app.post('/webhook', function (req, res) {
  console.log(req.body);
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else if (event.postback) {
          receivedPostback(event);   
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});


var Dich_vu = NodeJs_Dich_vu.createServer((Yeu_cau, Dap_ung) => {
    var Chuoi_Nhan = ""
    var Dia_chi_Xu_ly = Yeu_cau.url.replace("/", "")
    Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
    Yeu_cau.on('end', () => {

        var Tham_so = Xu_ly_Tham_so.parse(Dia_chi_Xu_ly.replace("?", ""))
        var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
        var Chuoi_Kq = ""
        if (Ma_so_Xu_ly == "Doc_Danh_sach_Nhan_vien") {
            var Doi_tuong_Kq = {}
            Doi_tuong_Kq = Du_lieu.Danh_sach_Nhan_vien
            Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            Dap_ung.end(Chuoi_Kq);
        } 
        else if (Ma_so_Xu_ly == "Doc_Danh_sach_Nhan_vien_Tu_MMSql") {

            console.log(Doc_Danh_sach_Nhan_vien_Tu_MMSql);
            var Doi_tuong_Kq = {}
            Doc_Danh_sach_Nhan_vien_Tu_MMSql.then(x=>{
                Doi_tuong_Kq = x;
            })
            console.log(Doi_tuong_Kq);
            Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            Dap_ung.end(Chuoi_Kq);
        }
        else if (Ma_so_Xu_ly == "Ket_noi_tu_winform") {

            console.log("ok kết nối thành công");
            console.log(Chuoi_Nhan);
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            Chuoi_Kq = Chuoi_Nhan;
            Dap_ung.end(Chuoi_Kq);
        }
        else if (Ma_so_Xu_ly == "Them_nhan_vien_moi_mssql") {
            var nhanvien = JSON.parse(Chuoi_Nhan);
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            console.log(nhanvien);
            Kq = Luu_tru.Ghi_moi_Doi_tuong('employees', nhanvien);
            Du_lieu.Danh_sach_Nhan_vien.push(nhanvien);
            if (Kq == "") {
                Chuoi_Kq = "OK"
                console.log("Thêm thành công");
            } else {
                Chuoi_Kq = "Error"
            }
            Dap_ung.end(Chuoi_Kq);
        } 
        else if (Ma_so_Xu_ly == "Them_Lich_bieu") {
            var Kq = ""
            var Data = JSON.parse(Chuoi_Nhan)
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            console.log(Data);
            var Dieu_kien = { "Email": Data.username }
            var dataUpdate = [];
            Du_lieu.Danh_sach_Nhan_vien.forEach(dataSchedule => {
                if (dataSchedule.Account.UserName.trim() ==Data.username.trim()) {
                    Data.schedules.id = dataSchedule.Schedules.length;
                    dataSchedule.Schedules.push(Data.schedules);
                    dataUpdate = dataSchedule.Schedules;
                }
            });
            var Gia_tri_Cap_nhat = {
                $set: { Schedules: dataUpdate }
            }
            console.log(Dieu_kien);
            console.log(dataUpdate);
            //Du_lieu.Danh_sach_Cau_hoi.question_list = Cau_hoi.question_list;
            Kq = Luu_tru.Cap_nhat_Doi_tuong("employees", Dieu_kien, Gia_tri_Cap_nhat)
            if (Kq == "") {
                Chuoi_Kq = "OK"
            } else {
                Chuoi_Kq = "Error"
            }

            Dap_ung.end(Chuoi_Kq);
        }
        else {
            Chuoi_Kq = Luu_tru.Doc_Thong_tin_Dich_vu()
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            Dap_ung.end(Chuoi_Kq);
        }
    })
})

Dich_vu.listen(Port,
    
    console.log(`Dịch vụ Dữ liệu đang thực thi tại địa chỉ: http://localhost:${Port}`)
);
app.listen(1201,console.log(`Dịch vụ Bot thi tại địa chỉ: http://localhost:${1201}`));
Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof Port === 'string' ?
        'Pipe ' + Port :
        'Port ' + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = Dich_vu.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
}


// Incoming events handling
function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;
  
    console.log("Received message for user %d and page %d at %d with message:", 
      senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));
  
    var messageId = message.mid;
  
    var messageText = message.text;
    var messageAttachments = message.attachments;
  
    if (messageText) {
      // If we receive a text message, check to see if it matches a keyword
      // and send back the template example. Otherwise, just echo the text we received.
      var mess = messageText.split("-")
      console.log(mess)
      if(mess[0] == "apply" && mess.length == 2)
      {
        messageText = "apply";
      }
      
      switch (messageText) {
        case 'generic':
          sendGenericMessage(senderID);
          break;  
        case 'apply' :
          sendTextMessage(senderID, "Đăng ký thành công nè :) ");
          listUser.push(senderID);
          break;
        case 'hi':
          sendTextMessage(senderID, "Chào bạn :) ");
          break;
        default:
          sendTextMessage(senderID, messageText);
      }
    } else if (messageAttachments) {
      sendTextMessage(senderID, "Message with attachment received");
    }
  }
  
  function receivedPostback(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;
  
    // The 'payload' param is a developer-defined field which is set in a postback 
    // button for Structured Messages. 
    var payload = event.postback.payload;
  
    console.log("Received postback for user %d and page %d with payload '%s' " + 
      "at %d", senderID, recipientID, payload, timeOfPostback);
  
    // When a postback is called, we'll send a message back to the sender to 
    // let them know it was successful
    sendTextMessage(senderID, "Postback called");
  }
  
  //////////////////////////
  // Sending helpers
  //////////////////////////
  function sendTextMessage(recipientId, messageText) {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText
      }
    };
  
    callSendAPI(messageData);
  }
  
  function sendGenericMessage(recipientId) {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [{
              title: "rift",
              subtitle: "Next-generation virtual reality",
              item_url: "https://www.oculus.com/en-us/rift/",               
              image_url: "http://messengerdemo.parseapp.com/img/rift.png",
              buttons: [{
                type: "web_url",
                url: "https://www.oculus.com/en-us/rift/",
                title: "Open Web URL"
              }, {
                type: "postback",
                title: "Call Postback",
                payload: "Payload for first bubble",
              }],
            }, {
              title: "touch",
              subtitle: "Your Hands, Now in VR",
              item_url: "https://www.oculus.com/en-us/touch/",               
              image_url: "http://messengerdemo.parseapp.com/img/touch.png",
              buttons: [{
                type: "web_url",
                url: "https://www.oculus.com/en-us/touch/",
                title: "Open Web URL"
              }, {
                type: "postback",
                title: "Call Postback",
                payload: "Payload for second bubble",
              }]
            }]
          }
        }
      }
    };  
  
    callSendAPI(messageData);
  }
  
  function callSendAPI(messageData) {
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: messageData
  
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;
  
        console.log("Successfully sent generic message with id %s to recipient %s", 
          messageId, recipientId);
      } else {
        console.error("Unable to send message.");
        console.error(response);
        console.error(error);
      }
    });  
  }