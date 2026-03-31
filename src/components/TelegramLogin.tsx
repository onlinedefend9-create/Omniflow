"use client";

import { useEffect, useRef } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface TelegramLoginProps {
  botUsername: string;
  onAuth: (user: TelegramUser) => void;
}

export function TelegramLogin({ botUsername, onAuth }: TelegramLoginProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-expect-error - onTelegramAuth is global
    window.onTelegramAuth = (user: TelegramUser) => {
      onAuth(user);
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.appendChild(script);
    }

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = "";
      }
      // @ts-expect-error - cleaning up global
      delete window.onTelegramAuth;
    };
  }, [botUsername, onAuth]);

  return <div ref={containerRef} />;
}
