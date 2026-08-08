import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, Download, Smartphone, Cpu, Sparkles, CheckCircle2, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GameModal({ game, onClose, t, onToast }) {
  const modalRef = useRef(null);

  // Close on Escape & Focus Trap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (modalRef.current) {
      modalRef.current.focus();
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!game) return null;

  const handlePreRegister = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#facc15', '#ffffff']
    });
    if (onToast) {
      onToast(`🎉 Successfully pre-registered for "${game.title}" on Google Play!`);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    if (onToast) {
      onToast(`🔗 Direct Play Store link copied to clipboard!`);
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-game-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog" ref={modalRef} tabIndex={-1}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="game-genre-badge">{game.genre}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-primary-400)', fontWeight: 700 }}>
              ★ {game.rating} Rating
            </span>
          </div>

          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <h2 id="modal-game-title" style={{ fontSize: '1.8rem', marginBottom: 12 }}>
          {game.title}
        </h2>

        <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: '1rem', lineHeight: 1.6 }}>
          {game.fullDesc || game.desc}
        </p>

        {/* Technical Specs Table */}
        <div style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          marginBottom: 24
        }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Cpu size={18} className="text-emerald-400" />
            <span>Architecture & Google Play Compliance</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.875rem' }}>
            <div><strong>Engine:</strong> {game.engine}</div>
            <div><strong>Target SDK:</strong> Android 16 (API 36)</div>
            <div><strong>Package Size:</strong> {game.size}</div>
            <div><strong>Framerate:</strong> 60 FPS Locked</div>
            <div><strong>Monetization:</strong> {game.monetization}</div>
            <div><strong>Ad Grace Period:</strong> 90s Protected</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={handlePreRegister}
          >
            <Smartphone size={18} />
            <span>{t.showcase.preRegister}</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCopyLink}
            title="Copy Share Link"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
