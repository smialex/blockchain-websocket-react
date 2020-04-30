import { useCallback, useMemo } from "react";
import { useWebsocket, READYSTATE_OPEN } from "./useWebsocket";

export const useBlockchain = (url) => {
  const [lastMessage, sendMessage, readyState] = useWebsocket(url);

  const message = useMemo(() => JSON.parse(lastMessage), [lastMessage]);
  const isOpened = useMemo(() => readyState === READYSTATE_OPEN, [readyState]);

  const subscribe = useCallback(() => {
    sendMessage(JSON.stringify({ op: "unconfirmed_sub" }));
  }, [sendMessage]);
  const unsubscribe = useCallback(() => {
    sendMessage(JSON.stringify({ op: "unconfirmed_unsub" }));
  }, [sendMessage]);

  return [isOpened, message, subscribe, unsubscribe];
};
