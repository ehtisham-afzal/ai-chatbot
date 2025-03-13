import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { isTestEnvironment } from "../constants";
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from "./models.test";

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        "chat-model-small": chatModel,
        "chat-model-large": chatModel,
        "chat-model-reasoning": reasoningModel,
        "title-model": titleModel,
        "artifact-model": artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        "chat-model-small": google("gemini-2.0-flash"),
        "chat-model-large": google("gemini-2.0-pro-exp-02-05"),
        "chat-model-reasoning": wrapLanguageModel({
          // model: fireworks('accounts/fireworks/models/deepseek-r1'),
          // model: google('gemini-2.0-flash-thinking-exp-01-21'),
          model: openrouter("deepseek/deepseek-r1:free"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": google("gemini-2.0-flash-lite"),
        "artifact-model": google("gemini-2.0-pro-exp-02-05"),
      },
      imageModels: {
        "small-model": openai.image("dall-e-2"),
        "large-model": openai.image("dall-e-3"),
      },
    });
