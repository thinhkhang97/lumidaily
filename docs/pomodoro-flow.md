flowchart TD
A[Component Mount] --> B[Initialize Timer]
B --> C[Wait for User to Start]

    C -->|User clicks Start| D[Timer Running]
    D -->|User clicks Pause| E[Timer Paused]
    E -->|User clicks Resume| D

    D -->|Time Reaches 0| F[Session Complete]
    F -->|Work Session| G[Switch to Break]
    G --> C

    F -->|Break Session| H[Switch to Work]
    H --> C

    F -->|Final Work Session| I[Task Complete]
