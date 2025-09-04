# Ainovel

A simple static website that displays an AI generated novel in multiple languages.

## Features

- Detects the visitor's browser language and loads the matching novel text.
- Supports English, Traditional Chinese, Simplified Chinese and Japanese.
- Allows manually switching languages through a drop–down menu.

## Usage

1. Clone the repository.
2. Serve the project as a static site. For example:

   ```bash
   python3 -m http.server
   ```

3. Open `http://localhost:8000` in your browser (or simply open `index.html`).

## Project Structure

- `index.html` – main web page.
- `script.js` – language detection and novel loading logic.
- `style.css` – basic styling.
- `novels/<id>/` – HTML page and translated text files for each novel.

