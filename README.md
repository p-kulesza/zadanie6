# Testy rezerwacji wizyt

Przykładowy framework w Playwright i TypeScript. Testy UI działają w Chromium. Aplikacja nie istnieje — przed uruchomieniem trzeba dopasować adresy, selektory i endpointy do rzeczywistego systemu.

## Co testuje repo?

- **Logowanie (`@ui @smoke`)** — sprawdza nazwę użytkownika po zalogowaniu.
- **Rezerwacja przez przeglądarkę (`@ui`)** — sprawdza komunikat potwierdzenia, lekarza, datę i godzinę.
- **Rezerwacja przez API (`@api`)** — sprawdza status `201` oraz identyfikator i dane utworzonej wizyty.

Każdy test otrzymuje dynamicznie wygenerowane dane. Fixture tworzy konto przed testem i usuwa je po teście. Zakładamy, że usunięcie konta usuwa też jego rezerwacje.

## Struktura

```text
data/
  testData.ts               # generowanie danych użytkownika i wizyty
fixtures/
  test.ts                   # przygotowanie i sprzątanie danych oraz Page Objecty
pages/
  LoginPage.ts              # locatory CSS i obsługa logowania
  BookingPage.ts            # locatory CSS i obsługa rezerwacji
tests/
  appointments.spec.ts      # dwa testy UI, setup i teardown
  appointments.api.spec.ts  # jeden test API
playwright.config.ts        # adres aplikacji, Chromium, CI i raporty
tsconfig.json               # kontrola typów i nieużywanych importów
package.json                # komendy i zależności
package-lock.json           # dokładne wersje zależności
.gitignore                  # pliki pomijane przez Git
```

Page Objecty przechowują locatory `[data-testid="..."]` w konstruktorach, a ich metody wykonują czynności na stronie. Testy opisują scenariusze i sprawdzają wyniki przez `expect(...)`.

## Komendy

Wymagany Node.js 20+. Komendy uruchamiaj w folderze projektu.

| Komenda | Działanie |
| --- | --- |
| `npm ci` | Instaluje zależności zgodnie z lockfile. |
| `npx playwright install chromium` | Instaluje przeglądarkę potrzebną do testów UI. |
| `npm run typecheck` | Sprawdza typy i nieużywane importy oraz parametry. |
| `npm test` | Uruchamia wszystkie 3 testy. |
| `npm run test:ui` | Uruchamia 2 testy przeglądarkowe. |
| `npm run test:api` | Uruchamia 1 test API. |
| `npm run test:smoke` | Uruchamia test logowania. |
| `npm run test:headed` | Uruchamia testy UI z widoczną przeglądarką; test API nadal działa bez niej. |
| `npx playwright show-report` | Otwiera wygenerowany raport HTML. |
| `npx playwright show-trace sciezka/do/trace.zip` | Otwiera zapisany ślad wykonania w Trace Viewer. |

Przykład ustawienia adresu w PowerShell:

```powershell
$env:BASE_URL = 'https://adres-aplikacji'
npm test
```

W Jenkinsie ustaw `BASE_URL` i `CI=true`. Jeśli tworzenie i usuwanie kont wymagają tokenu technicznego, ustaw również sekret `TEST_API_TOKEN`.

Testy wymagają dopasowania kontraktu API, formularzy i dostępnego terminu. Gdy testy współdzielą jeden termin, uruchamiaj je kolejno (`npm test -- --workers=1`) i zapewnij jego zwolnienie po teście.

Raport HTML trafia do `playwright-report/`, a pliki diagnostyczne do `test-results/`. Po błędzie zachowywany jest trace, a dla testów UI również screenshot. Oba foldery są generowane i pomijane przez Git.
