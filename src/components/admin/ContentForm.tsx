
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'switch' | 'date' | 'email';
  placeholder?: string;
  required?: boolean;
}

interface ContentFormProps {
  fields: FormField[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  title: string;
  submitLabel?: string;
}

export const ContentForm: React.FC<ContentFormProps> = ({
  fields,
  values,
  onChange,
  onSubmit,
  isLoading = false,
  title,
  submitLabel = "Save"
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Here you would typically upload the file to Supabase storage
    // For now, we'll just use a placeholder URL
    onChange(fieldName, URL.createObjectURL(file));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1">
            <Label htmlFor={field.name}>{field.label}{field.required && <span className="text-red-500">*</span>}</Label>
            
            {field.type === 'textarea' ? (
              <Textarea
                id={field.name}
                name={field.name}
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                rows={5}
                className="w-full"
              />
            ) : field.type === 'image' ? (
              <div>
                {values[field.name] && (
                  <div className="mb-2">
                    <img 
                      src={values[field.name]} 
                      alt="Preview" 
                      className="h-32 object-contain rounded border border-gray-300"
                    />
                  </div>
                )}
                <Input
                  id={field.name}
                  name={field.name}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, field.name)}
                  className="w-full"
                />
              </div>
            ) : field.type === 'switch' ? (
              <div className="flex items-center space-x-2">
                <Switch
                  id={field.name}
                  checked={values[field.name] || false}
                  onCheckedChange={(checked) => onChange(field.name, checked)}
                />
                <Label htmlFor={field.name}>{values[field.name] ? 'Enabled' : 'Disabled'}</Label>
              </div>
            ) : field.type === 'date' ? (
              <Input
                id={field.name}
                name={field.name}
                type="datetime-local"
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                required={field.required}
                className="w-full"
              />
            ) : (
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full"
              />
            )}
          </div>
        ))}
        
        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Processing...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
