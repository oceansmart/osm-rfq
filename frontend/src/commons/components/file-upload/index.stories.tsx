import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import {
  FileUpload,
  FileUploadDropZone,
  FileListItemProgressBar,
  FileListItemProgressFill,
} from './index';

const meta: Meta<typeof FileUploadDropZone> = {
  title: 'Commons/Components/FileUpload',
  component: FileUploadDropZone,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hint: {
      control: 'text',
      description: 'Hint text explaining what files can be dropped',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables dropping or uploading files',
    },
    accept: {
      control: 'text',
      description: 'File types accepted (e.g., "image/*", ".pdf")',
    },
    allowsMultiple: {
      control: 'boolean',
      description: 'Allows multiple file uploads',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploadDropZone>;

// 1. Default - 기본 드롭존
export const Default: Story = {
  args: {
    hint: 'SVG, PNG, JPG or GIF (max. 800x400px)',
    allowsMultiple: true,
  },
};

// 2. Complete Upload Flow - 드롭존 + 파일 목록 (Progress Bar)
export const CompleteUploadFlowProgressBar: Story = {
  render: () => {
    const [files, setFiles] = useState<
      Array<{ id: string; name: string; size: number; progress: number; failed?: boolean; type: string }>
    >([
      { id: '1', name: 'presentation.pdf', size: 2500000, progress: 100, type: 'pdf' },
      { id: '2', name: 'report.docx', size: 1500000, progress: 65, type: 'docx' },
      { id: '3', name: 'image.png', size: 500000, progress: 30, type: 'png' },
    ]);

    const handleDropFiles = (fileList: FileList) => {
      const newFiles = Array.from(fileList).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        progress: 0,
        type: file.name.split('.').pop() || 'empty',
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleDelete = (id: string) => {
      setFiles((prev) => prev.filter((file) => file.id !== id));
    };

    return (
      <div className="w-[640px]">
        <FileUpload.Root>
          <FileUpload.DropZone
            hint="SVG, PNG, JPG or GIF (max. 800x400px)"
            allowsMultiple
            onDropFiles={handleDropFiles}
          />
          <FileUpload.List>
            {files.map((file) => (
              <FileUpload.ListItemProgressBar
                key={file.id}
                name={file.name}
                size={file.size}
                progress={file.progress}
                failed={file.failed}
                type={file.type as any}
                onDelete={() => handleDelete(file.id)}
                onRetry={() => console.log('Retry', file.id)}
              />
            ))}
          </FileUpload.List>
        </FileUpload.Root>
      </div>
    );
  },
};

// 3. Complete Upload Flow - 드롭존 + 파일 목록 (Progress Fill)
export const CompleteUploadFlowProgressFill: Story = {
  render: () => {
    const [files, setFiles] = useState<
      Array<{ id: string; name: string; size: number; progress: number; failed?: boolean; type: string }>
    >([
      { id: '1', name: 'presentation.pdf', size: 2500000, progress: 100, type: 'pdf' },
      { id: '2', name: 'report.docx', size: 1500000, progress: 65, type: 'docx' },
      { id: '3', name: 'image.png', size: 500000, progress: 30, type: 'png' },
    ]);

    const handleDropFiles = (fileList: FileList) => {
      const newFiles = Array.from(fileList).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        progress: 0,
        type: file.name.split('.').pop() || 'empty',
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleDelete = (id: string) => {
      setFiles((prev) => prev.filter((file) => file.id !== id));
    };

    return (
      <div className="w-[640px]">
        <FileUpload.Root>
          <FileUpload.DropZone
            hint="SVG, PNG, JPG or GIF (max. 800x400px)"
            allowsMultiple
            onDropFiles={handleDropFiles}
          />
          <FileUpload.List>
            {files.map((file) => (
              <FileUpload.ListItemProgressFill
                key={file.id}
                name={file.name}
                size={file.size}
                progress={file.progress}
                failed={file.failed}
                type={file.type as any}
                fileIconVariant="solid"
                onDelete={() => handleDelete(file.id)}
                onRetry={() => console.log('Retry', file.id)}
              />
            ))}
          </FileUpload.List>
        </FileUpload.Root>
      </div>
    );
  },
};

// 4. File Upload States - 업로드 중, 완료, 실패 상태 (Progress Bar)
export const FileUploadStatesProgressBar: Story = {
  render: () => (
    <div className="w-[640px] flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Uploading</h3>
        <FileUpload.List>
          <FileListItemProgressBar
            name="document.pdf"
            size={2500000}
            progress={45}
            type="pdf"
            onDelete={() => console.log('Delete')}
          />
        </FileUpload.List>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Complete</h3>
        <FileUpload.List>
          <FileListItemProgressBar
            name="image.png"
            size={1500000}
            progress={100}
            type="png"
            onDelete={() => console.log('Delete')}
          />
        </FileUpload.List>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Failed</h3>
        <FileUpload.List>
          <FileListItemProgressBar
            name="video.mp4"
            size={5000000}
            progress={30}
            failed
            type="mp4"
            onDelete={() => console.log('Delete')}
            onRetry={() => console.log('Retry')}
          />
        </FileUpload.List>
      </div>
    </div>
  ),
};

// 5. File Upload States - 업로드 중, 완료, 실패 상태 (Progress Fill)
export const FileUploadStatesProgressFill: Story = {
  render: () => (
    <div className="w-[640px] flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Uploading</h3>
        <FileUpload.List>
          <FileListItemProgressFill
            name="document.pdf"
            size={2500000}
            progress={45}
            type="pdf"
            fileIconVariant="solid"
            onDelete={() => console.log('Delete')}
          />
        </FileUpload.List>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Complete</h3>
        <FileUpload.List>
          <FileListItemProgressFill
            name="image.png"
            size={1500000}
            progress={100}
            type="png"
            fileIconVariant="solid"
            onDelete={() => console.log('Delete')}
          />
        </FileUpload.List>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Failed</h3>
        <FileUpload.List>
          <FileListItemProgressFill
            name="video.mp4"
            size={5000000}
            progress={30}
            failed
            type="mp4"
            fileIconVariant="solid"
            onDelete={() => console.log('Delete')}
            onRetry={() => console.log('Retry')}
          />
        </FileUpload.List>
      </div>
    </div>
  ),
};

// 6. File Types - 다양한 파일 타입
export const FileTypes: Story = {
  render: () => (
    <div className="w-[640px] flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Documents</h3>
        <FileUpload.List>
          <FileListItemProgressBar name="report.pdf" size={2500000} progress={100} type="pdf" onDelete={() => {}} />
          <FileListItemProgressBar name="essay.docx" size={1500000} progress={100} type="docx" onDelete={() => {}} />
          <FileListItemProgressBar name="data.xlsx" size={800000} progress={100} type="xlsx" onDelete={() => {}} />
        </FileUpload.List>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Images</h3>
        <FileUpload.List>
          <FileListItemProgressBar name="photo.jpg" size={1200000} progress={100} type="jpg" onDelete={() => {}} />
          <FileListItemProgressBar name="logo.png" size={500000} progress={100} type="png" onDelete={() => {}} />
          <FileListItemProgressBar name="icon.svg" size={50000} progress={100} type="svg" onDelete={() => {}} />
        </FileUpload.List>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Media</h3>
        <FileUpload.List>
          <FileListItemProgressBar name="video.mp4" size={5000000} progress={100} type="mp4" onDelete={() => {}} />
          <FileListItemProgressBar name="audio.mp3" size={3000000} progress={100} type="mp3" onDelete={() => {}} />
        </FileUpload.List>
      </div>
    </div>
  ),
};

// 7. Drop Zone Variants
export const DropZoneVariants: Story = {
  render: () => (
    <div className="w-[640px] flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Default</h3>
        <FileUploadDropZone hint="SVG, PNG, JPG or GIF (max. 800x400px)" allowsMultiple />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Single File</h3>
        <FileUploadDropZone hint="Only one file allowed" allowsMultiple={false} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Images Only</h3>
        <FileUploadDropZone hint="PNG, JPG or GIF only" accept="image/*" allowsMultiple />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">PDFs Only</h3>
        <FileUploadDropZone hint="PDF files only" accept=".pdf" allowsMultiple />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Disabled</h3>
        <FileUploadDropZone hint="Upload is disabled" isDisabled allowsMultiple />
      </div>
    </div>
  ),
};

// 8. Comparison - Progress Bar vs Progress Fill
export const ProgressBarVsProgressFill: Story = {
  render: () => (
    <div className="w-[640px] flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Progress Bar (Default variant)</h3>
        <FileUpload.List>
          <FileListItemProgressBar
            name="document.pdf"
            size={2500000}
            progress={45}
            type="pdf"
            onDelete={() => console.log('Delete')}
          />
          <FileListItemProgressBar
            name="image.png"
            size={1500000}
            progress={100}
            type="png"
            onDelete={() => console.log('Delete')}
          />
        </FileUpload.List>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Progress Fill (Solid variant)</h3>
        <FileUpload.List>
          <FileListItemProgressFill
            name="document.pdf"
            size={2500000}
            progress={45}
            type="pdf"
            fileIconVariant="solid"
            onDelete={() => console.log('Delete')}
          />
          <FileListItemProgressFill
            name="image.png"
            size={1500000}
            progress={100}
            type="png"
            fileIconVariant="solid"
            onDelete={() => console.log('Delete')}
          />
        </FileUpload.List>
      </div>
    </div>
  ),
};

// 9. Playground - 모든 props 조작 가능
export const Playground: Story = {
  args: {
    hint: 'SVG, PNG, JPG or GIF (max. 800x400px)',
    isDisabled: false,
    allowsMultiple: true,
    accept: '',
    maxSize: undefined,
  },
  render: (args) => (
    <div className="w-[640px]">
      <FileUploadDropZone {...args} />
    </div>
  ),
};
