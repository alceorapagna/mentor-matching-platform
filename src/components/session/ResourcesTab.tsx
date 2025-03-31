
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { FileText, FilePlus, Download } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  date: string;
  description: string;
}

interface ResourcesTabProps {
  documents: Document[];
  documentUploadOpen: boolean;
  onCloseDocumentUpload: () => void;
  onUploadDocument: () => void;
}

const ResourcesTab = ({
  documents,
  documentUploadOpen,
  onCloseDocumentUpload,
  onUploadDocument
}: ResourcesTabProps) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg">Documents & Resources</h3>
        <Button variant="outline" size="sm" onClick={() => documentUploadOpen || onCloseDocumentUpload()}>
          <FilePlus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      
      {documentUploadOpen && (
        <Card className="mb-4 border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Upload New Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Button className="w-full border-dashed border-2 border-muted-foreground/50 py-8 bg-muted/30">
                <FileText className="h-6 w-6 mr-2" />
                Select File to Upload
              </Button>
            </div>
            <Input placeholder="Document Title" />
            <Textarea placeholder="Document Description (optional)" />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={onCloseDocumentUpload}>
              Cancel
            </Button>
            <Button size="sm" onClick={onUploadDocument}>
              Upload
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="space-y-3">
        {documents.map(doc => (
          <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <FileText className="h-4 w-4 mr-2 text-primary" />
                {doc.name}
              </CardTitle>
              <CardDescription>{doc.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-0 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Added on {doc.date}</span>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResourcesTab;
