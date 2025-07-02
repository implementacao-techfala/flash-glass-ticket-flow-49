
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProblemPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProblemPagination: React.FC<ProblemPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-white/60 hover:text-white disabled:opacity-30"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </Button>
      
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "ghost"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={page === currentPage 
              ? "bg-white/20 text-white" 
              : "text-white/60 hover:text-white hover:bg-white/10"
            }
          >
            {page}
          </Button>
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-white/60 hover:text-white disabled:opacity-30"
      >
        Próximo
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ProblemPagination;
