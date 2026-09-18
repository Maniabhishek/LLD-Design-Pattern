### Step 1: Clarify Requirements
#### Functional Requirements:
- The system should control traffic signals at a single intersection (4 traffic lights as a unit).
- The system should manage automatic cycling through phases (NORTH → EAST → SOUTH → WEST).
- The system should handle emergency vehicle priority requests by pausing the automatic cycle.
- During emergency: All signals turn RED, emergency direction gets GREEN, then resume cycle from pause.
- The system should track vehicle count at each approach.
- The system should prevent conflicting signals from being active simultaneously.
- The system should have configurable signal durations (RED, YELLOW, GREEN) for each direction.
- The system should allow dynamic adjustment of signal durations based on traffic conditions.
