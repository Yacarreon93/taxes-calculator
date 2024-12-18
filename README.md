# Taxes Calculator

## Description

The Taxes Calculator helps you calculate your taxes based on your yearly salary. Provides an easy-to-use interface for users to input their financial information and receive detailed tax information, amount of taxes owed per band, total amount of taxes owed, and effective rate.

## Installation

Use the next commands to install and run:

```bash
git clone https://github.com/Yacarreon93/taxes-calculator
cd taxes-calculator
npm install
npm run dev
```

In order to run the API locally, please follow these instructions:

```bash
docker pull ptsdocker16/interview-test-server
docker run --init -p 5001:5001 -it ptsdocker16/interview-test-server
```

- Navigate to `http://localhost:5001` for detailed instructions.
- The endpoint this app is working against`http://localhost:5001/tax-calculator/tax-year/2022`.

## Usage

1. Open your web browser and navigate to `http://localhost:5173`.
2. Enter your financial information and click "Calculate" to see your tax results.

Note: The API occasionally fails intentionally. Don't worry, this behavior is expected and fully handled.

## Test

```bash
npm run test
```

## Files & Directories description

- /src/components: Reusable UI components, using the atomic design architecture.
- /src/containers: High-level components that integrate data and manage state.
- /src/hooks/useApiFetch.ts: Custom hook for data fetching, with error and loading state management.
- /src/services/api.ts: Service for interacting with APIs, handling HTTP requests.
- /src/types/api.d.ts: Type definitions for API responses and frontend data objects
- /src/utils/format.ts: Utility functions for formatting numbers.
- /src/utils/taxes.ts: Utility functions for processing tax brackets.
