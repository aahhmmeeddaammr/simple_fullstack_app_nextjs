import { UserContext } from "@/contexts/UserContextProvider";
import { useContext } from "react";

export default function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
