// src/hooks/use-toast.js
import { useCallback } from "react";

export const useToast = () => {
  const showToast = useCallback((message, type = "info") => {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.className = `
      fixed bottom-5 right-5 px-4 py-2 rounded shadow-lg text-white z-50
      ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"}
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }, []);

  return { toast: showToast };
};
