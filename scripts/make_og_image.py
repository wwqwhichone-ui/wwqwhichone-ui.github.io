"""Render public/og.png (1200x630 social preview). Run: python scripts/make_og_image.py (needs matplotlib)."""

from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402

OUT = Path(__file__).resolve().parents[1] / "public" / "og.png"
BG, GRID, INK, SUB, ACC = "#0a0b0e", "#1a1e26", "#eef0f3", "#a6adbb", "#7aa2ff"

fig = plt.figure(figsize=(12, 6.3), dpi=100)
fig.patch.set_facecolor(BG)
ax = fig.add_axes([0, 0, 1, 1])
ax.set_xlim(0, 1200)
ax.set_ylim(0, 630)
ax.axis("off")
for x in range(700, 1200, 60):
    ax.plot([x, x], [0, 630], color=GRID, lw=1)
for y in range(30, 630, 60):
    ax.plot([680, 1200], [y, y], color=GRID, lw=1)
pts = [(860, 120), (950, 300), (1090, 340), (1150, 470)]
ax.plot(*zip(*pts), color=ACC, lw=5, solid_capstyle="round")
for x, y in pts:
    ax.plot(x, y, "o", color=ACC, ms=14)
ax.text(80, 420, "ROBOTICS × AI × INTELLIGENT SYSTEMS", color=ACC, fontsize=17, family="monospace")
ax.text(80, 320, "Weiqi Wang", color=INK, fontsize=64, weight="bold")
ax.text(80, 240, "MSc Robotics & Intelligent Systems @ HKU", color=SUB, fontsize=24)
ax.text(80, 195, "Embodied AI · LLM task planning · Motion planning", color=SUB, fontsize=20)
ax.text(80, 80, "wwqwhichone-ui.github.io", color=SUB, fontsize=17, family="monospace")
fig.savefig(OUT, facecolor=BG)
print("wrote", OUT)
