import axios from "axios";

export function message(phon_no_id, from, msg) {
    axios({
        method:"POST",
        url:"https://graph.facebook.com/v20.0/"+phon_no_id+"/messages?access_token="+token,
        data:{
            messaging_product: "whatsapp",
            to: from,
            text: {
              preview_url: false,
              body: msg
            },
            headers:{
                "Content-Type":"application/json"
            }
    
        }
    });
}

export function messageP(phon_no_id, from, msg) {
  axios({
      method:"POST",
      url:"https://graph.facebook.com/v20.0/"+phon_no_id+"/messages?access_token="+token,
      data:{
          messaging_product: "whatsapp",
          to: from,
          text: {
            preview_url: true,
            body: msg
          },
          headers:{
              "Content-Type":"application/json"
          }
  
      }
  });
}

export function sendCatalogMessage(phon_no_id, from, text) {
  axios({
      method: "POST",
      url: "https://graph.facebook.com/v20.0/" + phon_no_id + "/messages?access_token=" + token,
      headers: {
          "Content-Type": "application/json"
      },
      data: {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: from,
          type: "interactive",
          interactive: {
              type: "catalog_message",
              body: {
                  text: text
              },
              action: {
                  name: "catalog_message",
                  parameters: {
                      thumbnail_product_retailer_id: "11"
                  }
              }
          }
      }
  });
}


export function ask2options(phon_no_id, from, ask, op1, op2) {
    axios({
        method:"POST",
        url:"https://graph.facebook.com/v20.0/"+phon_no_id+"/messages?access_token="+token,
        data:{
            messaging_product:"whatsapp",
            to:from,
            type: "interactive",
            interactive:{
                 type: "button",
                 body: {
                 text: ask
             },
             action: {
                 buttons: [
                   {
                     type: "reply",
                     reply: {
                       id: "qdwfe",
                       title: op1
                     }
                   },
                   {
                     type: "reply",
                     reply: {
                       id: "asssd",
                       title: op2
                     }
                   }
                 ]
               }
            }
        },
        headers:{
            "Content-Type":"application/json"
        }

    });
}

export function ask3options(phon_no_id, from, ask, op1, op2, op3) {
  axios({
      method:"POST",
      url:"https://graph.facebook.com/v19.0/"+phon_no_id+"/messages?access_token="+token,
      data:{
          messaging_product:"whatsapp",
          to:from,
          type: "interactive",
          interactive:{
               type: "button",
               body: {
               text: ask
           },
           action: {
               buttons: [
                 {
                   type: "reply",
                   reply: {
                     id: "qdwffe",
                     title: op1
                   }
                 },
                 {
                   type: "reply",
                   reply: {
                     id: "assgfdsd",
                     title: op2
                   }
                 },
                 {
                   type: "reply",
                   reply: {
                     id: "asssgfdsd",
                     title: op3
                   }
                 }
               ]
             }
          }
      },
      headers:{
          "Content-Type":"application/json"
      }

  });
}


export function images(phon_no_id, from) {
  console.log("INSIDE IMG Tallas");
  axios({
      method:"POST",
      url:"https://graph.facebook.com/v20.0/"+phon_no_id+"/messages?access_token="+token,
      data:{
          messaging_product:"whatsapp",
          to:from,
          type: "image",
          image: {
              link: "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-94700000000000000/restaurant_1675804183.png"
            }
          },
          headers:{
              "Content-Type":"application/json"
          }
  
      });
}


export async function getURL(id) {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://graph.facebook.com/v20.0/' + id,
      headers: { 
        'Authorization': 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      maxBodyLength: Infinity,
    });
    return response.data; // Ensure to return the data
  } catch (error) {
    console.error('Error fetching URL:', error);
    throw error; // Re-throw the error after logging it
  }
}

export async function getAudio(url) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      headers: { 
        'Authorization': 'Bearer ' + token,
        "Content-Type": "application/json"
      },
      responseType: 'arraybuffer',
      maxBodyLength: Infinity,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching audio:', error);
    throw error;
  }
}

export function reservation(phon_no_id, from) {
  axios({
      method:"POST",
      url:"https://graph.facebook.com/v20.0/"+phon_no_id+"/messages?access_token="+token,
      data:{
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: from,
        type: "template",
        template: {
            name: "reservation",
            language: {
                code: "en"
            },
            components: [
                {
                    type: "button",
                    sub_type: "flow",
                    index: "0",
                    parameters: [
                        {
                            type: "action",
                            action: {
                                flow_action_data: {
                                  "version": "3.1",
                                  "screens": [
                                    {
                                      "id": "QUESTION_ONE",
                                      "title": "Book a table",
                                      "data": {},
                                      "layout": {
                                        "type": "SingleColumnLayout",
                                        "children": [
                                          {
                                            "type": "Form",
                                            "name": "flow_path",
                                            "children": [
                                              {
                                                "type": "DatePicker",
                                                "label": "Date",
                                                "required": true,
                                                "name": "DatePicker_38fb53"
                                              },
                                              {
                                                "type": "Dropdown",
                                                "label": "Time",
                                                "required": true,
                                                "name": "Dropdown_eb56fb",
                                                "data-source": [
                                                  {
                                                    "id": "0_10:00_am",
                                                    "title": "10:00 am"
                                                  },
                                                  {
                                                    "id": "1_10:30_am",
                                                    "title": "10:30 am"
                                                  },
                                                  {
                                                    "id": "2_11:00_am",
                                                    "title": "11:00 am"
                                                  },
                                                  {
                                                    "id": "3_11:30_am",
                                                    "title": "11:30 am"
                                                  },
                                                  {
                                                    "id": "4_12:00_m",
                                                    "title": "12:00 m"
                                                  },
                                                  {
                                                    "id": "5_12:30_pm",
                                                    "title": "12:30 pm"
                                                  },
                                                  {
                                                    "id": "6_1:00_pm",
                                                    "title": "1:00 pm"
                                                  },
                                                  {
                                                    "id": "7_1:30_pm",
                                                    "title": "1:30 pm"
                                                  },
                                                  {
                                                    "id": "8_2:00_pm",
                                                    "title": "2:00 pm"
                                                  },
                                                  {
                                                    "id": "9_2:30_pm",
                                                    "title": "2:30 pm"
                                                  },
                                                  {
                                                    "id": "10_3:00_pm",
                                                    "title": "3:00 pm"
                                                  },
                                                  {
                                                    "id": "11_3:30_pm",
                                                    "title": "3:30 pm"
                                                  }
                                                ]
                                              },
                                              {
                                                "type": "Dropdown",
                                                "label": "People",
                                                "required": true,
                                                "name": "Dropdown_c207fe",
                                                "data-source": [
                                                  {
                                                    "id": "0_1",
                                                    "title": "1"
                                                  },
                                                  {
                                                    "id": "1_2",
                                                    "title": "2"
                                                  },
                                                  {
                                                    "id": "2_3",
                                                    "title": "3"
                                                  },
                                                  {
                                                    "id": "3_4",
                                                    "title": "4"
                                                  }
                                                ]
                                              },
                                              {
                                                "type": "Dropdown",
                                                "label": "Location",
                                                "required": true,
                                                "name": "Dropdown_ae9454",
                                                "data-source": [
                                                  {
                                                    "id": "0_2000_NW_2nd_Ave,_Miami,_FL_33127",
                                                    "title": "2000 NW 2nd Ave, Miami, FL 33127"
                                                  }
                                                ]
                                              },
                                              {
                                                "type": "Footer",
                                                "label": "Continue",
                                                "on-click-action": {
                                                  "name": "navigate",
                                                  "next": {
                                                    "type": "screen",
                                                    "name": "screen_zeereo"
                                                  },
                                                  "payload": {
                                                    "screen_0_DatePicker_0": "${form.DatePicker_38fb53}",
                                                    "screen_0_Dropdown_1": "${form.Dropdown_eb56fb}",
                                                    "screen_0_Dropdown_2": "${form.Dropdown_c207fe}",
                                                    "screen_0_Dropdown_3": "${form.Dropdown_ae9454}"
                                                  }
                                                }
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    },
                                    {
                                      "id": "screen_zeereo",
                                      "title": "Booking details",
                                      "data": {
                                        "screen_0_DatePicker_0": {
                                          "type": "string",
                                          "__example__": "Example"
                                        },
                                        "screen_0_Dropdown_1": {
                                          "type": "string",
                                          "__example__": "Example"
                                        },
                                        "screen_0_Dropdown_2": {
                                          "type": "string",
                                          "__example__": "Example"
                                        },
                                        "screen_0_Dropdown_3": {
                                          "type": "string",
                                          "__example__": "Example"
                                        }
                                      },
                                      "terminal": true,
                                      "layout": {
                                        "type": "SingleColumnLayout",
                                        "children": [
                                          {
                                            "type": "Form",
                                            "name": "flow_path",
                                            "children": [
                                              {
                                                "type": "TextInput",
                                                "name": "TextInput_428d5a",
                                                "label": "Name",
                                                "required": true,
                                                "input-type": "text",
                                                "helper-text": "Name"
                                              },
                                              {
                                                "type": "TextInput",
                                                "label": "Special Occasion",
                                                "name": "TextInput_683f5a",
                                                "required": false,
                                                "input-type": "text"
                                              },
                                              {
                                                "type": "TextArea",
                                                "label": "Requirements",
                                                "required": false,
                                                "name": "TextArea_55772e"
                                              },
                                              {
                                                "type": "Footer",
                                                "label": "Complete",
                                                "on-click-action": {
                                                  "name": "complete",
                                                  "payload": {
                                                    "screen_1_TextInput_0": "${form.TextInput_428d5a}",
                                                    "screen_1_TextInput_1": "${form.TextInput_683f5a}",
                                                    "screen_1_TextArea_2": "${form.TextArea_55772e}",
                                                    "screen_0_DatePicker_0": "${data.screen_0_DatePicker_0}",
                                                    "screen_0_Dropdown_1": "${data.screen_0_Dropdown_1}",
                                                    "screen_0_Dropdown_2": "${data.screen_0_Dropdown_2}",
                                                    "screen_0_Dropdown_3": "${data.screen_0_Dropdown_3}"
                                                  }
                                                }
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    }
                                  ]
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },
      headers:{
          "Content-Type":"application/json"
      }
  
      });
}

export function feedback(phon_no_id, from) {
  axios({
      method:"POST",
      url:"https://graph.facebook.com/v20.0/"+phon_no_id+"/messages?access_token="+token,
      data:{
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: from,
        type: "template",
        template: {
            name: "feedback",
            language: {
                code: "en_US"
            },
            components: [
                {
                    type: "body",
                    parameters: [
                      {
                        "type": "text",
                        "text": "Food"
                      }
                    ]
                },
                {
                    type: "button",
                    sub_type: "flow",
                    index: "0",
                    parameters: [
                        {
                            type: "action",
                            action: {
                                flow_action_data: {
                                  "version": "3.1",
                                  "screens": [
                                      {
                                          "id": "SURVEY",
                                          "title": "Survey",
                                          "data": {},
                                          "terminal": true,
                                          "layout": {
                                              "type": "SingleColumnLayout",
                                              "children": [
                                                  {
                                                      "type": "Form",
                                                      "name": "flow_path",
                                                      "children": [
                                                          {
                                                              "type": "TextSubheading",
                                                              "text": "Rate your experience"
                                                          },
                                                          {
                                                              "type": "RadioButtonsGroup",
                                                              "label": "Choose one",
                                                              "required": true,
                                                              "name": "RadioButtonsGroup_3b18d8",
                                                              "data-source": [
                                                                  {
                                                                      "id": "0_★★★★★_•_Excellent_(5/5)",
                                                                      "title": "★★★★★ • Excellent (5/5)"
                                                                  },
                                                                  {
                                                                      "id": "1_★★★★☆_•_Good_(4/5)",
                                                                      "title": "★★★★☆ • Good (4/5)"
                                                                  },
                                                                  {
                                                                      "id": "2_★★★☆☆_•_Average_(3/5)",
                                                                      "title": "★★★☆☆ • Average (3/5)"
                                                                  },
                                                                  {
                                                                      "id": "3_★★☆☆☆_•_Poor_(2/5)",
                                                                      "title": "★★☆☆☆ • Poor (2/5)"
                                                                  },
                                                                  {
                                                                      "id": "4_★☆☆☆☆_•_Very_Poor_(1/5)",
                                                                      "title": "★☆☆☆☆ • Very Poor (1/5)"
                                                                  }
                                                              ]
                                                          },
                                                          {
                                                              "type": "TextSubheading",
                                                              "text": "How could we do better?"
                                                          },
                                                          {
                                                              "type": "TextArea",
                                                              "label": "Leave a comment",
                                                              "required": false,
                                                              "name": "TextArea_de923b"
                                                          },
                                                          {
                                                              "type": "Footer",
                                                              "label": "Done",
                                                              "on-click-action": {
                                                                  "name": "complete",
                                                                  "payload": {
                                                                      "screen_0_RadioButtonsGroup_0": "${form.RadioButtonsGroup_3b18d8}",
                                                                      "screen_0_TextArea_1": "${form.TextArea_de923b}"
                                                                  }
                                                              }
                                                          }
                                                      ]
                                                  }
                                              ]
                                          }
                                      }
                                  ]
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },
      headers:{
          "Content-Type":"application/json"
      }
  
      });
}
