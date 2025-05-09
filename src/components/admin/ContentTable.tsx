
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash, Star, StarOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ContentTableProps<T> {
  items: T[];
  isLoading: boolean;
  onEdit: (item: T) => void;
  onDelete: (id: string) => Promise<void>;
  onToggleFeatured?: (id: string, isFeatured: boolean) => Promise<void>;
  getRowContent: (item: T) => React.ReactNode[];
  headers: string[];
  emptyMessage?: string;
}

export function ContentTable<T extends { id: string; is_featured?: boolean }>({
  items,
  isLoading,
  onEdit,
  onDelete,
  onToggleFeatured,
  getRowContent,
  headers,
  emptyMessage = "No items found"
}: ContentTableProps<T>) {
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
      await onDelete(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : items.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header, index) => (
                  <th 
                    key={index}
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {getRowContent(item).map((cell, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cell}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {onToggleFeatured && 'is_featured' in item && (
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={async () => onToggleFeatured(item.id, !item.is_featured)}
                        title={item.is_featured ? "Remove from featured" : "Mark as featured"}
                      >
                        {item.is_featured ? 
                          <StarOff className="h-4 w-4 text-yellow-500" /> : 
                          <Star className="h-4 w-4 text-gray-400" />
                        }
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
}
