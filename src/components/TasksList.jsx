import React from "react";
import Task from "./Task";

export default function TasksList(props) {
  const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask } = props;
  let taskList, tasksForStatus;

  function handleAddEmpty() {
    addEmptyTask(status);
  }

  if (tasks) {
    tasksForStatus = tasks.filter((task) => {
      return task.status === status;
    });
  }

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
        />
      );
    });
  }

  return (
    <div className="statusLine">
      <h3 className="task-list-heading">{status} Tasks</h3>
      {taskList}
      {status === "To Do" ? (
        <button onClick={handleAddEmpty} className="add-task-btn">
          +
        </button>
      ) : null}
    </div>
  );
}
