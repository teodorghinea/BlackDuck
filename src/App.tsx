import React, { useState } from "react";
import { Buffer } from "buffer";
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
  const [message, setMessage] = useState("");
  const maxMessageLength = 100;

  var url =
    "https://api.twilio.com/2010-04-01/Accounts/ACb2631d76f547d9f436d510b34158966b/Messages.json";

  var username = "ACb2631d76f547d9f436d510b34158966b";
  var password = "28843160837c89610f55b1f4762b7030";

  const handleSendSmsMessage = () => {
    if (!message) {
      alert("Mesajul nu poate fi gol.");
      return;
    }

    if (message.length > maxMessageLength) {
      alert("Mesajul este prea long.");
      return;
    }

    setMessage("Am parcat pe locul tau!" + message);

    var formdata = {
      Body: message,
      From: "+18788798073",
      To: "+40748146443",
    };

    const bufferResult = btoa(username + ":" + password);

    const options = {
      method: "POST",
      data: formdata,
      headers: {
        Authorization: "Basic " + bufferResult,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: url,
    };

    axios(options)
      .catch((e) => {
        alert("Mesajul nu a putut fi trimis");
        console.log(e);
      })
      .then(() => alert("Mesajul a fost trimis"));
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
                width="70%"
                type={"number"}
                value={message}
                placeholder="Introduce numarul de telefon ... "
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
