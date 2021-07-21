import { useState } from "react";

export default function Task(props) {
  const { addTask, deleteTask, moveTask, task } = props;

  const [saved, setSaved] = useState(task.isSaved);
  const [formAction, setFormAction] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (formAction === "save") {
      if (saved) {
        setSaved(false);
      } else {
        let newTask = {
          id: task.id,
          title: event.target.elements.title.value,
          description: event.target.elements.description.value,
          status: task.status,
          isSaved: true,
        };
        addTask(newTask);
        setSaved(true);
      }
    }
    if (formAction === "delete") {
      deleteTask(task.id);
    }
  }

  function handleMoveLeft() {
    let newStatus = "";
    if (task.status === "In Progress") {
      newStatus = "To Do";
    } else if (task.status === "Done") {
      newStatus = "In Progress";
    }
    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  function handleMoveRight() {
    let newStatus = "";
    if (task.status === "To Do") {
      newStatus = "In Progress";
    } else if (task.status === "In Progress") {
      newStatus = "Done";
    }
    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  return (
    <div className="task">
      <button
        disabled={!saved}
        onClick={handleMoveLeft}
      >
        &#171;
      </button>
      <form onSubmit={handleSubmit} className="task-item">
        <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={saved}
          defaultValue={task.title}
        />
        <textarea
          rows="2"
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={task.description}
          disabled={saved}
        />

        <button
          onClick={() => {
            setFormAction("save");
          }}
          className="button"
        >
          {saved ? "Edit" : "Save Task"}
        </button>
        {saved && (
          <button
            onClick={() => {
              setFormAction("delete");
            }}
            className="button delete"
          >
            X
          </button>
        )}
      </form>
      <button
        disabled={!saved}
        onClick={handleMoveRight}
       
      >
        &#187;
      </button>
    </div>
  );
}
