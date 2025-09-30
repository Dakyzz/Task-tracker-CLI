
 Task Tracker CLI (Node.js)
----------------------------------------
A simple command-line task manager built with Node.js.
Allows you to add, list, update, and remove tasks via terminal.

USAGE:
  node TaskTracker.js <command> [task_id]

COMMANDS:
  list                      List all tasks
  add                       Add a new task
  update <task_id>          Update an existing task
  remove <task_id>          Remove a task

EXAMPLES:
  node TaskTracker.js list
      → Lists all tasks with ID, description, status, timestamps

  node TaskTracker.js add
      → Prompts for a task description and status (todo, in-progress, done)

  node TaskTracker.js update 3
      → Updates task with ID 3. Prompts for new description and status

  node TaskTracker.js remove 2
      → Deletes the task with ID 2

TASK DATA:
  Tasks are stored in tasks.json as an array:
  [
    {
      "id": 1,
      "description": "Write README file",
      "status": "done",
      "createdAt": "2025-09-23 14:30",
      "updatedAt": "2025-09-23 15:10"
    }
  ]

NOTES:
  - Status must be one of: todo | in-progress | done
  - tasks.json is created automatically if it doesn't exist
  - Task IDs must be numeric when updating/removing

also roadmap made me paste this: https://roadmap.sh/projects/task-tracker
----------------------------------------
