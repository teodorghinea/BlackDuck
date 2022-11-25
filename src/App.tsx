import React, { useState } from "react";
import qs from "qs";
import logo from "./logo.svg";
import "./App.css";
import {
  Button,
  ChakraProvider,
  FormControl,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState(
    "Salut! Am parcat pe locul tau. Numarul meu este: "
  );
  const maxMessageLength = 100;

  var url =
    "https://api.twilio.com/2010-04-01/Accounts/ACb2631d76f547d9f436d510b34158966b/Messages.json";

  var username = "ACb2631d76f547d9f436d510b34158966b";
  var password = "f77812bc9c5b2742c0b3b8f3020876d7";

  var authkey =
    "Basic QUNiMjYzMWQ3NmY1NDdkOWY0MzZkNTEwYjM0MTU4OTY2YjpmNzc4MTJiYzljNWIyNzQyYzBiM2I4ZjMwMjA4NzZkNw==";

  const handleSendSmsMessage = () => {
    if (!message) {
      alert("Mesajul nu poate fi gol.");
      return;
    }

    if (message.length > maxMessageLength) {
      alert("Mesajul este prea long.");
      return;
    }

    var formdata = {
      Body: message,
      From: "+18788798073",
      To: "+40748146443",
    };

    const options = {
      method: "POST",
      data: formdata,
      headers: {
        Authorization: authkey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: url,
    };

    axios(options).catch((e) => {
      alert("Mesajul nu a putut fi trimis");
      console.log(e);
    });
  };

  const handleInputChange = (msg: string) => {
    if (msg.length > maxMessageLength) {
      alert("Mesajul este prea long.");
    } else {
      setMessage(msg);
    }
  };

  return (
    <>
      <ChakraProvider>
        <div className="App-header">
          <div>
            <div className="typed-out">QR-CITY </div>
            <div className="subtitle">
              Scrie un mesaj pentru proprietarul locului de parcare.
            </div>

            <FormControl>
              <Input
                value={message}
                onChange={(input) => handleInputChange(input.target.value)}
              />
              <FormHelperText color="white">
                Acesta il va primi in scurt timp. Lungime mesaj:{" "}
                {message?.length} / {maxMessageLength}.
              </FormHelperText>
              <Button color="black" onClick={handleSendSmsMessage}>
                Trimite
              </Button>
            </FormControl>
          </div>
        </div>
      </ChakraProvider>
    </>
  );
}

export default App;
