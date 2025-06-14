import sys
import json
from RhelGamePython.chapter2_create_config_fs.system_admin import validate_shared_folder_cmd

def validate_command(user_input):
    # TEMP: hardcoded demo logic — you'll hook your real validators here
    if user_input.strip() == "mkdir /home/shared":
        return {
            "valid": True,
            "hint": "Correct! You've created the shared directory.",
            "chapter": 2
        }
    else:
        return {
            "valid": False,
            "hint": "Try again. You need to create a shared folder in /home.",
            "chapter": 2
        }

if __name__ == "__main__":
    user_input = sys.stdin.read().strip()
    result = validate_shared_folder_cmd(user_input)
    print(json.dumps(result))
