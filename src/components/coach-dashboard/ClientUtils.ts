
import { CLIENTS } from "./ClientsTab";

// Function to get selected clients (show up to 4 clients at a time)
export const getSelectedClients = (selectedClientId: string | null) => {
  if (!selectedClientId) return [];
  
  const selectedClientIndex = CLIENTS.findIndex(c => c.id === selectedClientId);
  if (selectedClientIndex === -1) return [];
  
  // Get 3 more clients after the selected one, wrap around if needed
  const result = [];
  for (let i = 0; i < 4; i++) {
    const index = (selectedClientIndex + i) % CLIENTS.length;
    result.push(CLIENTS[index]);
  }
  return result;
};
