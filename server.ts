import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// API endpoint for AI Backstory generation
app.post('/api/generate-backstory', async (req, res) => {
  try {
    const { name, characterClass, subclass, race, primaryWeapon, background, quirk } = req.body;

    if (!name || !characterClass) {
      return res.status(400).json({ error: 'Character name and class are required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: 'No GEMINI_API_KEY configured' });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are a master tabletop fantasy role-playing lorekeeper.
Write an imaginative, atmospheric 1-to-2 sentence fantasy backstory for the following character:
- Name: ${name}
- Class: ${characterClass} (${subclass || 'Adventurer'})
- Lineage/Race: ${race || 'Mortal'}
- Primary Weapon: ${primaryWeapon || 'Signature weapon'}
- Origin: ${background || 'Mysterious Wanderer'}
- Quirk: ${quirk || 'Carries a strange token'}

Requirements:
- Exactly 1 or 2 sentences.
- Highly imaginative, dramatic, and heroic or mysterious tone suitable for an RPG.
- Reflect the character's name and class clearly.
- Output ONLY the backstory text, no quotes, no labels, no conversational filler.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const story = response.text?.trim().replace(/^["']|["']$/g, '');
    if (!story) {
      return res.status(500).json({ error: 'Empty generation received' });
    }

    return res.json({ backstory: story, source: 'ai' });
  } catch (err: any) {
    console.error('Backstory generation error:', err);
    return res.status(500).json({ error: err.message || 'Generation failed', source: 'error' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fantasy Character Generator server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
