import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Message } from '@/types/session';
import { FileUp, PanelRightOpen, Target, Send, Clipboard, BarChart } from 'lucide-react';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
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
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    onSendMessage(newMessage);
    setNewMessage('');
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="py-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Chat</div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={onShowGoalTracker}>
              <Target className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDocumentUpload}>
              <FileUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onSurveyCreation}>
              <Clipboard className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onToggleRightPanel}>
              <PanelRightOpen className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex flex-col space-y-2">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'coach' ? 'items-start' : 'items-end flex-row-reverse'}`}>
                <Avatar className="h-6 w-6">
                  {message.sender === 'coach' ? 'C' : 'U'}
                </Avatar>
                <div className={`ml-2 mr-2 p-2 rounded-lg ${message.sender === 'coach' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'}`}>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs text-muted-foreground">{message.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="py-3">
        <div className="flex items-center space-x-2 w-full">
          <Textarea
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatPanel;
