'use client';

import { useState } from 'react';
import { TableColumn, Entity } from '@/types/dataTypes';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface EditModalProps<T extends Entity> {
  item: T;
  columns: TableColumn<T>[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedItem: T) => Promise<void> | void;
}

export function EditModal<T extends Entity>({
                                              item,
                                              columns,
                                              open,
                                              onOpenChange,
                                              onSave,
                                            }: EditModalProps<T>) {
  const [editedItem, setEditedItem] = useState<T>(item);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: keyof T, value: unknown) => {
    setEditedItem(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editedItem);
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {columns.map((column) => {
              const value = editedItem[column.key as keyof T];
              const inputType = column.inputType || 'text';

              return (
                  <div key={String(column.key)} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={String(column.key)} className="text-right">
                      {column.header}
                    </Label>
                    {inputType === 'checkbox' ? (
                        <div className="col-span-3 flex items-center space-x-2">
                          <Checkbox
                              id={String(column.key)}
                              checked={Boolean(value)}
                              onCheckedChange={(checked) =>
                                  handleChange(column.key as keyof T, checked)
                              }
                          />
                          <label
                              htmlFor={String(column.key)}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {value ? 'Active' : 'Inactive'}
                          </label>
                        </div>
                    ) : inputType === 'textarea' ? (
                        <Textarea
                            id={String(column.key)}
                            value={String(value)}
                            onChange={(e) =>
                                handleChange(column.key as keyof T, e.target.value)
                            }
                            className="col-span-3"
                        />
                    ) : (
                        <Input
                            id={String(column.key)}
                            type={inputType}
                            value={String(value)}
                            onChange={(e) =>
                                handleChange(
                                    column.key as keyof T,
                                    inputType === 'number' ? Number(e.target.value) : e.target.value
                                )
                            }
                            className="col-span-3"
                        />
                    )}
                  </div>
              );
            })}
          </div>

          <DialogFooter>
            <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}