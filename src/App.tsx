import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Upload, Settings, Wand2, Clock, Film, Sparkles } from 'lucide-react';

const Veo3Clone = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(5);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [style, setStyle] = useState('cinematic');
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const styles = [
    { value: 'cinematic', label: 'Cinemático', color: 'from-purple-500 to-pink-500' },
    { value: 'realistic', label: 'Realístico', color: 'from-blue-500 to-cyan-500' },
    { value: 'animated', label: 'Animado', color: 'from-green-500 to-emerald-500' },
    { value: 'artistic', label: 'Artístico', color: 'from-orange-500 to-red-500' }
  ];

  const aspectRatios = [
    { value: '16:9', label: '16:9 (Widescreen)' },
    { value: '9:16', label: '9:16 (Vertical)' },
    { value: '1:1', label: '1:1 (Quadrado)' },
    { value: '21:9', label: '21:9 (Ultra Wide)' }
  ];

  const examplePrompts = [
    "Um gato laranja brincando em um jardim florido ao pôr do sol",
    "Ondas do oceano quebrando em uma praia tropical com palmeiras",
    "Uma cidade futurística com carros voadores e prédios brilhantes",
    "Fogos de artifício coloridos explodindo no céu noturno",
    "Uma floresta encantada com luzes mágicas flutuando"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    // Simula o progresso de geração
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          // Simula um vídeo gerado
          setGeneratedVideo({
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
            prompt: prompt,
            duration: duration,
            aspectRatio: aspectRatio,
            style: style
          });
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePromptSelect = (selectedPrompt) => {
    setPrompt(selectedPrompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Veo3 Clone</h1>
              <p className="text-sm text-purple-300">Gerador de Vídeos com IA</p>
            </div>
          </div>
          <Settings className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Painel de Controle */}
          <div className="space-y-6">
            {/* Prompt Input */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <label className="block text-white font-semibold mb-3 flex items-center">
                <Wand2 className="w-5 h-5 mr-2 text-purple-400" />
                Descreva seu vídeo
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Digite uma descrição detalhada do vídeo que você quer gerar..."
                className="w-full h-32 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              />
              
              {/* Prompts de exemplo */}
              <div className="mt-4">
                <p className="text-sm text-white/70 mb-2">Exemplos:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptSelect(example)}
                      className="text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-3 py-1 rounded-full transition-all border border-purple-500/30 hover:border-purple-500/50"
                    >
                      {example.slice(0, 30)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Configurações */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Duração */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <label className="block text-white font-semibold mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-400" />
                  Duração
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value={5}>5 segundos</option>
                  <option value={10}>10 segundos</option>
                  <option value={15}>15 segundos</option>
                  <option value={30}>30 segundos</option>
                </select>
              </div>

              {/* Aspecto */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <label className="block text-white font-semibold mb-2">Proporção</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  {aspectRatios.map(ratio => (
                    <option key={ratio.value} value={ratio.value}>{ratio.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Estilos */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <label className="block text-white font-semibold mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                Estilo Visual
              </label>
              <div className="grid grid-cols-2 gap-3">
                {styles.map(styleOption => (
                  <button
                    key={styleOption.value}
                    onClick={() => setStyle(styleOption.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      style === styleOption.value
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className={`w-full h-8 rounded bg-gradient-to-r ${styleOption.color} mb-2`}></div>
                    <p className="text-white text-sm font-medium">{styleOption.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Botão de Gerar */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Gerando... {Math.round(progress)}%</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  <span>Gerar Vídeo</span>
                </>
              )}
            </button>

            {isGenerating && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">Progresso</span>
                  <span className="text-white text-sm">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Preview do Vídeo */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Play className="w-5 h-5 mr-2 text-green-400" />
                Preview do Vídeo
              </h3>
              
              <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl overflow-hidden border border-white/20">
                {generatedVideo ? (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster={generatedVideo.thumbnail}
                      onEnded={() => setIsPlaying(false)}
                    >
                      <source src={generatedVideo.url} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button
                        onClick={togglePlay}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Film className="w-16 h-16 text-white/30 mx-auto mb-4" />
                      <p className="text-white/50 text-lg">Seu vídeo aparecerá aqui</p>
                      <p className="text-white/30 text-sm mt-2">Digite um prompt e clique em "Gerar Vídeo"</p>
                    </div>
                  </div>
                )}
              </div>

              {generatedVideo && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={togglePlay}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-white/70 text-sm">
                      {generatedVideo.duration}s • {generatedVideo.aspectRatio} • {generatedVideo.style}
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/70 text-sm font-medium mb-1">Prompt usado:</p>
                    <p className="text-white text-sm">{generatedVideo.prompt}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Informações adicionais */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <h4 className="text-white font-semibold mb-2">💡 Dicas para melhores resultados:</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Seja específico sobre ações, cenários e detalhes visuais</li>
                <li>• Mencione iluminação, clima e atmosfera desejados</li>
                <li>• Use termos cinematográficos como "close-up", "plano geral"</li>
                <li>• Descreva movimento e transições desejadas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Veo3Clone;