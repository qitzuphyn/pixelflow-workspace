# Gumdrop

Gumdrop is a **zen browser-based focus room** that combines ambient visuals and sounds to help you get into deep work, study, or writing mode.

## ✨ Features

- Ambient “focus space” with calming visuals and soundscape controls for different moods (study, writing, deep work).
- Simple, distraction-free interface designed for quick “open and focus” sessions.
- Notes and Task tracking with pomodoro style timer support
- PWA support: installable on desktop via browser, with offline access to core UI.
- Runs entirely in the browser; no account or backend required.

## 🚀 Getting started

### Prerequisites

- Node.js (if you use a bundler or dev server).
- A simple static HTTP server for local testing (e.g. `npm install -g serve`).

### Local development

```bash
# clone the repo
git clone https://github.com/your-username/gumdrop-space.git
cd gumdrop-space

# install dependencies (if any)
npm install

# start dev server (example)
npm run dev
```
Then open `http://localhost:3000` or whichever port your dev server is running on in your browser.

## How to Contribute

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:
1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'feat: add some feature'`.
4. Push to your fork: `git push origin feature/my-idea`.
5. Submit a pull request.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
