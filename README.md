# Finance Tracker App 🚀

![GitHub repo size](https://img.shields.io/github/repo-size/i-christian/fintrak?style=flat-square)
![GitHub license](https://img.shields.io/github/license/i-christian/fintrak?style=flat-square)
[![Build Status](https://github.com/i-christian/fintrak/actions/workflows/tests.yml/badge.svg)](https://github.com/i-christian/fintrak/actions/workflows/tests.yml)
[![GitHub Issues](https://img.shields.io/github/issues/i-christian/fintrak)](https://github.com/i-christian/fintrak/issues)
[![GitHub Contributors](https://img.shields.io/github/contributors/i-christian/fintrak)](https://github.com/i-christian/fintrak/graphs/contributors)
[![Last Commit](https://img.shields.io/github/last-commit/i-christian/fintrak)](https://github.com/i-christian/fintrak/commits/main)
[![Latest Release](https://img.shields.io/github/v/release/i-christian/fintrak?include_prereleases)](https://github.com/i-christian/fintrak/releases)


## Description

FinTrak is a finance tracking app designed to help users manage their personal and group finances effectively. The app offers essential budgeting tools, transaction tracking, and collaboration features.

Built with a modern tech stack, FinTrak utilizes Rust for its high-performance backend, SolidJS for a reactive and intuitive frontend, and PostgreSQL for secure and efficient data management. Containerized with Docker, it ensures seamless development and deployment.

### Key Features
- [x] **User Authentication**: Allow users to create accounts using an email address and password
- [ ] **Personal Management**: Create and track expenses & income throughout the month.
- [ ] **Category Management**: Define custom income and expense categories for users.
- [ ] **Transaction Tracking**: Log and manage transactions for individuals, categorized as expense or income.
- [ ] **Budget Management**: Set and monitor budgets for specific categories per user.
- [ ] **Financial Reports**: Generate summaries of income, expenses, and budget performance for specific time periods.
- [ ] **Cross-Platform Accessibility**: A responsive, dynamic UI that works seamlessly across all devices.

## Prerequisites 📋
- [Rust](https://www.rust-lang.org/)
- [Axum](https://docs.rs/axum/latest/axum/)
- [The WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Node.js & npm](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [SolidJS](https://docs.solidjs.com/)
- [Docker](https://www.docker.com/)

## How to Use 🛠️

### Clone the Repository
clone the `fintrak` repository to your local machine:
```
git clone https://github.com/i-christian/fintrak.git

cd fintrak
```

### Running with Docker 🐳
- **Build and Start**: Ensure Docker is installed, then run the following command to build and start the services.
```
  docker compose up -d
```

- **Access the Application**: Once the container is running, access FinTrak at:
```
  http://localhost:3000
```
- **Stop the Service**: Run the following command to stop the service:
```
  docker compose down --remove-orphans
```

### Run the application (without Docker)
```
./buid.sh
```

## Contributing 🤝

I welcome contributions to improve FinTrak. Here’s how you can get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## Licensing 📄
FinTrak is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements 🙌
Special thanks to the developers of Rust, Axum, and SolidJS for their excellent tools and libraries.

Enjoy using FinTrak! 🚀
