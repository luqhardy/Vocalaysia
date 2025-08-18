# Vocalaysia
A Social Experiment Regarding Vocaloid in Malaysia
## Overview

Vocalaysia is a fun and interactive web application built to determine the most popular Vocaloid Producer (VocaloP) in Malaysia, based on votes from different states. It's a social experiment designed to engage the Vocaloid community and visualize regional preferences.

## Features

*   **Vote for Your Favorite VocaloP:** Users can select their preferred Vocaloid Producer and their Malaysian state to cast a vote.
*   **Real-time Results:** See the total number of votes and the last updated timestamp.
*   **Interactive Map View:** A dynamic map of Malaysia displays the top-voted VocaloP for each state, providing a visual representation of regional trends.
*   **Top Producers List:** A sortable list showcasing the overall top-voted producers.
*   **Responsive Design:** Optimized for various devices, from mobile to desktop.

## Technologies Used

*   **Frontend:**
    *   Next.js (React Framework)
    *   TypeScript
    *   Tailwind CSS
    *   `react-select` for dropdowns
*   **Backend/Database:**
    *   Supabase (PostgreSQL database, authentication, and API)
*   **Deployment:**
    *   Vercel

## Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn
*   A Supabase project with the following tables:
    *   `producers`: `id` (int, PK), `name` (text)
    *   `malaysian_states`: `id` (int, PK), `name` (text)
    *   `votes`: `id` (int, PK), `producer_id` (int, FK to `producers.id`), `state_id` (int, FK to `malaysian_states.id`), `created_at` (timestamp with default `now()`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/luqmanhardy/Vocalaysia.git
    cd Vocalaysia
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    