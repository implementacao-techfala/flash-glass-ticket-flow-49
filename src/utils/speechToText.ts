
// Using Web Speech API for audio transcription
export const transcribeAudio = async (audioFile: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Check if Web Speech API is supported
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported, returning empty transcription');
      resolve('');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    // Create audio element to play the file
    const audio = new Audio();
    audio.src = URL.createObjectURL(audioFile);
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'pt-BR';
    
    let transcription = '';
    
    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcription += event.results[i][0].transcript + ' ';
        }
      }
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      resolve(transcription.trim() || 'Erro na transcrição');
    };
    
    recognition.onend = () => {
      URL.revokeObjectURL(audio.src);
      resolve(transcription.trim() || 'Transcrição não disponível');
    };
    
    // Start recognition when audio starts playing
    audio.onloadeddata = () => {
      recognition.start();
      audio.play().catch(() => {
        // Audio play failed, try transcription anyway
        recognition.start();
      });
    };
    
    // Stop recognition when audio ends
    audio.onended = () => {
      setTimeout(() => recognition.stop(), 1000);
    };
    
    audio.onerror = () => {
      reject(new Error('Erro ao processar áudio'));
    };
  });
};
