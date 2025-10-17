import time
import random

# --- Game Configuration ---
# Difficulty settings: time_multiplier controls game speed/required input speed
DIFFICULTY = {
    'Easy': {'time_multiplier': 1.0, 'duration': 20},  # Slower time, 20s goal
    'Medium': {'time_multiplier': 1.5, 'duration': 30}, # Faster time, 30s goal
    'Hard': {'time_multiplier': 2.5, 'duration': 40}  # Very fast time, 40s goal
}

# Level configurations: maps Level Number to a Difficulty Name
LEVELS = {
    1: 'Easy',
    2: 'Medium',
    3: 'Hard',
    4: 'Medium',
    5: 'Hard'
}

# --- Game Functions ---

def display_welcome():
    """Prints the welcome message and instructions."""
    print("====================================")
    print("     The Endurance Run (Console)    ")
    print("====================================")
    print("Instructions: Type 'r' and press Enter to 'Run' (Keep running!).")
    print("Your speed is measured by your typing speed. Survive the clock!")
    print("Press Ctrl+C to stop at any time.")
    time.sleep(1)

def get_player_name():
    """Gets and returns the player's name."""
    name = input("Enter your name: ")
    return name

def run_level(level_number, difficulty_name):
    """Runs a single level of the game."""
    settings = DIFFICULTY[difficulty_name]
    time_multiplier = settings['time_multiplier']
    duration = settings['duration']
    
    print(f"\n--- Starting Level {level_number} ---")
    print(f"Difficulty: {difficulty_name}")
    print(f"Goal: Survive for {duration} seconds (Game Time)")
    print(f"Current Speed Multiplier: x{time_multiplier:.1f}")

    game_time = 0
    start_time = time.time()
    last_input_time = start_time
    
    run_word = "r"
    
    while game_time < duration:
        try:
            # Calculate time elapsed since last correct input
            real_time_elapsed = time.time() - last_input_time

            # Failure Condition: Player is too slow based on difficulty
            if real_time_elapsed > 1.5 / time_multiplier:
                print("\n[CRASH] You were too slow! Obstacle hit. Level Failed.")
                return False 
            
            prompt = f"[{int(game_time)}s/{duration}s] Type '{run_word}' and Enter: "
            player_input = input(prompt).strip().lower()
            
            if player_input == run_word:
                last_input_time = time.time()
                
                # Advance game time based on the multiplier
                game_time += 1.0 * time_multiplier 
                
                # Randomly change the required 'run' command
                if random.random() < 0.3:
                    run_word = random.choice(['r', 'R', 'run', 'go'])
                else:
                    run_word = 'r'
                    
            else:
                print("Wrong command! You tripped. Level Failed.")
                return False

        except KeyboardInterrupt:
            print("\nGame aborted by player.")
            return False

    print(f"\n*** Level {level_number} Complete! (Time survived: {int(game_time)}s) ***")
    return True 

def main_game_loop():
    """The main game loop that manages levels and flow."""
    player_name = get_player_name()
    display_welcome()
    
    current_level = 1
    max_levels = len(LEVELS)
    
    while current_level <= max_levels:
        difficulty_name = LEVELS[current_level]
        
        level_successful = run_level(current_level, difficulty_name)
        
        if level_successful:
            current_level += 1
        else:
            print(f"Game Over, {player_name}!")
            retry = input("Do you want to retry the current level? (y/n): ").lower()
            if retry != 'y':
                break
    
    if current_level > max_levels:
        print("\n************************************")
        print(f"** CONGRATULATIONS, {player_name.upper()}! **")
        print("** You completed all levels!      **")
        print("************************************")
    else:
        print("\nThanks for playing!")

if __name__ == "__main__":
    try:
        main_game_loop()
    except Exception as e:
        print(f"An error occurred: {e}")
