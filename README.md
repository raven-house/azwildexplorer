# SomethingHappened (.wtf)

A zero-knowledge blockchain explorer where... something happens? This playful take on a privacy-focused blockchain explorer demonstrates the fundamental concept of transaction privacy in zero-knowledge networks.

<p align="center">
    <img src="https://somethinghappened.wtf/logo.png" alt="SomethingHappened Logo" width="150" />
</p>

## Overview

SomethingHappened is a blockchain explorer for the Aztec Network - a privacy-focused Layer 2 solution that uses zero-knowledge proofs to enable private transactions on Ethereum. Unlike traditional blockchain explorers that display all transaction details publicly, SomethingHappened humorously highlights the privacy features of Aztec by responding with memes, jokes, and educational content when users attempt to "reveal" transaction information.

**Live Demo**: [somethinghappened.wtf](https://somethinghappened.wtf)

## Key Features

- **Real Blockchain Data**: Displays actual blocks and transactions from the Aztec testnet
- **Network Statistics Dashboard**: Shows real-time metrics on blocks, transactions, and contract classes
- **Latest Transactions**: View a continuously updating list of recent network activity
- **Privacy Demonstrations**: When users try to "reveal" transaction details:
  - Sometimes displays random memes and GIFs
  - Occasionally shows transaction hashes that, when revealed, display Rick Roll lyrics
  - Shows humorous messages about zero-knowledge proofs

## Purpose

This project serves as an educational tool to help users understand:

1. How privacy-focused blockchains work
2. The concept and importance of transaction privacy
3. Why transaction details aren't publicly visible in zero-knowledge networks
4. Basic principles of zero-knowledge proofs

It offers a hands-on way to experience the differences between traditional transparent blockchains and privacy-preserving networks like Aztec.

## Technology Stack

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **Database**: Supabase
- **Data Source**: Aztec Network API

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account (for database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/somethinghappened.git
   cd somethinghappened
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see the application

## Project Structure

- `app/` - Next.js application files
  - `api/` - API routes for fetching blockchain data
  - `constants/` - Application constants
  - `db/config/` - Database configuration
  - `globals.css` - Global styles
  - `layout.tsx` - Main layout component
  - `page.tsx` - Home page with transaction list
- `components/` - Reusable UI components
  - `ui/` - Base UI components (buttons, cards, etc.)
  - `Header.tsx` - Site header with navigation
  - `Footer.tsx` - Site footer
  - `PrivacyContentModal.tsx` - Educational content about privacy
  - `ReadDisclaimerModal.tsx` - Disclaimer about the explorer
- `lib/` - Utility functions and types
  - `utils.ts` - Helper functions
  - `database.types.ts` - Supabase type definitions
  - `mock-data/` - Memes, messages, and other content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
<!--

## License

This project is licensed under the MIT License - see the LICENSE file for details. -->

## Acknowledgments

- [Aztec Network](https://aztec.network/) for their innovative zero-knowledge technology
- [Satyam Bansal](https://github.com/satyambnsal) for building this project

Built with ❤️ and a sense of humor about privacy. Remember, just because you can't see it doesn't mean it isn't there!
