# Brick lister – Single Page Application (React + Vite)

Projekt dynamicznej aplikacji internetowej typu SPA (Single Page Application) o nazwie **Brick lister**, zrealizowany w ramach laboratoriów z Zaawansowanych Aplikacji Internetowych. Aplikacja wzorowana jest na systemach sprzedażowych i inwentaryzacyjnych klocków LEGO (*Pick a Brick* oraz *BrickLink*). Łączy w sobie nowoczesną architekturę komponentową frontendu z zaawansowaną logiką biznesową, przetwarzaniem plików zewnętrznych oraz elastycznym systemem układów (layouts).

## 🚀 Główne Funkcjonalności (Features)

Aplikacja w pełni realizuje wytyczne i wymagania funkcjonalne zawarte w instrukcji laboratoryjnej:
1. **System Nawigacji i Routing:** Obsługa pełnego, bezprzeładowaniowego routingu dla podstron: *Zestawy (Sets)*, *Listy części (Parts)* oraz *Pomoc (FAQ)* z użyciem `react-router-dom`.
2. **Architektura Komponentowa i Szablony:** Implementacja uniwersalnego komponentu layoutu typu `SplitScreen`, który pozwala dynamicznie sterować układem paneli (pionowo/poziomo) oraz wagami ich szerokości (`leftWeight`, `rightWeight`) za pomocą mechanizmu `props`.
3. **Obsługa Zdarzeń i Reaktywność (React Hooks):** Wykorzystanie hooków `useState` oraz `useEffect` do dynamicznego przeliczania wartości całego zestawu klocków na podstawie ceny jednostkowej wprowadzanej przez użytkownika w czasie rzeczywistym.
4. **Parsowanie i Przetwarzanie Plików CSV:** Integracja z biblioteką `PapaParse` umożliwiająca asynchroniczne pobieranie i parsowanie surowych danych inwentaryzacyjnych (plik `6541_parts.csv`) z automatycznym mapowaniem na interfejs użytkownika (zdjęcie, nazwa, ID elementu, ilość).
5. **Formularze i Walidacja:** Implementacja w pełni kontrolowanego formularza kontaktowego w sekcji pomocy z obsługą stanów (React Hooks) oraz symulacją zapisu zgłoszenia.

## 🛠️ Stos Technologiczny (Tech Stack)

* **Framework/Środowisko:** React 18+ (Vite)
* **Routing:** React Router DOM v6
* **Parsowanie danych:** PapaParse
* **Język programowania:** JavaScript (ES6+) / JSX
* **Zarządzanie stanem:** React Hooks (`useState`, `useEffect`)

## 📂 Struktura Projektu (Project Structure)

```text
brick-lister/
├── public/
│   └── data/
│       ├── 6541_parts.csv        # Dostarczony plik z danymi klocków
│       ├── 6277_instruction.pdf  # Instrukcja składania zestawu
│       └── 6541_preview.jpg      # Grafika podglądowa zestawu
├── src/
│   ├── layouts/
│   │   └── SplitScreen.jsx       # Uniwersalny komponent dzielonego ekranu
│   ├── pages/
│   │   ├── SetsPage.jsx          # Strona główna z kafelkami zestawów
│   │   ├── PartsPage.jsx         # Podstrona inwentarza i wyliczeń CSV
│   │   └── FaqSplitPage.jsx      # Podstrona FAQ połączona z formularzem
│   ├── App.jsx                   # Główna konfiguracja routingu
│   └── main.jsx                  # Punkt wejścia aplikacji Vite
├── package.json
└── README.md
```

## 💻 Instrukcja Uruchomienia (Installation & Setup)

1. **Klonowanie repozytorium:**
   ```bash
   git clone [https://github.com/TWOJ_NICK/brick-lister.git](https://github.com/TWOJ_NICK/brick-lister.git)
   cd brick-lister
   ```

2. **Instalacja zależności (Node Modules):**
   ```bash
   npm install
   ```

3. **Uruchomienie serwera deweloperskiego (Live Reload):**
   ```bash
   npm run dev
   ```
   Po uruchomieniu aplikacja będzie dostępna w przeglądarce pod adresem: `http://localhost:5173/`

4. **Budowanie wersji produkcyjnej (Build):**
   ```bash
   npm run build
   ```
