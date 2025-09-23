 const fs = require('fs');
 const readline = require('readline');
 const rl = readline.createInterface({
     input: process.stdin,
     output: process.stdout
 })
 const command = process.argv[2];
 const taskId = process.argv[3];

 function loadTasks() {
     try {
         const data = fs.readFileSync('tasks.json', 'utf-8');
         return JSON.parse(data);
     } catch (err) {
         return [];
     }
 }

 function saveTasks(tasks) {
     fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
 }

 function updateTask(idArg) {
     const tasks = loadTasks();
     const id = Number(idArg);

     if (isNaN(id)) {
         console.log("Invalid ID. Usage: node task-tracker.js remove <task_id>");
         return;
     }
     const index = tasks.findIndex(task => task.id === id);
     if (index === -1) {
         console.log(` Task with ID ${id} not found.`);
         return;
     }
     rl.question('Enter task description:', (description) => {
         if (!description.trim()) {
             console.log("Task description cannot be empty.");
             rl.close();
             return;
         }
         rl.question('Enter task status(todo, in-progress,done):', (status) => {
             const allowedStatuses = ['todo', 'in-progress', 'done'];
             if (!allowedStatuses.includes(status)) {
                 console.log("Invalid status. Must be 'todo', 'in-progress', or 'done'.");
                 return askForStatus(description);
             }

             tasks[index].description = description;
             tasks[index].status = status;
             tasks[index].updatedAt = getFormattedDateTime();
             fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
             console.log(`✅ Task: "${description}" with "${status}" status updated (ID: ${id})`);
             saveTasks(tasks);
             rl.close();
         });

     });
 }


 function removeTask(idArg) {
     const tasks = loadTasks();

     const id = Number(idArg);
     if (isNaN(id)) {
         console.log("Invalid ID. Usage: node task-tracker.js remove <task_id>");
         return;
     }

     const index = tasks.findIndex(task => task.id === id);
     if (index === -1) {
         console.log(`Task with ID ${id} not found.`);
         return;
     }

     const removed = tasks.splice(index, 1)[0];
     saveTasks(tasks);

     console.log(`Removed task [${removed.id}]: "${removed.description}"`);
 }

 function getFormattedDateTime() {
     const now = new Date();
     return now.toISOString().replace("T", " ").slice(0, 16);
 }

 function addTask() {
     rl.question('Enter task description:', (description) => {
         if (!description.trim()) {
             console.log("Task description cannot be empty.");
             rl.close();
             return;
         }
         askForStatus(description);
     });
 }

 function askForStatus(description) {
     rl.question('Enter task status(todo, in-progress,done):', (status) => {
         const allowedStatuses = ['todo', 'in-progress', 'done'];
         if (!allowedStatuses.includes(status)) {
             console.log("Invalid status. Must be 'todo', 'in-progress', or 'done'.");
             return askForStatus(description);
         }

         let tasks = [];
         try {
             const data = fs.readFileSync("tasks.json", "utf-8");
             tasks = JSON.parse(data);
         } catch (error) {
             console.log('empty task container');

         }
         //creates the next avaiable id
         const nextId = tasks.length > 0 ?
             Math.max(...tasks.map(task => Number(task.id) || 0)) + 1 :
             1;

         const task = {
             id: nextId,
             description: description,
             status: status,
             createdAt: getFormattedDateTime(),
             updatedAt: getFormattedDateTime()
         };

         tasks.push(task);
         fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
         console.log(` Task: "${description}" with "${status}" status saved (ID: ${nextId})`);
         rl.close();
     });
 }

 function displayTasks() {
     const tasks = loadTasks()

     console.log("\nExisting Tasks:", tasks.length);
     
     tasks.forEach((task, index) => {
         console.log(`[${index}] ${task.description.padEnd(25)} | ${task.status.padEnd(12)} | ${task.createdAt} | ${task.updatedAt}`);
     });
 }

 switch (command) {
     case "list":
         displayTasks();
         break;
     case 'add':
         addTask();
         break;
     case "remove":
         removeTask(taskId);
         break;
     case 'update':
         updateTask(taskId);
         break;
     default:
         console.log('invalid command');
         return;
 }