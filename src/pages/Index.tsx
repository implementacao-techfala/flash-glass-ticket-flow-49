
import React, { Suspense } from 'react';
import FormBackground from '@/components/form/FormBackground';
import VideoSection from '@/components/form/VideoSection';

// Lazy load the form for better performance
const SupportForm = React.lazy(() => import('@/components/form/SupportForm'));

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <FormBackground />
      
      <div className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              🛟 Suporte 🛟
            </h1>
            <p className="text-xl text-white/80">
              Estamos aqui para ajudar você
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-2">
              <Suspense 
                fallback={
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  </div>
                }
              >
                <SupportForm />
              </Suspense>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <VideoSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
