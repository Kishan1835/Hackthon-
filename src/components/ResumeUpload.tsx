
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeUploadProps {
  onUploadComplete?: (file: File) => void;
}

const ResumeUpload = ({ onUploadComplete }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelection(droppedFile);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFileSelection(selectedFile);
    }
  };
  
  const handleFileSelection = (selectedFile: File) => {
    // Check if file is PDF, DOC, or DOCX
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(selectedFile.type)) {
      // Could show an error toast here
      console.error('Invalid file type. Please upload a PDF or Word document.');
      return;
    }
    
    setFile(selectedFile);
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setIsComplete(true);
    
    if (onUploadComplete) {
      onUploadComplete(file);
    }
  };
  
  const fileExtension = file ? file.name.split('.').pop()?.toUpperCase() : '';
  const fileIcon = fileExtension === 'PDF' ? 'pdf' : 'doc';

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload Your Resume</CardTitle>
        <CardDescription>Upload your resume to get AI-powered recommendations.</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 transition-all text-center",
            isDragging ? "border-primary bg-primary/5" : "border-input",
            file ? "py-6" : "py-10"
          )}
        >
          {!file ? (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground">
                  <span className="font-medium text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                id="resume-upload"
                onChange={handleFileInputChange}
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("resume-upload")?.click()}
                className="mt-2"
              >
                Select File
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-12 h-16 flex-shrink-0 bg-secondary rounded flex items-center justify-center">
                {fileIcon === 'pdf' ? (
                  <FileText className="h-6 w-6 text-red-500" />
                ) : (
                  <FileText className="h-6 w-6 text-blue-500" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{Math.round(file.size / 1024)} KB</p>
              </div>
              <div className="flex-shrink-0">
                {isComplete ? (
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      {file && !isComplete && (
        <CardFooter className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              setFile(null);
              setIsComplete(false);
            }}
          >
            Cancel
          </Button>
          <Button 
            disabled={isUploading} 
            onClick={handleUpload}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload Resume'
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ResumeUpload;
