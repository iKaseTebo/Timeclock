"use server";
// import { revalidatePath } from "next/cache";
import { clockIn, clockOut } from "@/lib/entries";

export async function clockInAction() {
  "use server";
  const response = await clockIn();

  if (response.changes === 0) {
    return { error: "Failed to Clock In", success: false, status: 500 };
  } else {
    return { success: true, status: 200 };
  }
}

export async function clockOutAction(note: string, taskId: number) {
  "use server";

  const data = {
    note: note || "",
    task_id: taskId || 0,
  };
  const response = await clockOut(data);
  console.log(response);
  // if (!response) {
  //     return {error: response, success: false, status: 500};
  // } else {
  //     revalidatePath("/");
  //     return {success: true, status: 200};
  // }
}
