import { useState } from "react";
import { Plus, Calendar, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setNewTask("");
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="widget p-3 w-[324px] min-h-56 flex flex-col">
      <h3 className="font-semibold text-foreground mb-2 text-sm">Tasks</h3>
      
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
          className="mb-2 bg-secondary border-0 h-8 text-sm"
          autoFocus
        />
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full flex items-center gap-2 p-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors mb-2"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="text-xs">Add task</span>
        </button>
      )}

      {/* Task List */}
      <div className="space-y-1.5 max-h-36 overflow-y-auto flex-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-start gap-2 p-1.5 rounded-lg transition-opacity group ${
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
                className={`text-xs ${
                  task.completed ? "line-through text-muted-foreground" : "text-foreground"
                }`}
              >
                {task.text}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                <Calendar className="w-2.5 h-2.5" />
                <span>{format(task.date, "MMM d, h:mma")}</span>
              </div>
            </div>
            {task.completed && (
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                title="Delete task"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar - Fixed at bottom */}
      <div className="mt-auto pt-2 border-t-2 border-[#bdc1c7]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-muted-foreground">Progress</span>
          <span className="text-[10px] text-muted-foreground">
            {completedCount}/{totalCount}
          </span>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
      </div>
    </div>
  );
};

export default TasksWidget;
