
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Send, FilePlus, FileText, ClipboardList, Target } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: number;
  sender: 'coach' | 'client';
  text: string;
  time: string;
}

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (newMessage: string) => void;
  onToggleRightPanel: () => void;
  onDocumentUpload: () => void;
  onSurveyCreation: () => void;
  onShowGoalTracker: () => void;
}

const ChatPanel = ({
  messages,
  onSendMessage,
  onToggleRightPanel,
  onDocumentUpload,
  onSurveyCreation,
  onShowGoalTracker
}: ChatPanelProps) => {
  const [message, setMessage] = useState('');
  
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="bg-card border rounded-lg h-64 flex flex-col">
      <div className="p-3 border-b font-medium flex justify-between items-center">
        <div>Chat</div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleRightPanel}
        >
          <PanelRight className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === 'client' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'client' 
                  ? 'text-primary-foreground/70' 
                  : 'text-muted-foreground'
              }`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t flex gap-2">
        <Input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button size="icon" onClick={handleSendMessage}>
          <Send className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <FilePlus className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end">
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={onDocumentUpload}>
                <FileText className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={onSurveyCreation}>
                <ClipboardList className="mr-2 h-4 w-4" />
                Create Survey
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={onShowGoalTracker}>
                <Target className="mr-2 h-4 w-4" />
                Update Goal Progress
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ChatPanel;
