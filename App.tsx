import React, { useState, useMemo } from 'react';
import { CAMERA_FORMATS, FULL_FRAME_DIMENSIONS } from './constants';
import { CalculationResult } from './types';

// Calculate diagonal for crop factor
const getDiagonal = (w: number, h: number) => Math.sqrt(w * w + h * h);
const FF_DIAGONAL = getDiagonal(FULL_FRAME_DIMENSIONS.width, FULL_FRAME_DIMENSIONS.height);

const App: React.FC = () => {
  // Use string state to handle input directly, avoiding auto-conversion to 0 in the UI
  const [focalLengthInput, setFocalLengthInput] = useState<string>('80');

  // Derived focal length for calculation: if input is empty, treat as 0
  const focalLength = focalLengthInput === '' ? 0 : Number(focalLengthInput);

  // Calculate results automatically when input changes
  const results: CalculationResult[] = useMemo(() => {
    return CAMERA_FORMATS.map((format) => {
      const formatDiagonal = getDiagonal(format.dimensions.width, format.dimensions.height);
      // Crop factor: Reference Diagonal / Target Diagonal
      // For Medium Format, the factor is < 1.
      // Equivalent FL = Physical FL * (FF Diag / Format Diag)
      const factor = FF_DIAGONAL / formatDiagonal;
      
      return {
        format,
        cropFactor: factor,
        equivalentFocalLength: focalLength * factor,
        diagonalMm: formatDiagonal,
        aspectRatio: format.dimensions.width / format.dimensions.height
      };
    });
  }, [focalLength]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 p-6 md:p-12 font-sans selection:bg-rose-500 selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 text-center md:text-left border-b border-stone-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-100 tracking-tight">
              中片幅 <span className="text-rose-600">視角換算</span>
            </h1>
            <p className="text-stone-500 mt-2 text-lg">
              計算鏡頭焦距對應 135 全片幅的等效視角
            </p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-stone-600 text-sm uppercase tracking-widest">Reference</div>
            <div className="text-stone-400 font-mono">36 x 24 mm</div>
          </div>
        </header>

        {/* Input Section */}
        <section className="mb-16">
          <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
            <label htmlFor="focalLength" className="block text-stone-400 text-sm uppercase tracking-wider mb-3 font-semibold">
              輸入鏡頭物理焦距 (mm)
            </label>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative flex-1 w-full">
                <input
                  id="focalLength"
                  type="number"
                  min="0"
                  value={focalLengthInput}
                  onChange={(e) => setFocalLengthInput(e.target.value)}
                  className="w-full bg-stone-800 border-2 border-stone-700 text-white text-5xl md:text-6xl font-mono py-4 px-6 rounded-xl focus:outline-none focus:border-rose-600 focus:ring-4 focus:ring-rose-900/20 transition-all text-center md:text-left"
                  placeholder="80"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-600 text-2xl font-mono pointer-events-none">
                  mm
                </span>
              </div>
              
              {/* Quick Select Buttons */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start max-w-lg">
                {[45, 50, 65, 80, 90, 105, 110, 127, 150, 180].map(mm => (
                  <button
                    key={mm}
                    onClick={() => setFocalLengthInput(mm.toString())}
                    className={`px-3 py-2 rounded-lg font-mono text-sm transition-colors border ${
                      focalLength === mm 
                        ? 'bg-rose-600 border-rose-500 text-white' 
                        : 'bg-stone-800 border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200'
                    }`}
                  >
                    {mm}mm
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {results.map((res) => (
            <div key={res.format.id} className="group relative bg-stone-900 border border-stone-800 hover:border-rose-900/50 rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl overflow-hidden flex flex-col justify-between">
              
              {/* Visual Hint for Aspect Ratio */}
              <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
                 <div 
                    className="border border-white/50 bg-white/5"
                    style={{ 
                        width: res.format.dimensions.width > res.format.dimensions.height ? '60px' : `${60 * (res.format.dimensions.width/res.format.dimensions.height)}px`,
                        height: res.format.dimensions.width > res.format.dimensions.height ? `${60 * (res.format.dimensions.height/res.format.dimensions.width)}px` : '60px'
                    }}
                 />
              </div>

              <div>
                <div className="flex justify-between items-start mb-4">
                    <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-rose-500 transition-colors">
                        {res.format.commonName}
                    </h3>
                    <p className="text-xs text-stone-500 font-mono mt-1">
                        {res.format.dimensions.width} × {res.format.dimensions.height} mm
                    </p>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="text-stone-500 text-sm mb-1">等效 135 焦距</div>
                    <div className="text-5xl font-mono text-rose-500 font-bold tracking-tighter">
                    {res.equivalentFocalLength.toFixed(1)}
                    <span className="text-xl text-rose-700/70 ml-1">mm</span>
                    </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800/50 mt-auto">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-stone-500 uppercase tracking-wider">換算係數</span>
                    <span className="font-mono text-stone-300 bg-stone-800 px-2 py-0.5 rounded text-xs">
                        x{res.cropFactor.toFixed(2)}
                    </span>
                </div>
                <p className="text-sm text-stone-400 leading-relaxed">
                  {res.format.examples}
                </p>
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
};

export default App;