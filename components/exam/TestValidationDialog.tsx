import { useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';

interface TestValidationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  testCase: string;
}

export function TestValidationDialog({ isOpen, onClose, testCase }: TestValidationDialogProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-neutral-800 text-white">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Test Case Failed</h3>
          <pre className="bg-neutral-900 p-4 rounded-lg overflow-x-auto">
            {testCase}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
