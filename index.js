const express=require("express");
const body_parser=require("body-parser");

require('dotenv').config();

const fs = require('fs');
const path = require('path');

//const AWS = require('aws-sdk');
const { menuItems } = require('./utils/constants.js');
const { main1, createAssistant } = require('./openai/openai.js');
const { message, messageP, getAudio, getURL } = require('./utils/whatsapp.js');
const { convertOggToMp3, transcribeAudio } = require('./utils/media.js');
const { updatePaymentstatus } = require('./payment/payment.js');
const { obtainFlujo, getThread, AssignFlow, getphon_no_id } = require('./database/database.js');

const app=express().use(body_parser.json());

const token=process.env.TOKEN;
const mytoken=process.env.MYTOKEN;//WA TOKEN


//-----------------------------------------------------------------------------------------------------------------------------


app.listen(process.env.PORT,()=>{
    console.log("webhook is listening");
});

//to verify the callback url from dashboard side - cloud api side
app.get("/webhook",(req,res)=>{
   let mode=req.query["hub.mode"];
   let challange=req.query["hub.challenge"];
   let token=req.query["hub.verify_token"];

    if(mode && token){
        if(mode==="subscribe" && token===mytoken){
            res.status(200).send(challange);
        }else{
            res.status(403);
        }

    }

});


app.post("/webhook", async (req,res)=>{ //i want some 

    let body_param=req.body;

    console.log("--------------REQ------------------");
    console.log(JSON.stringify(body_param,null,2));
    console.log("--------------REQ------------------");

    if(body_param.object){
        console.log("inside body param");
        try {
            let phon_no_id=body_param.entry[0].changes[0].value.metadata.phone_number_id;
            let from = body_param.entry[0].changes[0].value.messages[0].from; 
            let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

            let name = body_param.entry[0].changes[0].value.contacts[0].profile.name;
            
            console.log("---------NM-----");
            console.log("phone number "+phon_no_id);
            console.log("from "+from);
            console.log("msg_body "+msg_body);
            console.log("---------NM-----");
            console.log("name "+name);


            if (!assistant){
              assistant = await createAssistant();
            }

            let flujo;
            flujo = await obtainFlujo(from, name, phon_no_id);
            console.log("Flujo Obtained. "+flujo);

            if (flujo === 0){
              //images(phon_no_id, from);
              //ask2options(phon_no_id,from,`Hello ${name}! Welcome to LIRA Beirut Eatery. How can I assist you today?`,"Order from menu","Make a reservation");
              let thread = await getThread(from);
              //await addMessage(thread, msg_body);
              let replyGpt = await main1(msg_body, `Say Something like “Hello ${name} , My name is Sofia Welcome to LIRA Beirut Eatery, What will you like to order today?`, thread, phon_no_id, from);
              message(phon_no_id, from, replyGpt[replyGpt.length - 1].content);
              console.log("---------ANS-----");
              console.log(replyGpt[replyGpt.length - 1].content);
              console.log("---------ANS-----");
              //const message = await addMessage(thread, `Hello ${name}! Welcome to LIRA Beirut Eatery. How can I assist you today? -Order from menu -Make a reservation`,"assistant");
              console.log("Interaction already first sended.");
            } else if (flujo === 1){
              let thread = await getThread(from);//get the thread
              let replyGpt = await main1(msg_body, null, thread, phon_no_id, from);
              let Fflujo = await obtainFlujo(from, name, phon_no_id);
              console.log("FLOW BACK AFTER GPT: "+ Fflujo)
              if(Fflujo === 2){
                await AssignFlow(from, 1);
                console.log("Interaction already sended, RESET 1");
              } else {
                console.log("---------ANS-----");
                console.log(replyGpt[replyGpt.length - 1].content);
                console.log("---------ANS-----");
                message(phon_no_id, from, replyGpt[replyGpt.length - 1].content);
                console.log("Send message to wa");
              }
            } else if (flujo === 2){
              await AssignFlow(from, 1);
              console.log("Interaction already sended, RESET 1");
            }

            
            res.sendStatus(200)


        } catch (error1) {
          try {
            let phon_no_id=body_param.entry[0].changes[0].value.metadata.phone_number_id;
            let from = body_param.entry[0].changes[0].value.messages[0].from; 
            let msg_body = body_param.entry[0].changes[0].value.messages[0].order.product_items;

            let name = body_param.entry[0].changes[0].value.contacts[0].profile.name;

            console.log("---------RL-----");
            console.log("phone number "+phon_no_id);
            console.log("from "+from);
            console.log(JSON.stringify(msg_body));
            msg_body = JSON.stringify(msg_body);
            console.log("msg_body "+ typeof msg_body);
            console.log("name "+name);
            console.log("---------RL-----");

            if (!assistant){
              assistant = await createAssistant();
              
            } 
            let flujo;

            flujo = await obtainFlujo(from, name, phon_no_id);
            console.log("Flujo Obtained. "+flujo);
            

            console.log("---------DATA-----");
            console.log(`The client just order ${msg_body} match the product_retailer_id with our menu = ${menuItems} `)            
            console.log("---------DATA-----");
            let thread = await getThread(from);
            let replyGpt = await main1(msg_body,`The client just order = ${msg_body} match the product_retailer_id with our menu = ${menuItems} and send him a INVOICE with name and price and total . keep it very short, Always recommended a item (Wine, Dessert, Drink) to the client to increase the order value.`,thread, phon_no_id, from);
            console.log("---------ANS-----");
            //const message = await addMessage(thread.id, "delivery or pickup");
            messageP(phon_no_id, from, replyGpt[replyGpt.length - 1].content);
            console.log("---------ANS-----");
            res.sendStatus(200);
            

          } catch (error3) {
            try {
              let phon_no_id=body_param.entry[0].changes[0].value.metadata.phone_number_id;
              let from = body_param.entry[0].changes[0].value.messages[0].from; 
              let msg_body = body_param.entry[0].changes[0].value.messages[0].interactive.nfm_reply.response_json;
  
              console.log("---------FLOW-----");
              console.log("phone number "+phon_no_id);
              console.log("from "+msg_body);
              console.log("from "+from);
              console.log(JSON.stringify(msg_body));
              msg_body = JSON.stringify(msg_body);
              console.log("---------FLOW-----");
              thread = await getThread(from);
              let replyGpt = await main1(msg_body,`Please find the details for an event reservation:
              Date : screen_0_DatePicker_0 "convert to date from timestamp"
              Name: screen_1_TextInput_0
              People: screen_0_Dropdown_2 [always the last number]
              Special Occasion: screen_1_TextInput_1
              Location: screen_0_Dropdown_3
              Selected Time: screen_0_Dropdown_1
              Requirements: screen_1_TextArea_2
              Please ensure that all necessary arrangements are made according to these details.
              Only show the summary of the reservation`,thread, phon_no_id, from);
              console.log("---------ANS-----");
              messageP(phon_no_id, from, replyGpt[replyGpt.length - 1].content);
              messageP(phon_no_id, "573046583182", replyGpt[replyGpt.length - 1].content);
              console.log("---------ANS-----");
              res.sendStatus(200);

            } catch (error4){
              try {

                let phon_no_id=body_param.entry[0].changes[0].value.metadata.phone_number_id;
                let from = body_param.entry[0].changes[0].value.messages[0].from; 
                let id = body_param.entry[0].changes[0].value.messages[0].audio.id;

                let name = body_param.entry[0].changes[0].value.contacts[0].profile.name;

                console.log("---------RE-----");
                console.log("phone number "+phon_no_id);
                console.log("from "+from);
                console.log("id "+id);
                console.log("name "+name);
                console.log("---------RE-----");

                if (!assistant){
                  assistant = await createAssistant();
                }

                let flujo;
    
                flujo = await obtainFlujo(from, name, phon_no_id);
                console.log("Flujo Obtained. "+flujo);

                let url = await getURL(id);
                console.log("URL: ",url);
                url = url.url;
                console.log("URL URL: ",url);
                let audioBuffer = await getAudio(url);
                console.log("Audio fetched successfully.");
                //console.log("Audio: ",audio);

                const oggFilename = `audio_${Date.now()}.ogg`;
                const oggFilePath = path.join(__dirname, oggFilename);
                const mp3Filename = oggFilename.replace('.ogg', '.mp3');
                const mp3FilePath = path.join(__dirname, mp3Filename);

                fs.writeFileSync(oggFilePath, audioBuffer);

                await convertOggToMp3(oggFilePath, mp3FilePath);
                console.log("Audio converted to MP3 successfully.");

                const transcriptionText = await transcribeAudio(mp3FilePath);
                console.log(`Transcription: ${transcriptionText}`);
                let msg_body = transcriptionText

                if (flujo === 0){
                  //images(phon_no_id, from);
                  //ask2options(phon_no_id,from,`Hello ${name}! Welcome to LIRA Beirut Eatery. How can I assist you today?`,"Order from menu","Make a reservation");
                  let thread = await getThread(from);
                  //await addMessage(thread, msg_body);
                  let replyGpt = await main1(msg_body, `Say Something like “Hello ${name} , My name is Sofia Welcome to LIRA Beirut Eatery, What will you like to order today?`, thread, phon_no_id, from);
                  message(phon_no_id, from, replyGpt[replyGpt.length - 1].content);
                  console.log("---------ANS-----");
                  console.log(replyGpt[replyGpt.length - 1].content);
                  console.log("---------ANS-----");
                  //const message = await addMessage(thread, `Hello ${name}! Welcome to LIRA Beirut Eatery. How can I assist you today? -Order from menu -Make a reservation`,"assistant");
                  console.log("Interaction already first sended.");
                } else if (flujo === 1){
                  let thread = await getThread(from);//get the thread
                  let replyGpt = await main1(msg_body, null, thread, phon_no_id, from);
                  let Fflujo = await obtainFlujo(from, name, phon_no_id);
                  console.log("FLOW BACK AFTER GPT: "+ Fflujo)
                  if(Fflujo === 2){
                    await AssignFlow(from, 1);
                    console.log("Interaction already sended, RESET 1");
                  } else {
                    console.log("---------ANS-----");
                    console.log(replyGpt[replyGpt.length - 1].content);
                    console.log("---------ANS-----");
                    message(phon_no_id, from, replyGpt[replyGpt.length - 1].content);
                    console.log("Send message to wa");
                  }
                } else if (flujo === 2){
                  await AssignFlow(from, 1);
                  console.log("Interaction already sended, RESET 1");
                }

                //let thread = await getThread(from);
                //let replyGpt = await main1(transcriptionText, null , thread, phon_no_id, from);
                //await message(phon_no_id, from, replyGpt[replyGpt.length - 1].content);
                res.sendStatus(200);
                
                

                // Clean up local files if desired
                fs.unlinkSync(oggFilePath);
                fs.unlinkSync(mp3FilePath);


              } catch (error5) {
                console.log("---------ERROR-----");
                console.log(JSON.stringify(body_param,null,2));
                console.log("---------ERROR-----");
                res.sendStatus(404);
              }
              
            } 
        
        }

      }

} else {
  try {
    console.log("BODYYYYYYY LAST");
    console.log("BODYYYYYYY LAST", body_param);
    let id = body_param.data.transaction.id;
    console.log("id "+id);
    let status = body_param.data.transaction.status;
    console.log("status "+status);
    let Link = body_param.data.transaction.payment_link_id;
    Link = `https://checkout.wompi.co/l/${Link}`
    console.log("Link "+Link);
    let Phone = body_param.data.transaction.customer_data.phone_number;
    console.log("Phone "+Phone);
    Phone = Phone.replace("+","");

    console.log("---------PAY-----");
    console.log("id "+id);
    console.log("status "+status);
    console.log("Link "+Link);
    console.log("Phone "+Phone);
    console.log("---------PAY-----");


    await updatePaymentstatus(Link, id, status);
    console.log("Payment Staus Updated");
    let phon_no_id = await getphon_no_id(Phone);
    console.log("Phone ID: ",phon_no_id);

    messageP(phon_no_id, Phone, `Your payment ${Link} has been ${status}`);
    console.log("whatsapp confirmation message sent");
    thread = await getThread(Phone);
    console.log("Thread ID: ",thread);
    //await addMessage(thread, `Your payment ${Link} has been ${status}`,"assistant");
    console.log("ATEMPT: Message added to thread", Phone);
    let replyGpt = await main1(`Your payment ${Link} has been ${status}`,`The client just payed`,thread, phon_no_id, Phone);
    console.log("FINISH: Message added to thread", Phone);
    console.log("---------ANS-----");
    //const message = await addMessage(thread.id, "delivery or pickup");
    messageP(phon_no_id, Phone, replyGpt[replyGpt.length - 1].content);

    console.log("Messague add in thread");

    res.sendStatus(200);

  } catch (error6) {
    console.log("---------ERROR LAST-----");
    console.log(JSON.stringify(body_param,null,2));
    console.log("---------ERROR LAST-----");
    res.sendStatus(404);
  }
} 
});

app.get("/",(req,res)=>{
  res.status(200).send("<h1>hello this is webhook setup</h1>");
});