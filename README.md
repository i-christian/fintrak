# Finance Tracker App 🚀

![GitHub repo size](https://img.shields.io/github/repo-size/i-christian/fintrak?style=flat-square)
![GitHub license](https://img.shields.io/github/license/i-christian/fintrak?style=flat-square)
[![Build Status](https://github.com/i-christian/fintrak/actions/workflows/tests.yml/badge.svg)](https://github.com/i-christian/fintrak/actions/workflows/tests.yml)
[![GitHub Issues](https://img.shields.io/github/issues/i-christian/fintrak)](https://github.com/i-christian/fintrak/issues)
[![GitHub Contributors](https://img.shields.io/github/contributors/i-christian/fintrak)](https://github.com/i-christian/fintrak/graphs/contributors)
[![Last Commit](https://img.shields.io/github/last-commit/i-christian/fintrak)](https://github.com/i-christian/fintrak/commits/main)
[![Latest Release](https://img.shields.io/github/v/release/i-christian/fintrak?include_prereleases)](https://github.com/i-christian/fintrak/releases)


## Description

FinTrak is an innovative real-time finance tracking app designed to help users manage their finances intelligently. It offers features like smart budget monitoring, automated insights, and collaborative financial planning. 

The app uses Rust for a high-performance backend, SolidJS for a dynamic frontend, and PostgreSQL for secure data persistence. The entire stack is containerized with Docker to ensure a seamless development and deployment experience.

### Key Features
- [x] **User Authentication**: Allow users to create accounts using an email address and password
- [ ] **Real-Time Budget Monitoring**: Track spending in real-time with live updates as transactions happen.
- [ ] **Collaborative Finance Tracking**: Allow users to collaborate on shared financial goals (e.g., household budgets, group savings plans).
- [ ] **Instant Alerts and Notifications**: Send real-time notifications for unusual spending, bill reminders, or savings milestones.
- [ ] **Custom Financial Goals**: Users can set goals like saving for a vacation, and the app provides a real-time tracker.
- [ ] **Multiple Currency Support**: Track finances across multiple currencies and provide automatic conversion rates.
- [ ] Cross-Platform Accessibility: A responsive, dynamic UI that works seamlessly across all devices.

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

Enjoy chatting with FinTrak! 🚀💬
