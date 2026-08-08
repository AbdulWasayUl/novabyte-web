import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Trophy, Sparkles } from 'lucide-react';

// Web Audio API Synthesizer (Zero external audio files needed)
class SoundFx {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playJump() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(480, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playCoin() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime);
      osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {}
  }

  playCrash() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }
}

const sfx = new SoundFx();

export default function MiniGame({ t, onNewRecord }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('idle'); // idle, playing, over
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('novabyte_highscore') || '0', 10);
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  const stateRef = useRef({
    player: { x: 50, y: 140, vy: 0, w: 24, h: 24, onGround: true },
    obstacles: [],
    coins: [],
    particles: [],
    speed: 4,
    frame: 0,
    score: 0
  });

  const animIdRef = useRef(null);

  const toggleSound = () => {
    sfx.init();
    sfx.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  const jump = () => {
    sfx.init();
    const st = stateRef.current;
    if (gameState === 'idle') {
      startGame();
      return;
    }
    if (gameState === 'over') {
      startGame();
      return;
    }
    if (st.player.onGround) {
      st.player.vy = -9.5;
      st.player.onGround = false;
      sfx.playJump();
      // Particles
      for (let i = 0; i < 6; i++) {
        st.particles.push({
          x: st.player.x + 12,
          y: st.player.y + 24,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * -2,
          life: 18,
          color: '#10b981'
        });
      }
    }
  };

  const startGame = () => {
    sfx.init();
    stateRef.current = {
      player: { x: 50, y: 140, vy: 0, w: 24, h: 24, onGround: true },
      obstacles: [],
      coins: [],
      particles: [],
      speed: 4.2,
      frame: 0,
      score: 0
    };
    setScore(0);
    setGameState('playing');
  };

  // Main Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const st = stateRef.current;
      const W = canvas.width;
      const H = canvas.height;
      const groundY = H - 32;

      // Clear & Background Grid
      ctx.fillStyle = '#040d09';
      ctx.fillRect(0, 0, W, H);

      // Cyber Grid lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
      ctx.lineWidth = 1;
      for (let x = (st.frame * -st.speed) % 30; x < W; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, groundY);
        ctx.stroke();
      }

      // Ground line
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(0, groundY, W, 32);
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(W, groundY);
      ctx.stroke();

      if (gameState === 'playing') {
        st.frame++;

        // Physics
        st.player.y += st.player.vy;
        st.player.vy += 0.48; // Gravity

        if (st.player.y + st.player.h >= groundY) {
          st.player.y = groundY - st.player.h;
          st.player.vy = 0;
          st.player.onGround = true;
        }

        // Spawn Obstacles
        if (st.frame % 85 === 0) {
          st.obstacles.push({
            x: W + 10,
            y: groundY - 26,
            w: 18,
            h: 26,
            passed: false
          });
        }

        // Spawn Coins
        if (st.frame % 60 === 0 && Math.random() > 0.3) {
          st.coins.push({
            x: W + 20,
            y: groundY - 45 - Math.random() * 30,
            r: 7,
            collected: false
          });
        }

        // Move & Collide Obstacles
        for (let i = st.obstacles.length - 1; i >= 0; i--) {
          const obs = st.obstacles[i];
          obs.x -= st.speed;

          // Score when passed
          if (!obs.passed && obs.x < st.player.x) {
            obs.passed = true;
            st.score += 10;
            setScore(st.score);
          }

          // Collision Check
          if (
            st.player.x < obs.x + obs.w &&
            st.player.x + st.player.w > obs.x &&
            st.player.y < obs.y + obs.h &&
            st.player.y + st.player.h > obs.y
          ) {
            // Game Over
            sfx.playCrash();
            setGameState('over');
            if (st.score > highScore) {
              setHighScore(st.score);
              localStorage.setItem('novabyte_highscore', st.score.toString());
              if (onNewRecord) onNewRecord(st.score);
            }
          }

          if (obs.x < -30) st.obstacles.splice(i, 1);
        }

        // Move & Collect Coins
        for (let i = st.coins.length - 1; i >= 0; i--) {
          const c = st.coins[i];
          c.x -= st.speed;

          const dx = st.player.x + 12 - c.x;
          const dy = st.player.y + 12 - c.y;
          if (Math.hypot(dx, dy) < 22) {
            sfx.playCoin();
            st.score += 25;
            setScore(st.score);
            // Coin particles
            for (let p = 0; p < 8; p++) {
              st.particles.push({
                x: c.x,
                y: c.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 15,
                color: '#facc15'
              });
            }
            st.coins.splice(i, 1);
            continue;
          }

          if (c.x < -20) st.coins.splice(i, 1);
        }

        // Speed ramp
        if (st.frame % 300 === 0 && st.speed < 8.5) {
          st.speed += 0.3;
        }
      }

      // Draw Particles
      for (let i = st.particles.length - 1; i >= 0; i--) {
        const p = st.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
        if (p.life <= 0) st.particles.splice(i, 1);
      }

      // Draw Obstacles (Neon Pyramids / Laser Blocks)
      for (const obs of st.obstacles) {
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y + obs.h);
        ctx.lineTo(obs.x + obs.w / 2, obs.y);
        ctx.lineTo(obs.x + obs.w, obs.y + obs.h);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Coins (Glowing Yellow Orbs)
      for (const c of st.coins) {
        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Player (Neon Mint Cube with trail)
      const pl = st.player;
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#00ffaa';
      ctx.shadowBlur = 14;
      ctx.fillRect(pl.x, pl.y, pl.w, pl.h);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(pl.x + 2, pl.y + 2, pl.w - 4, pl.h - 4);
      ctx.shadowBlur = 0;

      animIdRef.current = requestAnimationFrame(loop);
    };

    animIdRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animIdRef.current);
  }, [gameState, highScore]);

  // Keyboard handler
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameState]);

  return (
    <div className="minigame-card" role="region" aria-label={t.minigame.title}>
      <div className="minigame-header">
        <div className="minigame-title">
          <Sparkles className="w-5 h-5 text-emerald-400" aria-hidden="true" />
          <span>{t.minigame.title}</span>
        </div>

        <div className="minigame-scores">
          <div className="score-pill" aria-live="polite">
            {t.minigame.score}: <strong>{score}</strong>
          </div>
          <div className="score-pill" title={t.minigame.best}>
            <Trophy className="w-3.5 h-3.5 inline mr-1 text-amber-400" aria-hidden="true" />
            {highScore}
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleSound}
            aria-label={soundEnabled ? t.minigame.soundOff : t.minigame.soundOn}
            style={{ width: 34, height: 34 }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      <div
        className="canvas-wrapper"
        onClick={jump}
        role="button"
        tabIndex={0}
        aria-label={t.minigame.pressToJump}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            jump();
          }
        }}
      >
        <canvas ref={canvasRef} width={480} height={220} className="game-canvas" />

        {gameState === 'idle' && (
          <div className="minigame-overlay">
            <h3 style={{ fontSize: '1.25rem', color: '#f0fdf4' }}>{t.minigame.title}</h3>
            <p style={{ fontSize: '0.85rem', color: '#a7f3d0' }}>{t.minigame.tagline}</p>
            <button type="button" className="btn btn-primary" onClick={startGame}>
              <Play size={18} aria-hidden="true" />
              {t.minigame.startPrompt}
            </button>
          </div>
        )}

        {gameState === 'over' && (
          <div className="minigame-overlay">
            <h3 style={{ fontSize: '1.4rem', color: '#f43f5e' }}>{t.minigame.gameOver}</h3>
            <p style={{ color: '#f0fdf4' }}>
              {t.minigame.score}: <strong>{score}</strong> | {t.minigame.best}: <strong>{highScore}</strong>
            </p>
            <button type="button" className="btn btn-primary" onClick={startGame}>
              <RotateCcw size={18} aria-hidden="true" />
              {t.minigame.restart}
            </button>
          </div>
        )}
      </div>

      <div className="minigame-controls-hint">
        <span>{t.minigame.pressToJump}</span>
        <span className="keyboard-badge">SPACE / TAP</span>
      </div>
    </div>
  );
}
