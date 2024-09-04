const { OpenAI } = require("openai");

const { tool1, tool2, tool3, tool4, tool5, tool6, tool7, tool8, prompt } = require('../utils/constants.js');
const { messageP, reservation, feedback, sendCatalogMessage } = require('../utils/whatsapp.js');
const { getPaymentStatus, saveLink, getPaymentLink } = require('../payment/payment.js');
const { AssignFlow, getName } = require('../database/database.js');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });
  
  let assistant;



const handleRequiresAction = async (run, thread, phon_no_id, from) => {
    // Check if there are tools that require outputs
    if (
      run.required_action &&
      run.required_action.submit_tool_outputs &&
      run.required_action.submit_tool_outputs.tool_calls
    ) {
      // Loop through each tool in the required action section
      const toolOutputsPromises = run.required_action.submit_tool_outputs.tool_calls.map(
        async (tool) => {
          if (tool.function.name === "getCurrentMenu") {
            console.log("TOOLSSSSSSSSSS:",menuItems);
            return {
              tool_call_id: tool.id,
              output: menuItems,
            };
          } else if (tool.function.name === "showInteractiveMenu") {
            const args = JSON.parse(tool.function.arguments);
            console.log("TOOLlllllllll:",args);
            console.log("TOOL:",args.messageC);
            await sendCatalogMessage(phon_no_id, from, args.messageC);
            await AssignFlow(from, 2);
            return {
              tool_call_id: tool.id,
              output: "The interactive menu was send to the user",
            };
          } else if (tool.function.name === "showInteractiveReservation") {
            const args = JSON.parse(tool.function.arguments);
            console.log("TOOLlllllllll:",args);
            console.log("TOOL:",args.messageR);
            await reservation(phon_no_id, from);
            await AssignFlow(from, 2);
            return {
              tool_call_id: tool.id,
              output: "The interactive reservation app was send to the user",
            }
          } else if (tool.function.name === "getUserData") {
            const args = JSON.parse(tool.function.arguments);
            console.log("TOOL:",args.messageU);
            let name = await getName(from);
            return {
              tool_call_id: tool.id,
              output: `Name: ${name} Phone: ${from}`,
            }
          } else if (tool.function.name === "getPaymentLink") {
            const args = JSON.parse(tool.function.arguments);
            console.log("TOOL:",args.name);
            console.log("AMOUNT:",args.amount);
            let Link = await getPaymentLink(args.name, args.amount);
            await saveLink(from, Link);
            console.log("Pagos: ",Link);
            return {
                tool_call_id: tool.id,
                output: Link,
              }
          } else if (tool.function.name === "sendOrdertoKitchen") {
            const args = JSON.parse(tool.function.arguments);
            console.log("TOOLlllllllll:",args);
            console.log("name:",args.name);
            console.log("phone:",args.phone);
            console.log("items:",args.items);
            console.log("payment:",args.payment);
            console.log("amount:",args.amount);
            console.log("type:",args.type);
            console.log("status:",args.status);
            let s;
            if((args.type === "pickup") || (args.type === "Pickup")){
              s = "Pickup";
            } else {
              s = args.street
              console.log("Street:",args.street);
            }
            await messageP(phon_no_id, "573046583182", `Client: ${args.name} \n Phone: ${args.phone} \n ${args.items} \n *Pago*: ${args.payment} \n Type: ${args.type} \n *Total*: ${args.amount} \n ${s}`);
            await feedback(phon_no_id, from);
            return {
              tool_call_id: tool.id,
              output: "The order has been sent to the kitchen.",
            }
          } else if (tool.function.name === "convertTimestampToDate") {
            const args = JSON.parse(tool.function.arguments);
            console.log("TOOLlllllllll:",args);
            console.log("TOOL:",args.date);
            let date = convertTimestampToDate(args.date);
            return {
              tool_call_id: tool.id,
              output: date,
            };
          } else if (tool.function.name === "getPaymentstatus") {
            const args = JSON.parse(tool.function.arguments);
            console.log("TOOLlllllllll:",args);
            console.log("TOOL:",args.payment);
            let status = await getPaymentStatus(args.payment);
            return {
              tool_call_id: tool.id,
              output: status,
            };
          }
        }
      );
      
      const toolOutputs = await Promise.all(toolOutputsPromises);
      console.log("TOOL OUTPUTS:",toolOutputs);
      console.log("THREAD:",thread);
      console.log("RUN:",run.id);
  
      // Submit all tool outputs at once after collecting them in a list
      if (toolOutputs.length > 0) {
        run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
          thread,
          run.id,
          { tool_outputs: toolOutputs },
        );
        console.log("Tool outputs submitted successfully.");
      } else {
        console.log("No tool outputs to submit.");
      }
  
      // Check status after submitting tool outputs
      return await handleRunStatus(run, thread, phon_no_id, from);
    }
  };
  

  
async function createAssistant() {
    try {
      assistant = await openai.beta.assistants.create({
        name: "Lira Assitant -- REVISION",
        instructions: prompt,
        tools: [{ type: "code_interpreter" }, tool1, tool2, tool3, tool4, tool5, tool6, tool7, tool8],
        model: "gpt-4o"
      });
      console.log("Assistant created:", assistant);
      return assistant;
    } catch (error) {
      console.error("Error creating assistant:", error);
    }
  }
  
async function createThread() {
    try {
      thread = await openai.beta.threads.create();
      return thread;
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  }
  
async function addMessage(threadId, inp, rolee = "user") {
    try {
      const message = await openai.beta.threads.messages.create(
        threadId,
        {
          role: rolee,
          content: inp
        }
      );
      console.log("----------------MADD------------");
      console.log("Message added:", message);
      console.log("----------------MADD------------");
      return message;
    } catch (error) {
      console.error("Error adding message:", error);
    }
  }
  
  
 const handleRunStatus = async (run, thread, phon_no_id, from) => {
    // Check if the run is completed
    if (run.status === 'completed') {
      console.log(run.status);
      console.log("Treath ID",thread);
      const messages = await openai.beta.threads.messages.list(thread);
      console.log(messages);
      return messages.data.reverse().map(message => ({
        role: message.role,
        content: message.content[0].text.value
      }));
    } else if (run.status === 'requires_action') {
      console.log(run.status);
      return await handleRequiresAction(run, thread, phon_no_id, from);
    } else {
      console.error("Run did not complete:", run);
    }
  };
  
  
async function pollRun(Instruc, thread, phon_no_id, from){//, Instruc = "If a client wants to see the menu, products, or recommendations, ONLY ANSWER with this interactive link: https://wa.me/c/573216311260") {
    try {
      let run = await openai.beta.threads.runs.createAndPoll(
        thread,
        { 
          assistant_id: assistant.id,
          additional_instructions: Instruc
        }
      );
      console.log("-----------------------------------");
      console.log("Run created:", run);
      console.log("-----------------------------------");
      if (run.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(thread);
        return messages.data.reverse().map(message => ({
          role: message.role,
          content: message.content[0].text.value
        }));
      } else if(run.status === 'requires_action'){
        return await handleRequiresAction(run, thread, phon_no_id, from);
      } else {
        return { status: run.status, message: 'Run did not complete successfully.' };
      }
    } catch (error) {
      console.error("Error polling run:", error);
    }
  }





async function main1(input,Instruc = null,thread = null, phon_no_id=null, from=null) {
    try {
      if (!assistant) assistant = await createAssistant();
      if(!thread) thread = await createThread();
      const message = await addMessage(thread, input);
      console.log("Message added:", message);
      console.log("Instruc:",Instruc);
      const output = await pollRun(Instruc, thread, phon_no_id, from);//thread.id, assistant.id);//, Instruc);
      console.log("Output:", output);
      return output;
    } catch (error) {
      console.error("Error in main1 function:", error);
    }
  }


module.exports = {
    createAssistant,
    createThread,
    handleRunStatus,
    main1
  };
  