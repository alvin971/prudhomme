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
  const [interimTranscript, setInterimTranscript] = useState('');

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

  // Ajoute ponctuation intelligente au texte (comme ChatGPT)
  const addSmartPunctuation = (text: string): string => {
    if (!text.trim()) return text;

    let result = text.trim();

    // Première lettre en majuscule
    result = result.charAt(0).toUpperCase() + result.slice(1);

    // Ajoute un point à la fin si pas de ponctuation
    const lastChar = result.charAt(result.length - 1);
    if (!['.', '!', '?', ',', ';'].includes(lastChar)) {
      result += '.';
    }

    // Majuscule après point
    result = result.replace(/\.\s+([a-z])/g, (match, letter) => '. ' + letter.toUpperCase());
    result = result.replace(/\?\s+([a-z])/g, (match, letter) => '? ' + letter.toUpperCase());
    result = result.replace(/\!\s+([a-z])/g, (match, letter) => '! ' + letter.toUpperCase());

    return result;
  };



  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopVoiceRecognition();
    };
  }, []);

  const visualizeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
          setAudioLevel(average / 255); // Normalize to 0-1
          animationFrameRef.current = requestAnimationFrame(updateLevel);
        }
      };

      updateLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
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

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('La reconnaissance vocale n\'est pas supportée par votre navigateur');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = true;
    recognition.interimResults = true; // Active les résultats intermédiaires

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      startTimer();
      visualizeAudio();
    };

    recognition.onend = () => {
      setIsListening(false);
      stopTimer();
      stopAudioVisualization();
      setInterimTranscript('');
    };

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      // Affiche le texte intermédiaire pendant la dictée
      setInterimTranscript(interim);

      // Quand un segment est finalisé, on l'ajoute avec ponctuation
      if (final) {
        const punctuatedText = addSmartPunctuation(final);
        setInput(prev => {
          if (!prev.trim()) return punctuatedText;
          // Si le texte précédent se termine par une ponctuation, ajoute un espace
          const lastChar = prev.trim().charAt(prev.trim().length - 1);
          if (['.', '!', '?'].includes(lastChar)) {
            return prev.trim() + ' ' + punctuatedText;
          }
          return prev.trim() + ' ' + punctuatedText.charAt(0).toLowerCase() + punctuatedText.slice(1);
        });
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      stopTimer();
      stopAudioVisualization();
      setInterimTranscript('');
    };

    recognition.start();
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    stopTimer();
    stopAudioVisualization();
    setInterimTranscript('');
  };

  const toggleVoiceRecognition = () => {
    if (isListening) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
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

              {/* Bouton stop */}
              <button
                onClick={stopVoiceRecognition}
                className="text-xs text-red-500 font-semibold hover:text-red-600 transition-colors px-2"
              >
                Stop
              </button>
            </div>
          )}

          {/* Barre de saisie */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleVoiceRecognition}
              disabled={loading}
              className={'p-2.5 sm:p-3 rounded-full transition-colors flex-shrink-0 ' + (
                isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-[#F8FAFC] text-[#1E3A8A] hover:bg-[#E2E8F0]'
              )}
            >
              <FaMicrophone className="text-base sm:text-lg" />
            </button>

            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input + (interimTranscript ? ' ' + interimTranscript : '')}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isListening ? 'Parlez maintenant...' : 'Votre message...'}
                disabled={loading || isListening}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F8FAFC] border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-[#0F172A] placeholder-[#64748B] text-sm sm:text-base"
              />
              {interimTranscript && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm italic pointer-events-none">
                  ...
                </span>
              )}
            </div>

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
