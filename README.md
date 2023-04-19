# Security Analyst

Security Analyst is an Electron-based desktop application that automates various security scans using tools like Nmap, Nikto, and OpenVAS. It consolidates the results, stores them in a SQLite database, and generates a PDF report for easy analysis.

## Features

- Perform security scans using Nmap, Nikto, and OpenVAS
- Store findings in an SQLite database
- Generate a PDF report with the scan results
- Customize which scans to perform

## Installation

1. Clone the repository:

https://github.com/hiteshpatwari/SecurityAnalyst-GPT


2. Navigate to the project directory:


3. Install the dependencies:

```npm install```


4. Make sure you have Docker installed and running. You'll need it to run the scanners in their respective containers.

5. Start the application:

```npm start```


## Usage

1. Enter the target website or IP address in the input field.
2. Select the scanners you want to use by checking the checkboxes.
3. Click the "Start Scan" button to initiate the scanning process.
4. The application will display real-time feedback on the scanning progress.
5. Once the scans are completed, the application will analyze the findings and store them in a SQLite database.
6. A PDF report will be generated with the scan results.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on the GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

