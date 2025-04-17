/**
 * Emerald Tasks - Advanced TODO List Application
 * Author: Dave Matthew S. Punzalan
 * Version: 2.0
 */

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const historyList = document.getElementById("historyList");
    const clearCompletedBtn = document.getElementById("clearCompleted");
    const clearHistoryBtn = document.getElementById("clearHistory");
    const taskFilter = document.getElementById("taskFilter");
    const contactForm = document.getElementById("contactForm");
    
    // State Management
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let history = JSON.parse(localStorage.getItem("history")) || [];
    
    // Save Tasks to LocalStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    // Save History to LocalStorage
    function saveHistory() {
        localStorage.setItem("history", JSON.stringify(history));
        
        // Keep history length manageable (max 50 items)
        if (history.length > 50) {
            history = history.slice(-50);
            saveHistory();
        }
    }
    
    // Add Timestamp to History Records
    function addToHistory(action) {
        const now = new Date();
        const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        history.push(`[${timestamp}] ${action}`);
        saveHistory();
    }
    
    // Generate Unique ID for Tasks
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    // Render Tasks with Filtering
    function renderTasks(filter = 'all') {
        taskList.innerHTML = "";
        
        // Filter tasks based on selection
        let filteredTasks = tasks;
        if (filter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        if (filteredTasks.length === 0) {
            const emptyMessage = document.createElement("li");
            emptyMessage.className = "text-center py-3";
            emptyMessage.textContent = filter === 'all' ? 
                "No tasks yet. Add one above!" : 
                (filter === 'active' ? "No active tasks." : "No completed tasks.");
            taskList.appendChild(emptyMessage);
            return;
        }
        
        filteredTasks.forEach((task) => {
            const li = document.createElement("li");
            if (task.completed) {
                li.classList.add("completed");
            }
            
            // Find the actual index in the main tasks array
            const taskIndex = tasks.findIndex(t => t.id === task.id);
            
            li.innerHTML = `
                <div class="task-text">${task.text}</div>
                <div class="task-actions">
                    <button class="btn-complete" title="Mark as ${task.completed ? 'incomplete' : 'complete'}">
                        <i class="fas fa-${task.completed ? 'times' : 'check'}"></i>
                    </button>
                    <button class="btn-edit" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            // Event listeners
            li.querySelector(".btn-complete").addEventListener("click", () => toggleComplete(taskIndex));
            li.querySelector(".btn-edit").addEventListener("click", () => editTask(taskIndex));
            li.querySelector(".btn-delete").addEventListener("click", () => deleteTask(taskIndex));
            
            taskList.appendChild(li);
        });
    }
    
    // Render History
    function renderHistory() {
        historyList.innerHTML = "";
        
        if (history.length === 0) {
            const emptyHistory = document.createElement("li");
            emptyHistory.className = "text-center py-3";
            emptyHistory.textContent = "No history yet.";
            historyList.appendChild(emptyHistory);
            return;
        }
        
        // Show most recent events first
        [...history].reverse().forEach((record) => {
            const li = document.createElement("li");
            li.textContent = record;
            historyList.appendChild(li);
        });
    }
    
    // Add New Task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;
        
        const newTask = {
            id: generateId(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        saveTasks();
        
        addToHistory(`Added: "${taskText}"`);
        
        taskInput.value = "";
        renderTasks(taskFilter.value);
        renderHistory();
        
        // Add subtle animation to task input
        taskInput.classList.add("success-animation");
        setTimeout(() => {
            taskInput.classList.remove("success-animation");
        }, 1000);
    }
    
    // Toggle Task Completion
    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        const status = tasks[index].completed ? "completed" : "reopened";
        
        saveTasks();
        addToHistory(`Marked "${tasks[index].text}" as ${status}`);
        
        renderTasks(taskFilter.value);
        renderHistory();
    }
    
    // Edit Task
    function editTask(index) {
        const task = tasks[index];
        const oldText = task.text;
        
        // Use a custom dialog instead of prompt
        const newText = prompt("Edit task:", oldText);
        
        if (newText !== null && newText.trim() !== "" && newText !== oldText) {
            task.text = newText.trim();
            task.updatedAt = new Date().toISOString();
            
            saveTasks();
            addToHistory(`Edited: "${oldText}" → "${newText.trim()}"`);
            
            renderTasks(taskFilter.value);
            renderHistory();
        }
    }
    
    // Delete Task
    function deleteTask(index) {
        const task = tasks[index];
        
        if (confirm("Are you sure you want to delete this task?")) {
            const deletedTask = tasks.splice(index, 1)[0];
            
            saveTasks();
            addToHistory(`Deleted: "${deletedTask.text}"`);
            
            renderTasks(taskFilter.value);
            renderHistory();
        }
    }
    
    // Clear Completed Tasks
    function clearCompleted() {
        const completedCount = tasks.filter(task => task.completed).length;
        
        if (completedCount === 0) {
            alert("No completed tasks to clear.");
            return;
        }
        
        if (confirm(`Are you sure you want to clear ${completedCount} completed task(s)?`)) {
            tasks = tasks.filter(task => !task.completed);
            
            saveTasks();
            addToHistory(`Cleared ${completedCount} completed task(s)`);
            
            renderTasks(taskFilter.value);
            renderHistory();
        }
    }
    
    // Clear History
    function clearHistoryLog() {
        if (history.length === 0) {
            alert("History is already empty.");
            return;
        }
        
        if (confirm("Are you sure you want to clear the entire history?")) {
            history = [];
            saveHistory();
            renderHistory();
        }
    }
    
    // Handle Form Submissions
    function handleContactSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        
        // Here you would normally send this data to a server
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`);
        contactForm.reset();
    }
    
    // Add Keyboard Shortcuts
    function handleKeyboardShortcuts(e) {
        // Add task on Enter key in task input
        if (e.key === "Enter" && document.activeElement === taskInput) {
            addTask();
        }
        
        // Global shortcuts (only when not typing in input fields)
        if (document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
            // "A" key - focus task input
            if (e.key === "a" || e.key === "A") {
                taskInput.focus();
                e.preventDefault();
            }
            
            // "C" key - clear completed tasks
            if (e.key === "c" || e.key === "C") {
                clearCompleted();
                e.preventDefault();
            }
        }
    }
    
    // Event Listeners
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keyup", e => { if (e.key === "Enter") addTask(); });
    clearCompletedBtn.addEventListener("click", clearCompleted);
    clearHistoryBtn.addEventListener("click", clearHistoryLog);
    taskFilter.addEventListener("change", () => renderTasks(taskFilter.value));
    contactForm.addEventListener("submit", handleContactSubmit);
    document.addEventListener("keydown", handleKeyboardShortcuts);
    
    renderTasks();
    renderHistory();
    
    if (!localStorage.getItem("appInitialized")) {
        tasks.push({
            id: generateId(),
            text: "Welcome to Emerald Tasks! Click on this task to mark it complete.",
            completed: false,
            createdAt: new Date().toISOString()
        });
        
        addToHistory("App initialized for first use");
        localStorage.setItem("appInitialized", "true");
        saveTasks();
        renderTasks();
    }
    
    // Add tooltip initializer for Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Custom context menu for tasks (right-click)
    taskList.addEventListener("contextmenu", function(e) {
        const targetLi = e.target.closest("li");
        if (targetLi) {
            e.preventDefault();
            // Find task index
            const taskText = targetLi.querySelector(".task-text").textContent;
            const taskIndex = tasks.findIndex(task => task.text === taskText);
            
            // Here you could implement a custom context menu with options
            const action = prompt("Choose action: (complete, edit, delete)", "");
            if (action) {
                switch(action.toLowerCase()) {
                    case "complete":
                        toggleComplete(taskIndex);
                        break;
                    case "edit":
                        editTask(taskIndex);
                        break;
                    case "delete":
                        deleteTask(taskIndex);
                        break;
                }
            }
        }
    });
    
    function sortTasks(criteria) {
        switch(criteria) {
            case "newest":
                tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "oldest":
                tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case "alphabetical":
                tasks.sort((a, b) => a.text.localeCompare(b.text));
                break;
        }
        
        saveTasks();
        renderTasks(taskFilter.value);
    }
    
    function getTaskStats() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const active = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return {
            total,
            completed,
            active,
            completionRate
        };
    }
    
    function exportTasks() {
        const dataStr = JSON.stringify(tasks, null, 2);
        const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
        
        const exportFileDefaultName = "emerald-tasks-backup.json";
        
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();
        
        addToHistory("Exported tasks to file");
    }
});