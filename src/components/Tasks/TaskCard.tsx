"use client";
import { NewTaskAction } from "@/actions/tasks";
import SubmitButton from "../UI/SubmitButton";
import { useActionState, useEffect } from "react";

export default function TaskCard({ onSuccess }: { onSuccess: () => void }) {
  // console.log(tasks);
  const initialState = {
    success: false,
    error: undefined,
    status: undefined,
    data: undefined,
  };
  const [state, formAction] = useActionState(NewTaskAction, initialState);

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  useEffect(() => {
    if (state?.error) {
      console.error("Error:", state.error);
    }
  }, [state]);

  return (
    <div className="p-4 md:min-h-[400px] flex:sm flex-col">
      {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
      <div className="flex justify-between">
        <h2 className="text-3xl mb-4">New Task</h2>
        <p
          onClick={onSuccess}
          className="text-xl cursor-pointer font-semibold hover:text-purple-500"
        >
          x
        </p>
      </div>
      <form action={formAction}>
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Task Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-3 block w-full border-white border text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter task here..."
          />
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block font-semibold mb-1 ">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full h-24 p-2 rounded-md border border-white text-white"
            placeholder="Enter task here..."
          />
        </div>
        <div className="mt-4 flex justify-end">
          <SubmitButton text="New Task" />
        </div>
      </form>
    </div>
  );
}
