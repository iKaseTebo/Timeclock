"use client";
import { toggleActiveTask } from "@/actions/tasks";
import { useEffect, useState } from "react";

export default function ActiveTaskToggle({ task, ...props }) {
    const [isActive, setIsActive] = useState(task.active === 1 ? 1 : 0);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        setIsActive(task.active === 1 ? 1 : 0);
    }, [task]);
    
    const handleToggle = async () => {
        setIsPending(true);
        const newActiveState = task.active === 1 ? 0 : 1;
        setIsActive(prev => prev === 1 ? 0 : 1);
        const newTask = { ...task, active: newActiveState };
        await toggleActiveTask(newTask);
        setIsPending(false);
    }
    return <input {...props} type="checkbox" onChange={handleToggle} disabled={isPending} checked={isActive} />
}