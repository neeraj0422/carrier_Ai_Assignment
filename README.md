# Stock Market Signal and Execution Platform

## Objective
The goal of this project is to develop a Stock Market Signal and Execution Platform utilizing Node.js, API integration, and webhook handling. This platform will connect to various brokers, process trading signals from TradingView through webhooks, and allow users to sign up, integrate their broker accounts, specify ticker preferences, and define risk and money management rules.

## Task Components

### 1. Broker API Integration
- Integrated with Alpaca's API.
- Implemented a Node.js module to connect to Alpaca's API.
- Tested the integration successfully on Postman.

### 2. User Signup and Authentication
- Created a user authentication system using Express.js.
- Implemented user signup functionality with fields for Username, Email, Password, and Broker API details.
- Ensured secure handling of sensitive information.

### 3. Ticker/Stock Preferences
- Developed a simple web interface for users to input their preferred tickers or stocks.
- Securely stored user preferences in the database associated with the user account.

### 4. Webhook Handling for TradingView Signals
- Set up an API endpoint to receive webhooks from TradingView.
- Implemented logic to parse incoming webhook data and extract relevant trading signals (buy/sell/hold recommendations).

### 5. Signal Processing and Execution
- Implemented logic to process received trading signals.
- Utilized Alpaca's integrated broker API to execute buy/sell orders based on the signals.
- Implemented basic risk management and money management rules.

## Requirements
- Used Node.js and Express.js framework.
- Utilized Git for version control with clear commit history.
- Provided clear instructions on setting up and running the application.
- Prioritized clean and modular code structure.
- Included error handling and logging mechanisms.
- Ensured secure handling of sensitive information.

## Submission
- [Link to Git repository](https://github.com/neeraj0422/carrier_Ai_Assignment)
- README.md explaining implementation choices and additional notes.

## Additional Notes
- Made assumptions where specific details were not provided and documented them in the submission.
- Tested all functionalities thoroughly, including API integrations, webhook handling, and user interactions, using Postman.

## Conclusion
This project demonstrates proficiency in Node.js, API integration, webhook handling, user authentication, and database management. It provides a solid foundation for further development and expansion of the Stock Market Signal and Execution Platform.
