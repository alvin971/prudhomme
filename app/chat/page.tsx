'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useDocuments } from '@/lib/contexts/DocumentsContext';
import { sendMessageToAI, generateDocument } from '@/lib/services/anthropicService';
import { extractDocumentType, shouldGenerateDocument } from '@/lib/utils/prompts';
import { generatePDF } from '@/lib/services/documentService';
import { FaMicrophone, FaPaperPlane, FaBars } from 'react-icons/fa';
import Drawer from '@/components/common/Drawer';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addDocument } = useDocuments();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [accumulatedText, setAccumulatedText] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingMessage]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const typewriterEffect = async (text: string) => {
    setTypingMessage('');
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 10));
      setTypingMessage(text.substring(0, i + 1));
    }
    return text;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const visualizeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      microphone.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateLevel = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average / 255);
          animationFrameRef.current = requestAnimationFrame(updateLevel);
        }
      };

      updateLevel();
      return stream;
    } catch (error) {
      console.error('Error visualizing audio:', error);
      throw error;
    }
  };

  const startTimer = () => {
    setRecordingTime(0);
    timerIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setRecordingTime(0);
  };

  const stopAudioVisualization = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setAudioLevel(0);
  };

  const startRecording = async () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('La reconnaissance vocale n\'est pas supportée par votre navigateur');
      return;
    }

    try {
      // Démarrer la visualisation audio
      await visualizeAudio();

      // Démarrer le timer
      startTimer();

      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognitionRef.current = recognition;
      setAccumulatedText('');

      recognition.onstart = () => {
        setIsListening(true);
        console.log('Reconnaissance vocale démarrée');
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        console.log('Interim:', interimTranscript);
        console.log('Final:', finalTranscript);

        // Ajouter le texte final au texte accumulé
        if (finalTranscript) {
          setAccumulatedText(prev => {
            const newText = prev + finalTranscript;
            console.log('Texte accumulé:', newText);
            return newText;
          });
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Erreur reconnaissance vocale:', event.error);
        setIsListening(false);
        stopTimer();
        stopAudioVisualization();
      };

      recognition.onend = () => {
        console.log('Reconnaissance vocale terminée');
      };

      recognition.start();

    } catch (error) {
      console.error('Erreur démarrage reconnaissance:', error);
      alert('Impossible d\'accéder au microphone: ' + (error as Error).message);
    }
  };

  const stopRecording = () => {
    console.log('Arrêt enregistrement, texte accumulé:', accumulatedText);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Ajouter le texte accumulé à l'input
    if (accumulatedText.trim()) {
      setInput(prev => {
        const newInput = prev.trim() ? prev.trim() + ' ' + accumulatedText.trim() : accumulatedText.trim();
        console.log('Nouvel input:', newInput);
        return newInput;
      });
    } else {
      console.log('Aucun texte à ajouter');
    }
    setAccumulatedText('');

    setIsListening(false);
    stopTimer();
    stopAudioVisualization();
  };

  const toggleRecording = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const conversationMessages = [...messages, userMessage];
      // Filter out system messages and map to service Message type
      const aiMessages = conversationMessages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content
        }));
      const response = await sendMessageToAI(aiMessages);

      await typewriterEffect(response);

      setMessages(prev => [...prev, {
        role: 'assistant' as const,
        content: response,
        timestamp: new Date()
      }]);
      setTypingMessage('');

      // Détecte si l'IA demande à générer le document
      if (shouldGenerateDocument(response)) {
        const conversationText = conversationMessages.map(m => m.role + ': ' + m.content).join('\n');
        const documentType = extractDocumentType(conversationText);

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '⏳ Génération du document en cours...',
          timestamp: new Date()
        }]);

        const documentContent = await generateDocument(documentType, conversationText);
        const pdfBlob = generatePDF(documentContent, documentType);

        const testDocuments = JSON.parse(localStorage.getItem('test_documents') || '[]');
        const docId = 'test_' + Date.now();
        testDocuments.push({
          id: docId,
          type: documentType,
          fileName: documentType.replaceAll(' ', '_') + '_' + Date.now() + '.pdf',
          createdAt: new Date().toISOString(),
          textContent: documentContent,
        });
        localStorage.setItem('test_documents', JSON.stringify(testDocuments));

        if (user) {
          await addDocument({
            type: documentType,
            fileName: documentType.replaceAll(' ', '_') + '_' + Date.now() + '.pdf',
            createdAt: new Date(),
            textContent: documentContent,
          });
        }

        setMessages(prev => [
          ...prev.slice(0, -1),
          {
            role: 'assistant',
            content: '✅ Document "' + documentType + '" généré avec succès !\n\n📄 Retrouvez-le dans "Mes Documents"',
            timestamp: new Date()
          }
        ]);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Une erreur est survenue. Veuillez réessayer.',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col bg-[#F8FAFC]" style={{ height: '100dvh', minHeight: '-webkit-fill-available' }}>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <header className="bg-white shadow-sm flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaBars className="text-lg sm:text-xl text-[#1E3A8A]" />
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-[#1E3A8A]">PRUDHOMME</h1>
          <div className="w-8 sm:w-10"></div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
        {messages.length === 0 && !typingMessage ? (
          <div className="h-full flex items-center justify-center px-4 sm:px-10">
            <p className="text-center text-2xl sm:text-4xl md:text-5xl text-[#1E3A8A] font-light opacity-25 leading-tight">
              Pouvez-vous me décrire brièvement votre problème juridique ?
            </p>
          </div>
        ) : (
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 pb-4">
            {messages.map((msg, i) => (
              <div key={i} className={'flex ' + (msg.role === 'user' ? 'justify-end' : msg.role === 'system' ? 'justify-center' : 'justify-start')}>
                <div className={'max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2.5 sm:py-3 ' + (
                  msg.role === 'user'
                    ? 'bg-[#1E3A8A] text-white rounded-[18px]'
                    : msg.role === 'system'
                    ? 'bg-[#10B981] text-white rounded-[18px] text-center'
                    : 'bg-transparent text-[#1E3A8A] rounded-[18px]'
                )} style={{ lineHeight: 1.4 }}>
                  <p className="whitespace-pre-wrap text-sm sm:text-[15px]">{msg.content}</p>
                </div>
              </div>
            ))}
            {typingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent text-[#1E3A8A] rounded-[18px]" style={{ lineHeight: 1.4 }}>
                  <p className="whitespace-pre-wrap text-sm sm:text-[15px]">{typingMessage}</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {loading && !typingMessage && (
          <div className="px-3 sm:px-4 pb-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#1E3A8A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-[#1E3A8A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-[#1E3A8A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-[#E2E8F0] p-3 sm:p-4 flex-shrink-0 safe-bottom">
        <div className="flex flex-col gap-2 max-w-4xl mx-auto">
          {/* Visualisation audio + timer (visible uniquement en enregistrement) */}
          {isListening && (
            <div className="flex items-center gap-3 px-3 py-2 bg-[#F8FAFC] rounded-2xl">
              {/* Timer */}
              <div className="text-sm font-semibold text-[#1E3A8A] min-w-[40px]">
                {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
              </div>

              {/* Visualisation audio inline */}
              <div className="flex-1 flex items-center justify-center gap-0.5 h-8">
                {[...Array(30)].map((_, i) => {
                  const height = Math.max(4, audioLevel * 100 * (0.3 + Math.random() * 0.7));
                  return (
                    <div
                      key={i}
                      className="w-0.5 bg-[#1E3A8A] rounded-full transition-all duration-75"
                      style={{
                        height: `${height}%`,
                        opacity: 0.3 + audioLevel * 0.7
                      }}
                    />
                  );
                })}
              </div>

              {/* Texte d'instruction */}
              <span className="text-xs text-[#64748B]">
                Enregistrement en cours...
              </span>
            </div>
          )}

          {/* Barre de saisie */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleRecording}
              disabled={loading}
              className={'p-2.5 sm:p-3 rounded-full transition-colors flex-shrink-0 ' + (
                isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-[#F8FAFC] text-[#1E3A8A] hover:bg-[#E2E8F0]'
              )}
            >
              <FaMicrophone className="text-base sm:text-lg" />
            </button>

            <input
              ref={inputRef}
              type="text"
              value={isListening ? input + accumulatedText : input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isListening ? 'Parlez maintenant...' : 'Votre message...'}
              disabled={loading || isListening}
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F8FAFC] border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-[#0F172A] placeholder-[#64748B] text-sm sm:text-base"
            />

            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2.5 sm:p-3 bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E40AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <FaPaperPlane className="text-base sm:text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
