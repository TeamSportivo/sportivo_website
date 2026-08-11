"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./DinoGame.module.css";

export default function DinoGame() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState("start"); // "start", "playing", "gameover"
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // References for game loop state (to avoid re-running effect on state changes)
  const stateRef = useRef({
    gameState: "start",
    dinoY: 0,
    dinoVelocity: 0,
    obstacles: [],
    groundOffset: 0,
    score: 0,
    highScore: 0,
    speed: 5,
    frameCount: 0,
    isJumping: false
  });

  useEffect(() => {
    stateRef.current.gameState = gameState;
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    // Constants
    const CANVAS_WIDTH = 600;
    const CANVAS_HEIGHT = 150;
    const GROUND_Y = 130;
    const DINO_X = 50;
    const DINO_WIDTH = 22;
    const DINO_HEIGHT = 26;
    const GRAVITY = 0.5;
    const JUMP_FORCE = -8.5;

    // Set canvas dimensions
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Reset game variables
    const resetGame = () => {
      stateRef.current.dinoY = GROUND_Y - DINO_HEIGHT;
      stateRef.current.dinoVelocity = 0;
      stateRef.current.obstacles = [];
      stateRef.current.groundOffset = 0;
      stateRef.current.score = 0;
      stateRef.current.speed = 5;
      stateRef.current.frameCount = 0;
      stateRef.current.isJumping = false;
      setScore(0);
    };

    const handleJump = () => {
      const state = stateRef.current;
      if (state.gameState === "start") {
        resetGame();
        setGameState("playing");
      } else if (state.gameState === "gameover") {
        resetGame();
        setGameState("playing");
      } else if (state.gameState === "playing" && !state.isJumping) {
        state.dinoVelocity = JUMP_FORCE;
        state.isJumping = true;
      }
    };

    // Keyboard listener
    const onKeyDown = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    // Game loop
    const loop = () => {
      const state = stateRef.current;

      // Clear canvas
      ctx.fillStyle = "#0c0f17"; // Dark background matching the page
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw Ground
      ctx.strokeStyle = "rgba(255, 69, 0, 0.3)"; // Neon orange faint line
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
      ctx.stroke();

      // Draw dashed ground details (moving)
      if (state.gameState === "playing") {
        state.groundOffset = (state.groundOffset + state.speed) % 60;
      }
      ctx.strokeStyle = "rgba(255, 69, 0, 0.15)";
      ctx.setLineDash([4, 20]);
      ctx.beginPath();
      ctx.moveTo(-state.groundOffset, GROUND_Y + 5);
      ctx.lineTo(CANVAS_WIDTH, GROUND_Y + 5);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Draw Dino (Pixel art style)
      const drawDino = (x, y) => {
        ctx.fillStyle = "#ff4500"; // Neon Orange

        // Simple pixelated T-Rex path using small pixel boxes
        // Head
        ctx.fillRect(x + 10, y, 12, 8);
        ctx.fillRect(x + 10, y + 8, 8, 4);
        // Eye (blank/background color)
        ctx.fillStyle = "#0c0f17";
        ctx.fillRect(x + 12, y + 2, 2, 2);
        ctx.fillStyle = "#ff4500";

        // Body
        ctx.fillRect(x + 2, y + 8, 8, 12);
        ctx.fillRect(x + 6, y + 12, 8, 6);
        // Tail
        ctx.fillRect(x, y + 10, 2, 6);
        // Arms
        ctx.fillRect(x + 12, y + 10, 4, 2);

        // Legs (moving animation if playing)
        const legFrame = Math.floor(state.frameCount / 6) % 2;
        if (state.gameState === "playing" && !state.isJumping) {
          if (legFrame === 0) {
            ctx.fillRect(x + 3, y + 20, 2, 6); // Left down
            ctx.fillRect(x + 7, y + 20, 2, 4); // Right bent
          } else {
            ctx.fillRect(x + 3, y + 20, 2, 4); // Left bent
            ctx.fillRect(x + 7, y + 20, 2, 6); // Right down
          }
        } else {
          ctx.fillRect(x + 3, y + 20, 2, 6);
          ctx.fillRect(x + 7, y + 20, 2, 6);
        }
      };

      // Draw Cactus
      const drawCactus = (x, y, w, h) => {
        ctx.fillStyle = "rgba(255, 69, 0, 0.8)";
        // Main trunk
        ctx.fillRect(x + w/3, y, w/3, h);
        // Left arm
        ctx.fillRect(x, y + h/3, w/3, h/3);
        ctx.fillRect(x, y + h/6, w/6, h/3);
        // Right arm
        ctx.fillRect(x + w*2/3, y + h/2.5, w/3, h/3);
        ctx.fillRect(x + w*5/6, y + h/4, w/6, h/3);
      };

      if (state.gameState === "playing") {
        state.frameCount++;

        // Dino Physics
        state.dinoVelocity += GRAVITY;
        state.dinoY += state.dinoVelocity;

        if (state.dinoY > GROUND_Y - DINO_HEIGHT) {
          state.dinoY = GROUND_Y - DINO_HEIGHT;
          state.dinoVelocity = 0;
          state.isJumping = false;
        }

        // Spawn obstacles
        if (state.frameCount % 100 === 0) {
          const sizeType = Math.random() > 0.5 ? "large" : "small";
          const width = sizeType === "large" ? 18 : 12;
          const height = sizeType === "large" ? 30 : 20;
          state.obstacles.push({
            x: CANVAS_WIDTH,
            y: GROUND_Y - height,
            width,
            height
          });
        }

        // Update obstacles
        for (let i = state.obstacles.length - 1; i >= 0; i--) {
          const obs = state.obstacles[i];
          obs.x -= state.speed;

          // Collision detection
          if (
            DINO_X < obs.x + obs.width &&
            DINO_X + DINO_WIDTH > obs.x &&
            state.dinoY < obs.y + obs.height &&
            state.dinoY + DINO_HEIGHT > obs.y
          ) {
            // Collision!
            setGameState("gameover");
            if (state.score > state.highScore) {
              state.highScore = state.score;
              setHighScore(state.score);
            }
          }

          // Remove off-screen obstacles
          if (obs.x + obs.width < 0) {
            state.obstacles.splice(i, 1);
            state.score += 10;
            setScore(state.score);
            // Speed up slowly
            if (state.score % 100 === 0) {
              state.speed += 0.5;
            }
          }
        }
      }

      // Draw Dino
      drawDino(DINO_X, state.dinoY);

      // Draw Obstacles
      state.obstacles.forEach((obs) => {
        drawCactus(obs.x, obs.y, obs.width, obs.height);
      });

      // Start/Restart Info text overlay drawn on canvas
      if (state.gameState === "start") {
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.font = "8px 'Press Start 2P'";
        ctx.textAlign = "center";
        ctx.fillText("TAP OR PRESS SPACE TO START", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      } else if (state.gameState === "gameover") {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.font = "10px 'Press Start 2P'";
        ctx.textAlign = "center";
        ctx.fillText("G A M E   O V E R", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 15);
        ctx.fillStyle = "rgba(255, 69, 0, 0.8)";
        ctx.font = "7px 'Press Start 2P'";
        ctx.fillText("TAP OR PRESS SPACE TO RESTART", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 15);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState]);

  return (
    <div className={styles.gameContainer} ref={containerRef} onClick={() => {
      // Trigger jump or start on canvas click
      if (gameState === "start" || gameState === "gameover") {
        setGameState("playing");
      } else if (gameState === "playing") {
        const state = stateRef.current;
        if (!state.isJumping) {
          state.dinoVelocity = -8.5;
          state.isJumping = true;
        }
      }
    }}>
      <div className={styles.header}>
        <div className={styles.chromeTitle}>
          <span className={styles.icon}>🦖</span>
          <span>NO_INTERNET_VOLUNTEERS</span>
        </div>
        <div className={styles.scores}>
          <span className={styles.highScore}>HI {String(highScore).padStart(5, "0")}</span>
          <span className={styles.currentScore}>{String(score).padStart(5, "0")}</span>
        </div>
      </div>
      <div className={styles.canvasWrap}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
      <div className={styles.chromeError}>
        <h1 className={styles.comingSoonHeading}>COMING SOON</h1>
        <h2>Volunteer Registrations Offline</h2>
        <p>The recruitment portal is currently closed for preparation and updates.</p>
        <div className={styles.suggestions}>
          <p>Try:</p>
          <ul>
            <li>Checking Sportivo's official Instagram handle for announcement alerts</li>
            <li>Preparing your lists of management, technical, or athletic skills</li>
            <li>Reconnecting once portals go live next week</li>
          </ul>
        </div>
        <p className={styles.subtext}>Error Code: ERR_CONNECTION_COMING_SOON</p>
      </div>
    </div>
  );
}
