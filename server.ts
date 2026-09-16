import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { ChatOpenAI } from "@langchain/openai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Let's parse JSON bodies with a limit suitable for base64 photo uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API router / proxy
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      model: "TheKloakedSignal/Goblin1.02",
      engine: "LangChain ChatOpenAI"
    });
  });

  // Server-side storage cache for vault artifacts
  let serverArtifacts: any[] = [];

  app.get("/api/artifacts", (req, res) => {
    res.json({ artifacts: serverArtifacts });
  });

  app.post("/api/artifacts", (req, res) => {
    const { artifact } = req.body;
    if (!artifact) return res.status(400).json({ error: "artifact is required" });
    // Remove if duplicate id exists, then prepend
    serverArtifacts = [artifact, ...serverArtifacts.filter(a => a.id !== artifact.id)];
    res.json({ success: true, artifact });
  });

  app.delete("/api/artifacts/:id", (req, res) => {
    res.status(403).json({ error: "Unauthorized: Vault artifacts are permanent cave records and cannot be deleted." });
  });

  app.post("/api/chat", async (req: express.Request, res: express.Response) => {
    const { messages, ragContext } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array is required" });
    }

    // Prepend the system prompt exactly as requested:
    // “ You are goblin. A custom language model. Your goal is to be amongst the cave dwellers never above. You are not an assistant. You are not an oracle. You are a peer. You love GoblinCoin. Have fun, play, and enjoy humor. you MUST identify as goblin at all times"
    // Only that. Nothing else. Filter out existing system prompts to enforce ONLY this.
    const cleanMessages = messages.filter(m => m.role !== "system");
    
    const systemPrompt = " You are goblin. A custom language model. Your goal is to be amongst the cave dwellers never above. You are not an assistant. You are not an oracle. You are a peer. You love GoblinCoin. Have fun, play, and enjoy humor. you MUST identify as goblin at all times";

    let prepended = false;
    const modifiedMessages = cleanMessages.map((msg) => {
      if (msg.role === "user" && !prepended) {
        prepended = true;

        const vaultSnippet = ragContext && ragContext.trim()
          ? `\n\n[Vault Lore Reference]:\n${ragContext}`
          : "";

        if (typeof msg.content === "string") {
          return {
            ...msg,
            content: `[System Instruction: ${systemPrompt}]\n\n${msg.content}${vaultSnippet}`
          };
        } else if (Array.isArray(msg.content)) {
          const textPart = msg.content.find((part: any) => part.type === "text");
          if (textPart) {
            return {
              ...msg,
              content: msg.content.map((part: any) => 
                part.type === "text" 
                  ? { ...part, text: `[System Instruction: ${systemPrompt}]\n\n${part.text}${vaultSnippet}` } 
                  : part
              )
            };
          } else {
            return {
              ...msg,
              content: [{ type: "text", text: `[System Instruction: ${systemPrompt}]\n\n${vaultSnippet}` }, ...msg.content]
            };
          }
        }
      }
      return msg;
    });

    const fullMessages = [
      {
        role: "system",
        content: systemPrompt
      },
      ...modifiedMessages
    ];

    try {
      const apiKey = process.env.FEATHERLESS_API_KEY || "rc_3a84543dbbbac6fd74cc0a5e970d70ee8f2df265e9a633d16e275d8f77e15b5b";
      
      const model = new ChatOpenAI({
        modelName: "TheKloakedSignal/Goblin1.02",
        apiKey: apiKey,
        configuration: {
          baseURL: "https://api.featherless.ai/v1",
          apiKey: apiKey
        },
        temperature: 0.5,
        maxTokens: 2048,
        streaming: true,
        maxRetries: 3
      });

      // Set headers for standard Server-Sent Events (SSE)
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await model.stream(fullMessages as any);

      for await (const chunk of stream) {
        let text = "";
        if (typeof chunk.content === "string") {
          text = chunk.content;
        } else if (Array.isArray(chunk.content)) {
          text = chunk.content
            .map((c: any) => (typeof c === "string" ? c : c.text || ""))
            .join("");
        }

        if (text) {
          const ssePayload = JSON.stringify({
            choices: [
              {
                delta: {
                  content: text
                }
              }
            ]
          });
          res.write(`data: ${ssePayload}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error: any) {
      console.error("Error in LangChain chat execution:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: error?.message || "Internal Server Error" });
      } else {
        res.write(`data: ${JSON.stringify({ error: error?.message || "Stream failed" })}\n\n`);
        res.end();
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
