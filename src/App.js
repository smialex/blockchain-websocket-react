import React, { useState, useEffect } from "react";
import ReactJson from "react-json-view";
import { Container, ButtonGroup, Button } from "./components";
import { useBlockchain } from "./hooks";

function App() {
  const [messageList, setMessageList] = useState([]);
  const [isOpen, lastMessage, subscribe, unsubscribe] = useBlockchain("wss://ws.blockchain.info/inv");

  useEffect(() => {
    if (lastMessage) {
      setMessageList((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage]);

  return (
    <>
      <Container>
        <ButtonGroup>
          <Button variant="success" onClick={subscribe}>
            Запуск
          </Button>
          <Button variant="danger" onClick={unsubscribe}>
            Остановка
          </Button>
          <Button variant="warning" onClick={() => setMessageList([])}>
            Сброс
          </Button>
        </ButtonGroup>
      </Container>
      <div>isOpen: {isOpen.toString()}</div>
      <div>messages count: {messageList.length}</div>
      <div>
        <div>last message: </div>
        {lastMessage && <ReactJson src={lastMessage} />}
      </div>
    </>
  );
}

export default App;
