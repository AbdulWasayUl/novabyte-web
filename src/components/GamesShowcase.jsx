import React, { useState, useMemo } from 'react';
import { Search, Sparkles, ExternalLink, Zap, Layers, Play, CheckCircle } from 'lucide-react';
import GameModal from './GameModal';

export default function GamesShowcase({ t, onToast }) {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalGame, setActiveModalGame] = useState(null);

  const games = useMemo(() => [
    {
      id: 'neon-dash',
      title: 'Neon Dash: Cyber Odyssey',
      genreKey: 'runner',
      genre: 'Endless Dodger',
      rating: '4.8',
      fps: '60 FPS',
      size: '24 MB',
      engine: 'Godot 4.6.3',
      monetization: 'Rewarded Revives',
      desc: 'Precision reflex runner with procedural neon laser grids, synthwave pulse, and responsive touch mechanics.',
      fullDesc: 'Engineered specifically for low-latency tap responses. Features 3 procedural difficulty tiers, dynamic color palettes, unlockable trail cosmetics, and zero banner ads.',
      artGradient: 'linear-gradient(135deg, #052e16 0%, #064e3b 50%, #10b981 100%)',
      accentColor: '#10b981'
    },
    {
      id: 'aqua-sort',
      title: 'AquaSort: Liquid Logic',
      genreKey: 'sort',
      genre: 'Sort & Color',
      rating: '4.9',
      fps: '60 FPS',
      size: '21 MB',
      engine: 'Godot 4.6.3',
      monetization: 'Rewarded Hints',
      desc: 'Calming procedural water sorting puzzle with dynamic fluid physics and 100+ brain-teasing levels.',
      fullDesc: 'Simulates smooth particle pouring with custom Godot shaders. Includes undo moves, extra flask rewards via user-initiated video ads, and zero time pressure.',
      artGradient: 'linear-gradient(135deg, #083344 0%, #0e7490 50%, #06b6d4 100%)',
      accentColor: '#06b6d4'
    },
    {
      id: 'idle-forge',
      title: 'Idle Forge: Rune Tycoon',
      genreKey: 'merge',
      genre: 'Idle Merge',
      rating: '4.7',
      fps: '60 FPS',
      size: '28 MB',
      engine: 'Godot 4.6.3',
      monetization: '2x Boost Rewarded',
      desc: 'Combine elemental runes to forge legendary artifacts. Features deep progression and offline earnings.',
      fullDesc: 'Automated merging grid with high-satisfaction haptic feedback and particle cascades. 2x offline boost via voluntary rewarded ads with zero forced interruptions.',
      artGradient: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #f59e0b 100%)',
      accentColor: '#f59e0b'
    },
    {
      id: 'gravity-core',
      title: 'Gravity Core: Orbital Draw',
      genreKey: 'physics',
      genre: 'Physics Puzzle',
      rating: '4.8',
      fps: '60 FPS',
      size: '26 MB',
      engine: 'Godot 4.6.3',
      monetization: 'Rewarded Solutions',
      desc: 'Draw trajectory lines to guide quantum energy orbs into singularity cores across 40 spatial puzzles.',
      fullDesc: 'Powered by Godot 2D rigid-body simulation. Features realistic gravity wells, laser deflectors, and star rating progression.',
      artGradient: 'linear-gradient(135deg, #3b0764 0%, #6b21a8 50%, #a855f7 100%)',
      accentColor: '#a855f7'
    },
    {
      id: 'chrono-tap',
      title: 'Chrono Tap: Precision Pulse',
      genreKey: 'timing',
      genre: 'One-Button Timing',
      rating: '4.9',
      fps: '60 FPS',
      size: '19 MB',
      engine: 'Godot 4.6.3',
      monetization: 'Cosmetic Unlocks',
      desc: 'Hyper-minimalist one-tap timing challenge. Lock rotating rings into alignment with millisecond precision.',
      fullDesc: 'Built around the core game juice library: screen shake, freeze-frame hit stops, and dynamic audio pitch escalation for pure flow state.',
      artGradient: 'linear-gradient(135deg, #881337 0%, #be123c 50%, #f43f5e 100%)',
      accentColor: '#f43f5e'
    },
    {
      id: 'lexi-path',
      title: 'LexiPath: Word Voyager',
      genreKey: 'word',
      genre: 'Word Puzzle',
      rating: '4.8',
      fps: '60 FPS',
      size: '22 MB',
      engine: 'Godot 4.6.3',
      monetization: 'Rewarded Clues',
      desc: 'Connect letter constellations to discover ancient vocabulary. Offline English dictionary with zero delay.',
      fullDesc: 'Includes over 10,000 verified English word paths, smooth line-drawing gestures, and rewarding anagram challenges.',
      artGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #6366f1 100%)',
      accentColor: '#6366f1'
    }
  ], []);

  const genres = [
    { id: 'all', label: t.showcase.all },
    { id: 'runner', label: t.showcase.runner },
    { id: 'sort', label: t.showcase.sort },
    { id: 'merge', label: t.showcase.merge },
    { id: 'physics', label: t.showcase.physics },
    { id: 'timing', label: t.showcase.timing },
    { id: 'word', label: t.showcase.word }
  ];

  const filteredGames = games.filter((g) => {
    const matchesGenre = selectedGenre === 'all' || g.genreKey === selectedGenre;
    const matchesQuery =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesQuery;
  });

  return (
    <section className="section-padding" id="games" aria-labelledby="showcase-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t.showcase.tag}</div>
          <h2 id="showcase-heading" className="section-title">
            {t.showcase.title}
          </h2>
          <p className="section-subtitle">
            {t.showcase.subtitle}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div style={{ marginBottom: 32 }}>
          <div className="filter-bar" role="tablist" aria-label="Game Genres">
            {genres.map((g) => (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={selectedGenre === g.id}
                className={`filter-btn ${selectedGenre === g.id ? 'active' : ''}`}
                onClick={() => setSelectedGenre(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>

          <div style={{ maxWidth: 440, margin: '0 auto', position: 'relative' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: 14,
                color: 'var(--text-faint)'
              }}
              aria-hidden="true"
            />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: 42 }}
              placeholder={t.showcase.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter games by keyword"
            />
          </div>
        </div>

        {/* Games Grid */}
        <div className="games-grid" role="region" aria-label="Game Portfolio List">
          {filteredGames.map((game) => (
            <article key={game.id} className="game-card">
              {/* Media Art Banner */}
              <div className="game-card-media" style={{ background: game.artGradient }}>
                <span className="game-genre-badge">{game.genre}</span>
                <span className="game-fps-badge">{game.fps}</span>

                {/* Vector Visual Art Display */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: 20,
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }}>
                    <Zap size={36} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="game-card-content">
                <div className="game-card-header">
                  <h3 className="game-card-title">{game.title}</h3>
                </div>

                <p className="game-card-desc">{game.desc}</p>

                <div className="game-card-specs">
                  <span>📦 {game.size}</span>
                  <span>⚙️ {game.engine}</span>
                  <span>🎁 {game.monetization}</span>
                </div>

                <div className="game-card-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '10px 16px', fontSize: '0.875rem' }}
                    onClick={() => setActiveModalGame(game)}
                  >
                    <span>{t.showcase.viewDetails}</span>
                    <ExternalLink size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {activeModalGame && (
        <GameModal
          game={activeModalGame}
          onClose={() => setActiveModalGame(null)}
          t={t}
          onToast={onToast}
        />
      )}
    </section>
  );
}
