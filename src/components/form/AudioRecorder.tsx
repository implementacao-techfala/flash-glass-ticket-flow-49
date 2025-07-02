
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, Square, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
// @ts-ignore
import RecordRTC from 'recordrtc';

interface AudioRecorderProps {
  onAudioRecorded: (audioFile: File) => void;
  existingAudio?: File;
  onDeleteAudio?: () => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  onAudioRecorded, 
  existingAudio,
  onDeleteAudio 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  const recorderRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    checkPermission();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const checkPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Erro ao solicitar permissão de áudio:', error);
      setHasPermission(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });
      
      streamRef.current = stream;
      
      const recorder = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/wav',
        recorderType: RecordRTC.StereoAudioRecorder,
        numberOfAudioChannels: 1,
        desiredSampRate: 16000,
      });

      recorder.startRecording();
      recorderRef.current = recorder;
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Erro ao iniciar gravação:', error);
      setHasPermission(false);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && streamRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        const audioFile = new File([blob], `audio-${Date.now()}.wav`, { 
          type: 'audio/wav' 
        });
        
        onAudioRecorded(audioFile);
        
        // Cleanup
        streamRef.current?.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        recorderRef.current = null;
      });

      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current && existingAudio) {
      const audioUrl = URL.createObjectURL(existingAudio);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasPermission === null) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        <span className="ml-2 text-white/70">Verificando permissões...</span>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
        <p className="text-red-200 text-sm text-center">
          Permissão de microfone negada. Por favor, permita o acesso ao microfone para gravar áudio.
        </p>
        <Button
          onClick={checkPermission}
          className="w-full mt-2 bg-red-500/30 hover:bg-red-500/50 text-red-200"
          size="sm"
        >
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <audio ref={audioRef} className="hidden" />
      
      {existingAudio ? (
        <div className="p-3 bg-white/10 rounded-lg backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <Mic className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-white/90 text-sm">Áudio gravado</p>
                <p className="text-white/60 text-xs">{existingAudio.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={isPlaying ? pauseAudio : playAudio}
                className="text-white/60 hover:text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              {onDeleteAudio && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDeleteAudio}
                  className="text-white/60 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-white/5 border border-white/20 rounded-lg backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isRecording ? 'bg-red-500/20' : 'bg-white/10'
              }`}>
                {isRecording ? (
                  <MicOff className="w-4 h-4 text-red-400" />
                ) : (
                  <Mic className="w-4 h-4 text-white/60" />
                )}
              </div>
              
              <div>
                {isRecording ? (
                  <div>
                    <p className="text-red-200 text-sm">Gravando...</p>
                    <p className="text-red-200/60 text-xs">{formatTime(recordingTime)}</p>
                  </div>
                ) : (
                  <p className="text-white/70 text-sm">Clique para gravar áudio</p>
                )}
              </div>
            </div>
            
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              className={isRecording 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-blue-500 hover:bg-blue-600"
              }
              size="sm"
            >
              {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
