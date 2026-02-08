'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useDocuments } from '@/lib/contexts/DocumentsContext';
import { sendMessageToAI, generateDocument } from '@/lib/services/anthropicService';
import { extractDocumentType, shouldGenerateDocument } from '@/lib/utils/prompts';
import { generatePDF } from '@/lib/services/documentService';
import { FaMicrophone, FaPaperPlane, FaBars, FaTimes, FaCheck } from 'react-icons/fa';
import Drawer from '@/components/common/Drawer';
import { AnalysisState, AnalysisPhase } from '@/lib/types/analysis';
import {
  createInitialAnalysisState,
  processWithAnalysis,
  resetAnalysisState
} from '@/lib/services/analysisOrchestrator';

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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [accumulatedText, setAccumulatedText] = useState('');
  const accumulatedTextRef = useRef('');
  const interimTextRef = useRef('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // États pour le système d'analyse intelligent
  const [analysisState, setAnalysisState] = useState<AnalysisState>(createInitialAnalysisState());
  const [analysisMessage, setAnalysisMessage] = useState<string>('');

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
    try {
      // Démarrer la visualisation audio
      await visualizeAudio();

      // Démarrer le timer
      startTimer();
      setIsListening(true);

      // Réinitialiser les chunks audio
      audioChunksRef.current = [];

      // Créer MediaRecorder pour enregistrer l'audio
      if (streamRef.current) {
        const mediaRecorder = new MediaRecorder(streamRef.current, {
          mimeType: 'audio/webm'
        });

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        console.log('Enregistrement audio démarré');
      }

    } catch (error) {
      console.error('Erreur démarrage enregistrement:', error);
      alert('Impossible d\'accéder au microphone: ' + (error as Error).message);
      setIsListening(false);
      stopTimer();
      stopAudioVisualization();
    }
  };

  const addPunctuation = (text: string): string => {
    if (!text.trim()) return text;

    let result = text.trim();

    // Première lettre en majuscule
    result = result.charAt(0).toUpperCase() + result.slice(1);

    // Ajoute un point à la fin si pas de ponctuation
    const lastChar = result.charAt(result.length - 1);
    if (!['.', '!', '?', ',', ';'].includes(lastChar)) {
      result += '.';
    }

    // Majuscule après ponctuation forte
    result = result.replace(/([.!?])\s+([a-z])/g, (match, punct, letter) => punct + ' ' + letter.toUpperCase());

    return result;
  };

  const stopRecording = async () => {
    // Si déjà en train d'arrêter, ignorer
    if (!isListening) return;

    console.log('Validation enregistrement - Envoi à Whisper');

    // Arrêter MediaRecorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();

      // Attendre que les données soient disponibles
      await new Promise<void>((resolve) => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.onstop = () => resolve();
        } else {
          resolve();
        }
      });
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    stopTimer();
    stopAudioVisualization();
    setIsListening(false);

    // Créer le fichier audio à partir des chunks
    if (audioChunksRef.current.length > 0) {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      console.log('Taille audio:', audioBlob.size, 'bytes');

      // Afficher un indicateur de chargement
      setLoading(true);

      try {
        // Envoyer à Whisper API
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        const response = await fetch('/api/transcribe', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Erreur transcription: ' + response.statusText);
        }

        const data = await response.json();
        const transcribedText = data.text?.trim() || '';

        console.log('Texte transcrit par Whisper:', transcribedText);

        if (transcribedText) {
          const newInput = input.trim() ? input.trim() + ' ' + transcribedText : transcribedText;
          setInput(newInput);
        }

      } catch (error) {
        console.error('Erreur transcription:', error);
        alert('Erreur lors de la transcription. Vérifiez que la clé API OpenAI est configurée.');
      } finally {
        setLoading(false);
      }
    }

    // Nettoyer
    audioChunksRef.current = [];
    mediaRecorderRef.current = null;
  };

  const cancelRecording = () => {
    console.log('Annulation enregistrement');

    // Arrêter MediaRecorder sans sauvegarder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Arrêter l'état sans sauvegarder
    setIsListening(false);
    stopTimer();
    stopAudioVisualization();

    // Nettoyer
    audioChunksRef.current = [];
  };

  const toggleRecording = async () => {
    // Empêcher les clics multiples
    if (loading) return;

    if (!isListening) {
      await startRecording();
    }
  };

  // Callback pour les changements de phase d'analyse
  const handlePhaseChange = (phase: AnalysisPhase, message?: string) => {
    setAnalysisState(prev => ({ ...prev, phase }));
    if (message) setAnalysisMessage(message);
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

      // Utiliser le système d'analyse intelligent
      const { response: analysisResponse, newState, shouldUseStandardPrompt } = await processWithAnalysis(
        aiMessages,
        analysisState,
        handlePhaseChange
      );

      setAnalysisState(newState);
      setAnalysisMessage('');

      let finalResponse: string;
      if (shouldUseStandardPrompt) {
        // Messages 1-3 : utiliser le prompt standard existant
        finalResponse = await sendMessageToAI(aiMessages);
      } else {
        // Messages 4+ : utiliser la réponse de l'analyse
        finalResponse = analysisResponse;
      }

      await typewriterEffect(finalResponse);

      setMessages(prev => [...prev, {
        role: 'assistant' as const,
        content: finalResponse,
        timestamp: new Date()
      }]);
      setTypingMessage('');

      // Détecte si l'IA demande à générer le document
      if (shouldGenerateDocument(finalResponse)) {
        const conversationText = conversationMessages.map(m => m.role + ': ' + m.content).join('\n');
        const documentType = extractDocumentType(conversationText);

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '⏳ Génération du document en cours...',
          timestamp: new Date()
        }]);

        const documentContent = await generateDocument(analysisState.selectedDocument, conversationText);
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

        // Réinitialiser l'état d'analyse après génération réussie
        setAnalysisState(resetAnalysisState());
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
            {analysisMessage && (
              <div className="mb-2 text-sm text-[#64748B] text-center">
                {analysisMessage}
              </div>
            )}
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#1E3A8A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-[#1E3A8A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-[#1E3A8A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-[#E2E8F0] p-3 sm:p-4 flex-shrink-0 safe-bottom">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          {/* Pendant l'enregistrement : bouton X (annuler) */}
          {isListening ? (
            <button
              onClick={cancelRecording}
              disabled={loading}
              className="p-2.5 sm:p-3 rounded-full bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] transition-colors flex-shrink-0"
            >
              <FaTimes className="text-base sm:text-lg" />
            </button>
          ) : (
            /* Hors enregistrement : bouton micro */
            <button
              onClick={toggleRecording}
              disabled={loading}
              className="p-2.5 sm:p-3 rounded-full bg-[#F8FAFC] text-[#1E3A8A] hover:bg-[#E2E8F0] transition-colors flex-shrink-0"
            >
              <FaMicrophone className="text-base sm:text-lg" />
            </button>
          )}

          {/* Pendant l'enregistrement : afficher le graphe audio */}
          {isListening ? (
            <div className="flex-1 flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F8FAFC] rounded-3xl">
              {/* Visualisation audio */}
              <div className="flex-1 flex items-center justify-center gap-0.5 h-8">
                {[...Array(40)].map((_, i) => {
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

              {/* Timer */}
              <div className="text-sm font-semibold text-[#1E3A8A] min-w-[45px] text-right">
                {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
              </div>
            </div>
          ) : (
            /* Hors enregistrement : afficher le textarea */
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Votre message..."
              disabled={loading}
              rows={1}
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F8FAFC] border-none rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-[#0F172A] placeholder-[#64748B] text-sm sm:text-base resize-none overflow-y-auto max-h-[144px]"
              style={{
                minHeight: '44px',
                lineHeight: '1.5',
                scrollbarWidth: 'thin',
                boxSizing: 'content-box'
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                const newHeight = Math.min(target.scrollHeight, 144);
                target.style.height = newHeight + 'px';
              }}
            />
          )}

          {/* Pendant l'enregistrement : bouton ✓ (valider), Hors enregistrement : bouton envoyer */}
          {isListening ? (
            <button
              onClick={stopRecording}
              onTouchEnd={(e) => {
                e.preventDefault();
                stopRecording();
              }}
              disabled={loading}
              type="button"
              className="p-2.5 sm:p-3 rounded-full bg-[#1E3A8A] text-white hover:bg-[#1E40AF] transition-colors flex-shrink-0"
            >
              <FaCheck className="text-base sm:text-lg" />
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2.5 sm:p-3 bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E40AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <FaPaperPlane className="text-base sm:text-lg" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
