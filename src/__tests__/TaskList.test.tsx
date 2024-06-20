import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskList from "../components/TaskList";

describe("TaskList", () => {
  it("should render TaskList component with props", () => {
    // Render the TaskList component with props.
    render(
      <TaskList
        lists={[]}
        setLists={() => {}}
        currentList={"list1"}
      />
    );

    // Debug the screen.
    screen.debug();
  });
});