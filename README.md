# 🤖 AutonomaScrape AI

> An Autonomous Self-Healing AI Web Scraper & Structure-Extraction Pipeline that converts natural language prompts into clean, structured data (`JSON`/`CSV`/`SQL`) with layout-adaptive visual DOM parsing and zero-maintenance self-repair when websites redesign.

---

## 🚀 Overview

**AutonomaScrape AI** solves the brittle nature of traditional web scraping. Traditional scrapers break the moment a target website updates its CSS selectors, layout, or DOM structure. AutonomaScrape AI leverages intelligent visual DOM parsing and LLM-driven reasoning to dynamically interpret web pages, extract the exact data you ask for via natural language, and **automatically self-heal** when layout changes occur.

---

## ✨ Key Features

- **Natural Language Extraction:** Simply describe what data you want in plain English (e.g., *"Scrape all product titles, prices, and ratings from this page"*), and let the AI handle the rest.
- **Self-Healing Selectors:** When a website redesigns or changes its structure, the system detects anomalies, re-evaluates the DOM visually and semantically, and repairs broken extraction paths automatically.
- **Multiple Export Formats:** Seamlessly convert extracted web data into clean **JSON**, **CSV**, or **SQL** formats.
- **Layout-Adaptive Visual DOM Parsing:** Combines HTML structure analysis with visual layout context to accurately pinpoint desired data points across complex modern web applications.
- **Modern Tech Stack:** Built with TypeScript, Bun, Vite, and robust server-side processing.

---

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Runtime / Package Manager:** Bun / Node.js
- **Frontend / UI:** Vite, HTML5
- **Backend / Server:** TypeScript (`server.ts`)

---

## 📂 Project Structure

```text
├── src/                  # Core application source code
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── bun.lock              # Bun lockfile
├── index.html            # Web client entry point
├── metadata.json         # Project metadata
├── package.json          # Dependencies and scripts
├── server.ts             # Backend server implementation
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
⚙️ Getting Started
Prerequisites
Make sure you have Bun or Node.js installed on your machine.

Installation
Clone the repository:

Bash
git clone [https://github.com/zeeshanriaz050-afk/autonoma-scrape-ai-Alternative-self-healing-ai-web-scraper-.git](https://github.com/zeeshanriaz050-afk/autonoma-scrape-ai-Alternative-self-healing-ai-web-scraper-.git)
cd autonoma-scrape-ai-Alternative-self-healing-ai-web-scraper-
Install dependencies:

Bash
bun install
Configure environment variables:
Duplicate .env.example to .env and fill in your necessary API keys (such as your LLM provider keys).

Bash
cp .env.example .env
Run the application:

Bash
bun run server.ts
