import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: Date;
}

const TasksWidget = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Do a barrel roll", completed: false, date: new Date() },
  ]);
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          text: newTask.trim(),
          completed: false,
          date: new Date(),
        },
      ]);
      setNewTask("");
      setIsAdding(false);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setNewTask("");
    }
  };

  return (
    <div className="widget p-4 w-72 min-h-64">
      <h3 className="font-semibold text-foreground mb-3">Tasks</h3>
      
      {/* Add Task Button/Input */}
      {isAdding ? (
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (!newTask.trim()) setIsAdding(false);
          }}
          placeholder="Enter task..."
          className="mb-3 bg-secondary border-0"
          autoFocus
        />
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full flex items-center gap-2 p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors mb-3"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add task</span>
        </button>
      )}

      {/* Task List */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-start gap-3 p-2 rounded-lg transition-opacity ${
              task.completed ? "opacity-50" : ""
            }`}
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm ${
                  task.completed ? "line-through text-muted-foreground" : "text-foreground"
                }`}
              >
                {task.text}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Calendar className="w-3 h-3" />
                <span>{format(task.date, "MMM d, h:mma")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Page Indicator */}
      {tasks.length > 0 && (
        <div className="flex items-center justify-end mt-3 gap-2">
          <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-muted-foreground/30 rounded-full w-1/2" />
          </div>
          <span className="text-xs text-muted-foreground">1/2</span>
        </div>
      )}
    </div>
  );
};

export default TasksWidget;
