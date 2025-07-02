
import React, { useState } from 'react';
import { Play, Monitor, Book, Lightbulb, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const VideoSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 'tour',
      title: 'Tour pelo sistema',
      icon: Monitor,
      embedId: 'BwVtBDvlr-w',
      description: 'Visão geral da plataforma'
    },
    {
      id: 'training',
      title: 'Treinamento prático',
      icon: Play,
      embedId: '63yu9fm_FPY',
      description: 'Aprenda na prática'
    },
    {
      id: 'concept',
      title: 'Conceito lógico',
      icon: Book,
      embedId: 'mEiYZ4zuD1Q',
      description: 'Entenda os fundamentos'
    }
  ];

  const openVideoModal = (embedId: string) => {
    setSelectedVideo(embedId);
  };

  const selectedVideoData = selectedVideo ? videos.find(v => v.embedId === selectedVideo) : null;

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">Vídeos de Ajuda</h3>
        </div>
        <p className="text-white/70 text-sm">
          Assista aos vídeos para esclarecer suas dúvidas rapidamente
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {videos.map((video) => {
          const Icon = video.icon;
          return (
            <div key={video.id} className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon className="w-4 h-4 text-blue-400" />
                <h4 className="text-white font-medium text-sm">{video.title}</h4>
              </div>
              
              <div 
                className="aspect-video bg-black/20 rounded-lg relative overflow-hidden cursor-pointer hover:bg-black/30 transition-colors group"
                onClick={() => openVideoModal(video.embedId)}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <p className="text-white/60 text-xs">{video.description}</p>
            </div>
          );
        })}
      </div>

      {/* Modal para vídeo em tela cheia */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl w-[90vw] h-[80vh] p-0 bg-black/90 border-white/20">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-white text-xl">
              {selectedVideoData?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 p-4 pt-2">
            {selectedVideo && (
              <div className="w-full h-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  title={selectedVideoData?.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="text-center space-y-2">
          <p className="text-blue-200 text-sm font-medium">
            📲 Ficou com dúvidas na hora de configurar?
          </p>
          <p className="text-blue-200/80 text-sm">
            Fale com a inteligência artificial Jarvis no WhatsApp e tire suas dúvidas em tempo real, seja por texto ou áudio:
          </p>
          <a 
            href="https://wa.me/5512996469306" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            👉 Clique aqui para conversar
          </a>
          <p className="text-blue-200/60 text-xs">
            Ou adicione o contato: +55 (12) 996469306
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
