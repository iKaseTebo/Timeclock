"use client";
import { toggleActiveTask } from "@/actions/tasks";
import { useState } from "react";

export default function ActiveTaskToggle({ task }) {
    const [isActive, setIsActive] = useState(task.active === 1 ? 1 : 0);
    const [isPending, setIsPending] = useState(false);
    
    const handleToggle = async () => {
        setIsPending(true);
        const newActiveState = task.active === 1 ? 0 : 1;
        setIsActive(prev => prev === 1 ? 0 : 1);
        const newTask = { ...task, active: newActiveState };
        await toggleActiveTask(newTask);
        setIsPending(false);
    }
    return <input type="checkbox" onChange={handleToggle} disabled={isPending} checked={isActive} />
}